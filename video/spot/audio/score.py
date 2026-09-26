#!/usr/bin/env python3
"""Datalith spot — music bed and sound design, synthesized from scratch (no samples, no licences).

120 BPM, one bar per scene. F minor tension under the tangle, a hard stop, then the drop into
Fm – Db – Ab – Eb, landing on A-flat exactly when the logo locks. Every effect is placed on the
same beat grid the picture is cut to (see src/config.js), then the mix is mastered to -14 LUFS
integrated with true peak at or under -1 dBTP.

    python3 audio/score.py            # writes assets/audio/spot-mix.wav (+ stems in audio/stems/)
Deterministic: fixed seeds, no clocks.
"""
import os
import sys
import numpy as np
import soundfile as sf
import pyloudnorm as pyln
from scipy import signal
from numba import njit

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SR = 48000
DUR = 20.0
N = int(SR * DUR)
BEAT = 0.5
S16 = BEAT / 4
RNG = np.random.default_rng(20260926)

# ---- story beats (must match src/config.js) ----
T = dict(pour=0.5, line1=1.5, agent=4.0, probe=4.3, fail=4.85, stop=5.5, drop=6.0,
         graph=8.0, beam=10.0, fold=12.0, lock=14.0, cta=16.0, end=20.0)


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def tt(n):
    return np.arange(n) / SR


def secs(x):
    return int(round(x * SR))


# ------------------------------------------------------------------ DSP kernels
@njit(cache=True)
def svf(x, fc, q, mode):
    """Topology-preserving state-variable filter with per-sample cutoff. mode 0 lp, 1 bp, 2 hp."""
    y = np.zeros_like(x)
    ic1 = 0.0
    ic2 = 0.0
    k = 1.0 / q
    for i in range(x.shape[0]):
        f = min(max(fc[i], 10.0), 0.45 * 48000.0)
        g = np.tan(np.pi * f / 48000.0)
        a1 = 1.0 / (1.0 + g * (g + k))
        a2 = g * a1
        a3 = g * a2
        v3 = x[i] - ic2
        v1 = a1 * ic1 + a2 * v3
        v2 = ic2 + a2 * ic1 + a3 * v3
        ic1 = 2.0 * v1 - ic1
        ic2 = 2.0 * v2 - ic2
        if mode == 0:
            y[i] = v2
        elif mode == 1:
            y[i] = v1
        else:
            y[i] = x[i] - k * v1 - v2
    return y


@njit(cache=True)
def saw_blep(freq):
    """Band-limited sawtooth (polyBLEP) from a per-sample frequency array."""
    y = np.zeros_like(freq)
    ph = 0.0
    for i in range(freq.shape[0]):
        dt = freq[i] / 48000.0
        v = 2.0 * ph - 1.0
        if ph < dt:
            t = ph / dt
            v -= t + t - t * t - 1.0
        elif ph > 1.0 - dt:
            t = (ph - 1.0) / dt
            v -= t * t + t + t + 1.0
        y[i] = v
        ph += dt
        if ph >= 1.0:
            ph -= 1.0
    return y


def lp(x, fc, q=0.707):
    return svf(np.ascontiguousarray(x, dtype=np.float64), np.full(len(x), float(fc)) if np.isscalar(fc) else np.ascontiguousarray(fc, dtype=np.float64), q, 0)


def bp(x, fc, q=1.0):
    return svf(np.ascontiguousarray(x, dtype=np.float64), np.full(len(x), float(fc)) if np.isscalar(fc) else np.ascontiguousarray(fc, dtype=np.float64), q, 1)


def hp(x, fc, q=0.707):
    return svf(np.ascontiguousarray(x, dtype=np.float64), np.full(len(x), float(fc)) if np.isscalar(fc) else np.ascontiguousarray(fc, dtype=np.float64), q, 2)


def noise(n):
    return RNG.standard_normal(n)


def expseg(n, a, b):
    return a * (b / a) ** (np.arange(n) / max(1, n - 1))


def adsr(n, a=0.005, d=0.1, s=0.7, r=0.1, hold=None):
    """Attack/decay/sustain/release envelope over n samples; release starts at `hold` seconds."""
    t = tt(n)
    hold = hold if hold is not None else n / SR - r
    e = np.where(t < a, t / max(a, 1e-6), s + (1 - s) * np.exp(-(t - a) / max(d, 1e-6)))
    rel = np.clip((t - hold) / max(r, 1e-6), 0, 1)
    return e * (1 - rel)


def pan2(x, p):
    """equal-power pan, p in -1..1 (scalar or per-sample)"""
    a = (np.asarray(p) + 1) * np.pi / 4
    return np.stack([x * np.cos(a), x * np.sin(a)], axis=1)


# ------------------------------------------------------------------ buses
BUS = {k: np.zeros((N, 2)) for k in ('drums', 'bass', 'pads', 'keys', 'sfx', 'impact')}
SEND_REV = np.zeros((N, 2))
SEND_DLY = np.zeros((N, 2))


def put(bus, t0, sig, gain=1.0, pan=0.0, rev=0.0, dly=0.0):
    if sig.ndim == 1:
        sig = pan2(sig, pan)
    s = secs(t0)
    if s >= N:
        return
    if s < 0:
        sig = sig[-s:]
        s = 0
    e = min(N, s + len(sig))
    seg = sig[: e - s] * gain
    BUS[bus][s:e] += seg
    if rev:
        SEND_REV[s:e] += seg * rev
    if dly:
        SEND_DLY[s:e] += seg * dly


# ------------------------------------------------------------------ instruments
def kick(hard=1.0):
    n = secs(0.7)
    t = tt(n)
    f = 44 + 125 * np.exp(-t / 0.026) + 26 * np.exp(-t / 0.11)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / (0.3 + 0.08 * hard))
    click = hp(noise(n), 2500) * np.exp(-t / 0.0035) * 0.35
    x = body + click
    return np.tanh(1.8 * x * hard) / np.tanh(1.8)


def boom(dur=2.2, f0=64, f1=29, tau=0.95):
    n = secs(dur)
    t = tt(n)
    f = f1 + (f0 - f1) * np.exp(-t / 0.33)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * (1 - np.exp(-t / 0.004)) * np.exp(-t / tau)
    thump = lp(noise(n), 160) * np.exp(-t / 0.07) * 0.9
    return np.tanh(1.4 * (x + thump))


def clap():
    n = secs(0.5)
    t = tt(n)
    burst = np.zeros(n)
    for k, d in enumerate((0.0, 0.011, 0.022)):
        burst += np.exp(-np.clip(t - d, 0, None) / 0.006) * (t >= d)
    tail = np.exp(-t / 0.13)
    env = np.maximum(burst, tail * 0.55)
    return bp(noise(n), 1500, 0.9) * env * 1.6


def hat(open_=False, bright=1.0):
    n = secs(0.35 if open_ else 0.08)
    t = tt(n)
    ratios = (2.0, 3.0, 4.16, 5.43, 6.79, 8.21)
    metal = sum(np.sign(np.sin(2 * np.pi * 317 * r * t)) for r in ratios) / 6
    x = hp(0.6 * noise(n) + 0.4 * metal, 7200 * bright)
    return x * np.exp(-t / (0.14 if open_ else 0.022))


def crash(dur=2.6):
    n = secs(dur)
    t = tt(n)
    ratios = (1.0, 1.43, 1.73, 2.03, 2.57, 3.05)
    metal = sum(np.sign(np.sin(2 * np.pi * 393 * r * t + r)) for r in ratios) / 6
    x = hp(0.55 * noise(n) + 0.45 * metal, 4200)
    return x * np.exp(-t / 0.85) * (1 - np.exp(-t / 0.002))


def saw_voice(freq, n, detune_cents=0.0):
    f = np.full(n, freq * 2 ** (detune_cents / 1200))
    return saw_blep(f)


def pad(freqs, dur, cutoff=1800, attack=0.25, release=0.7, width=0.7, cut_end=None):
    n = secs(dur)
    out = np.zeros((n, 2))
    for k, f in enumerate(freqs):
        for d, pn in ((-9, -width), (0, 0.0), (9, width)):
            v = saw_voice(f, n, d + (k - len(freqs) / 2) * 0.8)
            out += pan2(v, pn * (0.6 + 0.4 * (k % 2)))
    fc = np.full(n, float(cutoff)) if cut_end is None else expseg(n, cutoff, cut_end)
    out[:, 0] = lp(out[:, 0], fc, 0.9)
    out[:, 1] = lp(out[:, 1], fc, 0.9)
    env = adsr(n, attack, 0.5, 0.85, release)
    return out * env[:, None] / (3 * len(freqs)) * 2.2


def bass_note(freq, dur):
    n = secs(dur)
    t = tt(n)
    sub = np.sin(2 * np.pi * freq * t)
    body = saw_blep(np.full(n, freq * 2.0))
    fc = 260 + 1300 * np.exp(-t / 0.07)
    x = 0.85 * sub + 0.45 * lp(body, fc, 1.1)
    return np.tanh(1.3 * x) * adsr(n, 0.004, 0.2, 0.8, 0.03)


def pluck(freq, dur=0.4, bright=1.0):
    n = secs(dur)
    t = tt(n)
    x = 0.7 * saw_blep(np.full(n, freq)) + 0.3 * np.sign(np.sin(2 * np.pi * freq * 1.002 * t))
    fc = 380 + 5200 * bright * np.exp(-t / 0.09)
    return lp(x, fc, 1.4) * np.exp(-t / 0.2) * (1 - np.exp(-t / 0.002))


def bell(freq, dur=2.2, index=2.4, ratio=3.5, tau=0.85):
    n = secs(dur)
    t = tt(n)
    I = index * np.exp(-t / 0.22)
    x = np.sin(2 * np.pi * freq * t + I * np.sin(2 * np.pi * freq * ratio * t))
    x += 0.25 * np.sin(2 * np.pi * freq * 2.76 * t) * np.exp(-t / 0.35)
    return x * np.exp(-t / tau) * (1 - np.exp(-t / 0.0015))


def blip(freq, dur=0.05):
    n = secs(dur)
    t = tt(n)
    f = freq * (1 + 0.06 * np.exp(-t / 0.004))
    return np.sin(2 * np.pi * np.cumsum(np.full(n, 1.0) * f) / SR) * (1 - np.exp(-t / 0.0015)) * np.exp(-t / (dur / 3))


def tick(freq=3200, dur=0.03):
    n = secs(dur)
    t = tt(n)
    return (np.sin(2 * np.pi * freq * t) * 0.6 + hp(noise(n), 5000) * 0.4) * np.exp(-t / 0.006)


def whoosh(dur, f0, f1, q=1.4, shape=0.5):
    """filtered-noise swell; peak at `shape` of its length"""
    n = secs(dur)
    u = np.arange(n) / n
    fc = expseg(n, f0, f1)
    x = bp(noise(n), fc, q) + 0.3 * lp(noise(n), fc * 0.5)
    env = np.where(u < shape, (u / shape) ** 2, np.exp(-(u - shape) / max(1e-3, (1 - shape)) * 3.2))
    return x * env


def riser(dur, f0=180, f1=5200):
    n = secs(dur)
    u = np.arange(n) / n
    fc = expseg(n, f0, f1)
    nz = bp(noise(n), fc, 2.2)
    tone = lp(saw_blep(expseg(n, 110, 880)), fc * 1.2, 1.5)
    trem = 0.75 + 0.25 * np.sin(2 * np.pi * np.cumsum(4 + 22 * u ** 2) / SR)
    return (0.7 * nz + 0.35 * tone) * (u ** 2.2) * trem


def reverse_swell(dur, bright=1.0):
    n = secs(dur)
    tail = crash(dur + 0.4)[:n] * 0.8 + whoosh(dur, 3000 * bright, 300, 1.0, 0.1)[:n] * 0.6
    return tail[::-1] * np.linspace(0.2, 1, n) ** 1.5


def sparkle(dur, n_grains, gather=True, lo=2200, hi=7200, seed=1):
    r = np.random.default_rng(seed)
    n = secs(dur)
    out = np.zeros((n, 2))
    for k in range(n_grains):
        u = r.random()
        pos = (u ** 0.55) if gather else (u ** 1.8)
        s = int(pos * (n - secs(0.05)))
        f = lo * (hi / lo) ** r.random()
        g = blip(f, 0.02 + 0.03 * r.random()) * (0.4 + 0.6 * r.random())
        p = (r.random() * 2 - 1) * (1 - pos if gather else pos)
        out[s:s + len(g)] += pan2(g, p)
    return out


def glitch(dur, seed=3):
    """stutter: 32nd-note slices of bleeps and noise, sample-held and bit-crushed"""
    r = np.random.default_rng(seed)
    n = secs(dur)
    out = np.zeros(n)
    sl = secs(S16 / 2)
    src = 0.6 * np.sign(np.sin(2 * np.pi * 740 * tt(n))) * lp(noise(n), 3000) + 0.5 * noise(n)
    for s in range(0, n, sl):
        e = min(n, s + sl)
        if r.random() < 0.72:
            seg = src[s:e].copy()
            hold = int(1 + r.random() * 18)
            seg = np.repeat(seg[::hold], hold)[: e - s]
            bits = 2 ** int(2 + r.random() * 4)
            seg = np.round(seg * bits) / bits
            out[s:e] = seg * (0.5 + 0.5 * r.random())
    return out * 0.6


def laser(dur=0.9):
    n = secs(dur)
    t = tt(n)
    f = expseg(n, 160, 1500)
    f[secs(0.25):] = 1500 * np.exp(-(t[secs(0.25):] - 0.25) / 0.8) + 300
    x = saw_blep(f)
    fc = 500 + 5000 * np.exp(-((t - 0.2) ** 2) / 0.02)
    return lp(x, fc, 3.5) * (1 - np.exp(-t / 0.004)) * np.exp(-t / 0.5)


# ------------------------------------------------------------------ reverb / delay
def make_ir(dur=2.6, seed=7):
    r = np.random.default_rng(seed)
    n = secs(dur)
    t = tt(n)
    ir = np.zeros((n, 2))
    for ch in range(2):
        nz = r.standard_normal(n)
        lo = lp(nz, 1800) * np.exp(-t / 0.9)
        hi = hp(nz, 1800) * np.exp(-t / 0.35)
        ir[:, ch] = lo + hi * 0.6
        for k in range(10):  # early reflections
            d = secs(0.008 + r.random() * 0.06)
            ir[d, ch] += (r.random() * 2 - 1) * 0.5
    ir *= (1 - np.exp(-t / 0.01))[:, None]
    return ir / np.sqrt(np.sum(ir ** 2) / 2)


def reverb(x, ir):
    y = np.zeros((len(x) + len(ir) - 1, 2))
    for ch in range(2):
        y[:, ch] = signal.fftconvolve(x[:, ch], ir[:, ch])
    return y[: len(x)]


def pingpong(x, delay=0.375, fb=0.38, taps=6):
    y = np.zeros_like(x)
    d = secs(delay)
    for k in range(1, taps + 1):
        g = fb ** k
        side = k % 2
        src = x[:, 0] + x[:, 1]
        if d * k >= len(x):
            break
        y[d * k:, side] += src[: len(x) - d * k] * g * 0.5
    y[:, 0] = lp(hp(y[:, 0], 300), 5000)
    y[:, 1] = lp(hp(y[:, 1], 300), 5000)
    return y


# ------------------------------------------------------------------ the score
def build():
    F1, F2 = midi(29), midi(41)
    # chords (MIDI) per bar of the drop, and the landing
    CH = {
        'Fm': [53, 56, 60, 65],
        'Db': [49, 53, 56, 61],
        'Ab': [56, 60, 63, 68],
        'Eb': [51, 55, 58, 63],
        'Ab9': [44, 51, 56, 60, 63, 70],
        'Dbma9': [49, 53, 56, 60, 63],
    }
    ROOT = {'Fm': 29, 'Db': 25, 'Ab': 32, 'Eb': 27}
    drop_bars = [(T['drop'], 'Fm'), (T['graph'], 'Db'), (T['beam'], 'Ab'), (T['fold'], 'Eb')]

    # ---------- INTRO: the tangle (0 – 5.5) ----------
    stop = T['stop']
    n_intro = secs(stop)
    t = tt(n_intro)
    fade_in = np.clip(t / 1.4, 0, 1) ** 2
    cut = np.clip((stop - t) / 0.012, 0, 1)
    drone = np.sin(2 * np.pi * F1 * t) * 0.3 + np.sin(2 * np.pi * F2 * t) * 0.22
    swell = 0.45 + 0.55 * np.clip(t / stop, 0, 1) ** 2
    put('bass', 0, drone * fade_in * cut * swell, 0.3)
    tension = pad([midi(41), midi(48), midi(56), midi(61)], stop, cutoff=380, attack=1.2, release=0.02, cut_end=1700)
    put('pads', 0, tension * (fade_in * cut * swell)[:, None], 0.3, rev=0.25)
    # heartbeat kicks establish the tempo under the headline
    for b in (2.0, 3.0, 4.0, 5.0):
        put('drums', b, lp(kick(0.8), 900), 0.38)
    # ticking hats, busier as the tangle thickens
    r = np.random.default_rng(11)
    tk = 1.0
    while tk < stop - 0.01:
        v = 0.18 + 0.25 * r.random() + 0.2 * (tk / stop)
        put('drums', tk, hat(False, 0.9), v * 0.38, pan=(r.random() - 0.5) * 0.6)
        tk += S16
    # data chatter: every source talking at once
    tc = 0.45
    while tc < stop - 0.02:
        dens = 3 + 22 * (tc / stop) ** 1.5
        penta = [65, 68, 70, 72, 75, 77, 80, 82, 84, 87]
        f = midi(penta[int(r.random() * len(penta))] + 12 * int(r.random() * 2))
        g = blip(f, 0.03 + 0.04 * r.random())
        put('sfx', tc, g, 0.07 + 0.05 * r.random(), pan=r.random() * 1.8 - 0.9, rev=0.25, dly=0.15)
        tc += (0.25 + r.random()) / dens
    # the opening whip + first light
    put('impact', 0.0, boom(2.4, 58, 28, 1.1), 0.55)
    # the first light crosses the frame: centre at ~0.1 s, gone right by ~0.25 s
    w = whoosh(0.75, 500, 5600, 1.2, 0.17)
    pw = np.clip(np.linspace(-1.2, 2.2, len(w)), -0.85, 0.85)
    put('sfx', 0.0, w, 0.95, pan=pw, rev=0.3)
    put('sfx', 0.0, tick(5200, 0.02), 0.12, pan=-0.8)
    # the pour-in bursts on the 8ths
    for k, bt in enumerate((0.5, 0.75, 1.0, 1.25, 1.5)):
        wb = whoosh(0.45, 700 + 300 * k, 4200, 1.3, 0.3)
        put('sfx', bt - 0.08, wb, 0.28 + 0.05 * k, pan=(-0.6 if k % 2 else 0.6), rev=0.3)
        put('sfx', bt, sparkle(0.3, 10, False, seed=20 + k), 0.18, rev=0.3)
    # type ticks: "Your data is" … "everywhere."
    for k, tw in enumerate((1.5, 1.625, 1.75)):
        put('sfx', tw, tick(2600 + 300 * k), 0.12, pan=-0.2)
    put('sfx', 1.86, sparkle(0.42, 34, True, seed=5), 0.35, rev=0.35)
    put('impact', 2.0, lp(kick(0.7), 700), 0.35)
    put('sfx', 3.0, whoosh(0.35, 900, 3000, 1.2, 0.35), 0.18, pan=0.4)
    put('sfx', 3.62, sparkle(0.4, 40, False, seed=9), 0.33, rev=0.35)
    put('sfx', 3.6, whoosh(0.45, 5000, 900, 1.2, 0.25), 0.22, pan=0.3)
    # the agent arrives, reaches, fails
    for k, tw in enumerate((4.0, 4.125, 4.5, 4.625, 4.75)):
        put('sfx', tw, tick(2400 + 250 * k), 0.11, pan=-0.2)
    n = secs(0.14)
    chirp = np.sin(2 * np.pi * np.cumsum(expseg(n, 520, 1560)) / SR) * np.exp(-tt(n) / 0.06)
    put('sfx', T['agent'] + 0.02, chirp, 0.3, pan=0.55, rev=0.3)
    n = secs(T['fail'] - T['probe'])
    scan_f = expseg(n, 420, 1900) * (1 + 0.03 * np.sin(2 * np.pi * 18 * tt(n)))
    scan = np.sin(2 * np.pi * np.cumsum(scan_f) / SR + 1.6 * np.sin(2 * np.pi * np.cumsum(scan_f * 2.01) / SR))
    put('sfx', T['probe'], scan * np.linspace(0.3, 1, n) * 0.5, 0.35, pan=np.linspace(0.5, -0.3, n), dly=0.2)
    gl = glitch(stop - T['fail'])
    put('sfx', T['fail'], gl, 0.5, pan=0.2)
    n = secs(stop - T['fail'])
    buzz = np.sign(np.sin(2 * np.pi * 110 * tt(n))) * (np.floor(tt(n) / (S16 / 2)) % 2 == 0)
    put('sfx', T['fail'], lp(buzz, 1200) * np.linspace(1, 0.6, n), 0.16, pan=0.3)
    put('sfx', 3.6, riser(stop - 3.6, 200, 3800), 0.33, rev=0.2)

    # ---------- THE STOP and the suck into the drop ----------
    rs = reverse_swell(0.5)
    put('impact', T['drop'] - 0.5, rs, 0.55, rev=0.1)
    n = secs(0.5)
    inhale = bp(noise(n), expseg(n, 400, 2600), 1.0) * np.linspace(0, 1, n) ** 2.5
    put('sfx', T['drop'] - 0.5, inhale, 0.35)

    # ---------- THE DROP (6 – 14) ----------
    drop, lock = T['drop'], T['lock']
    put('impact', drop, boom(2.6, 72, 27, 1.1), 0.95)
    put('impact', drop, crash(2.8), 0.45, rev=0.35)
    put('impact', drop, whoosh(0.8, 6500, 280, 1.1, 0.05), 0.55, rev=0.3)
    kick_times = [drop + k * BEAT for k in range(int((13.0 - drop) / BEAT) + 1)]
    for k, kt in enumerate(kick_times):
        put('drums', kt, kick(1.0 if k % 4 == 0 else 0.92), 0.95)
    for k in range(int((13.5 - drop) / BEAT)):
        bt = drop + k * BEAT
        if k % 2 == 1:
            put('drums', bt, clap(), 0.42, rev=0.25)
        put('drums', bt + BEAT / 2, hat(True), 0.22, pan=0.25)
        for s in range(4):
            put('drums', bt + s * S16, hat(False), 0.1 + (0.07 if s == 2 else 0), pan=-0.25)
    # sidechain curve from the kicks
    sc = np.ones(N)
    for kt in kick_times:
        s = secs(kt)
        m = min(N, s + secs(0.45))
        u = tt(m - s)
        sc[s:m] = np.minimum(sc[s:m], 1 - 0.72 * np.exp(-u / 0.11))
    sc_stereo = sc[:, None]
    bass_bus = np.zeros((N, 2))
    pad_bus = np.zeros((N, 2))
    for b0, ch in drop_bars:
        # bass: 8ths on the root
        for k in range(16 if ch != 'Eb' else 12):
            f = midi(ROOT[ch] + (12 if k % 4 == 3 else 0))
            x = bass_note(f, S16 * 1.8)
            s = secs(b0 + k * S16 * 2)
            e = min(N, s + len(x))
            bass_bus[s:e] += pan2(x, 0)[: e - s] * 0.5
        # pad
        pd = pad([midi(m) for m in CH[ch]], 2.1, cutoff=1400 if ch != 'Eb' else 900, attack=0.03, release=0.25, cut_end=None if ch != 'Eb' else 5200)
        s = secs(b0)
        e = min(N, s + len(pd))
        pad_bus[s:e] += pd[: e - s] * 0.7
        # plucked arpeggio on 16ths
        notes = CH[ch]
        seq = [notes[0] + 12, notes[1] + 12, notes[2] + 12, notes[3] + 12, notes[2] + 24, notes[3] + 12, notes[1] + 24, notes[2] + 12]
        for k in range(16):
            tn = b0 + k * S16
            if tn >= 13.5:
                break
            f = midi(seq[k % 8])
            put('keys', tn, pluck(f, 0.3, 0.9 + 0.2 * (k % 4 == 0)), 0.16 + 0.05 * (k % 4 == 0), pan=(-0.35 if k % 2 else 0.35), rev=0.3, dly=0.35)
    BUS['bass'] += bass_bus * sc_stereo
    BUS['pads'] += pad_bus * sc_stereo
    # the rush down the funnel, sources whipping past
    put('sfx', drop + 0.1, whoosh(1.9, 300, 4200, 1.0, 0.8), 0.22, rev=0.2)
    r = np.random.default_rng(12)
    for k in range(10):
        tw = drop + 0.35 + k * 0.16 + r.random() * 0.05
        put('sfx', tw, whoosh(0.22, 2500, 700, 1.8, 0.4), 0.14, pan=(r.random() * 2 - 1))
    # implosion into the hub, then the graph blooms
    n = secs(0.5)
    suck = whoosh(0.5, 300, 5200, 1.2, 0.95)
    put('sfx', T['graph'] - 0.5, suck, 0.35)
    put('impact', T['graph'], boom(1.4, 90, 40, 0.5), 0.45)
    put('impact', T['graph'], crash(1.2), 0.18, rev=0.3)
    for c in range(6):
        f = midi([61, 65, 68, 73, 77, 80][c])
        put('keys', T['graph'] + c * S16, bell(f, 0.9, 1.4, 2.0, 0.28), 0.14, pan=(c / 2.5 - 1), rev=0.35)
    # the beam fires; agents check in
    put('impact', T['beam'], laser(1.1), 0.34, rev=0.4, dly=0.25)
    put('impact', T['beam'], boom(1.5, 80, 34, 0.6), 0.5)
    for k, tc_ in enumerate((10.5, 10.75, 11.0)):
        put('keys', tc_, bell(midi([80, 84, 87][k]), 1.4, 1.8, 3.5, 0.6), 0.2, pan=0.35 + 0.15 * k, rev=0.35)
        put('sfx', tc_, tick(4200, 0.02), 0.1, pan=0.4)
    # the fold: whoosh, snare roll, drums out, reverse swell into the lockup
    put('sfx', T['fold'], whoosh(1.0, 3500, 500, 1.0, 0.35), 0.3, pan=np.linspace(0.6, -0.4, secs(1.0)))
    tr = 13.0
    k = 0
    while tr < 13.5:
        put('drums', tr, clap(), 0.12 + 0.3 * (tr - 13.0), rev=0.2)
        tr += S16 / (1 if tr < 13.25 else 2)
        k += 1
    put('sfx', 12.2, riser(lock - 12.2, 260, 7000), 0.3, rev=0.25)
    put('impact', lock - 0.55, reverse_swell(0.55, 1.2), 0.5)
    put('sfx', T['fold'] + 1.45, whoosh(0.55, 800, 3800, 1.1, 0.8), 0.25)

    # ---------- THE LOCKUP (14 – 20) ----------
    put('impact', lock, kick(1.1), 0.8)
    put('impact', lock, boom(3.2, 70, 30, 1.4), 0.75)
    put('impact', lock, crash(3.4), 0.42, rev=0.45)
    stab = pad([midi(m) for m in CH['Ab9']], 1.2, cutoff=4200, attack=0.004, release=0.9)
    put('pads', lock, stab, 0.85, rev=0.5)
    for m in (56, 63, 68, 72):
        put('keys', lock, bell(midi(m + 12), 3.0, 1.6, 3.5, 1.1), 0.1, pan=(m - 64) / 12, rev=0.4)
    # sustained bed: Ab add9 → Db maj9 → Ab add9, fading to the end
    bed = [(lock, 2.2, 'Ab9'), (16.0, 2.2, 'Dbma9'), (18.0, 2.0, 'Ab9')]
    for b0, d, ch in bed:
        pdd = pad([midi(m) for m in CH[ch]], d + 0.4, cutoff=1500, attack=0.35, release=0.8)
        put('pads', b0, pdd, 0.55, rev=0.45)
    n = secs(DUR - lock)
    put('bass', lock, np.sin(2 * np.pi * midi(32) * tt(n)) * adsr(n, 0.02, 1.2, 0.5, 2.2), 0.35)
    for k, tw in enumerate((14.5, 14.75, 15.0)):
        put('keys', tw, bell(midi([72, 75, 80][k]), 1.6, 1.1, 2.0, 0.55), 0.13, pan=-0.3 + 0.3 * k, rev=0.4, dly=0.25)
    put('keys', T['cta'], bell(midi(80), 2.6, 1.4, 3.5, 1.0), 0.22, rev=0.45, dly=0.2)
    put('keys', T['cta'], bell(midi(87), 2.6, 1.0, 3.5, 0.9), 0.1, rev=0.45)
    put('sfx', T['cta'] + 0.3, tick(3600), 0.08)
    put('sfx', 17.1, sparkle(0.9, 18, False, 4000, 9000, seed=31), 0.12, rev=0.4)
    # the arrow nudges on the downbeat; a second sheen crosses the button
    put('sfx', 18.0, tick(3000, 0.025), 0.07, pan=0.15)
    put('sfx', 18.9, sparkle(0.8, 14, False, 4200, 9000, seed=37), 0.09, rev=0.4)
    # a soft pulse keeps the end card alive
    for k in range(int((19.0 - 16.0) / (BEAT / 2))):
        put('drums', 16.0 + k * BEAT / 2, hat(False, 1.1), 0.05, pan=(-0.2 if k % 2 else 0.2))


def master():
    ir = make_ir()
    rev = reverb(SEND_REV, ir) * 0.55
    dly = pingpong(SEND_DLY)
    # the stop: one beat of near-silence (only the reverse swell on the impact bus rides through)
    t = tt(N)
    gate = 1 - (1 - 10 ** (-38 / 20)) * np.clip((t - T['stop']) / 0.015, 0, 1) * np.clip((T['drop'] - 0.02 - t) / 0.02, 0, 1)
    gate = gate[:, None]
    mix = BUS['impact'] + (sum(v for k, v in BUS.items() if k != 'impact') + rev + dly * 0.6) * gate
    sos = signal.butter(2, 24, 'hp', fs=SR, output='sos')
    mix = signal.sosfiltfilt(sos, mix, axis=0)
    # gentle glue compression on the whole mix (RMS, 2:1 above -16 dBFS)
    lvl = np.sqrt(signal.lfilter([1 - 0.995], [1, -0.995], np.mean(mix ** 2, axis=1)) + 1e-12)
    db = 20 * np.log10(lvl)
    gr = np.where(db > -16, (db + 16) * (1 - 1 / 2.0), 0)
    gain = 10 ** (-gr / 20)
    gain = signal.lfilter([1 - 0.999], [1, -0.999], gain)
    mix = mix * gain[:, None]
    # tail: fade the last 0.35 s so the loop point is clean
    n = secs(0.35)
    mix[-n:] *= np.linspace(1, 0, n)[:, None] ** 1.5
    return mix


def true_peak(x, os=4):
    up = signal.resample_poly(x, os, 1, axis=0)
    return 20 * np.log10(np.max(np.abs(up)) + 1e-12)


def limit(x, ceiling_db=-1.2, look=0.004, release=0.08):
    """lookahead peak limiter on 4x oversampled peaks"""
    ceiling = 10 ** (ceiling_db / 20)
    up = signal.resample_poly(np.max(np.abs(x), axis=1), 4, 1)[::4]
    need = np.minimum(1.0, ceiling / np.maximum(up, 1e-9))
    L = secs(look)
    # lookahead: take the minimum over the next L samples
    padded = np.concatenate([need, np.ones(L)])
    win = np.lib.stride_tricks.sliding_window_view(padded, L + 1).min(axis=1)[: len(need)]
    g = _release(win, np.exp(-1 / (release * SR)))
    return x * g[:, None]


@njit(cache=True)
def _release(win, a):
    """instant attack, exponential release"""
    g = np.empty_like(win)
    cur = 1.0
    for i in range(win.shape[0]):
        cur = win[i] if win[i] < cur else a * cur + (1 - a) * win[i]
        g[i] = cur
    return g


def main():
    build()
    mix = master()
    meter = pyln.Meter(SR)
    target = -14.0
    for it in range(6):
        lufs = meter.integrated_loudness(mix)
        mix = mix * 10 ** ((target - lufs) / 20)
        mix = limit(mix, -1.35)
    lufs = meter.integrated_loudness(mix)
    tp = true_peak(mix)
    os.makedirs(os.path.join(ROOT, 'assets/audio'), exist_ok=True)
    out = os.path.join(ROOT, 'assets/audio/spot-mix.wav')
    sf.write(out, mix.astype(np.float32), SR, subtype='PCM_24')
    print(f'wrote {out}  integrated {lufs:.2f} LUFS  true peak {tp:.2f} dBTP')
    if '--stems' in sys.argv:
        sd = os.path.join(HERE, 'stems')
        os.makedirs(sd, exist_ok=True)
        for k, v in BUS.items():
            sf.write(os.path.join(sd, k + '.wav'), (v / (np.max(np.abs(v)) + 1e-9) * 0.9).astype(np.float32), SR, subtype='PCM_16')


if __name__ == '__main__':
    main()

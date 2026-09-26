#!/usr/bin/env python3
"""Check the mix without ears: loudness, true peak, and whether the hits land on the cuts.
Writes audio/analysis.png (waveform, spectrogram, short-term loudness, cut markers) and prints a report.
    python3 audio/analyze.py [path.wav|path.mp4]
"""
import os
import subprocess
import sys
import tempfile
import numpy as np
import soundfile as sf
import pyloudnorm as pyln
from scipy import signal
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
CUTS = {0.0: 'whip', 2.0: 'cut', 3.0: 'cut', 4.0: 'agent', 4.85: 'fail', 5.5: 'stop', 6.0: 'DROP', 8.0: 'graph', 10.0: 'beam',
        10.5: 'chip', 10.75: 'chip', 11.0: 'chip', 12.0: 'fold', 14.0: 'LOCK', 16.0: 'cta'}

src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'assets/audio/spot-mix.wav')
if src.endswith('.mp4'):
    tmp = tempfile.mktemp(suffix='.wav')
    ff = os.environ.get('FFMPEG', 'ffmpeg')
    subprocess.run([ff, '-hide_banner', '-loglevel', 'error', '-y', '-i', src, '-vn', '-ac', '2', '-ar', '48000', tmp], check=True)
    src = tmp
x, sr = sf.read(src, always_2d=True)
mono = x.mean(axis=1)
meter = pyln.Meter(sr)
lufs = meter.integrated_loudness(x)
up = signal.resample_poly(x, 4, 1, axis=0)
tp = 20 * np.log10(np.max(np.abs(up)) + 1e-12)
dc = np.mean(x, axis=0)
corr = np.corrcoef(x[:, 0], x[:, 1])[0, 1]
print(f'file {src}\n  duration {len(x) / sr:.3f}s  integrated {lufs:.2f} LUFS  true peak {tp:.2f} dBTP  DC {dc[0]:+.5f}/{dc[1]:+.5f}  L/R corr {corr:.2f}')

# short-term loudness (3 s window per EBU; we show 400 ms momentary too)
hop = int(0.1 * sr)
mom = []
for s in range(0, len(x) - int(0.4 * sr), hop):
    blk = x[s:s + int(0.4 * sr)]
    try:
        mom.append(meter.integrated_loudness(blk) if np.any(blk) else -70)
    except Exception:
        mom.append(-70)
mom = np.clip(np.array(mom), -60, 0)

# onset strength: positive spectral flux, then peaks
f, t, Z = signal.stft(mono, sr, nperseg=1024, noverlap=768)
mag = np.log1p(np.abs(Z) * 100)
flux = np.maximum(0, np.diff(mag, axis=1)).sum(axis=0)
flux = (flux - flux.mean()) / (flux.std() + 1e-9)
ft = t[1:]
peaks, _ = signal.find_peaks(flux, height=2.0, distance=int(0.09 / (t[1] - t[0])))
print('  strongest onsets vs cuts:')
for ct, name in CUTS.items():
    near = [ft[p] for p in peaks if abs(ft[p] - ct) < 0.06]
    d = min(near, key=lambda v: abs(v - ct)) - ct if near else None
    print(f'    {name:>6} @ {ct:5.2f}s  ' + (f'onset {d * 1000:+5.0f} ms' if d is not None else 'no onset within 60 ms'))

# picture
W, H = 1800, 900
img = Image.new('RGB', (W, H), (16, 16, 19))
d = ImageDraw.Draw(img)
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 14)
except Exception:
    font = ImageFont.load_default()
dur = len(x) / sr
X = lambda sec: int(60 + (W - 80) * sec / dur)
# waveform (peak per column)
top, h = 30, 220
cols = W - 80
for c in range(cols):
    s0, s1 = int(c / cols * len(mono)), int((c + 1) / cols * len(mono))
    seg = x[s0:s1]
    if len(seg):
        a = float(np.max(np.abs(seg)))
        d.line([(60 + c, top + h / 2 - a * h / 2), (60 + c, top + h / 2 + a * h / 2)], fill=(120, 140, 255))
d.text((8, top), 'wave', fill=(200, 200, 200), font=font)
# spectrogram (log freq)
top2, h2 = 270, 380
spec = 20 * np.log10(np.abs(Z) + 1e-7)
fmin, fmax = 30, 16000
rows = h2
colsS = spec.shape[1]
img_s = np.zeros((rows, cols))
fidx = np.clip((np.log(f + 1e-9) - np.log(fmin)) / (np.log(fmax) - np.log(fmin)), 0, 1)
for r in range(rows):
    target = 1 - r / rows
    k = int(np.argmin(np.abs(fidx - target)))
    row = spec[k]
    img_s[r] = np.interp(np.linspace(0, colsS - 1, cols), np.arange(colsS), row)
img_s = np.clip((img_s + 90) / 80, 0, 1)
rgb = (np.stack([img_s ** 1.5 * 180, img_s ** 1.1 * 190, img_s ** 0.8 * 255], axis=2)).astype('uint8')
img.paste(Image.fromarray(rgb), (60, top2))
d.text((8, top2), 'spec', fill=(200, 200, 200), font=font)
# momentary loudness
top3, h3 = 680, 180
pts = [(X(i * 0.1 + 0.2), top3 + h3 * (-(v) / 60)) for i, v in enumerate(mom)]
d.line(pts, fill=(255, 200, 80), width=2)
for db in (-14, -23, -40):
    y = top3 + h3 * (-db / 60)
    d.line([(60, y), (W - 20, y)], fill=(60, 60, 70))
    d.text((8, y - 8), f'{db} LU', fill=(160, 160, 160), font=font)
# cuts
for ct, name in CUTS.items():
    d.line([(X(ct), 20), (X(ct), H - 20)], fill=(255, 80, 80) if name.isupper() else (200, 70, 70))
    d.text((X(ct) + 3, 8), name, fill=(255, 150, 150), font=font)
d.text((W - 520, H - 22), f'integrated {lufs:.2f} LUFS · true peak {tp:.2f} dBTP · momentary loudness in yellow', fill=(220, 220, 220), font=font)
out = os.path.join(HERE, 'analysis.png')
img.save(out)
print('  plot ->', out)

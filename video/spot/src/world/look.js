// The grade over time: exposure hits, bloom, aberration, glitch, shockwaves, motion-blur samples.
import { T, BEAT } from '../config.js';
import { E, lerp, inv, smooth } from '../math.js';

const hit = (t, at, peak, decay = 0.35) => (t < at ? 0 : peak * Math.exp(-(t - at) / decay));

export function gradeAt(t) {
  // exposure: dark open, the whip lights the world, stop-down dims it, the drop overexposes
  let exposure = 1.0;
  exposure *= 1 - 0.5 * smooth(T.stop - 0.04, T.stop + 0.12, t) * (t < T.drop ? 1 : 0);
  exposure += hit(t, T.drop, 1.5, 0.1) + hit(t, T.graph, 0.6, 0.18) + hit(t, T.beam, 1.1, 0.25) + hit(t, T.lock, 0.5, 0.3);
  // bursts on the pour-in beats
  for (const b of [0.5, 0.75, 1.0, 1.25, 1.5]) exposure += hit(t, b, 0.18, 0.12);

  let bloom = 0.85 + 0.55 * smooth(T.drop, T.drop + 0.4, t) * (1 - smooth(T.graph - 0.2, T.graph + 0.3, t)) + 0.35 * smooth(T.beam, T.beam + 0.3, t) * (1 - smooth(T.fold, T.lock, t));
  let streak = 0.25 + 0.5 * smooth(T.beam - 0.2, T.beam + 0.4, t) * (1 - smooth(T.fold + 0.2, T.fold + 0.9, t)) - 0.17 * smooth(T.fold + 0.2, T.fold + 0.9, t);

  let ca = 0.35 + hit(t, T.drop, 3.2, 0.35) + hit(t, T.graph, 1.0, 0.2) + hit(t, T.beam, 1.2, 0.3);
  let glitch = 0;
  if (t > T.fail && t < T.stop + 0.02) {
    // stutter on the 16ths
    const k = (t - T.fail) / (BEAT / 4);
    const ph = k - Math.floor(k);
    glitch = (ph < 0.45 ? 1 : 0.15) * (1 - 0.5 * inv(T.fail, T.stop, t));
  }
  // shock: [x, y, radius, amount] — the centre is filled in by the renderer
  let shock = null;
  const sd = t - T.drop;
  if (sd >= 0 && sd < 0.9) shock = { at: 'center', r: E.cubicOut(sd / 0.9) * 1.3, a: 1 - sd / 0.9 };
  const sb = t - T.beam;
  if (sb >= 0 && sb < 0.7) shock = { at: 'merge', r: E.cubicOut(sb / 0.7) * 0.9, a: 0.7 * (1 - sb / 0.7) };
  const sl = t - T.lock;
  if (sl >= 0 && sl < 0.9) shock = { at: 'glyph', r: E.cubicOut(sl / 0.9) * 1.1, a: 0.22 * (1 - sl / 0.9) };

  const flash = hit(t, T.drop, 0.22, 0.12) + hit(t, T.lock, 0.05, 0.2);
  const sat = 1 - 0.65 * smooth(T.stop - 0.02, T.stop + 0.1, t) * (t < T.drop ? 1 : 0);
  const vig = 0.55 + 0.3 * smooth(T.stop, T.stop + 0.15, t) * (t < T.drop ? 1 : 0) - 0.15 * smooth(T.lock, T.lock + 1, t);
  const fade = 0;
  const grain = 0.022;

  // motion-blur samples per frame and shutter (seconds)
  // more samples where things move violently, so the blur stays smooth instead of stepping
  let K = 6;
  if (t < 1.1) K = 14; // the opening whip
  if (t >= T.drop && t < T.graph) K = 10;
  if (t >= T.drop && t < T.drop + 0.55) K = 26; // the snap from tangle to funnel
  if (t >= T.graph - 0.6 && t < T.graph) K = 16; // the implosion into the hub
  if (t >= T.graph && t < T.graph + 0.5) K = 12; // the bloom out of it
  if (t >= T.beam && t < T.beam + 0.6) K = 14; // strands swing into the beam
  if (t >= T.fold && t < T.fold + 1.0) K = 14; // the fold into the mark
  if (t >= T.fold + 1.4 && t < T.lock + 0.1) K = 12; // the pull-back onto the lockup
  if (t >= T.lock + 0.7) K = 3;
  // the snap into the funnel reads crisper with a short shutter; the rush down it wants long streaks
  const shutter = t >= T.drop && t < T.graph ? (t < T.drop + 0.4 ? 0.3 : 0.75) / 30 : 0.5 / 30;

  // haze centre follows the action
  const hazeC = t < T.graph ? [0.5, 0.5] : t < T.fold ? [lerp(0.6, 0.36, smooth(T.beam, T.beam + 0.8, t)), 0.6] : [0.5, 0.55];
  const haze = t < T.drop ? 0.016 : 0.024;
  return { exposure, bloom, streak, ca, glitch, shock, flash, sat, vig, fade, grain, K, shutter, hazeC, haze };
}

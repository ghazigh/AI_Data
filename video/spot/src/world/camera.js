// One virtual camera for the whole film: a pure function of time, with hard cuts on the downbeats.
import { T, WORLD, BEAT, LAYOUTS } from '../config.js';
import { E, clamp, lerp, inv, seg, wob, track, rng } from '../math.js';

const V = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a, s) => [a[0] * s, a[1] * s, a[2] * s],
  lerp: (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)],
  norm: (a) => {
    const l = Math.hypot(a[0], a[1], a[2]) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  },
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
};
export { V };

const DEG = Math.PI / 180;

// Place `anchor` at screen px (sx, sy) for a camera at `pos` looking roughly at it: returns the look target.
function aimAt(pos, anchor, sx, sy, fov, L, roll = 0) {
  const dir = V.norm(V.sub(anchor, pos));
  const right = V.norm(V.cross(dir, [0, 1, 0]));
  const up = V.cross(right, dir);
  // the screen axes once the camera is rolled
  const c = Math.cos(roll * DEG), s = Math.sin(roll * DEG);
  const sxAxis = V.add(V.mul(right, c), V.mul(up, s));
  const syAxis = V.add(V.mul(right, -s), V.mul(up, c));
  const D = Math.hypot(...V.sub(anchor, pos));
  const ppu = L.H / 2 / (D * Math.tan((fov * DEG) / 2)); // px per world unit at the anchor's depth
  const dx = (sx - L.W / 2) / ppu;
  const dy = (L.H / 2 - sy) / ppu;
  return V.sub(V.sub(anchor, V.mul(sxAxis, dx)), V.mul(syAxis, dy));
}

// orbit position around c: yaw from +z toward +x, pitch up
const orbit = (c, yaw, pitch, r) => [
  c[0] + Math.sin(yaw * DEG) * Math.cos(pitch * DEG) * r,
  c[1] + Math.sin(pitch * DEG) * r,
  c[2] + Math.cos(yaw * DEG) * Math.cos(pitch * DEG) * r,
];

export function createCamera(aspect) {
  const L = LAYOUTS[aspect];
  const portrait = L.H > L.W;
  const G = WORLD.hub;
  const K = WORLD.glyphK;
  // portrait frames are narrower: widen the lens a touch so the worlds still read
  const fovK = portrait ? 1.28 : 1;

  // lockup pose: the fibre glyph must land exactly on the DOM logo box
  const [gl, gt, gs] = L.glyph;
  const lockFov = 30 * (portrait ? 1.25 : 1);
  const ppuLock = gs / K; // px per world unit at the glyph plane
  const Dlock = L.H / 2 / (ppuLock * Math.tan((lockFov * DEG) / 2));
  const gcx = gl + 14 * gs, gcy = gt + 10 * gs; // glyph centre on screen
  const lockPos = [G[0] + (L.W / 2 - gcx) / ppuLock, G[1] - (L.H / 2 - gcy) / ppuLock, G[2] + Dlock];
  // hero pose: the same glyph, big and centred
  const heroFov = lockFov;
  const ppuHero = L.heroGlyphW / (28 * K);
  const Dhero = L.H / 2 / (ppuHero * Math.tan((heroFov * DEG) / 2));
  const heroPos = [G[0], G[1] + (portrait ? -40 : 18), G[2] + Dhero];

  // beat pump: a small kick on every beat of the drop section
  const R = rng(77);
  const kicks = [];
  for (let b = T.drop; b < T.fold + 0.01; b += BEAT) kicks.push({ t: b, a: R() * Math.PI * 2, s: b % 2 === 0 ? 1 : 0.6 });
  const pump = (t) => {
    let x = 0, y = 0, f = 0;
    for (const k of kicks) {
      const d = t - k.t;
      if (d < 0 || d > 0.6) continue;
      const e = Math.exp(-d * 9) * k.s;
      x += Math.cos(k.a) * e * Math.sin(d * 38);
      y += Math.sin(k.a) * e * Math.sin(d * 38);
      f += e;
    }
    return [x, y, f];
  };

  const graphYaw = track([[T.graph, -70], [T.graph + 0.75, -44, E.expoOut], [T.uses, -30, E.sineInOut], [T.uses + 0.8, -22, E.cubicInOut], [T.beam, -12, E.sineInOut], [T.beam + 0.6, -8, E.cubicInOut], [T.fold, 3, E.sineInOut]]);
  const graphPitch = track([[T.graph, 22], [T.uses, 16, E.sineInOut], [T.beam, 12, E.sineInOut], [T.fold, 7, E.sineInOut]]);
  const graphR = track([[T.graph, 2050], [T.graph + 0.75, 1720, E.expoOut], [T.uses, 1640, E.sineInOut], [T.uses + 0.8, 1760, E.cubicInOut], [T.beam, 1860, E.sineInOut], [T.beam + 0.6, 2050, E.cubicInOut], [T.fold, 2300, E.sineInOut]]);
  // where the graph centre sits on screen (px): right for "One graph.", left once the catalog needs the room
  const gsx = portrait
    ? track([[T.graph, 540], [T.fold, 540]])
    : track([[T.graph, 960], [T.graph + 0.9, 1240, E.expoOut], [T.uses, 1230], [T.uses + 0.8, 620, E.cubicInOut], [T.beam, 610], [T.beam + 0.8, 610, E.cubicInOut], [T.fold, 590]]);
  const gsy = portrait
    ? track([[T.graph, 960], [T.graph + 0.9, 700, E.expoOut], [T.uses, 700], [T.uses + 0.8, 470, E.cubicInOut], [T.beam, 470], [T.beam + 0.8, 880, E.cubicInOut], [T.fold, 880]])
    : track([[T.graph, 540], [T.graph + 0.9, 398, E.expoOut], [T.uses, 390], [T.uses + 0.8, 400, E.cubicInOut], [T.beam, 390], [T.beam + 0.8, 360, E.cubicInOut], [T.fold, 380]]);
  // pipelines: a tracking shot that rides the flow and ends on the merge point, dead centre, for the cut

  function at(t) {
    let pos, tgt, fov, roll = 0, focus = 1500, ap = 0;
    if (t < 2.0) {
      const u = seg(t, 0, 2, E.quadOut);
      pos = V.lerp([0, 70, 1580], [-30, 20, 1250], u);
      tgt = V.lerp([0, 0, -900], [60, -30, -900], u);
      fov = 50;
      roll = lerp(0, -2.5, u);
      focus = lerp(2200, 1700, u);
      ap = 5;
    } else if (t < 3.0) {
      const u = seg(t, 2, 3, E.cubicOut);
      pos = V.lerp([430, -150, 760], [330, -105, 590], u);
      tgt = V.lerp([-260, 80, -1300], [-200, 55, -1300], u);
      fov = 44;
      roll = lerp(5, 2.5, u);
      focus = 1250;
      ap = 7;
    } else if (t < 4.0) {
      const u = seg(t, 3, 4, E.cubicOut);
      pos = V.lerp([-560, 250, 990], [-460, 190, 820], u);
      tgt = V.lerp([330, -110, -900], [260, -80, -900], u);
      fov = 54;
      roll = lerp(-4.5, -2, u);
      focus = 1350;
      ap = 6;
    } else if (t < T.drop) {
      // the agent shot: a slow push that stalls on the stop, then draws back before the drop
      const push = seg(t, 4, T.stop, E.quadOut);
      const back = seg(t, T.stop + 0.25, T.drop, E.sineInOut);
      pos = [0, 0, lerp(1330, 1175, push) + 70 * back];
      tgt = [0, 0, -700];
      fov = 48 + 1.5 * back;
      roll = 0;
      focus = lerp(950, 820, push);
      ap = 5.5;
    } else if (t >= T.pipe && t < T.graph) {
      const u = inv(T.pipe, T.graph, t);
      const e = E.sineInOut(u);
      const k = portrait ? 1.55 : 1;
      const anchor = [G[0] - lerp(1650, 0, E.quadIn(u)), G[1], G[2]];
      pos = [anchor[0] - lerp(650, 150, e) * k, G[1] + lerp(300, 120, e) * k, G[2] + lerp(2900, 2000, e) * k];
      fov = 42;
      roll = lerp(2.5, 0, e);
      const sx = portrait ? 540 : lerp(1000, 960, E.cubicIn(u));
      const sy = portrait ? lerp(700, 960, E.cubicIn(u)) : lerp(405, 540, E.cubicIn(u));
      tgt = aimAt(pos, anchor, sx, sy, fov * fovK, L, roll);
      focus = Math.hypot(...V.sub(anchor, pos));
      ap = 3;
    } else if (t < T.graph) {
      // the drop: rush down the funnel, lens widening, barrel roll
      const u = inv(T.drop, T.pipe, t);
      const z = 1245 - 3500 * (0.62 * E.expoOut(clamp(u * 1.15)) + 0.38 * u * u);
      pos = [0, 0, z];
      tgt = [0, 0, z - 3000];
      fov = lerp(49.5, 80, E.cubicInOut(u));
      roll = 42 * E.quartOut(u);
      focus = 1800;
      ap = 2.5;
    } else if (t < T.fold) {
      const yaw = graphYaw(t), pitch = graphPitch(t), r = graphR(t) * (portrait ? 1.8 : 1);
      pos = orbit(G, yaw, pitch, r);
      fov = 42;
      // in portrait the camera rolls so the one blue line shoots up the tall frame
      roll = lerp(-3, 1.5, inv(T.graph, T.fold, t)) + (portrait ? -90 * E.cubicInOut(inv(T.beam - 0.3, T.beam + 0.6, t)) : 0);
      tgt = aimAt(pos, G, gsx(t), gsy(t), fov * fovK, L, roll);
      focus = r;
      ap = 4.5;
    } else {
      // fold to the hero glyph, then pull back onto the lockup
      const end = at(T.fold - 1e-4);
      const u = seg(t, T.fold, T.fold + 0.95, E.quintInOut);
      const w = seg(t, T.fold + 1.45, T.lock, E.expoInOut);
      const heroTgt = V.add(heroPos, [0, 0, -1]);
      pos = V.lerp(V.lerp(end.pos, heroPos, u), lockPos, w);
      // targets: blend in direction space so the fold doesn't swing through odd angles
      const d0 = V.norm(V.sub(end.tgt, end.pos));
      const d1 = V.norm(V.sub(heroTgt, heroPos));
      const d = V.norm(V.lerp(d0, d1, u));
      tgt = V.add(pos, d);
      fov = lerp(lerp(end.fov, heroFov, u), lockFov, w);
      roll = lerp(end.roll, 0, u);
      focus = Math.hypot(...V.sub(pos, G));
      ap = lerp(end.ap, 0, u);
      if (t > T.lock) {
        // the lockup breathes: a very slow push
        const b = inv(T.lock, T.end, t);
        pos = V.add(lockPos, [0, 0, -Dlock * 0.018 * E.sineInOut(b)]);
        tgt = V.add(pos, [0, 0, -1]);
      }
      return { pos, tgt, fov, roll, focus, ap };
    }
    // handheld life + the beat pump
    const hh = t < T.drop ? 5 : 3;
    pos = V.add(pos, [wob(t * 0.9, 1) * hh, wob(t * 0.8, 2) * hh, 0]);
    if (t >= T.drop && t < T.fold) {
      const [px, py, pf] = pump(t);
      pos = V.add(pos, [px * 7, py * 7, 0]);
      fov -= pf * 0.9;
    }
    return { pos, tgt, fov: fov * fovK, roll, focus, ap };
  }

  return { at, lockPos, heroPos, Dlock, lockFov };
}

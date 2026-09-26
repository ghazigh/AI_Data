// Everything in the 3D world, as a pure function of time.
// 288 strands of light share one set of points and morph through five shapes:
//   CHAOS  (every source, tangled)  →  FUNNEL (combed into one flow)  →  GRAPH (woven into one graph)
//   →  BEAM (pulled into one blue line)  →  LOGO (three streams merging into the bar: the datalith mark)
// Because it is always the same strands, every transition carries motion across the cut.
import { T, WORLD } from '../config.js';
import { rng, clamp, lerp, inv, smooth, seg, E, TAU, fract, hash1, bez2, bez3 } from '../math.js';
import { buildGraph } from './graph.js';

export const NS = 288; // strands
export const NP = 96; // points per strand
export const HERO = NS; // the first stream that whips through the dark
export const PROBE = NS + 1; // the agent's failed probe
export const ROWS = NS + 2;

// scene colours are linear light
const BLUE = [0.035, 0.1, 1.0];
const ICE = [0.82, 0.88, 1.0];
const CHAOS_COL = [
  [0.85, 0.89, 1.0],
  [1.0, 0.8, 0.62],
  [0.62, 0.86, 1.0],
  [0.8, 0.74, 1.0],
  [0.6, 0.62, 0.68],
  [0.95, 0.95, 0.95],
  [1.0, 0.9, 0.8],
];
const WARN = [1.0, 0.32, 0.12];

export const LOGO_UB = 0.58; // share of each strand spent on the stream before the bar

export function createField(opts = {}) {
  const portrait = !!opts.portrait;
  const R = rng(1789);
  const G = WORLD.hub;
  const K = WORLD.glyphK;
  const graph = buildGraph(G);
  const { nodes, edges } = graph;
  const NE = edges.length;

  let maxX = -1e9;
  for (const n of nodes) maxX = Math.max(maxX, n.p[0]);
  const M = [maxX + 120, G[1] - 10, G[2]]; // where the streams merge into the beam
  const BEAM_LEN = 3200;
  const UM = 0.46;

  // node pop times: hub, then a domain per 16th note
  const pop = new Float64Array(nodes.length);
  pop[graph.hub] = T.graph - 0.05;
  graph.centres.forEach((id, c) => {
    pop[id] = T.graph + c * 0.125;
    graph.leaves[c].forEach((lid, k) => (pop[lid] = T.graph + c * 0.125 + 0.0625 + k * 0.035));
  });

  // strands per edge: hub spokes are thick bundles, chords are single hairlines
  const wts = edges.map(([a, b]) => {
    const ka = nodes[a].kind, kb = nodes[b].kind;
    if (ka === 0 || kb === 0) return 10;
    if (nodes[a].cluster === nodes[b].cluster) return ka === 1 || kb === 1 ? 4 : 2;
    if (ka === 1 && kb === 1) return 5;
    return 2;
  });
  const wsum = wts.reduce((x, y) => x + y, 0);
  const edgeOf = [];
  wts.forEach((w, e) => {
    const n = Math.max(1, Math.round((w / wsum) * NS));
    for (let k = 0; k < n; k++) edgeOf.push(e);
  });
  while (edgeOf.length < NS) edgeOf.push(edgeOf.length % NE);
  edgeOf.length = NS;
  for (let i = NS - 1; i > 0; i--) {
    const j = Math.floor(R() * (i + 1));
    [edgeOf[i], edgeOf[j]] = [edgeOf[j], edgeOf[i]];
  }
  // the graph blooms out of the point the funnel collapsed into
  const gsc = (t) => (t < T.graph - 0.05 ? 0.03 : lerp(0.03, 1, E.backOut(inv(T.graph - 0.05, T.graph + 0.85, t), 1.15)));
  const nodeAt = (n, t, out) => {
    const p = nodes[n].p, k = gsc(t);
    out[0] = G[0] + (p[0] - G[0]) * k;
    out[1] = G[1] + (p[1] - G[1]) * k;
    out[2] = G[2] + (p[2] - G[2]) * k;
    return out;
  };

  // ---- per-strand parameters ----
  const S = [];
  const bursts = [
    [0.5, 22],
    [0.75, 34],
    [1.0, 52],
    [1.25, 76],
    [1.5, 104],
  ];
  const births = [];
  bursts.forEach(([bt, n]) => {
    for (let k = 0; k < n; k++) births.push(bt);
  });
  // stratified bar offsets for the logo
  const barPerm = Array.from({ length: NS }, (_, i) => i);
  for (let i = NS - 1; i > 0; i--) {
    const j = Math.floor(R() * (i + 1));
    [barPerm[i], barPerm[j]] = [barPerm[j], barPerm[i]];
  }
  for (let i = 0; i < NS; i++) {
    const r = R;
    const s = {};
    // chaos: a crawling window on a 3D lissajous knot
    s.C = [r() * 2900 - 1450, r() * 1750 - 875, r() * 2700 - 2100];
    const base = 0.4 + 0.36 * r();
    s.f = [base, base * 2.13, base * 3.41];
    const ka = 0.75 + 0.5 * r();
    s.A = [
      (330 + 170 * r()) * ka, (160 + 90 * r()) * ka, (60 + 40 * r()) * ka,
      (240 + 120 * r()) * ka, (120 + 70 * r()) * ka, (50 + 30 * r()) * ka,
      (420 + 220 * r()) * ka, (200 + 100 * r()) * ka, (80 + 50 * r()) * ka,
    ];
    s.ph = Array.from({ length: 9 }, () => r() * TAU);
    s.v = (0.5 + 0.7 * r()) * (r() < 0.5 ? -1 : 1);
    s.s0 = r() * 40;
    s.L = 2.0 + 2.6 * r();
    s.b = 0.3 + 1.2 * Math.pow(r(), 2.2);
    s.w = 1.3 + 2.8 * r();
    s.c = CHAOS_COL[Math.floor(r() * CHAOS_COL.length)];
    s.birth = births[i] + r() * 0.05;
    s.jit = r();

    // funnel: golden-angle fan, spiralling into the hub
    s.fa = i * 2.399963 + r() * 0.2;
    s.fR = 170 + 1900 * Math.sqrt(r());
    s.fTw = 0.8 + 0.35 * r();
    s.fph = r();
    s.fsp = 0.3 + 0.14 * r();
    s.dF = 0.32 * clamp(Math.hypot(s.C[0], s.C[1] * 1.5) / 1700) + r() * 0.04;
    s.fb = 0.025 + 0.34 * Math.pow(r(), 3);
    s.fpul = r() < 0.6 ? 1 : 0;

    // graph: each strand is one fibre of an edge bundle
    s.e = edgeOf[i];
    const [a, b] = edges[s.e];
    const A = nodes[a].p, B = nodes[b].p;
    const d = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];
    const dl = Math.hypot(...d) || 1;
    const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2];
    const out = [mid[0] - G[0], mid[1] - G[1], mid[2] - G[2]];
    const ol = Math.hypot(...out) || 1;
    const rim = nodes[a].kind === 1 && nodes[b].kind === 1;
    const cross = nodes[a].cluster !== nodes[b].cluster && nodes[a].kind !== 0 && nodes[b].kind !== 0;
    const bow = rim ? 0.32 : cross ? 0.08 : 0.16;
    s.gC = [mid[0] + (out[0] / ol) * dl * bow, mid[1] + (out[1] / ol) * dl * bow, mid[2] + (out[2] / ol) * dl * bow];
    s.spoke = nodes[a].kind === 0 || nodes[b].kind === 0;
    let q = [r() - 0.5, r() - 0.5, r() - 0.5];
    const qd = (q[0] * d[0] + q[1] * d[1] + q[2] * d[2]) / (dl * dl);
    q = [q[0] - d[0] * qd, q[1] - d[1] * qd, q[2] - d[2] * qd];
    const ql = Math.hypot(...q) || 1;
    const qm = 3 + 13 * r();
    s.go = [(q[0] / ql) * qm, (q[1] / ql) * qm, (q[2] / ql) * qm];
    s.gph = r();
    s.gsp = 0.45 + 0.5 * r();
    s.gT = T.graph - 0.55 + 0.18 * r(); // collapses toward the hub just before the cut
    s.tint = nodes[a].cluster < 0 ? -1 : nodes[a].cluster;

    // beam: from the strand's node, into the merge point, then along the one line
    s.bA = nodes[a].kind === 0 ? b : a;
    s.bo = [(r() - 0.5) * 60, (r() - 0.5) * 60, (r() - 0.5) * 60];
    s.dB = 0.28 * clamp((M[0] - nodes[s.bA].p[0]) / 1300) + r() * 0.05;
    s.bph = r();

    // logo: three groups (top / middle / bottom stream), stratified across each stroke
    s.lg = i % 3;
    const m = Math.floor(i / 3);
    const hl = m % 7;
    s.ld = -0.6 + (1.2 * hl) / 6 + (r() - 0.5) * 0.02;
    s.lb = -1.38 + (2.76 * (s.lg * 7 + hl)) / 20 + (r() - 0.5) * 0.02;
    s.dL = 0.12 * r() + 0.06 * s.lg;
    s.lph = r();
    s.lI = 0.7 + 0.6 * r();
    S.push(s);
  }

  // ---- buffers ----
  const pos = new Float32Array(NP * ROWS * 4);
  const col = new Float32Array(NP * ROWS * 4);
  const heads = new Float64Array(ROWS * 4); // head xyz + intensity, per strand, for sparks and tags

  // ---- the five shapes, each writing [x,y,z, I, r,g,b, w] ----
  const A = new Float64Array(8), B = new Float64Array(8);

  function chaos(s, u, t, tau, o) {
    const ss = s.s0 + s.v * tau + s.L * u;
    const f = s.f, p = s.ph, a = s.A;
    const s0 = Math.sin(f[0] * ss + p[0]), s1 = Math.sin(f[1] * ss + p[1]), s2 = Math.sin(f[2] * ss + p[2]);
    o[0] = s.C[0] + a[0] * s0 + a[1] * s1 + a[2] * s2;
    o[1] = s.C[1] + a[3] * Math.sin(f[0] * ss + p[3]) + a[4] * Math.sin(f[1] * ss + p[4]) + a[5] * Math.sin(f[2] * ss + p[5]);
    o[2] = s.C[2] + a[6] * Math.sin(f[0] * ss + p[6]) + a[7] * Math.sin(f[1] * ss + p[7]) + a[8] * Math.sin(f[2] * ss + p[8]);
    const g = E.expoOut(inv(s.birth, s.birth + 0.55, t));
    let I = s.b * (0.08 + 0.92 * u * u) * smooth(1 - g, 1 - g + 0.1, u) * inv(s.birth, s.birth + 0.05, t);
    o[3] = I;
    o[4] = s.c[0]; o[5] = s.c[1]; o[6] = s.c[2];
    o[7] = s.w;
  }

  function funnel(s, u, t, tau, o) {
    const z = lerp(1800, G[2], u);
    const k = Math.pow(smooth(0.3, 1.0, u), 1.15);
    const r = s.fR * (1 - k);
    const a = s.fa + s.fTw * k * k;
    o[0] = G[0] + r * Math.cos(a);
    o[1] = G[1] + r * Math.sin(a);
    o[2] = z;
    const tp = t - T.drop;
    const x = fract(u - s.fsp * tp + s.fph) - 0.5;
    const p = s.fpul * Math.exp(-x * x * 900);
    o[3] = s.fb + 2.8 * p + 0.28 * k * k * k;
    const cb = Math.pow(k, 0.8);
    o[4] = lerp(ICE[0], BLUE[0], cb) + p * 0.5;
    o[5] = lerp(ICE[1], BLUE[1], cb) + p * 0.5;
    o[6] = lerp(ICE[2], BLUE[2], cb) + p * 0.3;
    o[7] = 3.0;
  }

  const TINTS = [[0.8, 0.88, 1.0], [0.72, 0.85, 1.0], [0.88, 0.86, 1.0], [0.8, 0.92, 1.0], [0.9, 0.9, 1.0], [0.76, 0.8, 1.0]];
  function graphF(s, u, t, tau, o) {
    const [a, b] = edges[s.e];
    const P = nodes[a].p, Q = nodes[b].p, C = s.gC;
    const k = gsc(t);
    const sn = Math.sin(Math.PI * u) * k;
    o[0] = G[0] + (bez2(P[0], C[0], Q[0], u) - G[0]) * k + s.go[0] * sn;
    o[1] = G[1] + (bez2(P[1], C[1], Q[1], u) - G[1]) * k + s.go[1] * sn;
    o[2] = G[2] + (bez2(P[2], C[2], Q[2], u) - G[2]) * k + s.go[2] * sn;
    const x = fract(u - s.gsp * (t - T.graph) + s.gph) - 0.5;
    const p = Math.exp(-x * x * 160);
    o[3] = (s.spoke ? 0.32 : 0.24) + 1.9 * p;
    const c = s.spoke ? [0.3, 0.46, 1.0] : s.tint < 0 ? ICE : TINTS[s.tint];
    o[4] = c[0] + p * 0.45; o[5] = c[1] + p * 0.4; o[6] = c[2] + p * 0.1;
    o[7] = 2.1;
  }

  function beam(s, u, t, tau, o) {
    const N = nodes[s.bA].p;
    const mx = M[0], my = M[1] + s.bo[1] * 0.1, mz = M[2] + s.bo[2] * 0.1;
    if (u <= UM) {
      const v = u / UM;
      const p1 = [N[0] + (mx - N[0]) * 0.35 + s.bo[0], N[1] + (my - N[1]) * 0.35 + s.bo[1], N[2] + (mz - N[2]) * 0.35 + s.bo[2]];
      const p2 = [mx - 300, my, mz];
      o[0] = bez3(N[0], p1[0], p2[0], mx, v);
      o[1] = bez3(N[1], p1[1], p2[1], my, v);
      o[2] = bez3(N[2], p1[2], p2[2], mz, v);
      const x = fract(v - 1.1 * (t - T.beam) + s.bph) - 0.5;
      const p = Math.exp(-x * x * 120);
      o[3] = 0.42 + 1.1 * p + 0.5 * v * v;
      const cb = v * v;
      o[4] = lerp(ICE[0], BLUE[0], cb) + p * 0.25;
      o[5] = lerp(ICE[1], BLUE[1], cb) + p * 0.25;
      o[6] = lerp(ICE[2], BLUE[2], cb) + p * 0.1;
      o[7] = 2.0;
    } else {
      const v = (u - UM) / (1 - UM);
      const sq = (1 - v) * (1 - v) * (1 - v);
      o[0] = mx + BEAM_LEN * v;
      o[1] = my + s.bo[1] * 0.02 * sq;
      o[2] = mz + s.bo[2] * 0.02 * sq;
      const fr = E.expoOut(inv(T.beam + 0.04, T.beam + 0.8, t));
      const x = fract(v * 2 - 1.6 * (t - T.beam) + s.bph) - 0.5;
      const p = Math.exp(-x * x * 90);
      o[3] = (0.62 + 0.9 * p) * smooth(fr + 0.015, fr - 0.015, v);
      o[4] = BLUE[0] + p * 0.12; o[5] = BLUE[1] + p * 0.18; o[6] = BLUE[2];
      o[7] = 2.2;
    }
  }

  // logo glyph (units, y down): three streams into the bar
  const ORG = [G[0] - 14 * K, G[1] + 10 * K, G[2]];
  function stream(g, v, out) {
    // returns x, y, dx, dy
    if (g === 1) {
      out[0] = 16 * v; out[1] = 10; out[2] = 16; out[3] = 0;
      return;
    }
    const y0 = g === 0 ? 3 : 17;
    out[0] = bez3(0, 8, 10, 16, v);
    out[1] = bez3(y0, y0, 10, 10, v);
    const w = 1 - v;
    out[2] = 3 * w * w * 8 + 6 * w * v * 2 + 3 * v * v * 6;
    out[3] = 3 * w * w * 0 + 6 * w * v * (10 - y0) + 3 * v * v * 0;
  }
  const sc = new Float64Array(4);
  function logo(s, u, t, tau, o) {
    let gx, gy, I;
    if (u <= LOGO_UB) {
      const v = u / LOGO_UB;
      stream(s.lg, v, sc);
      const l = Math.hypot(sc[2], sc[3]) || 1;
      const nx = -sc[3] / l, ny = sc[2] / l;
      const settle = 1 - E.cubicOut(inv(T.fold + 0.3, T.fold + 1.25, t));
      const d = lerp(s.ld, s.lb, smooth(0.8, 1.0, v)) + 0.07 * settle * Math.sin(v * 21 + s.lph * 9);
      gx = sc[0] + nx * d;
      gy = sc[1] + ny * d;
      const x = fract(v * 1.2 - 0.55 * (t - T.fold) + s.lph) - 0.5;
      I = s.lI * (0.2 + 0.2 * Math.exp(-x * x * 60));
      const cb = smooth(0.7, 1.0, v);
      o[4] = lerp(ICE[0], BLUE[0], cb); o[5] = lerp(ICE[1], BLUE[1], cb); o[6] = lerp(ICE[2], BLUE[2], cb);
    } else {
      const v = (u - LOGO_UB) / (1 - LOGO_UB);
      const xEnd = 28 + Math.sqrt(Math.max(0, 2.25 - s.lb * s.lb)) * 0.97;
      gx = 16 + (xEnd - 16) * v;
      gy = 10 + s.lb;
      const x = fract(v * 1.4 - 0.7 * (t - T.fold) + s.lph) - 0.5;
      I = s.lI * (0.15 + 0.14 * Math.exp(-x * x * 60));
      o[4] = BLUE[0]; o[5] = BLUE[1]; o[6] = BLUE[2];
    }
    o[0] = ORG[0] + gx * K;
    o[1] = ORG[1] - gy * K;
    o[2] = ORG[2];
    o[3] = I;
    o[7] = 0.07 * K;
  }

  // ---- specials ----
  function heroPt(u, t, o) {
    // first light: one stream draws an arc across the dark, its trail lingering as the tangle arrives
    const h = 1.08 * E.cubicOut(inv(0.0, 0.62, t)) - 0.02;
    const len = 0.18 + 0.72 * E.quadOut(inv(0.0, 0.45, t));
    const w = h - len + len * u;
    o[0] = -1150 + 2300 * w;
    o[1] = -250 + 390 * w + 120 * Math.sin(w * Math.PI * 1.7);
    o[2] = 760 + 220 * Math.sin(Math.PI * clamp(w));
    const vis = w >= 0 && w <= 1 ? 1 : 0;
    o[3] = vis * 3.4 * Math.pow(u, 1.25) * (1 - E.quadIn(inv(0.3, 0.85, t)));
    o[4] = 0.82; o[5] = 0.9; o[6] = 1.0;
    o[7] = 5.0;
  }

  // the agent: a blue spark that enters, probes, and fails
  function agentPos(t) {
    const e = E.expoOut(inv(T.agent - 0.05, T.agent + 0.42, t));
    let x = lerp(portrait ? 760 : 1250, portrait ? 150 : 420, e), y = lerp(170, portrait ? 140 : 90, e), z = lerp(650, 380, e);
    y += Math.sin(t * 3.1) * 8;
    x += Math.sin(t * 2.3) * 6;
    if (t > T.fail && t < T.stop) {
      const f = Math.floor(t * 24);
      x += (hash1(f) - 0.5) * 16;
      y += (hash1(f + 77) - 0.5) * 16;
    }
    return [x, y, z];
  }
  const PT = portrait ? [-260, -120, -800] : [-460, -40, -800];
  function probePt(u, t, tf, o) {
    const Ap = agentPos(t);
    const fr = E.quadOut(inv(T.probe, T.fail, t));
    const v = u * fr;
    // a hesitant path that loses its way
    const zig = Math.sin(v * 17 + 1.3) * 60 * v + Math.sin(v * 29) * 40 * v * v;
    o[0] = lerp(Ap[0], PT[0], v) + zig * 0.3;
    o[1] = lerp(Ap[1], PT[1], v) + zig;
    o[2] = lerp(Ap[2], PT[2], v) + Math.sin(v * 11) * 120 * v;
    let I = 2.2 * (0.25 + 0.75 * u);
    const bad = inv(T.fail, T.fail + 0.12, t);
    if (t >= T.fail) {
      const f = Math.floor(tf * 24);
      const amp = 70 * (1 - inv(T.fail + 0.3, T.stop, t) * 0.4);
      o[0] += (hash1(f * 131 + Math.floor(u * 9)) - 0.5) * amp;
      o[1] += (hash1(f * 17 + Math.floor(u * 7) + 5) - 0.5) * amp;
      I *= hash1(f + 3) > 0.25 ? 1 : 0.15;
      I *= fract(u * 9 + hash1(f) * 3) < lerp(1, 0.45, inv(T.fail + 0.15, T.stop, t)) ? 1 : 0;
      I *= 1 - inv(T.fail + 0.35, T.stop - 0.02, t);
    }
    o[3] = t < T.probe ? 0 : I;
    o[4] = lerp(0.1, WARN[0], bad); o[5] = lerp(0.25, WARN[1], bad); o[6] = lerp(1.0, WARN[2], bad);
    o[7] = 3.0;
  }

  // ---- time remap: the tangle crawls, freezes for the stop, then everything drives forward ----
  const tauTable = new Float64Array(Math.ceil(21 * 1000) + 2);
  {
    let acc = 0;
    for (let k = 0; k < tauTable.length; k++) {
      const t = k / 1000;
      tauTable[k] = acc;
      let sp = 1;
      if (t > T.stop - 0.08 && t < T.drop) sp = lerp(1, 0.02, smooth(T.stop - 0.08, T.stop + 0.02, t));
      acc += sp / 1000;
    }
  }
  const tauOf = (t) => {
    const x = clamp(t, 0, 20.999) * 1000;
    const k = Math.floor(x);
    return lerp(tauTable[k], tauTable[k + 1], x - k);
  };

  // ---- fill the textures for one instant ----
  function fill(t, tf) {
    const tau = tauOf(t);
    // stop-down inhale: the tangle leans in toward the lens just before the drop
    const inhale = seg(t, T.stop + 0.2, T.drop, E.quadIn) * (t < T.drop ? 1 : 0);
    const glitch = t > T.fail && t < T.stop ? 1 : 0;
    const gf = Math.floor(tf * 24);
    for (let i = 0; i < NS; i++) {
      const s = S[i];
      const wF = t < T.drop ? 0 : E.backOut(inv(T.drop + s.dF, T.drop + s.dF + 0.5, t), 0.9);
      const wG = E.quartInOut(inv(s.gT, s.gT + 0.5, t));
      const wB = t < T.beam ? 0 : E.quartOut(inv(T.beam + s.dB, T.beam + s.dB + 0.6, t));
      const wL = t < T.fold ? 0 : E.quintInOut(inv(T.fold + s.dL, T.fold + s.dL + 0.72, t));
      const dead = t < T.lock ? 1 : lerp(1, 0.16 + 0.06 * Math.sin((t - T.lock) * 2.3 + s.lph * 2), E.quadOut(inv(T.lock + 0.05, T.lock + 0.6, t)));
      const row = i * NP * 4;
      const jitter = glitch && s.jit < 0.35 ? 1 : 0;
      for (let j = 0; j < NP; j++) {
        const u = j / (NP - 1);
        // evaluate only the shapes that are live for this strand
        if (wF < 1 || wF > 1.0001) chaos(s, u, t, tau, A);
        if (wF > 0 && wG < 1) {
          funnel(s, u, t, tau, B);
          mix(A, B, wF);
        }
        if (wG > 0 && wB < 1) {
          graphF(s, u, t, tau, B);
          if (wG >= 1 && wF >= 1) A.set(B);
          else mix(A, B, wG);
        }
        if (wB > 0 && wL < 1) {
          beam(s, u, t, tau, B);
          if (wB >= 1) A.set(B);
          else mix(A, B, wB);
        }
        if (wL > 0) {
          logo(s, u, t, tau, B);
          if (wL >= 1) A.set(B);
          else mix(A, B, wL);
        }
        if (jitter) {
          A[0] += (hash1(gf * 7 + i) - 0.5) * 22;
          A[1] += (hash1(gf * 13 + i + 1) - 0.5) * 22;
        }
        if (inhale > 0) {
          A[0] *= 1 - 0.05 * inhale;
          A[1] *= 1 - 0.05 * inhale;
        }
        const k = row + j * 4;
        pos[k] = A[0]; pos[k + 1] = A[1]; pos[k + 2] = A[2]; pos[k + 3] = A[3] * dead;
        col[k] = A[4]; col[k + 1] = A[5]; col[k + 2] = A[6]; col[k + 3] = A[7];
      }
      const h = row + (NP - 1) * 4;
      heads[i * 4] = pos[h]; heads[i * 4 + 1] = pos[h + 1]; heads[i * 4 + 2] = pos[h + 2];
      heads[i * 4 + 3] = t < T.drop ? pos[h + 3] : pos[h + 3] * (1 - clamp(wF));
    }
    // specials
    for (let j = 0; j < NP; j++) {
      const u = j / (NP - 1);
      heroPt(u, t, A);
      let k = (HERO * NP + j) * 4;
      pos[k] = A[0]; pos[k + 1] = A[1]; pos[k + 2] = A[2]; pos[k + 3] = A[3];
      col[k] = A[4]; col[k + 1] = A[5]; col[k + 2] = A[6]; col[k + 3] = A[7];
      probePt(u, t, tf, A);
      k = (PROBE * NP + j) * 4;
      pos[k] = A[0]; pos[k + 1] = A[1]; pos[k + 2] = A[2]; pos[k + 3] = t < T.stop + 0.1 ? A[3] : 0;
      col[k] = A[4]; col[k + 1] = A[5]; col[k + 2] = A[6]; col[k + 3] = A[7];
    }
  }

  function mix(a, b, w) {
    for (let c = 0; c < 8; c++) a[c] = a[c] + (b[c] - a[c]) * w;
  }

  return { S, graph, pop, M, BEAM_LEN, ORG, pos, col, heads, fill, agentPos, tauOf, nodeAt, gsc };
}

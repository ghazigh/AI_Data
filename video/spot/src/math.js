// Small deterministic math kit. No Math.random, no clocks: every value is a function of its inputs.

export const TAU = Math.PI * 2;
export const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, u) => a + (b - a) * u;
export const inv = (a, b, v) => clamp((v - a) / (b - a));
export const smooth = (a, b, v) => {
  const u = inv(a, b, v);
  return u * u * (3 - 2 * u);
};
export const smoother = (a, b, v) => {
  const u = inv(a, b, v);
  return u * u * u * (u * (u * 6 - 15) + 10);
};
export const fract = (x) => x - Math.floor(x);

// Easing (u in 0..1)
export const E = {
  lin: (u) => u,
  quadIn: (u) => u * u,
  quadOut: (u) => 1 - (1 - u) * (1 - u),
  quadInOut: (u) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2),
  cubicIn: (u) => u * u * u,
  cubicOut: (u) => 1 - Math.pow(1 - u, 3),
  cubicInOut: (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2),
  quartOut: (u) => 1 - Math.pow(1 - u, 4),
  quartInOut: (u) => (u < 0.5 ? 8 * u * u * u * u : 1 - Math.pow(-2 * u + 2, 4) / 2),
  quintOut: (u) => 1 - Math.pow(1 - u, 5),
  quintInOut: (u) => (u < 0.5 ? 16 * u * u * u * u * u : 1 - Math.pow(-2 * u + 2, 5) / 2),
  expoIn: (u) => (u <= 0 ? 0 : Math.pow(2, 10 * u - 10)),
  expoOut: (u) => (u >= 1 ? 1 : 1 - Math.pow(2, -10 * u)),
  expoInOut: (u) =>
    u <= 0 ? 0 : u >= 1 ? 1 : u < 0.5 ? Math.pow(2, 20 * u - 10) / 2 : (2 - Math.pow(2, -20 * u + 10)) / 2,
  sineInOut: (u) => -(Math.cos(Math.PI * u) - 1) / 2,
  backOut: (u, s = 1.70158) => 1 + (s + 1) * Math.pow(u - 1, 3) + s * Math.pow(u - 1, 2),
  backIn: (u, s = 1.70158) => (s + 1) * u * u * u - s * u * u,
  // damped spring settle: overshoots once, rings down
  spring: (u, k = 7, z = 0.42) => (u >= 1 ? 1 : 1 - Math.exp(-z * k * u * 1.6) * Math.cos(k * u * Math.sqrt(1 - z * z) * 1.2)),
};

// segment: eased progress of t through [a, b]
export const seg = (t, a, b, e = E.lin) => e(inv(a, b, t));

// mulberry32
export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = s;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// integer hash → 0..1 (for per-frame glitch choices)
export function hash1(n) {
  let x = (n | 0) * 374761393 + 668265263;
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

// smooth 1D value noise from sines (deterministic, band-limited)
export const wob = (t, s = 0) =>
  Math.sin(t * 1.31 + s * 7.1) * 0.5 + Math.sin(t * 2.17 + s * 3.3 + 1.7) * 0.3 + Math.sin(t * 3.73 + s * 5.9 + 4.1) * 0.2;

// cubic bezier, scalar
export const bez3 = (a, b, c, d, u) => {
  const v = 1 - u;
  return v * v * v * a + 3 * v * v * u * b + 3 * v * u * u * c + u * u * u * d;
};
export const bez2 = (a, b, c, u) => {
  const v = 1 - u;
  return v * v * a + 2 * v * u * b + u * u * c;
};

// keyframe track: [[t, value, easeIntoThisKey], ...] → value at t
export function track(keys) {
  return (t) => {
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      const [t1, v1, e = E.cubicInOut] = keys[i];
      const [t0, v0] = keys[i - 1];
      if (t <= t1) {
        const u = e(inv(t0, t1, t));
        if (Array.isArray(v0)) return v0.map((x, k) => lerp(x, v1[k], u));
        return lerp(v0, v1, u);
      }
    }
    return keys[keys.length - 1][1];
  };
}

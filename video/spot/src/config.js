// Datalith spot — shared timing and layout. Everything in the film hangs off this beat grid.
// 120 BPM: one beat = 0.5 s = 15 frames at 30 fps, one bar = 2 s. Cuts land on whole frames.

export const BPM = 120;
export const BEAT = 60 / BPM;
export const BAR = BEAT * 4;
export const FPS = 30;
export const DUR = 26;

// Story beats (seconds). One scene per bar.
export const T = {
  whip: 0.0, //   bar 1 · a single stream of light whips through the dark
  pour: 0.5, //   ...then hundreds pour in and tangle
  line1: 1.5, //  bar 2 · "Your data is everywhere."
  agent: 4.0, //  bar 3 · an agent reaches into the tangle
  probe: 4.3,
  fail: 4.85, //  ...its probe glitches and dies
  stop: 5.5, //   one beat of silence
  drop: 6.0, //   bar 4 · shockwave · "Every source."
  pipe: 8.0, //   bar 5 · pipelines, one per modality · "Made readable."
  graph: 10.0, // bar 6 · "One graph."
  uses: 12.0, //  bars 7–8 · the use-case catalog is detected · "Know what to build."
  beam: 16.0, //  bar 9 · "Agent-ready."
  fold: 18.0, //  bar 10 · everything folds into the logo
  lock: 20.0, //  bar 11 · lockup
  cta: 22.0, //   bar 12 · call to action
  end: 26.0,
};

// The use-case catalog: detected from the graph, one card per 8th-note pair. Domain indices follow
// graph.js DOMAINS (Customers, Policies, Claims, Contracts, Support, Suppliers). Names and values are the
// demo estate's examples, shown as illustrative on screen.
export const USES = [
  { t: 12.5, name: 'Claims triage copilot', domains: [2, 1, 4], value: '$2.1M', status: 'ready' },
  { t: 13.0, name: 'Subrogation recovery finder', domains: [2, 1], value: '$1.75M', status: 'ready' },
  { t: 13.5, name: 'Fraud signal triage agent', domains: [2, 0], value: '$1.45M', status: 'ready' },
  { t: 14.0, name: 'Contract renewal agent', domains: [3, 5], value: '', status: 'blocked' },
];

// Hard camera cuts. Motion-blur sub-samples never reach back across one.
export const CUTS = [2.0, 3.0, 4.0, 8.0, 10.0];

// World anchors (world units ≈ px at 1000 units from a 56.7° camera).
export const WORLD = {
  hub: [0, 0, -4200], // where the funnel converges; the graph and the logo live here
  glyphK: 32, //         world units per logo-glyph unit (glyph is 28 × 20)
};

// Screen layouts per aspect. `glyph` is the lockup's logo box in px: [left, top, px-per-glyph-unit].
export const LAYOUTS = {
  '16x9': {
    W: 1920,
    H: 1080,
    glyph: [460, 368, 8.4], // centres the lockup: glyph 235 px + gap 93 px + wordmark 672 px (187 px Schibsted Grotesk 700)
    heroGlyphW: 1180, // px width of the big fibre glyph just before the lockup
  },
  '9x16': {
    W: 1080,
    H: 1920,
    glyph: [123, 830, 7.0], // glyph 196 px + gap 78 px + wordmark 560 px, centred in 1080
    heroGlyphW: 820,
  },
};

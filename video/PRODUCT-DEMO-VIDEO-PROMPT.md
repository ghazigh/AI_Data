# Product Demo Film — Master Prompt

**How to use this file.** Paste it into a fresh Claude Code session as the whole brief, fill in
**§1 Intake**, and say *"go"*. It is product-agnostic: nothing below assumes a particular product,
industry, or repo. It encodes a design system, a motion language, a story architecture, and a
build pipeline that have been proven end-to-end to produce a ~55-second silent motion-graphics
film at 1920×1080/30fps, rendered from HTML with HyperFrames.

Two things to internalise before you write a line of code:

1. **The default failure is "basic and beginner".** A stack of fade-in cards on a gradient is
   what an average model produces and it will be rejected. The bar is the class of film that
   ships on the homepage of a well-funded SaaS company — one continuous designed world, a
   virtual camera that moves through it, real motion blur, spring physics, and a substrate that
   never stops breathing.
2. **Story beats the visuals.** Every second must advance one linear argument. If a shot does
   not move the argument forward, cut it. Short and clear always beats long and clever.

---

## 1 · Intake — fill this in

```
PRODUCT NAME:
ONE-LINE PITCH:              (what it does, in the customer's words)
AUDIENCE:                    (e.g. enterprise data leaders, indie devs, CFOs)
THE PROBLEM (before state):  (what the world looks like without the product)
THE PROMISE (after state):   (the single sentence the viewer must leave with)
3–6 CAPABILITIES TO SHOW:    (in the order a user would meet them)
REAL PROOF SURFACES:         (dashboards, graphs, pipelines, editors, charts —
                              what the UI actually looks like; screenshots or a URL help)
INTEGRATIONS / LOGOS:        (vendors to show, if the product connects to things)
BRAND COLOURS:               (hex; optional — the default system below works unbranded)
WORDMARK / LOGO:             (SVG path or file, optional)
LENGTH:                      (default 55s; 40–70s is the useful range)
ASPECT:                      (default 16:9; add 9:16 only if asked)
AUDIO:                       (default none — the client adds music later)
DELIVERY:                    (default: MP4 files sent in chat + committed to the repo)
```

If any field is blank, choose the obvious answer and state the assumption once — do not block.

---

## 2 · Story architecture

The proven spine is **seven beats, strictly linear, no flashbacks, no montages**. Adapt the
nouns to the product; keep the shape and the timings.

| # | Beat | Job | ~Duration |
|---|------|-----|-----------|
| 1 | **The scattered world** | Show the problem as an *object*, not a claim. Logos / fragments / files drift apart across a wide canvas. Camera is wide and slowly drifting. | 0.0 – 6.0 |
| 2 | **Convergence** | Everything collapses into one mark. Connector paths draw from each fragment into a hub; the hub pops; a headline lands per-word. This is the "one platform" moment. | 6.0 – 11.5 |
| 3 | **The proof surface** | Push into the product's real UI. Counters count up, bars fill, badges snap in. One or two numbers only — a scored dashboard reads better than a busy one. | 11.5 – 19.5 |
| 4 | **The mechanism** | The differentiated thing, built live on screen: a graph assembling, a model training, a pipeline wiring itself. Nodes spring in, edges draw with `strokeDashoffset`, pulses travel the paths. | 19.5 – 27.0 |
| 5 | **The human moment** | A person asks something. Type a real question with a blinking caret, then answer it *visibly* — a light races the structure you just built, hits the right nodes, and an answer card springs in with sources. This is the beat that makes people believe the product. | 27.0 – 35.0 |
| 6 | **Scale / operation** | The same thing, now many: a card per dataset/project/customer, each with a progress bar, running in parallel, monitored. Proof that it isn't a demo toy. | 35.0 – 43.0 |
| 7 | **The payoff + close** | What the customer *gets* — outcomes, use cases, value tiles. Then invert to a dark plate with a `clip-path` wipe, the wordmark, and one line of positioning. Hold two beats and end. | 43.0 – 55.0 |

Rules that make the difference:

- **Never cut on black.** Beats overlap by ~0.2–0.3s so the substrate is continuous. Section
  `data-start`/`data-duration` values should overlap (e.g. `0/11.6` then `11.3/8.3`).
- **One idea per beat.** If you are tempted to show two features in one beat, that is two beats
  or one cut feature.
- **Text is a punchline, not a caption.** At most one headline per beat, 2–6 words, landing
  *after* the visual has made its point. Never narrate what the viewer can already see.
- **Every beat ends by handing an object to the next one.** The hub from beat 2 becomes the
  dashboard in beat 3; the graph from beat 4 is what the light searches in beat 5.

---

## 3 · Design system (locked)

Light mode, warm-cool, editorial. Copy these tokens verbatim; only swap `--hot`/`--deep` for the
product's brand colour if one was supplied, and check contrast afterwards.

```css
:root {
  --plate:#ECEDF1; --card:#FFFFFF; --card-2:#FAFAFA;
  --ink:#111111; --sub:#6E6E73; --sub-2:#3A3A3A;
  --hot:#3D5FFF; --mid:#6C7DFF; --deep:#2B4BFF;
  --amber:#FFB300; --amber-2:#FFC800; --coral:#F49A9A; --coral-2:#FF6A3D;
  --black:#0D0D0D; --ok:#8FCB3A; --ok-bg:#EEF7DC; --sel:#2BA6F0;
  --r-card:28px;
  --sh-card: 0 40px 80px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.06),
             inset 0 0 0 1px rgba(255,255,255,.6);
}
```

**Type.** Geometric grotesque for all UI (Geist, Inter, Schibsted Grotesk), a transitional serif
with a real italic for the wordmark and one hero line (Instrument Serif). Display sizes
250 / 150 / 92 / 60 px, `font-weight:500`, `letter-spacing:-0.03em`, `line-height:0.92`. Mono for
data, IDs, and code (Geist Mono). Self-host `.woff2` locally — CDNs are usually blocked and the
renderer must not touch the network.

**Substrate** (never timed, always visible, always moving):

- `#plate` — flat `--plate` fill.
- `#dots` — a 28×28 dot-grid PNG tile, inset `-200px`, parallax-drifting a few px per beat.
- 3 × `.bloom` — 1400–1500px soft-falloff PNG gradients (amber, blue, coral) at 30–55 % opacity,
  drifting on long sine paths, never repeating exactly.
- `#grain` — a 256×256 noise PNG at `opacity:.055`, `mix-blend-mode:multiply`, **stepped** through
  8 pre-computed offsets at 12fps (not tweened — real film grain is discrete).
- `#darkplate` — a `#131313` full-frame layer with its own dot tile, revealed at the close with
  `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)`.

**Components.** Build a small vocabulary and reuse it everywhere: `.card` (white, `--r-card`,
`--sh-card`), `.chip`, `.pill` (black by default, `.white`, `.frost`), `.badge` (brand-tinted),
`.circ`, `.check`, `.prog` (progress bar), `.kpi`, `.node`, `.edges`, `.light`, `.step`, `.win`
(a browser/app chrome frame), `.toolbar`, `.cursor`, `.prompt`. Ten well-made components used
thirty times looks designed; thirty one-off boxes looks generated.

**Iconography.** Inline `<symbol>`s in a single hidden `<svg>` defs block at the top of the
document, referenced with `<use href="#i-...">`. Never load icon fonts or remote sprites.

---

## 4 · Motion language

This is where "beginner" and "professional" actually diverge. Six non-negotiables:

### 4.1 One virtual camera per board
Do not animate elements onto a static frame. Lay each beat out as a large board in world
coordinates, then **move the camera**. One `onUpdate` writes one `transform` — never multiple
competing transforms on the same node.

```js
function camera(el, init) {
  const c = Object.assign({ x: 960, y: 540, s: 1, r: 0 }, init);
  const write = () => {
    const a = c.r * Math.PI / 180, cos = Math.cos(a), sin = Math.sin(a);
    const sx = c.x * c.s, sy = c.y * c.s;
    el.style.transform =
      `translate(${960 - (cos*sx - sin*sy)}px, ${540 - (sin*sx + cos*sy)}px) rotate(${c.r}deg) scale(${c.s})`;
  };
  write();
  return { c, to: (t, vals, duration, ease) =>
    tl.to(c, Object.assign({ duration, ease, onUpdate: write }, vals), t) };
}
```

Camera scales stay modest: `1 → 1.35` is a push-in, `1.5+` starts clipping content and failing the
layout audit. Add a `rotate` of 0.5–2° on the big moves; it reads as handheld intent.

### 4.2 Directional motion blur on every camera move
A camera move without blur looks like a slideshow. Wrap each scene in an SVG filter and tween the
`stdDeviation` of its `feGaussianBlur` through an envelope, axis-locked to the direction of travel.

```html
<filter id="mb-dash" x="-10%" y="-10%" width="120%" height="120%">
  <feGaussianBlur id="mbb-dash" stdDeviation="0 0"/>
</filter>
```

```js
function blur(id) {
  const node = document.getElementById('mbb-' + id);
  const p = { v: 0, ax: 1, ay: 1 };
  const write = () => node.setAttribute('stdDeviation',
    `${(p.v*p.ax).toFixed(2)} ${(p.v*p.ay).toFixed(2)}`);
  const axis = n => { p.ax = n === 'y' ? 0 : 1; p.ay = n === 'x' ? 0 : 1; };
  return {
    // ramp up then down across a move
    leg: (t, dur, peak, ax='xy', ease='power2') => {
      tl.set(p, { v:0, onUpdate:()=>{axis(ax);write();} }, t);
      tl.to(p, { v:peak, duration:dur/2, ease:ease+'.in',  onUpdate:write }, t);
      tl.to(p, { v:0,    duration:dur/2, ease:ease+'.out', onUpdate:write }, t + dur/2);
    },
    out: (t, dur, peak, ax='xy', ease='power4.out') => {   // land from a blur
      tl.set(p, { v:peak, onUpdate:()=>{axis(ax);write();} }, t);
      tl.to(p, { v:0, duration:dur, ease, onUpdate:write }, t);
    },
    in:  (t, dur, peak, ax='xy', ease='power3.in') => {    // depart into a blur
      tl.set(p, { v:0, onUpdate:()=>{axis(ax);write();} }, t);
      tl.to(p, { v:peak, duration:dur, ease, onUpdate:write }, t);
    },
  };
}
```

Peaks of 6–14 px on a 1920-wide frame. Full-frame SVG blur is the single biggest render cost
(~1.5 fps vs ~4 fps) — use it on the moves, not the holds.

### 4.3 Spring entrances, never linear fades
`back.out(1.7)` over 0.4–0.6s with a 60–100 ms stagger. Objects arrive with overshoot and settle.

```js
const SPRING = 'back.out(1.7)', OUT = 'power4.out';
const pop = (targets, t, {from=.92, dur=.5, stagger=.08, y=0, ease=SPRING}={}) =>
  tl.fromTo(targets, {scale:from, opacity:0, y}, {scale:1, opacity:1, y:0, duration:dur, stagger, ease}, t);
```

### 4.4 Per-word masked type
Headlines never fade in. Wrap each word in an overflow-hidden mask and slide it up from below.

```css
.m   { display:inline-block; overflow:hidden; vertical-align:bottom;
       padding-bottom:.12em; margin-bottom:-.12em; }
.m .w{ display:inline-block; will-change:transform,opacity; }
.w   { display:inline-block; margin-right:.24em; }
```

```js
const reveal = (targets, t, {dur=.55, stagger=.04, ease=OUT}={}) =>
  tl.fromTo(targets, {yPercent:96, opacity:0}, {yPercent:0, opacity:1, duration:dur, stagger, ease}, t);
const unreveal = (targets, t, {dur=.35, stagger=.025}={}) =>
  tl.to(targets, {yPercent:-96, opacity:0, duration:dur, stagger, ease:'power3.in'}, t);
```

The word-splitter must set `data-layout-allow-overlap` on every `.w` span or the layout audit
flags the tight leading as an overlap.

### 4.5 Structure that builds itself
- **Path draw-on:** set `strokeDasharray = len; strokeDashoffset = len` then tween the offset to 0.
- **Travelling pulse:** a second stroked copy with a short dash, tweening `strokeDashoffset`
  from `len` to `-len`.
- **A light riding a path:** `path.getPointAtLength(p.v * len)` inside an `onUpdate`, writing
  `cx`/`cy` on a glowing circle. This is the shot that sells a "search"/"reasoning" beat.
- **Counters:** tween a proxy `{v:from}` and write `el.textContent` in `onUpdate`.
- **Typewriter:** tween `{n:0} → text.length`, `ease:'none'`, `text.slice(0, Math.floor(p.n))` at
  ~30 chars/sec, plus a caret blinking on `ease:'steps(16)'`.

### 4.6 Nothing is ever fully static
Even during a hold, the blooms drift, the grain steps, and the camera creeps. A frozen frame is
a dead frame.

---

## 5 · Technical contract (HyperFrames)

Renderer: `npx hyperframes@<pinned version>`. Project layout:

```
index.html          root composition
assets/film.css     design system
assets/film.js      the entire timeline (exposes window.__buildFilm)
assets/fonts/*.woff2
assets/vendor/gsap.min.js
meta.json  hyperframes.json  package.json
```

**Root element:**

```html
<div id="root" data-composition-id="main" data-start="0" data-duration="55"
     data-width="1920" data-height="1080" data-fps="30">
```

Render length is the root's `data-duration`. Every timed element needs `class="clip"`,
`data-start`, and `data-duration`.

**Timeline registration must be inline.** An external script cannot register directly; expose a
builder and call it from an inline `<script>`:

```html
<script src="assets/film.js"></script>
<script>
  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = window.__buildFilm();
</script>
```

**Determinism — hard rules.** The renderer seeks the timeline frame by frame; anything
non-deterministic produces smeared or wrong frames.

- No `Math.random()`, no `Date.now()`, no `performance.now()`, no network at render time.
- No `repeat:-1` and no CSS `animation` — every loop must be a finite tween on the timeline.
- Never tween `display` or `visibility` on a clip element (the runtime owns those); use
  `autoAlpha` on inner nodes.
- Never pair a CSS initial `transform` with a GSAP tween of the same property — lint flags
  `gsap_css_transform_conflict`. Set initial transforms via `gsap.set` instead.
- No `crossorigin` attributes on media.
- Position with `left`/`top` when you also intend to `pop` (scale/opacity) the element; a
  `tl.set(el,{x,y})` fights the tween's transform.

**Layout/contrast audit escapes:** `data-layout-allow-overlap`, `data-layout-allow-overflow`,
`data-layout-ignore`. Use them deliberately — most findings are real. Contrast must be ≥ 4.5:1
for text; brand colours often need darkening (e.g. a vendor blue at `#032D60`, not `#00A1E0`).

**Known limitation:** `hyperframes check` throws `Cannot access 'Ns' before initialization` if
any `<canvas>` exists in the DOM. If you need a canvas (Three.js etc.), keep a canvas-free
"check twin" of the document behind a flag (`window.__HF_NO_WORLD`) and validate that, reviewing
the 3D visually from rendered frames.

**`hyperframes snapshot` does not seek the timeline** — every frame comes out identical. Use the
Playwright peek in §7.2 instead.

---

## 6 · Assets under a restrictive network

Renders must be fully offline, and agent sandboxes usually block CDNs.

- **GSAP:** vendor `gsap.min.js` into `assets/vendor/` and `<script src>` it locally.
- **Fonts:** download the `.woff2` files once and `@font-face` them from `assets/fonts/`.
- **Brand logos:** `cdn.simpleicons.org` is typically blocked but **`raw.githubusercontent.com`
  usually is not** — fetch `raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/<slug>.svg`,
  convert each into a `<symbol id="lg-<slug>">`, and inline them all in the defs block. For
  vendors Simple Icons doesn't carry (trademark-restricted marks), fall back to a monogram tile
  in the brand colour.
- **Textures (dots, blooms, grain):** generate them deterministically in pure Node with a
  hand-rolled PNG writer (`zlib.deflateSync` + CRC32) and commit the PNGs. This beats CSS
  `filter: blur()` on huge radial gradients, which is both slow and visibly banded.

---

## 7 · Build pipeline

### 7.1 Environment setup
`ffmpeg`/`ffprobe` and Chromium usually cannot be downloaded. Install `ffmpeg-static` and
`ffprobe-static`, symlink their binaries into a scratch `bin/`, and point the CLI at the
preinstalled browser. Wrap it once:

```bash
#!/usr/bin/env bash
# hf.sh — run the pinned CLI with local ffmpeg + preinstalled Chromium
S=<scratchpad>/hf-check
export PATH="$S/bin:$PATH"
export HYPERFRAMES_BROWSER_PATH="${HYPERFRAMES_BROWSER_PATH:-/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell}"
exec npx --yes hyperframes@<version> "$@"
```

### 7.2 Validate, then *look*
```bash
./hf.sh check            # lint + runtime + layout + motion + contrast — fix every error
```

Then peek at real frames. This is the step that catches "it lints but looks wrong":

```js
// peek.mjs — seek the timeline and emulate clip windows by hand
import { createRequire } from 'node:module';
const require = createRequire('<a package with playwright-core>/package.json');
const { chromium } = require('playwright-core');
const [,, file, w, h, outdir, ...times] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport:{width:+w,height:+h}, deviceScaleFactor:0.5 });
await page.goto(`file://${file}`);
await page.waitForTimeout(600);
for (const t of times) {
  await page.evaluate(t => {
    window.__timelines.main.seek(+t, false);
    document.querySelectorAll('[data-start]').forEach(el => {
      if (el.id === 'root') return;
      const s = +el.dataset.start, d = +el.dataset.duration;
      el.style.visibility = (t >= s && t < s + d) ? 'visible' : 'hidden';
    });
  }, t);
  await page.waitForTimeout(80);
  await page.screenshot({ path: `${outdir}/p-${t}.png` });
}
await browser.close();
```

Tile the stills into a contact sheet and actually read it:

```bash
ffmpeg -y -i render.mp4 -vf "select='not(mod(n\,225))',scale=480:-1,tile=4x3" -frames:v 1 sheet.png
```

### 7.3 Render
```bash
./hf.sh render --quality high --output renders/film-16x9.mp4
```
Budget ~4 fps with light filters, ~1.5 fps with full-frame SVG blur — **a 55s film takes ~10
minutes**. Run it in the background with a monitor; never chain a foreground `sleep` before a
status check, and never report a render as running until you have confirmed the log exists.

### 7.4 Encode and deliver
Two sizes, because two different limits apply:

```bash
ffmpeg -y -i master.mp4 -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -movflags +faststart -an repo.mp4   # <100 MB for git
ffmpeg -y -i master.mp4 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart -an web.mp4    # <30 MB for chat
```

- GitHub rejects any file > 100 MB (`GH001`). Check the size **before** committing.
- Chat delivery caps around 30 MB.
- Silent by default: keep `-an` so the client can lay their own music under it.

---

## 8 · Self-review before you show anyone

Run this honestly. If two or more fail, iterate before delivering.

- [ ] Can a stranger state the product's promise after one silent watch?
- [ ] Is there a single frame with no motion anywhere in it?
- [ ] Does every camera move carry directional blur?
- [ ] Does any element fade in without a spring or a mask?
- [ ] Is any headline longer than 6 words, or does any narrate the obvious?
- [ ] Do the beats overlap, so there is never a cut to empty plate?
- [ ] Does the UI shown resemble the *real* product, or generic dashboard clip-art?
- [ ] `check` clean: zero errors, warnings reviewed?
- [ ] Contact sheet reviewed from the **rendered file**, not just the browser?
- [ ] Nothing clipped at frame edges at peak camera scale?
- [ ] Deliverables under both size limits, silent, and committed?

---

## 9 · Failure modes already paid for

| Symptom | Cause | Fix |
|---|---|---|
| `missing_timeline_registry` | timeline built in an external file | expose a builder, register from an inline script |
| `gsap_css_transform_conflict` | CSS `transform` + GSAP tween of the same prop | drop the CSS transform, use `gsap.set` |
| `Cannot access 'Ns' before initialization` on `check` | a `<canvas>` in the DOM | validate a canvas-free twin |
| Identical frames from `snapshot` | it doesn't seek | use the Playwright peek |
| Element pops to the wrong place | `tl.set({x,y})` fighting a scale tween | position with `left`/`top` |
| Layout audit flags headline leading | split words missing the escape | `data-layout-allow-overlap` on each `.w` |
| Contrast failure on a brand chip | vendor colour too light on white | darken the ink, keep the tint as background |
| `GH001: large files detected` | master > 100 MB | re-encode at CRF 25, `git commit --amend` |
| Banded, slow background | CSS `filter: blur()` on giant gradients | pre-generated soft-falloff PNGs |
| Render "running" but nothing happens | launched the watcher, not the render | verify the log file exists before reporting |

---

## 10 · Working agreement for the session

- Develop on the branch you were told to use; never push elsewhere; no PR unless asked.
- Deliver the MP4 in chat as soon as it exists, plus a one-line description of the story.
- When the client says "basic" or "boring", the answer is never more effects — it is a
  **clearer story, fewer beats, bigger moves, and better typography**.
- Show, then ask. One rendered iteration beats three paragraphs of proposal.

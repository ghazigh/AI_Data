# Datalith — the 26-second spot

**The idea.** Datalith's logo is three thin streams merging into one blue line, and the brand calls it
its signature: *every source, one graph*. The film is that mark coming alive. Every data source is a
line of light. On their own they tangle into a mess no AI agent can read. Datalith combs them straight,
weaves them into one graph and pulls them into one blue line, and that line folds flat into the logo.
It is the same 288 strands from the first frame to the lockup, so every transition carries motion.

**Deliverables** (in [`../masters/`](../masters/)):

| File | What |
|---|---|
| `datalith-spot-16x9.mp4` | 1920×1080, 30 fps, 26 s, H.264 High + AAC 192k, faststart, mastered to −14 LUFS |
| `datalith-spot-16x9-poster.jpg` | poster frame (the fibre logo) |
| `datalith-spot-16x9-shotgrid.jpg` | one frame per scene and per transition, pulled from the rendered file |
| `datalith-spot-9x16.*` | the vertical cut for social (same film, re-framed) |

## Beat sheet — 120 BPM, one bar (2 s) per scene, 26 s

| Time | Scene | On screen |
|---|---|---|
| 0–2 s | One line of light arcs through the dark; hundreds more pour in, and on each pour-in beat a named source lands: AWS, Snowflake, Databricks, PostgreSQL | — |
| 2–4 s | The camera drifts through the tangle; smaller source logos ride the strands | **Your data is everywhere.** |
| 4–6 s | A blue AI agent probes the tangle; the probe glitches and dies; one beat of silence | **Your agents can't use it.** |
| 6–8 s | The drop: a shockwave combs every strand into a vortex that pours into one point | **Every source.** · 150+ connectors · read-only |
| 8–10 s | Pipelines: seven lanes (documents, tables, email, tickets, transcripts, images, streams) run through five gates — extract, type, resolve, mask PII, embed. Raw and tangled going in, clean coming out, merging into one point | **Made readable.** · one pipeline per modality |
| 10–12 s | Match cut: the graph blooms out of that point; six domains pop on the 16ths | **One graph.** · enterprise knowledge graph |
| 12–16 s | A scan sweeps the graph; the use-case catalog is detected card by card, each wired back to the domains it reads — three ready to build, one blocked | **Know what to build.** |
| 16–18 s | The graph fires one Klein-blue line; the ready agents check in along it | **Agent-ready.** · governed · audited · any agent |
| 18–20 s | Everything folds into the mark, made of hairlines; the camera pulls back onto the lockup | — |
| 20–26 s | Logo lockup, tagline, call to action | datalith · Every source. One graph. Agent-ready. · Get your free readiness score · 48 hours · read-only · datalith.ai |

Music: F minor tension under the tangle, a hard stop, then the drop into Fm – D♭ – A♭ – E♭,
landing on A♭ exactly when the logo locks (the progression runs Fm – D♭ – A♭ – E♭ – Fm – D♭ – E♭ across the seven bars of the groove). Every sound effect sits on the same grid as the cuts.

## How it is built

- `index.html` — the 16:9 HyperFrames composition. `vertical/index.html` is the 9:16 cut, kept in its
  own project (HyperFrames wants one root composition per folder) with `vertical/assets` linked to
  `../assets`. Type, overlays and the lockup are DOM; the 3D world is one `<canvas>` redrawn by the
  timeline. The vertical cut is re-framed, not cropped: its camera rolls 90° so the one blue line shoots
  up the tall frame, then rolls back flat as the line becomes the logo's bar.
- `src/` — ES modules, bundled by `tools/build.mjs` into `assets/film.js` (committed, so rendering
  needs no build step).
  - `config.js` — the beat grid and the layouts. Every time in the film hangs off it.
  - `world/` — the three.js world. 288 strands × 96 points morph through six shapes (tangle → funnel
    → pipelines → graph → beam → logo). They are computed on the CPU per sub-frame and drawn as screen-space ribbons
    from a float texture with custom GLSL, plus billboards for nodes, sparks and dust. The look comes
    from four things:
    - real temporal motion blur: up to 26 sub-frames per frame, never reaching back across a cut;
    - depth of field;
    - an HDR bloom pyramid with an anamorphic streak;
    - an ACES tonemap, then shockwave, glitch, chromatic aberration and grain.
  - `film/` — the 2D layer: kinetic type on the 120 BPM grid, the overlays pinned to the 3D camera
    (source tiles, domain labels, the agent, the chips), and the lockup.
- `audio/score.py` — synthesizes the music bed and every effect from scratch (numpy, scipy, numba),
  mixes, and masters to −14 LUFS integrated with true peak ≤ −1 dBTP into `assets/audio/spot-mix.wav`.
  `audio/analyze.py` checks loudness, true peak and that the hits land on the cuts
  (`audio/analysis.png`).
- `tools/peek.mjs` — seeks any times in headless Chromium (SwiftShader WebGL, like the renderer) and
  saves frames plus a contact sheet. `tools/deliver.sh` — web encode, poster and shot grid.

Every frame is a pure function of `t`: seeded RNGs, no clocks, and the 3D world is redrawn from `t`
on every seek. That makes the render deterministic and safe to parallelise.

## Re-render

```bash
cd video/spot
npm install                      # three, esbuild, playwright-core — only needed to rebuild or peek
npm run build                    # src/ → assets/film.js (only after editing src/)
pip install numpy scipy numba soundfile pyloudnorm pillow
npm run audio                    # audio/score.py → assets/audio/spot-mix.wav (only after editing it)
./hf.sh check                    # lint + runtime + layout + contrast
./hf.sh render --quality high --workers 2 --output renders/spot-16x9.mp4
(cd vertical && ../hf.sh render --quality high --workers 2 --output ../renders/spot-9x16.mp4)
tools/deliver.sh renders/spot-16x9.mp4 16x9 && tools/deliver.sh renders/spot-9x16.mp4 9x16
```

`hf.sh` needs FFmpeg on `PATH` (or `FFMPEG_DIR` pointing at a folder with `ffmpeg` and `ffprobe`) and
a Chromium; it picks Playwright's headless shell if one is installed. With software WebGL on four CPU
cores a render takes about 13 minutes per cut.

**Numbers on screen:** "150+ connectors" and "48 hours" are the website's own claims. The use-case
catalog (names, dollar values, the blocked contract-renewal agent) is the demo estate's example set and
is labelled on screen as illustrative. The agent names come from the
example use cases on the site and in the demo (Claims triage copilot; the collections follow-up agent
and churn-risk weekly digest, shortened), and the six domains from the demo's insurance estate. Like
the demo itself, they are illustrative, not customer results.

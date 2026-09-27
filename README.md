# Datalith — The Agentic Data Center

> **Every source. One graph. Agent-ready.**

Datalith connects every data source in the enterprise, builds the **Enterprise Knowledge Graph**, and serves governed, agent-ready data to any AI agent — while recommending the agentic workflows the data itself makes possible.

*Analogy: [JetScale](https://jetscale.ai) is agentic AI for your cloud. **Datalith is agentic AI for your data.***

## The thesis in three numbers

| | |
|---|---|
| **>40%** | of agentic AI projects will be canceled by end of 2027 (Gartner) — data readiness is the #1 killer |
| **60–75%** | of every agent project's effort is spent on data preparation |
| **89%** | of teams are investing in context infrastructure in the next 12 months (DataHub, 2026) |

MCP moves context — it doesn't *produce* it. Datalith is the layer that produces it.

## The two promises

1. **See everything — visibility, transparency, control.** Clients have data everywhere and no visibility on what they have or what's happening in their databases. Datalith maps the whole estate into one live dashboard: estate map, activity stream, access control with full audit.
2. **Make it work for agents — agent-ready, potential unlocked.** Every modality prepared for agent consumption (agent-ready, agent-friendly), plus detection of the potential sleeping in the data — with **suggested agentic workflows and topic knowledge bases**, ROI attached.

*"First we show you what you have. Then we turn it into an agent workforce."*

## Repository map

> **The product lives in its own private repo, [`ghazigh/datalith`](https://github.com/ghazigh/datalith)** — the PRD, the v0 plans, the platform code and its own copy of the design system. This repo is the marketing side: website, demo, deck, film.

| Path | Contents |
|---|---|
| `docs/` | Market research, competitive landscape, product strategy, GTM plan and pitch narrative, plus the design specs and implementation plans. **Local only — gitignored, not in the repo.** |
| [`website/`](website/) | **The production website** — 5 pages (home, platform, pricing, company, investors) + 404 + the `/demo/` product demo, SEO/OG/sitemap, animations. Published to GitHub Pages at <https://ghazigh.github.io/AI_Data/> |
| [`website/demo/`](website/demo/) | The clickable product demo — eight screens over a sample estate, with a presenter's guided tour, a ⌘K command palette, notifications and live pipeline runs. Serve `website/` over http (`npm run serve` in `design-system/`) — the client bundle is an ES module |
| [`design-system/site/`](design-system/site/) | Website source (React pages + site.css/site.js) — rebuild with `npm run build:site` |
| [`design-system/demo/`](design-system/demo/) | Demo source (React screens, static estate data, hydration guard) — rebuild with `npm run build:demo`. Screenshots: `npm run shoot:demo` and `npm run shoot:states` (set `CHROMIUM_PATH` to a preinstalled Chromium if Playwright has no download of its own) |
| [`video/launch/`](video/launch/) | The launch film, as code: a [HyperFrames](https://hyperframes.dev) composition in a warm light-mode gradient system — one virtual camera per board with directional motion blur riding every move, spring entrances, per-word masked type, a typed question, a light racing the knowledge graph to answer it, count-up stats and drifting blooms with film grain always on. Seven beats in 55 s — data everywhere → one platform → scored dashboard → the graph forms → question and answer → a pipeline per dataset → proposed use cases. 16:9 at 1080p, silent. Render with `./hf.sh render --quality high` (needs FFmpeg and a Chromium; `hf.sh` shows how to point the CLI at local binaries). Drop a music bed in as a root-level `<audio>` |
| [`video/keynote/`](video/keynote/) | The keynote film shown on Home and made for the stage — a dark HyperFrames composition where the 3D worlds (the source constellation, the knowledge graph, the pipeline's records, the dust) are pure functions of time drawn through one perspective camera. Same story as the launch film in 56 s, closing on the icon-and-wordmark lockup. Render the 4K master with `npx hyperframes@0.8.27 render --quality high --resolution landscape-4k` (it lands in the ignored `renders/`); Home ships a 1080p encode of it from `design-system/site/assets/` |
| [`video/spot/`](video/spot/) | **The 26-second spot** — the brand film, in 16:9 and 9:16. Every data source is a line of light; the lines tangle, get combed into one flow, cleaned by one pipeline per modality, woven into one graph, mined for a use-case catalog and pulled into one Klein-blue line that folds into the logo (three streams merging into the bar). A HyperFrames composition with a three.js world in custom GLSL (288 morphing strands, temporal motion blur, depth of field, HDR bloom), kinetic type cut to a 120 BPM grid, and a score synthesized in Python and mastered to −14 LUFS. Deliverables in `video/masters/datalith-spot-*`; how to re-render is in [`video/spot/README.md`](video/spot/README.md) |
| [`video/PRODUCT-DEMO-VIDEO-PROMPT.md`](video/PRODUCT-DEMO-VIDEO-PROMPT.md) | Reusable master prompt for making a film like this one for **any** product in a fresh Claude session — intake form, the seven-beat story architecture, the locked design system, the motion language with working GSAP helpers, the HyperFrames determinism contract, the offline-asset recipes, and the validate → peek → render → encode → deliver pipeline with its size and time budgets |
| [`landing/index.html`](landing/index.html) | Legacy single-file landing page — fully self-contained, open directly in a browser |
| [`deck/Datalith-Pitch-Deck.pptx`](deck/Datalith-Pitch-Deck.pptx) | 13-slide seed pitch deck (PowerPoint) |
| [`deck/generate-deck.js`](deck/generate-deck.js) | Deck generator (`node generate-deck.js`, requires `pptxgenjs`) — edit & regenerate |

## The demo console

`/demo/` is what a prospect sees in a meeting, so it is built to be presented, not just browsed:

- **Guided tour** — a docked presenter's guide with one step per screen: the claim the screen makes, the talking points, and the one interaction worth showing. Previous/Next drive the same router the rail uses, so the rail, breadcrumb and guide never disagree.
- **Command palette** (`⌘K`) — search sources, domains, entities, use cases and agents, or jump straight to a screen; arrow keys and Enter navigate.
- **Needs attention** on the Overview — derived, never hand-listed: the failed pipeline, the high-severity red flags, sources awaiting credentials and the use cases a low domain score is holding back, each routed to the screen that fixes it.
- **Opportunity map** on Use cases — impact against effort, one point per agent application, colour-coded by build status.
- **Notifications, toasts and live runs** — a bell over the activity stream, confirmations for every operator action, and pipeline runs that visibly progress in their workspace.
- Every number is derived from one static estate (`design-system/demo/data/`), nothing reads a clock or a random source, and the integrity tests hold every screen to the same figures.

## The product (one platform, five stages)

The product is a sequence — each stage consumes the previous one's output.

1. **Connect** — 150+ connectors; multi-source, multi-platform, multi-modal ingestion, read-only. *No migration, no engineering project.*
2. **Ready** — scores how usable the data is for agents (Agent-Readiness Score 0–100), with red flags, and keeps monitoring it. *Continuous, not a one-off audit.*
3. **Pipelines** — turns that score into the restructuring this estate actually needs: resolution, semantic typing, PII masking, chunking, embedding. *Sized to what the scan found.*
4. **Graph** — the Enterprise Knowledge Graph: auto-ontology, identity resolution, lineage, with the topics, domains and expertise inside it named — each a knowledge base, served to any agent under governance and audit. *Readable by any agentic AI.*
5. **Use cases** — mines the graph for the agent applications the data supports, with sources, effort and payback attached — including what is blocked and why. *Know what to build before you build it.*

Earlier drafts framed this as six modules. Topics folded into Graph (naming a
domain is something the graph does, not a thing you buy); Gateway became a
property of the graph rather than a named module, since "how you read the
graph" was never separately purchasable. Serving is still governed, audited
and metered.

**Wedge:** a free 48-hour Agent-Readiness Audit (read-only credentials in, board-ready score out) → Growth ($2.5K/mo) → Scale ($6K/mo) → Enterprise ($100K+ ACV). Target NRR ≥130%.

## Status / next steps

- [ ] Replace placeholder founder bios in deck slide 12 and add real traction numbers to slide 11 before sending to investors.
- [ ] Register the `hello@datalith.ai` mailbox (all website CTAs point to it) and swap the GitHub Pages URL in `design-system/scripts/build-site.mjs` for the real domain once purchased.
- [ ] Trademark/domain diligence on the "Datalith" name (search on 2026-07-22 found no conflicting company).
- [ ] Build Audit v0 per the 90-day plan in the local GTM doc.
- [ ] The `/demo/` workspace is desktop-only below 1280px — add a small-screen notice if prospects start opening it on phones.

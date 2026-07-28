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

| Path | Contents |
|---|---|
| [`docs/01-market-research.md`](docs/01-market-research.md) | Market failure, why-now, market sizing, funding climate, buyer research, risks (sourced) |
| [`docs/02-competitive-landscape.md`](docs/02-competitive-landscape.md) | Positioning map, competitor-by-competitor analysis, differentiation, moat |
| [`docs/03-product-strategy.md`](docs/03-product-strategy.md) | The five product stages, platform loop, roadmap, success metrics |
| [`docs/04-gtm-business-plan.md`](docs/04-gtm-business-plan.md) | ICP, land→expand motion, pricing, financial model, the $4M seed ask, 90-day plan |
| [`docs/05-pitch-deck-narrative.md`](docs/05-pitch-deck-narrative.md) | Slide-by-slide deck script + investor Q&A objection prep |
| [`website/`](website/) | **The production website** — 5 pages (home, platform, pricing, company, investors) + 404, SEO/OG/sitemap, animations. Open `website/index.html` directly, or deploy via GitHub Pages |
| [`design-system/site/`](design-system/site/) | Website source (React pages + site.css/site.js) — rebuild with `npm run build:site` in `design-system/` |
| [`landing/index.html`](landing/index.html) | Legacy single-file landing page — fully self-contained, open directly in a browser |
| [`deck/Datalith-Pitch-Deck.pptx`](deck/Datalith-Pitch-Deck.pptx) | 13-slide seed pitch deck (PowerPoint) |
| [`deck/generate-deck.js`](deck/generate-deck.js) | Deck generator (`node generate-deck.js`, requires `pptxgenjs`) — edit & regenerate |

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
- [ ] Build Audit v0 per the 90-day plan in `docs/04-gtm-business-plan.md`.

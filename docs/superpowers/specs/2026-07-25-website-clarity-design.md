# Website clarity rewrite — design

**Date:** 2026-07-25
**Goal:** Make the Datalith website immediately clear to two audiences — enterprise buyers and seed investors — about what Datalith is, what a customer buys, and what value it delivers.

## Problem

The site is visually strong but communicates in slogans. Specific failures, verified against the current source:

1. **The hero never defines the product.** `Home.tsx:51` leads with "Every source. One graph. / Agent-ready." — a slogan. A first-time visitor learns neither the category, the buyer, nor what Datalith replaces.
2. **"The two promises"** (`Home.tsx:84-101`) is brand framing placed where a buyer expects product mechanics.
3. **"Six modules. One monolith."** (`Home.tsx:135`, `Platform.tsx:108`, `FeatureGrid.tsx:22`) — "monolith" reads as an architecture anti-pattern, and "modules" implies six separate purchases. Datalith is sold as **one platform, tiered**.
4. **Capabilities are described feature-first**, not value-first: "auto-ontology, identity resolution, lineage" (`Platform.tsx:33`) tells a buyer nothing about their own outcome.
5. **Products never map to price.** The tiers in `Pricing.tsx:8-33` (Audit / Growth / Scale / Enterprise) are never connected to the six capabilities, so "what do I get for $2.5K/mo" is unanswerable.
6. **No quantified value on the home page.** The only ROI figures live on the Platform page (`Platform.tsx:88-96`).
7. **Undefined jargon** — ARS, MCP, ontology, lineage, semantic layer — appears before any plain-language definition.

## Decisions taken

| Question | Decision |
|---|---|
| What does a customer buy? | **One platform, tiered.** All six capabilities belong to one product; tiers change limits and governance depth. |
| How far to change? | **Rewrite copy AND restructure the home page IA.** Visual design and components stay; wording and section order change. |
| How to prove value pre-launch? | **Modeled numbers, clearly labeled.** Derived from already-cited third-party research. No invented logos, customers, or testimonials. |

## Non-goals

- No visual redesign, no new design tokens, no layout system changes.
- No new pages.
- No changes to `landing/index.html` (legacy) or the pitch deck.
- No refactoring unrelated to the copy and section-order changes.

---

## 1. Message architecture

The **plain definition**, used verbatim in the home hero and echoed in page meta descriptions:

> Datalith connects every database, warehouse, wiki and app your company runs into one governed knowledge graph — then serves it to any AI agent, with a full audit trail.

**Site-wide terminology changes:**

| Current | Replacement | Applies to |
|---|---|---|
| "Six modules. One monolith." | "One platform. Six capabilities." | `Home.tsx`, `Platform.tsx`, `FeatureGrid.tsx` default title |
| "modules" | "capabilities" | all pages, `FeatureGrid` labels, `Platform.tsx` `MODULES` heading copy |
| "The two promises" | section removed | `Home.tsx` |
| ARS (bare) | "Agent-Readiness Score — a 0–100 measure of how usable your data is for AI agents" on first use per page | all pages |
| MCP (bare) | "MCP, the standard protocol agents use to pull context" on first use per page | all pages |
| "ontology", "lineage", "semantic layer" | plain equivalents in headline/lead copy; technical terms allowed only in the Platform deep-dive bullets | `Home.tsx` |

The capability *names* (Connect, Graph, Topics, Ready, Gateway, Flows) are retained — they are useful shorthand. Only the framing changes: they are parts of one platform, not six SKUs.

## 2. Home page — new section order

`design-system/site/pages/Home.tsx`

| # | Section | Action |
|---|---|---|
| 1 | Hero | rewrite (§2.1) |
| 2 | Connector marquee | keep unchanged |
| 3 | The problem | reframe existing `StatBand` with a heading (§2.2) |
| 4 | How it works | move `Steps` up from position 7; sharpen copy (§2.3) |
| 5 | What you get | **new** — six capabilities with value lines (§2.4) |
| 6 | What it's worth | **new** — modeled value, labeled (§2.5) |
| 7 | The knowledge graph | keep; retitle and shorten lead (§2.6) |
| 8 | The dashboard | keep; retitle (§2.6) |
| 9 | The Agent-Readiness Score | keep; define ARS plainly (§2.6) |
| 10 | What it costs | **new** — tier summary strip linking to Pricing (§2.7) |
| 11 | FAQ | keep; add two items (§2.8) |
| 12 | CTA band | keep unchanged |
| — | `Quote` "MCP moves context…" | **remove from Home**; already present in spirit on Platform — add it there |

### 2.1 Hero

```
headline: "Make your enterprise data usable by AI agents."
accent:   "Every source. One graph."
lead:     "Datalith connects every database, warehouse, wiki and app your company
           runs into one governed knowledge graph — then serves it to any AI agent,
           with a full audit trail. Built for data and AI leaders at companies
           running dozens of disconnected systems."
primaryCta:   { label: 'Get your free readiness score', href: '#audit' }
secondaryCta: { label: 'see how it works', href: '#how' }
```

Add a note line beneath the CTAs: *"Free 48-hour Agent-Readiness Score. Read-only credentials, no migration."*

`Hero` currently accepts `headline`, `accent`, `lead`, `primaryCta`, `secondaryCta`, `figure` and has no slot for a note (verified `src/components/Hero.tsx:9-19`). Add an optional `note?: string` prop rendered under the `dl-hero-ctas` row — additive, defaulting to `undefined`, so existing usages are unaffected. The component's own default `headline`/`accent`/`lead` values stay as they are; Home passes explicit props.

### 2.2 The problem

Wrap the existing `StatBand` in a titled section:

```
label:    "The problem"
title:    "Most agent projects stall on the data, not the model."
lead:     "Teams buy the model, pick the framework, then spend the next two quarters
           discovering their data isn't in a shape any agent can use."
```

`StatBand` default stats are unchanged — they are already sourced.

### 2.3 How it works

`Steps` with `id="how"`, moved to position 4.

```
label: "How it works"
title: "Read-only credentials in. Governed context out."
```

Steps copy (replaces `DEFAULT_STEPS` in `src/components/Steps.tsx`):

1. **Connect, read-only** — "Give Datalith scoped read-only credentials. It maps every database, warehouse, wiki and app you run. No migration, nothing written back."
2. **One graph, scored** — "Datalith builds a single map of your business across all those systems, and scores how ready it is for agents — board-ready in 48 hours."
3. **Serve to any agent** — "Your agents pull governed context through one endpoint, each with its own identity and a full audit log of every query."

### 2.4 What you get — the six capabilities

New section, `id="capabilities"`. Uses `FeatureGrid` extended with an optional `value` field per item, rendered as a distinct value line (styled with the existing accent/label treatment, not a new token).

```
label: "What you get"
title: "One platform. Six capabilities."
lead:  "Every plan includes all six. Higher tiers raise the limits and deepen the
        governance — not unlock features."
```

| Capability | Title (what it does) | Value line (added value) |
|---|---|---|
| 01 · Connect | Plugs into every system, read-only | No migration and no engineering project — connected in an afternoon. |
| 02 · Graph | One map of your business across all systems | Agents stop giving contradictory answers from three systems. |
| 03 · Topics | One agreed definition per business metric | "Revenue" means the same thing to every agent, every time. |
| 04 · Ready | Cleans and scores your data for machine use | Removes the 60–75% of agent project effort that goes to data prep. |
| 05 · Gateway | One governed door for every agent | Security signs off, because every agent query is identified and logged. |
| 06 · Flows | Ranks which agents to build, by payback | Turns a data cleanup budget into a revenue roadmap. |

These become the new `MODULES` default in `src/components/FeatureGrid.tsx`.

**`FeatureGrid` prop change:** `items` gains an optional `value?: string`. When present it renders as an additional line within the cell. Existing callers that pass items without `value` render exactly as today.

### 2.5 What it's worth

New section, `id="value"`. Three modeled figures using the existing `Card` (or `Stat`) primitives.

```
label: "What it's worth"
title: "The cost of data that isn't agent-ready."
```

| Figure | Body |
|---|---|
| **$300–375K** | "of a $500K agent program goes to data preparation before a single agent works — 60–75% of project effort, per published industry benchmarks." |
| **>40%** | "of agentic AI projects will be canceled by the end of 2027. Data readiness is the leading cause. (Gartner)" |
| **Weeks, not quarters** | "Time to a first governed agent once the graph is live, because the preparation work is already done and scored." |

**Required disclaimer**, rendered directly beneath the figures using the existing `st-footnote` class:

> Illustrative model based on published industry benchmarks, not customer results. Datalith is pre-launch; the first design-partner cohort is open.

This disclaimer is mandatory and must not be dropped or softened during implementation.

### 2.6 Retitled existing sections

| Section | Current title | New title / change |
|---|---|---|
| Knowledge graph | "Every source, wired into one intelligence." | "One customer. One record. Across every system." — lead shortened to two sentences, "lineage" replaced with "you can trace every fact back to its source" |
| Dashboard | "Six modules. One monolith." | "Your whole estate in one view." |
| Score | "One number your board understands." | keep title; lead rewritten to define ARS plainly on first use: "The Agent-Readiness Score is a 0–100 measure of how usable your data is for AI agents — how much is covered, how well it's defined, how well it's governed, how fresh it is. Free, in 48 hours, from read-only credentials." |

### 2.7 What it costs

New compact section, `id="cost"`, above the FAQ. Not a full pricing table — a three-line summary plus a link.

```
label: "What it costs"
title: "Start free. Pay when the graph goes live."
```

- **Free** — 48-hour Agent-Readiness Score, 3 sources
- **$2.5K/mo** — Growth: the graph live, 10 sources, agents served
- **$6K/mo → custom** — Scale and Enterprise: agent fleets, full governance, in-VPC

Link: `see full pricing and what's in each plan` → `./pricing.html`

### 2.8 FAQ additions

Two items prepended to the existing four in `src/components/FAQ.tsx` defaults:

- **"What exactly am I buying?"** — "One platform with six capabilities: connection, the knowledge graph, business definitions, preparation and scoring, governed serving, and workflow recommendations. Every plan includes all six; higher tiers raise limits and deepen governance."
- **"How is this different from a data catalog, or from Glean?"** — "A catalog describes data for people to find. Glean answers employee questions. Datalith prepares data for machines and serves it to agents through a governed endpoint, with per-agent identity and a full audit trail."

The existing "How is this different from a data catalog?" item is removed, superseded by the above.

## 3. Platform page

`design-system/site/pages/Platform.tsx`

- `PageIntro` title/accent: **"One platform."** / **"Six capabilities."** Lead rewritten to plain language.
- Each of the six entries in `MODULES` gains a **value line** rendered above the `points` list, using the value copy from §2.4. The existing `body` and `points` stay — this is the depth page and technical detail belongs here.
- Dashboard section title "Built for the CDO's Monday meeting." is kept.
- Add the `Quote` "MCP moves context. It doesn't produce it. Datalith is the layer that produces it." removed from Home — place it after the modules section, before the Trust section. The existing "Agents are the primary consumers…" quote is retained where it is.
- First use of "MCP" on the page gets its plain-language gloss.

## 4. Pricing page

`design-system/site/pages/Pricing.tsx`

- Each tier `blurb` rewritten as **who it's for**, not what it contains:
  - **Audit** — "For teams who want to know where they stand before committing budget."
  - **Growth** — "For teams putting their first agents into production."
  - **Scale** — "For teams running agent fleets that security has to sign off on."
  - **Enterprise** — "For regulated estates that need Datalith inside their own VPC."
- **New: capability × tier matrix.** A table with the six capabilities as rows and the four tiers as columns, showing what each tier includes at what limit. Reuses the `st-table` / `st-table-wrap` markup already used on `Investors.tsx:126-135`. Placed directly beneath `PricingTable`.

  Row contents follow the tier feature lists already in `TIERS` and must stay consistent with them — if the two ever disagree, `TIERS` is authoritative and the matrix is corrected to match.
- Add one FAQ item: **"Do I have to buy the capabilities separately?"** — "No. Every plan includes all six. Tiers change how many sources you connect, how much agent traffic you serve, and how deep the governance goes."

## 5. Investors and Company pages

Light alignment only:

- `Investors.tsx` `PageIntro` lead adopts the plain definition sentence so the investor page and the buyer page describe the same product in the same words.
- `Company.tsx` needs **no change** — audited on 2026-07-25, it contains no "module" or "monolith" strings.
- No structural change to either page. The Investors page is already clear.

## 6. Components changed

| File | Change |
|---|---|
| `src/components/Hero.tsx` | additive optional `note?: string` prop |
| `src/components/FeatureGrid.tsx` | additive optional `value?: string` on items; new default `MODULES` copy; new default title |
| `src/components/Steps.tsx` | new `DEFAULT_STEPS` copy |
| `src/components/FAQ.tsx` | new `DEFAULT_ITEMS` (2 added, 1 replaced) |
| `src/styles.css` | styles for the feature value line and the hero note, using existing tokens only |
| `site/pages/Home.tsx` | section reorder + all copy per §2 |
| `site/pages/Platform.tsx` | §3 |
| `site/pages/Pricing.tsx` | §4 |
| `site/pages/Investors.tsx` | §5 |
| `site/pages/Company.tsx` | §5, pending audit |

Both component prop additions are optional with `undefined` defaults, so no existing call site breaks.

## 7. Verification

1. `npm run typecheck` in `design-system/` — passes.
2. `npm test` in `design-system/` — passes. Existing tests pass explicit props rather than relying on default copy (verified: `src/test/sections2.test.tsx:14`, `src/test/sections3.test.tsx:5`), so default-copy changes are safe. Add a test asserting `FeatureGrid` renders a `value` line when supplied and omits it when not.
3. `npm run build:site` — regenerates `website/*.html`.
4. Grep the built `website/` output for `monolith`, `two promises`, and `modules` — expect zero hits outside the Platform deep-dive where "capabilities" now applies.
5. Confirm the §2.5 disclaimer text is present in the built `website/index.html`.
6. Open `website/index.html` and confirm section order matches §2 and that no layout breaks at mobile width.

## 8. Success criteria

A reader who has never heard of Datalith can answer, from the home page alone, without scrolling past section 6:

- What is it? — a platform that makes enterprise data usable by AI agents
- Who is it for? — data and AI leaders at companies running many systems
- What do I buy? — one platform, six capabilities, all included in every plan
- What is it worth? — it removes the 60–75% of agent project effort spent on data prep
- What does it cost? — free to start, $2.5K/mo when live
- What is the first step? — free 48-hour readiness score from read-only credentials

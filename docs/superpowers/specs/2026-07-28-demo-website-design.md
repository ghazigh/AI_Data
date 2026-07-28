# Datalith Demo Workspace — Design

**Date:** 2026-07-28
**Status:** Approved for planning

## Summary

A self-serve, clickable mockup of the Datalith product, published at `/demo/`, that
lets a prospect explore a fully-populated workspace without an account, a backend, or
a sales call. The visitor lands inside the estate of a fictional global insurer and
navigates seven screens that follow the product's own sequence: Overview, then the
five stages (Connect, Ready, Pipelines, Graph, Use cases), then Governance & audit.

The demo's job is conversion. It exists to make the two promises in the product
strategy visible rather than asserted: *see everything*, and *make it work for
agents*.

## Goals

- A prospect who lands cold can understand what Datalith does in under two minutes of
  clicking, with no guidance.
- Every claim on the marketing site has a screen behind it. The Agent-Readiness Score,
  the knowledge graph, the governed serving, the ROI-attached use cases — all
  inspectable.
- Production quality. The demo is itself an argument that the team can build the
  product.

## Non-goals

- No backend, no accounts, no persistence. State is session-only.
- No mobile support (see Accepted tradeoffs).
- Not a marketing page. It is app chrome, and it does not restate the pitch.

## Decisions

| Decision | Choice |
|---|---|
| Demo mode | Self-serve exploration — no guided tour, no scripted narration |
| Entry state | Fully-populated workspace, sources connected and graph built |
| Scope | All seven screens |
| Tenant | Meridian Assurance, a global P&C insurer |
| Build | SSR the shell and each screen, hydrate into a client-routed app |
| Shell | Ink left rail + light canvas workspace, plus a live stage-status strip |
| Mobile | Desktop only, 1280px minimum |

## The demo tenant

All mock data describes one tenant. The canon below is load-bearing — screens cross-
reference each other, and tests assert the numbers agree.

**Meridian Assurance** — multinational property & casualty insurer.
Viewer persona: **Amara Diallo, Chief Data Officer**.

**Estate**
- 34 sources connected, 4 awaiting read-only credentials.
- Estate Agent-Readiness Score **71 / 100**, up 6 from last quarter.
- 2.4M entities resolved, 1.9M relationships mapped, across 8 knowledge bases.
- 184K agent calls served in 30 days, 3 denied by policy, 100% logged.

**Systems** span the modalities the product claims to handle: Guidewire ClaimCenter
and PolicyCenter, Duck Creek, Snowflake, Databricks, BigQuery, Postgres, SQL Server,
MongoDB (tables); SharePoint, Google Drive, Box, Confluence (documents and PDFs);
Zendesk and Jira (tickets); Exchange (email); Genesys (call transcripts); S3 and Azure
Blob (object stores, including claim photography); Kafka (streams); Salesforce and SAP.

**The eight knowledge bases and their scores**

| Domain | Score | Principal sources |
|---|---|---|
| Policies | 84 | Duck Creek, Snowflake |
| Claims | 78 | Guidewire, Zendesk, Genesys |
| Support | 76 | Zendesk, Genesys |
| Reinsurance | 73 | S3, Snowflake |
| Contracts | 68 | SharePoint, Box |
| Compliance | 64 | SharePoint, Exchange |
| Broker network | 61 | Salesforce, SAP |
| Underwriting | 55 | SharePoint, Outlook |

The estate score is the source-weighted mean of the domain scores, rounded. The data
must satisfy this; a test asserts it.

**Pipeline plan counts** — 41,208 duplicate records to resolve, 380 columns to type,
12 columns to mask, 22,470 documents to chunk.

**Use cases** — 14 opportunities found, 5 blocked. Named examples: Claims triage
copilot ($2.1M/yr, ready), Reinsurance treaty reader ($880K/yr, in review), Broker
follow-up agent ($640K/yr, blocked on Broker network at 61).

## Screens

### Overview

The landing screen and the CDO's single pane. Stage-status strip across the top (01–05
with live status per stage), four estate tiles (readiness score with tick meter, sources
connected, entities resolved, agent calls served), readiness by business domain,
live estate activity, and the use-case pipeline with projected annual impact.

The domain panel here shows the five domains carrying the most sources, with a link
through to Ready for all eight. Domain rows are not numbered — numbering belongs to
the stages, where order encodes a real dependency; the domains are a set, not a
sequence, and indexing them would imply an order that does not exist.

### 01 Connect

Table of live sources: name, modality, record count, last sync, readiness contribution,
status. Filterable by category and modality, sortable, searchable.

**Connect flow.** "Connect a source" opens the connector catalogue — a searchable grid
across warehouses, OLTP, SaaS, object stores and streams. Selecting a connector shows
a read-only credentials form; submitting it inserts the row in a `scanning` state,
which resolves after a scripted delay into a scored, connected source. This is the one
place the visitor acts on the system, and it is deliberate: it makes the read-only
wedge and the time-to-value claim visible.

**Source drawer.** Objects and schemas, modality breakdown, sync history, per-source
sub-scores.

### 02 Ready

Estate score decomposed into its five dimensions (completeness, freshness, consistency,
semantic coverage, governance coverage), trend across four quarters, score by domain
and by source, and the red-flag list — unmasked PII, duplicate entities, stale sources
— each carrying an action that hands it to Pipelines.

### 03 Pipelines

The plan, where every proposed step carries the count that justifies it and the
readiness delta it would produce (`+6 Claims`). One pipeline runs live with real
progress state. Run history below: status, duration, records processed, delta achieved.

### 04 Graph

The centerpiece. Knowledge bases listed down the left; selecting one filters the canvas.
Interactive canvas with pan, zoom and node selection. Selecting an entity opens its
properties, source provenance, column- and chunk-level lineage, and freshness.

Identity resolution gets a dedicated panel, because it is the hardest claim to believe:
one policyholder shown as the same entity across Salesforce, Snowflake `dim_customer`
and Guidewire, with the matching evidence.

### 05 Use cases

The 14 opportunities ranked by projected impact, each showing the sources it draws on,
its effort estimate and its status. Opening one shows data bindings, guardrails, eval
set, and export targets (LangGraph, CrewAI, OpenAI Agents SDK, n8n). Blocked use cases
name the domain holding them back and link to its readiness score, closing the loop
back to stage 02.

### Governance & audit

The trust screen. Agent registry with per-agent scopes, call volume and denials; policy
rules down to column and chunk level; and a live audit log — timestamp, agent, entities
touched, allowed or denied, policy applied.

### Chrome

A persistent `DEMO · SAMPLE DATA` marker so no visitor mistakes this for their own
estate, and a standing "Start your free audit" CTA in the rail.

## Architecture

New `design-system/demo/` source tree beside `site/`, built by
`design-system/scripts/build-demo.mjs` to `website/demo/`. It shares `src/tokens.css`
and the fonts with the marketing site and nothing else; app chrome has its own
`demo.css`.

**Two build outputs.** esbuild produces (1) a Node bundle of the screens, which the
build script renders with `renderToStaticMarkup` into one HTML file per screen, and
(2) a browser bundle that hydrates and takes over routing.

**Routing.** Every screen is a real file: `website/demo/index.html`,
`demo/connect/index.html`, `demo/ready/index.html`, `demo/pipelines/index.html`,
`demo/graph/index.html`, `demo/use-cases/index.html`, `demo/governance/index.html`.
The client router intercepts internal link clicks and transitions with `pushState`, so
navigation is instant, but every URL resolves to a file that exists. Deep links and
refreshes work with no server configuration on GitHub Pages, and the demo renders
completely with JavaScript disabled.

Asset paths are computed per page depth rather than written absolute, matching how the
existing site build survives being served under `/AI_Data/`.

## Data layer

`demo/data/` holds one typed module per area — sources, readiness, pipelines, graph,
useCases, governance, activity — all pure data keyed to a single tenant constant. No
logic lives here.

Two constraints, both in service of hydration correctness:

1. **No `Math.random()`.** Anywhere.
2. **No live clock.** Timestamps are fixed strings ("14 min ago"), not computed from
   `Date.now()`.

Graph node positions are precomputed in the data module. No physics simulation runs at
runtime — it would produce different coordinates on the server and the client, and it
would cost frames on a screen that needs to feel immediate.

## State

A single `DemoStateProvider` holds connected sources, active filters, current selection
and the running pipeline. Session-only, reset by reload or by the "Reset demo" control.
No state library.

## Components

`demo/components/` gets its own set, distinct from the marketing kit in `src/components/`:
AppShell, Rail, TopBar, StageStrip, StatTile, Panel, DataTable, Drawer, FilterBar,
GraphCanvas, AuditStream, StatusPill.

Charts are hand-rolled SVG — score meters, quarterly trends, domain bars, dimension
breakdowns — with no charting dependency. The dataviz skill is consulted before the
chart primitives are written so they read as one system rather than seven separate
inventions.

Files stay focused. A component that grows past roughly 200 lines is doing too much and
gets split.

## Visual design

The demo inherits the marketing site's language: `#FCFCFB` canvas, `#101013` ink,
`#0031E3` blue, Schibsted Grotesk display, Geist body, Geist Mono for labels and data,
hairline rules, zero border-radius except pills.

The one structural device carried through every screen is the stage numbering. `01`–`05`
appears in the rail, in the stage strip and in panel eyebrows, because the five stages
genuinely are a sequence in which each consumes the previous one's output. The numbering
encodes that dependency; it is not decoration.

## Quality floor

- Visible keyboard focus on every interactive element.
- Drawers trap focus and close on Escape.
- Real table semantics — `<table>`, `<th>`, scope attributes.
- `prefers-reduced-motion` respected, following the pattern already in `styles.css`.
- Every screen readable with JavaScript disabled.

## Testing

Vitest and Testing Library are already configured in `design-system/`.

- Every screen renders without error.
- The router resolves every path, and unknown paths fall back cleanly.
- **Hydration guard:** for each screen, the SSR string matches the client's first render.
- **Data integrity:** every use case references sources that exist; every blocked use
  case names a real domain; the estate score equals the source-weighted mean of domain
  scores; every activity entry references a real source.
- A Playwright pass screenshots all seven screens for visual review.

## Site integration

- "Demo" added to `SiteNav`.
- A CTA on Home and on Platform.
- `/demo/` enters `sitemap.xml`; the inner screens are `noindex`, since they are app
  views rather than pages worth ranking.

## Accepted tradeoffs

**Desktop only.** Below 1280px the demo scrolls horizontally rather than reflowing.
This was chosen deliberately with the alternative on the table: a phone visitor will
see a layout that does not fit. The mitigation — a small-screen notice panel — remains
available later and is a contained change, since it needs no per-screen work.

**Client bundle.** The demo ships React to the browser, which no other page on the site
does. It is scoped to `/demo/` and does not touch the marketing pages' payload.

## Out of scope

Guided tour overlay, multiple tenant personas, onboarding-from-empty flow, lead capture
gating, and any real backend. Each is additive and none is blocked by this design.

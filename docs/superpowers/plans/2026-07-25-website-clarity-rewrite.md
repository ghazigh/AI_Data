# Website Clarity Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Datalith website in plain language and restructure the home page so buyers and investors can immediately tell what Datalith is, what a customer buys, and what it is worth.

**Architecture:** The site is a static build. React page components in `design-system/site/pages/*.tsx` compose design-system components from `design-system/src/components/*.tsx`, and `npm run build:site` pre-renders them to static HTML in `website/`. This plan changes copy and section order in the page components, plus two additive optional props and some default copy in the design system. No visual redesign, no new pages, no layout system changes.

**Tech Stack:** React 18, TypeScript, tsup, esbuild + `react-dom/server` for static pre-render, Vitest + @testing-library/react (jsdom), plain CSS with custom-property tokens.

**Spec:** [docs/superpowers/specs/2026-07-25-website-clarity-design.md](../specs/2026-07-25-website-clarity-design.md)

> **Correction (2026-07-26):** an earlier draft of this document asserted "Every plan includes all six capabilities." That claim is **false** — the `TIERS`/`MATRIX` arrays in `design-system/site/pages/Pricing.tsx` gate the Flows capability to Scale and above, so the Growth plan does not include it. The claim was caught in review, removed from the shipped site, and corrected throughout this document. Do not reintroduce it. Datalith is one tiered platform, but the tiers differ in which capabilities they include — not only in limits.

## Global Constraints

- **All commands run from `design-system/`.** `npm test`, `npm run typecheck`, `npm run build:site`.
- **Terminology, site-wide:** never "modules" or "monolith" — use **"capabilities"** and **"One platform. Six capabilities."** The capability names (Connect, Graph, Topics, Ready, Gateway, Flows) are retained.
- **Datalith is one tiered platform, not six purchasable products.** You buy a plan, not individual capabilities. Tiers differ in how many sources you connect, how much agent traffic you serve, how deep the governance goes, AND which capabilities are included — the Growth tier does not include Flows. Never claim every plan includes all six; verify any such claim against the `TIERS`/`MATRIX` arrays in `Pricing.tsx`, which are authoritative.
- **Jargon rule:** "ARS", "MCP", "ontology", "lineage", "semantic layer" may not appear bare. ARS gets "Agent-Readiness Score — a 0–100 measure of how usable your data is for AI agents" on first use per page. MCP gets "MCP, the standard protocol agents use to pull context" on first use per page. "ontology"/"lineage"/"semantic layer" are banned from `Home.tsx` entirely; they are permitted only inside the Platform page's deep-dive bullet lists.
- **The §2.5 disclaimer is mandatory** and must be reproduced verbatim: *"Illustrative model based on published industry benchmarks, not customer results. Datalith is pre-launch; the first design-partner cohort is open."* Do not soften, shorten, or drop it.
- **No invented proof.** No customer names, logos, testimonials, or unsourced metrics.
- **Both new component props are optional with `undefined` defaults** so no existing call site breaks.
- **Only existing CSS tokens.** Confirmed available: `--dl-ink`, `--dl-grey-3`, `--dl-hairline`, `--dl-space-4`, `--dl-text-label`, `--dl-text-small`. Do not add tokens.
- **Commit after every task.**

---

### Task 1: Additive component props — `Hero.note` and `FeatureGrid.value`

**Files:**
- Modify: `design-system/src/components/Hero.tsx`
- Modify: `design-system/src/components/FeatureGrid.tsx`
- Modify: `design-system/src/styles.css`
- Test: `design-system/src/test/sections1.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `HeroProps.note?: string` — renders as `<p className="dl-hero-note">` directly after the `.dl-hero-ctas` div. Omitted entirely when undefined.
  - `FeatureGridProps.items` item shape becomes `{ label: string; title: string; body: string; value?: string }`. When `value` is present it renders as `<p className="dl-featuregrid-value">` as the last child of `.dl-featuregrid-cell`.

- [ ] **Step 1: Write the failing tests**

Append to `design-system/src/test/sections1.test.tsx`:

```tsx
test('Hero renders an optional note under the CTA row', () => {
  const { container } = render(
    <Hero headline="H" lead="Lead." primaryCta={{ label: 'Begin', href: '#' }} note="Free 48-hour score." />,
  )
  const note = container.querySelector('.dl-hero-note')
  expect(note).toBeTruthy()
  expect(note?.textContent).toBe('Free 48-hour score.')
})

test('Hero omits the note element when no note is given', () => {
  const { container } = render(<Hero headline="H" lead="Lead." />)
  expect(container.querySelector('.dl-hero-note')).toBeNull()
})

test('FeatureGrid renders a value line when an item supplies one', () => {
  const { container, getByText } = render(
    <FeatureGrid items={[{ label: '01', title: 'Connect', body: 'Body.', value: 'No migration.' }]} />,
  )
  expect(getByText('No migration.')).toBeTruthy()
  expect(container.querySelector('.dl-featuregrid-value')).toBeTruthy()
})

test('FeatureGrid omits the value line when an item has none', () => {
  const { container } = render(
    <FeatureGrid items={[{ label: '01', title: 'Connect', body: 'Body.' }]} />,
  )
  expect(container.querySelector('.dl-featuregrid-value')).toBeNull()
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `cd design-system && npx vitest run src/test/sections1.test.tsx`
Expected: the two "renders" tests FAIL (`.dl-hero-note` / `.dl-featuregrid-value` are null; `getByText('No migration.')` throws). The two "omits" tests will already pass — that is expected and fine.

- [ ] **Step 3: Add the `note` prop to Hero**

In `design-system/src/components/Hero.tsx`, add to `HeroProps` after `figure`:

```tsx
  /** Small mono note under the CTA row, e.g. trial or pricing terms. */
  note?: string
```

Add `note,` to the destructured parameter list (no default value — it stays `undefined`).

Then in the render, immediately after the closing `</div>` of `.dl-hero-ctas`:

```tsx
          {note && <p className="dl-hero-note">{note}</p>}
```

- [ ] **Step 4: Add the `value` field to FeatureGrid**

In `design-system/src/components/FeatureGrid.tsx`, change the `items` type:

```tsx
  items?: { label: string; title: string; body: string; value?: string }[]
```

Then inside the `.dl-featuregrid-cell` div, after the `<p className="dl-featuregrid-body">` line:

```tsx
              {it.value && <p className="dl-featuregrid-value">{it.value}</p>}
```

- [ ] **Step 5: Add the two CSS rules**

In `design-system/src/styles.css`, add after the `.dl-hero-ctas` rule (currently line 170):

```css
.dl-hero-note { font-family: var(--dl-font-mono); font-size: var(--dl-text-label); letter-spacing: 0.04em; color: var(--dl-grey-3); margin-top: var(--dl-space-4); max-width: 420px; line-height: 1.7; }
```

And after the `.dl-featuregrid-body` rule (currently line 193):

```css
.dl-featuregrid-value { font-size: var(--dl-text-small); color: var(--dl-ink); margin-top: 12px; padding-top: 12px; border-top: var(--dl-hairline); line-height: 1.6; }
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `cd design-system && npm test && npm run typecheck`
Expected: all tests PASS, typecheck clean.

- [ ] **Step 7: Commit**

```bash
git add design-system/src/components/Hero.tsx design-system/src/components/FeatureGrid.tsx design-system/src/styles.css design-system/src/test/sections1.test.tsx
git commit -m "feat(ds): optional Hero note and FeatureGrid value line"
```

---

### Task 2: Design-system default copy — capabilities, steps, FAQ

**Files:**
- Modify: `design-system/src/components/FeatureGrid.tsx`
- Modify: `design-system/src/components/Steps.tsx`
- Modify: `design-system/src/components/FAQ.tsx`
- Test: `design-system/src/test/sections2.test.tsx`

**Interfaces:**
- Consumes: `FeatureGridProps` item `value` field from Task 1.
- Produces: `FeatureGrid` default `title` is now `'One platform. Six capabilities.'`; default `items` carry `value` lines. `Steps` and `FAQ` defaults are rewritten. Home and Platform rely on these defaults in later tasks.

- [ ] **Step 1: Write the failing test**

Append to `design-system/src/test/sections2.test.tsx`:

```tsx
import { FeatureGrid, FAQ } from '../index'

test('FeatureGrid defaults describe one platform with six valued capabilities', () => {
  const { container, getByText } = render(<FeatureGrid />)
  expect(getByText('One platform. Six capabilities.')).toBeTruthy()
  expect(container.querySelectorAll('.dl-featuregrid-cell').length).toBe(6)
  expect(container.querySelectorAll('.dl-featuregrid-value').length).toBe(6)
  expect(container.textContent).not.toMatch(/monolith|module/i)
})

test('FAQ defaults answer what the customer is buying', () => {
  const { container } = render(<FAQ />)
  expect(container.textContent).toMatch(/What exactly am I buying\?/)
  expect(container.textContent).toMatch(/You pick a plan rather than buying capabilities à la carte/)
})
```

Note: `sections2.test.tsx` already imports `render` and `Steps`. Merge the import line rather than duplicating it — the file must have exactly one import from `'../index'`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd design-system && npx vitest run src/test/sections2.test.tsx`
Expected: FAIL — `Unable to find an element with the text: One platform. Six capabilities.`

- [ ] **Step 3: Replace the FeatureGrid defaults**

In `design-system/src/components/FeatureGrid.tsx`, replace the `MODULES` constant and the `title` default:

```tsx
const CAPABILITIES = [
  { label: '01 · Connect', title: 'Plugs into every system, read-only', body: '150+ connectors across warehouses, databases, SaaS apps, object stores and streams.', value: 'No migration and no engineering project — connected in an afternoon.' },
  { label: '02 · Graph', title: 'One map of your business across all systems', body: 'The same customer, order or contract recognised across every system you run.', value: 'Agents stop giving contradictory answers from three systems.' },
  { label: '03 · Topics', title: 'One agreed definition per business metric', body: 'Business domains defined once: canonical metrics, glossary, authoritative source.', value: '"Revenue" means the same thing to every agent, every time.' },
  { label: '04 · Ready', title: 'Cleans and scores your data for machine use', body: 'Cleaning, deduplication, typing, chunking, masking — measured by the Agent-Readiness Score.', value: 'Removes the 60–75% of agent project effort that goes to data prep.' },
  { label: '05 · Gateway', title: 'One governed door for every agent', body: 'A single endpoint with per-agent identity, least-privilege scopes and a full audit log.', value: 'Security signs off, because every agent query is identified and logged.' },
  { label: '06 · Flows', title: 'Ranks which agents to build, by payback', body: 'Datalith mines your own data for automation opportunities and generates deployable blueprints.', value: 'Turns a data cleanup budget into a revenue roadmap.' },
]
```

Then update the signature — note both the renamed constant and the new default title:

```tsx
export function FeatureGrid({ label = 'What you get', title = 'One platform. Six capabilities.', items = CAPABILITIES, columns = 3 }: FeatureGridProps) {
```

- [ ] **Step 4: Replace the Steps defaults**

In `design-system/src/components/Steps.tsx`, replace `DEFAULT_STEPS` and the `title` default:

```tsx
const DEFAULT_STEPS = [
  { title: 'Connect, read-only', body: 'Give Datalith scoped read-only credentials. It maps every database, warehouse, wiki and app you run. No migration, nothing written back.' },
  { title: 'One graph, scored', body: 'Datalith builds a single map of your business across all those systems, and scores how ready it is for agents — board-ready in 48 hours.' },
  { title: 'Serve to any agent', body: 'Your agents pull governed context through one endpoint, each with its own identity and a full audit log of every query.' },
]
```

```tsx
export function Steps({ label = 'How it works', title = 'Read-only credentials in. Governed context out.', steps = DEFAULT_STEPS }: StepsProps) {
```

- [ ] **Step 5: Replace the FAQ defaults**

In `design-system/src/components/FAQ.tsx`, replace `DEFAULT_ITEMS` entirely. The old "How is this different from a data catalog?" item is superseded by the new combined item:

```tsx
const DEFAULT_ITEMS = [
  { q: 'What exactly am I buying?', a: 'One platform with six capabilities: connection, the knowledge graph, business definitions, preparation and scoring, governed serving, and workflow recommendations. You pick a plan rather than buying capabilities à la carte — higher plans connect more sources, serve more agent traffic, and add deeper governance and workflow recommendations.' },
  { q: 'How is this different from a data catalog, or from Glean?', a: 'A catalog describes data for people to find. Glean answers employee questions. Datalith prepares data for machines and serves it to agents through a governed endpoint, with per-agent identity and a full audit trail.' },
  { q: 'Is access really read-only?', a: 'Yes. Datalith connects with scoped, read-only credentials; nothing writes back to your systems, and every read is logged in the audit trail.' },
  { q: 'What is the Agent-Readiness Score?', a: 'A 0–100 measure of how usable your data is for AI agents — how much of the estate is covered, how well it is defined, how well it is governed, and how fresh it is. Computed per business domain and estate-wide.' },
  { q: 'How long does the audit take?', a: '48 hours from credentials to a board-ready readout: your estate map, your score, and the top opportunities sleeping in your data.' },
]
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `cd design-system && npm test && npm run typecheck`
Expected: all PASS, typecheck clean.

- [ ] **Step 7: Commit**

```bash
git add design-system/src/components/FeatureGrid.tsx design-system/src/components/Steps.tsx design-system/src/components/FAQ.tsx design-system/src/test/sections2.test.tsx
git commit -m "feat(ds): plain-language defaults for capabilities, steps and FAQ"
```

---

### Task 3: Home page — hero, problem, how it works

**Files:**
- Modify: `design-system/site/pages/Home.tsx:45-101` (hero through the "two promises" section)

**Interfaces:**
- Consumes: `HeroProps.note` (Task 1); `Steps` defaults (Task 2).
- Produces: `#how` anchor on the home page, referenced by the hero's secondary CTA.

Page components have no unit-test harness in this repo — tests cover `src/components` only. Page tasks are verified by `npm run typecheck` plus a grep against the pre-rendered HTML from `npm run build:site`.

- [ ] **Step 1: Rewrite the Hero call**

Replace the `<Hero .../>` element (`Home.tsx:50-57`) with:

```tsx
        <Hero
          headline={'Make your enterprise data\nusable by AI agents.'}
          accent="Every source. One graph."
          lead="Datalith connects every database, warehouse, wiki and app your company runs into one governed knowledge graph — then serves it to any AI agent, with a full audit trail. Built for data and AI leaders at companies running dozens of disconnected systems."
          primaryCta={{ label: 'Get your free readiness score', href: '#audit' }}
          secondaryCta={{ label: 'see how it works', href: '#how' }}
          note="Free 48-hour Agent-Readiness Score. Read-only credentials, no migration."
          figure={<HeroFigure />}
        />
```

- [ ] **Step 2: Wrap the StatBand in a titled "problem" section**

Replace `<div data-reveal><StatBand /></div>` (`Home.tsx:81`) with:

```tsx
      <section className="st-section" id="problem">
        <div className="dl-wrap">
          <SectionLabel>The problem</SectionLabel>
          <h2 className="dl-h2">Most agent projects stall on the data, not the model.</h2>
          <p className="st-lead">
            Teams buy the model, pick the framework, then spend the next two quarters discovering
            their data isn&rsquo;t in a shape any agent can use.
          </p>
        </div>
        <div data-reveal><StatBand /></div>
      </section>
```

- [ ] **Step 3: Delete the "two promises" section and move How-it-works up**

Delete the entire `{/* the two promises */}` section (`Home.tsx:83-101`) and replace it with the Steps block, which currently sits at line 150:

```tsx
      <div id="how" data-reveal><Steps /></div>
```

Then delete the now-duplicated original line `<div id="method" data-reveal><Steps /></div>` further down the file.

Note: `Steps` needs no props — Task 2 set its defaults to exactly this copy.

- [ ] **Step 4: Check for orphaned references to the old anchor**

Run: `cd /Users/ghazigharsallah/data/AI_Data && grep -rn "#method" design-system/site/ website/`
Expected: zero hits in `design-system/site/`. If any exist, repoint them to `#how`. (Hits under `website/` are stale build output and will be regenerated.)

- [ ] **Step 5: Typecheck and build**

Run: `cd design-system && npm run typecheck && npm run build:site`
Expected: both succeed.

- [ ] **Step 6: Verify the rendered output**

```bash
cd /Users/ghazigharsallah/data/AI_Data
grep -c "usable by AI agents" website/index.html          # expect >= 1
grep -c "Most agent projects stall on the data" website/index.html  # expect 1
grep -c 'id="how"' website/index.html                     # expect 1
grep -c "two promises" website/index.html                 # expect 0
```

Expected: the first three print a non-zero count, the last prints `0`.

- [ ] **Step 7: Commit**

```bash
git add design-system/site/pages/Home.tsx website/
git commit -m "feat(site): plain hero, problem framing, how-it-works moved up"
```

---

### Task 4: Home page — capabilities, value, retitles, cost

**Files:**
- Modify: `design-system/site/pages/Home.tsx` (remainder of the page)

**Interfaces:**
- Consumes: `FeatureGrid` defaults with value lines (Task 2); `#how` section (Task 3).
- Produces: `#capabilities`, `#value`, `#cost` anchors.

- [ ] **Step 1: Replace the platform section with the capabilities section**

Replace the whole `<section id="platform" ...>` block (originally `Home.tsx:132-148`) with:

```tsx
      <section id="capabilities" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>What you get</SectionLabel>
          <h2 className="dl-h2">One platform. Six capabilities.</h2>
          <p className="st-lead">
            You pick a plan, not a shopping list of features. Higher plans connect more sources,
            serve more agent traffic, and add deeper governance and workflow recommendations.
          </p>
        </div>
        <div data-reveal>
          <FeatureGrid label="" title="" />
          <div className="dl-wrap st-more">
            <TextLink href="./platform.html">see each capability in depth</TextLink>
          </div>
        </div>
      </section>
```

`FeatureGrid` is passed empty `label`/`title` because the section above already carries them — the component only renders `title` when truthy, and `SectionLabel` renders an empty span harmlessly.

- [ ] **Step 2: Add the value section directly after it**

```tsx
      <section id="value" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>What it&rsquo;s worth</SectionLabel>
          <h2 className="dl-h2">The cost of data that isn&rsquo;t agent-ready.</h2>
          <div className="st-cols-3" data-reveal-group>
            <Stat
              value="$300–375K"
              label="of a $500K agent program goes to data preparation before a single agent works — 60–75% of project effort."
              source="Published industry benchmarks"
            />
            <Stat
              value=">40%"
              label="of agentic AI projects will be canceled by the end of 2027. Data readiness is the leading cause."
              source="Gartner"
            />
            <Stat
              value="Weeks, not quarters"
              label="to a first governed agent once the graph is live, because the preparation work is already done and scored."
              source="Datalith model"
            />
          </div>
          <p className="st-footnote">
            Illustrative model based on published industry benchmarks, not customer results.
            Datalith is pre-launch; the first design-partner cohort is open.
          </p>
        </div>
      </section>
```

Add `Stat` to the import from `'../../src/index'` at the top of the file.

- [ ] **Step 3: Retitle the knowledge-graph section**

In the `id="graph"` section, replace the `<h2>` and `<p className="st-lead">` with:

```tsx
          <h2 className="dl-h2">One customer. One record. Across every system.</h2>
          <p className="st-lead">
            Datalith doesn&rsquo;t just connect your sources — it works out which records in one
            system are the same thing as records in another. You can trace every fact back to the
            system it came from, and every agent inherits that map.
          </p>
```

The trailing `TextLink` ("how the graph is built", href `./platform.html#graph`) is unchanged.

Then, in the same section, replace the third `st-kg-statlabel` — it currently reads "relationships, lineage on every link", which violates the Home jargon ban:

```tsx
              <span className="st-kg-statlabel">relationships mapped, each traceable to its source</span>
```

- [ ] **Step 4: Move the dashboard into its own retitled section**

The `DashboardFigure` lost its home when the platform section was replaced in Step 1. Add it back as its own section, placed directly after the knowledge-graph section:

```tsx
      <section id="dashboard" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>The dashboard</SectionLabel>
          <h2 className="dl-h2">Your whole estate in one view.</h2>
          <p className="st-lead">
            What data you have and where it lives, what changed, which agents are using it, and
            what it&rsquo;s costing you — in a view your board can read.
          </p>
          <DashboardFigure />
        </div>
      </section>
```

- [ ] **Step 5: Rewrite the score section lead**

In the `id="score"` section, replace the `<p className="st-lead">` body with:

```tsx
          <p className="st-lead">
            The Agent-Readiness Score is a 0–100 measure of how usable your data is for AI agents —
            how much of your estate is covered, how well it&rsquo;s defined, how well it&rsquo;s
            governed, and how fresh it is. Free, in 48 hours, from read-only credentials.
          </p>
```

- [ ] **Step 6: Remove the MCP quote from Home**

Delete the entire `<Quote quote="MCP moves context. ..." />` block and remove `Quote` from the import list at the top of `Home.tsx` (it has no other use on this page).

- [ ] **Step 7: Add the cost section before the FAQ**

```tsx
      <section id="cost" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>What it costs</SectionLabel>
          <h2 className="dl-h2">Start free. Pay when the graph goes live.</h2>
          <div className="st-cols-3" data-reveal-group>
            <Card label="Free" title="Agent-Readiness Score">
              Your score, your estate map and your top-10 findings in 48 hours, across 3 sources.
              No commitment.
            </Card>
            <Card label="$2.5K / month" title="Growth">
              The graph live across 10 sources, with your first agents served through the gateway.
            </Card>
            <Card label="$6K / month → custom" title="Scale and Enterprise">
              Agent fleets in production, full governance, and deployment inside your own VPC.
            </Card>
          </div>
          <div className="st-more">
            <TextLink href="./pricing.html">see full pricing and what&rsquo;s in each plan</TextLink>
          </div>
        </div>
      </section>
```

- [ ] **Step 8: Fix the DashboardFigure aria-label**

`design-system/site/components/figures.tsx:258` describes the dashboard as having "module navigation" and an "ARS trend" — both violate the global constraints, and this figure renders on Home. Replace the `aria-label` value:

```tsx
    <figure className="st-dash" data-reveal aria-label="Datalith command dashboard: capability navigation, estate KPIs, source table with readiness scores, readiness-score trend, live agent audit feed, and recommended workflows">
```

This figure is also used on the Platform page; the same label serves both.

- [ ] **Step 9: Typecheck and build**

Run: `cd design-system && npm run typecheck && npm run build:site`
Expected: both succeed.

- [ ] **Step 10: Verify the rendered output**

```bash
cd /Users/ghazigharsallah/data/AI_Data
grep -c "One platform. Six capabilities." website/index.html                       # expect >= 1
grep -c "Illustrative model based on published industry benchmarks" website/index.html  # expect 1
grep -c "Start free. Pay when the graph goes live." website/index.html            # expect 1
grep -ci "monolith" website/index.html                                            # expect 0
grep -ci "ontology\|lineage\|semantic layer" website/index.html                    # expect 0
```

Expected: first three non-zero, last two `0`.

- [ ] **Step 11: Commit**

```bash
git add design-system/site/pages/Home.tsx design-system/site/components/figures.tsx website/
git commit -m "feat(site): capabilities, value and cost sections on home"
```

---

### Task 5: Platform page

**Files:**
- Modify: `design-system/site/pages/Platform.tsx`

**Interfaces:**
- Consumes: value copy defined in Task 2's `CAPABILITIES`.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Add a `value` field to the Module interface and every entry**

In the `Module` interface (`Platform.tsx:10-18`), add after `body`:

```tsx
  value: string
```

Then add to each of the six `MODULES` entries, matching Task 2 exactly:

```tsx
// 01 connect
value: 'No migration and no engineering project — connected in an afternoon.',
// 02 graph
value: 'Agents stop giving contradictory answers from three systems.',
// 03 topics
value: '"Revenue" means the same thing to every agent, every time.',
// 04 ready
value: 'Removes the 60–75% of agent project effort that goes to data prep.',
// 05 gateway
value: 'Security signs off, because every agent query is identified and logged.',
// 06 flows
value: 'Turns a data cleanup budget into a revenue roadmap.',
```

- [ ] **Step 2: Render the value line above the points list**

In the module `<article>` render, between `<p className="st-module-body">` and `<ul className="st-module-points">`:

```tsx
                <p className="dl-featuregrid-value">{m.value}</p>
```

This reuses the class added in Task 1, so no new CSS is needed.

- [ ] **Step 3: Rewrite the page intro**

Replace the `<PageIntro>` props:

```tsx
        label="The platform"
        title={'One platform.'}
        accent="Six capabilities."
        lead="Datalith sits between your data estate and your AI agents: it connects every system read-only, builds one map of your business, scores how ready that data is for agents, serves it through a single governed door, and tells you which agents are worth building next."
```

- [ ] **Step 4: Gloss MCP on first use and fix remaining "module" wording**

In the `gateway` module `body`, change the opening to:

```tsx
    body: 'One endpoint for the whole estate, speaking MCP — the standard protocol agents use to pull context. Per-agent identities, least-privilege scopes, row/column/chunk-level policy — and a full audit log of every agent query.',
```

Then replace the `topics` module `body`, which currently says "the layer whose absence kills 60% of MCP-only projects":

```tsx
    body: 'Business domains defined once, consistently: canonical metrics, glossary, authoritative sources and freshness targets. Gartner expects 60% of agent analytics projects without this layer to fail by 2028.',
```

Also change the label rendered above each module title from `{m.num} · {m.name}` — leave as is; "Datalith Connect" etc. are product capability names, not "modules".

- [ ] **Step 5: Add the MCP quote removed from Home**

Immediately before the `{/* security */}` section, add:

```tsx
      <div data-reveal>
        <Quote
          quote="MCP moves context. It doesn't produce it. Datalith is the layer that produces it."
          name="Datalith"
          role="Why this layer exists"
        />
      </div>
```

`Quote` is already imported on this page.

- [ ] **Step 6: Typecheck, build, verify**

```bash
cd design-system && npm run typecheck && npm run build:site
cd /Users/ghazigharsallah/data/AI_Data
grep -ci "monolith" website/platform.html        # expect 0
grep -c "Six capabilities." website/platform.html  # expect >= 1
grep -c "standard protocol agents use to pull context" website/platform.html  # expect 1
```

- [ ] **Step 7: Commit**

```bash
git add design-system/site/pages/Platform.tsx website/
git commit -m "feat(site): platform page reframed as one platform, six capabilities"
```

---

### Task 6: Pricing page — buyer-framed tiers and the capability matrix

**Files:**
- Modify: `design-system/site/pages/Pricing.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: nothing later tasks depend on.

`TIERS` is authoritative for what each plan includes. The matrix added below must stay consistent with it; if they ever disagree, correct the matrix, not `TIERS`.

- [ ] **Step 1: Rewrite each tier blurb as who it's for**

In `TIERS`, replace the four `blurb` values:

```tsx
// Audit
blurb: 'For teams who want to know where they stand before committing budget.',
// Growth
blurb: 'For teams putting their first agents into production.',
// Scale
blurb: 'For teams running agent fleets that security has to sign off on.',
// Enterprise
blurb: 'For regulated estates that need Datalith inside their own VPC.',
```

- [ ] **Step 2: Add the capability matrix constant**

Above the `Pricing` function, add:

```tsx
const MATRIX = [
  { k: 'Connect — sources', audit: '3', growth: '10', scale: '25', ent: 'Unlimited' },
  { k: 'Graph — knowledge graph', audit: 'One-time snapshot', growth: 'Live', scale: 'Live', ent: 'Live' },
  { k: 'Topics — metric definitions', audit: '—', growth: 'Included', scale: 'Included', ent: 'Custom' },
  { k: 'Ready — readiness score', audit: 'One-time report', growth: 'Continuous', scale: 'Continuous', ent: 'Continuous' },
  { k: 'Gateway — agent calls', audit: '—', growth: '100K / mo', scale: 'Metered', ent: 'Metered' },
  { k: 'Flows — workflow recommendations', audit: 'Top-10 findings', growth: '—', scale: 'Included', ent: 'Included' },
  { k: 'Governance', audit: '—', growth: 'Audit log', scale: 'RBAC + audit log', ent: 'SSO/SCIM · custom policy' },
  { k: 'Deployment', audit: 'SaaS', growth: 'SaaS', scale: 'SaaS', ent: 'In-VPC / self-hosted' },
]
```

- [ ] **Step 3: Render the matrix directly beneath the PricingTable**

After the `<div data-reveal><PricingTable ... /></div>` block:

```tsx
      <section className="st-section st-section--rule" id="whats-included">
        <div className="dl-wrap">
          <SectionLabel>What&rsquo;s included</SectionLabel>
          <h2 className="dl-h2">What each plan includes.</h2>
          <p className="st-lead">
            You don&rsquo;t buy capabilities à la carte — you pick a plan. Higher plans connect more
            sources, serve more agent traffic, and add deeper governance and workflow recommendations.
          </p>
          <div className="st-table-wrap" data-reveal>
            <table className="st-table">
              <thead>
                <tr>
                  <th scope="col">Capability</th>
                  <th scope="col">Audit</th>
                  <th scope="col">Growth</th>
                  <th scope="col">Scale</th>
                  <th scope="col">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map(r => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    <td>{r.audit}</td>
                    <td>{r.growth}</td>
                    <td>{r.scale}</td>
                    <td>{r.ent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
```

- [ ] **Step 4: Add the FAQ item**

Prepend to `PRICING_FAQ`:

```tsx
  { q: 'Do I have to buy the capabilities separately?', a: 'No — there is no à la carte menu, you pick a plan. Growth runs the graph live and serves your agents; Scale adds workflow recommendations and role-based access; Enterprise adds in-VPC deployment and custom policy.' },
```

- [ ] **Step 5: Typecheck, build, verify**

```bash
cd design-system && npm run typecheck && npm run build:site
cd /Users/ghazigharsallah/data/AI_Data
grep -c "What each plan includes." website/pricing.html  # expect 1
grep -c "Do I have to buy the capabilities separately?" website/pricing.html  # expect 1
```

- [ ] **Step 6: Commit**

```bash
git add design-system/site/pages/Pricing.tsx website/
git commit -m "feat(site): buyer-framed tiers and capability matrix on pricing"
```

---

### Task 7: Investors alignment and page meta descriptions

**Files:**
- Modify: `design-system/site/pages/Investors.tsx:44`
- Modify: `design-system/site/pages/index.ts`

**Interfaces:**
- Consumes: the plain definition sentence established in Task 3.
- Produces: nothing later tasks depend on.

`Company.tsx` needs no change — audited 2026-07-25, it contains no "module" or "monolith" strings.

- [ ] **Step 1: Align the Investors lead**

Replace the `PageIntro` `lead` (`Investors.tsx:44`):

```tsx
        lead="Datalith connects every database, warehouse, wiki and app an enterprise runs into one governed knowledge graph — then serves it to any AI agent, with a full audit trail. Every company that adopted agents in 2025–2026 is hitting the same bottleneck: not the model, not the framework — the data. We land with a free readiness score and price on the agent wave itself."
```

- [ ] **Step 2: Rewrite the meta descriptions**

In `design-system/site/pages/index.ts`, replace the `description` for `index` and `platform`:

```ts
// index
description: 'Datalith connects every database, warehouse, wiki and app your company runs into one governed knowledge graph — then serves it to any AI agent, with a full audit trail. Free 48-hour Agent-Readiness Score.',
// platform
description: 'One platform, six capabilities: Connect, Graph, Topics, Ready, Gateway, Flows — from 150+ read-only connectors to governed serving with a full audit trail.',
```

Leave `pricing`, `company`, `investors` and `404` descriptions unchanged.

- [ ] **Step 3: Typecheck, build, verify**

```bash
cd design-system && npm run typecheck && npm run build:site
cd /Users/ghazigharsallah/data/AI_Data
grep -c "One platform, six capabilities" website/platform.html   # expect >= 1
grep -ci "monolith" website/*.html                                # expect 0 on every file
```

- [ ] **Step 4: Commit**

```bash
git add design-system/site/pages/Investors.tsx design-system/site/pages/index.ts website/
git commit -m "feat(site): align investors lead and page meta descriptions"
```

---

### Task 8: Full-site verification

**Files:**
- Modify: `README.md` (only if the verification below finds stale product framing)

**Interfaces:**
- Consumes: everything.
- Produces: a verified build.

- [ ] **Step 1: Clean rebuild and full test run**

```bash
cd design-system && npm test && npm run typecheck && npm run build:site
```

Expected: tests PASS, typecheck clean, build succeeds.

- [ ] **Step 2: Run the banned-terminology sweep**

```bash
cd /Users/ghazigharsallah/data/AI_Data
echo "--- monolith (expect 0) ---";        grep -ric "monolith" website/*.html
echo "--- two promises (expect 0) ---";    grep -ric "two promises" website/*.html
echo "--- jargon on home (expect 0) ---";  grep -ci "ontology\|lineage\|semantic layer" website/index.html
echo "--- disclaimer (expect 1) ---";      grep -c "not customer results" website/index.html
```

Expected: every count is `0` except the disclaimer, which is `1`.

The word "module" is expected to survive only where it refers to something other than a Datalith product. Check each hit:

```bash
grep -in "module" website/*.html
```

Expected: zero hits. If any appear, rewrite them to "capability".

- [ ] **Step 3: Confirm the home page answers the six buyer questions**

Open `website/index.html` in a browser and confirm, reading top to bottom and stopping at the value section, that all six are answered:

1. What is it? — plain-language hero
2. Who is it for? — "data and AI leaders at companies running dozens of disconnected systems"
3. What do I buy? — "One platform. Six capabilities.", with what each plan includes stated accurately
4. What is it worth? — the value section
5. What does it cost? — the cost section
6. What is the first step? — free 48-hour score

Also resize to ~375px width and confirm no section overflows horizontally — pay particular attention to the new pricing matrix, which relies on `.st-table-wrap`'s `overflow-x: auto`.

- [ ] **Step 4: Update the README product section if it now contradicts the site**

Read `README.md:41-50`. It currently says "The product (six modules)". Change the heading to "The product (one platform, six capabilities)" and adjust the `Datalith Ready` line so ARS is described the same way as on the site. Leave the rest of the README alone.

- [ ] **Step 5: Commit**

```bash
git add README.md website/
git commit -m "chore: verify clarity rewrite and align README product framing"
```

---

## Self-Review

**Spec coverage** — every spec section maps to a task:

| Spec section | Task |
|---|---|
| §1 message architecture, terminology table | Global Constraints + Tasks 2–7 |
| §2.1 hero | Task 3 Step 1 |
| §2.2 the problem | Task 3 Step 2 |
| §2.3 how it works | Task 2 Step 4 + Task 3 Step 3 |
| §2.4 six capabilities with value lines | Task 2 Step 3 + Task 4 Step 1 |
| §2.5 value section + mandatory disclaimer | Task 4 Step 2 |
| §2.6 retitled sections (graph, dashboard, score) | Task 4 Steps 3–5 |
| §2.7 what it costs | Task 4 Step 7 |
| §2.8 FAQ additions | Task 2 Step 5 |
| §2 remove MCP quote from Home | Task 4 Step 6, re-added on Platform in Task 5 Step 5 |
| §3 Platform page | Task 5 |
| §4 Pricing page + matrix | Task 6 |
| §5 Investors / Company | Task 7 (Company: no change needed, audited) |
| §6 components changed | Tasks 1–2 |
| §7 verification | Tasks 3–7 per-task greps + Task 8 |
| §8 success criteria | Task 8 Step 3 |

**Placeholder scan:** no TBDs, no "similar to Task N", no "add error handling". Every code step carries literal code.

**Type consistency:** `HeroProps.note?: string` (Task 1) is consumed in Task 3 Step 1. `FeatureGridProps` item `value?: string` (Task 1) is populated by `CAPABILITIES` (Task 2) and consumed by `<FeatureGrid />` (Task 4 Step 1). `Module.value: string` (Task 5 Step 1) is required, not optional, and all six entries supply it. The `.dl-featuregrid-value` class is defined once in Task 1 and reused by Task 5 Step 2. `CAPABILITIES` replaces the old `MODULES` constant name in `FeatureGrid.tsx` and the function signature is updated in the same step.

**One gap found and closed during review:** Task 4 Step 1 replaces the `id="platform"` section that contained `DashboardFigure`, which would have silently dropped the dashboard from the home page. Task 4 Step 4 re-adds it as its own section, matching spec §2.6.

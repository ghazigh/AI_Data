# Datalith Demo Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a self-serve, clickable mockup of the Datalith platform at `/demo/` — seven screens populated with one fictional insurer's estate, backed by static data and no server.

**Architecture:** A new `design-system/demo/` source tree beside `site/`. `scripts/build-demo.mjs` renders every screen with `renderToStaticMarkup` into its own real HTML file under `website/demo/`, and emits a browser bundle that hydrates and takes over navigation via `pushState`. Deep links and refreshes work with no server config; JS-off still renders a complete screen.

**Tech Stack:** React 18 (SSR + hydration), esbuild 0.27, TypeScript 5.5 strict, Vitest 2 + Testing Library (jsdom), Playwright-core for screenshot review. No new runtime dependencies — no router library, no state library, no charting library.

## Global Constraints

- **Package root is `design-system/`.** Every `npm` command in this plan runs from `/Users/ghazigharsallah/data/AI_Data/design-system`.
- **No new dependencies.** React, react-dom, esbuild, vitest, @testing-library/react and playwright-core are already installed. Adding anything else is out of scope.
- **No `Math.random()` anywhere in `demo/`.** A test enforces this.
- **No live clock in data.** Timestamps are fixed display strings (`'14 min ago'`). No `Date.now()`, no `new Date()` in `demo/data/` or in any component render path. Both rules exist so SSR and client markup match exactly.
- **Graph node positions are precomputed literals.** No physics simulation at runtime.
- **Design tokens come from `src/tokens.css`.** Never redeclare a colour, font or spacing value; use the CSS custom properties. App-specific CSS lives in `demo/demo.css`.
- **Class prefix is `dm-`** for all demo components, so demo CSS can never collide with the marketing site's `dl-` and `st-` prefixes.
- **Zero border-radius except pills** (`var(--dl-radius-pill)`), matching the marketing site.
- **Stage numbering `01`–`05` is reserved for the five product stages.** Never number anything else — domains, red flags, use cases and audit rows are sets, not sequences.
- **Desktop only.** `min-width: 1280px` on the shell; below that the page scrolls horizontally. No responsive breakpoints.
- **Copy rules:** sentence case for all UI text. Buttons name the action that happens (`Connect source`, not `Submit`). The action keeps its name through the flow.
- **Accessibility floor:** visible keyboard focus everywhere; drawers trap focus and close on Escape; real `<table>`/`<th scope>` semantics; `prefers-reduced-motion` respected.
- **Commit after every task.** Conventional commit prefixes (`feat:`, `test:`, `chore:`).

## The data canon

These numbers are load-bearing — screens cross-reference them and Task 15 asserts they agree. Copy them exactly.

**Tenant:** Meridian Assurance, multinational property & casualty insurer. Viewer: Amara Diallo, Chief Data Officer.

**Estate headline:** 34 sources connected · 4 awaiting read-only credentials · Agent-Readiness Score **71 / 100** (up 6 since last quarter) · 2.4M entities resolved · 1.9M relationships mapped · 8 knowledge bases · 184K agent calls in 30 days, 3 denied by policy.

**The eight domains.** `weight` is the count of connected sources whose `primaryDomain` is that domain. The weights sum to exactly 34, and the source-weighted mean rounds to 71.

| Domain key | Name | Score | Weight |
|---|---|---|---|
| `claims` | Claims | 78 | 8 |
| `policies` | Policies | 84 | 4 |
| `support` | Support | 76 | 4 |
| `contracts` | Contracts | 68 | 4 |
| `broker-network` | Broker network | 61 | 4 |
| `underwriting` | Underwriting | 55 | 4 |
| `reinsurance` | Reinsurance | 73 | 3 |
| `compliance` | Compliance | 64 | 3 |

Check: `(78·8 + 84·4 + 76·4 + 68·4 + 61·4 + 55·4 + 73·3 + 64·3) / 34 = 2411 / 34 = 70.91 → 71`.

**The 34 connected sources**, grouped by `primaryDomain`:

- **claims (8):** Guidewire ClaimCenter, Zendesk Claims Queue, Genesys Claim Calls, S3 Claim Photography, Snowflake `CLAIMS_MART`, Postgres `claims-intake`, Jira Claims Ops, Azure Blob FNOL Documents
- **policies (4):** Guidewire PolicyCenter, Duck Creek Policy, Snowflake `POLICY_MART`, SQL Server `legacy-policy`
- **support (4):** Zendesk Support, Confluence Support KB, Genesys Support Voice, MongoDB `chat-sessions`
- **contracts (4):** SharePoint Contracts, Box Legal, Google Drive Broker Agreements, S3 Signed PDFs
- **broker-network (4):** Salesforce, SAP Commissions, Exchange Broker Mail, BigQuery `broker_perf`
- **underwriting (4):** SharePoint Underwriting Files, Outlook Underwriting Mail, Databricks `uw_models`, Postgres `uw-workbench`
- **reinsurance (3):** S3 Bordereaux, Snowflake `RE_TREATY`, SharePoint Treaty Docs
- **compliance (3):** SharePoint Compliance, Exchange Compliance Archive, Kafka `audit-events`

**The 4 pending sources** (status `pending-credentials`, excluded from the weighting): Workday HR, ServiceNow, Oracle Financials, Slack.

**Pipeline plan counts:** 41,208 duplicate records to resolve · 380 columns to type · 12 columns to mask · 22,470 documents to chunk.

**Use cases:** 14 total, 5 blocked. Named: Claims triage copilot ($2.1M/yr, `ready`), Reinsurance treaty reader ($880K/yr, `in-review`), Broker follow-up agent ($640K/yr, `blocked` on `broker-network`).

## File structure

```
design-system/
  demo/
    routes.ts                 route table — the single source of truth for screens
    DemoApp.tsx               shell + screen switch, shared by SSR and client
    client.tsx                browser entry: hydrate + install the router
    router.ts                 pushState navigation, no dependencies
    state.tsx                 DemoStateProvider + useDemoState
    demo.css                  all dm- styles
    data/
      types.ts                shared types, no values
      tenant.ts               tenant, estate headline, the 8 domains
      sources.ts              the 34 connected + 4 pending sources, connector catalogue
      activity.ts             estate activity stream
      readiness.ts            dimensions, quarterly trend, red flags
      pipelines.ts            plan steps, live run, run history
      graph.ts                nodes with precomputed positions, edges, identity resolution
      useCases.ts             the 14 opportunities
      governance.ts           agents, policies, audit log
    components/
      AppShell.tsx  Rail.tsx  TopBar.tsx  StageStrip.tsx
      Panel.tsx  StatTile.tsx  DataTable.tsx  Drawer.tsx  FilterBar.tsx  StatusPill.tsx
      charts/ ScoreMeter.tsx  TrendLine.tsx  DomainBars.tsx  DimensionRadar.tsx
      GraphCanvas.tsx  AuditStream.tsx
    screens/
      Overview.tsx  Connect.tsx  Ready.tsx  Pipelines.tsx  Graph.tsx  UseCases.tsx  Governance.tsx
    test/
      routes.test.ts  shell.test.tsx  primitives.test.tsx  charts.test.tsx
      screens.test.tsx  hydration.test.tsx  integrity.test.ts
  scripts/build-demo.mjs      SSR every route to its own file + emit assets
```

---

### Task 1: Route table, types and tenant data

**Files:**
- Create: `design-system/demo/routes.ts`
- Create: `design-system/demo/data/types.ts`
- Create: `design-system/demo/data/tenant.ts`
- Modify: `design-system/tsconfig.json` (add `"demo"` to `include`)
- Test: `design-system/demo/test/routes.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `ROUTES: DemoRoute[]`, `routeForPath(path: string): DemoRoute | undefined`, `TENANT`, `DOMAINS: Domain[]`, `ESTATE`, and every type in `data/types.ts`.

- [ ] **Step 1: Add `demo` to the TypeScript project**

In `design-system/tsconfig.json`, change the `include` line to:

```json
  "include": ["src", "site", "demo"]
```

- [ ] **Step 2: Write `demo/data/types.ts`**

```ts
export type Modality = 'tables' | 'documents' | 'tickets' | 'email' | 'transcripts' | 'images' | 'streams'
export type SourceCategory = 'warehouse' | 'oltp' | 'saas' | 'object-store' | 'stream'
export type SourceStatus = 'connected' | 'scanning' | 'pending-credentials'

export type DomainKey =
  | 'claims' | 'policies' | 'support' | 'contracts'
  | 'broker-network' | 'underwriting' | 'reinsurance' | 'compliance'

export interface Domain {
  key: DomainKey
  name: string
  /** Agent-Readiness Score 0–100. */
  score: number
}

export interface Source {
  id: string
  name: string
  vendor: string
  category: SourceCategory
  modalities: Modality[]
  /** Record count as a number so tables can sort; formatted at render time. */
  records: number
  /** Fixed display string — never computed from a clock. */
  lastSync: string
  /** Per-source Agent-Readiness Score 0–100. */
  readiness: number
  /** The domain this source is weighted into. Exactly one. */
  primaryDomain: DomainKey
  /** Every domain this source feeds, including the primary. */
  domains: DomainKey[]
  status: SourceStatus
}

export interface Estate {
  score: number
  scoreDelta: number
  sourcesConnected: number
  sourcesPending: number
  entitiesResolved: string
  relationshipsMapped: string
  knowledgeBases: number
  agentCalls: string
  agentCallsDenied: number
}
```

- [ ] **Step 3: Write `demo/data/tenant.ts`**

```ts
import type { Domain, Estate } from './types'

export const TENANT = {
  name: 'Meridian Assurance',
  scope: 'Global',
  viewer: { name: 'Amara Diallo', role: 'Chief data officer' },
} as const

export const ESTATE: Estate = {
  score: 71,
  scoreDelta: 6,
  sourcesConnected: 34,
  sourcesPending: 4,
  entitiesResolved: '2.4M',
  relationshipsMapped: '1.9M',
  knowledgeBases: 8,
  agentCalls: '184K',
  agentCallsDenied: 3,
}

export const DOMAINS: Domain[] = [
  { key: 'policies', name: 'Policies', score: 84 },
  { key: 'claims', name: 'Claims', score: 78 },
  { key: 'support', name: 'Support', score: 76 },
  { key: 'reinsurance', name: 'Reinsurance', score: 73 },
  { key: 'contracts', name: 'Contracts', score: 68 },
  { key: 'compliance', name: 'Compliance', score: 64 },
  { key: 'broker-network', name: 'Broker network', score: 61 },
  { key: 'underwriting', name: 'Underwriting', score: 55 },
]

export const domainByKey = (key: string): Domain | undefined =>
  DOMAINS.find(d => d.key === key)
```

- [ ] **Step 4: Write the failing test**

Create `design-system/demo/test/routes.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { ROUTES, routeForPath } from '../routes'
import { DOMAINS, ESTATE, TENANT } from '../data/tenant'

describe('routes', () => {
  it('defines the seven screens', () => {
    expect(ROUTES.map(r => r.slug)).toEqual([
      '', 'connect', 'ready', 'pipelines', 'graph', 'use-cases', 'governance',
    ])
  })

  it('gives every route a title and a component', () => {
    for (const r of ROUTES) {
      expect(r.title.length).toBeGreaterThan(0)
      expect(typeof r.Component).toBe('function')
    }
  })

  it('numbers only the five product stages', () => {
    const numbered = ROUTES.filter(r => r.stage !== undefined)
    expect(numbered.map(r => r.stage)).toEqual(['01', '02', '03', '04', '05'])
  })

  it('resolves a path to its route', () => {
    expect(routeForPath('/demo/')?.slug).toBe('')
    expect(routeForPath('/demo/graph/')?.slug).toBe('graph')
    expect(routeForPath('/demo/graph')?.slug).toBe('graph')
  })

  it('returns undefined for an unknown path', () => {
    expect(routeForPath('/demo/nope/')).toBeUndefined()
  })
})

describe('tenant data', () => {
  it('names the eight knowledge bases', () => {
    expect(DOMAINS).toHaveLength(ESTATE.knowledgeBases)
  })

  it('keeps every domain score in range', () => {
    for (const d of DOMAINS) {
      expect(d.score).toBeGreaterThan(0)
      expect(d.score).toBeLessThanOrEqual(100)
    }
  })

  it('identifies the viewer', () => {
    expect(TENANT.viewer.name).toBe('Amara Diallo')
  })
})
```

- [ ] **Step 5: Run the test and watch it fail**

Run: `npm test -- demo/test/routes.test.ts`
Expected: FAIL — `Failed to resolve import "../routes"`.

- [ ] **Step 6: Write `demo/routes.ts`**

The seven screen components do not exist yet, so this task stubs them inline and Tasks 7–14 replace each stub with a real screen. Every stub is a function component so `typeof r.Component === 'function'` holds.

```tsx
import type { ComponentType } from 'react'

export interface DemoRoute {
  /** Path segment under /demo/. The Overview screen is the empty string. */
  slug: string
  /** Browser title and TopBar breadcrumb leaf. */
  title: string
  /** Product stage number, set only on the five pipeline stages. */
  stage?: '01' | '02' | '03' | '04' | '05'
  Component: ComponentType
}

const Stub = (name: string) => {
  const S = () => <div data-stub={name} />
  S.displayName = `Stub(${name})`
  return S
}

export const ROUTES: DemoRoute[] = [
  { slug: '', title: 'Estate overview', Component: Stub('Overview') },
  { slug: 'connect', title: 'Connect', stage: '01', Component: Stub('Connect') },
  { slug: 'ready', title: 'Ready', stage: '02', Component: Stub('Ready') },
  { slug: 'pipelines', title: 'Pipelines', stage: '03', Component: Stub('Pipelines') },
  { slug: 'graph', title: 'Graph', stage: '04', Component: Stub('Graph') },
  { slug: 'use-cases', title: 'Use cases', stage: '05', Component: Stub('UseCases') },
  { slug: 'governance', title: 'Governance & audit', Component: Stub('Governance') },
]

/** Base path the demo is served under, relative to the site root. */
export const DEMO_BASE = '/demo/'

/** Href for a route, as written into markup. Depth-relative, set by the build. */
export const hrefFor = (slug: string, prefix: string): string =>
  slug === '' ? `${prefix}index.html` : `${prefix}${slug}/`

/**
 * Resolve a browser pathname to a route. Tolerates a missing trailing slash and
 * any deployment prefix (the site is served under /AI_Data/ on GitHub Pages).
 */
export function routeForPath(pathname: string): DemoRoute | undefined {
  const i = pathname.indexOf(DEMO_BASE)
  if (i === -1) return undefined
  const rest = pathname.slice(i + DEMO_BASE.length).replace(/index\.html$/, '')
  const slug = rest.replace(/^\/+|\/+$/g, '')
  return ROUTES.find(r => r.slug === slug)
}
```

- [ ] **Step 7: Run the test and watch it pass**

Run: `npm test -- demo/test/routes.test.ts`
Expected: PASS, 8 tests.

- [ ] **Step 8: Typecheck**

Run: `npm run typecheck`
Expected: no output, exit 0.

- [ ] **Step 9: Commit**

```bash
git add design-system/tsconfig.json design-system/demo/
git commit -m "feat(demo): route table, data types and tenant canon"
```

---

### Task 2: App shell — Rail, TopBar, StageStrip, AppShell

**Files:**
- Create: `design-system/demo/components/Rail.tsx`
- Create: `design-system/demo/components/TopBar.tsx`
- Create: `design-system/demo/components/StageStrip.tsx`
- Create: `design-system/demo/components/AppShell.tsx`
- Create: `design-system/demo/demo.css`
- Test: `design-system/demo/test/shell.test.tsx`

**Interfaces:**
- Consumes: `ROUTES`, `hrefFor`, `DemoRoute` from Task 1; `TENANT`, `ESTATE`, `DOMAINS` from Task 1.
- Produces: `<AppShell current={slug} prefix={string}>{children}</AppShell>`, `<StageStrip prefix={string} />`, `<Rail current prefix />`, `<TopBar route prefix />`.

`prefix` is the depth-relative path back to `/demo/` — `''` for the Overview screen at `demo/index.html`, `'../'` for every nested screen at `demo/<slug>/index.html`. It threads through every link so the build never writes an absolute URL.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/shell.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { AppShell } from '../components/AppShell'
import { ROUTES } from '../routes'

const shell = (current = '') =>
  render(<AppShell current={current} prefix=""><p>content</p></AppShell>)

describe('AppShell', () => {
  it('renders its children', () => {
    shell()
    expect(screen.getByText('content')).toBeDefined()
  })

  it('links every route in the rail', () => {
    shell()
    const rail = screen.getByRole('navigation', { name: 'Demo screens' })
    for (const r of ROUTES) {
      expect(within(rail).getByRole('link', { name: new RegExp(r.title, 'i') })).toBeDefined()
    }
  })

  it('marks the current screen', () => {
    shell('graph')
    const link = screen.getByRole('link', { name: /graph/i })
    expect(link.getAttribute('aria-current')).toBe('page')
  })

  it('groups the five stages under a pipeline heading', () => {
    shell()
    expect(screen.getByText('The pipeline')).toBeDefined()
    expect(screen.getByText('01')).toBeDefined()
    expect(screen.getByText('05')).toBeDefined()
  })

  it('names the tenant and the viewer', () => {
    shell()
    expect(screen.getAllByText(/Meridian Assurance/).length).toBeGreaterThan(0)
    expect(screen.getByText('Amara Diallo')).toBeDefined()
  })

  it('marks the workspace as sample data', () => {
    shell()
    expect(screen.getByText(/sample data/i)).toBeDefined()
  })

  it('prefixes nested links so no href is absolute', () => {
    render(<AppShell current="graph" prefix="../"><p>c</p></AppShell>)
    const link = screen.getByRole('link', { name: /use cases/i })
    expect(link.getAttribute('href')).toBe('../use-cases/')
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/shell.test.tsx`
Expected: FAIL — cannot resolve `../components/AppShell`.

- [ ] **Step 3: Write `demo/components/Rail.tsx`**

```tsx
import { ROUTES, hrefFor } from '../routes'
import { TENANT } from '../data/tenant'

export interface RailProps { current: string; prefix: string }

const MARK = (
  <svg width="26" height="19" viewBox="0 0 28 20" fill="none" aria-hidden="true">
    <path d="M0 3 C8 3, 10 10, 16 10" stroke="currentColor" strokeWidth="1.4" />
    <path d="M0 10 L16 10" stroke="currentColor" strokeWidth="1.4" />
    <path d="M0 17 C8 17, 10 10, 16 10" stroke="currentColor" strokeWidth="1.4" />
    <path d="M16 10 L28 10" stroke="var(--dl-blue-bright)" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

function RailLink({ route, current, prefix }: { route: typeof ROUTES[number]; current: string; prefix: string }) {
  const on = route.slug === current
  return (
    <li>
      <a
        className={`dm-rail-link${on ? ' is-on' : ''}`}
        href={hrefFor(route.slug, prefix)}
        aria-current={on ? 'page' : undefined}
        data-demo-link
      >
        <span className="dm-rail-ix" aria-hidden="true">{route.stage ?? '◇'}</span>
        <span>{route.title}</span>
      </a>
    </li>
  )
}

export function Rail({ current, prefix }: RailProps) {
  const overview = ROUTES[0]
  const stages = ROUTES.filter(r => r.stage)
  const control = ROUTES.filter(r => !r.stage && r.slug !== '')

  return (
    <aside className="dm-rail">
      <a className="dm-rail-logo" href={hrefFor('', prefix)} data-demo-link>
        {MARK}<span>datalith</span>
      </a>
      <span className="dm-demo-tag">Demo · sample data</span>

      <nav aria-label="Demo screens">
        <ul className="dm-rail-group">
          <RailLink route={overview} current={current} prefix={prefix} />
        </ul>
        <p className="dm-rail-heading">The pipeline</p>
        <ul className="dm-rail-group">
          {stages.map(r => <RailLink key={r.slug} route={r} current={current} prefix={prefix} />)}
        </ul>
        <p className="dm-rail-heading">Control</p>
        <ul className="dm-rail-group">
          {control.map(r => <RailLink key={r.slug} route={r} current={current} prefix={prefix} />)}
        </ul>
      </nav>

      <div className="dm-rail-foot">
        <a className="dm-rail-cta" href={`${prefix}../index.html#audit`}>Start your free audit</a>
        <p className="dm-rail-who">{TENANT.viewer.name}</p>
        <p className="dm-rail-role">{TENANT.viewer.role}</p>
      </div>
    </aside>
  )
}
```

- [ ] **Step 4: Write `demo/components/TopBar.tsx`**

```tsx
import type { DemoRoute } from '../routes'
import { TENANT } from '../data/tenant'
import { ESTATE } from '../data/tenant'

export interface TopBarProps { route: DemoRoute }

export function TopBar({ route }: TopBarProps) {
  return (
    <div className="dm-topbar">
      <p className="dm-crumb">
        {TENANT.name} / <b>{route.title}</b>
      </p>
      <div className="dm-search" role="search">
        <span>Search the estate…</span>
        <kbd>⌘K</kbd>
      </div>
      <p className="dm-chip">Readiness <b>{ESTATE.score}</b></p>
    </div>
  )
}
```

- [ ] **Step 5: Write `demo/components/StageStrip.tsx`**

```tsx
import { ROUTES, hrefFor } from '../routes'

const STATUS: Record<string, { text: string; tone: 'ok' | 'warn' }> = {
  connect: { text: '34 sources live', tone: 'ok' },
  ready: { text: 'Scored 71 / 100', tone: 'ok' },
  pipelines: { text: '2 runs queued', tone: 'warn' },
  graph: { text: '2.4M entities', tone: 'ok' },
  'use-cases': { text: '14 found · 5 blocked', tone: 'warn' },
}

export function StageStrip({ prefix }: { prefix: string }) {
  return (
    <ol className="dm-stagestrip" aria-label="Product stages">
      {ROUTES.filter(r => r.stage).map(r => {
        const s = STATUS[r.slug]
        return (
          <li key={r.slug}>
            <a className="dm-stage" href={hrefFor(r.slug, prefix)} data-demo-link>
              <span className="dm-stage-ix">{r.stage}</span>
              <span>
                <span className="dm-stage-nm">{r.title}</span>
                <span className={`dm-stage-st is-${s.tone}`}>{s.text}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}
```

- [ ] **Step 6: Write `demo/components/AppShell.tsx`**

```tsx
import type { ReactNode } from 'react'
import { Rail } from './Rail'
import { TopBar } from './TopBar'
import { ROUTES } from '../routes'

export interface AppShellProps { current: string; prefix: string; children: ReactNode }

export function AppShell({ current, prefix, children }: AppShellProps) {
  const route = ROUTES.find(r => r.slug === current) ?? ROUTES[0]
  return (
    <div className="dm-root">
      <Rail current={current} prefix={prefix} />
      <div className="dm-main">
        <TopBar route={route} />
        <main className="dm-content" id="dm-content">{children}</main>
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Write `demo/demo.css`**

Start the file with the shell rules only; later tasks append their own sections. Every value references a token.

```css
/* ===== demo shell ===== */
.dm-root { display: flex; min-width: 1280px; min-height: 100vh; background: var(--dl-canvas); color: var(--dl-ink); font-family: var(--dl-font-body); }
.dm-root *, .dm-root *::before, .dm-root *::after { box-sizing: border-box; }
.dm-root ul, .dm-root ol { list-style: none; margin: 0; padding: 0; }
.dm-root :where(a) { color: inherit; text-decoration: none; }
.dm-root :where(h1, h2, h3, p) { margin: 0; }
.dm-root :is(a, button, input, summary):focus-visible { outline: 2px solid var(--dl-blue); outline-offset: 2px; }

.dm-rail { width: 236px; flex: none; display: flex; flex-direction: column; padding: var(--dl-space-5) 0 var(--dl-space-4); background: var(--dl-ink); color: var(--dl-on-ink); }
.dm-rail :is(a, button):focus-visible { outline-color: var(--dl-blue-bright); }
.dm-rail-logo { display: inline-flex; align-items: center; gap: 8px; padding: 0 20px; font-family: var(--dl-font-display); font-weight: 700; font-size: 17px; letter-spacing: -0.02em; }
.dm-demo-tag { display: block; margin: 12px 20px 0; padding: 4px 10px; align-self: flex-start; border-radius: var(--dl-radius-pill); background: #26262C; color: var(--dl-on-ink-muted); font-family: var(--dl-font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; }
.dm-rail-heading { padding: var(--dl-space-5) 20px 9px; font-family: var(--dl-font-mono); font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: #5C5C66; }
.dm-rail-group { margin-top: var(--dl-space-4); }
.dm-rail-link { display: grid; grid-template-columns: 24px 1fr; align-items: center; gap: 8px; padding: 8px 20px; font-size: 13px; color: #B9B9C0; transition: color var(--dl-ease), background var(--dl-ease); }
.dm-rail-link:hover { color: #fff; }
.dm-rail-ix { font-family: var(--dl-font-mono); font-size: 10px; color: #5C5C66; }
.dm-rail-link.is-on { color: #fff; background: var(--dl-ink-2); box-shadow: inset 3px 0 0 var(--dl-blue-bright); }
.dm-rail-link.is-on .dm-rail-ix { color: var(--dl-blue-bright); }
.dm-rail-foot { margin-top: auto; padding: var(--dl-space-4) 20px 0; border-top: var(--dl-hairline-ink); }
.dm-rail-cta { display: block; margin-bottom: var(--dl-space-4); padding: 9px 0; text-align: center; border-radius: var(--dl-radius-pill); background: var(--dl-blue-bright); color: #fff; font-size: 12.5px; font-weight: 600; }
.dm-rail-who { font-size: 12px; }
.dm-rail-role { margin-top: 3px; font-family: var(--dl-font-mono); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dl-on-ink-muted); }

.dm-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.dm-topbar { height: 54px; flex: none; display: flex; align-items: center; justify-content: space-between; gap: var(--dl-space-5); padding: 0 28px; border-bottom: var(--dl-hairline); }
.dm-crumb { font-family: var(--dl-font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dl-grey-3); }
.dm-crumb b { font-weight: 500; color: var(--dl-ink); }
.dm-search { display: flex; justify-content: space-between; width: 300px; padding: 7px 14px; border: var(--dl-hairline); background: var(--dl-paper); font-size: 12px; color: var(--dl-grey-3); }
.dm-search kbd { font-family: var(--dl-font-mono); font-size: 11px; }
.dm-chip { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border: var(--dl-hairline); background: var(--dl-paper); font-family: var(--dl-font-mono); font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dl-grey-4); }
.dm-chip b { font-family: var(--dl-font-display); font-size: 14px; letter-spacing: -0.02em; color: var(--dl-ink); }
.dm-content { flex: 1; padding: 24px 28px 40px; }

.dm-stagestrip { display: grid; grid-template-columns: repeat(5, 1fr); border: var(--dl-hairline); background: var(--dl-paper); margin-bottom: 18px; }
.dm-stagestrip > li + li .dm-stage { border-left: var(--dl-hairline); }
.dm-stage { display: flex; align-items: center; gap: 12px; padding: 12px 22px; transition: background var(--dl-ease); }
.dm-stage:hover { background: var(--dl-blue-wash); }
.dm-stage-ix { font-family: var(--dl-font-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--dl-blue); }
.dm-stage-nm { display: block; font-size: 13px; font-weight: 600; }
.dm-stage-st { display: block; margin-top: 2px; font-family: var(--dl-font-mono); font-size: 9.5px; letter-spacing: 0.09em; text-transform: uppercase; }
.dm-stage-st.is-ok { color: var(--dl-ok); }
.dm-stage-st.is-warn { color: var(--dl-warn); }

@media (prefers-reduced-motion: reduce) {
  .dm-root *, .dm-root *::before, .dm-root *::after { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 8: Run the test and watch it pass**

Run: `npm test -- demo/test/shell.test.tsx`
Expected: PASS, 7 tests.

- [ ] **Step 9: Typecheck and commit**

```bash
npm run typecheck
git add design-system/demo/
git commit -m "feat(demo): app shell with ink rail, top bar and stage strip"
```

---

### Task 3: Build script — SSR every route to its own file

**Files:**
- Create: `design-system/demo/DemoApp.tsx`
- Create: `design-system/scripts/build-demo.mjs`
- Modify: `design-system/package.json` (add `build:demo` script)
- Modify: `design-system/.gitignore` context — none needed; `website/` is committed
- Test: `design-system/demo/test/build.test.ts`

**Interfaces:**
- Consumes: `ROUTES`, `AppShell` from Tasks 1–2.
- Produces: `DemoApp({ slug, prefix })` — the single component both SSR and hydration render; `npm run build:demo` writing `website/demo/`.

- [ ] **Step 1: Write `demo/DemoApp.tsx`**

```tsx
import { AppShell } from './components/AppShell'
import { ROUTES } from './routes'

// The build script imports both from this one bundle entry.
export { ROUTES } from './routes'

export interface DemoAppProps { slug: string; prefix: string }

/** The whole demo for one screen. SSR and the client render exactly this. */
export function DemoApp({ slug, prefix }: DemoAppProps) {
  const route = ROUTES.find(r => r.slug === slug) ?? ROUTES[0]
  const { Component } = route
  return (
    <AppShell current={route.slug} prefix={prefix}>
      <Component />
    </AppShell>
  )
}
```

- [ ] **Step 2: Write the failing test**

Create `design-system/demo/test/build.test.ts`. It asserts the built output exists, so it is skipped unless the build has run — that keeps `npm test` green on a clean checkout while still failing loudly in the verification step of this task.

```ts
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { ROUTES } from '../routes'

const OUT = new URL('../../../website/demo/', import.meta.url).pathname
const built = existsSync(`${OUT}index.html`)

describe.skipIf(!built)('build output', () => {
  it('writes one html file per route', () => {
    for (const r of ROUTES) {
      const file = r.slug === '' ? `${OUT}index.html` : `${OUT}${r.slug}/index.html`
      expect(existsSync(file), file).toBe(true)
    }
  })

  it('server-renders real content, not an empty root', () => {
    const html = readFileSync(`${OUT}index.html`, 'utf8')
    expect(html).toContain('Meridian Assurance')
    expect(html).toContain('dm-rail')
  })

  it('uses depth-relative asset paths on nested screens', () => {
    const html = readFileSync(`${OUT}graph/index.html`, 'utf8')
    expect(html).toContain('../assets/demo.css')
    expect(html).not.toContain('"/demo/')
  })

  it('keeps inner screens out of the index', () => {
    const html = readFileSync(`${OUT}graph/index.html`, 'utf8')
    expect(html).toContain('name="robots" content="noindex"')
  })

  it('emits the client bundle and stylesheet', () => {
    expect(existsSync(`${OUT}assets/demo.js`)).toBe(true)
    expect(existsSync(`${OUT}assets/demo.css`)).toBe(true)
  })
})
```

- [ ] **Step 3: Run it — it skips**

Run: `npm test -- demo/test/build.test.ts`
Expected: PASS with all tests reported as skipped (`website/demo/` does not exist yet).

- [ ] **Step 4: Write `scripts/build-demo.mjs`**

```js
// Pre-renders demo/screens/* into website/demo/: one directory per screen, each
// with a complete server-rendered index.html, plus a client bundle that hydrates
// and takes over navigation. Mirrors scripts/build-site.mjs — read that first.
import { build } from 'esbuild'
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const BASE_URL = 'https://ghazigh.github.io/AI_Data'
const OUT = '../website/demo'

// ---- 1. server bundle: routes + app, rendered by this script --------------
await build({
  entryPoints: ['demo/DemoApp.tsx'],
  outfile: 'dist-site/demo-app.mjs',
  bundle: true,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: { '.css': 'empty' },
})

// ---- 2. client bundle: hydrates the same component tree ------------------
rmSync(OUT, { recursive: true, force: true })
mkdirSync(`${OUT}/assets`, { recursive: true })

await build({
  entryPoints: ['demo/client.tsx'],
  outfile: `${OUT}/assets/demo.js`,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  jsx: 'automatic',
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
})

// ---- 3. stylesheet: fonts + tokens + demo css ---------------------------
const fonts = readFileSync('src/fonts/fonts.css', 'utf8')
  .replace(/url\('\.\/([^']+\.woff2)'\)/g, "url('./fonts/$1')")
mkdirSync(`${OUT}/assets/fonts`, { recursive: true })
for (const f of ['geist-0.woff2', 'geist-mono-0.woff2', 'schibsted-grotesk-1.woff2', 'schibsted-grotesk-italic-0.woff2']) {
  cpSync(`src/fonts/${f}`, `${OUT}/assets/fonts/${f}`)
}
writeFileSync(
  `${OUT}/assets/demo.css`,
  [fonts, readFileSync('src/tokens.css', 'utf8'), readFileSync('demo/demo.css', 'utf8'),
   'html, body { margin: 0; background: var(--dl-canvas); }'].join('\n'),
)
cpSync('site/assets/favicon.svg', `${OUT}/assets/favicon.svg`)

// ---- 4. one server-rendered file per route -------------------------------
const { ROUTES, DemoApp } = await import(pathToFileURL('dist-site/demo-app.mjs'))
const { createElement } = await import('react')
const { renderToString } = await import('react-dom/server')

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const route of ROUTES) {
  const nested = route.slug !== ''
  const prefix = nested ? '../' : ''
  const dir = nested ? `${OUT}/${route.slug}` : OUT
  mkdirSync(dir, { recursive: true })

  const body = renderToString(createElement(DemoApp, { slug: route.slug, prefix }))
  const title = route.slug === ''
    ? 'Product demo — Datalith'
    : `${route.title} — Datalith demo`

  writeFileSync(`${dir}/index.html`, `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1280">
<title>${esc(title)}</title>
<meta name="description" content="Explore the Datalith platform with a fully populated sample estate — readiness scores, the knowledge graph, governed serving and the agent use cases the data supports.">
${nested ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${BASE_URL}/demo/">`}
<meta name="theme-color" content="#FCFCFB">
<link rel="icon" type="image/svg+xml" href="${prefix}assets/favicon.svg">
<link rel="stylesheet" href="${prefix}assets/demo.css">
</head>
<body>
<div id="dm-app" data-slug="${route.slug}" data-prefix="${prefix}">${body}</div>
<script src="${prefix}assets/demo.js" defer></script>
</body>
</html>
`)
  console.log(`wrote ${dir}/index.html`)
}
console.log(`demo ready in ${OUT}/`)
```

- [ ] **Step 5: Add the npm script**

In `design-system/package.json`, add to `"scripts"` after `"build:site"`:

```json
    "build:demo": "node scripts/build-demo.mjs",
```

- [ ] **Step 6: Create a placeholder client entry so the build can run**

Task 4 replaces this with the real router. It exists now only so `build:demo` succeeds.

Create `design-system/demo/client.tsx`:

```tsx
export {}
```

- [ ] **Step 7: Run the build**

Run: `npm run build:demo`
Expected: seven `wrote …/index.html` lines, then `demo ready in ../website/demo/`.

- [ ] **Step 8: Run the test — it now executes**

Run: `npm test -- demo/test/build.test.ts`
Expected: PASS, 5 tests, none skipped.

- [ ] **Step 9: Commit**

```bash
git add design-system/ website/demo/
git commit -m "feat(demo): build script rendering each screen to its own file"
```

---

### Task 4: Client router and hydration

**Files:**
- Create: `design-system/demo/router.ts`
- Create: `design-system/demo/state.tsx`
- Rewrite: `design-system/demo/client.tsx`
- Test: `design-system/demo/test/hydration.test.tsx`

**Interfaces:**
- Consumes: `DemoApp`, `ROUTES`, `routeForPath`.
- Produces: `installRouter(onNavigate: (slug: string) => void): () => void`, `prefixForSlug(slug: string): string`, `DemoStateProvider`, `useDemoState()`.

`useDemoState()` returns exactly `{ sources, connectSource, settleSource, resetDemo }`. No later task widens it.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/hydration.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { render } from '@testing-library/react'
import { DemoApp } from '../DemoApp'
import { ROUTES } from '../routes'
import { prefixForSlug } from '../router'

describe('prefixForSlug', () => {
  it('is empty at the root and one level up when nested', () => {
    expect(prefixForSlug('')).toBe('')
    expect(prefixForSlug('graph')).toBe('../')
  })
})

describe('SSR and client agree', () => {
  for (const route of ROUTES) {
    it(`renders identical markup for "${route.slug || 'index'}"`, () => {
      const prefix = prefixForSlug(route.slug)
      const server = renderToString(<DemoApp slug={route.slug} prefix={prefix} />)
      const { container } = render(<DemoApp slug={route.slug} prefix={prefix} />)
      expect(container.innerHTML).toBe(server)
    })
  }
})
```

This is the guard that makes the whole SSR-plus-hydrate approach safe. `renderToString` and a client render must produce byte-identical HTML; any clock, any random value, any layout solved at runtime breaks it here rather than silently in a prospect's browser.

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/hydration.test.tsx`
Expected: FAIL — cannot resolve `../router`.

- [ ] **Step 3: Write `demo/router.ts`**

```ts
import { ROUTES, routeForPath } from './routes'

/** Path back to /demo/ from a screen's own directory. */
export const prefixForSlug = (slug: string): string => (slug === '' ? '' : '../')

/**
 * Intercept clicks on links marked data-demo-link and navigate without a reload.
 * Returns a teardown function. Modified clicks and unknown targets fall through
 * to the browser, so every link keeps working if this never runs.
 */
export function installRouter(onNavigate: (slug: string) => void): () => void {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const link = (e.target as Element | null)?.closest?.('a[data-demo-link]') as HTMLAnchorElement | null
    if (!link) return
    const url = new URL(link.href, window.location.href)
    if (url.origin !== window.location.origin) return
    const route = routeForPath(url.pathname)
    if (!route) return
    e.preventDefault()
    if (url.pathname !== window.location.pathname) {
      window.history.pushState({ slug: route.slug }, '', url.pathname)
    }
    onNavigate(route.slug)
    document.getElementById('dm-content')?.focus?.()
  }

  const onPop = () => {
    const route = routeForPath(window.location.pathname)
    if (route) onNavigate(route.slug)
  }

  document.addEventListener('click', onClick)
  window.addEventListener('popstate', onPop)
  return () => {
    document.removeEventListener('click', onClick)
    window.removeEventListener('popstate', onPop)
  }
}

export { ROUTES }
```

A subtlety worth understanding: the server writes `href="../graph/"` on a nested page and `href="graph/"` on the root page, but the router resolves both against the current URL and pushes the resulting absolute pathname. After navigation the rendered links change prefix with the new screen, so the two stay consistent.

- [ ] **Step 4: Write `demo/state.tsx`**

```tsx
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { SOURCES } from './data/sources'
import type { Source } from './data/types'

export interface DemoState {
  sources: Source[]
  /** Adds a source in `scanning` state; the caller settles it to `connected`. */
  connectSource: (source: Source) => void
  settleSource: (id: string, readiness: number) => void
  resetDemo: () => void
}

const Ctx = createContext<DemoState | null>(null)

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [sources, setSources] = useState<Source[]>(SOURCES)

  const value = useMemo<DemoState>(() => ({
    sources,
    connectSource: s => setSources(prev => (prev.some(p => p.id === s.id) ? prev : [{ ...s, status: 'scanning' }, ...prev])),
    settleSource: (id, readiness) =>
      setSources(prev => prev.map(s => (s.id === id ? { ...s, status: 'connected', readiness } : s))),
    resetDemo: () => setSources(SOURCES),
  }), [sources])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useDemoState(): DemoState {
  const v = useContext(Ctx)
  if (!v) throw new Error('useDemoState must be used inside DemoStateProvider')
  return v
}
```

`SOURCES` arrives in Task 8. Until then this file will not typecheck — that is expected and Step 7 of this task creates a temporary stub so the task closes green.

- [ ] **Step 5: Write `demo/client.tsx`**

```tsx
import { hydrateRoot } from 'react-dom/client'
import { createElement, useEffect, useState } from 'react'
import { DemoApp } from './DemoApp'
import { installRouter, prefixForSlug } from './router'

function Client({ initialSlug }: { initialSlug: string }) {
  const [slug, setSlug] = useState(initialSlug)
  useEffect(() => installRouter(setSlug), [])
  return createElement(DemoApp, { slug, prefix: prefixForSlug(slug) })
}

const root = document.getElementById('dm-app')
if (root) hydrateRoot(root, createElement(Client, { initialSlug: root.dataset.slug ?? '' }))
```

One consequence of client routing across depths: after navigating from `/demo/` to `/demo/graph/`, React re-renders with `prefix='../'`, so every link and asset reference updates to match the new URL depth. This is why `prefix` is state-derived rather than read once from the DOM.

- [ ] **Step 6: Create the temporary sources stub**

Task 8 replaces this file wholesale. Create `design-system/demo/data/sources.ts`:

```ts
import type { Source } from './types'

/** Replaced in full by Task 8. */
export const SOURCES: Source[] = []
```

- [ ] **Step 7: Run the tests and watch them pass**

Run: `npm test -- demo/test/hydration.test.tsx`
Expected: PASS, 8 tests (one prefix test, seven per-route markup comparisons).

- [ ] **Step 8: Rebuild and typecheck**

Run: `npm run typecheck && npm run build:demo`
Expected: clean typecheck; the build now emits a real `demo.js` larger than the placeholder.

- [ ] **Step 9: Commit**

```bash
git add design-system/ website/demo/
git commit -m "feat(demo): client router, hydration entry and demo state"
```

---

### Task 5: UI primitives — Panel, StatTile, DataTable, Drawer, FilterBar, StatusPill

**Files:**
- Create: `design-system/demo/components/Panel.tsx`
- Create: `design-system/demo/components/StatTile.tsx`
- Create: `design-system/demo/components/DataTable.tsx`
- Create: `design-system/demo/components/Drawer.tsx`
- Create: `design-system/demo/components/FilterBar.tsx`
- Create: `design-system/demo/components/StatusPill.tsx`
- Modify: `design-system/demo/demo.css` (append a `/* ===== primitives ===== */` section)
- Test: `design-system/demo/test/primitives.test.tsx`

**Interfaces:**
- Consumes: nothing beyond React.
- Produces, and every later task uses these exact signatures:
  - `<Panel eyebrow? title action? children />`
  - `<StatTile label value unit? sub? meter? />` where `meter` is a 0–100 number
  - `<DataTable caption columns rows rowKey onRowClick? initialSort? />` with `Column<T> = { key, header, align?, sortValue?, render }`
  - `<Drawer open title onClose children />`
  - `<FilterBar search onSearch groups />` where `groups: FilterGroup[]`
  - `<StatusPill tone label />` with `tone: 'ok' | 'warn' | 'neutral' | 'blue'`

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/primitives.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { Panel } from '../components/Panel'
import { StatTile } from '../components/StatTile'
import { DataTable, type Column } from '../components/DataTable'
import { Drawer } from '../components/Drawer'
import { FilterBar } from '../components/FilterBar'
import { StatusPill } from '../components/StatusPill'

interface Row { id: string; name: string; score: number }
const ROWS: Row[] = [
  { id: 'a', name: 'Alpha', score: 30 },
  { id: 'b', name: 'Beta', score: 90 },
  { id: 'c', name: 'Gamma', score: 60 },
]
const COLS: Column<Row>[] = [
  { key: 'name', header: 'Name', sortValue: r => r.name, render: r => r.name },
  { key: 'score', header: 'Score', align: 'end', sortValue: r => r.score, render: r => r.score },
]

const table = (props: Partial<React.ComponentProps<typeof DataTable<Row>>> = {}) =>
  render(<DataTable caption="Rows" columns={COLS} rows={ROWS} rowKey={r => r.id} {...props} />)

describe('Panel', () => {
  it('labels itself with its title', () => {
    render(<Panel eyebrow="Stage 02 — Ready" title="Readiness by domain"><p>body</p></Panel>)
    expect(screen.getByRole('region', { name: 'Readiness by domain' })).toBeDefined()
    expect(screen.getByText('Stage 02 — Ready')).toBeDefined()
  })
})

describe('StatTile', () => {
  it('shows value, unit and supporting line', () => {
    render(<StatTile label="Entities resolved" value="2.4" unit="M" sub="Across 8 knowledge bases" />)
    expect(screen.getByText('2.4')).toBeDefined()
    expect(screen.getByText('M')).toBeDefined()
    expect(screen.getByText('Across 8 knowledge bases')).toBeDefined()
  })

  it('exposes the meter to assistive tech', () => {
    render(<StatTile label="Score" value="71" unit="/ 100" meter={71} />)
    const meter = screen.getByRole('meter')
    expect(meter.getAttribute('aria-valuenow')).toBe('71')
  })
})

describe('DataTable', () => {
  it('renders a real table with a caption and header scope', () => {
    table()
    expect(screen.getByRole('table', { name: 'Rows' })).toBeDefined()
    expect(screen.getAllByRole('columnheader')[0].getAttribute('scope')).toBe('col')
  })

  it('sorts when a header is activated, and reverses on a second press', () => {
    table()
    const header = screen.getByRole('button', { name: /score/i })
    fireEvent.click(header)
    let cells = screen.getAllByRole('row').slice(1).map(r => within(r).getAllByRole('cell')[0].textContent)
    expect(cells).toEqual(['Alpha', 'Gamma', 'Beta'])
    fireEvent.click(header)
    cells = screen.getAllByRole('row').slice(1).map(r => within(r).getAllByRole('cell')[0].textContent)
    expect(cells).toEqual(['Beta', 'Gamma', 'Alpha'])
  })

  it('reports sort direction to assistive tech', () => {
    table()
    fireEvent.click(screen.getByRole('button', { name: /score/i }))
    const th = screen.getAllByRole('columnheader')[1]
    expect(th.getAttribute('aria-sort')).toBe('ascending')
  })

  it('calls back when a row is chosen', () => {
    const onRowClick = vi.fn()
    table({ onRowClick })
    fireEvent.click(screen.getByText('Beta'))
    expect(onRowClick).toHaveBeenCalledWith(ROWS[1])
  })
})

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(<Drawer open={false} title="Source" onClose={() => {}}><p>detail</p></Drawer>)
    expect(screen.queryByText('detail')).toBeNull()
  })

  it('is a labelled dialog when open', () => {
    render(<Drawer open title="Source" onClose={() => {}}><p>detail</p></Drawer>)
    expect(screen.getByRole('dialog', { name: 'Source' })).toBeDefined()
  })

  it('closes on Escape and on the close control', () => {
    const onClose = vi.fn()
    render(<Drawer open title="Source" onClose={onClose}><p>detail</p></Drawer>)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('moves focus into itself when it opens', () => {
    render(<Drawer open title="Source" onClose={() => {}}><p>detail</p></Drawer>)
    expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true)
  })
})

describe('FilterBar', () => {
  it('reports typing and chip selection', () => {
    const onSearch = vi.fn()
    const onSelect = vi.fn()
    render(
      <FilterBar
        search="" onSearch={onSearch} placeholder="Search sources…"
        groups={[{ key: 'modality', label: 'Modality', options: ['tables', 'documents'], selected: null, onSelect }]}
      />,
    )
    fireEvent.change(screen.getByPlaceholderText('Search sources…'), { target: { value: 'guide' } })
    expect(onSearch).toHaveBeenCalledWith('guide')
    fireEvent.click(screen.getByRole('button', { name: 'tables' }))
    expect(onSelect).toHaveBeenCalledWith('tables')
  })
})

describe('StatusPill', () => {
  it('renders its label', () => {
    render(<StatusPill tone="warn" label="Blocked" />)
    expect(screen.getByText('Blocked')).toBeDefined()
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/primitives.test.tsx`
Expected: FAIL — cannot resolve `../components/Panel`.

- [ ] **Step 3: Write `demo/components/Panel.tsx`**

```tsx
import { useId, type ReactNode } from 'react'

export interface PanelProps {
  eyebrow?: string
  title: string
  action?: ReactNode
  children: ReactNode
}

export function Panel({ eyebrow, title, action, children }: PanelProps) {
  const id = useId()
  return (
    <section className="dm-panel" aria-labelledby={id}>
      <header className="dm-panel-h">
        <div>
          {eyebrow && <p className="dm-eyebrow">{eyebrow}</p>}
          <h2 className="dm-panel-title" id={id}>{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}
```

- [ ] **Step 4: Write `demo/components/StatTile.tsx`**

```tsx
export interface StatTileProps {
  label: string
  value: string
  unit?: string
  sub?: string
  /** 0–100; renders the tick meter. */
  meter?: number
}

export function StatTile({ label, value, unit, sub, meter }: StatTileProps) {
  return (
    <div className="dm-tile">
      <p className="dm-eyebrow">{label}</p>
      <p className="dm-tile-v">{value}{unit && <small>{unit}</small>}</p>
      {meter !== undefined && (
        <div className="dm-ticks" role="meter" aria-valuenow={meter} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
          <i style={{ left: `${meter}%` }} />
        </div>
      )}
      {sub && <p className="dm-tile-sub">{sub}</p>}
    </div>
  )
}
```

- [ ] **Step 5: Write `demo/components/DataTable.tsx`**

```tsx
import { useMemo, useState, type ReactNode } from 'react'

export interface Column<T> {
  key: string
  header: string
  align?: 'start' | 'end'
  /** Omit to make the column unsortable. */
  sortValue?: (row: T) => string | number
  render: (row: T) => ReactNode
}

export interface DataTableProps<T> {
  caption: string
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  onRowClick?: (row: T) => void
  initialSort?: { key: string; dir: 'asc' | 'desc' }
}

export function DataTable<T>({ caption, columns, rows, rowKey, onRowClick, initialSort }: DataTableProps<T>) {
  const [sort, setSort] = useState(initialSort ?? null)

  const sorted = useMemo(() => {
    if (!sort) return rows
    const col = columns.find(c => c.key === sort.key)
    if (!col?.sortValue) return rows
    const dir = sort.dir === 'asc' ? 1 : -1
    return [...rows].sort((a, b) => {
      const av = col.sortValue!(a), bv = col.sortValue!(b)
      return (av < bv ? -1 : av > bv ? 1 : 0) * dir
    })
  }, [rows, columns, sort])

  const toggle = (key: string) =>
    setSort(s => (s?.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))

  return (
    <table className="dm-table">
      <caption className="dm-sr">{caption}</caption>
      <thead>
        <tr>
          {columns.map(c => (
            <th
              key={c.key}
              scope="col"
              className={c.align === 'end' ? 'is-end' : undefined}
              aria-sort={sort?.key === c.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined}
            >
              {c.sortValue
                ? <button type="button" onClick={() => toggle(c.key)}>{c.header}</button>
                : c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map(row => (
          <tr
            key={rowKey(row)}
            className={onRowClick ? 'is-clickable' : undefined}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
          >
            {columns.map(c => (
              <td key={c.key} className={c.align === 'end' ? 'is-end' : undefined}>{c.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

Rows are clickable but the first cell of every clickable table must itself contain a `<button>` so keyboard users can reach the detail view — later tasks that pass `onRowClick` render their name column as a button. The row handler is a convenience for pointer users, not the only path in.

- [ ] **Step 6: Write `demo/components/Drawer.tsx`**

```tsx
import { useEffect, useRef, type ReactNode } from 'react'

export interface DrawerProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function Drawer({ open, title, onClose, children }: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const panel = ref.current
    const previous = document.activeElement as HTMLElement | null
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('keydown', onKeyDown); previous?.focus?.() }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="dm-drawer-scrim" onClick={onClose}>
      <div
        className="dm-drawer"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={e => e.stopPropagation()}
      >
        <header className="dm-drawer-h">
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close panel">✕</button>
        </header>
        <div className="dm-drawer-body">{children}</div>
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Write `demo/components/FilterBar.tsx`**

```tsx
export interface FilterGroup {
  key: string
  label: string
  options: string[]
  selected: string | null
  onSelect: (value: string | null) => void
}

export interface FilterBarProps {
  search: string
  onSearch: (value: string) => void
  placeholder: string
  groups: FilterGroup[]
}

export function FilterBar({ search, onSearch, placeholder, groups }: FilterBarProps) {
  return (
    <div className="dm-filterbar">
      <input
        className="dm-filter-search"
        type="search"
        value={search}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={e => onSearch(e.target.value)}
      />
      {groups.map(g => (
        <div className="dm-filter-group" key={g.key} role="group" aria-label={g.label}>
          <span className="dm-eyebrow">{g.label}</span>
          {g.options.map(o => (
            <button
              type="button"
              key={o}
              className={`dm-filter-chip${g.selected === o ? ' is-on' : ''}`}
              aria-pressed={g.selected === o}
              onClick={() => g.onSelect(g.selected === o ? null : o)}
            >
              {o}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 8: Write `demo/components/StatusPill.tsx`**

```tsx
export type PillTone = 'ok' | 'warn' | 'neutral' | 'blue'

export function StatusPill({ tone, label }: { tone: PillTone; label: string }) {
  return <span className={`dm-pill is-${tone}`}>{label}</span>
}
```

- [ ] **Step 9: Append the primitive styles to `demo/demo.css`**

```css
/* ===== primitives ===== */
.dm-sr { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.dm-eyebrow { font-family: var(--dl-font-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--dl-grey-3); }

.dm-tiles { display: grid; grid-template-columns: repeat(4, 1fr); border: var(--dl-hairline); background: var(--dl-paper); }
.dm-tile { padding: 20px 22px 22px; }
.dm-tiles > .dm-tile + .dm-tile { border-left: var(--dl-hairline); }
.dm-tile-v { margin-top: 14px; font-family: var(--dl-font-display); font-weight: 700; font-size: 40px; line-height: 1; letter-spacing: -0.035em; }
.dm-tile-v small { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; color: var(--dl-grey-3); }
.dm-tile-sub { margin-top: 10px; font-size: 12px; line-height: 1.5; color: var(--dl-grey-4); }
.dm-ticks { position: relative; height: 14px; margin-top: 12px;
  background: repeating-linear-gradient(90deg, var(--dl-grey-2) 0 1px, transparent 1px 4%) left top / 100% 7px no-repeat,
              repeating-linear-gradient(90deg, var(--dl-ink) 0 1px, transparent 1px 20%) left top / 100% 100% no-repeat; }
.dm-ticks i { position: absolute; top: -3px; bottom: 0; width: 3px; margin-left: -1.5px; background: var(--dl-blue); }

.dm-panel { border: var(--dl-hairline); background: var(--dl-paper); }
.dm-panel-h { display: flex; align-items: baseline; justify-content: space-between; gap: var(--dl-space-4); padding: 14px 18px; border-bottom: var(--dl-hairline); }
.dm-panel-title { margin-top: 5px; font-family: var(--dl-font-display); font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.dm-panel-link { font-family: var(--dl-font-mono); font-size: 11px; letter-spacing: 0.06em; color: var(--dl-blue); border-bottom: 1px solid var(--dl-blue); padding-bottom: 1px; }

.dm-table { width: 100%; border-collapse: collapse; }
.dm-table th { padding: 9px 18px; border-bottom: var(--dl-hairline); text-align: left; font-family: var(--dl-font-mono); font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dl-grey-3); }
.dm-table th button { background: none; border: 0; padding: 0; font: inherit; letter-spacing: inherit; text-transform: inherit; color: inherit; cursor: pointer; }
.dm-table th button:hover { color: var(--dl-ink); }
.dm-table th.is-end, .dm-table td.is-end { text-align: right; }
.dm-table td { padding: 11px 18px; border-bottom: 1px solid var(--dl-grey-1); font-size: 13px; vertical-align: middle; }
.dm-table tbody tr:last-child td { border-bottom: 0; }
.dm-table tr.is-clickable { cursor: pointer; }
.dm-table tr.is-clickable:hover { background: var(--dl-blue-wash); }
.dm-table td button { background: none; border: 0; padding: 0; font: inherit; font-weight: 500; color: inherit; text-align: left; cursor: pointer; }
.dm-table td button:hover { color: var(--dl-blue); }

.dm-drawer-scrim { position: fixed; inset: 0; z-index: 60; background: rgba(16, 16, 19, 0.34); display: flex; justify-content: flex-end; }
.dm-drawer { width: 520px; max-width: 100%; background: var(--dl-paper); border-left: var(--dl-hairline); display: flex; flex-direction: column; overflow: hidden; }
.dm-drawer-h { display: flex; align-items: center; justify-content: space-between; padding: 16px 22px; border-bottom: var(--dl-hairline); }
.dm-drawer-h h2 { font-family: var(--dl-font-display); font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.dm-drawer-h button { background: none; border: 0; font-size: 15px; color: var(--dl-grey-4); cursor: pointer; }
.dm-drawer-body { padding: 22px; overflow-y: auto; }

.dm-filterbar { display: flex; align-items: center; gap: var(--dl-space-5); flex-wrap: wrap; padding: 12px 18px; border: var(--dl-hairline); border-bottom: 0; background: var(--dl-paper); }
.dm-filter-search { width: 260px; padding: 8px 12px; border: var(--dl-hairline); border-radius: 0; background: var(--dl-canvas); font-size: 12.5px; color: var(--dl-ink); }
.dm-filter-search:focus { border-color: var(--dl-blue); outline: none; }
.dm-filter-group { display: flex; align-items: center; gap: 8px; }
.dm-filter-chip { padding: 4px 12px; border: var(--dl-hairline); border-radius: var(--dl-radius-pill); background: transparent; font-family: var(--dl-font-mono); font-size: 10.5px; letter-spacing: 0.06em; color: var(--dl-grey-4); cursor: pointer; transition: background var(--dl-ease), color var(--dl-ease); }
.dm-filter-chip:hover { color: var(--dl-ink); }
.dm-filter-chip.is-on { background: var(--dl-ink); border-color: var(--dl-ink); color: #fff; }

.dm-pill { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: var(--dl-radius-pill); font-family: var(--dl-font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; }
.dm-pill.is-ok { background: #E7F3EC; color: var(--dl-ok); }
.dm-pill.is-warn { background: #F8EFDD; color: var(--dl-warn); }
.dm-pill.is-neutral { background: var(--dl-grey-1); color: var(--dl-grey-4); }
.dm-pill.is-blue { background: var(--dl-blue-wash); color: var(--dl-blue); }

.dm-pagehead { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--dl-space-5); margin-bottom: 18px; }
.dm-pagehead h1 { margin-top: 8px; font-family: var(--dl-font-display); font-size: 29px; font-weight: 700; line-height: 1.1; letter-spacing: -0.03em; }
.dm-btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border: 1px solid transparent; border-radius: var(--dl-radius-pill); font-size: 12.5px; font-weight: 600; cursor: pointer; }
.dm-btn.is-ink { background: var(--dl-ink); color: #fff; }
.dm-btn.is-ghost { border-color: var(--dl-grey-2); background: var(--dl-paper); color: var(--dl-ink); }
.dm-grid2 { display: grid; grid-template-columns: 1.35fr 1fr; gap: 18px; margin-top: 18px; }
```

- [ ] **Step 10: Run the tests and watch them pass**

Run: `npm test -- demo/test/primitives.test.tsx`
Expected: PASS, 12 tests.

- [ ] **Step 11: Typecheck and commit**

```bash
npm run typecheck
git add design-system/demo/
git commit -m "feat(demo): panel, tile, table, drawer, filter and pill primitives"
```

---

### Task 6: Chart primitives

**Files:**
- Create: `design-system/demo/components/charts/ScoreMeter.tsx`
- Create: `design-system/demo/components/charts/TrendLine.tsx`
- Create: `design-system/demo/components/charts/DomainBars.tsx`
- Create: `design-system/demo/components/charts/DimensionRadar.tsx`
- Modify: `design-system/demo/demo.css` (append `/* ===== charts ===== */`)
- Test: `design-system/demo/test/charts.test.tsx`

**Interfaces:**
- Consumes: `Domain` from `data/types`.
- Produces:
  - `<ScoreMeter score={number} delta?={number} caption?={string} />`
  - `<TrendLine points={{ label: string; value: number }[]} ariaLabel={string} />`
  - `<DomainBars domains={Domain[]} threshold?={number} onSelect?={(key) => void} />`
  - `<DimensionRadar dimensions={{ label: string; value: number }[]} />`

- [ ] **Step 1: Load the dataviz skill before writing any chart code**

Invoke the `dataviz` skill. It sets the colour formula, mark specs and axis rules these four charts must share so they read as one system rather than four separate inventions. The palette here is not free — it is the tokens in `src/tokens.css` — so apply the skill's structural guidance (encoding choice, tick density, label placement, accessible contrast) on top of the existing brand values.

Two decisions this codebase has already made, which the skill's defaults must not override: below-threshold bars use `--dl-warn` and everything else uses `--dl-ink`, and no chart carries a legend when direct labelling will do.

- [ ] **Step 2: Write the failing test**

Create `design-system/demo/test/charts.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ScoreMeter } from '../components/charts/ScoreMeter'
import { TrendLine } from '../components/charts/TrendLine'
import { DomainBars } from '../components/charts/DomainBars'
import { DimensionRadar } from '../components/charts/DimensionRadar'
import { DOMAINS } from '../data/tenant'

describe('ScoreMeter', () => {
  it('exposes the score as a meter', () => {
    render(<ScoreMeter score={71} delta={6} />)
    const m = screen.getByRole('meter')
    expect(m.getAttribute('aria-valuenow')).toBe('71')
    expect(screen.getByText('71')).toBeDefined()
  })

  it('signs the delta', () => {
    render(<ScoreMeter score={71} delta={6} />)
    expect(screen.getByText(/6/)).toBeDefined()
  })
})

describe('TrendLine', () => {
  it('describes itself and plots every point', () => {
    const { container } = render(
      <TrendLine ariaLabel="Estate score by quarter" points={[
        { label: 'Q3 25', value: 58 }, { label: 'Q4 25', value: 62 },
        { label: 'Q1 26', value: 65 }, { label: 'Q2 26', value: 71 },
      ]} />,
    )
    expect(screen.getByRole('img', { name: 'Estate score by quarter' })).toBeDefined()
    expect(container.querySelectorAll('circle')).toHaveLength(4)
  })
})

describe('DomainBars', () => {
  it('lists every domain with its score', () => {
    render(<DomainBars domains={DOMAINS} />)
    for (const d of DOMAINS) {
      expect(screen.getByText(d.name)).toBeDefined()
      expect(screen.getByText(String(d.score))).toBeDefined()
    }
  })

  it('marks domains under the threshold', () => {
    const { container } = render(<DomainBars domains={DOMAINS} threshold={70} />)
    const under = DOMAINS.filter(d => d.score < 70).length
    expect(container.querySelectorAll('.dm-bar-fill.is-under')).toHaveLength(under)
  })

  it('never numbers the rows', () => {
    render(<DomainBars domains={DOMAINS} />)
    expect(screen.queryByText('01')).toBeNull()
  })

  it('calls back when a domain is chosen', () => {
    const onSelect = vi.fn()
    render(<DomainBars domains={DOMAINS} onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('button', { name: /claims/i }))
    expect(onSelect).toHaveBeenCalledWith('claims')
  })
})

describe('DimensionRadar', () => {
  it('labels every dimension', () => {
    render(<DimensionRadar dimensions={[
      { label: 'Completeness', value: 82 }, { label: 'Freshness', value: 64 },
      { label: 'Consistency', value: 70 }, { label: 'Semantic coverage', value: 58 },
      { label: 'Governance coverage', value: 79 },
    ]} />)
    expect(screen.getByText('Completeness')).toBeDefined()
    expect(screen.getByText('Semantic coverage')).toBeDefined()
  })
})
```

- [ ] **Step 3: Run it and watch it fail**

Run: `npm test -- demo/test/charts.test.tsx`
Expected: FAIL — cannot resolve `../components/charts/ScoreMeter`.

- [ ] **Step 4: Write `demo/components/charts/ScoreMeter.tsx`**

```tsx
export interface ScoreMeterProps { score: number; delta?: number; caption?: string }

export function ScoreMeter({ score, delta, caption }: ScoreMeterProps) {
  return (
    <div className="dm-scoremeter">
      <p className="dm-scoremeter-v">
        {score}<small> / 100</small>
      </p>
      <div className="dm-ticks" role="meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={caption ?? 'Agent-readiness score'}>
        <i style={{ left: `${score}%` }} />
      </div>
      {delta !== undefined && (
        <p className="dm-delta">{delta >= 0 ? '▲' : '▼'} {Math.abs(delta)} since last quarter</p>
      )}
      {caption && <p className="dm-eyebrow" style={{ marginTop: 12 }}>{caption}</p>}
    </div>
  )
}
```

- [ ] **Step 5: Write `demo/components/charts/TrendLine.tsx`**

Coordinates are computed from the data with fixed arithmetic — deterministic, so the hydration guard in Task 4 stays green.

```tsx
export interface TrendPoint { label: string; value: number }

export function TrendLine({ points, ariaLabel }: { points: TrendPoint[]; ariaLabel: string }) {
  const W = 520, H = 140, PAD = 22
  const max = 100, min = 0
  const x = (i: number) => PAD + (i * (W - PAD * 2)) / Math.max(points.length - 1, 1)
  const y = (v: number) => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2)
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`).join(' ')

  return (
    <figure className="dm-trend">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}>
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} className="dm-axis" />
        <path d={path} className="dm-trend-line" />
        {points.map((p, i) => (
          <circle key={p.label} cx={x(i)} cy={y(p.value)} r={3.5} className="dm-trend-dot" />
        ))}
        {points.map((p, i) => (
          <text key={`${p.label}-v`} x={x(i)} y={y(p.value) - 12} className="dm-trend-value" textAnchor="middle">{p.value}</text>
        ))}
        {points.map((p, i) => (
          <text key={`${p.label}-l`} x={x(i)} y={H - 6} className="dm-trend-label" textAnchor="middle">{p.label}</text>
        ))}
      </svg>
    </figure>
  )
}
```

- [ ] **Step 6: Write `demo/components/charts/DomainBars.tsx`**

```tsx
import type { Domain, DomainKey } from '../../data/types'

export interface DomainBarsProps {
  domains: Domain[]
  /** Scores below this render in the warning tone. */
  threshold?: number
  onSelect?: (key: DomainKey) => void
}

export function DomainBars({ domains, threshold = 70, onSelect }: DomainBarsProps) {
  return (
    <ul className="dm-bars">
      {domains.map(d => (
        <li className="dm-bar-row" key={d.key}>
          <span className="dm-bar-name">
            {onSelect
              ? <button type="button" onClick={() => onSelect(d.key)}>{d.name}</button>
              : d.name}
          </span>
          <span className="dm-bar">
            <i
              className={`dm-bar-fill${d.score < threshold ? ' is-under' : ''}`}
              style={{ width: `${d.score}%` }}
            />
          </span>
          <span className="dm-bar-score">{d.score}</span>
        </li>
      ))}
    </ul>
  )
}
```

- [ ] **Step 7: Write `demo/components/charts/DimensionRadar.tsx`**

```tsx
export interface Dimension { label: string; value: number }

export function DimensionRadar({ dimensions }: { dimensions: Dimension[] }) {
  const SIZE = 260, C = SIZE / 2, R = 88
  const angle = (i: number) => (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
  const point = (i: number, r: number) =>
    `${(C + Math.cos(angle(i)) * r).toFixed(1)},${(C + Math.sin(angle(i)) * r).toFixed(1)}`
  const ring = (frac: number) => dimensions.map((_, i) => point(i, R * frac)).join(' ')
  const shape = dimensions.map((d, i) => point(i, (R * d.value) / 100)).join(' ')

  return (
    <figure className="dm-radar">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Readiness by dimension">
        {[0.25, 0.5, 0.75, 1].map(f => <polygon key={f} points={ring(f)} className="dm-radar-ring" />)}
        <polygon points={shape} className="dm-radar-shape" />
        {dimensions.map((d, i) => (
          <circle key={d.label} cx={C + Math.cos(angle(i)) * ((R * d.value) / 100)} cy={C + Math.sin(angle(i)) * ((R * d.value) / 100)} r={3} className="dm-radar-dot" />
        ))}
      </svg>
      <figcaption>
        <ul className="dm-radar-legend">
          {dimensions.map(d => (
            <li key={d.label}><span>{d.label}</span><b>{d.value}</b></li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}
```

`Math.cos` and `Math.sin` are pure functions of the index and produce identical output on server and client — unlike `Math.random`, they are safe here. The `.toFixed(1)` calls exist to keep floating-point string formatting identical across environments.

- [ ] **Step 8: Append the chart styles to `demo/demo.css`**

```css
/* ===== charts ===== */
.dm-scoremeter-v { font-family: var(--dl-font-display); font-weight: 700; font-size: 48px; line-height: 1; letter-spacing: -0.03em; }
.dm-scoremeter-v small { font-size: 18px; font-weight: 500; color: var(--dl-grey-3); }
.dm-delta { margin-top: 10px; font-family: var(--dl-font-mono); font-size: 11px; color: var(--dl-ok); }

.dm-trend { margin: 0; }
.dm-trend svg { width: 100%; height: auto; display: block; }
.dm-axis { stroke: var(--dl-grey-2); stroke-width: 1; }
.dm-trend-line { fill: none; stroke: var(--dl-blue); stroke-width: 2; }
.dm-trend-dot { fill: var(--dl-blue); }
.dm-trend-value { font-family: var(--dl-font-display); font-size: 13px; font-weight: 700; fill: var(--dl-ink); }
.dm-trend-label { font-family: var(--dl-font-mono); font-size: 9.5px; letter-spacing: 0.08em; fill: var(--dl-grey-3); }

.dm-bars { padding: 4px 0; }
.dm-bar-row { display: grid; grid-template-columns: 1fr 148px 40px; gap: 14px; align-items: center; padding: 11px 18px; border-bottom: 1px solid var(--dl-grey-1); }
.dm-bar-row:last-child { border-bottom: 0; }
.dm-bar-name { font-size: 13px; font-weight: 500; }
.dm-bar-name button { background: none; border: 0; padding: 0; font: inherit; font-weight: 500; color: inherit; cursor: pointer; }
.dm-bar-name button:hover { color: var(--dl-blue); }
.dm-bar { position: relative; height: 5px; background: var(--dl-grey-1); }
.dm-bar-fill { position: absolute; inset: 0 auto 0 0; background: var(--dl-ink); }
.dm-bar-fill.is-under { background: var(--dl-warn); }
.dm-bar-score { font-family: var(--dl-font-display); font-weight: 700; font-size: 16px; letter-spacing: -0.02em; text-align: right; }

.dm-radar { display: flex; align-items: center; gap: var(--dl-space-6); margin: 0; padding: 18px; }
.dm-radar svg { width: 260px; flex: none; }
.dm-radar-ring { fill: none; stroke: var(--dl-grey-2); stroke-width: 1; }
.dm-radar-shape { fill: rgba(0, 49, 227, 0.12); stroke: var(--dl-blue); stroke-width: 2; }
.dm-radar-dot { fill: var(--dl-blue); }
.dm-radar-legend li { display: flex; justify-content: space-between; gap: var(--dl-space-6); padding: 7px 0; border-bottom: 1px solid var(--dl-grey-1); font-size: 12.5px; }
.dm-radar-legend li:last-child { border-bottom: 0; }
.dm-radar-legend b { font-family: var(--dl-font-display); letter-spacing: -0.02em; }
```

- [ ] **Step 9: Run the tests and watch them pass**

Run: `npm test -- demo/test/charts.test.tsx`
Expected: PASS, 7 tests.

- [ ] **Step 10: Typecheck and commit**

```bash
npm run typecheck
git add design-system/demo/
git commit -m "feat(demo): score meter, trend, domain bars and dimension radar"
```

---

### Task 7: Source data and the connector catalogue

**Files:**
- Rewrite: `design-system/demo/data/sources.ts` (replacing the Task 4 stub in full)
- Test: `design-system/demo/test/sources.test.ts`

**Interfaces:**
- Consumes: `Source`, `Modality`, `SourceCategory`, `DomainKey` from `data/types`; `DOMAINS`, `ESTATE` from `data/tenant`.
- Produces: `SOURCES: Source[]` (38 rows — 34 connected, 4 pending), `CATALOGUE: CatalogueEntry[]`, `weightForDomain(key: DomainKey): number`, `estateScore(): number`.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/sources.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { SOURCES, CATALOGUE, weightForDomain, estateScore } from '../data/sources'
import { DOMAINS, ESTATE } from '../data/tenant'
import type { DomainKey } from '../data/types'

const connected = SOURCES.filter(s => s.status === 'connected')

describe('sources', () => {
  it('has 34 connected and 4 pending', () => {
    expect(connected).toHaveLength(ESTATE.sourcesConnected)
    expect(SOURCES.filter(s => s.status === 'pending-credentials')).toHaveLength(ESTATE.sourcesPending)
  })

  it('gives every source a unique id', () => {
    expect(new Set(SOURCES.map(s => s.id)).size).toBe(SOURCES.length)
  })

  it('points every source at domains that exist', () => {
    const keys = new Set(DOMAINS.map(d => d.key))
    for (const s of SOURCES) {
      expect(keys.has(s.primaryDomain), `${s.name} primary`).toBe(true)
      expect(s.domains).toContain(s.primaryDomain)
      for (const d of s.domains) expect(keys.has(d), `${s.name} → ${d}`).toBe(true)
    }
  })

  it('gives every source at least one modality and a readiness in range', () => {
    for (const s of SOURCES) {
      expect(s.modalities.length).toBeGreaterThan(0)
      expect(s.readiness).toBeGreaterThanOrEqual(0)
      expect(s.readiness).toBeLessThanOrEqual(100)
    }
  })

  it('weights the domains exactly as the canon specifies', () => {
    const expected: Record<DomainKey, number> = {
      claims: 8, policies: 4, support: 4, contracts: 4,
      'broker-network': 4, underwriting: 4, reinsurance: 3, compliance: 3,
    }
    for (const [key, weight] of Object.entries(expected)) {
      expect(weightForDomain(key as DomainKey), key).toBe(weight)
    }
    expect(Object.values(expected).reduce((a, b) => a + b, 0)).toBe(ESTATE.sourcesConnected)
  })

  it('derives the headline estate score from the domain scores', () => {
    expect(estateScore()).toBe(ESTATE.score)
  })

  it('covers every modality the product claims to handle', () => {
    const seen = new Set(SOURCES.flatMap(s => s.modalities))
    for (const m of ['tables', 'documents', 'tickets', 'email', 'transcripts', 'images', 'streams']) {
      expect(seen.has(m as never), m).toBe(true)
    }
  })
})

describe('connector catalogue', () => {
  it('offers at least 24 connectors across every category', () => {
    expect(CATALOGUE.length).toBeGreaterThanOrEqual(24)
    const cats = new Set(CATALOGUE.map(c => c.category))
    for (const c of ['warehouse', 'oltp', 'saas', 'object-store', 'stream']) {
      expect(cats.has(c as never), c).toBe(true)
    }
  })

  it('never offers a connector that is already connected', () => {
    const live = new Set(SOURCES.filter(s => s.status === 'connected').map(s => s.name))
    for (const c of CATALOGUE) expect(live.has(c.name), c.name).toBe(false)
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/sources.test.ts`
Expected: FAIL — `weightForDomain is not a function` (the Task 4 stub exports only an empty `SOURCES`).

- [ ] **Step 3: Write `demo/data/sources.ts`**

Write all 38 rows following the canon in this plan's header. The shape below shows the first row of each `primaryDomain` group; fill the rest from the canon list, giving each a plausible vendor, category, modality set, record count, `lastSync` string and readiness within ±12 of its domain score.

```ts
import type { DomainKey, Source, SourceCategory, Modality } from './types'
import { DOMAINS } from './tenant'

export const SOURCES: Source[] = [
  // ---- claims (8) ----
  { id: 'guidewire-cc', name: 'Guidewire ClaimCenter', vendor: 'Guidewire', category: 'saas',
    modalities: ['tables', 'documents'], records: 4_120_800, lastSync: '14 min ago',
    readiness: 82, primaryDomain: 'claims', domains: ['claims', 'policies'], status: 'connected' },
  { id: 'zendesk-claims', name: 'Zendesk Claims Queue', vendor: 'Zendesk', category: 'saas',
    modalities: ['tickets'], records: 918_400, lastSync: '22 min ago',
    readiness: 76, primaryDomain: 'claims', domains: ['claims', 'support'], status: 'connected' },
  { id: 'genesys-claim-calls', name: 'Genesys Claim Calls', vendor: 'Genesys', category: 'saas',
    modalities: ['transcripts'], records: 312_600, lastSync: '1 h ago',
    readiness: 68, primaryDomain: 'claims', domains: ['claims', 'support'], status: 'connected' },
  { id: 's3-claim-photos', name: 'S3 Claim Photography', vendor: 'AWS', category: 'object-store',
    modalities: ['images'], records: 2_840_000, lastSync: '38 min ago',
    readiness: 71, primaryDomain: 'claims', domains: ['claims'], status: 'connected' },
  // …snowflake-claims-mart, postgres-claims-intake, jira-claims-ops, azure-fnol

  // ---- policies (4) ----
  { id: 'guidewire-pc', name: 'Guidewire PolicyCenter', vendor: 'Guidewire', category: 'saas',
    modalities: ['tables'], records: 2_640_000, lastSync: '18 min ago',
    readiness: 88, primaryDomain: 'policies', domains: ['policies'], status: 'connected' },
  // …duck-creek, snowflake-policy-mart, sqlserver-legacy-policy

  // ---- support (4), contracts (4), broker-network (4), underwriting (4),
  //      reinsurance (3), compliance (3) — see the canon table ----

  // ---- awaiting credentials (4, excluded from weighting) ----
  { id: 'workday', name: 'Workday HR', vendor: 'Workday', category: 'saas',
    modalities: ['tables'], records: 0, lastSync: 'Never',
    readiness: 0, primaryDomain: 'compliance', domains: ['compliance'], status: 'pending-credentials' },
  // …servicenow, oracle-financials, slack
]

export interface CatalogueEntry {
  id: string
  name: string
  vendor: string
  category: SourceCategory
  modalities: Modality[]
  /** Domain a newly connected instance is weighted into. */
  primaryDomain: DomainKey
  /** Score the scripted scan settles on. */
  readiness: number
}

/** Connectors offered in the "Connect a source" catalogue, none of them already live. */
export const CATALOGUE: CatalogueEntry[] = [
  { id: 'cat-databricks-claims', name: 'Databricks Claims Lakehouse', vendor: 'Databricks', category: 'warehouse',
    modalities: ['tables'], primaryDomain: 'claims', readiness: 74 },
  { id: 'cat-redshift', name: 'Amazon Redshift', vendor: 'AWS', category: 'warehouse',
    modalities: ['tables'], primaryDomain: 'reinsurance', readiness: 69 },
  { id: 'cat-kinesis', name: 'Kinesis Telematics', vendor: 'AWS', category: 'stream',
    modalities: ['streams'], primaryDomain: 'underwriting', readiness: 61 },
  { id: 'cat-notion', name: 'Notion Product Wiki', vendor: 'Notion', category: 'saas',
    modalities: ['documents'], primaryDomain: 'support', readiness: 72 },
  { id: 'cat-mysql-quotes', name: 'MySQL Quote Engine', vendor: 'Oracle', category: 'oltp',
    modalities: ['tables'], primaryDomain: 'underwriting', readiness: 66 },
  { id: 'cat-gcs-archive', name: 'GCS Document Archive', vendor: 'Google Cloud', category: 'object-store',
    modalities: ['documents', 'images'], primaryDomain: 'contracts', readiness: 64 },
  // …at least 24 total, spread across all five categories
]

/** Connected sources weighted into a domain. */
export const weightForDomain = (key: DomainKey): number =>
  SOURCES.filter(s => s.status === 'connected' && s.primaryDomain === key).length

/** Source-weighted mean of the domain scores, rounded — the headline estate score. */
export function estateScore(): number {
  let weighted = 0
  let total = 0
  for (const d of DOMAINS) {
    const w = weightForDomain(d.key)
    weighted += d.score * w
    total += w
  }
  return Math.round(weighted / total)
}
```

The `weightForDomain` counts are not decoration — `estateScore()` must return exactly 71, and the test in Step 1 fails loudly if a source is added to the wrong domain. If the arithmetic ever fights the data, move a domain score rather than fudging the weights.

- [ ] **Step 4: Run the tests and watch them pass**

Run: `npm test -- demo/test/sources.test.ts`
Expected: PASS, 9 tests.

- [ ] **Step 5: Run the whole suite — `state.tsx` now typechecks**

Run: `npm test && npm run typecheck`
Expected: all green. The `DemoStateProvider` from Task 4 now seeds from real data.

- [ ] **Step 6: Commit**

```bash
git add design-system/demo/
git commit -m "feat(demo): the 38 estate sources and the connector catalogue"
```

---

### Task 8: Activity stream and use-case data

**Files:**
- Create: `design-system/demo/data/activity.ts`
- Create: `design-system/demo/data/useCases.ts`
- Test: `design-system/demo/test/useCases.test.ts`

**Interfaces:**
- Consumes: `SOURCES` from Task 7, `DOMAINS` from Task 1.
- Produces: `ACTIVITY: ActivityEntry[]`, `USE_CASES: UseCase[]`, `topUseCases(n: number): UseCase[]`.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/useCases.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { ACTIVITY } from '../data/activity'
import { USE_CASES, topUseCases } from '../data/useCases'
import { SOURCES } from '../data/sources'
import { DOMAINS } from '../data/tenant'

const sourceIds = new Set(SOURCES.map(s => s.id))
const domainKeys = new Set(DOMAINS.map(d => d.key))

describe('activity', () => {
  it('has entries and each names a real source', () => {
    expect(ACTIVITY.length).toBeGreaterThanOrEqual(8)
    for (const a of ACTIVITY) expect(sourceIds.has(a.sourceId), a.sourceId).toBe(true)
  })

  it('uses fixed relative times, never a computed clock', () => {
    for (const a of ACTIVITY) expect(a.when).toMatch(/ago|yesterday|today/i)
  })
})

describe('use cases', () => {
  it('has 14, of which 5 are blocked', () => {
    expect(USE_CASES).toHaveLength(14)
    expect(USE_CASES.filter(u => u.status === 'blocked')).toHaveLength(5)
  })

  it('draws every use case from sources that exist', () => {
    for (const u of USE_CASES) {
      expect(u.sourceIds.length).toBeGreaterThan(0)
      for (const id of u.sourceIds) expect(sourceIds.has(id), `${u.name} → ${id}`).toBe(true)
    }
  })

  it('names a real blocking domain for every blocked use case, and none for the rest', () => {
    for (const u of USE_CASES) {
      if (u.status === 'blocked') {
        expect(u.blockedBy, u.name).toBeDefined()
        expect(domainKeys.has(u.blockedBy!), u.name).toBe(true)
      } else {
        expect(u.blockedBy, u.name).toBeUndefined()
      }
    }
  })

  it('blocks only on domains that actually score below the bar', () => {
    for (const u of USE_CASES.filter(u => u.status === 'blocked')) {
      const domain = DOMAINS.find(d => d.key === u.blockedBy)!
      expect(domain.score, `${u.name} blocked by ${domain.name}`).toBeLessThan(70)
    }
  })

  it('leads with the claims triage copilot', () => {
    const top = topUseCases(3)
    expect(top[0].name).toBe('Claims triage copilot')
    expect(top[0].status).toBe('ready')
  })

  it('ranks by projected impact, descending', () => {
    const values = topUseCases(14).map(u => u.impactValue)
    expect([...values].sort((a, b) => b - a)).toEqual(values)
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/useCases.test.ts`
Expected: FAIL — cannot resolve `../data/activity`.

- [ ] **Step 3: Write `demo/data/activity.ts`**

```ts
export type ActivityTone = 'info' | 'ok' | 'warn'

export interface ActivityEntry {
  id: string
  tone: ActivityTone
  /** Sentence with the subject in <b> handled by the renderer, not markup here. */
  subject: string
  detail: string
  sourceId: string
  /** Fixed display string. Never computed. */
  when: string
}

export const ACTIVITY: ActivityEntry[] = [
  { id: 'a1', tone: 'info', subject: 'Guidewire ClaimCenter', detail: 'synced — 41,208 new claim records indexed', sourceId: 'guidewire-cc', when: '14 min ago' },
  { id: 'a2', tone: 'warn', subject: 'crm.contacts', detail: 'unmasked PII found in 3 columns — quarantined pending review', sourceId: 'salesforce', when: '1 h ago' },
  { id: 'a3', tone: 'ok', subject: 'Broker network', detail: 'identity resolution merged 12,470 duplicate records', sourceId: 'sap-commissions', when: '3 h ago' },
  { id: 'a4', tone: 'info', subject: 'claims-triage-01', detail: 'served 8,412 graph queries', sourceId: 'snowflake-claims-mart', when: '5 h ago' },
  { id: 'a5', tone: 'warn', subject: 'SharePoint Underwriting Files', detail: 'not refreshed in 21 days — freshness score falling', sourceId: 'sharepoint-uw', when: 'yesterday' },
  { id: 'a6', tone: 'ok', subject: 'Semantic typing', detail: 'confirmed on 380 columns by D. Okafor', sourceId: 'snowflake-policy-mart', when: 'yesterday' },
  { id: 'a7', tone: 'info', subject: 'S3 Bordereaux', detail: 'chunked 4,180 treaty statements for retrieval', sourceId: 's3-bordereaux', when: 'yesterday' },
  { id: 'a8', tone: 'ok', subject: 'Genesys Claim Calls', detail: 'transcribed and embedded 12,900 calls', sourceId: 'genesys-claim-calls', when: '2 days ago' },
]
```

Every `sourceId` must match an id written in Task 7. If a name in the canon list was given a different id there, correct the reference here rather than inventing a source.

- [ ] **Step 4: Write `demo/data/useCases.ts`**

```ts
import type { DomainKey } from './types'

export type UseCaseStatus = 'ready' | 'in-review' | 'blocked'

export interface UseCase {
  id: string
  name: string
  summary: string
  sourceIds: string[]
  /** Projected annual impact in dollars — the sort key. */
  impactValue: number
  /** Display form, e.g. "$2.1M". */
  impact: string
  effort: string
  status: UseCaseStatus
  /** Set only when status is 'blocked'. */
  blockedBy?: DomainKey
  guardrails: string[]
  exports: string[]
}

export const USE_CASES: UseCase[] = [
  {
    id: 'uc-claims-triage',
    name: 'Claims triage copilot',
    summary: 'Reads the FNOL, the policy and the call transcript, then routes and reserves.',
    sourceIds: ['guidewire-cc', 'genesys-claim-calls', 'guidewire-pc'],
    impactValue: 2_100_000, impact: '$2.1M', effort: '6 weeks', status: 'ready',
    guardrails: ['No reserve above $50K without a human approval', 'PII masked in every prompt', 'Refuses on policies in litigation'],
    exports: ['LangGraph', 'CrewAI', 'OpenAI Agents SDK', 'n8n'],
  },
  {
    id: 'uc-treaty-reader',
    name: 'Reinsurance treaty reader',
    summary: 'Extracts cession terms from treaty PDFs and reconciles them against bordereaux.',
    sourceIds: ['sharepoint-treaty', 's3-bordereaux'],
    impactValue: 880_000, impact: '$880K', effort: '8 weeks', status: 'in-review',
    guardrails: ['Cites the treaty clause for every extracted term', 'Flags rather than resolves contradictions'],
    exports: ['LangGraph', 'OpenAI Agents SDK'],
  },
  {
    id: 'uc-broker-followup',
    name: 'Broker follow-up agent',
    summary: 'Chases stalled broker submissions using commission history and mail threads.',
    sourceIds: ['salesforce', 'sap-commissions', 'exchange-broker'],
    impactValue: 640_000, impact: '$640K', effort: '5 weeks', status: 'blocked',
    blockedBy: 'broker-network',
    guardrails: ['Never contacts a broker under review', 'Drafts only — a human sends'],
    exports: ['LangGraph', 'n8n'],
  },
  // …11 more, of which 4 more are blocked. Every blockedBy must name a domain
  // scoring below 70: contracts (68), compliance (64), broker-network (61),
  // underwriting (55). Keep impactValue descending across the whole array.
]

/** The n highest-impact opportunities. */
export const topUseCases = (n: number): UseCase[] =>
  [...USE_CASES].sort((a, b) => b.impactValue - a.impactValue).slice(0, n)
```

- [ ] **Step 5: Run the tests and watch them pass**

Run: `npm test -- demo/test/useCases.test.ts`
Expected: PASS, 8 tests.

- [ ] **Step 6: Typecheck and commit**

```bash
npm run typecheck
git add design-system/demo/
git commit -m "feat(demo): estate activity stream and the 14 use cases"
```

---

### Task 9: Overview screen

**Files:**
- Create: `design-system/demo/screens/Overview.tsx`
- Create: `design-system/demo/components/PageHead.tsx`
- Modify: `design-system/demo/routes.ts` (replace the Overview stub)
- Modify: `design-system/demo/demo.css` (append `/* ===== overview ===== */`)
- Test: `design-system/demo/test/screens.test.tsx` (create; later tasks extend it)

**Interfaces:**
- Consumes: `StageStrip`, `Panel`, `StatTile`, `StatusPill`, `DomainBars`, `ESTATE`, `DOMAINS`, `ACTIVITY`, `topUseCases`, `weightForDomain`.
- Produces: `Overview`, and `<PageHead eyebrow title actions? />` used by all seven screens.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/screens.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { Overview } from '../screens/Overview'
import { ESTATE } from '../data/tenant'
import { topUseCases } from '../data/useCases'

describe('Overview', () => {
  it('leads with the estate headline numbers', () => {
    render(<Overview />)
    expect(screen.getByText('71')).toBeDefined()
    expect(screen.getByText(String(ESTATE.sourcesConnected))).toBeDefined()
    expect(screen.getByText('2.4')).toBeDefined()
    expect(screen.getByText('184')).toBeDefined()
  })

  it('shows the five stages with live status', () => {
    render(<Overview />)
    const strip = screen.getByRole('list', { name: 'Product stages' })
    expect(within(strip).getAllByRole('listitem')).toHaveLength(5)
  })

  it('shows the five domains carrying the most sources, not all eight', () => {
    render(<Overview />)
    const panel = screen.getByRole('region', { name: /readiness by business domain/i })
    expect(within(panel).getAllByRole('listitem')).toHaveLength(5)
  })

  it('links through to all eight domains', () => {
    render(<Overview />)
    expect(screen.getByRole('link', { name: /open readiness/i })).toBeDefined()
  })

  it('shows the estate activity stream', () => {
    render(<Overview />)
    const panel = screen.getByRole('region', { name: /estate activity/i })
    expect(within(panel).getAllByRole('listitem').length).toBeGreaterThanOrEqual(6)
  })

  it('shows the three highest-impact use cases with their status', () => {
    render(<Overview />)
    const panel = screen.getByRole('region', { name: /what the graph already supports/i })
    for (const u of topUseCases(3)) {
      expect(within(panel).getByText(u.name)).toBeDefined()
      expect(within(panel).getByText(u.impact)).toBeDefined()
    }
  })

  it('never numbers the domain rows', () => {
    render(<Overview />)
    const panel = screen.getByRole('region', { name: /readiness by business domain/i })
    expect(within(panel).queryByText('01')).toBeNull()
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/screens.test.tsx`
Expected: FAIL — cannot resolve `../screens/Overview`.

- [ ] **Step 3: Write `demo/components/PageHead.tsx`**

```tsx
import type { ReactNode } from 'react'

export function PageHead({ eyebrow, title, actions }: { eyebrow: string; title: string; actions?: ReactNode }) {
  return (
    <div className="dm-pagehead">
      <div>
        <p className="dm-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      {actions && <div className="dm-pagehead-actions">{actions}</div>}
    </div>
  )
}
```

- [ ] **Step 4: Write `demo/screens/Overview.tsx`**

```tsx
import { PageHead } from '../components/PageHead'
import { StageStrip } from '../components/StageStrip'
import { Panel } from '../components/Panel'
import { StatTile } from '../components/StatTile'
import { StatusPill } from '../components/StatusPill'
import { DomainBars } from '../components/charts/DomainBars'
import { DOMAINS, ESTATE, TENANT } from '../data/tenant'
import { weightForDomain } from '../data/sources'
import { ACTIVITY } from '../data/activity'
import { topUseCases, type UseCase } from '../data/useCases'

const PILL: Record<UseCase['status'], { tone: 'ok' | 'warn' | 'neutral'; label: string }> = {
  ready: { tone: 'ok', label: 'Ready to build' },
  'in-review': { tone: 'neutral', label: 'In review' },
  blocked: { tone: 'warn', label: 'Blocked' },
}

/** The five domains carrying the most connected sources. Ties break on score. */
const headlineDomains = () =>
  [...DOMAINS]
    .sort((a, b) => weightForDomain(b.key) - weightForDomain(a.key) || b.score - a.score)
    .slice(0, 5)

export function Overview() {
  return (
    <>
      <PageHead
        eyebrow={`${TENANT.name} · ${TENANT.scope}`}
        title="Estate overview"
        actions={
          <>
            <button className="dm-btn is-ghost" type="button">Export board report</button>
            <a className="dm-btn is-ink" href="connect/" data-demo-link>Connect a source</a>
          </>
        }
      />

      <StageStrip prefix="" />

      <div className="dm-tiles">
        <StatTile label="Agent-readiness score" value={String(ESTATE.score)} unit=" / 100"
          meter={ESTATE.score} sub={`▲ ${ESTATE.scoreDelta} since last quarter`} />
        <StatTile label="Sources connected" value={String(ESTATE.sourcesConnected)}
          sub={`${ESTATE.sourcesPending} awaiting read-only credentials`} />
        <StatTile label="Entities resolved" value="2.4" unit="M"
          sub={`Across ${ESTATE.knowledgeBases} knowledge bases · ${ESTATE.relationshipsMapped} relationships mapped`} />
        <StatTile label="Agent calls served" value="184" unit="K"
          sub={`Last 30 days · ${ESTATE.agentCallsDenied} denied by policy · 100% logged`} />
      </div>

      <div className="dm-grid2">
        <Panel
          eyebrow="Stage 02 — Ready"
          title="Readiness by business domain"
          action={<a className="dm-panel-link" href="ready/" data-demo-link>Open Readiness</a>}
        >
          <DomainBars domains={headlineDomains()} />
        </Panel>

        <Panel
          eyebrow="Live"
          title="Estate activity"
          action={<a className="dm-panel-link" href="governance/" data-demo-link>Full stream</a>}
        >
          <ul className="dm-activity">
            {ACTIVITY.map(a => (
              <li key={a.id}>
                <span className={`dm-dot is-${a.tone}`} aria-hidden="true" />
                <div>
                  <p><b>{a.subject}</b> {a.detail}</p>
                  <p className="dm-when">{a.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div style={{ marginTop: 18 }}>
        <Panel
          eyebrow="Stage 05 — Use cases"
          title="What the graph already supports"
          action={<a className="dm-panel-link" href="use-cases/" data-demo-link>All 14 opportunities</a>}
        >
          <ul className="dm-uclist">
            {topUseCases(3).map(u => (
              <li key={u.id}>
                <div>
                  <p className="dm-uc-t">{u.name}</p>
                  <p className="dm-uc-s">{u.summary}</p>
                </div>
                <p className="dm-uc-roi">{u.impact}<em>projected / yr</em></p>
                <StatusPill tone={PILL[u.status].tone} label={PILL[u.status].label} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}
```

Note the links are written without a prefix because the Overview screen is the only one that lives at `/demo/` itself. Every other screen passes `prefix="../"` into `StageStrip` and writes `../connect/` style hrefs.

- [ ] **Step 5: Wire the route**

In `demo/routes.ts`, add `import { Overview } from './screens/Overview'` at the top and replace the first entry's `Component: Stub('Overview')` with `Component: Overview`.

- [ ] **Step 6: Append the overview styles to `demo/demo.css`**

```css
/* ===== overview ===== */
.dm-pagehead-actions { display: flex; gap: 10px; }
.dm-activity li { display: grid; grid-template-columns: 8px 1fr; gap: 12px; padding: 11px 18px; border-bottom: 1px solid var(--dl-grey-1); }
.dm-activity li:last-child { border-bottom: 0; }
.dm-activity p { font-size: 12.5px; line-height: 1.5; }
.dm-activity b { font-weight: 600; }
.dm-dot { width: 5px; height: 5px; margin-top: 6px; border-radius: 50%; background: var(--dl-grey-3); }
.dm-dot.is-info { background: var(--dl-blue); }
.dm-dot.is-ok { background: var(--dl-ok); }
.dm-dot.is-warn { background: var(--dl-warn); }
.dm-when { margin-top: 4px; font-family: var(--dl-font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--dl-grey-3); }

.dm-uclist li { display: grid; grid-template-columns: 1fr 118px 132px; gap: 16px; align-items: center; padding: 13px 18px; border-bottom: 1px solid var(--dl-grey-1); }
.dm-uclist li:last-child { border-bottom: 0; }
.dm-uclist .dm-pill { justify-self: end; }
.dm-uc-t { font-size: 13px; font-weight: 600; }
.dm-uc-s { margin-top: 3px; font-size: 11.5px; color: var(--dl-grey-4); }
.dm-uc-roi { font-family: var(--dl-font-display); font-weight: 700; font-size: 17px; letter-spacing: -0.02em; text-align: right; }
.dm-uc-roi em { display: block; margin-top: 3px; font-family: var(--dl-font-mono); font-style: normal; font-size: 9.5px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dl-grey-3); }
```

- [ ] **Step 7: Run the tests, rebuild and eyeball**

Run: `npm test && npm run typecheck && npm run build:demo`
Expected: all green, seven files written. The hydration test from Task 4 now exercises a real screen — if it fails, something in `Overview` is non-deterministic.

- [ ] **Step 8: Commit**

```bash
git add design-system/demo/ website/demo/
git commit -m "feat(demo): overview screen with estate tiles, domains and use cases"
```

---

### Task 10: Connect screen, connector catalogue and the connect flow

**Files:**
- Create: `design-system/demo/screens/Connect.tsx`
- Create: `design-system/demo/components/ConnectDialog.tsx`
- Create: `design-system/demo/components/SourceDrawer.tsx`
- Modify: `design-system/demo/routes.ts`, `design-system/demo/DemoApp.tsx` (wrap in `DemoStateProvider`), `design-system/demo/demo.css`
- Test: `design-system/demo/test/connect.test.tsx`

**Interfaces:**
- Consumes: `useDemoState`, `SOURCES`, `CATALOGUE`, `DataTable`, `FilterBar`, `Drawer`, `StatusPill`, `PageHead`.
- Produces: `Connect`, `ConnectDialog`, `SourceDrawer`.

- [ ] **Step 1: Wrap the app in the state provider**

In `demo/DemoApp.tsx`, import `DemoStateProvider` from `./state` and wrap the `AppShell`:

```tsx
  return (
    <DemoStateProvider>
      <AppShell current={route.slug} prefix={prefix}>
        <Component />
      </AppShell>
    </DemoStateProvider>
  )
```

The provider seeds from the static `SOURCES` array, so its first render is identical on server and client and the hydration guard stays green.

- [ ] **Step 2: Add the "Reset demo" control to the top bar**

The spec calls for one, and this is the first task where state exists to reset. Add the failing test to `demo/test/shell.test.tsx`:

```tsx
import { DemoApp } from '../DemoApp'
import { fireEvent } from '@testing-library/react'

it('offers a way back to the starting state', () => {
  render(<DemoApp slug="" prefix="" />)
  const reset = screen.getByRole('button', { name: /reset demo/i })
  fireEvent.click(reset)
  expect(reset).toBeDefined()
})
```

Then in `demo/components/TopBar.tsx`, import `useDemoState` and render the control beside the readiness chip:

```tsx
  const { resetDemo } = useDemoState()
  // …
  <button className="dm-reset" type="button" onClick={resetDemo}>Reset demo</button>
```

with

```css
.dm-reset { padding: 6px 12px; border: var(--dl-hairline); background: var(--dl-paper); font-family: var(--dl-font-mono); font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dl-grey-4); cursor: pointer; }
.dm-reset:hover { color: var(--dl-ink); border-color: var(--dl-grey-3); }
```

Because `TopBar` now calls `useDemoState`, the Task 2 shell tests must wrap `AppShell` in `DemoStateProvider`. Update the `shell` helper in that file:

```tsx
const shell = (current = '') =>
  render(<DemoStateProvider><AppShell current={current} prefix=""><p>content</p></AppShell></DemoStateProvider>)
```

- [ ] **Step 3: Write the failing test**

Create `design-system/demo/test/connect.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import { DemoStateProvider } from '../state'
import { Connect } from '../screens/Connect'
import { SOURCES } from '../data/sources'
import { ESTATE } from '../data/tenant'

const connect = () => render(<DemoStateProvider><Connect /></DemoStateProvider>)

describe('Connect screen', () => {
  it('lists every source in the estate', () => {
    connect()
    const table = screen.getByRole('table', { name: /sources/i })
    expect(within(table).getAllByRole('row')).toHaveLength(SOURCES.length + 1)
  })

  it('separates connected from awaiting credentials', () => {
    connect()
    expect(screen.getAllByText(/awaiting credentials/i).length).toBe(ESTATE.sourcesPending)
  })

  it('filters by search text', () => {
    connect()
    fireEvent.change(screen.getByPlaceholderText(/search sources/i), { target: { value: 'guidewire' } })
    const table = screen.getByRole('table', { name: /sources/i })
    const rows = within(table).getAllByRole('row').slice(1)
    expect(rows.length).toBeGreaterThan(0)
    for (const r of rows) expect(r.textContent?.toLowerCase()).toContain('guidewire')
  })

  it('filters by modality chip', () => {
    connect()
    fireEvent.click(screen.getByRole('button', { name: 'transcripts' }))
    const rows = within(screen.getByRole('table', { name: /sources/i })).getAllByRole('row').slice(1)
    expect(rows.length).toBeGreaterThan(0)
    expect(rows.length).toBeLessThan(SOURCES.length)
  })

  it('opens a source drawer from the name button', () => {
    connect()
    fireEvent.click(screen.getByRole('button', { name: 'Guidewire ClaimCenter' }))
    expect(screen.getByRole('dialog', { name: /guidewire claimcenter/i })).toBeDefined()
  })

  it('connects a catalogue source and settles it to connected', async () => {
    connect()
    fireEvent.click(screen.getByRole('button', { name: /connect a source/i }))
    const dialog = screen.getByRole('dialog', { name: /connect a source/i })
    fireEvent.click(within(dialog).getByRole('button', { name: /amazon redshift/i }))
    fireEvent.change(screen.getByLabelText(/account/i), { target: { value: 'meridian-prod' } })
    fireEvent.click(screen.getByRole('button', { name: /^connect source$/i }))

    expect(await screen.findByText(/scanning/i)).toBeDefined()
    await waitFor(() => expect(screen.queryByText(/scanning/i)).toBeNull(), { timeout: 4000 })

    const table = screen.getByRole('table', { name: /sources/i })
    expect(within(table).getByRole('button', { name: 'Amazon Redshift' })).toBeDefined()
  })

  it('asks only for read-only credentials', () => {
    connect()
    fireEvent.click(screen.getByRole('button', { name: /connect a source/i }))
    expect(screen.getByText(/read-only/i)).toBeDefined()
  })
})
```

- [ ] **Step 4: Run it and watch it fail**

Run: `npm test -- demo/test/connect.test.tsx`
Expected: FAIL — cannot resolve `../screens/Connect`.

- [ ] **Step 5: Write `demo/components/SourceDrawer.tsx`**

```tsx
import { Drawer } from './Drawer'
import { StatusPill } from './StatusPill'
import { domainByKey } from '../data/tenant'
import type { Source } from '../data/types'

const SUBSCORES = ['Completeness', 'Freshness', 'Consistency', 'Semantic coverage', 'Governance coverage']

export function SourceDrawer({ source, onClose }: { source: Source | null; onClose: () => void }) {
  if (!source) return null
  // Deterministic spread around the source score — no randomness.
  const offsets = [6, -4, 2, -9, 3]
  return (
    <Drawer open title={source.name} onClose={onClose}>
      <dl className="dm-deflist">
        <div><dt>Vendor</dt><dd>{source.vendor}</dd></div>
        <div><dt>Category</dt><dd>{source.category}</dd></div>
        <div><dt>Modalities</dt><dd>{source.modalities.join(' · ')}</dd></div>
        <div><dt>Records</dt><dd>{source.records.toLocaleString('en-US')}</dd></div>
        <div><dt>Last sync</dt><dd>{source.lastSync}</dd></div>
        <div><dt>Domains</dt><dd>{source.domains.map(d => domainByKey(d)?.name).join(' · ')}</dd></div>
        <div><dt>Status</dt><dd><StatusPill tone={source.status === 'connected' ? 'ok' : 'neutral'} label={source.status.replace('-', ' ')} /></dd></div>
      </dl>

      <h3 className="dm-drawer-sub">Readiness sub-scores</h3>
      <ul className="dm-bars">
        {SUBSCORES.map((label, i) => {
          const value = Math.max(0, Math.min(100, source.readiness + offsets[i]))
          return (
            <li className="dm-bar-row" key={label}>
              <span className="dm-bar-name">{label}</span>
              <span className="dm-bar"><i className={`dm-bar-fill${value < 70 ? ' is-under' : ''}`} style={{ width: `${value}%` }} /></span>
              <span className="dm-bar-score">{value}</span>
            </li>
          )
        })}
      </ul>
    </Drawer>
  )
}
```

- [ ] **Step 6: Write `demo/components/ConnectDialog.tsx`**

```tsx
import { useState } from 'react'
import { Drawer } from './Drawer'
import { CATALOGUE, type CatalogueEntry } from '../data/sources'

export interface ConnectDialogProps {
  open: boolean
  onClose: () => void
  onConnect: (entry: CatalogueEntry) => void
}

export function ConnectDialog({ open, onClose, onConnect }: ConnectDialogProps) {
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<CatalogueEntry | null>(null)
  const [account, setAccount] = useState('')

  const shown = CATALOGUE.filter(c =>
    `${c.name} ${c.vendor} ${c.category}`.toLowerCase().includes(query.toLowerCase()))

  const close = () => { setPicked(null); setQuery(''); setAccount(''); onClose() }

  return (
    <Drawer open={open} title="Connect a source" onClose={close}>
      {!picked ? (
        <>
          <input
            className="dm-filter-search" type="search" value={query}
            placeholder="Search 150+ connectors…" aria-label="Search connectors"
            onChange={e => setQuery(e.target.value)}
          />
          <ul className="dm-catalogue">
            {shown.map(c => (
              <li key={c.id}>
                <button type="button" onClick={() => setPicked(c)}>
                  <span className="dm-cat-name">{c.name}</span>
                  <span className="dm-cat-meta">{c.category} · {c.modalities.join(', ')}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <form
          className="dm-connect-form"
          onSubmit={e => { e.preventDefault(); onConnect(picked); close() }}
        >
          <p className="dm-connect-lead">
            Datalith reads <b>{picked.name}</b> with read-only credentials. Nothing is
            written back, and no data leaves your estate during the scan.
          </p>
          <label className="dm-field">
            <span>Account or host</span>
            <input value={account} onChange={e => setAccount(e.target.value)} required />
          </label>
          <label className="dm-field">
            <span>Read-only key</span>
            <input type="password" defaultValue="••••••••••••" readOnly />
          </label>
          <div className="dm-connect-actions">
            <button type="button" className="dm-btn is-ghost" onClick={() => setPicked(null)}>Back</button>
            <button type="submit" className="dm-btn is-ink">Connect source</button>
          </div>
        </form>
      )}
    </Drawer>
  )
}
```

- [ ] **Step 7: Write `demo/screens/Connect.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react'
import { PageHead } from '../components/PageHead'
import { DataTable, type Column } from '../components/DataTable'
import { FilterBar } from '../components/FilterBar'
import { StatusPill } from '../components/StatusPill'
import { SourceDrawer } from '../components/SourceDrawer'
import { ConnectDialog } from '../components/ConnectDialog'
import { useDemoState } from '../state'
import type { Source } from '../data/types'
import type { CatalogueEntry } from '../data/sources'

const MODALITIES = ['tables', 'documents', 'tickets', 'email', 'transcripts', 'images', 'streams']
const CATEGORIES = ['warehouse', 'oltp', 'saas', 'object-store', 'stream']

const STATUS_PILL = (s: Source['status']) =>
  s === 'connected' ? { tone: 'ok' as const, label: 'Connected' }
  : s === 'scanning' ? { tone: 'blue' as const, label: 'Scanning' }
  : { tone: 'neutral' as const, label: 'Awaiting credentials' }

export function Connect() {
  const { sources, connectSource, settleSource } = useDemoState()
  const [search, setSearch] = useState('')
  const [modality, setModality] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [selected, setSelected] = useState<Source | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const onConnect = (entry: CatalogueEntry) => {
    connectSource({
      id: entry.id, name: entry.name, vendor: entry.vendor, category: entry.category,
      modalities: entry.modalities, records: 0, lastSync: 'Scanning…', readiness: 0,
      primaryDomain: entry.primaryDomain, domains: [entry.primaryDomain], status: 'scanning',
    })
    timers.current.push(setTimeout(() => settleSource(entry.id, entry.readiness), 2200))
  }

  const rows = sources.filter(s =>
    `${s.name} ${s.vendor} ${s.category}`.toLowerCase().includes(search.toLowerCase())
    && (!modality || s.modalities.includes(modality as never))
    && (!category || s.category === category))

  const columns: Column<Source>[] = [
    { key: 'name', header: 'Source', sortValue: s => s.name,
      render: s => <button type="button" onClick={() => setSelected(s)}>{s.name}</button> },
    { key: 'modalities', header: 'Modalities', render: s => <span className="dm-muted">{s.modalities.join(' · ')}</span> },
    { key: 'records', header: 'Records', align: 'end', sortValue: s => s.records,
      render: s => (s.records ? s.records.toLocaleString('en-US') : '—') },
    { key: 'lastSync', header: 'Last sync', render: s => <span className="dm-muted">{s.lastSync}</span> },
    { key: 'readiness', header: 'Readiness', align: 'end', sortValue: s => s.readiness,
      render: s => (s.readiness ? s.readiness : '—') },
    { key: 'status', header: 'Status', render: s => <StatusPill {...STATUS_PILL(s.status)} /> },
  ]

  return (
    <>
      <PageHead
        eyebrow="Stage 01 — Connect"
        title="Every system you run, read-only"
        actions={<button className="dm-btn is-ink" type="button" onClick={() => setDialogOpen(true)}>Connect a source</button>}
      />
      <FilterBar
        search={search} onSearch={setSearch} placeholder="Search sources…"
        groups={[
          { key: 'modality', label: 'Modality', options: MODALITIES, selected: modality, onSelect: setModality },
          { key: 'category', label: 'Category', options: CATEGORIES, selected: category, onSelect: setCategory },
        ]}
      />
      <div className="dm-panel">
        <DataTable
          caption="Sources in the estate"
          columns={columns}
          rows={rows}
          rowKey={s => s.id}
          initialSort={{ key: 'name', dir: 'asc' }}
        />
      </div>
      <SourceDrawer source={selected} onClose={() => setSelected(null)} />
      <ConnectDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onConnect={onConnect} />
    </>
  )
}
```

The scan settles on a `setTimeout` rather than an animation frame so the test can await it, and the timer is cleared on unmount so a fast click-through never fires into a dead component.

- [ ] **Step 8: Wire the route and append styles**

In `demo/routes.ts`, import `Connect` and replace its stub. Append to `demo/demo.css`:

```css
/* ===== connect ===== */
.dm-muted { color: var(--dl-grey-4); }
.dm-deflist > div { display: grid; grid-template-columns: 140px 1fr; gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--dl-grey-1); font-size: 12.5px; }
.dm-deflist dt { font-family: var(--dl-font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dl-grey-3); }
.dm-drawer-sub { margin: var(--dl-space-6) 0 var(--dl-space-3); font-family: var(--dl-font-display); font-size: 14px; font-weight: 600; }
.dm-catalogue { margin-top: var(--dl-space-4); border-top: var(--dl-hairline); }
.dm-catalogue li { border-bottom: 1px solid var(--dl-grey-1); }
.dm-catalogue button { display: flex; flex-direction: column; gap: 3px; width: 100%; padding: 11px 4px; background: none; border: 0; text-align: left; cursor: pointer; }
.dm-catalogue button:hover { background: var(--dl-blue-wash); }
.dm-cat-name { font-size: 13px; font-weight: 600; }
.dm-cat-meta { font-family: var(--dl-font-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--dl-grey-3); }
.dm-connect-lead { font-size: 12.5px; line-height: 1.6; color: var(--dl-grey-4); }
.dm-field { display: flex; flex-direction: column; gap: 8px; margin-top: var(--dl-space-5); }
.dm-field span { font-family: var(--dl-font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dl-grey-4); }
.dm-field input { padding: 11px 13px; border: var(--dl-hairline); background: var(--dl-canvas); font-size: 13px; color: var(--dl-ink); }
.dm-field input:focus { border-color: var(--dl-blue); outline: none; }
.dm-connect-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: var(--dl-space-6); }
```

- [ ] **Step 9: Run the tests, build and commit**

```bash
npm test && npm run typecheck && npm run build:demo
git add design-system/demo/ website/demo/
git commit -m "feat(demo): connect screen, connector catalogue and scan flow"
```

Expected: PASS, 7 connect tests plus everything prior.

---

### Task 11: Ready screen and readiness data

**Files:**
- Create: `design-system/demo/data/readiness.ts`
- Create: `design-system/demo/screens/Ready.tsx`
- Modify: `design-system/demo/routes.ts`, `design-system/demo/demo.css`
- Test: `design-system/demo/test/ready.test.tsx`

**Interfaces:**
- Consumes: `DOMAINS`, `ESTATE`, `SOURCES`, `ScoreMeter`, `TrendLine`, `DomainBars`, `DimensionRadar`, `Panel`, `DataTable`, `StatusPill`.
- Produces: `DIMENSIONS: Dimension[]`, `TREND: TrendPoint[]`, `RED_FLAGS: RedFlag[]`, `Ready`.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/ready.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { Ready } from '../screens/Ready'
import { DIMENSIONS, TREND, RED_FLAGS } from '../data/readiness'
import { DOMAINS, ESTATE } from '../data/tenant'
import { SOURCES } from '../data/sources'

describe('readiness data', () => {
  it('scores the five dimensions the product names', () => {
    expect(DIMENSIONS.map(d => d.label)).toEqual([
      'Completeness', 'Freshness', 'Consistency', 'Semantic coverage', 'Governance coverage',
    ])
  })

  it('trends four quarters, ending on the current estate score', () => {
    expect(TREND).toHaveLength(4)
    expect(TREND[TREND.length - 1].value).toBe(ESTATE.score)
  })

  it('rises across the trend by the stated delta', () => {
    expect(TREND[3].value - TREND[2].value).toBe(ESTATE.scoreDelta)
  })

  it('points every red flag at a real source', () => {
    const ids = new Set(SOURCES.map(s => s.id))
    expect(RED_FLAGS.length).toBeGreaterThanOrEqual(5)
    for (const f of RED_FLAGS) expect(ids.has(f.sourceId), f.sourceId).toBe(true)
  })

  it('gives every red flag a count a data team can act on', () => {
    for (const f of RED_FLAGS) expect(f.count).toBeGreaterThan(0)
  })
})

describe('Ready screen', () => {
  it('leads with the estate score and its trend', () => {
    render(<Ready />)
    expect(screen.getByRole('meter', { name: /agent-readiness/i })).toBeDefined()
    expect(screen.getByRole('img', { name: /by quarter/i })).toBeDefined()
  })

  it('shows all eight domains, unlike the overview', () => {
    render(<Ready />)
    const panel = screen.getByRole('region', { name: /readiness by domain/i })
    expect(within(panel).getAllByRole('listitem')).toHaveLength(DOMAINS.length)
  })

  it('lists the red flags with a route into pipelines', () => {
    render(<Ready />)
    const panel = screen.getByRole('region', { name: /red flags/i })
    expect(within(panel).getAllByRole('link', { name: /send to pipelines/i }).length).toBe(RED_FLAGS.length)
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/ready.test.tsx`
Expected: FAIL — cannot resolve `../data/readiness`.

- [ ] **Step 3: Write `demo/data/readiness.ts`**

```ts
import type { Dimension } from '../components/charts/DimensionRadar'
import type { TrendPoint } from '../components/charts/TrendLine'
import type { DomainKey } from './types'

export const DIMENSIONS: Dimension[] = [
  { label: 'Completeness', value: 82 },
  { label: 'Freshness', value: 64 },
  { label: 'Consistency', value: 74 },
  { label: 'Semantic coverage', value: 58 },
  { label: 'Governance coverage', value: 79 },
]

export const TREND: TrendPoint[] = [
  { label: 'Q3 25', value: 52 },
  { label: 'Q4 25', value: 59 },
  { label: 'Q1 26', value: 65 },
  { label: 'Q2 26', value: 71 },
]

export type FlagSeverity = 'high' | 'medium' | 'low'

export interface RedFlag {
  id: string
  severity: FlagSeverity
  title: string
  detail: string
  sourceId: string
  domain: DomainKey
  /** Records or columns affected — the number that justifies the fix. */
  count: number
  unit: string
}

export const RED_FLAGS: RedFlag[] = [
  { id: 'f1', severity: 'high', title: 'Unmasked PII in customer contacts',
    detail: 'Email, phone and national ID stored in clear text.',
    sourceId: 'salesforce', domain: 'broker-network', count: 12, unit: 'columns' },
  { id: 'f2', severity: 'high', title: 'Duplicate policyholder records',
    detail: 'The same person appears under several broker submissions.',
    sourceId: 'guidewire-pc', domain: 'policies', count: 41_208, unit: 'records' },
  { id: 'f3', severity: 'medium', title: 'Untyped columns block semantic search',
    detail: 'No semantic type, so agents cannot tell a premium from a payout.',
    sourceId: 'snowflake-claims-mart', domain: 'claims', count: 380, unit: 'columns' },
  { id: 'f4', severity: 'medium', title: 'Underwriting files not refreshed',
    detail: 'Last sync 21 days ago — freshness is dragging the domain score down.',
    sourceId: 'sharepoint-uw', domain: 'underwriting', count: 21, unit: 'days stale' },
  { id: 'f5', severity: 'medium', title: 'Treaty documents unchunked',
    detail: 'Long PDFs cannot be retrieved at clause level until they are chunked.',
    sourceId: 'sharepoint-treaty', domain: 'reinsurance', count: 22_470, unit: 'documents' },
  { id: 'f6', severity: 'low', title: 'Compliance archive lacks retention labels',
    detail: 'Policy cannot be enforced on records with no retention class.',
    sourceId: 'exchange-compliance', domain: 'compliance', count: 8_940, unit: 'records' },
]

export const flagCount = (unit: string): number =>
  RED_FLAGS.filter(f => f.unit === unit).reduce((sum, f) => sum + f.count, 0)
```

The counts in `f1`–`f5` are the same numbers the Pipelines plan quotes in Task 12. They agree because Task 17 asserts they do — a red flag saying 41,208 duplicates and a pipeline step saying 39,000 would be the kind of detail a sharp prospect notices.

- [ ] **Step 4: Write `demo/screens/Ready.tsx`**

Compose: `PageHead` (eyebrow `Stage 02 — Ready`, title *A score for how usable this estate is*), a two-column row holding `ScoreMeter` plus `TrendLine` in one panel and `DimensionRadar` in another,

Render the meter as `<ScoreMeter score={ESTATE.score} delta={ESTATE.scoreDelta} />` with no `caption` prop. Passing a caption overrides the meter's accessible name, and the test in Step 1 looks it up by `/agent-readiness/i`. Give the `TrendLine` the label `Estate score by quarter`.

Then then a full-width `Panel` titled "Readiness by domain" wrapping `<DomainBars domains={DOMAINS} onSelect={...} />`, then a `Panel` titled "Red flags" listing `RED_FLAGS`. Each flag row renders severity as a `StatusPill` (`high`→`warn`, `medium`→`neutral`, `low`→`neutral`), its count and unit in display type, and a link `../pipelines/` labelled "Send to pipelines" carrying `data-demo-link`.

Selecting a domain from `DomainBars` filters the red-flag list to that domain and sets a heading that names it; selecting it again clears the filter.

```tsx
const [domain, setDomain] = useState<DomainKey | null>(null)
const flags = domain ? RED_FLAGS.filter(f => f.domain === domain) : RED_FLAGS
```

- [ ] **Step 5: Wire the route, style, test, build, commit**

```bash
npm test && npm run typecheck && npm run build:demo
git add design-system/demo/ website/demo/
git commit -m "feat(demo): ready screen with dimensions, trend and red flags"
```

Expected: PASS, 8 ready tests plus everything prior.

---

### Task 12: Pipelines screen and pipeline data

**Files:**
- Create: `design-system/demo/data/pipelines.ts`
- Create: `design-system/demo/screens/Pipelines.tsx`
- Modify: `design-system/demo/routes.ts`, `design-system/demo/demo.css`
- Test: `design-system/demo/test/pipelines.test.tsx`

**Interfaces:**
- Consumes: `RED_FLAGS`, `DOMAINS`, `Panel`, `DataTable`, `StatusPill`, `PageHead`.
- Produces: `PLAN: PlanStep[]`, `RUNS: PipelineRun[]`, `LIVE_RUN: LiveRun`, `Pipelines`.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/pipelines.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within, act } from '@testing-library/react'
import { Pipelines } from '../screens/Pipelines'
import { PLAN, RUNS, LIVE_RUN } from '../data/pipelines'
import { DOMAINS } from '../data/tenant'

describe('pipeline data', () => {
  it('quotes the canon counts', () => {
    const counts = Object.fromEntries(PLAN.map(s => [s.kind, s.count]))
    expect(counts.resolve).toBe(41_208)
    expect(counts.type).toBe(380)
    expect(counts.mask).toBe(12)
    expect(counts.chunk).toBe(22_470)
  })

  it('attaches a readiness delta to every step, aimed at a real domain', () => {
    const keys = new Set(DOMAINS.map(d => d.key))
    for (const s of PLAN) {
      expect(s.delta).toBeGreaterThan(0)
      expect(keys.has(s.domain), s.kind).toBe(true)
    }
  })

  it('has run history with durations and outcomes', () => {
    expect(RUNS.length).toBeGreaterThanOrEqual(5)
    for (const r of RUNS) {
      expect(r.duration).toMatch(/m|s|h/)
      expect(['succeeded', 'failed']).toContain(r.outcome)
    }
  })

  it('starts the live run part-way through', () => {
    expect(LIVE_RUN.progress).toBeGreaterThan(0)
    expect(LIVE_RUN.progress).toBeLessThan(100)
  })
})

describe('Pipelines screen', () => {
  it('shows every planned step with the count that justifies it', () => {
    render(<Pipelines />)
    const panel = screen.getByRole('region', { name: /the plan/i })
    expect(within(panel).getByText('41,208')).toBeDefined()
    expect(within(panel).getByText('22,470')).toBeDefined()
  })

  it('reports live progress to assistive tech', () => {
    render(<Pipelines />)
    const bar = screen.getByRole('progressbar', { name: /identity resolution/i })
    expect(Number(bar.getAttribute('aria-valuenow'))).toBeGreaterThan(0)
  })

  it('advances the live run over time', () => {
    vi.useFakeTimers()
    render(<Pipelines />)
    const before = Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'))
    act(() => { vi.advanceTimersByTime(3000) })
    const after = Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'))
    expect(after).toBeGreaterThan(before)
    vi.useRealTimers()
  })

  it('lists run history', () => {
    render(<Pipelines />)
    expect(screen.getByRole('table', { name: /run history/i })).toBeDefined()
  })
})
```

Add `import { vi } from 'vitest'` to the imports.

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/pipelines.test.tsx`
Expected: FAIL — cannot resolve `../data/pipelines`.

- [ ] **Step 3: Write `demo/data/pipelines.ts`**

```ts
import type { DomainKey } from './types'

export type StepKind = 'resolve' | 'type' | 'mask' | 'chunk' | 'embed' | 'normalise'

export interface PlanStep {
  id: string
  kind: StepKind
  title: string
  detail: string
  /** The number that justifies the step. */
  count: number
  unit: string
  /** Points the readiness score would gain. */
  delta: number
  domain: DomainKey
  runtime: string
}

export const PLAN: PlanStep[] = [
  { id: 'p1', kind: 'resolve', title: 'Resolve duplicate policyholders',
    detail: 'Match across Guidewire, Salesforce and the policy mart, then merge.',
    count: 41_208, unit: 'records', delta: 7, domain: 'policies', runtime: '~48 min' },
  { id: 'p2', kind: 'type', title: 'Assign semantic types',
    detail: 'Label premium, payout, deductible and reserve so agents can reason about them.',
    count: 380, unit: 'columns', delta: 6, domain: 'claims', runtime: '~22 min' },
  { id: 'p3', kind: 'mask', title: 'Mask personal data',
    detail: 'Hash national ID, redact email and phone at serving time.',
    count: 12, unit: 'columns', delta: 5, domain: 'broker-network', runtime: '~6 min' },
  { id: 'p4', kind: 'chunk', title: 'Chunk treaty and contract documents',
    detail: 'Clause-level chunks so retrieval returns the term, not the file.',
    count: 22_470, unit: 'documents', delta: 9, domain: 'reinsurance', runtime: '~2 h 10 min' },
  { id: 'p5', kind: 'embed', title: 'Embed call transcripts',
    detail: 'Vector index over claim calls for similarity search.',
    count: 312_600, unit: 'transcripts', delta: 4, domain: 'support', runtime: '~1 h 35 min' },
  { id: 'p6', kind: 'normalise', title: 'Normalise underwriting file names',
    detail: 'Consistent naming so the ontology can bind files to submissions.',
    count: 18_400, unit: 'files', delta: 6, domain: 'underwriting', runtime: '~40 min' },
]

export interface LiveRun {
  stepId: string
  label: string
  /** Starting percentage. The screen advances it on a timer. */
  progress: number
  processed: number
  total: number
}

export const LIVE_RUN: LiveRun = {
  stepId: 'p1',
  label: 'Identity resolution — policyholders',
  progress: 38,
  processed: 15_659,
  total: 41_208,
}

export interface PipelineRun {
  id: string
  title: string
  finished: string
  duration: string
  records: number
  delta: number
  outcome: 'succeeded' | 'failed'
}

export const RUNS: PipelineRun[] = [
  { id: 'r1', title: 'Chunk FNOL documents', finished: 'yesterday', duration: '1 h 04 m', records: 18_220, delta: 5, outcome: 'succeeded' },
  { id: 'r2', title: 'Mask compliance archive', finished: '2 days ago', duration: '12 m', records: 8_940, delta: 3, outcome: 'succeeded' },
  { id: 'r3', title: 'Type policy mart columns', finished: '4 days ago', duration: '31 m', records: 264, delta: 4, outcome: 'succeeded' },
  { id: 'r4', title: 'Embed broker mail threads', finished: '6 days ago', duration: '8 m', records: 0, delta: 0, outcome: 'failed' },
  { id: 'r5', title: 'Resolve claim participants', finished: 'last week', duration: '2 h 18 m', records: 96_400, delta: 8, outcome: 'succeeded' },
]
```

- [ ] **Step 4: Write `demo/screens/Pipelines.tsx`**

`PageHead` with eyebrow `Stage 03 — Pipelines` and title *The restructuring this estate actually needs*. Then a live-run panel, the plan, and run history.

The live run advances on an interval and must start from the static `LIVE_RUN.progress` so the first render matches the server's:

```tsx
const [progress, setProgress] = useState(LIVE_RUN.progress)

useEffect(() => {
  const id = setInterval(() => setProgress(p => (p >= 96 ? 96 : p + 2)), 1400)
  return () => clearInterval(id)
}, [])

const processed = Math.round((LIVE_RUN.total * progress) / 100)
```

Render the bar as:

```tsx
<div className="dm-progress" role="progressbar" aria-label={LIVE_RUN.label}
     aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
  <i style={{ width: `${progress}%` }} />
</div>
<p className="dm-run-meta">
  {processed.toLocaleString('en-US')} of {LIVE_RUN.total.toLocaleString('en-US')} records · {LIVE_RUN.label}
</p>
```

It stops at 96 rather than completing, because a run that finishes while a prospect watches leaves the screen empty of motion for the rest of the visit.

The plan renders each `PlanStep` as a row: title and detail on the left, the count in display type with its unit beneath, `+{delta} {domain name}` in blue, the runtime in mono, and a ghost `Run step` button. Run history uses `DataTable` with caption "Run history" and columns title, finished, duration, records, delta, outcome — outcome as a `StatusPill` (`succeeded`→`ok`, `failed`→`warn`).

- [ ] **Step 5: Wire the route, style, test, build, commit**

```bash
npm test && npm run typecheck && npm run build:demo
git add design-system/demo/ website/demo/
git commit -m "feat(demo): pipelines screen with the plan, a live run and history"
```

Expected: PASS, 9 pipeline tests plus everything prior.

---

### Task 13: Graph data and the graph canvas

**Files:**
- Create: `design-system/demo/data/graph.ts`
- Create: `design-system/demo/components/GraphCanvas.tsx`
- Modify: `design-system/demo/demo.css`
- Test: `design-system/demo/test/graph.test.tsx`

**Interfaces:**
- Consumes: `DomainKey`, `SOURCES`.
- Produces: `GRAPH_NODES: GraphNode[]`, `GRAPH_EDGES: GraphEdge[]`, `KNOWLEDGE_BASES: KnowledgeBase[]`, `IDENTITY_MATCH: IdentityMatch`, `nodesForDomain(key)`, and `<GraphCanvas nodes edges selectedId onSelect />`.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/graph.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GraphCanvas } from '../components/GraphCanvas'
import { GRAPH_NODES, GRAPH_EDGES, KNOWLEDGE_BASES, IDENTITY_MATCH, nodesForDomain } from '../data/graph'
import { SOURCES } from '../data/sources'
import { DOMAINS } from '../data/tenant'

describe('graph data', () => {
  it('gives every node a precomputed position inside the viewport', () => {
    expect(GRAPH_NODES.length).toBeGreaterThanOrEqual(24)
    for (const n of GRAPH_NODES) {
      expect(Number.isFinite(n.x) && Number.isFinite(n.y), n.id).toBe(true)
      expect(n.x).toBeGreaterThanOrEqual(0)
      expect(n.x).toBeLessThanOrEqual(1000)
      expect(n.y).toBeGreaterThanOrEqual(0)
      expect(n.y).toBeLessThanOrEqual(640)
    }
  })

  it('connects edges only between nodes that exist', () => {
    const ids = new Set(GRAPH_NODES.map(n => n.id))
    for (const e of GRAPH_EDGES) {
      expect(ids.has(e.from), e.from).toBe(true)
      expect(ids.has(e.to), e.to).toBe(true)
    }
  })

  it('sources every node from real systems', () => {
    const ids = new Set(SOURCES.map(s => s.id))
    for (const n of GRAPH_NODES) {
      expect(n.sourceIds.length).toBeGreaterThan(0)
      for (const s of n.sourceIds) expect(ids.has(s), `${n.id} → ${s}`).toBe(true)
    }
  })

  it('names one knowledge base per domain', () => {
    expect(KNOWLEDGE_BASES).toHaveLength(DOMAINS.length)
    const keys = new Set(DOMAINS.map(d => d.key))
    for (const kb of KNOWLEDGE_BASES) expect(keys.has(kb.domain), kb.domain).toBe(true)
  })

  it('filters nodes by domain', () => {
    const claims = nodesForDomain('claims')
    expect(claims.length).toBeGreaterThan(0)
    expect(claims.length).toBeLessThan(GRAPH_NODES.length)
  })

  it('resolves one identity across three named systems', () => {
    expect(IDENTITY_MATCH.records).toHaveLength(3)
    const ids = new Set(SOURCES.map(s => s.id))
    for (const r of IDENTITY_MATCH.records) expect(ids.has(r.sourceId), r.sourceId).toBe(true)
    expect(IDENTITY_MATCH.evidence.length).toBeGreaterThanOrEqual(2)
  })
})

describe('GraphCanvas', () => {
  const canvas = (onSelect = vi.fn()) =>
    render(<GraphCanvas nodes={GRAPH_NODES} edges={GRAPH_EDGES} selectedId={null} onSelect={onSelect} />)

  it('renders one shape per node and one line per edge', () => {
    const { container } = canvas()
    expect(container.querySelectorAll('[data-node]')).toHaveLength(GRAPH_NODES.length)
    expect(container.querySelectorAll('[data-edge]')).toHaveLength(GRAPH_EDGES.length)
  })

  it('exposes every node as a labelled button', () => {
    canvas()
    expect(screen.getByRole('button', { name: new RegExp(GRAPH_NODES[0].label, 'i') })).toBeDefined()
  })

  it('reports the chosen node', () => {
    const onSelect = vi.fn()
    canvas(onSelect)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(GRAPH_NODES[0].label, 'i') }))
    expect(onSelect).toHaveBeenCalledWith(GRAPH_NODES[0].id)
  })

  it('zooms in and out through its controls', () => {
    const { container } = canvas()
    const before = container.querySelector('svg g')!.getAttribute('transform')
    fireEvent.click(screen.getByRole('button', { name: /zoom in/i }))
    expect(container.querySelector('svg g')!.getAttribute('transform')).not.toBe(before)
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/graph.test.tsx`
Expected: FAIL — cannot resolve `../data/graph`.

- [ ] **Step 3: Write `demo/data/graph.ts`**

Positions are literals on a 1000×640 field, laid out by hand in eight domain clusters so the picture reads as a business, not a hairball. Nothing here is computed at runtime.

```ts
import type { DomainKey } from './types'

export interface GraphNode {
  id: string
  label: string
  /** Entity type — drives the node shape. */
  kind: 'entity' | 'document' | 'event'
  domain: DomainKey
  x: number
  y: number
  /** Instances of this entity in the graph. */
  count: string
  sourceIds: string[]
  freshness: string
  properties: { name: string; type: string; source: string }[]
}

export interface GraphEdge {
  id: string
  from: string
  to: string
  label: string
}

export interface KnowledgeBase {
  domain: DomainKey
  name: string
  entities: string
  score: number
  servedTo: number
}

export interface IdentityMatch {
  entity: string
  records: { sourceId: string; system: string; key: string; label: string }[]
  evidence: string[]
  confidence: number
}

export const GRAPH_NODES: GraphNode[] = [
  { id: 'policyholder', label: 'Policyholder', kind: 'entity', domain: 'policies', x: 500, y: 300,
    count: '412K', sourceIds: ['guidewire-pc', 'salesforce', 'snowflake-policy-mart'],
    freshness: 'synced 18 min ago',
    properties: [
      { name: 'policyholder_id', type: 'identifier', source: 'Guidewire PolicyCenter' },
      { name: 'full_name', type: 'person name · masked', source: 'Salesforce' },
      { name: 'inception_date', type: 'date', source: 'Snowflake POLICY_MART' },
    ] },
  { id: 'policy', label: 'Policy', kind: 'entity', domain: 'policies', x: 330, y: 210,
    count: '640K', sourceIds: ['guidewire-pc', 'duck-creek'], freshness: 'synced 18 min ago',
    properties: [
      { name: 'policy_number', type: 'identifier', source: 'Guidewire PolicyCenter' },
      { name: 'premium', type: 'currency', source: 'Duck Creek Policy' },
    ] },
  { id: 'claim', label: 'Claim', kind: 'entity', domain: 'claims', x: 690, y: 210,
    count: '1.1M', sourceIds: ['guidewire-cc', 'snowflake-claims-mart'], freshness: 'synced 14 min ago',
    properties: [
      { name: 'claim_number', type: 'identifier', source: 'Guidewire ClaimCenter' },
      { name: 'reserve_amount', type: 'currency', source: 'Snowflake CLAIMS_MART' },
      { name: 'loss_date', type: 'date', source: 'Guidewire ClaimCenter' },
    ] },
  // …at least 24 nodes across all eight domains: Broker, Submission, Quote,
  // Treaty, Cession, Bordereau, Claim call, FNOL document, Contract, Endorsement,
  // Adjuster, Payment, Coverage, Peril, Ticket, Complaint, Retention class, …
]

export const GRAPH_EDGES: GraphEdge[] = [
  { id: 'e1', from: 'policyholder', to: 'policy', label: 'holds' },
  { id: 'e2', from: 'policy', to: 'claim', label: 'claimed against' },
  // …one edge per real relationship between the nodes above
]

export const KNOWLEDGE_BASES: KnowledgeBase[] = [
  { domain: 'policies', name: 'Policies', entities: '1.0M', score: 84, servedTo: 4 },
  { domain: 'claims', name: 'Claims', entities: '1.4M', score: 78, servedTo: 6 },
  // …one per domain, matching DOMAINS exactly
]

export const IDENTITY_MATCH: IdentityMatch = {
  entity: 'Policyholder · Aline Bertrand',
  records: [
    { sourceId: 'salesforce', system: 'Salesforce', key: 'Account 0016R00002mKq', label: 'A. Bertrand' },
    { sourceId: 'snowflake-policy-mart', system: 'Snowflake POLICY_MART', key: 'dim_customer #884201', label: 'BERTRAND, ALINE' },
    { sourceId: 'guidewire-pc', system: 'Guidewire PolicyCenter', key: 'pc:contact:41982', label: 'Aline Bertrand' },
  ],
  evidence: [
    'National ID hash matches across all three systems',
    'Address normalises to the same postal record',
    'Policy number appears in both Guidewire and the policy mart',
  ],
  confidence: 98,
}

export const nodesForDomain = (domain: DomainKey): GraphNode[] =>
  GRAPH_NODES.filter(n => n.domain === domain)
```

- [ ] **Step 4: Write `demo/components/GraphCanvas.tsx`**

Pan and zoom are pure transforms on a `<g>` — the node coordinates never change, which is what keeps SSR and client identical.

```tsx
import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { GraphEdge, GraphNode } from '../data/graph'

export interface GraphCanvasProps {
  nodes: GraphNode[]
  edges: GraphEdge[]
  selectedId: string | null
  onSelect: (id: string) => void
}

const W = 1000, H = 640
const nodeById = (nodes: GraphNode[], id: string) => nodes.find(n => n.id === id)

export function GraphCanvas({ nodes, edges, selectedId, onSelect }: GraphCanvasProps) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null)

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    if ((e.target as Element).closest('[data-node]')) return
    setDrag({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }
  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (drag) setPan({ x: e.clientX - drag.x, y: e.clientY - drag.y })
  }
  const endDrag = () => setDrag(null)

  return (
    <div className="dm-canvas">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="application"
        aria-label="Enterprise knowledge graph"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
          {edges.map(e => {
            const a = nodeById(nodes, e.from), b = nodeById(nodes, e.to)
            if (!a || !b) return null
            return <line key={e.id} data-edge x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="dm-edge" />
          })}
          {nodes.map(n => (
            <g key={n.id} data-node transform={`translate(${n.x} ${n.y})`}>
              <circle
                r={n.id === selectedId ? 15 : 11}
                className={`dm-node is-${n.kind}${n.id === selectedId ? ' is-on' : ''}`}
              />
              <text y={-20} textAnchor="middle" className="dm-node-label">{n.label}</text>
              <circle
                r={20} className="dm-node-hit" role="button" tabIndex={0}
                aria-label={`${n.label} — ${n.count} entities`}
                onClick={() => onSelect(n.id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(n.id) } }}
              />
            </g>
          ))}
        </g>
      </svg>
      <div className="dm-canvas-controls">
        <button type="button" aria-label="Zoom in" onClick={() => setZoom(z => Math.min(z + 0.2, 2.4))}>+</button>
        <button type="button" aria-label="Zoom out" onClick={() => setZoom(z => Math.max(z - 0.2, 0.6))}>−</button>
        <button type="button" aria-label="Reset view" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }) }}>Reset</button>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Append canvas styles, run the tests, commit**

```css
/* ===== graph canvas ===== */
.dm-canvas { position: relative; border: var(--dl-hairline); background: var(--dl-paper); }
.dm-canvas svg { display: block; width: 100%; height: auto; touch-action: none; cursor: grab; }
.dm-edge { stroke: var(--dl-grey-2); stroke-width: 1.2; }
.dm-node { fill: var(--dl-ink); transition: r var(--dl-ease); }
.dm-node.is-document { fill: var(--dl-grey-4); }
.dm-node.is-event { fill: var(--dl-warn); }
.dm-node.is-on { fill: var(--dl-blue); }
.dm-node-hit { fill: transparent; cursor: pointer; }
.dm-node-hit:focus-visible { outline: 2px solid var(--dl-blue); }
.dm-node-label { font-family: var(--dl-font-mono); font-size: 10px; letter-spacing: 0.05em; fill: var(--dl-grey-4); }
.dm-canvas-controls { position: absolute; right: 14px; bottom: 14px; display: flex; gap: 6px; }
.dm-canvas-controls button { padding: 6px 12px; border: var(--dl-hairline); background: var(--dl-paper); font-family: var(--dl-font-mono); font-size: 11px; cursor: pointer; }
.dm-canvas-controls button:hover { background: var(--dl-blue-wash); }
```

```bash
npm test -- demo/test/graph.test.tsx && npm run typecheck
git add design-system/demo/
git commit -m "feat(demo): knowledge graph data and the interactive canvas"
```

Expected: PASS, 10 tests.

---

### Task 14: Graph screen

**Files:**
- Create: `design-system/demo/screens/Graph.tsx`
- Create: `design-system/demo/components/EntityDetail.tsx`
- Create: `design-system/demo/components/IdentityPanel.tsx`
- Modify: `design-system/demo/routes.ts`, `design-system/demo/demo.css`
- Test: `design-system/demo/test/graphScreen.test.tsx`

**Interfaces:**
- Consumes: `GraphCanvas`, `GRAPH_NODES`, `GRAPH_EDGES`, `KNOWLEDGE_BASES`, `IDENTITY_MATCH`, `nodesForDomain`, `Panel`, `PageHead`.
- Produces: `Graph`, `EntityDetail`, `IdentityPanel`.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/graphScreen.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { Graph } from '../screens/Graph'
import { KNOWLEDGE_BASES, GRAPH_NODES, IDENTITY_MATCH } from '../data/graph'

describe('Graph screen', () => {
  it('lists every knowledge base with its score', () => {
    render(<Graph />)
    const list = screen.getByRole('list', { name: /knowledge bases/i })
    expect(within(list).getAllByRole('listitem')).toHaveLength(KNOWLEDGE_BASES.length)
  })

  it('filters the canvas to one knowledge base', () => {
    const { container } = render(<Graph />)
    const all = container.querySelectorAll('[data-node]').length
    fireEvent.click(screen.getByRole('button', { name: /^claims/i }))
    expect(container.querySelectorAll('[data-node]').length).toBeLessThan(all)
  })

  it('shows entity detail with provenance when a node is chosen', () => {
    render(<Graph />)
    const node = GRAPH_NODES[0]
    fireEvent.click(screen.getByRole('button', { name: new RegExp(node.label, 'i') }))
    const detail = screen.getByRole('region', { name: new RegExp(node.label, 'i') })
    expect(within(detail).getByText(node.properties[0].name)).toBeDefined()
    expect(within(detail).getByText(new RegExp(node.properties[0].source, 'i'))).toBeDefined()
    expect(within(detail).getByText(node.freshness)).toBeDefined()
  })

  it('shows the identity resolution across all three systems', () => {
    render(<Graph />)
    const panel = screen.getByRole('region', { name: /resolved across systems/i })
    for (const r of IDENTITY_MATCH.records) {
      expect(within(panel).getByText(r.system)).toBeDefined()
      expect(within(panel).getByText(r.key)).toBeDefined()
    }
    expect(within(panel).getByText(/98/)).toBeDefined()
  })

  it('states that any agent can read it', () => {
    render(<Graph />)
    expect(screen.getByText(/served to/i)).toBeDefined()
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/graphScreen.test.tsx`
Expected: FAIL — cannot resolve `../screens/Graph`.

- [ ] **Step 3: Write `demo/components/EntityDetail.tsx`**

A `Panel` titled with the node label, containing: `count` entities and `freshness` as a meta line; a definition table of `properties` (name, semantic type, originating source); a "Sourced from" line listing the source names; and a lineage line reading `{source} → chunked → embedded → served`.

- [ ] **Step 4: Write `demo/components/IdentityPanel.tsx`**

A `Panel` with `eyebrow="Identity resolution"` and `title="One policyholder, resolved across systems"`. Renders the three `IDENTITY_MATCH.records` as columns joined by `=`, each showing system, key and label; the `evidence` list beneath; and the confidence as `{confidence}% confidence`.

This is the screen's argument. Give it the space — full panel width, the three systems on one row, the equals signs in blue display type.

- [ ] **Step 5: Write `demo/screens/Graph.tsx`**

```tsx
const [domain, setDomain] = useState<DomainKey | null>(null)
const [selectedId, setSelectedId] = useState<string | null>(null)

const nodes = domain ? nodesForDomain(domain) : GRAPH_NODES
const visible = new Set(nodes.map(n => n.id))
const edges = GRAPH_EDGES.filter(e => visible.has(e.from) && visible.has(e.to))
const selected = GRAPH_NODES.find(n => n.id === selectedId) ?? null
```

Layout: `PageHead` (eyebrow `Stage 04 — Graph`, title *One map of the whole business*), then a two-column grid — a 240px left column holding the knowledge-base list (each a button showing name, entity count, score and `served to {n} agents`), and the canvas filling the rest. `EntityDetail` renders under the canvas when a node is selected, `IdentityPanel` when one is not, so the screen is never empty and never crowded.

- [ ] **Step 6: Wire the route, style, test, build, commit**

```bash
npm test && npm run typecheck && npm run build:demo
git add design-system/demo/ website/demo/
git commit -m "feat(demo): graph screen with knowledge bases and identity resolution"
```

Expected: PASS, 5 graph-screen tests plus everything prior.

---

### Task 15: Use cases screen

**Files:**
- Create: `design-system/demo/screens/UseCases.tsx`
- Create: `design-system/demo/components/UseCaseDrawer.tsx`
- Modify: `design-system/demo/routes.ts`, `design-system/demo/demo.css`
- Test: `design-system/demo/test/useCasesScreen.test.tsx`

**Interfaces:**
- Consumes: `USE_CASES`, `topUseCases`, `SOURCES`, `DOMAINS`, `Drawer`, `DataTable`, `FilterBar`, `StatusPill`, `PageHead`.
- Produces: `UseCases`, `UseCaseDrawer`.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/useCasesScreen.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { UseCases } from '../screens/UseCases'
import { USE_CASES } from '../data/useCases'
import { DOMAINS } from '../data/tenant'

describe('Use cases screen', () => {
  it('ranks all 14 by projected impact', () => {
    render(<UseCases />)
    const table = screen.getByRole('table', { name: /opportunities/i })
    expect(within(table).getAllByRole('row')).toHaveLength(USE_CASES.length + 1)
  })

  it('filters to the blocked ones', () => {
    render(<UseCases />)
    fireEvent.click(screen.getByRole('button', { name: 'blocked' }))
    const rows = within(screen.getByRole('table', { name: /opportunities/i })).getAllByRole('row').slice(1)
    expect(rows).toHaveLength(5)
  })

  it('names the domain holding a blocked use case back, with its score', () => {
    render(<UseCases />)
    const blocked = USE_CASES.find(u => u.status === 'blocked')!
    const domain = DOMAINS.find(d => d.key === blocked.blockedBy)!
    fireEvent.click(screen.getByRole('button', { name: blocked.name }))
    const drawer = screen.getByRole('dialog', { name: blocked.name })
    expect(within(drawer).getByText(new RegExp(domain.name, 'i'))).toBeDefined()
    expect(within(drawer).getByText(String(domain.score))).toBeDefined()
  })

  it('links a blocked use case back to readiness', () => {
    render(<UseCases />)
    const blocked = USE_CASES.find(u => u.status === 'blocked')!
    fireEvent.click(screen.getByRole('button', { name: blocked.name }))
    const link = within(screen.getByRole('dialog')).getByRole('link', { name: /readiness/i })
    expect(link.getAttribute('href')).toContain('ready')
  })

  it('shows bindings, guardrails and export targets', () => {
    render(<UseCases />)
    const ready = USE_CASES.find(u => u.status === 'ready')!
    fireEvent.click(screen.getByRole('button', { name: ready.name }))
    const drawer = screen.getByRole('dialog', { name: ready.name })
    expect(within(drawer).getByText(ready.guardrails[0])).toBeDefined()
    for (const target of ready.exports) expect(within(drawer).getByText(target)).toBeDefined()
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/useCasesScreen.test.tsx`
Expected: FAIL — cannot resolve `../screens/UseCases`.

- [ ] **Step 3: Write `demo/components/UseCaseDrawer.tsx`**

A `Drawer` titled with the use-case name containing, in order: the summary; a "Data bindings" list resolving `sourceIds` to source names via `SOURCES`; the projected impact and effort as a two-up stat row; "Guardrails" as a list; "Eval set" as a fixed line (`142 labelled examples · 89% pass required`); "Export to" as pills for each entry in `exports`.

When `status === 'blocked'`, open the drawer with a warning block before everything else:

```tsx
{useCase.status === 'blocked' && blockedDomain && (
  <div className="dm-blocked">
    <p className="dm-eyebrow">Blocked</p>
    <p>
      <b>{blockedDomain.name}</b> scores <b>{blockedDomain.score}</b> — below the 70 this
      use case needs. Raise it and this becomes buildable.
    </p>
    <a className="dm-panel-link" href="../ready/" data-demo-link>Open its readiness</a>
  </div>
)}
```

That block is the loop closing back to stage 02, and it is the reason a blocked opportunity is worth showing at all.

- [ ] **Step 4: Write `demo/screens/UseCases.tsx`**

`PageHead` with eyebrow `Stage 05 — Use cases` and title *Which agents are worth building*. A `FilterBar` with one group — status, options `ready`, `in-review`, `blocked` — then a `DataTable` with caption "Agent opportunities" sorted by `impactValue` descending, columns: name (a button opening the drawer), sources (count plus the first two names), impact, effort, status pill. Clicking a row or its name button opens `UseCaseDrawer`.

- [ ] **Step 5: Wire the route, style, test, build, commit**

```bash
npm test && npm run typecheck && npm run build:demo
git add design-system/demo/ website/demo/
git commit -m "feat(demo): use cases screen with blueprints and blocked reasons"
```

Expected: PASS, 5 use-case-screen tests plus everything prior.

---

### Task 16: Governance & audit screen

**Files:**
- Create: `design-system/demo/data/governance.ts`
- Create: `design-system/demo/screens/Governance.tsx`
- Create: `design-system/demo/components/AuditStream.tsx`
- Modify: `design-system/demo/routes.ts`, `design-system/demo/demo.css`
- Test: `design-system/demo/test/governance.test.tsx`

**Interfaces:**
- Consumes: `GRAPH_NODES`, `DOMAINS`, `ESTATE`, `Panel`, `DataTable`, `StatusPill`, `PageHead`.
- Produces: `AGENTS: AgentRecord[]`, `POLICIES: Policy[]`, `AUDIT: AuditEntry[]`, `Governance`, `AuditStream`.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/governance.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { Governance } from '../screens/Governance'
import { AGENTS, POLICIES, AUDIT } from '../data/governance'
import { DOMAINS, ESTATE } from '../data/tenant'

describe('governance data', () => {
  it('scopes every agent to domains that exist', () => {
    const keys = new Set(DOMAINS.map(d => d.key))
    expect(AGENTS.length).toBeGreaterThanOrEqual(5)
    for (const a of AGENTS) {
      expect(a.scopes.length).toBeGreaterThan(0)
      for (const s of a.scopes) expect(keys.has(s), `${a.name} → ${s}`).toBe(true)
    }
  })

  it('accounts for every denial in the estate headline', () => {
    const denied = AUDIT.filter(e => e.decision === 'denied')
    expect(denied.length).toBe(ESTATE.agentCallsDenied)
  })

  it('cites a policy on every denial', () => {
    const ids = new Set(POLICIES.map(p => p.id))
    for (const e of AUDIT.filter(e => e.decision === 'denied')) {
      expect(e.policyId, e.id).toBeDefined()
      expect(ids.has(e.policyId!), e.id).toBe(true)
    }
  })

  it('scopes policies down to column and chunk level', () => {
    const levels = new Set(POLICIES.map(p => p.level))
    expect(levels.has('column')).toBe(true)
    expect(levels.has('chunk')).toBe(true)
    expect(levels.has('row')).toBe(true)
  })
})

describe('Governance screen', () => {
  it('lists the agent registry with scopes and denials', () => {
    render(<Governance />)
    const table = screen.getByRole('table', { name: /agents/i })
    expect(within(table).getAllByRole('row')).toHaveLength(AGENTS.length + 1)
  })

  it('lists the policy rules', () => {
    render(<Governance />)
    expect(screen.getByRole('region', { name: /policies/i })).toBeDefined()
  })

  it('shows the audit log with a decision on every row', () => {
    render(<Governance />)
    const log = screen.getByRole('table', { name: /audit log/i })
    const rows = within(log).getAllByRole('row').slice(1)
    expect(rows).toHaveLength(AUDIT.length)
    for (const r of rows) expect(r.textContent).toMatch(/allowed|denied/i)
  })

  it('states that every call is logged', () => {
    render(<Governance />)
    expect(screen.getByText(/100% logged/i)).toBeDefined()
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/governance.test.tsx`
Expected: FAIL — cannot resolve `../data/governance`.

- [ ] **Step 3: Write `demo/data/governance.ts`**

```ts
import type { DomainKey } from './types'

export interface AgentRecord {
  id: string
  name: string
  owner: string
  framework: string
  scopes: DomainKey[]
  calls: string
  denials: number
  lastSeen: string
}

export const AGENTS: AgentRecord[] = [
  { id: 'claims-triage-01', name: 'claims-triage-01', owner: 'Claims Ops', framework: 'LangGraph',
    scopes: ['claims', 'policies'], calls: '84.2K', denials: 1, lastSeen: '4 min ago' },
  { id: 'treaty-reader-02', name: 'treaty-reader-02', owner: 'Reinsurance', framework: 'OpenAI Agents SDK',
    scopes: ['reinsurance', 'contracts'], calls: '31.6K', denials: 0, lastSeen: '18 min ago' },
  { id: 'support-summary-01', name: 'support-summary-01', owner: 'Customer Care', framework: 'CrewAI',
    scopes: ['support', 'claims'], calls: '46.9K', denials: 2, lastSeen: '2 min ago' },
  { id: 'compliance-watch-01', name: 'compliance-watch-01', owner: 'Risk & Compliance', framework: 'LangGraph',
    scopes: ['compliance'], calls: '12.4K', denials: 0, lastSeen: '1 h ago' },
  { id: 'broker-insights-01', name: 'broker-insights-01', owner: 'Distribution', framework: 'n8n',
    scopes: ['broker-network'], calls: '8.9K', denials: 0, lastSeen: 'yesterday' },
]

export type PolicyLevel = 'row' | 'column' | 'chunk'

export interface Policy {
  id: string
  level: PolicyLevel
  rule: string
  applies: string
  enforcedOn: string
}

export const POLICIES: Policy[] = [
  { id: 'pol-pii', level: 'column', rule: 'Mask national ID, email and phone', applies: 'All agents', enforcedOn: '12 columns' },
  { id: 'pol-litigation', level: 'row', rule: 'Hide claims flagged in litigation', applies: 'All agents except legal-review', enforcedOn: '3,180 rows' },
  { id: 'pol-treaty', level: 'chunk', rule: 'Withhold unsigned treaty drafts', applies: 'treaty-reader-02', enforcedOn: '640 chunks' },
  { id: 'pol-salary', level: 'column', rule: 'Deny access to compensation fields', applies: 'All agents', enforcedOn: '6 columns' },
  { id: 'pol-retention', level: 'row', rule: 'Exclude records past retention', applies: 'All agents', enforcedOn: '8,940 rows' },
]

export interface AuditEntry {
  id: string
  when: string
  agentId: string
  query: string
  entities: string
  decision: 'allowed' | 'denied'
  /** Set on every denial. */
  policyId?: string
}

export const AUDIT: AuditEntry[] = [
  { id: 'l1', when: '14:22:07', agentId: 'claims-triage-01', query: 'claim(number=CL-88421) → policy → coverage', entities: 'Claim, Policy, Coverage', decision: 'allowed' },
  { id: 'l2', when: '14:21:58', agentId: 'support-summary-01', query: 'policyholder(id=884201).national_id', entities: 'Policyholder', decision: 'denied', policyId: 'pol-pii' },
  // …at least 18 entries. Exactly 3 carry decision 'denied', matching
  // ESTATE.agentCallsDenied, and each names a policy from POLICIES.
]
```

- [ ] **Step 4: Write `demo/components/AuditStream.tsx`**

A `DataTable` with caption "Audit log", columns: time (mono), agent (mono), query (mono, truncated with `title`), entities, decision (`StatusPill`, `allowed`→`ok`, `denied`→`warn`), policy (the rule text when denied, an em dash otherwise).

- [ ] **Step 5: Write `demo/screens/Governance.tsx`**

`PageHead` with eyebrow `Control` — not a stage number, since governance is not part of the five-stage sequence — and title *Who can touch what, and what they did*. Then a three-tile row (agents registered, calls in 30 days with `100% logged to audit` beneath, denials), a `Panel` titled "Agents" wrapping a `DataTable` of `AGENTS` with scopes rendered as pills, a `Panel` titled "Policies" listing `POLICIES` grouped by level, and a `Panel` titled "Audit log" wrapping `AuditStream`.

- [ ] **Step 6: Wire the route, style, test, build, commit**

```bash
npm test && npm run typecheck && npm run build:demo
git add design-system/demo/ website/demo/
git commit -m "feat(demo): governance screen with agent scopes, policies and audit log"
```

Expected: PASS, 8 governance tests plus everything prior.

---

### Task 17: Cross-screen integrity and determinism guards

**Files:**
- Create: `design-system/demo/test/integrity.test.ts`
- Test: itself

**Interfaces:**
- Consumes: every data module.
- Produces: nothing — this task adds only guards.

These are the tests that stop the demo contradicting itself. A prospect who notices the red flag says 41,208 duplicates and the pipeline step says 39,000 stops believing the rest of the screen.

- [ ] **Step 1: Write the tests**

Create `design-system/demo/test/integrity.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ESTATE, DOMAINS } from '../data/tenant'
import { SOURCES, estateScore } from '../data/sources'
import { RED_FLAGS } from '../data/readiness'
import { PLAN } from '../data/pipelines'
import { USE_CASES } from '../data/useCases'
import { GRAPH_NODES, KNOWLEDGE_BASES } from '../data/graph'
import { AGENTS, AUDIT } from '../data/governance'

const DEMO = new URL('..', import.meta.url).pathname

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) return name === 'test' ? [] : walk(p)
    return /\.(ts|tsx)$/.test(name) ? [p] : []
  })
}

describe('determinism', () => {
  const files = walk(DEMO)

  it('never calls Math.random', () => {
    for (const f of files) {
      expect(readFileSync(f, 'utf8').includes('Math.random'), f).toBe(false)
    }
  })

  it('never reads a clock inside the data layer', () => {
    for (const f of files.filter(f => f.includes('/data/'))) {
      const src = readFileSync(f, 'utf8')
      expect(src.includes('Date.now'), f).toBe(false)
      expect(src.includes('new Date'), f).toBe(false)
    }
  })
})

describe('the numbers agree across screens', () => {
  it('derives the headline score from the domains', () => {
    expect(estateScore()).toBe(ESTATE.score)
  })

  it('matches the connected source count to the headline', () => {
    expect(SOURCES.filter(s => s.status === 'connected')).toHaveLength(ESTATE.sourcesConnected)
  })

  it('quotes the same duplicate count in the red flag and the pipeline step', () => {
    const flag = RED_FLAGS.find(f => f.title.includes('Duplicate'))!
    const step = PLAN.find(s => s.kind === 'resolve')!
    expect(step.count).toBe(flag.count)
  })

  it('quotes the same column count for typing', () => {
    const flag = RED_FLAGS.find(f => f.title.includes('Untyped'))!
    expect(PLAN.find(s => s.kind === 'type')!.count).toBe(flag.count)
  })

  it('quotes the same masking count', () => {
    const flag = RED_FLAGS.find(f => f.title.includes('PII'))!
    expect(PLAN.find(s => s.kind === 'mask')!.count).toBe(flag.count)
  })

  it('quotes the same chunking count', () => {
    const flag = RED_FLAGS.find(f => f.title.includes('unchunked'))!
    expect(PLAN.find(s => s.kind === 'chunk')!.count).toBe(flag.count)
  })

  it('gives every domain a knowledge base and vice versa', () => {
    expect(KNOWLEDGE_BASES.map(k => k.domain).sort()).toEqual(DOMAINS.map(d => d.key).sort())
  })

  it('scores each knowledge base the same as its domain', () => {
    for (const kb of KNOWLEDGE_BASES) {
      expect(kb.score, kb.name).toBe(DOMAINS.find(d => d.key === kb.domain)!.score)
    }
  })

  it('covers every domain with at least one graph node', () => {
    const covered = new Set(GRAPH_NODES.map(n => n.domain))
    for (const d of DOMAINS) expect(covered.has(d.key), d.name).toBe(true)
  })

  it('matches audit denials to the headline denial count', () => {
    expect(AUDIT.filter(e => e.decision === 'denied')).toHaveLength(ESTATE.agentCallsDenied)
  })

  it('sums per-agent denials to the same total', () => {
    expect(AGENTS.reduce((n, a) => n + a.denials, 0)).toBe(ESTATE.agentCallsDenied)
  })

  it('logs only agents that are registered', () => {
    const ids = new Set(AGENTS.map(a => a.id))
    for (const e of AUDIT) expect(ids.has(e.agentId), e.agentId).toBe(true)
  })

  it('blocks use cases only on domains below 70', () => {
    for (const u of USE_CASES.filter(u => u.status === 'blocked')) {
      expect(DOMAINS.find(d => d.key === u.blockedBy)!.score).toBeLessThan(70)
    }
  })
})
```

- [ ] **Step 2: Run them and fix whatever they catch**

Run: `npm test -- demo/test/integrity.test.ts`
Expected: some failures on the first run. Fix the **data**, not the test — if the audit log has four denials and the headline says three, one of them was an accident. If `AGENTS` denials sum wrong, adjust the per-agent counts until they total 3.

- [ ] **Step 3: Run the full suite and commit**

```bash
npm test && npm run typecheck
git add design-system/demo/
git commit -m "test(demo): cross-screen integrity and determinism guards"
```

---

### Task 18: Site integration

**Files:**
- Modify: `design-system/site/components/SiteNav.tsx:8-13`
- Modify: `design-system/site/pages/Home.tsx`
- Modify: `design-system/site/pages/Platform.tsx`
- Modify: `design-system/scripts/build-site.mjs:107-113`
- Test: `design-system/demo/test/integration.test.tsx`

**Interfaces:**
- Consumes: the built demo.
- Produces: a demo link in the marketing navigation and sitemap.

Note the ordering constraint: `build-site.mjs` starts with `rmSync(OUT, …)` where `OUT` is `../website`, which deletes `website/demo/` along with everything else. So `build:site` must always run **before** `build:demo`. Step 4 adds a combined script that enforces it.

- [ ] **Step 1: Write the failing test**

Create `design-system/demo/test/integration.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SiteNav } from '../../site/components/SiteNav'

describe('marketing site integration', () => {
  it('offers the demo in the primary navigation', () => {
    render(<SiteNav current="platform" />)
    const links = screen.getAllByRole('link', { name: /demo/i })
    expect(links.length).toBeGreaterThan(0)
    expect(links[0].getAttribute('href')).toBe('./demo/')
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- demo/test/integration.test.tsx`
Expected: FAIL — no link matching `/demo/i`.

- [ ] **Step 3: Add the link**

In `design-system/site/components/SiteNav.tsx`, add to the `LINKS` array between `platform` and `pricing`:

```ts
  { slug: 'demo', label: 'Demo', href: './demo/' },
```

- [ ] **Step 4: Add the CTA on Home and Platform**

In `site/pages/Home.tsx`, add a secondary button beside the existing hero CTA:

```tsx
<Button variant="ghost" size="lg" href="./demo/">Explore the product</Button>
```

In `site/pages/Platform.tsx`, add the same button to the page intro. Copy rule: the label is "Explore the product" in both places — one action, one name.

- [ ] **Step 5: Add `/demo/` to the sitemap**

In `design-system/scripts/build-site.mjs`, after the `urls` constant is built (around line 109), append the demo entry:

```js
const demoUrl = `  <url><loc>${BASE_URL}/demo/</loc><lastmod>${today}</lastmod></url>`
writeFileSync(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n${demoUrl}\n</urlset>\n`)
```

Only `/demo/` is listed; the inner screens already carry `noindex` from Task 3.

- [ ] **Step 6: Add the combined build script**

In `design-system/package.json`, add:

```json
    "build:all": "npm run build:site && npm run build:demo",
```

- [ ] **Step 7: Run the full build and verify the demo survived**

```bash
npm run build:all
test -f ../website/demo/graph/index.html && echo "demo intact"
```

Expected: `demo intact`. If the file is missing, `build:demo` ran before `build:site` and was deleted.

- [ ] **Step 8: Run the suite and commit**

```bash
npm test && npm run typecheck
git add design-system/ website/
git commit -m "feat(site): link the product demo from nav, home and platform"
```

---

### Task 19: Visual review and the accessibility floor

**Files:**
- Create: `design-system/scripts/shoot-demo.mjs`
- Modify: whichever screens the review finds fault with
- Test: `design-system/demo/test/a11y.test.tsx`

**Interfaces:**
- Consumes: the built demo in `website/demo/`.
- Produces: seven screenshots for review, and a11y guards.

- [ ] **Step 1: Write the accessibility test**

Create `design-system/demo/test/a11y.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { DemoApp } from '../DemoApp'
import { ROUTES } from '../routes'
import { prefixForSlug } from '../router'

describe.each(ROUTES.map(r => [r.slug || 'index', r.slug] as const))('%s screen', (_name, slug) => {
  const setup = () => render(<DemoApp slug={slug} prefix={prefixForSlug(slug)} />)

  it('has exactly one h1', () => {
    const { container } = setup()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('labels every button and link', () => {
    const { container } = setup()
    for (const el of container.querySelectorAll('a, button')) {
      const label = el.textContent?.trim() || el.getAttribute('aria-label')
      expect(label, el.outerHTML.slice(0, 90)).toBeTruthy()
    }
  })

  it('gives every table a caption', () => {
    const { container } = setup()
    for (const t of container.querySelectorAll('table')) {
      expect(t.querySelector('caption')?.textContent, 'table without caption').toBeTruthy()
    }
  })

  it('scopes every column header', () => {
    const { container } = setup()
    for (const th of container.querySelectorAll('th')) {
      expect(th.getAttribute('scope'), th.textContent ?? '').toBe('col')
    }
  })

  it('gives every image role an accessible name', () => {
    const { container } = setup()
    for (const svg of container.querySelectorAll('svg[role="img"], svg[role="application"]')) {
      expect(svg.getAttribute('aria-label'), svg.outerHTML.slice(0, 60)).toBeTruthy()
    }
  })
})
```

- [ ] **Step 2: Run it and fix what it catches**

Run: `npm test -- demo/test/a11y.test.tsx`
Expected: FAIL on at least one screen. Fix the component, not the test.

- [ ] **Step 3: Write `scripts/shoot-demo.mjs`**

```js
// Screenshots every built demo screen for visual review. Requires the demo to
// have been built first: npm run build:demo
import { mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright-core')

const SCREENS = ['', 'connect', 'ready', 'pipelines', 'graph', 'use-cases', 'governance']
const OUT = 'dist-site/shots'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
for (const slug of SCREENS) {
  const page = await ctx.newPage()
  const path = slug === '' ? 'index.html' : `${slug}/index.html`
  await page.goto(`file://${process.cwd()}/../website/demo/${path}`)
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${OUT}/${slug || 'index'}.png`, fullPage: true })
  await page.close()
  console.log('shot', slug || 'index')
}
await browser.close()
```

Add to `package.json`: `"shoot:demo": "node scripts/shoot-demo.mjs",`

- [ ] **Step 4: Build and shoot**

```bash
npm run build:all && npm run shoot:demo
```

Expected: seven PNGs in `design-system/dist-site/shots/`.

- [ ] **Step 5: Look at all seven and fix what is wrong**

Open each screenshot and check, in this order:

1. Does any screen have an empty region, a table with two rows where it should have twenty, or a panel whose content overflows its border?
2. Is the vertical rhythm consistent — 18px between panels, 24px page padding — or does one screen drift?
3. Do the numbers on screen match the canon in this plan's header?
4. Is anything numbered `01`–`05` that is not one of the five stages?
5. Does the graph read as a business, or as a hairball? If nodes overlap or edges cross badly, adjust the literal positions in `data/graph.ts`.

Fix what you find, rebuild, and shoot again until all seven hold up.

- [ ] **Step 6: Verify the demo works with JavaScript disabled**

```bash
node -e "
const { createRequire } = require('module');
const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  await p.goto('file://' + process.cwd() + '/../website/demo/graph/index.html');
  const text = await p.textContent('h1');
  console.log('no-js h1:', text);
  await b.close();
})();
"
```

Expected: the graph screen's heading prints. If it prints nothing, the screen is rendering only after hydration and the SSR pass is broken.

- [ ] **Step 7: Final full verification**

```bash
npm test && npm run typecheck && npm run build:all
```

Expected: every test passes, typecheck is clean, and `website/demo/` holds seven screens plus assets.

- [ ] **Step 8: Commit**

```bash
git add design-system/ website/
git commit -m "feat(demo): accessibility guards and visual review pass"
```

---

## Verification checklist

Run before calling this done:

- [ ] `npm test` — every suite green
- [ ] `npm run typecheck` — clean
- [ ] `npm run build:all` — site then demo, in that order
- [ ] `npm run shoot:demo` — all seven screens reviewed by eye
- [ ] Deep link works: open `website/demo/graph/index.html` directly
- [ ] Navigation works: click through all seven screens without a reload
- [ ] Back button works: navigate three screens deep, then go back
- [ ] The connect flow works: add a source, watch it scan and settle
- [ ] Reset demo returns the estate to its 38 starting rows
- [ ] JavaScript disabled: every screen still renders its content

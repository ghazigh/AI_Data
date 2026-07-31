// This file used to pin a plain-Node test environment, back when it only ever
// read files and compared data. Guards 7 and 8 below render real screens
// (ComponentConfigPanel, Pipelines, ExecutionsTable), which need `document` —
// so this file now runs under the project's default jsdom environment
// (see vitest.config.ts). Node built-ins (fs, path) stay available either
// way: jsdom only adds browser globals on top of the same Node process, it
// doesn't take them away. Careful not to spell out the environment pragma
// itself in a comment — Vitest's scanner matches it anywhere in the file,
// not only at the top, and would silently re-pin this file to Node.
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
// This is a .ts file, not .tsx, per the brief's file list — JSX syntax is a
// TypeScript parser rule tied to the .tsx extension, so guards 7, 8 and 10
// build their elements with createElement instead of JSX angle brackets.
import { createElement } from 'react'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { DemoRoot } from '../DemoRoot'
import { ESTATE, DOMAINS } from '../data/tenant'
import { SOURCES, estateScore } from '../data/sources'
import { RED_FLAGS } from '../data/readiness'
import { PLAN } from '../data/pipelines'
import { USE_CASES } from '../data/useCases'
import { GRAPH_NODES, KNOWLEDGE_BASES, parseCount, nodesForDomain } from '../data/graph'
import { AGENTS, AUDIT, POLICIES } from '../data/governance'
import { ACTIVITY } from '../data/activity'
import { MODALITY_PIPELINES, sourcesForModality } from '../data/modalities'
import { GRAPH_PIPELINES } from '../data/graphPipelines'
import { allEntries, entryById } from '../data/pipelineCatalogue'
import { RUN_HISTORY } from '../data/runHistory'
import type { Modality } from '../data/types'
import { WORKSPACE_ROUTES, DEMO_BASE, hrefFor, routeForPath } from '../routes'
import { triggersFor } from '../data/triggers'
import { executionId, lastExecutionFor } from '../data/executions'
import { buildEntry, defaultStagesFor } from '../data/createPipeline'
import {
  defaultConfigFor,
  projectRun,
  supportsChunkStrategy,
  supportsRedaction,
  isRedactionStage,
} from '../runConfig'
import { DemoStateProvider } from '../state'
import { Pipelines } from '../screens/Pipelines'
import { ExecutionsTable } from '../components/ExecutionsTable'
import { ComponentConfigPanel } from '../components/ComponentConfigPanel'
import { executionStatusPill } from '../components/PipelineTable'

// dirname(fileURLToPath(...)), not `new URL('..', import.meta.url).pathname` —
// under the jsdom environment this file needs for guards 7, 8 and 10, Vite
// treats that `new URL(..., import.meta.url)` shape as a browser asset
// reference and rewrites it to a path existsSync/readdirSync can't resolve
// (the same hazard build.test.ts's own DEMO const documents, there worked
// around by staying on the node environment instead).
const DEMO = dirname(dirname(fileURLToPath(import.meta.url)))

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

  // Widened from just /data/ to every file under demo/: state.tsx (RunRecord
  // ids are a monotonic ref counter, never a timestamp) and RunHistoryTable.tsx
  // (a session run's 'finished' is the fixed literal 'Just now') both promise
  // the same no-clock rule, not only the data layer.
  it('never reads a clock anywhere in the demo', () => {
    for (const f of files) {
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

  it('sums the knowledge base entity counts to the estate total', () => {
    const total = KNOWLEDGE_BASES.reduce((sum, kb) => sum + parseCount(kb.entities), 0)
    expect(total).toBe(parseCount(ESTATE.entitiesResolved))
  })

  it('matches each knowledge base entity count to the sum of its own graph nodes', () => {
    for (const kb of KNOWLEDGE_BASES) {
      const nodeSum = nodesForDomain(kb.domain).reduce((sum, n) => sum + parseCount(n.count), 0)
      expect(nodeSum, kb.name).toBe(parseCount(kb.entities))
    }
  })

  it('covers every domain with at least one graph node', () => {
    const covered = new Set(GRAPH_NODES.map(n => n.domain))
    for (const d of DOMAINS) expect(covered.has(d.key), d.name).toBe(true)
  })

  it('cites only sources that serve the node\'s own domain', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    for (const n of GRAPH_NODES) {
      for (const id of n.sourceIds) {
        const source = byId.get(id)!
        expect(source.domains, `${n.label} cites ${id}, which does not serve ${n.domain}`)
          .toContain(n.domain)
      }
    }
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

  it('claims only operations the cited source can support', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    const NEEDS: { pattern: RegExp; modality: Modality }[] = [
      { pattern: /column/i, modality: 'tables' },
      { pattern: /chunk/i, modality: 'documents' },
      { pattern: /transcrib/i, modality: 'transcripts' },
      { pattern: /ticket/i, modality: 'tickets' },
    ]
    for (const a of ACTIVITY) {
      const source = byId.get(a.sourceId)!
      const text = `${a.subject} ${a.detail}`
      for (const { pattern, modality } of NEEDS) {
        if (!pattern.test(text)) continue
        expect(source.modalities, `"${a.detail}" cites ${a.sourceId}, which has no ${modality}`)
          .toContain(modality)
      }
    }
  })

  it('agrees with the source\'s lastSync on staleness', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    for (const f of RED_FLAGS) {
      if (f.unit !== 'days stale') continue
      const source = byId.get(f.sourceId)!
      expect(source.lastSync, `${f.title} claims ${f.count} days stale but ${source.name}'s lastSync reads "${source.lastSync}"`)
        .toBe(`${f.count} days ago`)
    }
  })

  it('never claims more records or documents than the source holds', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    for (const f of RED_FLAGS) {
      if (f.unit !== 'records' && f.unit !== 'documents') continue
      const source = byId.get(f.sourceId)!
      expect(f.count, `${f.title} claims ${f.count} ${f.unit} from ${source.name}, which holds ${source.records}`)
        .toBeLessThan(source.records)
    }
  })

  it('never claims more entities for a graph node than its cited sources hold', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    for (const n of GRAPH_NODES) {
      const capacity = n.sourceIds.reduce((sum, id) => sum + (byId.get(id)?.records ?? 0), 0)
      expect(parseCount(n.count), `${n.label} claims ${n.count} but its cited sources hold only ${capacity} records`)
        .toBeLessThanOrEqual(capacity)
    }
  })

  it('names only registered agents in policy scope text', () => {
    const ids = new Set(AGENTS.map(a => a.id))
    const AGENT_ID = /[a-z]+-[a-z]+(?:-\d+)?/g
    for (const p of POLICIES) {
      const mentioned = p.applies.match(AGENT_ID) ?? []
      for (const token of mentioned) {
        expect(ids.has(token), `policy "${p.rule}" names ${token}, which is not a registered agent`).toBe(true)
      }
    }
  })

  it('lists only modalities at least one connected source declares', () => {
    const declared = new Set(SOURCES.filter(s => s.status === 'connected').flatMap(s => s.modalities))
    for (const p of MODALITY_PIPELINES) {
      expect(declared.has(p.modality), `${p.label} has no connected source declaring it`).toBe(true)
    }
  })

  it('never claims less volume than its single-modality sources alone hold', () => {
    for (const p of MODALITY_PIPELINES) {
      const floor = sourcesForModality(p.modality)
        .filter(s => s.modalities.length === 1)
        .reduce((n, s) => n + s.records, 0)
      expect(p.volume, `${p.label} claims ${p.volume} but its exclusive sources hold ${floor}`)
        .toBeGreaterThanOrEqual(floor)
    }
  })

  it('derives the graph\'s knowledge bases from the clustering that found them', () => {
    const construct = GRAPH_PIPELINES.find(p => p.id === 'construct')!
    expect(construct.topicsAfter).toBe(KNOWLEDGE_BASES.length)
    expect(construct.topicsAfter).toBe(DOMAINS.length)
  })

  it('cites only real catalogue entries in the run history', () => {
    for (const h of RUN_HISTORY) {
      expect(entryById(h.entryId), `${h.id} cites unknown entry "${h.entryId}"`).toBeDefined()
    }
  })

  it('matches the run history\'s kind to its cited catalogue entry\'s kind', () => {
    for (const h of RUN_HISTORY) {
      const entry = entryById(h.entryId)!
      expect(h.kind, `${h.id} claims kind "${h.kind}" but ${h.entryId} is "${entry.kind}"`).toBe(entry.kind)
    }
  })

  it('matches the run history\'s entryName to its cited catalogue entry\'s name', () => {
    for (const h of RUN_HISTORY) {
      const entry = entryById(h.entryId)!
      expect(h.entryName, `${h.id} names "${h.entryName}" but ${h.entryId} is "${entry.name}"`).toBe(entry.name)
    }
  })

  // lastRun must be structurally incapable of disagreeing with RUN_HISTORY: it is
  // derived as the finished value of this entry's most recent RUN_HISTORY record
  // (successful, failed or cancelled — "last run" means the last time it ran, not
  // just the last time it succeeded), or 'Not yet run' when no record exists.
  it("derives every entry's lastRun from its RUN_HISTORY record instead of a hand-authored string", () => {
    for (const e of allEntries()) {
      const record = RUN_HISTORY.find(h => h.entryId === e.id)
      const expected = record?.finished ?? 'Not yet run'
      expect(e.lastRun, e.name).toBe(expected)
    }
  })

  it("never claims 'Not yet run' for an entry that has a RUN_HISTORY record", () => {
    for (const h of RUN_HISTORY) {
      const entry = entryById(h.entryId)!
      expect(entry.lastRun, `${entry.name} has run ${h.id} on record but still reads 'Not yet run'`).not.toBe('Not yet run')
    }
  })

  // pipelineCatalogue.ts's lastRunFor comment claims "RUN_HISTORY carries at
  // most one record per entryId today (guarded in integrity.test.ts)" — this
  // is that guard.
  it('carries at most one RUN_HISTORY record per catalogue entry', () => {
    expect(new Set(RUN_HISTORY.map(h => h.entryId)).size).toBe(RUN_HISTORY.length)
  })

  // Rule: a RUN_HISTORY record may only claim a positive readinessDelta for a
  // remediation entry when RED_FLAGS no longer carries an open flag for that
  // same domain and the same count — otherwise the flag and the history
  // disagree about whether the gap the flag names is still open.
  it('never claims a readiness delta for a domain whose red flag is still open with the same count', () => {
    for (const h of RUN_HISTORY) {
      if (h.readinessDelta <= 0) continue
      const entry = entryById(h.entryId)!
      if (entry.kind !== 'remediation') continue
      const stillOpen = RED_FLAGS.find(f => f.domain === entry.targetDomain && f.count === entry.baselineRecords)
      expect(
        stillOpen,
        `${h.id} claims +${h.readinessDelta} readiness for ${entry.name}, but red flag ` +
          `"${stillOpen?.title}" still lists ${entry.baselineRecords} as open`
      ).toBeUndefined()
    }
  })

  // Rule: wherever a RUN_HISTORY record's configSummary states a source count
  // ("Full scope, N sources"), N must match the catalogue entry's own
  // sourceIds — parsed independently of however the summary was authored, so
  // a stray literal (like hist-1's old "6 sources" against a 15-source entry)
  // cannot slip past every other check.
  it('matches the source count a run history record states to its catalogue entry\'s own source count', () => {
    for (const h of RUN_HISTORY) {
      const match = /(\d+) sources?\b/.exec(h.configSummary)
      if (!match) continue
      const entry = entryById(h.entryId)!
      expect(
        Number(match[1]),
        `${h.id} claims ${match[1]} sources but ${entry.name} has ${entry.sourceIds.length}`
      ).toBe(entry.sourceIds.length)
    }
  })

  // Rule: a structuring pipeline's schedule must never promise to start again
  // before its own baseline run could finish — otherwise the pipeline would
  // effectively always be running, contradicting a catalogue row that also
  // states a finished 'last run' some time ago. Parses the schedule string
  // independently of pipelineCatalogue.ts's own scheduleFor, so a future hand
  // edit to the label is checked the same as a generator bug.
  it('schedules every structuring pipeline strictly less often than its own baseline runtime', () => {
    const scheduleMinutes = (schedule: string): number => {
      if (schedule === 'Runs hourly') return 60
      if (schedule === 'Runs daily') return 24 * 60
      const hours = /^Runs every (\d+) hours$/.exec(schedule)
      if (hours) return Number(hours[1]) * 60
      const days = /^Runs every (\d+) days$/.exec(schedule)
      if (days) return Number(days[1]) * 24 * 60
      throw new Error(`Unparseable schedule: "${schedule}"`)
    }

    for (const p of MODALITY_PIPELINES) {
      const entry = entryById(`structuring-${p.modality}`)!
      expect(entry.schedule, entry.name).toBeTruthy()
      expect(
        scheduleMinutes(entry.schedule!),
        `${entry.name}'s schedule "${entry.schedule}" is not longer than its own ${entry.baselineMinutes}-minute runtime`
      ).toBeGreaterThan(entry.baselineMinutes)
    }
  })
})

// Task 6's own guards — spec §9. Each prevents a specific way two screens (or
// a screen and its own route) could tell an operator two different things
// about the same pipeline.
//
// Not ten independent protections: §9.3, §9.4, §9.5, §9.6 and §9.9 restate
// assertions that already live in executions.test.ts, triggers.test.ts and
// createPipeline.test.tsx. They are kept here because this file is where
// someone looks for the cross-screen invariants, and each can still genuinely
// fail on a bad edit — but the count should not be read as ten separate nets.
describe('creation and workspace integrity guards (spec §9)', () => {
  // §9.1 — a catalogue entry with no workspace route would be a dead link on
  // the list page: the Name column links to a page the build never wrote.
  //
  // Only the entry-to-route direction is asserted. The reverse ("every
  // workspace route resolves to an entry") cannot fail: routes.tsx builds
  // WORKSPACE_ROUTES by mapping over allEntries(), so a route with no entry
  // behind it is unconstructible, and a guard for it would assert the shape of
  // a `.map()` rather than a product invariant. What can fail is the id space
  // itself — two entries colliding on one id would silently give one pipeline
  // the other's workspace — so that is what the second half checks.
  it('gives every catalogue entry exactly one workspace route, over an id space with no collisions', () => {
    for (const entry of allEntries()) {
      const matches = WORKSPACE_ROUTES.filter(r => r.slug === `pipelines/${entry.id}`)
      expect(matches, entry.id).toHaveLength(1)
    }
    const ids = allEntries().map(e => e.id)
    expect(new Set(ids).size, 'two catalogue entries share an id').toBe(ids.length)
  })

  // §9.2 — hrefFor is what every workspace link on the list page actually
  // writes into the DOM; routeForPath is what the client router (and the
  // build) resolves a browser path back to. If the two ever disagreed, a
  // click that looks like it goes to the right pipeline would land on the
  // wrong one (or nowhere).
  it("round-trips every workspace href hrefFor writes back through routeForPath to the same entry's slug", () => {
    for (const entry of allEntries()) {
      const slug = `pipelines/${entry.id}`
      const href = hrefFor(slug, '')
      const pathname = `${DEMO_BASE}${href}`
      expect(routeForPath(pathname)?.slug, `${pathname} -> `).toBe(slug)
    }
  })

  // §9.3 — the Executions tab scopes its rows to entryById(entryId)! (a
  // non-null assertion): a RUN_HISTORY record citing an id the catalogue
  // doesn't have would throw when that pipeline's own workspace tries to
  // render its own history. Already asserted above under "the numbers agree
  // across screens"; restated here because Task 6 is what made it load-bearing
  // for a screen, not just a data-hygiene rule.
  it('cites only real catalogue entries in RUN_HISTORY, the assumption the Executions tab relies on to resolve entryById(entryId)!', () => {
    for (const h of RUN_HISTORY) {
      expect(entryById(h.entryId), `${h.id} cites unknown entry "${h.entryId}"`).toBeDefined()
    }
  })

  // §9.4 — the Executions tab opens a run's detail drawer by execution id
  // (executionId(row.id)); two rows across the whole demo hashing to the same
  // id would make one drawer open for the wrong run. Already asserted in
  // executions.test.ts in these exact terms; restated here as part of the
  // consolidated cross-screen guard list.
  it('gives every seeded RUN_HISTORY record and every plausible session run id a unique execution id', () => {
    const ids = [
      ...RUN_HISTORY.map(h => executionId(h.id)),
      ...Array.from({ length: 50 }, (_, i) => executionId(`run-${i + 1}`)),
    ]
    expect(new Set(ids).size).toBe(ids.length)
  })

  // §9.5 — the Pipelines list's Trigger column and a structuring workspace's
  // Triggers tab both read triggersFor(entry).find(t => t.kind === 'schedule').
  // If that trigger's own label ever drifted from entry.schedule, the list
  // page's Trigger cell and the catalogue row it was built from would name two
  // different cadences for the same pipeline. Already asserted in
  // triggers.test.ts; restated here as a cross-screen guard.
  it("labels every structuring entry's schedule trigger with exactly entry.schedule", () => {
    for (const entry of allEntries().filter(e => e.kind === 'structuring')) {
      const schedule = triggersFor(entry).find(t => t.kind === 'schedule')
      expect(schedule?.label, entry.name).toBe(entry.schedule)
    }
  })

  // §9.6 — a remediation entry's Triggers tab offers an event trigger worded
  // from a RED_FLAGS entry. If it offered one for a domain with no open flag,
  // the trigger would describe a gap the Ready screen no longer shows as open;
  // if it offered none for a domain that does have an open flag, the Triggers
  // tab would understate how the pipeline actually starts. Already asserted in
  // triggers.test.ts; restated here as a cross-screen guard.
  it("gives a remediation entry a readiness-flag trigger if and only if a RED_FLAGS entry shares its plan step's domain", () => {
    for (const step of PLAN) {
      const entry = entryById(`plan-${step.id}`)!
      const flag = RED_FLAGS.find(f => f.domain === step.domain)
      const event = triggersFor(entry).find(t => t.kind === 'event')
      if (flag) expect(event?.label, step.id).toContain(flag.title)
      else expect(event, step.id).toBeUndefined()
    }
  })

  // §9.7 — ComponentConfigPanel decides which controls a component's panel
  // shows; supportsChunkStrategy/supportsRedaction (runConfig.ts) decide which
  // entries the option even applies to (tables and streams never chunk; only
  // structuring chains with a Mask/Redact stage carry personal data). A panel
  // that offered Chunk strategy on an entry with no Chunk stage, or Personal
  // data on one with no redaction stage, would be a control that does nothing —
  // exactly the "greyed control with no explanation" failure this whole task
  // was told to avoid, just inverted (a live control with no effect). Renders
  // the real panel for every stage of every catalogue entry, not just the
  // predicate functions in isolation.
  it('offers the Chunk strategy control only on a Chunk stage of an entry supportsChunkStrategy allows, and Personal data only on a redaction stage of an entry supportsRedaction allows', () => {
    for (const entry of allEntries()) {
      const config = defaultConfigFor(entry)
      const projection = projectRun(entry, config)
      for (const stage of projection.stages) {
        const { unmount } = render(
          createElement(ComponentConfigPanel, {
            entry,
            config,
            componentId: stage.name,
            onChange: () => {},
            onClose: () => {},
          })
        )
        const expectChunk = supportsChunkStrategy(entry) && stage.name === 'Chunk'
        const expectRedaction = supportsRedaction(entry) && isRedactionStage(stage.name)
        expect(!!screen.queryByText('Chunk strategy'), `${entry.name} / ${stage.name}`).toBe(expectChunk)
        expect(!!screen.queryByText('Personal data'), `${entry.name} / ${stage.name}`).toBe(expectRedaction)
        unmount()
      }
    }
  })

  // §9.8 — the list page's Last execution cell and a workspace's own
  // Executions tab both claim to describe the same pipeline's most recent run.
  // Rendered side by side from one shared DemoStateProvider so this is the
  // actual DOM, not two derivations compared on paper — a mismatch here is an
  // operator seeing "Succeeded 12 min ago" on the list and a different status
  // the moment they open the pipeline.
  it("agrees the list page's Last execution cell with the same entry's first Executions row", () => {
    const entry = entryById('structuring-tables')!
    render(
      createElement(DemoStateProvider, null,
        createElement(Pipelines, null),
        createElement(ExecutionsTable, { entryId: entry.id })
      )
    )

    const listRow = screen.getByRole('link', { name: entry.name }).closest('tr')!
    const execTable = screen.getByRole('table', { name: `${entry.name} executions` })
    const firstDataRow = within(execTable).getAllByRole('row')[1]

    const execution = lastExecutionFor(entry.id, [])
    const pill = executionStatusPill(execution.status)

    expect(within(listRow).getByText(pill.label), 'list status').toBeDefined()
    expect(within(listRow).getByText(execution.label), 'list label').toBeDefined()
    expect(within(firstDataRow).getByText(pill.label), 'executions status').toBeDefined()
    expect(within(firstDataRow).getByText(execution.label), 'executions label').toBeDefined()
  })

  // §9.9 — a created pipeline's id lives in the same id space every workspace
  // route and every RUN_HISTORY entryId reference uses; a collision would let
  // a session-created pipeline silently overwrite a catalogue route. A
  // baselineMinutes of 0 would mean a schedule (structuring) that fires
  // infinitely often, or a chain with a stage claiming a runtime share of a
  // duration that rounds to nothing. Already asserted in
  // createPipeline.test.tsx; restated here as a cross-screen guard against
  // the catalogue's own id space and the routes built from it.
  it("keeps a created pipeline's id out of the catalogue's id space, and its derived runtime at or above one minute", () => {
    const draft = {
      name: 'Integrity guard check',
      kind: 'structuring' as const,
      sourceIds: [SOURCES.find(s => s.status === 'connected')!.id],
      stageNames: defaultStagesFor('structuring'),
    }
    const created = buildEntry(draft, 'created-9001')
    expect(allEntries().some(e => e.id === created.id), created.id).toBe(false)
    expect(created.baselineMinutes).toBeGreaterThanOrEqual(1)
  })

  // §9.11 — the guard that was missing when this contradiction shipped. Every
  // other guard here renders a screen on its own, so none of them could see
  // the chrome and the content disagreeing: creating a pipeline swapped the
  // content pane for the new workspace through local state, never through the
  // router, so AppShell's `current` slug never changed and the breadcrumb went
  // on naming "Pipelines" above a page whose own <h1> was the new pipeline.
  // Mounting DemoApp — shell, breadcrumb and screen together — is what makes
  // that visible to a test.
  it('names the new pipeline in the breadcrumb once creation navigates to its workspace', () => {
    const name = 'Broker submission triage'
    // DemoRoot, not Pipelines on its own — the whole point is that the shell
    // and the screen have to be mounted together for the disagreement to show.
    render(createElement(DemoRoot, { initialSlug: 'pipelines' }))

    fireEvent.click(screen.getByRole('button', { name: /create pipeline/i }))
    const dialog = screen.getByRole('dialog')
    fireEvent.change(within(dialog).getByLabelText(/name/i), { target: { value: name } })
    fireEvent.click(within(dialog).getAllByRole('checkbox')[0])
    fireEvent.click(within(dialog).getByRole('button', { name: /create pipeline/i }))

    // The workspace is showing...
    expect(screen.getByRole('heading', { level: 1, name })).toBeDefined()
    // ...and the breadcrumb names it too, rather than still saying "Pipelines".
    const crumb = document.querySelector('.dm-crumb')!
    expect(crumb.querySelector('b')?.textContent).toBe(name)
  })

  // §9.10 — carried forward from the console build this replaced: that build
  // shipped a heading phrased as an explanation ("How...") and marketing copy
  // ("agent-ready", "two shapes") the console rewrite was explicitly meant to
  // remove. This is the regression guard against either creeping back into
  // the Pipelines area.
  it('titles nothing in the Pipelines area with a "How" heading, and never says "agent-ready" or "two shapes"', () => {
    render(createElement(DemoStateProvider, null, createElement(Pipelines, null)))
    for (const heading of screen.getAllByRole('heading')) {
      expect(heading.textContent, heading.textContent ?? '').not.toMatch(/^how /i)
    }
    expect(screen.queryByText(/agent-ready/i)).toBeNull()
    expect(screen.queryByText(/two shapes/i)).toBeNull()
  })
})

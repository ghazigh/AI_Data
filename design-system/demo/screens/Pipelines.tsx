import { useEffect, useRef, useState } from 'react'
import { PageHead } from '../components/PageHead'
import { PipelineTable } from '../components/PipelineTable'
import { PipelineWorkspace } from '../components/PipelineWorkspace'
import { CreatePipelineDialog } from '../components/CreatePipelineDialog'
import type { SectionKind } from '../data/pipelineCatalogue'
import { lastExecutionFor, type ExecutionStatus } from '../data/executions'
import { useDemoState } from '../state'
import { prefixForSlug } from '../router'
import { hrefFor } from '../routes'

// This screen is always served at /demo/pipelines/ — one level deep — so its
// own workspace links need one '../' back to /demo/ before descending into
// pipelines/<id>/ again. Computed via the same depth-aware helper the build
// script and the router use, rather than a literal, so this stays correct if
// the route's own depth ever changes instead of silently going stale.
const PREFIX = prefixForSlug('pipelines')

/**
 * How often the screen advances every running run one tick, purely to pace a
 * watchable animation on screen — MIN_TICKS/MAX_TICKS in state.tsx govern how
 * many ticks a run actually takes, this just governs how often one fires.
 */
const TICK_MS = 900

const KIND_OPTIONS: { value: SectionKind | ''; label: string }[] = [
  { value: '', label: 'All kinds' },
  { value: 'structuring', label: 'Structuring' },
  { value: 'graph', label: 'Graph' },
  { value: 'remediation', label: 'Remediation' },
]

const STATUS_OPTIONS: { value: ExecutionStatus | ''; label: string }[] = [
  { value: '', label: 'Any status' },
  { value: 'running', label: 'In progress' },
  { value: 'succeeded', label: 'Succeeded' },
  { value: 'failed', label: 'Failed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'none', label: 'Not yet run' },
]

/**
 * Every pipeline in the catalogue, one flat filterable table — no console, no
 * selection, no configure-and-run drawer. An operator lands here to find a
 * pipeline and open it; running one happens in that pipeline's own workspace.
 */
export function Pipelines() {
  const { runs, advanceRuns, allEntriesWithCreated, createPipeline } = useDemoState()
  const hasRunning = runs.some(r => r.status === 'running')

  // advanceRuns is rebuilt on every DemoState update (it closes over `runs`),
  // so it lives in a ref — the effect below depends only on `hasRunning`, and
  // never tears its interval down and rebuilds it on every tick it itself
  // causes. Starts only after mount, so the first render (server or client,
  // runs always empty) is never touched by a timer.
  const advanceRunsRef = useRef(advanceRuns)
  advanceRunsRef.current = advanceRuns

  useEffect(() => {
    if (!hasRunning) return
    const id = setInterval(() => advanceRunsRef.current(), TICK_MS)
    return () => clearInterval(id)
  }, [hasRunning])

  const [kind, setKind] = useState<SectionKind | ''>('')
  const [status, setStatus] = useState<ExecutionStatus | ''>('')
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  // Set only once a pipeline is created this session — this screen then swaps
  // itself for that pipeline's own workspace, which is what "navigate to the
  // new workspace" means for a screen that receives no navigation callback of
  // its own (see routes.ts's routeForSlug for the fallback that lets a later,
  // real link click or Back/Forward reach this same pipeline through the
  // ordinary router instead).
  const [justCreatedId, setJustCreatedId] = useState<string | null>(null)

  const entries = allEntriesWithCreated()
  const running = runs.filter(r => r.status === 'running').length

  const query = search.trim().toLowerCase()
  const shown = entries.filter(e => {
    if (kind && e.kind !== kind) return false
    if (status && lastExecutionFor(e.id, runs).status !== status) return false
    if (query && !`${e.name} ${e.summary}`.toLowerCase().includes(query)) return false
    return true
  })

  if (justCreatedId) {
    return <PipelineWorkspace entryId={justCreatedId} />
  }

  return (
    <>
      <PageHead
        eyebrow="Stage 03 — Pipelines"
        title="Pipelines"
        actions={
          <button type="button" className="dm-btn is-ink" onClick={() => setDialogOpen(true)}>
            Create pipeline
          </button>
        }
      />

      <p className="dm-pipe-count">
        {`${shown.length} pipelines`}
        {running > 0 ? ` · ${running} in progress` : ''}
      </p>

      <div className="dm-filterbar">
        <input
          className="dm-filter-search"
          type="search"
          value={search}
          placeholder="Search pipelines"
          aria-label="Search pipelines"
          onChange={e => setSearch(e.target.value)}
        />
        <label className="dm-filter-select">
          <span className="dm-eyebrow">Kind</span>
          <select value={kind} onChange={e => setKind(e.target.value as SectionKind | '')}>
            {KIND_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
        <label className="dm-filter-select">
          <span className="dm-eyebrow">Status</span>
          <select value={status} onChange={e => setStatus(e.target.value as ExecutionStatus | '')}>
            {STATUS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
      </div>

      {shown.length === 0 ? (
        <p className="dm-list-empty">No pipelines match these filters.</p>
      ) : (
        <div className="dm-panel">
          <PipelineTable entries={shown} prefix={PREFIX} />
        </div>
      )}

      <CreatePipelineDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        existingNames={entries.map(e => e.name)}
        onCreate={draft => {
          const id = createPipeline(draft)
          // Keeps the address bar honest for a pipeline that now genuinely
          // exists this session, and gives Back somewhere real to return to.
          window.history.pushState({ slug: `pipelines/${id}` }, '', hrefFor(`pipelines/${id}`, PREFIX))
          setDialogOpen(false)
          setJustCreatedId(id)
        }}
      />
    </>
  )
}

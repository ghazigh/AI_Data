import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { SOURCES } from './data/sources'
import type { Source } from './data/types'
import type { CatalogueEntry, CatalogueStage, SectionKind } from './data/pipelineCatalogue'
import type { RunConfig, RunProjection } from './runConfig'
import { projectRun } from './runConfig'

export type RunStatus = 'running' | 'completed' | 'cancelled'

export interface RunRecord {
  id: string
  entryId: string
  entryName: string
  kind: SectionKind
  config: RunConfig
  projection: RunProjection
  status: RunStatus
  /** Index into projection.stages of the stage currently in progress (or the last one, once completed). */
  stageIndex: number
  recordsProcessed: number
  /** Ticks elapsed since the run started. advanceRuns() increments this for every running run. */
  ticks: number
}

export interface DemoState {
  sources: Source[]
  /** Adds a source in `scanning` state; the caller settles it to `connected`. */
  connectSource: (source: Source) => void
  /** Completes a scan: a settled source has a score AND a record count. */
  settleSource: (id: string, readiness: number, records: number) => void
  resetDemo: () => void
  runs: RunRecord[]
  startRun: (entry: CatalogueEntry, config: RunConfig) => void
  cancelRun: (runId: string) => void
  /** Advances every running run one tick. Called by an interval in the screen. */
  advanceRuns: () => void
}

const Ctx = createContext<DemoState | null>(null)

/**
 * Fixed number of ticks a run takes to finish, independent of its projected minutes —
 * the screen calls advanceRuns() on a wall-clock interval purely for a watchable
 * animation, not to simulate real elapsed time.
 */
const TICKS_TO_COMPLETE = 24

/** The stage whose cumulative weight first exceeds `fraction`; the last stage once fraction reaches 1. */
const stageIndexForFraction = (stages: CatalogueStage[], fraction: number): number => {
  let cumulative = 0
  for (let i = 0; i < stages.length; i++) {
    cumulative += stages[i].weight
    if (fraction < cumulative) return i
  }
  return Math.max(0, stages.length - 1)
}

/** Pure transition for a single running run. Never touches a run that isn't running. */
const tickRun = (run: RunRecord): RunRecord => {
  if (run.status !== 'running') return run
  const ticks = run.ticks + 1
  const finished = ticks >= TICKS_TO_COMPLETE
  const fraction = Math.min(ticks / TICKS_TO_COMPLETE, 1)
  const total = run.projection.records
  return {
    ...run,
    ticks,
    status: finished ? 'completed' : 'running',
    // Exact match on completion — the UI shows both this and the projection total, and they must agree bit for bit.
    recordsProcessed: finished ? total : Math.round(total * fraction),
    stageIndex: finished
      ? Math.max(0, run.projection.stages.length - 1)
      : stageIndexForFraction(run.projection.stages, fraction),
  }
}

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [sources, setSources] = useState<Source[]>(SOURCES)
  const [runs, setRuns] = useState<RunRecord[]>([])
  // Monotonic counter for run ids — never derived from a clock or a random source.
  const nextRunId = useRef(1)

  const value = useMemo<DemoState>(() => ({
    sources,
    connectSource: s => setSources(prev => (prev.some(p => p.id === s.id) ? prev : [{ ...s, status: 'scanning' }, ...prev])),
    settleSource: (id, readiness, records) =>
      setSources(prev => prev.map(s => (s.id === id ? { ...s, status: 'connected', readiness, records, lastSync: 'Just now' } : s))),
    resetDemo: () => {
      setSources(SOURCES)
      setRuns([])
    },
    runs,
    startRun: (entry, config) => {
      const projection = projectRun(entry, config)
      const record: RunRecord = {
        id: `run-${nextRunId.current++}`,
        entryId: entry.id,
        entryName: entry.name,
        kind: entry.kind,
        config,
        projection,
        status: 'running',
        stageIndex: 0,
        recordsProcessed: 0,
        ticks: 0,
      }
      setRuns(prev => [record, ...prev])
    },
    cancelRun: runId =>
      setRuns(prev => prev.map(r => (r.id === runId && r.status === 'running' ? { ...r, status: 'cancelled' } : r))),
    advanceRuns: () => setRuns(prev => prev.map(tickRun)),
  }), [sources, runs])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useDemoState(): DemoState {
  const v = useContext(Ctx)
  if (!v) throw new Error('useDemoState must be used inside DemoStateProvider')
  return v
}

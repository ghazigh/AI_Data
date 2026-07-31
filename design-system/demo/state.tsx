import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { SOURCES } from './data/sources'
import type { Source } from './data/types'
import type { CatalogueEntry, CatalogueStage, SectionKind } from './data/pipelineCatalogue'
import type { RunConfig, RunProjection } from './runConfig'
import { defaultConfigFor, projectRun } from './runConfig'

/**
 * No 'failed' status: a live run in this demo always finishes or is cancelled, by design —
 * introducing an in-flight failure would either need a real (non-deterministic) failure
 * source or a product decision about which pipeline is scripted to always fail, neither of
 * which belongs here. Failure only ever appears retrospectively, in RUN_HISTORY.
 */
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
  /** Ticks this run takes to finish, fixed at start time by ticksToComplete(projection.minutes). */
  ticksBudget: number
}

export interface DemoState {
  sources: Source[]
  /** Adds a source in `scanning` state; the caller settles it to `connected`. */
  connectSource: (source: Source) => void
  /** Completes a scan: a settled source has a score AND a record count. */
  settleSource: (id: string, readiness: number, records: number) => void
  resetDemo: () => void
  /**
   * The configuration an entry will run with. A pipeline's options are
   * configured component by component in its workspace's Pipeline tab, while the
   * Run button lives in the workspace header — so the configuration can be local
   * to neither. Falls back to the entry's own default until something writes one.
   */
  configFor: (entry: CatalogueEntry) => RunConfig
  /** Replaces one entry's configuration wholesale; leaves every other entry's alone. */
  setConfig: (entryId: string, config: RunConfig) => void
  runs: RunRecord[]
  startRun: (entry: CatalogueEntry, config: RunConfig) => void
  cancelRun: (runId: string) => void
  /** Advances every running run one tick. Called by an interval in the screen. */
  advanceRuns: () => void
}

const Ctx = createContext<DemoState | null>(null)

/**
 * Ticks a run takes to finish, scaled to its projected runtime. Log-scaled so a
 * 900-minute graph build visibly outlasts a 6-minute mask without anyone having to
 * watch it for minutes, and clamped so nothing is instant or interminable. The screen
 * calls advanceRuns() on a wall-clock interval purely for a watchable animation — this
 * budget governs pacing, not simulated elapsed time.
 */
export const MIN_TICKS = 8
export const MAX_TICKS = 40

export const ticksToComplete = (minutes: number): number =>
  Math.min(MAX_TICKS, Math.max(MIN_TICKS, Math.round(4 + 4 * Math.log2(1 + minutes))))

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
  const finished = ticks >= run.ticksBudget
  const fraction = Math.min(ticks / run.ticksBudget, 1)
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
  // Empty until an operator changes something, so every entry starts from
  // defaultConfigFor and the first render is identical on the server and the client.
  const [configs, setConfigs] = useState<Record<string, RunConfig>>({})
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
      setConfigs({})
    },
    configFor: entry => configs[entry.id] ?? defaultConfigFor(entry),
    setConfig: (entryId, config) => setConfigs(prev => ({ ...prev, [entryId]: config })),
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
        ticksBudget: ticksToComplete(projection.minutes),
      }
      setRuns(prev => [record, ...prev])
    },
    cancelRun: runId =>
      setRuns(prev => prev.map(r => (r.id === runId && r.status === 'running' ? { ...r, status: 'cancelled' } : r))),
    advanceRuns: () => setRuns(prev => prev.map(tickRun)),
  }), [sources, runs, configs])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useDemoState(): DemoState {
  const v = useContext(Ctx)
  if (!v) throw new Error('useDemoState must be used inside DemoStateProvider')
  return v
}

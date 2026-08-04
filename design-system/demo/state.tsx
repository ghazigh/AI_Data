import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { SOURCES } from './data/sources'
import type { Source } from './data/types'
import { answerQuestion, type Answer } from './ask'
import { allEntries } from './data/pipelineCatalogue'
import type { CatalogueEntry, CatalogueStage, SectionKind } from './data/pipelineCatalogue'
import type { RunConfig, RunProjection } from './runConfig'
import { defaultConfigFor, projectRun } from './runConfig'
import { buildEntry, type PipelineDraft } from './data/createPipeline'

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

/**
 * The declared, honest settings a pipeline's Settings tab stores and displays.
 * defaultDryRun reaches the header's Run action for a remediation entry (see
 * PipelineWorkspace); notifyOnFailure and retentionDays are stored and shown
 * and nothing else in the demo reads them — there is no failure-notification
 * or retention system here to wire them into.
 */
export interface PipelineSettings {
  defaultDryRun: boolean
  notifyOnFailure: boolean
  retentionDays: 30 | 90 | 365
}

export const DEFAULT_SETTINGS: PipelineSettings = {
  defaultDryRun: false,
  notifyOnFailure: true,
  retentionDays: 90,
}

/**
 * One entry in the search agent's transcript. Attaching and detaching are turns
 * of their own, not just a change to a chip row: the moment the agent stops
 * answering about the data and starts answering from it is the thing Stage 05
 * is demonstrating, and a transcript that skipped it would hide the demo's
 * whole point.
 */
export type AskTurn =
  | { id: string; kind: 'ask'; question: string; answer: Answer }
  | { id: string; kind: 'attach'; datasetId: string }
  | { id: string; kind: 'detach'; datasetId: string }

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
  /** Whether one trigger (keyed by its own Trigger.id, not the entry id — an
   * entry can offer more than one switchable trigger) is on. Defaults to on
   * until an operator switches it off. */
  triggerEnabled: (id: string) => boolean
  setTriggerEnabled: (id: string, enabled: boolean) => void
  /** An entry's declared settings, defaulting to DEFAULT_SETTINGS until something writes one. */
  settingsFor: (entryId: string) => PipelineSettings
  setSettings: (entryId: string, settings: PipelineSettings) => void
  /** Every pipeline created this session, in creation order. */
  createdPipelines: CatalogueEntry[]
  /** Builds and stores a new entry from a validated draft, returning its new id
   * (a monotonic 'created-<n>' — see nextCreatedId below, never a catalogue id). */
  createPipeline: (draft: PipelineDraft) => string
  /** The catalogue plus every session-created pipeline — what the list page,
   * the Overview strip's count and a workspace's own id lookup all read,
   * so none of the three can disagree about which pipelines exist. */
  allEntriesWithCreated: () => CatalogueEntry[]
  /** The search agent's transcript, oldest first. Empty on the server and on
   * the client's first render, so the panel hydrates to identical markup. */
  askTurns: AskTurn[]
  /** Source ids the agent is currently specialised on. Empty means it answers
   * about the estate; non-empty means it answers from these datasets. */
  attachedDatasetIds: string[]
  /** Answers a question at whatever altitude the current attachments imply,
   * and records both in the transcript. */
  ask: (question: string) => void
  attachDataset: (sourceId: string) => void
  detachDataset: (sourceId: string) => void
  /** Empties the transcript and detaches everything — the agent forgets. */
  clearAsk: () => void
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
  // Empty until an operator flips a switch on the Triggers tab, keyed by each
  // trigger's own id (data/triggers.ts) so two switchable triggers on the same
  // entry — a structuring pipeline's schedule and its event trigger — hold
  // independent state.
  const [triggerOverrides, setTriggerOverrides] = useState<Record<string, boolean>>({})
  // Empty until an operator changes something on the Settings tab, keyed by entryId.
  const [settingsOverrides, setSettingsOverrides] = useState<Record<string, PipelineSettings>>({})
  // Monotonic counter for run ids — never derived from a clock or a random source.
  const nextRunId = useRef(1)
  // Pipelines created this session. Empty until the Create pipeline dialog
  // succeeds, so a fresh load (server or client) never differs.
  const [createdPipelines, setCreatedPipelines] = useState<CatalogueEntry[]>([])
  // Monotonic counter for created-pipeline ids, same discipline as nextRunId —
  // never a clock or a random source, and never reset on resetDemo (matching
  // nextRunId's own convention), so an id already handed out is never reused.
  const nextCreatedId = useRef(1)
  // The search agent's session: transcript and current specialisation. Both
  // empty until an operator asks something, so a fresh load (server or client)
  // renders the same empty composer.
  const [askTurns, setAskTurns] = useState<AskTurn[]>([])
  const [attachedDatasetIds, setAttachedDatasetIds] = useState<string[]>([])
  // Monotonic, same discipline as nextRunId — a turn id never comes from a
  // clock or a random source, so two renders of the same transcript agree.
  const nextAskId = useRef(1)

  const value = useMemo<DemoState>(() => ({
    sources,
    connectSource: s => setSources(prev => (prev.some(p => p.id === s.id) ? prev : [{ ...s, status: 'scanning' }, ...prev])),
    settleSource: (id, readiness, records) =>
      setSources(prev => prev.map(s => (s.id === id ? { ...s, status: 'connected', readiness, records, lastSync: 'Just now' } : s))),
    resetDemo: () => {
      setSources(SOURCES)
      setRuns([])
      setConfigs({})
      setTriggerOverrides({})
      setSettingsOverrides({})
      setCreatedPipelines([])
      setAskTurns([])
      setAttachedDatasetIds([])
    },
    configFor: entry => configs[entry.id] ?? defaultConfigFor(entry),
    setConfig: (entryId, config) => setConfigs(prev => ({ ...prev, [entryId]: config })),
    triggerEnabled: id => triggerOverrides[id] ?? true,
    setTriggerEnabled: (id, enabled) => setTriggerOverrides(prev => ({ ...prev, [id]: enabled })),
    settingsFor: entryId => settingsOverrides[entryId] ?? DEFAULT_SETTINGS,
    setSettings: (entryId, next) => setSettingsOverrides(prev => ({ ...prev, [entryId]: next })),
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
    createdPipelines,
    createPipeline: draft => {
      const id = `created-${nextCreatedId.current++}`
      setCreatedPipelines(prev => [...prev, buildEntry(draft, id)])
      return id
    },
    allEntriesWithCreated: () => [...allEntries(), ...createdPipelines],
    askTurns,
    attachedDatasetIds,
    ask: question => {
      const text = question.trim()
      if (!text) return
      // The answer is computed once, here, and stored — not derived at render
      // time from the current attachments. A transcript whose earlier answers
      // silently rewrote themselves every time a dataset was attached would be
      // lying about what the agent said when it said it.
      const answer = answerQuestion(text, attachedDatasetIds)
      setAskTurns(prev => [...prev, { id: `ask-${nextAskId.current++}`, kind: 'ask', question: text, answer }])
    },
    attachDataset: sourceId => {
      if (attachedDatasetIds.includes(sourceId)) return
      if (!SOURCES.some(s => s.id === sourceId && s.status === 'connected')) return
      setAttachedDatasetIds(prev => [...prev, sourceId])
      setAskTurns(prev => [...prev, { id: `ask-${nextAskId.current++}`, kind: 'attach', datasetId: sourceId }])
    },
    detachDataset: sourceId => {
      if (!attachedDatasetIds.includes(sourceId)) return
      setAttachedDatasetIds(prev => prev.filter(id => id !== sourceId))
      setAskTurns(prev => [...prev, { id: `ask-${nextAskId.current++}`, kind: 'detach', datasetId: sourceId }])
    },
    clearAsk: () => {
      setAskTurns([])
      setAttachedDatasetIds([])
    },
  }), [sources, runs, configs, triggerOverrides, settingsOverrides, createdPipelines, askTurns, attachedDatasetIds])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useDemoState(): DemoState {
  const v = useContext(Ctx)
  if (!v) throw new Error('useDemoState must be used inside DemoStateProvider')
  return v
}

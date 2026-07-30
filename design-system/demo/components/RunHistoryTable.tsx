import { useState } from 'react'
import { Panel } from './Panel'
import { DataTable, type Column } from './DataTable'
import { Drawer } from './Drawer'
import { StatusPill, type PillTone } from './StatusPill'
import { formatMinutes } from './CatalogueSection'
import { useDemoState, type RunRecord } from '../state'
import { RUN_HISTORY, type RunHistoryEntry, type RunOutcome } from '../data/runHistory'
import { entryById } from '../data/pipelineCatalogue'

interface StageExecuted {
  name: string
  records: number
  minutes: number
}

/** One row of run history, whichever of the two sources it came from. */
interface HistoryRow {
  id: string
  entryName: string
  finished: string
  duration: string
  records: number
  readinessDelta: number
  outcome: RunOutcome
  configSummary: string
  note?: string
  /** Present only for a run this session produced — the seeded history has no per-stage detail. */
  stagesExecuted?: StageExecuted[]
  stagesCompleted: number
  stagesTotal: number
}

/** One line describing the scope and options a run was started with, from its RunConfig. */
const summarizeConfig = (run: RunRecord): string => {
  const entry = entryById(run.entryId)!
  const scope = run.config.sourceIds.length === entry.sourceIds.length
    ? `${entry.sourceIds.length} sources, full scope`
    : `${run.config.sourceIds.length} of ${entry.sourceIds.length} sources`

  if (entry.kind === 'structuring') {
    return `${scope}, ${run.config.redact ? 'personal data masked' : 'personal data unmasked'}, ${run.config.chunkStrategy} chunking`
  }
  if (entry.kind === 'graph') {
    return `${scope}, ${run.config.refitModels ? 're-fitting the projection and cluster model' : 'applying the existing projection and cluster model'}`
  }
  return `${scope}${run.config.dryRun ? ', dry run' : ''}`
}

/** A run this session started, once it has left 'running' — completed or cancelled. */
const rowFromRun = (run: RunRecord): HistoryRow => {
  const executed = run.projection.stages.slice(0, run.stageIndex + 1)
  const fraction = Math.min(1, run.ticks / run.ticksBudget)
  const lastStage = executed[executed.length - 1]

  return {
    id: run.id,
    entryName: run.entryName,
    // A fixed literal, same as settleSource's lastSync elsewhere in state.tsx — never
    // computed from a clock, and true for the length of this session either way.
    finished: 'Just now',
    duration: formatMinutes(Math.max(1, Math.round(run.projection.minutes * fraction))),
    records: run.recordsProcessed,
    readinessDelta: run.status === 'completed' ? run.projection.readinessDelta : 0,
    outcome: run.status === 'completed' ? 'succeeded' : 'cancelled',
    configSummary: summarizeConfig(run),
    note: run.status === 'cancelled'
      ? `Cancelled after ${lastStage?.name ?? 'starting'} — the operator stopped it before it finished.`
      : run.projection.warnings.length > 0
      ? run.projection.warnings.join(' ')
      : undefined,
    stagesExecuted: executed.map(s => ({
      name: s.name,
      records: Math.round(s.weight * run.projection.records),
      minutes: Math.max(1, Math.round(s.weight * run.projection.minutes)),
    })),
    stagesCompleted: executed.length,
    stagesTotal: run.projection.stages.length,
  }
}

const rowFromHistory = (h: RunHistoryEntry): HistoryRow => ({
  id: h.id,
  entryName: h.entryName,
  finished: h.finished,
  duration: h.duration,
  records: h.records,
  readinessDelta: h.readinessDelta,
  outcome: h.outcome,
  configSummary: h.configSummary,
  note: h.note,
  stagesCompleted: h.stagesCompleted,
  stagesTotal: h.stagesTotal,
})

const OUTCOME: Record<RunOutcome, { tone: PillTone; label: string }> = {
  succeeded: { tone: 'ok', label: 'Succeeded' },
  failed: { tone: 'warn', label: 'Failed' },
  cancelled: { tone: 'neutral', label: 'Cancelled' },
}

/**
 * Every run that has left the "running" state: what this session produced, newest
 * first (state.runs is itself newest-first, since startRun prepends), followed by
 * the seeded RUN_HISTORY — every seeded entry is at least minutes old, so nothing
 * this session just finished can rank behind one.
 */
export function RunHistoryTable() {
  const { runs } = useDemoState()
  const [openId, setOpenId] = useState<string | null>(null)

  const rows: HistoryRow[] = [
    ...runs.filter(r => r.status !== 'running').map(rowFromRun),
    ...RUN_HISTORY.map(rowFromHistory),
  ]
  const open = rows.find(r => r.id === openId) ?? null

  const columns: Column<HistoryRow>[] = [
    {
      key: 'pipeline',
      header: 'Pipeline',
      sortValue: r => r.entryName,
      render: r => (
        <button type="button" onClick={() => setOpenId(r.id)}>
          {r.entryName}
        </button>
      ),
    },
    { key: 'finished', header: 'Finished', render: r => r.finished },
    { key: 'duration', header: 'Duration', render: r => r.duration },
    { key: 'records', header: 'Records', align: 'end', render: r => r.records.toLocaleString('en-US') },
    {
      key: 'delta',
      header: 'Delta',
      align: 'end',
      sortValue: r => r.readinessDelta,
      render: r => (r.readinessDelta > 0 ? `+${r.readinessDelta}` : `${r.readinessDelta}`),
    },
    { key: 'outcome', header: 'Outcome', render: r => <StatusPill tone={OUTCOME[r.outcome].tone} label={OUTCOME[r.outcome].label} /> },
  ]

  return (
    <Panel title="Run history">
      <DataTable caption="Run history" columns={columns} rows={rows} rowKey={r => r.id} />

      {open && (
        <Drawer open title={open.entryName} onClose={() => setOpenId(null)}>
          <h3 className="dm-drawer-sub">Stages executed</h3>
          {open.stagesExecuted ? (
            <div>
              {open.stagesExecuted.map(s => (
                <div className="dm-stage-row" key={s.name}>
                  <p className="dm-stage-name">{s.name}</p>
                  <p className="dm-stage-count">
                    {s.records.toLocaleString('en-US')}
                    <em>records</em>
                  </p>
                  <p className="dm-stage-runtime">{formatMinutes(s.minutes)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="dm-uc-summary">
              {open.stagesCompleted} of {open.stagesTotal} stages completed
            </p>
          )}

          <h3 className="dm-drawer-sub">Configuration</h3>
          <p className="dm-uc-summary">{open.configSummary}</p>

          {open.note && <p className="dm-cfg-warning">{open.note}</p>}
        </Drawer>
      )}
    </Panel>
  )
}

import { useState } from 'react'
import { Panel } from './Panel'
import { DataTable, type Column } from './DataTable'
import { Drawer } from './Drawer'
import { StatusPill } from './StatusPill'
import { formatMinutes } from '../runConfig'
import { useDemoState, type RunRecord } from '../state'
import { RUN_HISTORY, type RunHistoryEntry } from '../data/runHistory'
import { entryById, type CatalogueEntry } from '../data/pipelineCatalogue'
import { triggersFor } from '../data/triggers'
import { executionId, type ExecutionStatus } from '../data/executions'
import { executionStatusPill } from './PipelineTable'

interface StageExecuted {
  name: string
  records: number
  minutes: number
}

/** One row of this pipeline's execution history, whichever of the two sources it came from. */
interface HistoryRow {
  id: string
  status: ExecutionStatus
  trigger: 'Schedule' | 'Manual'
  finished: string
  duration: string
  records: number
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

/**
 * A run this session started — this entry's, running or already left
 * 'running'. A session run is always triggered by hand: whatever the entry's
 * schedule says, this run began because the operator pressed Run.
 */
const rowFromRun = (run: RunRecord): HistoryRow => {
  const executed = run.projection.stages.slice(0, run.stageIndex + 1)
  const fraction = Math.min(1, run.ticks / run.ticksBudget)
  const lastStage = executed[executed.length - 1]

  return {
    id: run.id,
    status: run.status === 'running' ? 'running' : run.status === 'cancelled' ? 'cancelled' : 'succeeded',
    trigger: 'Manual',
    // A fixed literal, same as settleSource's lastSync elsewhere in state.tsx — never
    // computed from a clock.
    finished: run.status === 'running' ? 'In progress' : 'Just now',
    duration: formatMinutes(Math.max(1, Math.round(run.projection.minutes * fraction))),
    records: run.recordsProcessed,
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

/**
 * A seeded RUN_HISTORY record. Reflects the entry's own schedule — 'Schedule'
 * only where that trigger is still switched on, 'Manual' once an operator
 * has turned it off on the Triggers tab.
 */
const rowFromHistory = (h: RunHistoryEntry, entry: CatalogueEntry, triggerEnabled: (id: string) => boolean): HistoryRow => {
  const schedule = triggersFor(entry).find(t => t.kind === 'schedule')
  return {
    id: h.id,
    status: h.outcome,
    trigger: schedule && triggerEnabled(schedule.id) ? 'Schedule' : 'Manual',
    finished: h.finished,
    duration: h.duration,
    records: h.records,
    configSummary: h.configSummary,
    note: h.note,
    stagesCompleted: h.stagesCompleted,
    stagesTotal: h.stagesTotal,
  }
}

/**
 * Every execution of one pipeline: what this session produced for it, newest
 * first (state.runs is itself newest-first, since startRun prepends),
 * followed by its seeded RUN_HISTORY record if it has one — RUN_HISTORY
 * carries at most one record per entryId.
 */
export function ExecutionsTable({ entryId }: { entryId: string }) {
  const entry = entryById(entryId)!
  const { runs, triggerEnabled } = useDemoState()
  const [openId, setOpenId] = useState<string | null>(null)

  const rows: HistoryRow[] = [
    ...runs.filter(r => r.entryId === entryId).map(rowFromRun),
    ...RUN_HISTORY.filter(h => h.entryId === entryId).map(h => rowFromHistory(h, entry, triggerEnabled)),
  ]
  const open = rows.find(r => r.id === openId) ?? null

  const columns: Column<HistoryRow>[] = [
    {
      key: 'id',
      header: 'Execution ID',
      render: r => (
        <button type="button" className="dm-mono" onClick={() => setOpenId(r.id)}>
          {executionId(r.id)}
        </button>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: r => {
        const pill = executionStatusPill(r.status)
        return <StatusPill tone={pill.tone} label={pill.label} />
      },
    },
    { key: 'trigger', header: 'Trigger', render: r => r.trigger },
    { key: 'finished', header: 'Finished', render: r => r.finished },
    { key: 'duration', header: 'Duration', render: r => r.duration },
    { key: 'records', header: 'Records', align: 'end', render: r => r.records.toLocaleString('en-US') },
  ]

  return (
    <Panel title="Executions">
      {rows.length === 0 ? (
        <p className="dm-exec-empty">No executions yet. Run this pipeline to see it here.</p>
      ) : (
        <DataTable caption={`${entry.name} executions`} columns={columns} rows={rows} rowKey={r => r.id} />
      )}

      {open && (
        <Drawer open title={`Execution ${executionId(open.id)}`} onClose={() => setOpenId(null)}>
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

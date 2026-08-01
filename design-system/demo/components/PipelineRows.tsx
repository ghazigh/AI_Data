import { LiveDot, type DotState } from './telemetry/LiveDot'
import { Sparkline } from './telemetry/Sparkline'
import { KIND_LABEL } from './PipelineTable'
import { hrefFor } from '../navigation'
import type { CatalogueEntry } from '../data/pipelineCatalogue'
import { lastExecutionFor, type ExecutionStatus } from '../data/executions'
import { runHistorySeries, successRate } from '../data/reliability'
import { triggersFor } from '../data/triggers'
import { useDemoState } from '../state'

export interface PipelineRowsProps {
  entries: CatalogueEntry[]
  /** Depth-relative prefix, as written into every href here. */
  prefix: string
}

/** The operator's actual question is not "which pipelines exist" but "what is
 * running, what is broken, and what runs by itself" — so rows group by state
 * rather than sorting by name. */
type GroupId = 'running' | 'attention' | 'scheduled' | 'manual'

const GROUP_LABEL: Record<GroupId, string> = {
  running: 'Running now',
  attention: 'Needs attention',
  scheduled: 'Scheduled',
  manual: 'Manual',
}

const GROUP_ORDER: GroupId[] = ['running', 'attention', 'scheduled', 'manual']

const dotFor = (status: ExecutionStatus): DotState =>
  status === 'running' ? 'run'
  : status === 'failed' ? 'fail'
  : status === 'succeeded' ? 'ok'
  : 'idle'

/** The last-execution wording, kept identical to the pill vocabulary the rest of
 * the demo uses. */
const stateLabel = (status: ExecutionStatus): string =>
  status === 'running' ? 'Running'
  : status === 'succeeded' ? 'Succeeded'
  : status === 'failed' ? 'Failed'
  : status === 'cancelled' ? 'Cancelled'
  : 'Not yet run'

const stateTone = (status: ExecutionStatus): string =>
  status === 'running' ? 'is-run'
  : status === 'failed' ? 'is-fail'
  : status === 'succeeded' ? 'is-ok'
  : 'is-idle'

/**
 * Every pipeline as one intelligent row: state, what it does, how it has behaved
 * over its last 13 runs, how reliable it is, when it next runs, and how it ended.
 * Still a real table — the data is genuinely tabular and a grid gives screen
 * readers column context that a stack of divs cannot.
 */
export function PipelineRows({ entries, prefix }: PipelineRowsProps) {
  const { runs, triggerEnabled } = useDemoState()

  const scheduleFor = (e: CatalogueEntry) => {
    const schedule = triggersFor(e).find(t => t.kind === 'schedule')
    return schedule && triggerEnabled(schedule.id) ? schedule.label : null
  }

  const groupFor = (e: CatalogueEntry, status: ExecutionStatus): GroupId =>
    status === 'running' ? 'running'
    : status === 'failed' ? 'attention'
    : scheduleFor(e) ? 'scheduled'
    : 'manual'

  const rows = entries.map(e => {
    const execution = lastExecutionFor(e.id, runs)
    return { entry: e, execution, group: groupFor(e, execution.status) }
  })

  return (
    <table className="dm-rowtable">
      <caption className="dm-sr">Pipelines, grouped by state</caption>
      <thead className="dm-sr">
        <tr>
          <th scope="col">State</th>
          <th scope="col">Pipeline</th>
          <th scope="col">Run history</th>
          <th scope="col">30-day success</th>
          <th scope="col">Trigger</th>
          <th scope="col">Last execution</th>
        </tr>
      </thead>

      {GROUP_ORDER.map(group => {
        const inGroup = rows.filter(r => r.group === group)
        if (inGroup.length === 0) return null

        return (
          <tbody key={group}>
            <tr className="dm-grouprow">
              <th scope="rowgroup" colSpan={6}>
                {GROUP_LABEL[group]} <span>· {inGroup.length}</span>
              </th>
            </tr>

            {inGroup.map(({ entry: e, execution }) => {
              const rate = successRate(e.id, execution.status)
              const series = runHistorySeries(e.id, execution.status)
              const schedule = scheduleFor(e)
              const running = execution.status === 'running'

              return (
                <tr className={`dm-prow${running ? ' is-live' : ''}`} key={e.id}>
                  <td className="dm-prow-dot"><LiveDot state={dotFor(execution.status)} /></td>

                  <td>
                    <span className="dm-row-name">
                      <a href={hrefFor(`pipelines/${e.id}`, prefix)} data-demo-link>{e.name}</a>
                    </span>
                    <span className="dm-row-meta">
                      <em>{KIND_LABEL[e.kind]}</em>
                      <span>{e.sourceIds.length} {e.sourceIds.length === 1 ? 'source' : 'sources'}</span>
                      <span className="dm-row-chain">{e.stages.map(s => s.name.toLowerCase()).join(' → ')}</span>
                    </span>
                  </td>

                  <td className="dm-prow-spark">
                    <Sparkline
                      points={series}
                      tone={running ? 'run' : execution.status === 'failed' ? 'fail' : 'idle'}
                      dot={running || execution.status === 'failed'}
                      label={series.length
                        ? `Last ${series.length} runs, ${rate}% succeeded`
                        : 'No runs yet'}
                    />
                  </td>

                  <td>
                    <div className={`dm-row-num${rate === null ? ' is-none' : ''}`}>
                      {rate === null ? '—' : `${rate}%`}
                    </div>
                    <div className="dm-row-lbl">30d success</div>
                  </td>

                  <td className="dm-row-mono">{schedule ? schedule.replace(/^Runs /, '') : 'manual'}</td>

                  <td className="dm-row-end">
                    <b className={`dm-row-state ${stateTone(execution.status)}`}>
                      {stateLabel(execution.status)}
                    </b>
                    {execution.label}
                  </td>
                </tr>
              )
            })}
          </tbody>
        )
      })}
    </table>
  )
}

/** Re-exported so callers can render the same summary the groups imply. */
export const stateCounts = (entries: CatalogueEntry[], runs: Parameters<typeof lastExecutionFor>[1]) => {
  let running = 0
  let failed = 0
  for (const e of entries) {
    const status = lastExecutionFor(e.id, runs).status
    if (status === 'running') running++
    else if (status === 'failed') failed++
  }
  return { running, failed, idle: entries.length - running - failed }
}

import { Panel } from './Panel'
import { StatusPill } from './StatusPill'
import { useDemoState } from '../state'

const pluralize = (n: number, word: string): string => `${n} ${word}${n === 1 ? '' : 's'}`

/**
 * What is running on this screen right now, and how far each run has got.
 * Reads straight off DemoState — the screen's own interval advances the
 * ticks that drive this, this component just renders the current snapshot.
 */
export function RunningNow() {
  const { runs, cancelRun } = useDemoState()
  const running = runs.filter(r => r.status === 'running')

  return (
    <Panel
      title="Running now"
      action={running.length > 0 ? <StatusPill tone="blue" label={pluralize(running.length, 'run')} /> : undefined}
    >
      {running.length === 0 ? (
        <p className="dm-run-empty">
          Nothing running. Select a pipeline in one of the sections below, configure it, and run it.
        </p>
      ) : (
        <ul className="dm-runlist">
          {running.map(run => {
            const stage = run.projection.stages[run.stageIndex]
            const percent = Math.min(100, Math.round((run.ticks / run.ticksBudget) * 100))
            return (
              <li key={run.id}>
                <div>
                  <p className="dm-run-name">{run.entryName}</p>
                  <p className="dm-run-stage">
                    Stage {run.stageIndex + 1} of {run.projection.stages.length} · {stage.name}
                  </p>
                </div>
                <div className="dm-run-progress">
                  <div
                    className="dm-progress"
                    role="progressbar"
                    aria-label={run.entryName}
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <i style={{ width: `${percent}%` }} />
                  </div>
                  <p className="dm-run-meta">
                    {run.recordsProcessed.toLocaleString('en-US')} of {run.projection.records.toLocaleString('en-US')} records
                  </p>
                </div>
                <button type="button" className="dm-btn is-ghost" onClick={() => cancelRun(run.id)}>
                  Cancel
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </Panel>
  )
}

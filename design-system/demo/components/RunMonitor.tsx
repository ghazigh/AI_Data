import { LiveDot } from './telemetry/LiveDot'
import { Meter } from './telemetry/Meter'
import { formatMinutes, formatNumber, type RunProjection } from '../runConfig'
import type { RunRecord } from '../state'
import type { CatalogueEntry } from '../data/pipelineCatalogue'
import { executionId } from '../data/executions'
import { RUN_HISTORY } from '../data/runHistory'

export interface RunMonitorProps {
  entry: CatalogueEntry
  /** What a run started now would do — used when nothing is in flight. */
  projection: RunProjection
  /** The newest run for this entry, running or finished. */
  run?: RunRecord
}

/**
 * The workspace's one ink surface. While a run is in flight it is a live monitor:
 * how far through, how fast, and what it has just done. With nothing running it
 * reports the last execution and what the next one would cost — an empty dark
 * box would be worse than no dark box at all.
 */
export function RunMonitor({ entry, projection, run }: RunMonitorProps) {
  const running = run?.status === 'running'
  const seeded = RUN_HISTORY.find(h => h.entryId === entry.id)

  const fraction = run ? Math.min(1, run.ticks / run.ticksBudget) : 0
  const pct = Math.round(fraction * 100)
  const stages = run ? run.projection.stages : projection.stages
  const stageName = run ? stages[Math.min(run.stageIndex, stages.length - 1)]?.name : undefined

  // Elapsed and remaining are the projection's own minutes split by progress —
  // the demo never reads a clock, so these move only as the run advances.
  const totalMinutes = run ? run.projection.minutes : projection.minutes
  const elapsed = formatMinutes(Math.max(1, Math.round(totalMinutes * fraction)))
  const remaining = formatMinutes(Math.max(1, Math.round(totalMinutes * (1 - fraction))))

  const id = run ? executionId(run.id) : seeded ? executionId(seeded.id) : null

  return (
    <section className="dm-ink dm-mon" aria-label="Run monitor">
      <div className="dm-mon-h">
        <p className="dm-mon-t">
          {running ? 'Live run' : seeded || run ? 'Last run' : 'No run yet'}
          {id && <span> · {id}</span>}
        </p>
        {running && <p className="dm-mon-live"><LiveDot state="run" />Streaming</p>}
      </div>

      {running ? (
        <>
          <div className="dm-mon-b">
            <p className="dm-mon-pct">{pct}<span>% complete</span></p>
            <Meter value={pct} tone="run" label={`${pct}% complete`} />
            <p className="dm-mon-meta">
              <span>Elapsed {elapsed}</span>
              <span>{remaining} remaining</span>
            </p>
          </div>
          <div className="dm-mon-kpis">
            <div className="dm-mon-k">
              <p className="dm-mon-kl">Stage</p>
              <p className="dm-mon-kv">{Math.min(run.stageIndex + 1, stages.length)}<small>/{stages.length}</small></p>
            </div>
            <div className="dm-mon-k">
              <p className="dm-mon-kl">Processed</p>
              <p className="dm-mon-kv">{formatNumber(run.recordsProcessed)}</p>
            </div>
            <div className="dm-mon-k">
              <p className="dm-mon-kl">In scope</p>
              <p className="dm-mon-kv">{formatNumber(run.projection.records)}</p>
            </div>
          </div>
          {stageName && (
            <ul className="dm-mon-log">
              <li><span>now</span>{stageName.toLowerCase()} — {formatNumber(run.recordsProcessed)} records</li>
              {stages.slice(0, run.stageIndex).reverse().slice(0, 3).map(s => (
                <li key={s.name}><span>done</span>{s.name.toLowerCase()}</li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <div className="dm-mon-b">
            <p className="dm-mon-pct">
              {seeded ? formatNumber(seeded.records) : formatNumber(projection.records)}
              <span>{seeded ? 'records last run' : 'records in scope'}</span>
            </p>
            <p className="dm-mon-meta">
              <span>{seeded ? `Ran in ${seeded.duration}` : `Projected ${formatMinutes(projection.minutes)}`}</span>
              <span>{seeded ? seeded.finished : 'Never run'}</span>
            </p>
          </div>
          <div className="dm-mon-kpis">
            <div className="dm-mon-k">
              <p className="dm-mon-kl">Stages</p>
              <p className="dm-mon-kv">{projection.stages.length}</p>
            </div>
            <div className="dm-mon-k">
              <p className="dm-mon-kl">Sources</p>
              <p className="dm-mon-kv">{entry.sourceIds.length}</p>
            </div>
            <div className="dm-mon-k">
              <p className="dm-mon-kl">Next run</p>
              <p className="dm-mon-kv is-text">{entry.schedule ?? 'Manual'}</p>
            </div>
          </div>
        </>
      )}

      {projection.readinessDelta > 0 && (
        <p className="dm-mon-impact">
          <b>+{projection.readinessDelta}</b>
          readiness on the domain this pipeline feeds, once it completes.
        </p>
      )}
    </section>
  )
}

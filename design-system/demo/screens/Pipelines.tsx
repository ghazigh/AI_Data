import { useEffect, useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { DataTable, type Column } from '../components/DataTable'
import { StatusPill } from '../components/StatusPill'
import { PLAN, RUNS, LIVE_RUN, type PipelineRun } from '../data/pipelines'
import { domainByKey } from '../data/tenant'

const OUTCOME = { succeeded: { tone: 'ok' as const, label: 'Succeeded' }, failed: { tone: 'warn' as const, label: 'Failed' } }

const COLUMNS: Column<PipelineRun>[] = [
  { key: 'title', header: 'Title', render: r => r.title },
  { key: 'finished', header: 'Finished', render: r => r.finished },
  { key: 'duration', header: 'Duration', render: r => r.duration },
  { key: 'records', header: 'Records', align: 'end', render: r => r.records.toLocaleString('en-US') },
  { key: 'delta', header: 'Delta', align: 'end', render: r => (r.delta > 0 ? `+${r.delta}` : `${r.delta}`) },
  { key: 'outcome', header: 'Outcome', render: r => <StatusPill tone={OUTCOME[r.outcome].tone} label={OUTCOME[r.outcome].label} /> },
]

export function Pipelines() {
  const [progress, setProgress] = useState(LIVE_RUN.progress)
  // Steps the visitor has clicked "Run step" on, each keyed to its own
  // scripted progress — same treatment as the live run above, just started
  // on demand instead of always-on. Empty on first render for both SSR and
  // the client, so the hydration guard stays byte-identical.
  const [runningSteps, setRunningSteps] = useState<Record<string, number>>({})

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => (p >= 96 ? 96 : p + 2))
      setRunningSteps(prev => {
        if (Object.keys(prev).length === 0) return prev
        const next: Record<string, number> = {}
        for (const [stepId, p] of Object.entries(prev)) next[stepId] = Math.min(p + 4, 96)
        return next
      })
    }, 1400)
    return () => clearInterval(id)
  }, [])

  const runStep = (stepId: string) =>
    setRunningSteps(prev => (stepId in prev ? prev : { ...prev, [stepId]: 6 }))

  const processed = Math.round((LIVE_RUN.total * progress) / 100)

  return (
    <>
      <PageHead eyebrow="Stage 03 — Pipelines" title="The restructuring this estate actually needs" />

      <Panel title="Live run" action={<StatusPill tone="blue" label="Running" />}>
        <div className="dm-run">
          <div
            className="dm-progress"
            role="progressbar"
            aria-label={LIVE_RUN.label}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <i style={{ width: `${progress}%` }} />
          </div>
          <p className="dm-run-meta">
            {processed.toLocaleString('en-US')} of {LIVE_RUN.total.toLocaleString('en-US')} records · {LIVE_RUN.label}
          </p>
        </div>
      </Panel>

      <div className="dm-section">
        <Panel title="The plan">
          <ul className="dm-plan">
            {PLAN.map(s => {
              const domain = domainByKey(s.domain)
              const stepProgress = runningSteps[s.id]
              return (
                <li key={s.id}>
                  <div>
                    <p className="dm-plan-t">{s.title}</p>
                    <p className="dm-plan-d">{s.detail}</p>
                  </div>
                  <p className="dm-plan-count">
                    {s.count.toLocaleString('en-US')}
                    <small>{s.unit}</small>
                  </p>
                  <p className="dm-plan-delta">+{s.delta} {domain?.name ?? s.domain}</p>
                  <p className="dm-plan-runtime">{s.runtime}</p>
                  {stepProgress === undefined ? (
                    <button className="dm-btn is-ghost" type="button" onClick={() => runStep(s.id)}>Run step</button>
                  ) : (
                    <div className="dm-plan-running">
                      <div className="dm-progress" role="progressbar" aria-label={s.title}
                        aria-valuenow={stepProgress} aria-valuemin={0} aria-valuemax={100}>
                        <i style={{ width: `${stepProgress}%` }} />
                      </div>
                      <button className="dm-btn is-ghost" type="button" disabled>Running…</button>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </Panel>
      </div>

      <div className="dm-section">
        <Panel title="Run history">
          <DataTable caption="Run history" columns={COLUMNS} rows={RUNS} rowKey={r => r.id} />
        </Panel>
      </div>
    </>
  )
}

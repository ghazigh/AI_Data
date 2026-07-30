import { useEffect, useRef, useState } from 'react'
import { entryById } from '../data/pipelineCatalogue'
import { lastExecutionFor } from '../data/executions'
import { useDemoState } from '../state'
import { defaultConfigFor } from '../runConfig'
import { StatusPill } from './StatusPill'
import { executionStatusPill, KIND_LABEL } from './PipelineTable'
import { WorkspaceTabs, WORKSPACE_PANEL_ID, workspaceTabId, type WorkspaceTab } from './WorkspaceTabs'

const TABS: WorkspaceTab[] = [
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'executions', label: 'Executions' },
  { id: 'triggers', label: 'Triggers' },
  { id: 'settings', label: 'Settings' },
]

/** Same cadence as the Pipelines list screen's own interval (screens/Pipelines.tsx)
 * — a run started from a workspace must keep advancing while the operator is
 * looking at it, on the pacing the rest of the demo already uses. */
const TICK_MS = 900

/** Renders the workspace for one pipeline: a header naming it, its last
 * execution and a run/cancel action, and four tabs over one switching panel.
 * Returns null for an id the catalogue doesn't know, same as the placeholder
 * this replaces. */
export function PipelineWorkspace({ entryId }: { entryId: string }) {
  const entry = entryById(entryId)
  const { runs, startRun, cancelRun, advanceRuns } = useDemoState()
  const [active, setActive] = useState<string>(TABS[0].id)
  // Local for this task only — Task 4 moves this into shared demo state so the
  // configure controls it adds can share it with the run this button starts.
  const [config] = useState(() => (entry ? defaultConfigFor(entry) : null))

  const runningRun = entry ? runs.find(r => r.entryId === entry.id && r.status === 'running') : undefined
  const hasRunning = runningRun !== undefined

  // advanceRuns closes over `runs`, so it's rebuilt on every DemoState update —
  // kept in a ref so the effect below depends only on hasRunning and never
  // tears its interval down and rebuilds it on every tick it itself causes.
  const advanceRunsRef = useRef(advanceRuns)
  advanceRunsRef.current = advanceRuns

  useEffect(() => {
    if (!hasRunning) return
    const id = setInterval(() => advanceRunsRef.current(), TICK_MS)
    return () => clearInterval(id)
  }, [hasRunning])

  if (!entry) return null

  const execution = lastExecutionFor(entry.id, runs)
  const pill = executionStatusPill(execution.status)

  return (
    <section className="dm-workspace">
      <div className="dm-workspace-h">
        <div>
          <p className="dm-eyebrow">{KIND_LABEL[entry.kind]}</p>
          <h1>{entry.name}</h1>
          <p className="dm-workspace-summary">{entry.summary}</p>
        </div>
        <div className="dm-workspace-actions">
          <span className="dm-exec">
            <StatusPill tone={pill.tone} label={pill.label} />
            <span className="dm-exec-label">{execution.label}</span>
          </span>
          {hasRunning ? (
            <button className="dm-btn is-ink" onClick={() => cancelRun(runningRun.id)}>
              Cancel run
            </button>
          ) : (
            <button className="dm-btn is-ink" onClick={() => config && startRun(entry, config)}>
              Run pipeline
            </button>
          )}
        </div>
      </div>

      <WorkspaceTabs tabs={TABS} active={active} onSelect={setActive} />

      <div
        className="dm-workspace-panel"
        id={WORKSPACE_PANEL_ID}
        role="tabpanel"
        aria-labelledby={workspaceTabId(active)}
      >
        {active === 'pipeline' && (
          <ol className="dm-stage-list">
            {entry.stages.map(stage => (
              <li key={stage.name}>{stage.name}</li>
            ))}
          </ol>
        )}
        {active === 'executions' && <p>Execution history is coming in a later task.</p>}
        {active === 'triggers' && <p>Trigger configuration is coming in a later task.</p>}
        {active === 'settings' && <p>Run settings are coming in a later task.</p>}
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { entryById } from '../data/pipelineCatalogue'
import { lastExecutionFor } from '../data/executions'
import { useDemoState } from '../state'
import { projectRun, type RunConfig } from '../runConfig'
import { StatusPill } from './StatusPill'
import { executionStatusPill, KIND_LABEL } from './PipelineTable'
import { StageChain, NO_SOURCES_REASON, SOURCE_COMPONENT_ID, fittingCounterpart } from './StageChain'
import { ComponentConfigPanel } from './ComponentConfigPanel'
import { WorkspaceTabs, WORKSPACE_PANEL_ID, workspaceTabId, type WorkspaceTab } from './WorkspaceTabs'
import { ExecutionsTable } from './ExecutionsTable'
import { TriggersTab } from './TriggersTab'
import { SettingsTab } from './SettingsTab'

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

/** Ties the disabled Run button to the sentence saying why it is disabled. A fixed id,
 * not useId: one workspace renders per page, and a generated id would differ between
 * the server's render and the client's. */
const RUN_BLOCKED_ID = 'dm-run-blocked'

/** Renders the workspace for one pipeline: a header naming it, its last
 * execution and a run/cancel action, and four tabs over one switching panel.
 * Returns null for an id the catalogue doesn't know, same as the placeholder
 * this replaces. */
export function PipelineWorkspace({ entryId }: { entryId: string }) {
  const entry = entryById(entryId)
  const { runs, startRun, cancelRun, advanceRuns, configFor, setConfig, settingsFor } = useDemoState()
  const [active, setActive] = useState<string>(TABS[0].id)
  // Null on first paint — no component's panel may be open before the operator
  // opens one, or the server's markup and the client's first render disagree.
  const [selected, setSelected] = useState<string | null>(null)

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

  const config = configFor(entry)
  const projection = projectRun(entry, config)
  // The Settings tab's dry-run default only means anything for a remediation
  // entry — RunConfig.dryRun is otherwise never read — and is applied only at
  // the moment a run starts, not written into the config the Pipeline tab
  // itself edits.
  const runConfig = entry.kind === 'remediation'
    ? { ...config, dryRun: settingsFor(entry.id).defaultDryRun }
    : config
  // The newest run for this entry, running or finished — runs are newest-first —
  // so the chain keeps reporting what happened after a run ends.
  const latestRun = runs.find(r => r.entryId === entry.id)

  /**
   * Writes a component's change through to shared state, and follows the selection
   * when the projection renames the component underneath it: choosing to re-fit
   * turns the open 'Project' panel into the same component's 'Reduce dimensions',
   * and an operator who lost the panel at that moment could never choose again.
   */
  const applyConfig = (next: RunConfig) => {
    setConfig(entry.id, next)
    if (selected === null || selected === SOURCE_COMPONENT_ID) return
    const names = new Set(projectRun(entry, next).stages.map(s => s.name))
    if (names.has(selected)) return
    const counterpart = fittingCounterpart(selected)
    if (counterpart && names.has(counterpart)) setSelected(counterpart)
  }

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
            // Deselecting every source leaves nothing to process, which projectRun
            // already reports. The button cannot start such a run, and the reason is on
            // screen beside it and named by it — a greyed control with no explanation
            // leaves an operator with nothing to act on.
            <div className="dm-run">
              <button
                className="dm-btn is-ink"
                disabled={!projection.runnable}
                aria-describedby={projection.runnable ? undefined : RUN_BLOCKED_ID}
                onClick={() => startRun(entry, runConfig)}
              >
                Run pipeline
              </button>
              {!projection.runnable && (
                <p className="dm-run-blocked" id={RUN_BLOCKED_ID}>{NO_SOURCES_REASON}</p>
              )}
            </div>
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
          <StageChain
            entry={entry}
            config={config}
            run={latestRun}
            selected={selected}
            onSelect={setSelected}
          />
        )}
        {active === 'executions' && <ExecutionsTable entryId={entry.id} />}
        {active === 'triggers' && <TriggersTab entry={entry} />}
        {active === 'settings' && <SettingsTab entry={entry} />}
      </div>

      <ComponentConfigPanel
        entry={entry}
        config={config}
        componentId={active === 'pipeline' ? selected : null}
        onChange={applyConfig}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}

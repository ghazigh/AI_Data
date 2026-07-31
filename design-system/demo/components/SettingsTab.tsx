import { Panel } from './Panel'
import { useDemoState, type PipelineSettings } from '../state'
import { formatMinutes, formatNumber } from '../runConfig'
import { KIND_LABEL } from './PipelineTable'
import type { CatalogueEntry } from '../data/pipelineCatalogue'

const RETENTION_OPTIONS: PipelineSettings['retentionDays'][] = [30, 90, 365]

/**
 * What this pipeline is, read-only, then the settings an operator can
 * declare about it. defaultDryRun only applies to a remediation entry — the
 * only kind RunConfig.dryRun means anything for — and reaches the header's
 * Run action (see PipelineWorkspace). notifyOnFailure and retentionDays are
 * stored and shown; nothing else in the demo reads them.
 */
export function SettingsTab({ entry }: { entry: CatalogueEntry }) {
  const { settingsFor, setSettings, configFor } = useDemoState()
  // The configured scope, not the pipeline's total: the Source component and
  // the run itself both honour configFor, so quoting entry.sourceIds here made
  // Settings say 10 while the chain beside it said 2 — and the run used 2.
  const scoped = configFor(entry).sourceIds.length
  const settings = settingsFor(entry.id)

  const update = (next: Partial<PipelineSettings>) => setSettings(entry.id, { ...settings, ...next })

  return (
    <Panel title="Settings">
      <div className="dm-settings">
        <dl className="dm-deflist">
          <div>
            <dt>Name</dt>
            <dd>{entry.name}</dd>
          </div>
          <div>
            <dt>Kind</dt>
            <dd>{KIND_LABEL[entry.kind]}</dd>
          </div>
          <div>
            <dt>Description</dt>
            <dd>{entry.summary}</dd>
          </div>
          <div>
            <dt>Sources in scope</dt>
            <dd>
              {scoped === entry.sourceIds.length
                ? `${entry.sourceIds.length} — full scope`
                : `${scoped} of ${entry.sourceIds.length}`}
            </dd>
          </div>
          <div>
            <dt>Baseline records</dt>
            <dd>{formatNumber(entry.baselineRecords)}</dd>
          </div>
          <div>
            <dt>Baseline runtime</dt>
            <dd>{formatMinutes(entry.baselineMinutes)}</dd>
          </div>
        </dl>

        <h3 className="dm-drawer-sub">Run settings</h3>

        {entry.kind === 'remediation' && (
          <label className="dm-cfg-check">
            <input
              type="checkbox"
              checked={settings.defaultDryRun}
              onChange={e => update({ defaultDryRun: e.target.checked })}
            />
            <span>
              <span className="dm-cfg-opt">Run as a dry run by default</span>
              <span className="dm-cfg-note">
                The next run this pipeline starts from its workspace header reports what would change
                without writing anything.
              </span>
            </span>
          </label>
        )}

        <label className="dm-cfg-check">
          <input
            type="checkbox"
            checked={settings.notifyOnFailure}
            onChange={e => update({ notifyOnFailure: e.target.checked })}
          />
          <span>
            <span className="dm-cfg-opt">Notify on failure</span>
            <span className="dm-cfg-note">Alert the pipeline's owners if a run of it fails.</span>
          </span>
        </label>

        <div className="dm-field">
          <span>Keep execution records for</span>
          <select
            value={settings.retentionDays}
            onChange={e => update({ retentionDays: Number(e.target.value) as PipelineSettings['retentionDays'] })}
          >
            {RETENTION_OPTIONS.map(days => (
              <option key={days} value={days}>
                {days} days
              </option>
            ))}
          </select>
        </div>
      </div>
    </Panel>
  )
}

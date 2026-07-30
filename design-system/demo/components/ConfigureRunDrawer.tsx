import { useState } from 'react'
import { Drawer } from './Drawer'
import { formatMinutes } from './CatalogueSection'
import { sourceName } from '../data/sources'
import { MODALITY_PIPELINES } from '../data/modalities'
import type { Modality } from '../data/types'
import type { CatalogueEntry } from '../data/pipelineCatalogue'
import {
  defaultConfigFor,
  projectRun,
  supportsRedaction,
  supportsChunkStrategy,
  type ChunkStrategy,
  type RunConfig,
} from '../runConfig'
import { useDemoState } from '../state'

const pluralize = (n: number, word: string): string => `${n} ${word}${n === 1 ? '' : 's'}`

/**
 * The raw-to-structured sample only exists on the modality pipeline a
 * structuring entry was derived from (pipelineCatalogue.ts builds each
 * structuring entry's id as `structuring-${modality}`, one per entry, so
 * this reverses that to find it back). Graph and remediation entries have
 * no such sample in their own source definitions, so this returns
 * undefined for them — the drawer renders nothing for those, rather than
 * inventing a before/after that was never authored.
 */
const sampleFor = (entry: CatalogueEntry) => {
  if (entry.kind !== 'structuring') return undefined
  const modality = entry.id.slice('structuring-'.length) as Modality
  return MODALITY_PIPELINES.find(p => p.modality === modality)?.sample
}

export interface ConfigureRunDrawerProps {
  entries: CatalogueEntry[]
  onClose: () => void
}

export function ConfigureRunDrawer({ entries, onClose }: ConfigureRunDrawerProps) {
  const { startRun } = useDemoState()
  // One RunConfig per entry, seeded once from the entry's own default and
  // never re-seeded while this drawer is mounted — CatalogueSection only
  // ever mounts it while its scrim blocks the underlying table, so the
  // entry list itself cannot change out from under this state.
  const [configs, setConfigs] = useState<Record<string, RunConfig>>(() =>
    Object.fromEntries(entries.map(e => [e.id, defaultConfigFor(e)]))
  )

  const updateConfig = (id: string, patch: Partial<RunConfig>) =>
    setConfigs(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }))

  const toggleSource = (id: string, sourceId: string) =>
    setConfigs(prev => {
      const cfg = prev[id]
      const has = cfg.sourceIds.includes(sourceId)
      const sourceIds = has ? cfg.sourceIds.filter(s => s !== sourceId) : [...cfg.sourceIds, sourceId]
      return { ...prev, [id]: { ...cfg, sourceIds } }
    })

  const title = entries.length === 1 ? entries[0].name : `Configure ${entries.length} pipelines`

  const projections = entries.map(entry => ({ entry, projection: projectRun(entry, configs[entry.id]) }))
  const runnable = projections.every(p => p.projection.runnable)
  const runLabel = entries.length === 1 ? 'Run pipeline' : `Run ${pluralize(entries.length, 'pipeline')}`

  const runAll = () => {
    for (const entry of entries) startRun(entry, configs[entry.id])
    onClose()
  }

  return (
    <Drawer open title={title} onClose={onClose}>
      {projections.map(({ entry, projection }) => {
        const config = configs[entry.id]
        const hasOptions =
          (entry.kind === 'structuring' && (supportsRedaction(entry) || supportsChunkStrategy(entry))) ||
          (entry.kind === 'graph' && entry.warnsOnRefit) ||
          entry.kind === 'remediation'
        const sample = sampleFor(entry)

        return (
          <section key={entry.id} aria-label={entry.name}>
            {entries.length > 1 && <h3 className="dm-drawer-sub">{entry.name}</h3>}
            <p className="dm-uc-summary">{entry.summary}</p>

            <h3 className="dm-drawer-sub">Scope</h3>
            <div role="group" aria-label={`Sources for ${entry.name}`}>
              {entry.sourceIds.map(id => (
                <label className="dm-cfg-check" key={id}>
                  <input
                    type="checkbox"
                    checked={config.sourceIds.includes(id)}
                    onChange={() => toggleSource(entry.id, id)}
                  />
                  {sourceName(id)}
                </label>
              ))}
            </div>

            {hasOptions && (
              <>
                <h3 className="dm-drawer-sub">Options</h3>

                {entry.kind === 'structuring' && supportsRedaction(entry) && (
                  <label className="dm-cfg-check">
                    <input
                      type="checkbox"
                      checked={config.redact}
                      onChange={e => updateConfig(entry.id, { redact: e.target.checked })}
                    />
                    Redact personal data
                  </label>
                )}

                {entry.kind === 'structuring' && supportsChunkStrategy(entry) && (
                  <label className="dm-field">
                    <span>Chunk strategy</span>
                    <select
                      value={config.chunkStrategy}
                      onChange={e => updateConfig(entry.id, { chunkStrategy: e.target.value as ChunkStrategy })}
                    >
                      <option value="clause">Clause</option>
                      <option value="fixed">Fixed</option>
                      <option value="semantic">Semantic</option>
                    </select>
                  </label>
                )}

                {entry.kind === 'graph' && entry.warnsOnRefit && (
                  <div role="radiogroup" aria-label={`Model fitting for ${entry.name}`}>
                    <label className="dm-cfg-check">
                      <input
                        type="radio"
                        name={`refit-${entry.id}`}
                        checked={!config.refitModels}
                        onChange={() => updateConfig(entry.id, { refitModels: false })}
                      />
                      Reuse the fitted models
                    </label>
                    <label className="dm-cfg-check">
                      <input
                        type="radio"
                        name={`refit-${entry.id}`}
                        checked={config.refitModels}
                        onChange={() => updateConfig(entry.id, { refitModels: true })}
                      />
                      Re-fit from scratch
                    </label>
                  </div>
                )}

                {entry.kind === 'remediation' && (
                  <label className="dm-cfg-check">
                    <input
                      type="checkbox"
                      checked={config.dryRun}
                      onChange={e => updateConfig(entry.id, { dryRun: e.target.checked })}
                    />
                    Dry run — report without writing
                  </label>
                )}
              </>
            )}

            <h3 className="dm-drawer-sub">Projected run</h3>
            <p className="dm-uc-summary">
              {projection.records.toLocaleString('en-US')} records · {formatMinutes(projection.minutes)}
              {entry.kind === 'remediation' && projection.readinessDelta > 0
                ? ` · +${projection.readinessDelta} readiness`
                : ''}
            </p>

            <div>
              {projection.stages.map(stage => (
                <div className="dm-stage-row" key={stage.name}>
                  <div>
                    <p className="dm-stage-name">{stage.name}</p>
                    <p className="dm-stage-detail">{stage.detail}</p>
                  </div>
                  <p className="dm-stage-count">{Math.round(stage.weight * 100)}%</p>
                  <p className="dm-stage-runtime">{formatMinutes(Math.round(stage.weight * projection.minutes))}</p>
                </div>
              ))}
            </div>

            {projection.warnings.map(warning => (
              <p className="dm-cfg-warning" key={warning}>
                {warning}
              </p>
            ))}

            {sample && (
              <>
                <h3 className="dm-drawer-sub">Before and after</h3>
                <div className="dm-sample">
                  <figure>
                    <p className="dm-eyebrow">As it arrives</p>
                    <pre>{sample.raw}</pre>
                    <figcaption>{sourceName(sample.sourceId)}</figcaption>
                  </figure>
                  <figure>
                    <p className="dm-eyebrow">As an agent reads it</p>
                    <pre>{sample.structured}</pre>
                    <figcaption>{sourceName(sample.sourceId)}</figcaption>
                  </figure>
                </div>
              </>
            )}
          </section>
        )
      })}

      <div className="dm-connect-actions">
        <button type="button" className="dm-btn is-ink" disabled={!runnable} onClick={runAll}>
          {runLabel}
        </button>
      </div>
    </Drawer>
  )
}

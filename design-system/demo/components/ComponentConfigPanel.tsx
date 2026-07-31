import { Drawer } from './Drawer'
import { sourceName } from '../data/sources'
import type { CatalogueEntry, CatalogueStage } from '../data/pipelineCatalogue'
import {
  formatMinutes,
  formatNumber,
  projectRun,
  REFIT_WARNING,
  type ChunkStrategy,
  type RunConfig,
} from '../runConfig'
import { SOURCE_COMPONENT_ID, ownsChunkStrategy, ownsRedaction, ownsRefitChoice } from './StageChain'

/** The three strategies, each with the consequence CHUNK_MULTIPLIER already encodes. */
const CHUNK_OPTIONS: { value: ChunkStrategy; label: string; note: string }[] = [
  { value: 'clause', label: 'By clause', note: 'The baseline — one chunk per clause boundary.' },
  { value: 'fixed', label: 'Fixed size', note: 'More, smaller chunks than by clause.' },
  { value: 'semantic', label: 'Semantic', note: 'Fewer, larger chunks than by clause.' },
]

export interface ComponentConfigPanelProps {
  entry: CatalogueEntry
  config: RunConfig
  /** The component whose panel is open, or null when none is. */
  componentId: string | null
  onChange: (next: RunConfig) => void
  onClose: () => void
}

/**
 * The configuration for one component of one pipeline, in the shared Drawer.
 * Every option this demo has is naturally owned by a single component — scope by
 * the source, chunk strategy by the Chunk stage, masking by the Mask or Redact
 * stage, model fitting by the two stages that fit the models — so each panel
 * carries exactly the controls its own component owns, and a component that owns
 * none says so rather than showing a decorative one.
 */
export function ComponentConfigPanel({ entry, config, componentId, onChange, onClose }: ComponentConfigPanelProps) {
  if (componentId === null) return null

  const projection = projectRun(entry, config)

  if (componentId === SOURCE_COMPONENT_ID) {
    const toggleSource = (id: string) => {
      const has = config.sourceIds.includes(id)
      onChange({
        ...config,
        // Rebuilt from the entry's own order rather than appended to, so the list
        // never depends on the order the operator happened to click in.
        sourceIds: entry.sourceIds.filter(s => (s === id ? !has : config.sourceIds.includes(s))),
      })
    }

    return (
      <Drawer open title="Source" onClose={onClose}>
        <p className="dm-uc-summary">Every source this pipeline can read. The run covers the ones left ticked.</p>

        <div role="group" aria-label="Sources in scope">
          {entry.sourceIds.map(id => (
            <label className="dm-cfg-check" key={id}>
              <input
                type="checkbox"
                checked={config.sourceIds.includes(id)}
                onChange={() => toggleSource(id)}
              />
              <span className="dm-cfg-opt">{sourceName(id)}</span>
            </label>
          ))}
        </div>

        <h3 className="dm-drawer-sub">In scope</h3>
        <p className="dm-uc-summary">
          {`${formatNumber(projection.records)} records · ${formatMinutes(projection.minutes)}`}
        </p>
        {!projection.runnable && (
          <p className="dm-cfg-warning">No source is selected, so this pipeline has nothing to run.</p>
        )}

        <DoneButton onClose={onClose} />
      </Drawer>
    )
  }

  // A component the operator's own choice has just removed from the projected chain —
  // turning masking off drops the masking component — is still looked up in the
  // entry's unconfigured chain, so the panel that removed it can put it back.
  const chain: CatalogueStage[] = projection.stages.some(s => s.name === componentId)
    ? projection.stages
    : entry.stages
  const index = chain.findIndex(s => s.name === componentId)
  if (index === -1) return null

  const stage = chain[index]
  const previous = chain[index - 1]
  const next = chain[index + 1]

  return (
    <Drawer open title={stage.name} onClose={onClose}>
      <p className="dm-uc-summary">{stage.detail}</p>

      <dl className="dm-io">
        <div>
          <dt>Consumes</dt>
          <dd>{previous ? `${previous.name} output` : 'The sources in scope'}</dd>
        </div>
        <div>
          <dt>Produces</dt>
          <dd>{next ? `Input for ${next.name}` : 'The pipeline output'}</dd>
        </div>
      </dl>

      {ownsChunkStrategy(entry, stage.name) ? (
        <>
          <h3 className="dm-drawer-sub">Chunk strategy</h3>
          <div role="radiogroup" aria-label="Chunk strategy">
            {CHUNK_OPTIONS.map(option => (
              <label className="dm-cfg-check" key={option.value}>
                <input
                  type="radio"
                  name="dm-chunk-strategy"
                  checked={config.chunkStrategy === option.value}
                  onChange={() => onChange({ ...config, chunkStrategy: option.value })}
                />
                <span>
                  <span className="dm-cfg-opt">{option.label}</span>
                  <span className="dm-cfg-note">{option.note}</span>
                </span>
              </label>
            ))}
          </div>
        </>
      ) : ownsRedaction(entry, stage.name) ? (
        <>
          <h3 className="dm-drawer-sub">Personal data</h3>
          <label className="dm-cfg-check">
            <input
              type="checkbox"
              checked={config.redact}
              onChange={e => onChange({ ...config, redact: e.target.checked })}
            />
            <span>
              <span className="dm-cfg-opt">Mask personal data</span>
              <span className="dm-cfg-note">Untick it and this component leaves the chain entirely.</span>
            </span>
          </label>
          {/* Whatever the run itself would carry, quoted from the projection rather
              than paraphrased here — so the panel and the run can never disagree. */}
          {projection.warnings.map(warning => (
            <p className="dm-cfg-warning" key={warning}>{warning}</p>
          ))}
        </>
      ) : ownsRefitChoice(entry, stage.name) ? (
        <>
          <h3 className="dm-drawer-sub">Model fitting</h3>
          {/* Above the choice, before it is made — a consequence this severe is not
              something to report back to an operator who has already chosen it. */}
          <p className="dm-cfg-warning">{REFIT_WARNING}</p>
          <div role="radiogroup" aria-label="Model fitting">
            <label className="dm-cfg-check">
              <input
                type="radio"
                name="dm-model-fitting"
                checked={!config.refitModels}
                onChange={() => onChange({ ...config, refitModels: false })}
              />
              <span>
                <span className="dm-cfg-opt">Reuse the fitted model</span>
                <span className="dm-cfg-note">
                  Places every point in the projection and cluster model built at construction. Topics keep their
                  meaning and every agent binding stands.
                </span>
              </span>
            </label>
            <label className="dm-cfg-check">
              <input
                type="radio"
                name="dm-model-fitting"
                checked={config.refitModels}
                onChange={() => onChange({ ...config, refitModels: true })}
              />
              <span>
                <span className="dm-cfg-opt">Re-fit the model</span>
                <span className="dm-cfg-note">
                  Finds the coordinate space and its dense regions again, from the estate as it stands today.
                </span>
              </span>
            </label>
          </div>
        </>
      ) : (
        <p className="dm-cfg-none">This component has no configuration.</p>
      )}

      <DoneButton onClose={onClose} />
    </Drawer>
  )
}

function DoneButton({ onClose }: { onClose: () => void }) {
  return (
    <div className="dm-connect-actions">
      <button type="button" className="dm-btn is-ink" onClick={onClose}>
        Done
      </button>
    </div>
  )
}

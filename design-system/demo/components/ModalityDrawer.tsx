import { Drawer } from './Drawer'
import { StatusPill } from './StatusPill'
import { sourcesForModality, type ModalityPipeline } from '../data/modalities'
import { sourceName } from '../data/sources'

/**
 * The one persuasive artefact in the whole demo: a raw extract beside what an
 * agent actually reads. Rendered with <pre> and ordinary text children so the
 * markdown's structure (headings, tables, clause comments) survives exactly
 * as it will land in front of a model — never dangerouslySetInnerHTML.
 */
export function ModalityDrawer({ pipeline, onClose }: { pipeline: ModalityPipeline | null; onClose: () => void }) {
  if (!pipeline) return null
  const sources = sourcesForModality(pipeline.modality)
  const sample = pipeline.sample
  const sourceLabel = sourceName(sample.sourceId)

  return (
    <Drawer open title={pipeline.label} onClose={onClose}>
      <p className="dm-uc-summary">
        {sources.length} sources · {pipeline.volume.toLocaleString('en-US')} {pipeline.volumeUnit}
      </p>

      <h3 className="dm-drawer-sub">The chain</h3>
      <p className="dm-connect-lead">
        These stages run parallelised across the estate, which is why their per-item rate is higher than the targeted repairs in the plan.
      </p>
      <div>
        {pipeline.stages.map(stage => (
          <div className="dm-stage-row" key={stage.name}>
            <div>
              <p className="dm-stage-name">
                {stage.name}
                {stage.isStructuring && <StatusPill tone="blue" label="Structuring" />}
              </p>
              <p className="dm-stage-detail">{stage.detail}</p>
            </div>
            <p className="dm-stage-count">
              {stage.count.toLocaleString('en-US')}
              <em>{stage.unit}</em>
            </p>
            <p className="dm-stage-runtime">{stage.runtime}</p>
          </div>
        ))}
      </div>

      <h3 className="dm-drawer-sub">Sources</h3>
      <ul className="dm-bindings">
        {sources.map(s => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>

      <h3 className="dm-drawer-sub">Before and after</h3>
      <div className="dm-sample">
        <figure>
          <p className="dm-eyebrow">As it arrives</p>
          <pre>{sample.raw}</pre>
          <figcaption>{sourceLabel}</figcaption>
        </figure>
        <figure>
          <p className="dm-eyebrow">As an agent reads it</p>
          <pre>{sample.structured}</pre>
          <figcaption>{sourceLabel}</figcaption>
        </figure>
      </div>
    </Drawer>
  )
}

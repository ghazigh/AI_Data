import { Fragment, useState } from 'react'
import { Panel } from './Panel'
import { ModalityDrawer } from './ModalityDrawer'
import { MODALITY_PIPELINES, sourcesForModality, type ModalityPipeline } from '../data/modalities'

/**
 * The panel's title states the insight, not just a list of transforms: five
 * modalities converge on structured markdown, two on a typed schema — seven
 * shapes in, two shapes out. Rows render in MODALITY_PIPELINES order (source
 * count descending) and are never numbered — the seven modalities are a set,
 * not a sequence of product stages.
 */
export function ModalityPanel() {
  const [selected, setSelected] = useState<ModalityPipeline | null>(null)

  return (
    <Panel eyebrow="Stage 03 — Pipelines" title="Seven modalities, two shapes an agent can read">
      <ul className="dm-modalities">
        {MODALITY_PIPELINES.map(p => {
          const sourceCount = sourcesForModality(p.modality).length
          return (
            <li key={p.modality}>
              <div className="dm-modality-name">
                <button type="button" onClick={() => setSelected(p)}>{p.label}</button>
                <span className="dm-modality-scale">
                  {sourceCount} sources · {p.volume.toLocaleString('en-US')} {p.volumeUnit}
                </span>
              </div>
              <p className="dm-modality-chain">
                {p.stages.map((stage, i) => (
                  <Fragment key={stage.name}>
                    {i > 0 && ' → '}
                    {stage.isStructuring ? <b>{stage.name}</b> : <span>{stage.name}</span>}
                  </Fragment>
                ))}
              </p>
              <p className="dm-modality-out">{p.output}</p>
            </li>
          )
        })}
      </ul>

      <ModalityDrawer pipeline={selected} onClose={() => setSelected(null)} />
    </Panel>
  )
}

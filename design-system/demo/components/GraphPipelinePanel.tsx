import { Panel } from './Panel'
import { StatusPill } from './StatusPill'
import type { GraphPipeline } from '../data/graphPipelines'

/**
 * Renders one graph pipeline — construction or extension — as a titled panel.
 * The two calls of this component are meant to sit side by side: construction
 * fits the projection and the cluster model, extension only ever applies them.
 * The `fits` / `applies` pill on every row is the whole contrast, so it is
 * never hidden behind an icon or a colour alone.
 */
export function GraphPipelinePanel({ pipeline: p }: { pipeline: GraphPipeline }) {
  const topicsLine = p.topicsBefore > 0
    ? `${p.topicsBefore} topics before · ${p.topicsAfter} after`
    : `${p.topicsAfter} topics discovered`

  return (
    <Panel title={p.title}>
      <p className="dm-gpipe-lead">{p.lead}</p>
      <p className="dm-gpipe-topics">{topicsLine}</p>
      <ul className="dm-gpipe">
        {p.stages.map(s => (
          <li key={s.name}>
            <div className="dm-gpipe-name">
              {s.name}
              <StatusPill tone={s.mode === 'fits' ? 'blue' : 'neutral'} label={s.mode} />
            </div>
            <p className="dm-gpipe-detail">
              {s.detail}
              <span className="dm-gpipe-artefact">
                {s.produces ? `Produces ${s.produces}` : `Reuses ${s.reuses}`}
              </span>
            </p>
            <p className="dm-gpipe-count">
              {s.count.toLocaleString('en-US')}
              <em>{s.unit}</em>
            </p>
            <p className="dm-gpipe-runtime">{s.runtime}</p>
          </li>
        ))}
      </ul>
      {p.unassigned && (
        <div className="dm-gpipe-residue">
          <p className="dm-gpipe-count">
            {p.unassigned.count.toLocaleString('en-US')}
            <em>{p.unassigned.unit}</em>
          </p>
          <p>{p.unassigned.note}</p>
        </div>
      )}
    </Panel>
  )
}

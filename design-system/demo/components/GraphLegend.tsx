import type { GraphNode } from '../data/graph'

/**
 * What each colour in the graph means, stated on the screen rather than left for
 * the viewer to infer. Both renderers — the 3D scene and its SVG fallback — draw
 * from this same vocabulary, so one legend describes either.
 *
 * The swatches are decorative: every entry names its kind in text as well, so
 * the legend still reads with colour unavailable, which is the whole point of a
 * legend that sits beside a colour-coded drawing.
 */
const KINDS: { kind: GraphNode['kind']; label: string; detail: string }[] = [
  { kind: 'entity', label: 'Entity', detail: 'A thing the business has — a policy, a claim, a broker' },
  { kind: 'document', label: 'Document', detail: 'A record about one — an FNOL, a treaty, a guideline' },
  { kind: 'event', label: 'Event', detail: 'Something that happened — a payment, a renewal, an inspection' },
]

export function GraphLegend() {
  return (
    <div className="dm-legend">
      <p className="dm-legend-lead">
        Colour is the kind of thing a node is. Position groups it with the rest of its knowledge base.
      </p>
      <ul className="dm-legend-keys">
        {KINDS.map(k => (
          <li key={k.kind}>
            <span className={`dm-legend-dot is-${k.kind}`} aria-hidden="true" />
            <b>{k.label}</b>
            <span className="dm-legend-detail">{k.detail}</span>
          </li>
        ))}
        <li>
          <span className="dm-legend-dot is-on" aria-hidden="true" />
          <b>Selected</b>
          <span className="dm-legend-detail">The node you are inspecting below</span>
        </li>
        <li>
          <span className="dm-legend-dot is-mote" aria-hidden="true" />
          <b>Faint points</b>
          <span className="dm-legend-detail">
            The rest of each knowledge base, in proportion — not individually named
          </span>
        </li>
      </ul>
    </div>
  )
}

/** Exported so a test can hold the legend to the kinds the data actually uses. */
export const LEGEND_KINDS = KINDS.map(k => k.kind)

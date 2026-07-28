import { Panel } from './Panel'
import type { GraphNode } from '../data/graph'
import { SOURCES } from '../data/sources'

const vendorFor = (sourceId: string): string => SOURCES.find(s => s.id === sourceId)?.vendor ?? sourceId

/**
 * The entity a node resolves to: how many instances, how fresh, what it's
 * built from, and how it got here. Every property names its own originating
 * system — the same claim the identity panel makes, at the level of a single
 * field rather than a single record.
 */
export function EntityDetail({ node }: { node: GraphNode }) {
  // Vendors, not full system names, for the sourced-from/lineage lines: a
  // property's full source name (e.g. "Guidewire PolicyCenter") already
  // appears once in the table below, and re-spelling it here would give the
  // same text two independent matches for anything querying by that string.
  const vendors = [...new Set(node.sourceIds.map(vendorFor))]

  return (
    <Panel title={node.label}>
      <p className="dm-entity-meta">
        <span>{node.count} entities</span>
        <span className="dm-entity-fresh">{node.freshness}</span>
      </p>
      <table className="dm-table">
        <caption className="dm-sr">{node.label} properties</caption>
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Type</th>
            <th scope="col">Source</th>
          </tr>
        </thead>
        <tbody>
          {node.properties.map(p => (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td className="dm-muted">{p.type}</td>
              <td>{p.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="dm-entity-sourced">Sourced from {vendors.join(', ')}</p>
      <p className="dm-entity-lineage">{vendors[0]} → chunked → embedded → served</p>
    </Panel>
  )
}

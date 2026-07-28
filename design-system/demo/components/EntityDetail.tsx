import { Panel } from './Panel'
import type { GraphNode } from '../data/graph'
import { SOURCES, sourceVendor } from '../data/sources'
import type { Modality } from '../data/types'

/** The union of modalities across a node's cited sources. */
const modalitiesFor = (sourceIds: string[]): Set<Modality> => {
  const byId = new Map(SOURCES.map(s => [s.id, s]))
  const set = new Set<Modality>()
  for (const id of sourceIds) byId.get(id)?.modalities.forEach(m => set.add(m))
  return set
}

/**
 * The processing pipeline a node can honestly claim, in order of the richest
 * claim it can support. Chunking is only claimed when a cited source actually
 * declares documents — test/integrity.test.ts asserts that. Documents beat
 * transcripts beat tables: a node citing both a documents and a tables source
 * (e.g. Policy, from Guidewire tables plus Duck Creek documents) is
 * genuinely chunked as well as typed, and chunking is the more specific,
 * more informative claim to lead with.
 */
const lineageFor = (modalities: Set<Modality>): string =>
  modalities.has('documents') ? 'chunked → embedded → served'
  : modalities.has('transcripts') ? 'transcribed → embedded → served'
  : modalities.has('tables') ? 'typed → indexed → served'
  : 'normalised → indexed → served'

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
  const vendors = [...new Set(node.sourceIds.map(sourceVendor))]
  const lineage = lineageFor(modalitiesFor(node.sourceIds))

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
      <p className="dm-entity-lineage">{vendors[0]} → {lineage}</p>
    </Panel>
  )
}

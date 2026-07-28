import { Panel } from './Panel'
import type { GraphNode } from '../data/graph'
import { SOURCES, sourceName, sourceVendor } from '../data/sources'
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
 * claim it can support, plus the modality that earns it. Chunking is only
 * claimed when a cited source actually declares documents —
 * test/integrity.test.ts asserts that. Documents beat transcripts beat
 * tables: a node citing both a documents and a tables source (e.g. Policy,
 * from Guidewire tables plus Duck Creek documents) is genuinely chunked as
 * well as typed, and chunking is the more specific, more informative claim
 * to lead with. `modality` is null only for the fallback claim, which no
 * single modality earns.
 */
const LINEAGE_STEPS: { modality: Modality; text: string }[] = [
  { modality: 'documents', text: 'chunked → embedded → served' },
  { modality: 'transcripts', text: 'transcribed → embedded → served' },
  { modality: 'tables', text: 'typed → indexed → served' },
]

const lineageFor = (modalities: Set<Modality>): { modality: Modality | null; text: string } =>
  LINEAGE_STEPS.find(s => modalities.has(s.modality)) ?? { modality: null, text: 'normalised → indexed → served' }

/**
 * The source that actually earns the claimed lineage step, so the lead
 * vendor named alongside it is one that can perform that step — not just
 * whichever source happens to be cited first. `lineageFor` picks the step
 * from the *union* of every cited source's modalities, so a node can cite a
 * source that supports none of it (e.g. FNOL cites Azure FNOL Intake,
 * streams-only, alongside Guidewire ClaimCenter, which has documents); this
 * picks the one that does. If somehow none does — unreachable given how
 * `lineageFor` derives the step from these same sources, but guarded anyway
 * — the caller falls back to the source's full name rather than naming a
 * vendor that cannot perform the step.
 */
const leadSourceFor = (sourceIds: string[], modality: Modality | null) => {
  const byId = new Map(SOURCES.map(s => [s.id, s]))
  const sources = sourceIds.map(id => byId.get(id)).filter((s): s is NonNullable<typeof s> => s != null)
  const earns = modality != null ? sources.find(s => s.modalities.includes(modality)) : undefined
  return { source: earns ?? sources[0], earned: earns != null }
}

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
  const { source: leadSource, earned } = leadSourceFor(node.sourceIds, lineage.modality)
  // Name the vendor when the lead source actually earns the claimed step;
  // otherwise (unreachable in practice, see leadSourceFor) name the source
  // itself rather than a vendor that cannot perform it.
  const lead = leadSource ? (earned ? sourceVendor(leadSource.id) : sourceName(leadSource.id)) : vendors[0]

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
      <p className="dm-entity-lineage">{lead} → {lineage.text}</p>
    </Panel>
  )
}

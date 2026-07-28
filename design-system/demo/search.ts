import { SOURCES } from './data/sources'
import { DOMAINS } from './data/tenant'
import { GRAPH_NODES } from './data/graph'
import { USE_CASES } from './data/useCases'
import { AGENTS } from './data/governance'

export type ResultKind = 'source' | 'domain' | 'entity' | 'use-case' | 'agent'

export interface SearchResult {
  id: string
  label: string
  sublabel: string
  kind: ResultKind
  /** Route slug this result lives on. */
  slug: string
}

const MAX = 8
const MIN_QUERY = 2

/**
 * Substring search across the estate. Deliberately plain: a prospect typing a
 * system name wants that system, and fuzzy ranking would make results reorder
 * unpredictably as they type.
 */
export function searchEstate(query: string): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (q.length < MIN_QUERY) return []

  const byKind: SearchResult[][] = [
    SOURCES
      .filter(s => `${s.name} ${s.vendor}`.toLowerCase().includes(q))
      .map(s => ({ id: `source-${s.id}`, label: s.name, sublabel: `${s.vendor} · source`, kind: 'source' as const, slug: 'connect' })),
    DOMAINS
      .filter(d => d.name.toLowerCase().includes(q))
      .map(d => ({ id: `domain-${d.key}`, label: d.name, sublabel: `Knowledge base · scores ${d.score}`, kind: 'domain' as const, slug: 'ready' })),
    GRAPH_NODES
      .filter(n => n.label.toLowerCase().includes(q))
      .map(n => ({ id: `entity-${n.id}`, label: n.label, sublabel: `${n.count} in the graph`, kind: 'entity' as const, slug: 'graph' })),
    USE_CASES
      .filter(u => u.name.toLowerCase().includes(q))
      .map(u => ({ id: `uc-${u.id}`, label: u.name, sublabel: `${u.impact} projected · ${u.status}`, kind: 'use-case' as const, slug: 'use-cases' })),
    AGENTS
      .filter(a => `${a.name} ${a.owner}`.toLowerCase().includes(q))
      .map(a => ({ id: `agent-${a.id}`, label: a.name, sublabel: `${a.owner} · ${a.calls} calls`, kind: 'agent' as const, slug: 'governance' })),
  ]

  // Round-robin across the kinds rather than concatenating them. Concatenation
  // plus a hard cap means one crowded kind swallows the rest: "claim" matches
  // seven sources and the Claims domain, which fills all eight slots and hides
  // the Claim entity, the claims triage use case and the claims agent — the
  // three things a person typing "claim" most likely wants.
  const out: SearchResult[] = []
  for (let round = 0; out.length < MAX; round++) {
    let addedThisRound = false
    for (const group of byKind) {
      if (round >= group.length) continue
      out.push(group[round])
      addedThisRound = true
      if (out.length === MAX) return out
    }
    if (!addedThisRound) break
  }
  return out
}

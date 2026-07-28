import { useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { GraphCanvas } from '../components/GraphCanvas'
import { EntityDetail } from '../components/EntityDetail'
import { IdentityPanel } from '../components/IdentityPanel'
import { GRAPH_NODES, GRAPH_EDGES, KNOWLEDGE_BASES, IDENTITY_MATCH, nodesForDomain } from '../data/graph'
import type { DomainKey } from '../data/types'

export function Graph() {
  const [domain, setDomain] = useState<DomainKey | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const nodes = domain ? nodesForDomain(domain) : GRAPH_NODES
  const visible = new Set(nodes.map(n => n.id))
  const edges = GRAPH_EDGES.filter(e => visible.has(e.from) && visible.has(e.to))
  const selected = GRAPH_NODES.find(n => n.id === selectedId) ?? null

  return (
    <>
      <PageHead eyebrow="Stage 04 — Graph" title="One map of the whole business" />

      <div className="dm-graph-layout">
        <Panel title="Knowledge bases">
          {/*
            The one place this screen states the access claim in plain text —
            each knowledge-base row below carries the same fact in its own
            aria-label, but only this line renders it as visible text, so the
            claim appears exactly once, not once per row.
          */}
          <p className="dm-kb-note">Every knowledge base here is served to any agent with the right scope.</p>
          <ul className="dm-kblist" aria-label="Knowledge bases">
            {KNOWLEDGE_BASES.map(kb => (
              <li key={kb.domain}>
                <button
                  type="button"
                  className={`dm-kb-btn${domain === kb.domain ? ' is-on' : ''}`}
                  aria-label={`${kb.name} — ${kb.entities} entities, score ${kb.score}, served to ${kb.servedTo} agents`}
                  onClick={() => setDomain(d => (d === kb.domain ? null : kb.domain))}
                >
                  <span className="dm-kb-name">{kb.name}</span>
                  <span className="dm-kb-row">
                    <span className="dm-kb-meta">{kb.entities} entities</span>
                    <span className="dm-kb-score">{kb.score}</span>
                  </span>
                  <span className="dm-kb-meta">{kb.servedTo} agents</span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <GraphCanvas nodes={nodes} edges={edges} selectedId={selectedId} onSelect={setSelectedId} />

        <div className="dm-graph-detail">
          {selected ? <EntityDetail node={selected} /> : <IdentityPanel match={IDENTITY_MATCH} />}
        </div>
      </div>
    </>
  )
}

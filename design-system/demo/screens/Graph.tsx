import { useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { GraphCanvas3D } from '../components/GraphCanvas3D'
import { GraphLegend } from '../components/GraphLegend'
import { EntityDetail } from '../components/EntityDetail'
import { IdentityPanel } from '../components/IdentityPanel'
import { GRAPH_NODES, GRAPH_EDGES, KNOWLEDGE_BASES, IDENTITY_MATCH, nodesForDomain } from '../data/graph'
import type { DomainKey } from '../data/types'
import { Meter } from '../components/telemetry/Meter'

export function Graph() {
  const [domain, setDomain] = useState<DomainKey | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const nodes = domain ? nodesForDomain(domain) : GRAPH_NODES
  const visible = new Set(nodes.map(n => n.id))
  const edges = GRAPH_EDGES.filter(e => visible.has(e.from) && visible.has(e.to))
  const selected = GRAPH_NODES.find(n => n.id === selectedId) ?? null

  return (
    <>
      <PageHead
        eyebrow="Stage 04 — Graph"
        title="One map of the whole business"
        lead="The Enterprise Knowledge Graph: identities resolved across systems, lineage kept, and each domain named as a knowledge base any agent can read under governance."
      />

      <div className="dm-graph-layout">
        <Panel title="Knowledge bases">
          <p className="dm-kb-note">Every knowledge base here is served to any agent with the right scope.</p>
          <ul className="dm-kblist" aria-label="Knowledge bases">
            {KNOWLEDGE_BASES.map(kb => (
              <li key={kb.domain}>
                <button
                  type="button"
                  className={`dm-kb-btn${domain === kb.domain ? ' is-on' : ''}`}
                  onClick={() => setDomain(d => (d === kb.domain ? null : kb.domain))}
                >
                  <span className="dm-kb-name">{kb.name}</span>
                  <span className="dm-kb-row">
                    <span className="dm-kb-meta">{kb.entities} entities</span>
                    {/* The score carried no label, so it read as an unexplained
                        number beside a count. Named the way the topbar chip and
                        the Ready screen name it — it is the same 0–100 score. */}
                    <span className="dm-kb-score"><em>readiness</em>{kb.score}</span>
                  </span>
                  <Meter value={kb.score} target={70} tone={kb.score < 70 ? 'under' : 'default'} />
                  <span className="dm-kb-meta">served to {kb.servedTo} agents</span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        {/* The graph and the key to reading it are one grid cell, so the legend
            stays with the drawing it explains and fills the space under it. */}
        <div className="dm-graph-main">
          {/* allNodes as well as nodes: the 3D scene keeps every node mounted and
              shrinks the filtered-out ones away, so it needs the whole graph.
              The SVG fallback inside only ever sees `nodes`. */}
          <GraphCanvas3D
            allNodes={GRAPH_NODES}
            nodes={nodes}
            edges={edges}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <GraphLegend />
        </div>

        <div className="dm-graph-detail">
          {selected ? <EntityDetail node={selected} /> : <IdentityPanel match={IDENTITY_MATCH} />}
        </div>
      </div>
    </>
  )
}

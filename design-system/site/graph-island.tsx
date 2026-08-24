import { lazy, StrictMode, Suspense, useState } from 'react'
import { createRoot } from 'react-dom/client'
import type { GraphNode } from '../demo/data/graph'
import { GRAPH_NODES, KNOWLEDGE_BASES } from '../demo/data/graph'
import {
  BANK_NODES, BANK_DOMAIN_NAMES, BANK_DOMAIN_ENTITIES, BANK_GRAPH_SUMMARY, type BankDomain,
} from './data/bank-graph'
import { moteCountFor, parseCount } from '../demo/components/graph3d/layout'
import { domainByKey } from '../demo/data/tenant'
import type { DomainKey } from '../demo/data/types'

/**
 * The marketing site is pre-rendered static HTML with no React on the client —
 * every animation in site.js is progressive enhancement over markup that is
 * complete without it. This is the one exception: the stage 04 figure is the
 * same live knowledge graph the demo's Graph screen draws, rather than a
 * drawing of one, so the section shows the actual product instead of an
 * illustration of it.
 *
 * It stays an island. Nothing else on the page hydrates, the static SVG figure
 * is what ships in the HTML, and this replaces it only once a browser has
 * proved it can render the scene — so the section is complete with JavaScript
 * off, on a machine with no WebGL, and while the scene's own chunk is still
 * downloading.
 */

/** The scene and everything it pulls in — three, r3f, drei — as its own chunk,
 * fetched only after the WebGL check below passes. */
const GraphScene = lazy(() => import('../demo/components/graph3d/GraphScene'))

const domainName = (d: DomainKey): string => domainByKey(d)?.name ?? d

/** The ambient cloud is scaled by how many entities a knowledge base actually
 * holds, exactly as it is in the demo. */
const moteCount = (d: DomainKey): number =>
  moteCountFor(parseCount(KNOWLEDGE_BASES.find(kb => kb.domain === d)?.entities ?? '0'))

const SUMMARY =
  `Live knowledge graph: ${GRAPH_NODES.length} entities across ` +
  `${new Set(GRAPH_NODES.map(n => n.domain)).size} knowledge bases, orbiting a central hub.`

function StageGraph() {
  // Selection is local and has nowhere to go on this page — there is no detail
  // panel here, as there is in the demo. It is still tracked, because it is what
  // makes a node the visitor points at light up and hold.
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const visible = new Set(GRAPH_NODES.map(n => n.id))

  return (
    <Suspense fallback={<div className="st-graph-hold" aria-hidden="true" />}>
      <GraphScene
        nodes={GRAPH_NODES}
        visible={visible}
        selectedId={selectedId}
        onSelect={setSelectedId}
        nameFor={domainName}
        moteCountFor={moteCount}
        summary={SUMMARY}
      />
    </Suspense>
  )
}

/**
 * Swaps the static figure for the live scene. createRoot clears the container,
 * which is what performs the swap — the SVG is the fallback because it is the
 * markup, not because a branch chose it.
 */
export function mountStageGraph(el: Element): void {
  createRoot(el).render(<StrictMode><StageGraph /></StrictMode>)
}

/**
 * The same scene over a bank's estate rather than the demo tenant's. The scene
 * treats `domain` as an opaque grouping key and asks the caller for the label
 * and the density, so the banking domains are passed straight through the two
 * lookups below; the cast is the one place that crossing shows up.
 */
function BankGraph() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const visible = new Set(BANK_NODES.map(n => n.id))

  return (
    <Suspense fallback={<div className="st-graph-hold" aria-hidden="true" />}>
      <GraphScene
        nodes={BANK_NODES as unknown as GraphNode[]}
        visible={visible}
        selectedId={selectedId}
        onSelect={setSelectedId}
        nameFor={d => BANK_DOMAIN_NAMES[d as BankDomain] ?? d}
        moteCountFor={d => moteCountFor(parseCount(BANK_DOMAIN_ENTITIES[d as BankDomain] ?? '0'))}
        summary={BANK_GRAPH_SUMMARY}
      />
    </Suspense>
  )
}

/** Mounts the banking estate into the banking page's hero figure. */
export function mountBankGraph(el: Element): void {
  createRoot(el).render(<StrictMode><BankGraph /></StrictMode>)
}

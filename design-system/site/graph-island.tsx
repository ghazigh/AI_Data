import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { KNOWLEDGE_BASES } from '../demo/data/graph'
import { BANK_DOMAIN_NAMES, BANK_DOMAIN_ENTITIES, type BankDomain } from './data/bank-graph'
import type { NebulaCluster } from './components/NebulaScene'

/**
 * The marketing site is pre-rendered static HTML with no React on the client —
 * every animation in site.js is progressive enhancement over markup that is
 * complete without it. These islands are the one exception: the home page's
 * stage 04 figure and the banking hero draw the estate as a live point cloud
 * rather than a drawing of one.
 *
 * They stay islands. Nothing else on the page hydrates, the static SVG figure
 * is what ships in the HTML, and this replaces it only once a browser has
 * proved it can render the scene — so both sections are complete with
 * JavaScript off, on a machine with no WebGL, and while the chunk downloads.
 */

/** The scene and everything it pulls in — three, r3f, drei — as its own chunk,
 * fetched only after the WebGL check in graph-boot passes. */
const Nebula = lazy(() => import('./components/NebulaScene').then(m => ({ default: m.NebulaScene })))

/** The demo tenant's estate, as the knowledge bases its Graph screen serves. */
const ESTATE_CLUSTERS: NebulaCluster[] = KNOWLEDGE_BASES.map(kb => ({
  key: kb.domain,
  name: kb.name,
  entities: kb.entities,
}))

const BANK_CLUSTERS: NebulaCluster[] = (Object.keys(BANK_DOMAIN_NAMES) as BankDomain[]).map(key => ({
  key,
  name: BANK_DOMAIN_NAMES[key],
  entities: BANK_DOMAIN_ENTITIES[key],
}))

function Scene({ clusters, offset }: { clusters: NebulaCluster[]; offset?: boolean }) {
  return (
    <Suspense fallback={<div className="st-graph-hold" aria-hidden="true" />}>
      <Nebula clusters={clusters} offset={offset} />
    </Suspense>
  )
}

/**
 * Swaps a static figure for the live scene. createRoot clears the container,
 * which is what performs the swap — the SVG is the fallback because it is the
 * markup, not because a branch chose it.
 */
export function mountStageGraph(el: Element): void {
  createRoot(el).render(<StrictMode><Scene clusters={ESTATE_CLUSTERS} /></StrictMode>)
}

/** The banking hero: the same scene over a bank's estate, sat right of the copy. */
export function mountBankGraph(el: Element): void {
  createRoot(el).render(<StrictMode><Scene clusters={BANK_CLUSTERS} offset /></StrictMode>)
}

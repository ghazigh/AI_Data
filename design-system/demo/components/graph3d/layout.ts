import type { GraphNode } from '../../data/graph'
import type { DomainKey } from '../../data/types'

export type Vec3 = [number, number, number]

export interface Cluster {
  domain: DomainKey
  name: string
  /** Where the cluster's label and its link from the hub terminate. */
  centroid: Vec3
  nodeIds: string[]
}

export interface Layout {
  /** One position per node, in the order the nodes were passed in. */
  positions: Vec3[]
  clusters: Cluster[]
}

/** Radius of the shell the cluster centroids sit on. */
const SHELL = 7.4
/** How far a node may drift from its own cluster centroid. */
const SPREAD = 1.9

/**
 * FNV-1a over the node id — the same hash the execution ids and the pipeline
 * reliability series use. Every coordinate below is derived from it rather than
 * stored or randomised, so the scene is identical on every render, in every
 * browser, and across a rebuild. A random source here would reshape the graph on
 * every visit and make a stable screenshot impossible; integrity.test.ts forbids
 * one outright.
 */
const hash = (id: string): number => {
  let h = 0x811c9dc5
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h
}

/** Three independent unit values from one hash, so a node's three axes do not
 * correlate into a diagonal streak. */
const triple = (h: number): [number, number, number] => [
  ((h & 0x3ff) / 0x3ff) * 2 - 1,
  (((h >>> 10) & 0x3ff) / 0x3ff) * 2 - 1,
  (((h >>> 20) & 0x3ff) / 0x3ff) * 2 - 1,
]

/**
 * Distributes cluster centroids over a sphere with the golden-angle spiral, so
 * N clusters are near-evenly spaced whatever N is — no two centroids bunch, and
 * adding a domain re-spaces the rest rather than colliding with one.
 */
export const centroidFor = (index: number, total: number): Vec3 => {
  if (total <= 1) return [0, 0, -SHELL]
  const golden = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (index / (total - 1)) * 2 // 1 → -1
  const radius = Math.sqrt(Math.max(0, 1 - y * y))
  const theta = golden * index
  return [
    Math.cos(theta) * radius * SHELL,
    y * SHELL * 0.62, // flattened: a sphere reads as a ball, a disc reads as a map
    Math.sin(theta) * radius * SHELL,
  ]
}

/**
 * Positions every node near its own cluster's centroid, and returns the clusters
 * themselves so the hub can draw one link per cluster rather than one per node.
 * Cluster order follows first appearance in `nodes`, which keeps the layout
 * stable when the caller filters to a single domain.
 */
export const buildLayout = (nodes: GraphNode[], nameFor: (d: DomainKey) => string): Layout => {
  const order: DomainKey[] = []
  const byDomain = new Map<DomainKey, string[]>()

  for (const n of nodes) {
    if (!byDomain.has(n.domain)) {
      byDomain.set(n.domain, [])
      order.push(n.domain)
    }
    byDomain.get(n.domain)!.push(n.id)
  }

  const clusters: Cluster[] = order.map((domain, i) => ({
    domain,
    name: nameFor(domain),
    centroid: centroidFor(i, order.length),
    nodeIds: byDomain.get(domain)!,
  }))

  const centroidByDomain = new Map(clusters.map(c => [c.domain, c.centroid]))

  const positions: Vec3[] = nodes.map(n => {
    const [cx, cy, cz] = centroidByDomain.get(n.domain)!
    const [dx, dy, dz] = triple(hash(n.id))
    return [cx + dx * SPREAD, cy + dy * SPREAD * 0.8, cz + dz * SPREAD]
  })

  return { positions, clusters }
}

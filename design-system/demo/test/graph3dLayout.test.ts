import { describe, expect, it } from 'vitest'
import { buildLayout, centroidFor } from '../components/graph3d/layout'
import { GRAPH_NODES } from '../data/graph'
import { domainByKey } from '../data/tenant'
import type { DomainKey } from '../data/types'

const nameFor = (d: DomainKey) => domainByKey(d)?.name ?? d
const dist = (a: number[], b: number[]) =>
  Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])

describe('centroidFor', () => {
  it('spaces clusters apart instead of stacking them', () => {
    const all = Array.from({ length: 8 }, (_, i) => centroidFor(i, 8))
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        expect(dist(all[i], all[j]), `${i} vs ${j}`).toBeGreaterThan(1.5)
      }
    }
  })

  it('keeps every centroid off the hub, so no link has zero length', () => {
    for (let i = 0; i < 8; i++) {
      expect(dist(centroidFor(i, 8), [0, 0, 0])).toBeGreaterThan(2)
    }
  })

  it('handles a single cluster without dividing by zero', () => {
    expect(centroidFor(0, 1).every(Number.isFinite)).toBe(true)
  })
})

describe('buildLayout', () => {
  it('positions every node exactly once', () => {
    const { positions } = buildLayout(GRAPH_NODES, nameFor)
    expect(positions).toHaveLength(GRAPH_NODES.length)
    expect(positions.every(p => p.every(Number.isFinite))).toBe(true)
  })

  it('is deterministic — the same graph always builds the same scene', () => {
    const a = buildLayout(GRAPH_NODES, nameFor)
    const b = buildLayout(GRAPH_NODES, nameFor)
    expect(a.positions).toEqual(b.positions)
    expect(a.clusters.map(c => c.centroid)).toEqual(b.clusters.map(c => c.centroid))
  })

  it('groups nodes near their own cluster rather than scattering them', () => {
    const { positions, clusters } = buildLayout(GRAPH_NODES, nameFor)
    const centroid = new Map(clusters.map(c => [c.domain, c.centroid]))
    for (const [i, node] of GRAPH_NODES.entries()) {
      // Every node sits inside its cluster's own neighbourhood; clusters are
      // spaced far wider than this, so membership is legible from the drawing.
      expect(dist(positions[i], centroid.get(node.domain)!), node.id).toBeLessThan(3.2)
    }
  })

  it('names every cluster and accounts for every node', () => {
    const { clusters } = buildLayout(GRAPH_NODES, nameFor)
    const counted = clusters.reduce((n, c) => n + c.nodeIds.length, 0)
    expect(counted).toBe(GRAPH_NODES.length)
    expect(clusters.every(c => c.name.length > 0)).toBe(true)
    expect(new Set(clusters.map(c => c.domain)).size).toBe(clusters.length)
  })
})

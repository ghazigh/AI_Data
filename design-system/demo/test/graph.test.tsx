import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GraphCanvas } from '../components/GraphCanvas'
import { GRAPH_NODES, GRAPH_EDGES, KNOWLEDGE_BASES, IDENTITY_MATCH, nodesForDomain } from '../data/graph'
import { SOURCES } from '../data/sources'
import { DOMAINS } from '../data/tenant'

describe('graph data', () => {
  it('gives every node a precomputed position inside the viewport', () => {
    expect(GRAPH_NODES.length).toBeGreaterThanOrEqual(24)
    for (const n of GRAPH_NODES) {
      expect(Number.isFinite(n.x) && Number.isFinite(n.y), n.id).toBe(true)
      expect(n.x).toBeGreaterThanOrEqual(0)
      expect(n.x).toBeLessThanOrEqual(1000)
      expect(n.y).toBeGreaterThanOrEqual(0)
      expect(n.y).toBeLessThanOrEqual(640)
    }
  })

  it('connects edges only between nodes that exist', () => {
    const ids = new Set(GRAPH_NODES.map(n => n.id))
    for (const e of GRAPH_EDGES) {
      expect(ids.has(e.from), e.from).toBe(true)
      expect(ids.has(e.to), e.to).toBe(true)
    }
  })

  it('sources every node from real systems', () => {
    const ids = new Set(SOURCES.map(s => s.id))
    for (const n of GRAPH_NODES) {
      expect(n.sourceIds.length).toBeGreaterThan(0)
      for (const s of n.sourceIds) expect(ids.has(s), `${n.id} → ${s}`).toBe(true)
    }
  })

  it('names one knowledge base per domain', () => {
    expect(KNOWLEDGE_BASES).toHaveLength(DOMAINS.length)
    const keys = new Set(DOMAINS.map(d => d.key))
    for (const kb of KNOWLEDGE_BASES) expect(keys.has(kb.domain), kb.domain).toBe(true)
  })

  it('filters nodes by domain', () => {
    const claims = nodesForDomain('claims')
    expect(claims.length).toBeGreaterThan(0)
    expect(claims.length).toBeLessThan(GRAPH_NODES.length)
  })

  it('resolves one identity across three named systems', () => {
    expect(IDENTITY_MATCH.records).toHaveLength(3)
    const ids = new Set(SOURCES.map(s => s.id))
    for (const r of IDENTITY_MATCH.records) expect(ids.has(r.sourceId), r.sourceId).toBe(true)
    expect(IDENTITY_MATCH.evidence.length).toBeGreaterThanOrEqual(2)
  })
})

describe('GraphCanvas', () => {
  const canvas = (onSelect = vi.fn()) =>
    render(<GraphCanvas nodes={GRAPH_NODES} edges={GRAPH_EDGES} selectedId={null} onSelect={onSelect} />)

  it('renders one shape per node and one line per edge', () => {
    const { container } = canvas()
    expect(container.querySelectorAll('[data-node]')).toHaveLength(GRAPH_NODES.length)
    expect(container.querySelectorAll('[data-edge]')).toHaveLength(GRAPH_EDGES.length)
  })

  it('exposes every node as a labelled button', () => {
    canvas()
    expect(screen.getByRole('button', { name: new RegExp(GRAPH_NODES[0].label, 'i') })).toBeDefined()
  })

  it('reports the chosen node', () => {
    const onSelect = vi.fn()
    canvas(onSelect)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(GRAPH_NODES[0].label, 'i') }))
    expect(onSelect).toHaveBeenCalledWith(GRAPH_NODES[0].id)
  })

  it('zooms in and out through its controls', () => {
    const { container } = canvas()
    const before = container.querySelector('svg g')!.getAttribute('transform')
    fireEvent.click(screen.getByRole('button', { name: /zoom in/i }))
    expect(container.querySelector('svg g')!.getAttribute('transform')).not.toBe(before)
  })
})

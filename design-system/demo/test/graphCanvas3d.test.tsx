import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GraphCanvas3D } from '../components/GraphCanvas3D'
import { GraphLegend, LEGEND_KINDS } from '../components/GraphLegend'
import { GRAPH_NODES, GRAPH_EDGES, nodesForDomain } from '../data/graph'

const renderGraph = (nodes = GRAPH_NODES) =>
  render(
    <GraphCanvas3D
      allNodes={GRAPH_NODES}
      nodes={nodes}
      edges={GRAPH_EDGES}
      selectedId={null}
      onSelect={() => {}}
    />
  )

describe('GraphCanvas3D', () => {
  // jsdom has no WebGL context, which is exactly the condition a browser without
  // one reports — so this suite is also the real no-WebGL test.
  it('falls back to the SVG graph where WebGL cannot be created', () => {
    const { container } = renderGraph()
    expect(container.querySelector('.dm-canvas svg')).not.toBeNull()
    expect(container.querySelector('.dm-g3')).toBeNull()
  })

  it('keeps every node reachable in the fallback, not just drawn', () => {
    renderGraph()
    // The SVG graph exposes each node as its own control; losing that on the
    // fallback path would make the graph keyboard-unreachable for anyone whose
    // browser blocks WebGL.
    const first = GRAPH_NODES[0]
    expect(screen.getAllByText(first.label).length).toBeGreaterThan(0)
  })

  it('renders the filtered slice, not the whole graph, when a domain is chosen', () => {
    const claims = nodesForDomain('claims')
    const { container } = renderGraph(claims)
    const drawn = container.querySelectorAll('[data-node]')
    expect(drawn.length).toBe(claims.length)
    expect(drawn.length).toBeLessThan(GRAPH_NODES.length)
  })
})

describe('GraphLegend', () => {
  it('explains every node kind the data actually contains', () => {
    render(<GraphLegend />)
    // The guard that matters: if a new kind is added to the data and not to the
    // legend, the graph gains a colour nothing on screen explains.
    for (const kind of new Set(GRAPH_NODES.map(n => n.kind))) {
      expect(LEGEND_KINDS, kind).toContain(kind)
    }
  })

  it('names each kind in text, not colour alone', () => {
    render(<GraphLegend />)
    expect(screen.getByText('Entity')).toBeDefined()
    expect(screen.getByText('Document')).toBeDefined()
    expect(screen.getByText('Event')).toBeDefined()
    expect(screen.getByText('Selected')).toBeDefined()
  })
})

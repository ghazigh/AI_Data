import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { Graph } from '../screens/Graph'
import { KNOWLEDGE_BASES, GRAPH_NODES, IDENTITY_MATCH } from '../data/graph'

describe('Graph screen', () => {
  it('lists every knowledge base with its score', () => {
    render(<Graph />)
    const list = screen.getByRole('list', { name: /knowledge bases/i })
    expect(within(list).getAllByRole('listitem')).toHaveLength(KNOWLEDGE_BASES.length)
  })

  it('filters the canvas to one knowledge base', () => {
    const { container } = render(<Graph />)
    const all = container.querySelectorAll('[data-node]').length
    fireEvent.click(screen.getByRole('button', { name: /^claims/i }))
    expect(container.querySelectorAll('[data-node]').length).toBeLessThan(all)
  })

  it('shows entity detail with provenance when a node is chosen', () => {
    render(<Graph />)
    const node = GRAPH_NODES[0]
    fireEvent.click(screen.getByRole('button', { name: new RegExp(node.label, 'i') }))
    const detail = screen.getByRole('region', { name: new RegExp(node.label, 'i') })
    expect(within(detail).getByText(node.properties[0].name)).toBeDefined()
    expect(within(detail).getByText(new RegExp(node.properties[0].source, 'i'))).toBeDefined()
    expect(within(detail).getByText(node.freshness)).toBeDefined()
  })

  it('shows the identity resolution across all three systems', () => {
    render(<Graph />)
    const panel = screen.getByRole('region', { name: /resolved across systems/i })
    for (const r of IDENTITY_MATCH.records) {
      expect(within(panel).getByText(r.system)).toBeDefined()
      expect(within(panel).getByText(r.key)).toBeDefined()
    }
    expect(within(panel).getByText(/98/)).toBeDefined()
  })

  it('states that any agent can read it', () => {
    render(<Graph />)
    expect(screen.getByText(/served to/i)).toBeDefined()
  })
})

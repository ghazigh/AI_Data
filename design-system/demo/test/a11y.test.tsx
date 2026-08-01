import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DemoApp } from '../DemoApp'
import { ROUTES } from '../routes'
import { prefixForSlug } from '../router'
import { GRAPH_NODES } from '../data/graph'

describe.each(ROUTES.map(r => [r.slug || 'index', r.slug] as const))('%s screen', (_name, slug) => {
  const setup = () => render(<DemoApp slug={slug} prefix={prefixForSlug(slug)} />)

  it('has exactly one h1', () => {
    const { container } = setup()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('labels every button and link', () => {
    const { container } = setup()
    for (const el of container.querySelectorAll('a, button')) {
      const label = el.textContent?.trim() || el.getAttribute('aria-label')
      expect(label, el.outerHTML.slice(0, 90)).toBeTruthy()
    }
  })

  it('gives every table a caption', () => {
    const { container } = setup()
    for (const t of container.querySelectorAll('table')) {
      expect(t.querySelector('caption')?.textContent, 'table without caption').toBeTruthy()
    }
  })

  it('scopes every column header', () => {
    const { container } = setup()
    for (const th of container.querySelectorAll('th')) {
      // Column headers scope to their column; a state-group heading spans the
      // row group it introduces, so it scopes to that instead.
      const expected = th.hasAttribute('colspan') ? 'rowgroup' : 'col'
      expect(th.getAttribute('scope'), th.textContent ?? '').toBe(expected)
    }
  })

  it('gives every image role an accessible name', () => {
    const { container } = setup()
    for (const svg of container.querySelectorAll('svg[role="img"], svg[role="application"]')) {
      expect(svg.getAttribute('aria-label'), svg.outerHTML.slice(0, 60)).toBeTruthy()
    }
  })
})

// The default render of the graph screen never mounts EntityDetail — it only
// appears once a node is selected — so the sweep above cannot see its table.
// Select a node and re-run the same table checks against what that reveals.
describe('graph screen, node selected', () => {
  const setup = () => {
    const result = render(<DemoApp slug="graph" prefix={prefixForSlug('graph')} />)
    const node = GRAPH_NODES[0]
    fireEvent.click(screen.getByRole('button', { name: new RegExp(node.label, 'i') }))
    return result
  }

  it('gives every table a caption', () => {
    const { container } = setup()
    for (const t of container.querySelectorAll('table')) {
      expect(t.querySelector('caption')?.textContent, 'table without caption').toBeTruthy()
    }
  })

  it('scopes every column header', () => {
    const { container } = setup()
    for (const th of container.querySelectorAll('th')) {
      // Column headers scope to their column; a state-group heading spans the
      // row group it introduces, so it scopes to that instead.
      const expected = th.hasAttribute('colspan') ? 'rowgroup' : 'col'
      expect(th.getAttribute('scope'), th.textContent ?? '').toBe(expected)
    }
  })
})

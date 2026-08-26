import { render } from '@testing-library/react'
import { PAGES } from '../../site/pages/index'

/**
 * Every page carries the section rail, and it is built from the markup rather
 * than from a list kept somewhere else — so a section added or renamed without
 * a rail label simply drops off the rail, silently. These assertions are what
 * makes that visible.
 */
const pages = PAGES.filter(p => !p.noindex)

test.each(pages.map(p => [p.slug, p] as const))('%s offers a usable rail', (_slug, page) => {
  const { container } = render(<page.Component />)
  const rails = [...container.querySelectorAll('[data-rail]')]
  // site.js only builds the rail past two entries; fewer is not navigation
  expect(rails.length).toBeGreaterThan(2)
  rails.forEach(el => {
    // the rail links to the id, so a label without one goes nowhere
    expect(el.id).toBeTruthy()
    const label = el.getAttribute('data-rail')!
    expect(label.length).toBeGreaterThan(2)
    expect(label.length).toBeLessThanOrEqual(14)
  })
  const ids = rails.map(el => el.id)
  expect(new Set(ids).size).toBe(ids.length)
})

test('the rail follows the page, not the other way round', () => {
  const Home = PAGES.find(p => p.slug === 'index')!.Component
  const { container } = render(<Home />)
  const rails = [...container.querySelectorAll('[data-rail]')]
  const order = rails.map(el => el.getAttribute('data-rail'))
  // the home page's rail is the product sequence; out of order it misleads
  expect(order.slice(0, 6)).toEqual(['Connect', 'Ready', 'Pipelines', 'Graph', 'Search', 'Use cases'])
})

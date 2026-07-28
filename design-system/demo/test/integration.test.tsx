import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SiteNav } from '../../site/components/SiteNav'

describe('marketing site integration', () => {
  it('offers the demo in the primary navigation', () => {
    render(<SiteNav current="platform" />)
    const links = screen.getAllByRole('link', { name: /demo/i })
    expect(links.length).toBeGreaterThan(0)
    expect(links[0].getAttribute('href')).toBe('./demo/')
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SiteNav } from '../../site/components/SiteNav'
import { Home } from '../../site/pages/Home'
import { Platform } from '../../site/pages/Platform'

describe('marketing site integration', () => {
  it('offers the demo in the primary navigation', () => {
    render(<SiteNav current="platform" />)
    const links = screen.getAllByRole('link', { name: /demo/i })
    expect(links.length).toBeGreaterThan(0)
    expect(links[0].getAttribute('href')).toBe('./demo/')
  })

  it('offers the demo from home and platform under one name', () => {
    for (const Page of [Home, Platform]) {
      const { unmount } = render(<Page />)
      const cta = screen.getAllByRole('link', { name: 'Explore the product' })
      expect(cta.length).toBeGreaterThan(0)
      expect(cta[0].getAttribute('href')).toBe('./demo/')
      unmount()
    }
  })
})

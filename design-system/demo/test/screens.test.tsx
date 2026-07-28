import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { Overview } from '../screens/Overview'
import { ESTATE } from '../data/tenant'
import { topUseCases } from '../data/useCases'

describe('Overview', () => {
  it('leads with the estate headline numbers', () => {
    render(<Overview />)
    expect(screen.getByText('71')).toBeDefined()
    expect(screen.getByText(String(ESTATE.sourcesConnected))).toBeDefined()
    expect(screen.getByText('2.4')).toBeDefined()
    expect(screen.getByText('184')).toBeDefined()
  })

  it('shows the five stages with live status', () => {
    render(<Overview />)
    const strip = screen.getByRole('list', { name: 'Product stages' })
    expect(within(strip).getAllByRole('listitem')).toHaveLength(5)
  })

  it('shows the five domains carrying the most sources, not all eight', () => {
    render(<Overview />)
    const panel = screen.getByRole('region', { name: /readiness by business domain/i })
    expect(within(panel).getAllByRole('listitem')).toHaveLength(5)
  })

  it('links through to all eight domains', () => {
    render(<Overview />)
    expect(screen.getByRole('link', { name: /open readiness/i })).toBeDefined()
  })

  it('shows the estate activity stream', () => {
    render(<Overview />)
    const panel = screen.getByRole('region', { name: /estate activity/i })
    expect(within(panel).getAllByRole('listitem').length).toBeGreaterThanOrEqual(6)
  })

  it('shows the three highest-impact use cases with their status', () => {
    render(<Overview />)
    const panel = screen.getByRole('region', { name: /what the graph already supports/i })
    for (const u of topUseCases(3)) {
      expect(within(panel).getByText(u.name)).toBeDefined()
      expect(within(panel).getByText(u.impact)).toBeDefined()
    }
  })

  it('never numbers the domain rows', () => {
    render(<Overview />)
    const panel = screen.getByRole('region', { name: /readiness by business domain/i })
    expect(within(panel).queryByText('01')).toBeNull()
  })
})

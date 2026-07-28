import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { Ready } from '../screens/Ready'
import { DIMENSIONS, TREND, RED_FLAGS } from '../data/readiness'
import { DOMAINS, ESTATE } from '../data/tenant'
import { SOURCES } from '../data/sources'

describe('readiness data', () => {
  it('scores the five dimensions the product names', () => {
    expect(DIMENSIONS.map(d => d.label)).toEqual([
      'Completeness', 'Freshness', 'Consistency', 'Semantic coverage', 'Governance coverage',
    ])
  })

  it('trends four quarters, ending on the current estate score', () => {
    expect(TREND).toHaveLength(4)
    expect(TREND[TREND.length - 1].value).toBe(ESTATE.score)
  })

  it('rises across the trend by the stated delta', () => {
    expect(TREND[3].value - TREND[2].value).toBe(ESTATE.scoreDelta)
  })

  it('points every red flag at a real source', () => {
    const ids = new Set(SOURCES.map(s => s.id))
    expect(RED_FLAGS.length).toBeGreaterThanOrEqual(5)
    for (const f of RED_FLAGS) expect(ids.has(f.sourceId), f.sourceId).toBe(true)
  })

  it('gives every red flag a count a data team can act on', () => {
    for (const f of RED_FLAGS) expect(f.count).toBeGreaterThan(0)
  })
})

describe('Ready screen', () => {
  it('leads with the estate score and its trend', () => {
    render(<Ready />)
    expect(screen.getByRole('meter', { name: /agent-readiness/i })).toBeDefined()
    expect(screen.getByRole('img', { name: /by quarter/i })).toBeDefined()
  })

  it('shows all eight domains, unlike the overview', () => {
    render(<Ready />)
    const panel = screen.getByRole('region', { name: /readiness by domain/i })
    expect(within(panel).getAllByRole('listitem')).toHaveLength(DOMAINS.length)
  })

  it('lists the red flags with a route into pipelines', () => {
    render(<Ready />)
    const panel = screen.getByRole('region', { name: /red flags/i })
    expect(within(panel).getAllByRole('link', { name: /send to pipelines/i }).length).toBe(RED_FLAGS.length)
  })

  it('shows an informative empty state for a domain with no red flags, and clears back', () => {
    render(<Ready />)
    // 'Support' carries none of the seeded red flags.
    expect(RED_FLAGS.some(f => f.domain === 'support')).toBe(false)

    const domainPanel = screen.getByRole('region', { name: /readiness by domain/i })
    fireEvent.click(within(domainPanel).getByRole('button', { name: /^support$/i }))

    const flagsPanel = screen.getByRole('region', { name: /red flags/i })
    expect(within(flagsPanel).getByText(/no red flags in support/i)).toBeDefined()
    expect(within(flagsPanel).queryAllByRole('link', { name: /send to pipelines/i })).toHaveLength(0)

    fireEvent.click(within(flagsPanel).getByRole('button', { name: /show all red flags/i }))
    expect(within(flagsPanel).getAllByRole('link', { name: /send to pipelines/i }).length).toBe(RED_FLAGS.length)
  })
})

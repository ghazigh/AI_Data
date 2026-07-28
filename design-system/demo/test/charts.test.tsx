import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ScoreMeter } from '../components/charts/ScoreMeter'
import { TrendLine } from '../components/charts/TrendLine'
import { DomainBars } from '../components/charts/DomainBars'
import { DimensionRadar } from '../components/charts/DimensionRadar'
import { DOMAINS } from '../data/tenant'

describe('ScoreMeter', () => {
  it('exposes the score as a meter', () => {
    render(<ScoreMeter score={71} delta={6} />)
    const m = screen.getByRole('meter')
    expect(m.getAttribute('aria-valuenow')).toBe('71')
    expect(screen.getByText('71')).toBeDefined()
  })

  it('signs a positive delta with the up glyph', () => {
    render(<ScoreMeter score={71} delta={6} />)
    // Asserting the glyph, not just that "6" appears — the old assertion
    // (/6/) would pass identically whether the meter rendered ▲ or ▼.
    expect(screen.getByText('▲ 6 since last quarter')).toBeDefined()
  })

  it('signs a negative delta with the down glyph', () => {
    render(<ScoreMeter score={65} delta={-4} />)
    expect(screen.getByText('▼ 4 since last quarter')).toBeDefined()
  })
})

describe('TrendLine', () => {
  it('describes itself and plots every point', () => {
    const { container } = render(
      <TrendLine ariaLabel="Estate score by quarter" points={[
        { label: 'Q3 25', value: 58 }, { label: 'Q4 25', value: 62 },
        { label: 'Q1 26', value: 65 }, { label: 'Q2 26', value: 71 },
      ]} />,
    )
    expect(screen.getByRole('img', { name: 'Estate score by quarter' })).toBeDefined()
    expect(container.querySelectorAll('circle')).toHaveLength(4)
  })
})

describe('DomainBars', () => {
  it('lists every domain with its score', () => {
    render(<DomainBars domains={DOMAINS} />)
    for (const d of DOMAINS) {
      expect(screen.getByText(d.name)).toBeDefined()
      expect(screen.getByText(String(d.score))).toBeDefined()
    }
  })

  it('marks domains under the threshold', () => {
    const { container } = render(<DomainBars domains={DOMAINS} threshold={70} />)
    const under = DOMAINS.filter(d => d.score < 70).length
    expect(container.querySelectorAll('.dm-bar-fill.is-under')).toHaveLength(under)
  })

  it('never numbers the rows', () => {
    render(<DomainBars domains={DOMAINS} />)
    expect(screen.queryByText('01')).toBeNull()
  })

  it('calls back when a domain is chosen', () => {
    const onSelect = vi.fn()
    render(<DomainBars domains={DOMAINS} onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('button', { name: /claims/i }))
    expect(onSelect).toHaveBeenCalledWith('claims')
  })
})

describe('DimensionRadar', () => {
  it('labels every dimension', () => {
    render(<DimensionRadar dimensions={[
      { label: 'Completeness', value: 82 }, { label: 'Freshness', value: 64 },
      { label: 'Consistency', value: 70 }, { label: 'Semantic coverage', value: 58 },
      { label: 'Governance coverage', value: 79 },
    ]} />)
    expect(screen.getByText('Completeness')).toBeDefined()
    expect(screen.getByText('Semantic coverage')).toBeDefined()
  })
})

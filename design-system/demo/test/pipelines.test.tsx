import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, act } from '@testing-library/react'
import { Pipelines } from '../screens/Pipelines'
import { PLAN, RUNS, LIVE_RUN } from '../data/pipelines'
import { DOMAINS } from '../data/tenant'

describe('pipeline data', () => {
  it('quotes the canon counts', () => {
    const counts = Object.fromEntries(PLAN.map(s => [s.kind, s.count]))
    expect(counts.resolve).toBe(41_208)
    expect(counts.type).toBe(380)
    expect(counts.mask).toBe(12)
    expect(counts.chunk).toBe(22_470)
  })

  it('attaches a readiness delta to every step, aimed at a real domain', () => {
    const keys = new Set(DOMAINS.map(d => d.key))
    for (const s of PLAN) {
      expect(s.delta).toBeGreaterThan(0)
      expect(keys.has(s.domain), s.kind).toBe(true)
    }
  })

  it('has run history with durations and outcomes', () => {
    expect(RUNS.length).toBeGreaterThanOrEqual(5)
    for (const r of RUNS) {
      expect(r.duration).toMatch(/m|s|h/)
      expect(['succeeded', 'failed']).toContain(r.outcome)
    }
  })

  it('starts the live run part-way through', () => {
    expect(LIVE_RUN.progress).toBeGreaterThan(0)
    expect(LIVE_RUN.progress).toBeLessThan(100)
  })
})

describe('Pipelines screen', () => {
  it('shows every planned step with the count that justifies it', () => {
    render(<Pipelines />)
    const panel = screen.getByRole('region', { name: /the plan/i })
    expect(within(panel).getByText('41,208')).toBeDefined()
    expect(within(panel).getByText('22,470')).toBeDefined()
  })

  it('reports live progress to assistive tech', () => {
    render(<Pipelines />)
    const bar = screen.getByRole('progressbar', { name: /identity resolution/i })
    expect(Number(bar.getAttribute('aria-valuenow'))).toBeGreaterThan(0)
  })

  it('advances the live run over time', () => {
    vi.useFakeTimers()
    render(<Pipelines />)
    const before = Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'))
    act(() => { vi.advanceTimersByTime(3000) })
    const after = Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'))
    expect(after).toBeGreaterThan(before)
    vi.useRealTimers()
  })

  it('lists run history', () => {
    render(<Pipelines />)
    expect(screen.getByRole('table', { name: /run history/i })).toBeDefined()
  })
})

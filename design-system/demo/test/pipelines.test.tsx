import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, act, fireEvent } from '@testing-library/react'
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
    const panel = screen.getByRole('region', { name: /the restructuring this estate actually needs/i })
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

  it('runs a started step to completion instead of stalling at 96', () => {
    vi.useFakeTimers()
    render(<Pipelines />)
    const panel = screen.getByRole('region', { name: /the restructuring this estate actually needs/i })
    const runButton = within(panel).getAllByRole('button', { name: /run step/i })[0]
    act(() => { fireEvent.click(runButton) })

    // Progress starts at 6 and climbs by 4 every 1400ms — 24 ticks comfortably
    // clears 100 (6 + 24*4 = 102, capped at 100).
    act(() => { vi.advanceTimersByTime(24 * 1400) })

    const doneButton = within(panel).getAllByRole('button', { name: /^done$/i })[0] as HTMLButtonElement
    expect(doneButton.disabled).toBe(true)
    const bar = within(panel).getAllByRole('progressbar')[0]
    expect(Number(bar.getAttribute('aria-valuenow'))).toBe(100)

    // The step's interval must be cleared once it completes: advancing far
    // further must not change anything (and must not throw from a dangling
    // timer touching an unmounted tree).
    act(() => { vi.advanceTimersByTime(50_000) })
    expect(Number(within(panel).getAllByRole('progressbar')[0].getAttribute('aria-valuenow'))).toBe(100)

    vi.useRealTimers()
  })

  it('clears every interval on unmount, including the running-step one', () => {
    // A leaked interval that calls setState after unmount produces a React
    // console warning, not a thrown error, so asserting `not.toThrow()` here
    // would pass regardless of whether cleanup actually ran. Spy on
    // setInterval/clearInterval directly and check the counts line up:
    // starting a step opens a second interval (ambient live run + this
    // step), and unmounting must close both.
    vi.useFakeTimers()
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval')
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const { unmount } = render(<Pipelines />)
    expect(setIntervalSpy).toHaveBeenCalledTimes(1) // ambient live run only, no step started yet

    const runButton = screen.getAllByRole('button', { name: /run step/i })[0]
    act(() => { fireEvent.click(runButton) })
    expect(setIntervalSpy).toHaveBeenCalledTimes(2) // + the running-step interval
    expect(clearIntervalSpy).toHaveBeenCalledTimes(0)

    unmount()
    expect(clearIntervalSpy).toHaveBeenCalledTimes(2) // both intervals torn down

    setIntervalSpy.mockRestore()
    clearIntervalSpy.mockRestore()
    vi.useRealTimers()
  })
})

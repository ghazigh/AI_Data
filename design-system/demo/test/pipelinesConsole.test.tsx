import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, fireEvent, act } from '@testing-library/react'
import { DemoStateProvider } from '../state'
import { Pipelines } from '../screens/Pipelines'
import { CATALOGUE_SECTIONS } from '../data/pipelineCatalogue'
import { RUN_HISTORY } from '../data/runHistory'

const renderScreen = () => render(<DemoStateProvider><Pipelines /></DemoStateProvider>)

const [structuring, graph, remediation] = CATALOGUE_SECTIONS

// The shortest-running entry in the catalogue (~6 min baseline, see runState.test.tsx),
// so tests that need a run to actually finish don't have to advance a huge number of ticks.
const fastEntry = remediation.entries.find(e => e.id === 'plan-p3')!

const startFastEntry = () => {
  const region = screen.getByRole('region', { name: remediation.title })
  fireEvent.click(within(region).getByRole('checkbox', { name: new RegExp(`select ${fastEntry.name}`, 'i') }))
  fireEvent.click(within(region).getByRole('button', { name: /configure and run/i }))
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /run pipeline/i }))
}

describe('Pipelines console', () => {
  // The whole point of this task: the screen names itself operationally, and
  // carries none of the marketing language the user objected to.
  it('titles the screen operationally — no heading reads as an explanation of the platform', () => {
    renderScreen()
    for (const heading of screen.getAllByRole('heading')) {
      expect(heading.textContent, heading.textContent ?? '').not.toMatch(/^how /i)
    }
    expect(screen.queryByText(/agent-ready/i)).toBeNull()
    expect(screen.queryByText(/two shapes/i)).toBeNull()
    expect(screen.getByRole('heading', { level: 1, name: 'Pipelines' })).toBeDefined()
  })

  it('removes the old descriptive panels entirely', () => {
    renderScreen()
    expect(screen.queryByRole('region', { name: /two shapes an agent can read/i })).toBeNull()
    expect(screen.queryByRole('region', { name: /adding a dataset to the graph/i })).toBeNull()
    expect(screen.queryByRole('region', { name: /how the graph.s topics are discovered/i })).toBeNull()
  })

  it('reports a summary strip of pipelines available, running and completed', () => {
    const { container } = renderScreen()
    const available = CATALOGUE_SECTIONS.flatMap(s => s.entries).length
    // Scoped to the strip: "Succeeded" is also the outcome pill on every
    // successful row in the history table below, so an unscoped query matches
    // several elements and throws.
    const strip = within(container.querySelector('.dm-tiles') as HTMLElement)
    expect(strip.getByText('Pipelines available')).toBeDefined()
    expect(strip.getByText(String(available))).toBeDefined()
    expect(strip.getByText('Running')).toBeDefined()
    // "Succeeded", not "Completed": the tile counts only successful runs, so a
    // label of "Completed" would disagree with the history table, which also
    // lists failed and cancelled runs.
    expect(strip.getByText('Succeeded')).toBeDefined()
  })

  it('invites the operator to select a pipeline when nothing is running', () => {
    renderScreen()
    const panel = screen.getByRole('region', { name: 'Running now' })
    expect(within(panel).getByText(/select a pipeline/i)).toBeDefined()
    expect(within(panel).queryByRole('progressbar')).toBeNull()
  })

  it('renders all three catalogue sections with their real row counts (7, 2, 6)', () => {
    renderScreen()
    expect(structuring.entries).toHaveLength(7)
    expect(graph.entries).toHaveLength(2)
    expect(remediation.entries).toHaveLength(6)
    for (const section of [structuring, graph, remediation]) {
      const region = screen.getByRole('region', { name: section.title })
      const table = within(region).getByRole('table')
      // header row + one row per entry
      expect(within(table).getAllByRole('row')).toHaveLength(section.entries.length + 1)
    }
  })

  it('moves a selected, configured pipeline into Running now with a progress bar', () => {
    renderScreen()
    startFastEntry()

    const runningPanel = screen.getByRole('region', { name: 'Running now' })
    expect(within(runningPanel).getByText(fastEntry.name)).toBeDefined()
    const bar = within(runningPanel).getByRole('progressbar', { name: fastEntry.name })
    expect(bar.getAttribute('aria-valuenow')).not.toBeNull()
    expect(bar.getAttribute('aria-valuemin')).toBe('0')
    expect(bar.getAttribute('aria-valuemax')).toBe('100')
  })

  it("reports a running run's current stage by name", () => {
    renderScreen()
    startFastEntry()

    const runningPanel = screen.getByRole('region', { name: 'Running now' })
    // A fresh run starts at its first stage.
    expect(within(runningPanel).getByText(new RegExp(fastEntry.stages[0].name))).toBeDefined()
  })

  it('renders run history rows, and opening one shows the stages it executed and the configuration used', () => {
    renderScreen()
    const historyPanel = screen.getByRole('region', { name: 'Run history' })
    const table = within(historyPanel).getByRole('table')
    expect(within(table).getAllByRole('row').length).toBe(RUN_HISTORY.length + 1)

    const seeded = RUN_HISTORY[0]
    const opener = within(historyPanel).getByRole('button', { name: seeded.entryName })
    fireEvent.click(opener)

    const drawer = screen.getByRole('dialog', { name: seeded.entryName })
    expect(within(drawer).getByText(/stages executed/i)).toBeDefined()
    expect(within(drawer).getByText(/configuration/i)).toBeDefined()
    expect(within(drawer).getByText(seeded.configSummary)).toBeDefined()
  })

  it('carries a run this session finishes into run history, with the stages it executed and the configuration it used', () => {
    vi.useFakeTimers()
    renderScreen()
    startFastEntry()

    // Far past even the longest tick budget (MAX_TICKS = 40 in state.tsx) at the
    // screen's own tick cadence — guarantees the run has completed.
    act(() => { vi.advanceTimersByTime(900 * 60) })

    const runningPanel = screen.getByRole('region', { name: 'Running now' })
    expect(within(runningPanel).queryByText(fastEntry.name)).toBeNull()

    const historyPanel = screen.getByRole('region', { name: 'Run history' })
    // The seeded RUN_HISTORY also has an entry named "Mask personal data" (a past
    // dry run), so this session's own row — always listed first — is the one to open.
    const openers = within(historyPanel).getAllByRole('button', { name: fastEntry.name })
    fireEvent.click(openers[0])

    const drawer = screen.getByRole('dialog', { name: fastEntry.name })
    expect(within(drawer).getByText(fastEntry.stages[0].name)).toBeDefined()
    expect(within(drawer).getByText(/configuration/i)).toBeDefined()

    vi.useRealTimers()
  })

  it('only advances runs while at least one is running, and clears the interval on unmount', () => {
    vi.useFakeTimers()
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval')
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const { unmount } = renderScreen()

    // Nothing running yet — no interval should have started.
    expect(setIntervalSpy).not.toHaveBeenCalled()

    startFastEntry()
    expect(setIntervalSpy).toHaveBeenCalledTimes(1)

    unmount()
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)

    setIntervalSpy.mockRestore()
    clearIntervalSpy.mockRestore()
    vi.useRealTimers()
  })
})

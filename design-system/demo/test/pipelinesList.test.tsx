import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { DemoStateProvider, useDemoState } from '../state'
import { Pipelines } from '../screens/Pipelines'
import { DemoRoot } from '../DemoRoot'
import { allEntries, entryById } from '../data/pipelineCatalogue'
import { defaultConfigFor } from '../runConfig'

const renderScreen = () => render(<DemoStateProvider><Pipelines /></DemoStateProvider>)

/** Data rows only — the table also carries one header row per state group. */
const dataRows = () => document.querySelectorAll('.dm-prow')

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
})

describe('Pipelines list', () => {
  it('lists every pipeline in one table', () => {
    renderScreen()
    expect(screen.getByRole('table')).toBeDefined()
    expect(dataRows()).toHaveLength(allEntries().length)
  })

  it('groups the rows by state rather than sorting them by name', () => {
    renderScreen()
    // The seeded estate has a failed run in its history but nothing in flight,
    // so three groups appear and "Running now" does not — an empty group is
    // never rendered, which is what keeps the grouping honest.
    const groups = [...document.querySelectorAll('.dm-grouprow')].map(g => g.textContent)
    expect(groups.some(g => g?.startsWith('Needs attention'))).toBe(true)
    expect(groups.some(g => g?.startsWith('Scheduled'))).toBe(true)
    expect(groups.some(g => g?.startsWith('Manual'))).toBe(true)
    expect(groups.some(g => g?.startsWith('Running now'))).toBe(false)
  })

  it('carries each pipeline reliability on the row itself', () => {
    renderScreen()
    const row = screen.getByRole('link', { name: 'Tables structuring' }).closest('tr')!
    expect(within(row).getByText(/%$/)).toBeDefined()
    expect(within(row).getByRole('img', { name: /last 13 runs/i })).toBeDefined()
  })

  it('counts the pipelines above the table, with no in-progress clause when nothing runs', () => {
    // Scoped to the count line itself: the status filter's own "In progress"
    // option is legitimately in the DOM at all times (a select's closed
    // options are never removed), so an unscoped text query for that phrase
    // would find it regardless of whether anything is actually running —
    // this test is about the count line's own wording, not the whole page.
    const { container } = renderScreen()
    const count = container.querySelector('.dm-pipe-count')!
    expect(count.textContent).toBe(`${allEntries().length} pipelines`)
    expect(count.textContent).not.toMatch(/in progress/i)
  })

  it('links each row to its workspace', () => {
    renderScreen()
    const entry = allEntries()[0]
    const link = screen.getByRole('link', { name: entry.name })
    // The screen is served at /demo/pipelines/ (one level deep), so its own
    // workspace links go back up to /demo/ before descending again.
    expect(link.getAttribute('href')).toBe(`../pipelines/${entry.id}/`)
  })

  it('filters the table by kind', () => {
    renderScreen()
    fireEvent.change(screen.getByLabelText(/kind/i), { target: { value: 'graph' } })
    expect(dataRows()).toHaveLength(allEntries().filter(e => e.kind === 'graph').length)
  })

  it('filters the table by search text', () => {
    renderScreen()
    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: 'topic model' } })
    expect(dataRows()).toHaveLength(1)
  })

  it('says so when a filter matches nothing', () => {
    renderScreen()
    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: 'zzzz' } })
    expect(screen.getByText(/no pipelines match/i)).toBeDefined()
  })

  it('reports each pipeline last execution from its history record', () => {
    renderScreen()
    const row = screen.getByRole('link', { name: 'Tables structuring' }).closest('tr')!
    expect(within(row).getByText('12 min ago')).toBeDefined()
    expect(within(row).getByText('Succeeded')).toBeDefined()
  })

  it('offers no way to run a pipeline from the list', () => {
    renderScreen()
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
    expect(screen.queryByRole('button', { name: /configure and run/i })).toBeNull()
  })
})

describe('Create pipeline dialog', () => {
  // DemoRoot rather than the bare screen: creating a pipeline navigates through
  // the router now, so the slug that decides which screen renders lives above
  // this screen. Rendering Pipelines alone would leave it showing the list
  // forever — and would be testing a swap the product no longer performs.
  it('creates a pipeline and lands on its workspace', () => {
    render(<DemoRoot initialSlug="pipelines" />)
    fireEvent.click(screen.getByRole('button', { name: /create pipeline/i }))
    const dialog = screen.getByRole('dialog')
    fireEvent.change(within(dialog).getByLabelText(/name/i), { target: { value: 'Broker email triage' } })
    fireEvent.click(within(dialog).getAllByRole('checkbox')[0])
    fireEvent.click(within(dialog).getByRole('button', { name: /create pipeline/i }))
    expect(screen.getByRole('heading', { level: 1, name: 'Broker email triage' })).toBeDefined()
  })

  it('refuses a name that is already taken', () => {
    render(<DemoStateProvider><Pipelines /></DemoStateProvider>)
    fireEvent.click(screen.getByRole('button', { name: /create pipeline/i }))
    const dialog = screen.getByRole('dialog')
    fireEvent.change(within(dialog).getByLabelText(/name/i), { target: { value: 'Tables structuring' } })
    fireEvent.click(within(dialog).getAllByRole('checkbox')[0])
    fireEvent.click(within(dialog).getByRole('button', { name: /create pipeline/i }))
    expect(within(dialog).getByText(/already/i)).toBeDefined()
  })
})

describe('Pipelines tick interval', () => {
  // The list page itself has no run-starting UI any more (running one
  // happens in a pipeline's own workspace) — so a run is started directly
  // through DemoState, via a probe mounted alongside the screen in the same
  // provider, the same way runState.test.tsx and crossScreen.test.tsx do.
  const entry = entryById('graph-extend')!

  function StartRun() {
    const { startRun } = useDemoState()
    return <button onClick={() => startRun(entry, defaultConfigFor(entry))}>start</button>
  }

  const renderWithStarter = () =>
    render(
      <DemoStateProvider>
        <StartRun />
        <Pipelines />
      </DemoStateProvider>
    )

  it('lifts a running pipeline into its own group and marks the row live', () => {
    renderWithStarter()
    // Nothing in flight: no Running group, and no row is marked live.
    expect(document.querySelectorAll('.dm-prow.is-live')).toHaveLength(0)

    fireEvent.click(screen.getByText('start'))

    const groups = [...document.querySelectorAll('.dm-grouprow')].map(g => g.textContent)
    expect(groups.some(g => g?.startsWith('Running now'))).toBe(true)

    const live = document.querySelectorAll('.dm-prow.is-live')
    expect(live).toHaveLength(1)
    expect(live[0].textContent).toContain(entry.name)
    // The dot pulses only while something actually runs — state, not decoration.
    expect(live[0].querySelector('.dm-live.is-run')).not.toBeNull()
  })

  it('only advances runs while at least one is running, and clears the interval on unmount', () => {
    vi.useFakeTimers()
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval')
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const { unmount } = renderWithStarter()

    // Nothing running yet — no interval should have started.
    expect(setIntervalSpy).not.toHaveBeenCalled()

    fireEvent.click(screen.getByText('start'))
    expect(setIntervalSpy).toHaveBeenCalledTimes(1)

    unmount()
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)

    setIntervalSpy.mockRestore()
    clearIntervalSpy.mockRestore()
    vi.useRealTimers()
  })
})

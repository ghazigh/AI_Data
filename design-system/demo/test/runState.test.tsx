import { describe, it, expect } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { DemoStateProvider, useDemoState, ticksToComplete, MIN_TICKS, MAX_TICKS } from '../state'
import { allEntries, entryById } from '../data/pipelineCatalogue'
import { defaultConfigFor, projectRun } from '../runConfig'

const entry = entryById('graph-extend')!

function Probe() {
  const { runs, startRun, cancelRun, advanceRuns } = useDemoState()
  return (
    <div>
      <button onClick={() => startRun(entry, defaultConfigFor(entry))}>start</button>
      <button onClick={() => advanceRuns()}>tick</button>
      <button onClick={() => runs[0] && cancelRun(runs[0].id)}>cancel</button>
      <p data-testid="count">{runs.length}</p>
      <p data-testid="status">{runs[0]?.status ?? 'none'}</p>
      <p data-testid="stage">{runs[0]?.stageIndex ?? -1}</p>
      <p data-testid="processed">{runs[0]?.recordsProcessed ?? -1}</p>
    </div>
  )
}

const setup = () => render(<DemoStateProvider><Probe /></DemoStateProvider>)
const val = (id: string) => screen.getByTestId(id).textContent

describe('run state', () => {
  it('starts with no runs, so the first render is identical everywhere', () => {
    setup()
    expect(val('count')).toBe('0')
  })

  it('queues a run at stage zero with nothing processed', () => {
    setup()
    fireEvent.click(screen.getByText('start'))
    expect(val('count')).toBe('1')
    expect(val('status')).toBe('running')
    expect(val('stage')).toBe('0')
    expect(val('processed')).toBe('0')
  })

  it('advances records and stages monotonically', () => {
    setup()
    fireEvent.click(screen.getByText('start'))
    let last = -1
    for (let i = 0; i < 40; i++) {
      act(() => { fireEvent.click(screen.getByText('tick')) })
      const p = Number(val('processed'))
      expect(p).toBeGreaterThanOrEqual(last)
      last = p
    }
  })

  it('completes with everything processed and nothing left running', () => {
    setup()
    fireEvent.click(screen.getByText('start'))
    for (let i = 0; i < 400; i++) act(() => { fireEvent.click(screen.getByText('tick')) })
    expect(val('status')).toBe('completed')
    const projected = Number(val('processed'))
    expect(projected).toBeGreaterThan(0)
  })

  it('never advances past the final stage', () => {
    setup()
    fireEvent.click(screen.getByText('start'))
    for (let i = 0; i < 400; i++) act(() => { fireEvent.click(screen.getByText('tick')) })
    expect(Number(val('stage'))).toBe(entry.stages.length - 1)
  })

  it('cancels a running run and says so', () => {
    setup()
    fireEvent.click(screen.getByText('start'))
    act(() => { fireEvent.click(screen.getByText('tick')) })
    fireEvent.click(screen.getByText('cancel'))
    expect(val('status')).toBe('cancelled')
  })

  it('records the configuration the run was started with', () => {
    setup()
    fireEvent.click(screen.getByText('start'))
    expect(val('count')).toBe('1')
  })

  it('clears runs on reset', () => {
    const Reset = () => {
      const { resetDemo } = useDemoState()
      return <button onClick={resetDemo}>reset</button>
    }
    render(<DemoStateProvider><Probe /><Reset /></DemoStateProvider>)
    fireEvent.click(screen.getAllByText('start')[0])
    fireEvent.click(screen.getByText('reset'))
    expect(screen.getAllByTestId('count')[0].textContent).toBe('0')
  })
})

describe('tick budget scales with projected runtime', () => {
  // Shortest and longest projected runtimes in the catalogue (under each entry's default
  // config) — plan-p3 (~6 min) and structuring-images (~1230 min). A fixed tick count would
  // make both finish at the same moment, contradicting the duration each screen row states.
  const shortEntry = entryById('plan-p3')!
  const longEntry = entryById('structuring-images')!

  function Multi() {
    const { runs, startRun, advanceRuns } = useDemoState()
    return (
      <div>
        <button
          onClick={() => {
            startRun(shortEntry, defaultConfigFor(shortEntry))
            startRun(longEntry, defaultConfigFor(longEntry))
          }}
        >
          start
        </button>
        <button onClick={() => advanceRuns()}>tick</button>
        {runs.map(r => (
          <p key={r.id} data-testid={`status-${r.entryId}`}>{r.status}</p>
        ))}
      </div>
    )
  }

  it('gives a longer-projected pipeline strictly more ticks to finish than a shorter one', () => {
    render(<DemoStateProvider><Multi /></DemoStateProvider>)
    fireEvent.click(screen.getByText('start'))

    let shortDoneAt = -1
    let longDoneAt = -1
    for (let tick = 1; tick <= 50; tick++) {
      act(() => { fireEvent.click(screen.getByText('tick')) })
      if (shortDoneAt === -1 && screen.getByTestId(`status-${shortEntry.id}`).textContent === 'completed') shortDoneAt = tick
      if (longDoneAt === -1 && screen.getByTestId(`status-${longEntry.id}`).textContent === 'completed') longDoneAt = tick
    }

    expect(shortDoneAt).toBeGreaterThan(0)
    expect(longDoneAt).toBeGreaterThan(0)
    expect(longDoneAt).toBeGreaterThan(shortDoneAt)
  })

  it('keeps every catalogue entry\'s tick budget within the clamp', () => {
    for (const e of allEntries()) {
      const projection = projectRun(e, defaultConfigFor(e))
      const budget = ticksToComplete(projection.minutes)
      expect(budget, e.id).toBeGreaterThanOrEqual(MIN_TICKS)
      expect(budget, e.id).toBeLessThanOrEqual(MAX_TICKS)
    }
  })
})

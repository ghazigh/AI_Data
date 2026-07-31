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
      <p data-testid="projectedRecords">{runs[0]?.projection.records ?? -1}</p>
      <p data-testid="config">{runs[0] ? JSON.stringify(runs[0].config) : ''}</p>
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
    const processed = Number(val('processed'))
    expect(processed).toBeGreaterThan(0)
    // state.tsx promises these agree bit for bit on completion — not just both
    // being positive, but the exact same number the projection stated.
    expect(processed).toBe(Number(val('projectedRecords')))
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
    // Would pass even if `config` were dropped from RunRecord entirely unless
    // the actual config value is asserted — so compare it against exactly what
    // defaultConfigFor(entry) produces, not just its presence.
    expect(JSON.parse(val('config')!)).toEqual(defaultConfigFor(entry))
  })

  it('remembers a pipeline configuration per entry and clears it on reset', () => {
    // The configure controls live on the components in the Pipeline tab, while the
    // Run button lives in the workspace header — so the configuration cannot be
    // local to either. It is held per entry in shared state, which is what this
    // asserts: a written value survives, and reset puts the entry back to default.
    const configured = entryById('structuring-documents')!

    const ConfigProbe = () => {
      const { configFor, setConfig, resetDemo } = useDemoState()
      const config = configFor(configured)
      return (
        <div>
          <p data-testid="cfg-sources">{config.sourceIds.join(',')}</p>
          <p data-testid="cfg-chunk">{config.chunkStrategy}</p>
          <button onClick={() => setConfig(configured.id, { ...config, chunkStrategy: 'semantic' })}>semantic</button>
          <button onClick={resetDemo}>reset config</button>
        </div>
      )
    }

    render(<DemoStateProvider><ConfigProbe /></DemoStateProvider>)

    expect(val('cfg-sources')).toBe(configured.sourceIds.join(','))
    expect(val('cfg-chunk')).toBe('clause')

    fireEvent.click(screen.getByText('semantic'))
    expect(val('cfg-chunk')).toBe('semantic')

    fireEvent.click(screen.getByText('reset config'))
    expect(val('cfg-chunk')).toBe('clause')
  })

  it('keeps one entry\'s configuration out of another\'s', () => {
    const a = entryById('structuring-email')!
    const b = entryById('structuring-transcripts')!

    const TwoProbe = () => {
      const { configFor, setConfig } = useDemoState()
      return (
        <div>
          <p data-testid="cfg-a">{configFor(a).chunkStrategy}</p>
          <p data-testid="cfg-b">{configFor(b).chunkStrategy}</p>
          <button onClick={() => setConfig(a.id, { ...configFor(a), chunkStrategy: 'fixed' })}>fix a</button>
        </div>
      )
    }

    render(<DemoStateProvider><TwoProbe /></DemoStateProvider>)
    fireEvent.click(screen.getByText('fix a'))
    expect(val('cfg-a')).toBe('fixed')
    expect(val('cfg-b')).toBe('clause')
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

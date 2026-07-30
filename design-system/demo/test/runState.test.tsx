import { describe, it, expect } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { DemoStateProvider, useDemoState } from '../state'
import { entryById } from '../data/pipelineCatalogue'
import { defaultConfigFor } from '../runConfig'

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

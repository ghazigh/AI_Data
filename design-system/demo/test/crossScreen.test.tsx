import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { DemoStateProvider, useDemoState } from '../state'
import { StageStrip } from '../components/StageStrip'
import { Pipelines } from '../screens/Pipelines'
import { allEntries, entryById } from '../data/pipelineCatalogue'
import { defaultConfigFor } from '../runConfig'

// Starts one run via the real startRun action, so `runs` carries a genuine
// running record — the Pipelines list's count line only ever states an "in
// progress" number while one exists (see pipelinesList.test.tsx), so a fresh,
// always-empty `runs: []` state has nothing for this test to compare against.
const entry = entryById('graph-extend')!
function StartRun() {
  const { startRun } = useDemoState()
  return <button onClick={() => startRun(entry, defaultConfigFor(entry))}>start</button>
}

describe('cross-screen agreement: Overview strip vs. the Pipelines list', () => {
  it("states the same running count and the same available count StageStrip renders on Overview and the Pipelines list's own count line render on Pipelines, from the same state", () => {
    // One DemoStateProvider, so both components read the exact state a real
    // page load (plus one run started on it) would give them.
    render(
      <DemoStateProvider>
        <StageStrip prefix="" />
        <StartRun />
        <Pipelines />
      </DemoStateProvider>
    )

    fireEvent.click(screen.getByText('start'))

    const strip = screen.getByRole('list', { name: 'Product stages' })
    const pipelinesLink = within(strip)
      .getAllByRole('link')
      .find(a => a.getAttribute('href') === 'pipelines/')!
    const stripText = pipelinesLink.textContent!
    const parsed = /(\d+) running · (\d+) available/.exec(stripText)
    expect(parsed, `StageStrip's pipelines cell reads "${stripText}", not the expected "N running · N available" shape`).not.toBeNull()
    const [, stripRunning, stripAvailable] = parsed!

    expect(stripAvailable, 'Overview claims a different available count than the Pipelines list').toBe(
      String(allEntries().length)
    )
    expect(
      screen.getByText(`${allEntries().length} pipelines · ${stripRunning} in progress`),
      'Overview claims a different running count than the Pipelines list'
    ).toBeDefined()
  })
})

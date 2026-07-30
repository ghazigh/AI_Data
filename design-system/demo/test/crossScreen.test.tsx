import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { DemoStateProvider } from '../state'
import { StageStrip } from '../components/StageStrip'
import { Pipelines } from '../screens/Pipelines'

/**
 * Reads the Pipelines screen's own summary tiles into a label -> value map,
 * the same way an operator reading the page would: by which number sits
 * under which heading, not by position or by a query that happens to match.
 */
const tileValues = (container: HTMLElement): Record<string, string> => {
  const tiles = container.querySelectorAll('.dm-tile')
  const out: Record<string, string> = {}
  for (const tile of Array.from(tiles)) {
    const label = tile.querySelector('.dm-eyebrow')!.textContent!
    const value = tile.querySelector('.dm-tile-v')!.textContent!
    out[label] = value
  }
  return out
}

describe('cross-screen agreement: Overview strip vs. the Pipelines console', () => {
  it("states the same running count and the same available count StageStrip renders on Overview and the Pipelines console's own tiles render on Pipelines, from the same fresh state", () => {
    // One DemoStateProvider, so both components read the exact state a real
    // page load would give them — runs: [] on first render either way, which
    // is also the state the hydration guard requires to be deterministic.
    const { container } = render(
      <DemoStateProvider>
        <StageStrip prefix="" />
        <Pipelines />
      </DemoStateProvider>
    )

    const strip = screen.getByRole('list', { name: 'Product stages' })
    const pipelinesLink = within(strip)
      .getAllByRole('link')
      .find(a => a.getAttribute('href') === 'pipelines/')!
    const stripText = pipelinesLink.textContent!
    const parsed = /(\d+) running · (\d+) available/.exec(stripText)
    expect(parsed, `StageStrip's pipelines cell reads "${stripText}", not the expected "N running · N available" shape`).not.toBeNull()
    const [, stripRunning, stripAvailable] = parsed!

    const tiles = tileValues(container)
    expect(tiles['Running'], 'Pipelines console has no "Running" tile').toBeDefined()
    expect(tiles['Pipelines available'], 'Pipelines console has no "Pipelines available" tile').toBeDefined()

    expect(stripRunning, 'Overview claims a different running count than the Pipelines console').toBe(tiles['Running'])
    expect(stripAvailable, 'Overview claims a different available count than the Pipelines console').toBe(
      tiles['Pipelines available']
    )
  })
})

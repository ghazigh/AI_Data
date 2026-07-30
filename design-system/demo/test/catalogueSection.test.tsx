import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { DemoStateProvider } from '../state'
import { CatalogueSection } from '../components/CatalogueSection'
import { CATALOGUE_SECTIONS } from '../data/pipelineCatalogue'

const [structuring, graph, remediation] = CATALOGUE_SECTIONS

const renderSection = (section = structuring) =>
  render(
    <DemoStateProvider>
      <CatalogueSection section={section} />
    </DemoStateProvider>
  )

const checkboxFor = (region: HTMLElement, name: string) =>
  within(region).getByRole('checkbox', { name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') })

describe('CatalogueSection', () => {
  it('renders every entry in the section as a row', () => {
    renderSection(structuring)
    const region = screen.getByRole('region', { name: structuring.title })
    const table = within(region).getByRole('table')
    // header row + one row per entry
    expect(within(table).getAllByRole('row')).toHaveLength(structuring.entries.length + 1)
  })

  it('labels every selection checkbox with its pipeline name', () => {
    renderSection(structuring)
    const region = screen.getByRole('region', { name: structuring.title })
    for (const entry of structuring.entries) {
      expect(checkboxFor(region, entry.name)).toBeDefined()
    }
  })

  it('reveals an action naming the count once rows are selected, and hides it again with nothing selected', () => {
    renderSection(structuring)
    const region = screen.getByRole('region', { name: structuring.title })

    expect(within(region).queryByRole('button', { name: /configure and run/i })).toBeNull()

    fireEvent.click(checkboxFor(region, structuring.entries[0].name))
    fireEvent.click(checkboxFor(region, structuring.entries[1].name))

    expect(within(region).getByRole('button', { name: 'Configure and run 2 pipelines' })).toBeDefined()

    // deselecting back to zero removes the action again
    fireEvent.click(checkboxFor(region, structuring.entries[0].name))
    fireEvent.click(checkboxFor(region, structuring.entries[1].name))
    expect(within(region).queryByRole('button', { name: /configure and run/i })).toBeNull()
  })

  it('shows a schedule for every structuring row', () => {
    renderSection(structuring)
    const region = screen.getByRole('region', { name: structuring.title })
    for (const entry of structuring.entries) {
      expect(entry.schedule).toBeTruthy()
      expect(within(region).getByText(entry.schedule!)).toBeDefined()
    }
  })

  it('shows a readiness delta for every remediation row', () => {
    renderSection(remediation)
    const region = screen.getByRole('region', { name: remediation.title })
    for (const entry of remediation.entries) {
      // Deltas repeat across rows (two entries both gain +6), so scope to
      // this entry's own row rather than searching the whole section.
      const checkbox = checkboxFor(region, entry.name)
      const row = checkbox.closest('tr')!
      expect(within(row).getByText(`+${entry.readinessDelta}`)).toBeDefined()
    }
  })

  it("shows the graph section's re-fit warning without opening anything", () => {
    renderSection(graph)
    const region = screen.getByRole('region', { name: graph.title })

    // Visible without any interaction — no drawer, no dialog anywhere.
    expect(screen.queryByRole('dialog')).toBeNull()

    const refitEntry = graph.entries.find(e => e.warnsOnRefit)!
    const banner = region.querySelector('.dm-blocked')
    expect(banner).toBeTruthy()
    expect(banner!.textContent).toMatch(/breaks every agent binding/i)
    expect(banner!.textContent).toMatch(refitEntry.name)
  })

  it('does not persist selection across sections', () => {
    render(
      <DemoStateProvider>
        <CatalogueSection section={structuring} />
        <CatalogueSection section={remediation} />
      </DemoStateProvider>
    )
    const structuringRegion = screen.getByRole('region', { name: structuring.title })
    const remediationRegion = screen.getByRole('region', { name: remediation.title })

    fireEvent.click(checkboxFor(structuringRegion, structuring.entries[0].name))

    expect(within(structuringRegion).getByRole('button', { name: /configure and run/i })).toBeDefined()
    expect(within(remediationRegion).queryByRole('button', { name: /configure and run/i })).toBeNull()
  })
})

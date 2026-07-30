import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { DemoStateProvider } from '../state'
import { CatalogueSection } from '../components/CatalogueSection'
import { CATALOGUE_SECTIONS, entryById } from '../data/pipelineCatalogue'
import { REFIT_WARNING } from '../runConfig'

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
    // Quotes runConfig's REFIT_WARNING verbatim, not a separately-authored
    // paraphrase — see the "share one string" note in CatalogueSection.tsx.
    expect(banner!.textContent).toMatch(REFIT_WARNING)
    expect(banner!.textContent).toMatch(refitEntry.name)
  })

  it('never renders "new" or "unprocessed" language on the graph-extend row, even though it is scoped to a source graph-construct already claims', () => {
    renderSection(graph)
    const region = screen.getByRole('region', { name: graph.title })
    const extend = entryById('graph-extend')!

    const checkbox = checkboxFor(region, extend.name)
    const row = checkbox.closest('tr')!
    expect(row.textContent).not.toMatch(/\bnew\b|unprocessed/i)
  })

  it('keeps the selection when the drawer is cancelled, but clears it after a run', () => {
    renderSection(structuring)
    const region = screen.getByRole('region', { name: structuring.title })

    fireEvent.click(checkboxFor(region, structuring.entries[0].name))
    fireEvent.click(checkboxFor(region, structuring.entries[1].name))
    fireEvent.click(within(region).getByRole('button', { name: 'Configure and run 2 pipelines' }))

    expect(screen.getByRole('dialog')).toBeDefined()
    fireEvent.keyDown(document, { key: 'Escape' })

    // The drawer closed without running anything — both rows must still be
    // selected, and the action bar must still read the same count.
    expect(screen.queryByRole('dialog')).toBeNull()
    expect((checkboxFor(region, structuring.entries[0].name) as HTMLInputElement).checked).toBe(true)
    expect((checkboxFor(region, structuring.entries[1].name) as HTMLInputElement).checked).toBe(true)
    expect(within(region).getByRole('button', { name: 'Configure and run 2 pipelines' })).toBeDefined()

    // Now actually run it — this time the selection must clear.
    fireEvent.click(within(region).getByRole('button', { name: 'Configure and run 2 pipelines' }))
    const dialog = screen.getByRole('dialog')
    fireEvent.click(within(dialog).getByRole('button', { name: /run 2 pipelines/i }))

    expect(screen.queryByRole('dialog')).toBeNull()
    expect((checkboxFor(region, structuring.entries[0].name) as HTMLInputElement).checked).toBe(false)
    expect((checkboxFor(region, structuring.entries[1].name) as HTMLInputElement).checked).toBe(false)
    expect(within(region).queryByRole('button', { name: /configure and run/i })).toBeNull()
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

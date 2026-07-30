import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { DemoStateProvider, useDemoState } from '../state'
import { ConfigureRunDrawer } from '../components/ConfigureRunDrawer'
import { formatMinutes } from '../components/CatalogueSection'
import { CATALOGUE_SECTIONS, entryById } from '../data/pipelineCatalogue'
import { defaultConfigFor, projectRun } from '../runConfig'
import { sourceName } from '../data/sources'

// Records a snapshot of every run startRun() has created, as plain JSON in the
// DOM, so tests can assert on the real DemoState effect (not a mock) without
// reaching into React internals.
function RunsProbe() {
  const { runs } = useDemoState()
  return (
    <pre data-testid="runs">
      {JSON.stringify(runs.map(r => ({ entryId: r.entryId, config: r.config })))}
    </pre>
  )
}

const getRuns = () => JSON.parse(screen.getByTestId('runs').textContent!) as {
  entryId: string
  config: { sourceIds: string[]; redact: boolean; chunkStrategy: string; refitModels: boolean; dryRun: boolean }
}[]

const renderDrawer = (
  entries: Parameters<typeof ConfigureRunDrawer>[0]['entries'],
  handlers: { onCancel?: () => void; onRun?: () => void } = {}
) =>
  render(
    <DemoStateProvider>
      <RunsProbe />
      <ConfigureRunDrawer
        entries={entries}
        onCancel={handlers.onCancel ?? (() => {})}
        onRun={handlers.onRun ?? (() => {})}
      />
    </DemoStateProvider>
  )

const structuringEmail = entryById('structuring-email')! // has both a Redact stage and a Chunk stage
const structuringTickets = entryById('structuring-tickets')!
const structuringTables = entryById('structuring-tables')! // has Mask, no Chunk stage
const structuringDocuments = entryById('structuring-documents')! // neither Mask/Redact nor a literal "Chunk" stage
const graphConstruct = entryById('graph-construct')!
const graphExtend = entryById('graph-extend')! // scoped to a source graph-construct already claims as processed
const remediationEntry = CATALOGUE_SECTIONS[2].entries[0]

describe('ConfigureRunDrawer', () => {
  it('names the pipeline in the drawer title', () => {
    renderDrawer([structuringEmail])
    expect(screen.getByRole('dialog', { name: structuringEmail.name })).toBeDefined()
  })

  it('shows every source with a checked checkbox', () => {
    renderDrawer([structuringEmail])
    const dialog = screen.getByRole('dialog')
    expect(structuringEmail.sourceIds.length).toBeGreaterThan(1)
    for (const id of structuringEmail.sourceIds) {
      const checkbox = within(dialog).getByRole('checkbox', { name: sourceName(id) }) as HTMLInputElement
      expect(checkbox.checked).toBe(true)
    }
  })

  it('reduces the displayed record count and estimated runtime when a source is unchecked', () => {
    renderDrawer([structuringEmail])
    const dialog = screen.getByRole('dialog')

    const before = projectRun(structuringEmail, defaultConfigFor(structuringEmail))
    expect(within(dialog).getByText(new RegExp(`${before.records.toLocaleString('en-US')} records`))).toBeDefined()
    expect(within(dialog).getByText(new RegExp(escapeRegExp(formatMinutes(before.minutes))))).toBeDefined()

    fireEvent.click(within(dialog).getByRole('checkbox', { name: sourceName(structuringEmail.sourceIds[0]) }))

    const after = projectRun(structuringEmail, {
      ...defaultConfigFor(structuringEmail),
      sourceIds: structuringEmail.sourceIds.slice(1),
    })
    expect(after.records).toBeLessThan(before.records)
    expect(after.minutes).toBeLessThan(before.minutes)
    // The runtime strings must actually differ too — the string comparison
    // is the thing rendered on screen, not just the numbers behind it.
    expect(formatMinutes(after.minutes)).not.toBe(formatMinutes(before.minutes))

    expect(within(dialog).getByText(new RegExp(`${after.records.toLocaleString('en-US')} records`))).toBeDefined()
    expect(within(dialog).getByText(new RegExp(escapeRegExp(formatMinutes(after.minutes))))).toBeDefined()
    expect(within(dialog).queryByText(new RegExp(`${before.records.toLocaleString('en-US')} records`))).toBeNull()
    expect(within(dialog).queryByText(new RegExp(escapeRegExp(formatMinutes(before.minutes))))).toBeNull()
  })

  it('disables the run action once every source is unchecked', () => {
    renderDrawer([structuringEmail])
    const dialog = screen.getByRole('dialog')

    for (const id of structuringEmail.sourceIds) {
      fireEvent.click(within(dialog).getByRole('checkbox', { name: sourceName(id) }))
    }

    const runButton = within(dialog).getByRole('button', { name: /run pipeline/i }) as HTMLButtonElement
    expect(runButton.disabled).toBe(true)
  })

  it('offers a re-fit choice on the graph entry that warns and costs more runtime when selected', () => {
    renderDrawer([graphConstruct])
    const dialog = screen.getByRole('dialog')

    const reuse = projectRun(graphConstruct, defaultConfigFor(graphConstruct))
    const refit = projectRun(graphConstruct, { ...defaultConfigFor(graphConstruct), refitModels: true })
    expect(refit.minutes).toBeGreaterThan(reuse.minutes)

    // Reuse is the default: no rebinding warning yet, and the cheap "applying" stage names show.
    expect(within(dialog).queryByText(/rebind every agent/i)).toBeNull()
    expect(within(dialog).getByText('Project')).toBeDefined()

    fireEvent.click(within(dialog).getByRole('radio', { name: /re-fit from scratch/i }))

    expect(within(dialog).getByText(/rebind every agent/i)).toBeDefined()
    expect(within(dialog).getByText(new RegExp(escapeRegExp(formatMinutes(refit.minutes))))).toBeDefined()
    // The from-scratch fitting stages replace the cheap applying ones.
    expect(within(dialog).getByText('Reduce dimensions')).toBeDefined()
    expect(within(dialog).queryByText('Project')).toBeNull()
  })

  it('offers redaction and chunk strategy on a structuring entry, and warns when redaction is off', () => {
    renderDrawer([structuringEmail])
    const dialog = screen.getByRole('dialog')

    const redact = within(dialog).getByRole('checkbox', { name: /redact/i }) as HTMLInputElement
    expect(redact.checked).toBe(true)
    expect(within(dialog).getByLabelText(/chunk strategy/i)).toBeDefined()

    expect(within(dialog).queryByText(/personal data will reach the index unmasked/i)).toBeNull()
    fireEvent.click(redact)
    expect(within(dialog).getByText(/personal data will reach the index unmasked/i)).toBeDefined()
  })

  it('offers no chunk-strategy control on a structuring entry with no Chunk stage', () => {
    renderDrawer([structuringTables])
    const dialog = screen.getByRole('dialog')

    // tables has a Mask stage, so redaction still applies...
    expect(within(dialog).getByRole('checkbox', { name: /redact/i })).toBeDefined()
    // ...but no literal Chunk stage, so the chunk-strategy control must not render.
    expect(within(dialog).queryByLabelText(/chunk strategy/i)).toBeNull()
  })

  it('offers no options block at all on a structuring entry with neither a masking nor a chunk stage', () => {
    renderDrawer([structuringDocuments])
    const dialog = screen.getByRole('dialog')

    expect(within(dialog).queryByRole('heading', { name: 'Options' })).toBeNull()
    expect(within(dialog).queryByRole('checkbox', { name: /redact/i })).toBeNull()
    expect(within(dialog).queryByLabelText(/chunk strategy/i)).toBeNull()
  })

  it('offers no re-fit control on the graph entry that does not warn on refit', () => {
    renderDrawer([graphExtend])
    const dialog = screen.getByRole('dialog')

    expect(within(dialog).queryByRole('heading', { name: 'Options' })).toBeNull()
    expect(within(dialog).queryAllByRole('radio')).toHaveLength(0)
  })

  it('never renders "new" or "unprocessed" language for the graph entry scoped to an already-claimed source', () => {
    renderDrawer([graphExtend])
    const dialog = screen.getByRole('dialog')
    expect(dialog.textContent).not.toMatch(/\bnew\b|unprocessed/i)
  })

  it('hides the readiness delta on a remediation entry when dry run is selected', () => {
    renderDrawer([remediationEntry])
    const dialog = screen.getByRole('dialog')

    expect(within(dialog).getByText(new RegExp(`\\+${remediationEntry.readinessDelta} readiness`))).toBeDefined()

    fireEvent.click(within(dialog).getByRole('checkbox', { name: /dry run/i }))

    expect(within(dialog).queryByText(/readiness/i)).toBeNull()
    expect(within(dialog).getByText(/dry run.*nothing will be written/i)).toBeDefined()
  })

  it('names the run action for one pipeline, starts it via startRun, and calls onRun (not onCancel)', () => {
    let cancelled = false
    let ran = false
    renderDrawer([structuringEmail], { onCancel: () => { cancelled = true }, onRun: () => { ran = true } })
    const dialog = screen.getByRole('dialog')

    const button = within(dialog).getByRole('button', { name: 'Run pipeline' })
    fireEvent.click(button)

    const runs = getRuns()
    expect(runs).toHaveLength(1)
    expect(runs[0].entryId).toBe(structuringEmail.id)
    expect(runs[0].config.sourceIds).toEqual(structuringEmail.sourceIds)
    expect(ran).toBe(true)
    expect(cancelled).toBe(false)
  })

  it('names the run action for multiple pipelines and starts all of them via startRun', () => {
    let ran = false
    const entries = [structuringEmail, structuringTickets]
    renderDrawer(entries, { onRun: () => { ran = true } })
    const dialog = screen.getByRole('dialog')

    const button = within(dialog).getByRole('button', { name: 'Run 2 pipelines' })
    fireEvent.click(button)

    const runs = getRuns()
    expect(runs).toHaveLength(2)
    expect(runs.map(r => r.entryId).sort()).toEqual(entries.map(e => e.id).sort())
    expect(ran).toBe(true)
  })

  it('calls onCancel, not onRun, when the drawer is dismissed without running anything', () => {
    let cancelled = false
    let ran = false
    renderDrawer([structuringEmail], { onCancel: () => { cancelled = true }, onRun: () => { ran = true } })

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(cancelled).toBe(true)
    expect(ran).toBe(false)
    expect(getRuns()).toHaveLength(0)
  })

  it('shows the raw-to-structured sample for a structuring entry', () => {
    renderDrawer([structuringEmail])
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByText(/before and after/i)).toBeDefined()
  })
})

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

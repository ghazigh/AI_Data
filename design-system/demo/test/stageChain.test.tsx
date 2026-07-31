import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { DemoStateProvider } from '../state'
import { PipelineWorkspace } from '../components/PipelineWorkspace'
import { entryById } from '../data/pipelineCatalogue'
import { REFIT_WARNING, defaultConfigFor, projectRun } from '../runConfig'
import { fittingCounterpart } from '../components/StageChain'

const renderWorkspace = (id: string) =>
  render(<DemoStateProvider><PipelineWorkspace entryId={id} /></DemoStateProvider>)

const chain = () => screen.getByRole('region', { name: /pipeline components/i })

/** Opens a component's panel by the name its card carries right now. */
const openComponent = (name: string | RegExp) => {
  fireEvent.click(screen.getByRole('button', { name: typeof name === 'string' ? new RegExp(name) : name }))
  return screen.getByRole('dialog')
}

const done = () => fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /done/i }))

describe('the Pipeline tab component chain', () => {
  it('draws a Source card followed by one card per stage', () => {
    const entry = entryById('structuring-documents')!
    renderWorkspace(entry.id)
    const cards = within(chain()).getAllByRole('button')
    expect(cards[0].textContent).toContain('Source')
    expect(cards).toHaveLength(entry.stages.length + 1)
    entry.stages.forEach((stage, i) => expect(cards[i + 1].textContent).toContain(stage.name))
  })

  it('states the scope on the Source card', () => {
    const entry = entryById('structuring-documents')!
    renderWorkspace(entry.id)
    expect(screen.getByText(new RegExp(`${entry.sourceIds.length} sources`))).toBeDefined()
  })

  it('says nothing about a run until one has started, then reports each component\'s state', () => {
    renderWorkspace('structuring-documents')
    expect(within(chain()).queryByText('In progress')).toBeNull()
    expect(within(chain()).queryByText('Pending')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /run pipeline/i }))
    expect(within(chain()).getByText('In progress')).toBeDefined()
    expect(within(chain()).getAllByText('Pending').length).toBeGreaterThan(0)
  })

  it('configures chunking from the Chunk component, and the choice shows on the card', () => {
    // structuring-email is the pipeline whose chain actually carries a stage
    // called 'Chunk' — supportsChunkStrategy is defined as exactly that, and
    // 'Section & chunk' (documents) deliberately is not it.
    renderWorkspace('structuring-email')
    const panel = openComponent('Chunk')
    fireEvent.click(within(panel).getByLabelText(/semantic/i))
    done()
    expect(screen.getByText(/Strategy: semantic/i)).toBeDefined()
  })

  it('keeps a chunk choice after the panel is closed and reopened', () => {
    renderWorkspace('structuring-email')
    fireEvent.click(within(openComponent('Chunk')).getByLabelText(/fixed/i))
    done()
    const reopened = openComponent('Chunk')
    expect((within(reopened).getByLabelText(/fixed/i) as HTMLInputElement).checked).toBe(true)
  })

  it('offers no chunk control on a pipeline with no Chunk stage', () => {
    const entry = entryById('structuring-tables')!
    expect(entry.stages.some(s => s.name === 'Chunk')).toBe(false)
    renderWorkspace(entry.id)
    expect(screen.queryByText(/Strategy:/i)).toBeNull()
  })

  it('says plainly when a component has no configuration', () => {
    const entry = entryById('structuring-documents')!
    renderWorkspace(entry.id)
    const panel = openComponent(entry.stages[0].name)
    expect(within(panel).getByText(/no configuration/i)).toBeDefined()
  })

  it('drops the masking component from the chain when masking is turned off', () => {
    renderWorkspace('structuring-email')
    expect(within(chain()).getByText('Redact')).toBeDefined()

    const panel = openComponent('Redact')
    fireEvent.click(within(panel).getByLabelText(/mask personal data/i))
    // The warning the run itself would carry, shown the moment the choice is made.
    expect(within(screen.getByRole('dialog')).getByText(/unmasked/i)).toBeDefined()
    done()

    expect(within(chain()).queryByText('Redact')).toBeNull()
  })

  it('warns about re-fitting before the choice is made, in the graph pipeline', () => {
    renderWorkspace('graph-construct')
    // The default reuses the fitted models, so the component that owns the choice
    // is on screen under its applying name — see fittingCounterpart.
    const panel = openComponent('Project')
    expect(within(panel).getByText(REFIT_WARNING)).toBeDefined()
  })

  it('switches to re-fitting and back through the cards as they are labelled at the time', () => {
    renderWorkspace('graph-construct')
    expect(within(chain()).getByText('Project')).toBeDefined()
    expect(within(chain()).queryByText('Reduce dimensions')).toBeNull()

    fireEvent.click(within(openComponent('Project')).getByLabelText(/re-fit/i))
    done()

    // projectRun renames the fitting stages, so the chain now reads differently.
    expect(within(chain()).getByText('Reduce dimensions')).toBeDefined()
    expect(within(chain()).queryByText('Project')).toBeNull()

    // And back again, through the name the card carries now — without this the
    // operator could reach reuse and never leave it.
    fireEvent.click(within(openComponent('Reduce dimensions')).getByLabelText(/reuse/i))
    done()

    expect(within(chain()).getByText('Project')).toBeDefined()
    expect(within(chain()).queryByText('Reduce dimensions')).toBeNull()
  })

  it('pairs every renamed fitting stage with the name projectRun gives it', () => {
    // The panel and the chain both rely on this pairing to keep the re-fit choice
    // reachable; this is the guard against it drifting from runConfig's own renames.
    const entry = entryById('graph-construct')!
    const fitted = projectRun(entry, { ...defaultConfigFor(entry), refitModels: true }).stages.map(s => s.name)
    const reused = projectRun(entry, { ...defaultConfigFor(entry), refitModels: false }).stages.map(s => s.name)

    fitted.forEach((name, i) => {
      if (name === reused[i]) return
      expect(fittingCounterpart(name), name).toBe(reused[i])
      expect(fittingCounterpart(reused[i]), reused[i]).toBe(name)
    })
  })

  it('will not start a run with nothing in scope', () => {
    const entry = entryById('structuring-transcripts')!
    renderWorkspace(entry.id)
    const panel = openComponent('Source')
    const boxes = within(panel).getAllByRole('checkbox')
    expect(boxes).toHaveLength(entry.sourceIds.length)
    boxes.forEach(box => fireEvent.click(box))

    expect(within(screen.getByRole('dialog')).getByText(/nothing to run/i)).toBeDefined()
    done()

    expect((screen.getByRole('button', { name: /run pipeline/i }) as HTMLButtonElement).disabled).toBe(true)
  })

  it('narrows the projection when a source leaves the scope', () => {
    const entry = entryById('structuring-email')!
    renderWorkspace(entry.id)
    const before = projectRun(entry, defaultConfigFor(entry))

    const panel = openComponent('Source')
    fireEvent.click(within(panel).getAllByRole('checkbox')[0])
    done()

    expect(screen.getByText(new RegExp(`${entry.sourceIds.length - 1} sources`))).toBeDefined()
    expect(screen.queryByText(new RegExp(`${before.records.toLocaleString('en-US')} records`))).toBeNull()
  })

  it('carries a configuration across a tab switch, since the Run button is not in the tab', () => {
    renderWorkspace('structuring-email')
    fireEvent.click(within(openComponent('Chunk')).getByLabelText(/semantic/i))
    done()

    fireEvent.click(screen.getByRole('tab', { name: 'Settings' }))
    fireEvent.click(screen.getByRole('tab', { name: 'Pipeline' }))
    expect(screen.getByText(/Strategy: semantic/i)).toBeDefined()
  })

  it('opens no panel on first paint, so the server and client agree', () => {
    renderWorkspace('structuring-email')
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})

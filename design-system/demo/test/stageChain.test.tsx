import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, fireEvent, act } from '@testing-library/react'
import { DemoStateProvider } from '../state'
import { PipelineWorkspace } from '../components/PipelineWorkspace'
import { entryById } from '../data/pipelineCatalogue'
import { REFIT_WARNING, defaultConfigFor, formatNumber, projectRun } from '../runConfig'
import { NO_SOURCES_REASON, fittingCounterpart } from '../components/StageChain'

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
    const panel = openComponent('Reduce dimensions')
    expect(within(panel).getByText(REFIT_WARNING)).toBeDefined()
  })

  it('opens the pipeline that fits the models on its fitting stages', () => {
    renderWorkspace('graph-construct')
    expect(within(chain()).getByText('Reduce dimensions')).toBeDefined()
    expect(within(chain()).queryByText('Reuse topic labels')).toBeNull()
  })

  it('switches to reuse and back through the cards as they are labelled at the time', () => {
    renderWorkspace('graph-construct')

    fireEvent.click(within(openComponent('Reduce dimensions')).getByLabelText(/reuse/i))
    done()

    // projectRun renames the fitting stages, so the chain now reads differently.
    expect(within(chain()).getByText('Project')).toBeDefined()
    expect(within(chain()).queryByText('Reduce dimensions')).toBeNull()

    // And back again, through the name the card carries now — without this the
    // operator could reach reuse and never leave it.
    fireEvent.click(within(openComponent('Project')).getByLabelText(/re-fit/i))
    done()

    expect(within(chain()).getByText('Reduce dimensions')).toBeDefined()
    expect(within(chain()).queryByText('Project')).toBeNull()
  })

  it('keeps focus on the component its own choice has just renamed', () => {
    renderWorkspace('graph-construct')
    const card = screen.getByRole('button', { name: /Reduce dimensions/ })
    // fireEvent.click does not move focus, and Drawer restores focus to whatever was
    // active when it opened — so focus the card first, as a real click would.
    card.focus()
    fireEvent.click(card)

    fireEvent.click(within(screen.getByRole('dialog')).getByLabelText(/reuse/i))
    done()

    // The same DOM node, now labelled 'Project' — not a detached one, which would
    // have dropped focus to <body>.
    expect(document.activeElement).toBe(card)
    expect(screen.getByRole('button', { name: /Project/ })).toBe(card)
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

    expect(within(screen.getByRole('dialog')).getByText(NO_SOURCES_REASON)).toBeDefined()
    done()

    // A greyed button with the reason only inside a panel the operator has just closed
    // leaves nothing on screen to act on — so the reason is beside it, and named by it.
    const run = screen.getByRole('button', { name: /run pipeline/i }) as HTMLButtonElement
    expect(run.disabled).toBe(true)
    const reason = screen.getByText(NO_SOURCES_REASON)
    expect(run.getAttribute('aria-describedby')).toBe(reason.id)
    expect(reason.id).toBeTruthy()
  })

  it('names no reason on the Run button while the run is startable', () => {
    renderWorkspace('structuring-email')
    expect(screen.getByRole('button', { name: /run pipeline/i }).getAttribute('aria-describedby')).toBeNull()
    expect(screen.queryByText(NO_SOURCES_REASON)).toBeNull()
  })

  it('narrows the projection when a source leaves the scope', () => {
    const entry = entryById('structuring-email')!
    renderWorkspace(entry.id)
    const before = projectRun(entry, defaultConfigFor(entry))

    const panel = openComponent('Source')
    fireEvent.click(within(panel).getAllByRole('checkbox')[0])
    done()

    expect(screen.getByText(new RegExp(`${entry.sourceIds.length - 1} sources`))).toBeDefined()
    expect(screen.queryByText(new RegExp(`${formatNumber(before.records)} records`))).toBeNull()
  })

  it('keeps drawing the run that is executing when the configuration changes mid-run', () => {
    vi.useFakeTimers()
    try {
      const entry = entryById('structuring-email')!
      renderWorkspace(entry.id)
      const cards = () => within(chain()).getAllByRole('button')
      const lastCard = () => cards()[cards().length - 1]

      fireEvent.click(screen.getByRole('button', { name: /run pipeline/i }))
      // Advance until the final component is the one in progress — the worst case for
      // a mid-run edit, since a shortened chain has no index for it at all.
      for (let i = 0; i < 60 && !lastCard().textContent?.includes('In progress'); i++) {
        act(() => { vi.advanceTimersByTime(1000) })
      }
      expect(lastCard().textContent).toContain('In progress')

      // run.stageIndex indexes the projection the run started with. Editing the config
      // now changes what the next run would do, not this one, so the chain must keep
      // drawing the run — otherwise the Mask stage vanishes, every remaining card falls
      // below stageIndex and reads Succeeded while the run is still going.
      fireEvent.click(within(openComponent('Redact')).getByLabelText(/mask personal data/i))
      done()

      expect(cards()).toHaveLength(entry.stages.length + 1)
      expect(within(chain()).getByText('Redact')).toBeDefined()
      expect(lastCard().textContent).toContain('In progress')
      expect(within(chain()).queryAllByText('Succeeded')).toHaveLength(entry.stages.length - 1)
    } finally {
      vi.useRealTimers()
    }
  })

  it('draws the new configuration again once the run is no longer in flight', () => {
    vi.useFakeTimers()
    try {
      renderWorkspace('structuring-email')
      fireEvent.click(screen.getByRole('button', { name: /run pipeline/i }))
      act(() => { vi.advanceTimersByTime(1000) })

      fireEvent.click(within(openComponent('Redact')).getByLabelText(/mask personal data/i))
      done()
      expect(within(chain()).getByText('Redact')).toBeDefined()

      fireEvent.click(screen.getByRole('button', { name: /cancel run/i }))
      expect(within(chain()).queryByText('Redact')).toBeNull()
    } finally {
      vi.useRealTimers()
    }
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

import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { DemoStateProvider } from '../state'
import { PipelineWorkspace } from '../components/PipelineWorkspace'
import { entryById } from '../data/pipelineCatalogue'

const ENTRY_ID = 'structuring-documents'
const entry = entryById(ENTRY_ID)!

const renderWorkspace = (id = ENTRY_ID) =>
  render(<DemoStateProvider><PipelineWorkspace entryId={id} /></DemoStateProvider>)

describe('pipeline workspace', () => {
  it('heads the workspace with the pipeline name and its kind', () => {
    renderWorkspace()
    expect(screen.getByRole('heading', { level: 1, name: entry.name })).toBeDefined()
    expect(screen.getByText('Structuring')).toBeDefined()
  })

  it('offers the four tabs, with Pipeline selected', () => {
    renderWorkspace()
    const list = screen.getByRole('tablist')
    const labels = within(list).getAllByRole('tab').map(t => t.textContent)
    expect(labels).toEqual(['Pipeline', 'Executions', 'Triggers', 'Settings'])
    expect(within(list).getByRole('tab', { selected: true }).textContent).toBe('Pipeline')
  })

  it('switches panels when a tab is clicked', () => {
    renderWorkspace()
    fireEvent.click(screen.getByRole('tab', { name: 'Executions' }))
    expect(screen.getByRole('tab', { name: 'Executions' }).getAttribute('aria-selected')).toBe('true')
    expect(screen.getByRole('tabpanel')).toBeDefined()
  })

  it('runs the pipeline from the header, then offers to cancel', () => {
    renderWorkspace()
    fireEvent.click(screen.getByRole('button', { name: /run pipeline/i }))
    expect(screen.getByRole('button', { name: /cancel run/i })).toBeDefined()
    expect(screen.queryByRole('button', { name: /^run pipeline$/i })).toBeNull()
  })

  it('reports the pipeline last execution in the header', () => {
    renderWorkspace('structuring-tables')
    expect(screen.getByText('12 min ago')).toBeDefined()
  })

  it('renders nothing for an unknown pipeline id', () => {
    const { container } = renderWorkspace('does-not-exist')
    expect(container.textContent).toBe('')
  })
})

describe('pipeline workspace tick interval', () => {
  // Mirrors the same three assertions pipelinesList.test.tsx uses for the
  // Pipelines screen's own interval: a run started from a workspace must keep
  // advancing while the operator is looking at it, on the same cadence.
  it('only advances runs while at least one is running, and clears the interval on unmount', () => {
    vi.useFakeTimers()
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval')
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const { unmount } = renderWorkspace()

    // Nothing running yet — no interval should have started.
    expect(setIntervalSpy).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: /run pipeline/i }))
    expect(setIntervalSpy).toHaveBeenCalledTimes(1)

    unmount()
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)

    setIntervalSpy.mockRestore()
    clearIntervalSpy.mockRestore()
    vi.useRealTimers()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import { DemoStateProvider } from '../state'
import { Connect } from '../screens/Connect'
import { SOURCES } from '../data/sources'
import { ESTATE } from '../data/tenant'

const connect = () => render(<DemoStateProvider><Connect /></DemoStateProvider>)

describe('Connect screen', () => {
  it('lists every source in the estate', () => {
    connect()
    const table = screen.getByRole('table', { name: /sources/i })
    expect(within(table).getAllByRole('row')).toHaveLength(SOURCES.length + 1)
  })

  it('separates connected from awaiting credentials', () => {
    connect()
    expect(screen.getAllByText(/awaiting credentials/i).length).toBe(ESTATE.sourcesPending)
  })

  it('filters by search text', () => {
    connect()
    fireEvent.change(screen.getByPlaceholderText(/search sources/i), { target: { value: 'guidewire' } })
    const table = screen.getByRole('table', { name: /sources/i })
    const rows = within(table).getAllByRole('row').slice(1)
    expect(rows.length).toBeGreaterThan(0)
    for (const r of rows) expect(r.textContent?.toLowerCase()).toContain('guidewire')
  })

  it('filters by modality chip', () => {
    connect()
    fireEvent.click(screen.getByRole('button', { name: 'transcripts' }))
    const rows = within(screen.getByRole('table', { name: /sources/i })).getAllByRole('row').slice(1)
    expect(rows.length).toBeGreaterThan(0)
    expect(rows.length).toBeLessThan(SOURCES.length)
  })

  it('opens a source drawer from the name button', () => {
    connect()
    fireEvent.click(screen.getByRole('button', { name: 'Guidewire ClaimCenter' }))
    expect(screen.getByRole('dialog', { name: /guidewire claimcenter/i })).toBeDefined()
  })

  it('connects a catalogue source and settles it to connected', async () => {
    connect()
    fireEvent.click(screen.getByRole('button', { name: /connect a source/i }))
    const dialog = screen.getByRole('dialog', { name: /connect a source/i })
    fireEvent.click(within(dialog).getByRole('button', { name: /amazon redshift/i }))
    fireEvent.change(screen.getByLabelText(/account/i), { target: { value: 'meridian-prod' } })
    fireEvent.click(screen.getByRole('button', { name: /^connect source$/i }))

    expect(await screen.findByText(/scanning/i)).toBeDefined()
    await waitFor(() => expect(screen.queryByText(/scanning/i)).toBeNull(), { timeout: 4000 })

    const table = screen.getByRole('table', { name: /sources/i })
    expect(within(table).getByRole('button', { name: 'Amazon Redshift' })).toBeDefined()
  })

  it('asks only for read-only credentials', () => {
    connect()
    fireEvent.click(screen.getByRole('button', { name: /connect a source/i }))
    expect(screen.getByText(/read-only/i)).toBeDefined()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { searchEstate } from '../search'
import { TopBar } from '../components/TopBar'
import { ROUTES } from '../routes'
import { DemoStateProvider } from '../state'

describe('searchEstate', () => {
  it('returns nothing for an empty or one-character query', () => {
    expect(searchEstate('')).toEqual([])
    expect(searchEstate('a')).toEqual([])
  })

  it('finds a source and points at the connect screen', () => {
    const hit = searchEstate('guidewire').find(r => r.kind === 'source')
    expect(hit).toBeDefined()
    expect(hit!.slug).toBe('connect')
  })

  it('finds a domain and points at the ready screen', () => {
    const hit = searchEstate('underwriting').find(r => r.kind === 'domain')
    expect(hit!.slug).toBe('ready')
  })

  it('finds a graph entity and points at the graph screen', () => {
    const hit = searchEstate('policyholder').find(r => r.kind === 'entity')
    expect(hit!.slug).toBe('graph')
  })

  it('finds a use case and points at the use-cases screen', () => {
    const hit = searchEstate('triage').find(r => r.kind === 'use-case')
    expect(hit!.slug).toBe('use-cases')
  })

  it('finds an agent and points at governance', () => {
    const hit = searchEstate('claims-triage-01').find(r => r.kind === 'agent')
    expect(hit!.slug).toBe('governance')
  })

  it('is case-insensitive', () => {
    expect(searchEstate('GUIDEWIRE').length).toBeGreaterThan(0)
  })

  it('caps its results at 8 even when a query matches more', () => {
    // "claim" matches across sources, the Claims domain, graph entities, a use
    // case and an agent — 12 hits before the cap, so this actually exercises
    // the MAX limit rather than passing because the query happened to be short.
    expect(searchEstate('claim').length).toBe(8)
  })

  it('represents every matching kind rather than filling up with one', () => {
    const kinds = new Set(searchEstate('claim').map(r => r.kind))
    expect(kinds.has('source')).toBe(true)
    expect(kinds.has('entity')).toBe(true)
    expect(kinds.has('use-case')).toBe(true)
    expect(kinds.has('agent')).toBe(true)
  })
})

describe('TopBar search', () => {
  const bar = () => render(<DemoStateProvider><TopBar route={ROUTES[0]} prefix="" /></DemoStateProvider>)

  it('is a real labelled search control', () => {
    bar()
    const input = screen.getByRole('searchbox', { name: /search the estate/i })
    expect(input.tagName).toBe('INPUT')
  })

  it('shows results as you type and links each one', () => {
    bar()
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'guidewire' } })
    const results = screen.getByRole('list', { name: /search results/i })
    const links = within(results).getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    expect(links[0].getAttribute('href')).toContain('connect')
  })

  it('shows a spoken message when nothing matches', () => {
    bar()
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzzznope' } })
    expect(screen.getByText(/nothing in the estate matches/i)).toBeDefined()
  })

  it('clears on Escape', () => {
    bar()
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'guidewire' } })
    fireEvent.keyDown(input, { key: 'Escape' })
    expect((input as HTMLInputElement).value).toBe('')
    expect(screen.queryByRole('list')).toBeNull()
  })

  it('focuses the input on the advertised shortcut', () => {
    bar()
    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(document.activeElement).toBe(screen.getByRole('searchbox'))
  })
})

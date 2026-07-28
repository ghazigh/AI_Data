import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { AppShell } from '../components/AppShell'
import { DemoStateProvider } from '../state'
import { DemoApp } from '../DemoApp'
import { ROUTES } from '../routes'

const shell = (current = '') =>
  render(<DemoStateProvider><AppShell current={current} prefix=""><p>content</p></AppShell></DemoStateProvider>)

describe('AppShell', () => {
  it('renders its children', () => {
    shell()
    expect(screen.getByText('content')).toBeDefined()
  })

  it('links every route in the rail', () => {
    shell()
    const rail = screen.getByRole('navigation', { name: 'Demo screens' })
    for (const r of ROUTES) {
      expect(within(rail).getByRole('link', { name: new RegExp(r.title, 'i') })).toBeDefined()
    }
  })

  it('marks the current screen', () => {
    shell('graph')
    const link = screen.getByRole('link', { name: /graph/i })
    expect(link.getAttribute('aria-current')).toBe('page')
  })

  it('groups the five stages under a pipeline heading', () => {
    shell()
    expect(screen.getByText('The pipeline')).toBeDefined()
    expect(screen.getByText('01')).toBeDefined()
    expect(screen.getByText('05')).toBeDefined()
  })

  it('names the tenant and the viewer', () => {
    shell()
    expect(screen.getAllByText(/Meridian Assurance/).length).toBeGreaterThan(0)
    expect(screen.getByText('Amara Diallo')).toBeDefined()
  })

  it('marks the workspace as sample data', () => {
    shell()
    expect(screen.getByText(/sample data/i)).toBeDefined()
  })

  it('prefixes nested links so no href is absolute', () => {
    render(<DemoStateProvider><AppShell current="graph" prefix="../"><p>c</p></AppShell></DemoStateProvider>)
    const link = screen.getByRole('link', { name: /use cases/i })
    expect(link.getAttribute('href')).toBe('../use-cases/')
  })

  it('offers a real labelled search control', () => {
    shell()
    const input = screen.getByRole('searchbox', { name: /search the estate/i })
    expect(input.tagName).toBe('INPUT')
  })

  it('returns a connected source to the starting state on reset', () => {
    render(<DemoApp slug="connect" prefix="" />)
    fireEvent.click(screen.getByRole('button', { name: /connect a source/i }))
    const dialog = screen.getByRole('dialog', { name: /connect a source/i })
    fireEvent.click(within(dialog).getByRole('button', { name: /amazon redshift/i }))
    fireEvent.change(screen.getByLabelText(/account/i), { target: { value: 'meridian-prod' } })
    fireEvent.click(screen.getByRole('button', { name: /^connect source$/i }))
    expect(screen.getByRole('button', { name: 'Amazon Redshift' })).toBeDefined()

    fireEvent.click(screen.getByRole('button', { name: /reset demo/i }))
    expect(screen.queryByRole('button', { name: 'Amazon Redshift' })).toBeNull()
  })
})

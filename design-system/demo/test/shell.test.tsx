import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { AppShell } from '../components/AppShell'
import { ROUTES } from '../routes'

const shell = (current = '') =>
  render(<AppShell current={current} prefix=""><p>content</p></AppShell>)

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
    render(<AppShell current="graph" prefix="../"><p>c</p></AppShell>)
    const link = screen.getByRole('link', { name: /use cases/i })
    expect(link.getAttribute('href')).toBe('../use-cases/')
  })

  it('offers a real labelled search control', () => {
    shell()
    const input = screen.getByRole('searchbox', { name: /search the estate/i })
    expect(input.tagName).toBe('INPUT')
  })
})

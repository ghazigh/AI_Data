import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { UseCases } from '../screens/UseCases'
import { USE_CASES } from '../data/useCases'
import { DOMAINS } from '../data/tenant'

describe('Use cases screen', () => {
  it('ranks all 14 by projected impact', () => {
    render(<UseCases />)
    const table = screen.getByRole('table', { name: /opportunities/i })
    expect(within(table).getAllByRole('row')).toHaveLength(USE_CASES.length + 1)
  })

  it('filters to the blocked ones', () => {
    render(<UseCases />)
    fireEvent.click(screen.getByRole('button', { name: 'blocked' }))
    const rows = within(screen.getByRole('table', { name: /opportunities/i })).getAllByRole('row').slice(1)
    expect(rows).toHaveLength(5)
  })

  it('names the domain holding a blocked use case back, with its score', () => {
    render(<UseCases />)
    const blocked = USE_CASES.find(u => u.status === 'blocked')!
    const domain = DOMAINS.find(d => d.key === blocked.blockedBy)!
    fireEvent.click(screen.getByRole('button', { name: blocked.name }))
    const drawer = screen.getByRole('dialog', { name: blocked.name })
    expect(within(drawer).getByText(new RegExp(domain.name, 'i'))).toBeDefined()
    expect(within(drawer).getByText(String(domain.score))).toBeDefined()
  })

  it('links a blocked use case back to readiness', () => {
    render(<UseCases />)
    const blocked = USE_CASES.find(u => u.status === 'blocked')!
    fireEvent.click(screen.getByRole('button', { name: blocked.name }))
    const link = within(screen.getByRole('dialog')).getByRole('link', { name: /readiness/i })
    expect(link.getAttribute('href')).toContain('ready')
  })

  it('shows bindings, guardrails and export targets', () => {
    render(<UseCases />)
    const ready = USE_CASES.find(u => u.status === 'ready')!
    fireEvent.click(screen.getByRole('button', { name: ready.name }))
    const drawer = screen.getByRole('dialog', { name: ready.name })
    expect(within(drawer).getByText(ready.guardrails[0])).toBeDefined()
    for (const target of ready.exports) expect(within(drawer).getByText(target)).toBeDefined()
  })
})

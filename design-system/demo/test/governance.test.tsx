import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { Governance } from '../screens/Governance'
import { AGENTS, POLICIES, AUDIT } from '../data/governance'
import { DOMAINS, ESTATE } from '../data/tenant'

describe('governance data', () => {
  it('scopes every agent to domains that exist', () => {
    const keys = new Set(DOMAINS.map(d => d.key))
    expect(AGENTS.length).toBeGreaterThanOrEqual(5)
    for (const a of AGENTS) {
      expect(a.scopes.length).toBeGreaterThan(0)
      for (const s of a.scopes) expect(keys.has(s), `${a.name} → ${s}`).toBe(true)
    }
  })

  it('accounts for every denial in the estate headline', () => {
    const denied = AUDIT.filter(e => e.decision === 'denied')
    expect(denied.length).toBe(ESTATE.agentCallsDenied)
  })

  it('cites a policy on every denial', () => {
    const ids = new Set(POLICIES.map(p => p.id))
    for (const e of AUDIT.filter(e => e.decision === 'denied')) {
      expect(e.policyId, e.id).toBeDefined()
      expect(ids.has(e.policyId!), e.id).toBe(true)
    }
  })

  it('scopes policies down to column and chunk level', () => {
    const levels = new Set(POLICIES.map(p => p.level))
    expect(levels.has('column')).toBe(true)
    expect(levels.has('chunk')).toBe(true)
    expect(levels.has('row')).toBe(true)
  })
})

describe('Governance screen', () => {
  it('lists the agent registry with scopes and denials', () => {
    render(<Governance />)
    const table = screen.getByRole('table', { name: /agents/i })
    expect(within(table).getAllByRole('row')).toHaveLength(AGENTS.length + 1)
  })

  it('lists the policy rules', () => {
    render(<Governance />)
    expect(screen.getByRole('region', { name: /policies/i })).toBeDefined()
  })

  it('shows the audit log with a decision on every row', () => {
    render(<Governance />)
    const log = screen.getByRole('table', { name: /audit log/i })
    const rows = within(log).getAllByRole('row').slice(1)
    expect(rows).toHaveLength(AUDIT.length)
    for (const r of rows) expect(r.textContent).toMatch(/allowed|denied/i)
  })

  it('states that every call is logged', () => {
    render(<Governance />)
    expect(screen.getByText(/100% logged/i)).toBeDefined()
  })
})

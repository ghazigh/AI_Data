import { describe, it, expect } from 'vitest'
import { ACTIVITY } from '../data/activity'
import { USE_CASES, topUseCases } from '../data/useCases'
import { SOURCES } from '../data/sources'
import { DOMAINS } from '../data/tenant'

const sourceIds = new Set(SOURCES.map(s => s.id))
const domainKeys = new Set(DOMAINS.map(d => d.key))

describe('activity', () => {
  it('has entries and each names a real source', () => {
    expect(ACTIVITY.length).toBeGreaterThanOrEqual(8)
    for (const a of ACTIVITY) expect(sourceIds.has(a.sourceId), a.sourceId).toBe(true)
  })

  it('uses fixed relative times, never a computed clock', () => {
    for (const a of ACTIVITY) expect(a.when).toMatch(/ago|yesterday|today/i)
  })
})

describe('use cases', () => {
  it('has 14, of which 5 are blocked', () => {
    expect(USE_CASES).toHaveLength(14)
    expect(USE_CASES.filter(u => u.status === 'blocked')).toHaveLength(5)
  })

  it('draws every use case from sources that exist', () => {
    for (const u of USE_CASES) {
      expect(u.sourceIds.length).toBeGreaterThan(0)
      for (const id of u.sourceIds) expect(sourceIds.has(id), `${u.name} → ${id}`).toBe(true)
    }
  })

  it('names a real blocking domain for every blocked use case, and none for the rest', () => {
    for (const u of USE_CASES) {
      if (u.status === 'blocked') {
        expect(u.blockedBy, u.name).toBeDefined()
        expect(domainKeys.has(u.blockedBy!), u.name).toBe(true)
      } else {
        expect(u.blockedBy, u.name).toBeUndefined()
      }
    }
  })

  it('blocks only on domains that actually score below the bar', () => {
    for (const u of USE_CASES.filter(u => u.status === 'blocked')) {
      const domain = DOMAINS.find(d => d.key === u.blockedBy)!
      expect(domain.score, `${u.name} blocked by ${domain.name}`).toBeLessThan(70)
    }
  })

  it('leads with the claims triage copilot', () => {
    const top = topUseCases(3)
    expect(top[0].name).toBe('Claims triage copilot')
    expect(top[0].status).toBe('ready')
  })

  it('ranks by projected impact, descending', () => {
    const values = topUseCases(14).map(u => u.impactValue)
    expect([...values].sort((a, b) => b - a)).toEqual(values)
  })
})

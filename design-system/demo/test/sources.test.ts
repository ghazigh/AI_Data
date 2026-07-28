import { describe, it, expect } from 'vitest'
import { SOURCES, CATALOGUE, weightForDomain, estateScore } from '../data/sources'
import { DOMAINS, ESTATE } from '../data/tenant'
import type { DomainKey } from '../data/types'

const connected = SOURCES.filter(s => s.status === 'connected')

describe('sources', () => {
  it('has 34 connected and 4 pending', () => {
    expect(connected).toHaveLength(ESTATE.sourcesConnected)
    expect(SOURCES.filter(s => s.status === 'pending-credentials')).toHaveLength(ESTATE.sourcesPending)
  })

  it('gives every source a unique id', () => {
    expect(new Set(SOURCES.map(s => s.id)).size).toBe(SOURCES.length)
  })

  it('points every source at domains that exist', () => {
    const keys = new Set(DOMAINS.map(d => d.key))
    for (const s of SOURCES) {
      expect(keys.has(s.primaryDomain), `${s.name} primary`).toBe(true)
      expect(s.domains).toContain(s.primaryDomain)
      for (const d of s.domains) expect(keys.has(d), `${s.name} → ${d}`).toBe(true)
    }
  })

  it('gives every source at least one modality and a readiness in range', () => {
    for (const s of SOURCES) {
      expect(s.modalities.length).toBeGreaterThan(0)
      expect(s.readiness).toBeGreaterThanOrEqual(0)
      expect(s.readiness).toBeLessThanOrEqual(100)
    }
  })

  it('weights the domains exactly as the canon specifies', () => {
    const expected: Record<DomainKey, number> = {
      claims: 8, policies: 4, support: 4, contracts: 4,
      'broker-network': 4, underwriting: 4, reinsurance: 3, compliance: 3,
    }
    for (const [key, weight] of Object.entries(expected)) {
      expect(weightForDomain(key as DomainKey), key).toBe(weight)
    }
    expect(Object.values(expected).reduce((a, b) => a + b, 0)).toBe(ESTATE.sourcesConnected)
  })

  it('derives the headline estate score from the domain scores', () => {
    expect(estateScore()).toBe(ESTATE.score)
  })

  it('covers every modality the product claims to handle', () => {
    const seen = new Set(SOURCES.flatMap(s => s.modalities))
    for (const m of ['tables', 'documents', 'tickets', 'email', 'transcripts', 'images', 'streams']) {
      expect(seen.has(m as never), m).toBe(true)
    }
  })
})

describe('connector catalogue', () => {
  it('offers at least 24 connectors across every category', () => {
    expect(CATALOGUE.length).toBeGreaterThanOrEqual(24)
    const cats = new Set(CATALOGUE.map(c => c.category))
    for (const c of ['warehouse', 'oltp', 'saas', 'object-store', 'stream']) {
      expect(cats.has(c as never), c).toBe(true)
    }
  })

  it('never offers a connector that is already connected', () => {
    const live = new Set(SOURCES.filter(s => s.status === 'connected').map(s => s.name))
    for (const c of CATALOGUE) expect(live.has(c.name), c.name).toBe(false)
  })
})

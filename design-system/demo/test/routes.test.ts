import { describe, it, expect } from 'vitest'
import { ROUTES, routeForPath } from '../routes'
import { DOMAINS, ESTATE, TENANT } from '../data/tenant'

describe('routes', () => {
  it('defines the seven screens', () => {
    expect(ROUTES.map(r => r.slug)).toEqual([
      '', 'connect', 'ready', 'pipelines', 'graph', 'use-cases', 'governance',
    ])
  })

  it('gives every route a title and a component', () => {
    for (const r of ROUTES) {
      expect(r.title.length).toBeGreaterThan(0)
      expect(typeof r.Component).toBe('function')
    }
  })

  it('numbers only the five product stages', () => {
    const numbered = ROUTES.filter(r => r.stage !== undefined)
    expect(numbered.map(r => r.stage)).toEqual(['01', '02', '03', '04', '05'])
  })

  it('resolves a path to its route', () => {
    expect(routeForPath('/demo/')?.slug).toBe('')
    expect(routeForPath('/demo/graph/')?.slug).toBe('graph')
    expect(routeForPath('/demo/graph')?.slug).toBe('graph')
  })

  it('returns undefined for an unknown path', () => {
    expect(routeForPath('/demo/nope/')).toBeUndefined()
  })
})

describe('tenant data', () => {
  it('names the eight knowledge bases', () => {
    expect(DOMAINS).toHaveLength(ESTATE.knowledgeBases)
  })

  it('keeps every domain score in range', () => {
    for (const d of DOMAINS) {
      expect(d.score).toBeGreaterThan(0)
      expect(d.score).toBeLessThanOrEqual(100)
    }
  })

  it('identifies the viewer', () => {
    expect(TENANT.viewer.name).toBe('Amara Diallo')
  })
})

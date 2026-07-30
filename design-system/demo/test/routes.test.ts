import { describe, it, expect } from 'vitest'
import { ROUTES, WORKSPACE_ROUTES, ALL_ROUTES, hrefFor, routeForPath, titleFor } from '../routes'
import { DOMAINS, ESTATE, TENANT } from '../data/tenant'
import { allEntries } from '../data/pipelineCatalogue'

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

describe('workspace routes', () => {
  it('has exactly one workspace route per catalogue entry', () => {
    expect(WORKSPACE_ROUTES).toHaveLength(allEntries().length)
    for (const entry of allEntries()) {
      const route = WORKSPACE_ROUTES.find(r => r.slug === `pipelines/${entry.id}`)
      expect(route, entry.id).toBeDefined()
      expect(route!.title).toBe(entry.name)
      expect(route!.parentSlug).toBe('pipelines')
      expect(route!.stage).toBe('03')
    }
  })

  it('keeps the rail at seven top-level routes', () => {
    expect(ROUTES).toHaveLength(7)
    expect(ROUTES.some(r => r.slug.includes('/'))).toBe(false)
  })

  it('resolves every workspace href back to its route', () => {
    for (const route of ALL_ROUTES) {
      const href = hrefFor(route.slug, '/AI_Data/demo/')
      expect(routeForPath(href)?.slug, route.slug).toBe(route.slug)
    }
  })

  it('titles a workspace after its pipeline', () => {
    const entry = allEntries()[0]
    expect(titleFor(`pipelines/${entry.id}`)).toBe(`${entry.name} — Datalith demo`)
  })
})

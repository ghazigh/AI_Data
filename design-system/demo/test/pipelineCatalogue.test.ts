import { describe, it, expect } from 'vitest'
import { CATALOGUE_SECTIONS, allEntries, entryById } from '../data/pipelineCatalogue'
import { MODALITY_PIPELINES } from '../data/modalities'
import { GRAPH_PIPELINES } from '../data/graphPipelines'
import { PLAN } from '../data/pipelines'
import { SOURCES } from '../data/sources'

const section = (k: string) => CATALOGUE_SECTIONS.find(s => s.kind === k)!

describe('pipeline catalogue', () => {
  it('has three sections in operator order', () => {
    expect(CATALOGUE_SECTIONS.map(s => s.kind)).toEqual(['structuring', 'graph', 'remediation'])
  })

  it('derives one entry per definition and nothing else', () => {
    expect(section('structuring').entries).toHaveLength(MODALITY_PIPELINES.length)
    expect(section('graph').entries).toHaveLength(GRAPH_PIPELINES.length)
    expect(section('remediation').entries).toHaveLength(PLAN.length)
    expect(allEntries()).toHaveLength(
      MODALITY_PIPELINES.length + GRAPH_PIPELINES.length + PLAN.length,
    )
  })

  it('gives every entry a unique id resolvable by lookup', () => {
    const ids = allEntries().map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(entryById(id)?.id).toBe(id)
  })

  it("names every section's nature so an operator knows what kind of thing it is", () => {
    for (const s of CATALOGUE_SECTIONS) {
      expect(s.title.length, s.kind).toBeGreaterThan(0)
      expect(s.nature.length, s.kind).toBeGreaterThan(0)
    }
  })

  it('scopes every entry to sources that exist and are connected', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    for (const e of allEntries()) {
      expect(e.sourceIds.length, e.name).toBeGreaterThan(0)
      for (const id of e.sourceIds) {
        const s = byId.get(id)
        expect(s, `${e.name} scopes ${id}`).toBeDefined()
        expect(s!.status, `${e.name} scopes a non-connected source`).toBe('connected')
      }
    }
  })

  it("takes every structuring entry's scope from its modality", () => {
    for (const e of section('structuring').entries) {
      expect(e.sourceIds.length).toBeGreaterThan(0)
      expect(e.stages.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('carries the stage chain from the underlying definition', () => {
    const docs = section('structuring').entries.find(e => e.name.includes('Documents'))!
    const source = MODALITY_PIPELINES.find(p => p.modality === 'documents')!
    expect(docs.stages.map(s => s.name)).toEqual(source.stages.map(s => s.name))
  })

  it('gives every entry a baseline record count and an estimated runtime', () => {
    for (const e of allEntries()) {
      expect(e.baselineRecords, e.name).toBeGreaterThan(0)
      expect(e.baselineMinutes, e.name).toBeGreaterThan(0)
    }
  })

  it('schedules the continuous ones and leaves the rest unscheduled', () => {
    for (const e of section('structuring').entries) expect(e.schedule, e.name).toBeTruthy()
    for (const e of section('graph').entries) expect(e.schedule).toBeUndefined()
    for (const e of section('remediation').entries) expect(e.schedule).toBeUndefined()
  })

  it('marks the graph entry that re-fits as consequential', () => {
    const graph = section('graph').entries
    expect(graph.some(e => e.warnsOnRefit)).toBe(true)
  })

  it('carries the readiness delta only on remediation entries', () => {
    for (const e of section('remediation').entries) expect(e.readinessDelta, e.name).toBeGreaterThan(0)
    for (const e of section('structuring').entries) expect(e.readinessDelta).toBeUndefined()
    for (const e of section('graph').entries) expect(e.readinessDelta).toBeUndefined()
  })

  it('matches every remediation entry to its plan step count', () => {
    for (const step of PLAN) {
      const entry = section('remediation').entries.find(e => e.id === `plan-${step.id}`)!
      expect(entry, step.title).toBeDefined()
      expect(entry.baselineRecords).toBe(step.count)
    }
  })

  it('never promotes: no entry name reads as a claim about the platform', () => {
    for (const e of allEntries()) {
      expect(e.name, `${e.name} reads as marketing`).not.toMatch(/^how /i)
      expect(e.name).not.toMatch(/agent-ready|two shapes/i)
    }
  })

  it('sums stage weights to 1 within every entry', () => {
    for (const e of allEntries()) {
      const total = e.stages.reduce((sum, s) => sum + s.weight, 0)
      expect(total, e.name).toBeCloseTo(1, 5)
    }
  })
})

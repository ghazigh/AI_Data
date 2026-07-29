import { describe, it, expect } from 'vitest'
import { MODALITY_PIPELINES, sourcesForModality } from '../data/modalities'
import { SOURCES } from '../data/sources'
import type { Modality } from '../data/types'

const ALL: Modality[] = ['tables', 'documents', 'tickets', 'transcripts', 'streams', 'email', 'images']

describe('modality pipelines', () => {
  it('covers all seven modalities exactly once', () => {
    const listed = MODALITY_PIPELINES.map(p => p.modality)
    expect([...listed].sort()).toEqual([...ALL].sort())
  })

  it('counts sources per modality from the estate, not from a stored number', () => {
    const expected: Record<string, number> = {
      tables: 15, documents: 10, tickets: 4, email: 4, transcripts: 3, images: 2, streams: 2,
    }
    for (const m of ALL) {
      expect(sourcesForModality(m).length, m).toBe(expected[m])
    }
  })

  it('returns only connected sources that declare the modality', () => {
    for (const m of ALL) {
      for (const s of sourcesForModality(m)) {
        expect(s.modalities, `${s.id} does not declare ${m}`).toContain(m)
        expect(s.status, `${s.id} is not connected`).toBe('connected')
      }
    }
  })

  it('never claims more volume than its sources hold', () => {
    for (const p of MODALITY_PIPELINES) {
      const capacity = sourcesForModality(p.modality).reduce((n, s) => n + s.records, 0)
      expect(p.volume, `${p.label} claims ${p.volume} of ${capacity}`).toBeLessThanOrEqual(capacity)
    }
  })

  it('gives every pipeline at least three stages, each with a count and a runtime', () => {
    for (const p of MODALITY_PIPELINES) {
      expect(p.stages.length, p.label).toBeGreaterThanOrEqual(3)
      for (const s of p.stages) {
        expect(s.count, `${p.label}/${s.name}`).toBeGreaterThan(0)
        expect(s.runtime, `${p.label}/${s.name}`).toMatch(/min|h|s/)
        expect(s.detail.length, `${p.label}/${s.name}`).toBeGreaterThan(0)
      }
    }
  })

  it('marks a structuring stage on exactly the markdown pipelines', () => {
    for (const p of MODALITY_PIPELINES) {
      const structuring = p.stages.filter(s => s.isStructuring)
      if (p.shape === 'markdown') expect(structuring, p.label).toHaveLength(1)
      else expect(structuring, p.label).toHaveLength(0)
    }
  })

  it('converges on markdown for five modalities and a schema for two', () => {
    const md = MODALITY_PIPELINES.filter(p => p.shape === 'markdown').map(p => p.modality)
    const schema = MODALITY_PIPELINES.filter(p => p.shape === 'schema').map(p => p.modality)
    expect([...md].sort()).toEqual(['documents', 'email', 'images', 'tickets', 'transcripts'])
    expect([...schema].sort()).toEqual(['streams', 'tables'])
  })

  it('draws every sample from a real source that declares the modality', () => {
    for (const p of MODALITY_PIPELINES) {
      const source = SOURCES.find(s => s.id === p.sample.sourceId)
      expect(source, `${p.label} sample cites ${p.sample.sourceId}`).toBeDefined()
      expect(source!.modalities, `${p.label} sample source lacks ${p.modality}`).toContain(p.modality)
    }
  })

  it('shows a real transformation in every sample', () => {
    for (const p of MODALITY_PIPELINES) {
      expect(p.sample.raw.length, p.label).toBeGreaterThan(40)
      expect(p.sample.structured.length, p.label).toBeGreaterThan(40)
      expect(p.sample.structured, p.label).not.toBe(p.sample.raw)
      if (p.shape === 'markdown') {
        expect(p.sample.structured, `${p.label} produces no markdown heading`).toMatch(/^#{1,3} /m)
      }
    }
  })

  it('never processes more items than the modality holds before structuring', () => {
    for (const p of MODALITY_PIPELINES) {
      const upTo = p.stages.findIndex(s => s.isStructuring)
      const before = upTo === -1 ? p.stages : p.stages.slice(0, upTo + 1)
      for (const s of before) {
        expect(s.count, `${p.label}/${s.name} exceeds volume`).toBeLessThanOrEqual(p.volume)
      }
    }
  })
})

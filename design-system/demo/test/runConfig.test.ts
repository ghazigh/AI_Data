import { describe, it, expect } from 'vitest'
import { defaultConfigFor, projectRun } from '../runConfig'
import { CATALOGUE_SECTIONS, allEntries, entryById } from '../data/pipelineCatalogue'

const structuring = CATALOGUE_SECTIONS[0].entries[0]
const construct = entryById('graph-construct')!
const remediation = CATALOGUE_SECTIONS[2].entries[0]

describe('defaultConfigFor', () => {
  it('starts at full scope with every source selected', () => {
    const c = defaultConfigFor(structuring)
    expect(c.sourceIds).toEqual(structuring.sourceIds)
  })

  it('defaults the graph pipeline to reusing fitted models', () => {
    expect(defaultConfigFor(construct).refitModels).toBe(false)
  })

  it('defaults structuring to redacting personal data', () => {
    expect(defaultConfigFor(structuring).redact).toBe(true)
  })

  it('defaults remediation to a real run, not a dry run', () => {
    expect(defaultConfigFor(remediation).dryRun).toBe(false)
  })
})

describe('projectRun', () => {
  it('reports the baseline at full scope', () => {
    const p = projectRun(structuring, defaultConfigFor(structuring))
    expect(p.records).toBe(structuring.baselineRecords)
    expect(p.minutes).toBe(structuring.baselineMinutes)
  })

  it('reduces records and runtime strictly when scope narrows', () => {
    const full = projectRun(structuring, defaultConfigFor(structuring))
    const narrowed = projectRun(structuring, {
      ...defaultConfigFor(structuring),
      sourceIds: structuring.sourceIds.slice(0, 1),
    })
    expect(narrowed.records).toBeLessThan(full.records)
    expect(narrowed.minutes).toBeLessThan(full.minutes)
    expect(narrowed.records).toBeGreaterThan(0)
  })

  it('projects nothing when every source is deselected', () => {
    const p = projectRun(structuring, { ...defaultConfigFor(structuring), sourceIds: [] })
    expect(p.records).toBe(0)
    expect(p.runnable).toBe(false)
  })

  it('is runnable at any non-empty scope', () => {
    const p = projectRun(structuring, defaultConfigFor(structuring))
    expect(p.runnable).toBe(true)
  })

  it('adds fitting stages and multiplies runtime when re-fitting the topic model', () => {
    const reuse = projectRun(construct, { ...defaultConfigFor(construct), refitModels: false })
    const refit = projectRun(construct, { ...defaultConfigFor(construct), refitModels: true })
    expect(refit.stages.length).toBeGreaterThan(reuse.stages.length)
    expect(refit.minutes).toBeGreaterThan(reuse.minutes)
  })

  it('warns that re-fitting requires rebinding every agent', () => {
    const refit = projectRun(construct, { ...defaultConfigFor(construct), refitModels: true })
    expect(refit.warnings.join(' ')).toMatch(/rebind/i)
    const reuse = projectRun(construct, { ...defaultConfigFor(construct), refitModels: false })
    expect(reuse.warnings).toHaveLength(0)
  })

  it('changes the chunk count with the chunk strategy', () => {
    const clause = projectRun(structuring, { ...defaultConfigFor(structuring), chunkStrategy: 'clause' })
    const fixed = projectRun(structuring, { ...defaultConfigFor(structuring), chunkStrategy: 'fixed' })
    expect(fixed.records).not.toBe(clause.records)
  })

  it('drops the redaction stage when redaction is turned off, and warns', () => {
    const on = projectRun(structuring, { ...defaultConfigFor(structuring), redact: true })
    const off = projectRun(structuring, { ...defaultConfigFor(structuring), redact: false })
    expect(off.stages.length).toBeLessThan(on.stages.length)
    expect(off.warnings.join(' ')).toMatch(/personal data/i)
  })

  it('claims no readiness delta on a dry run', () => {
    const real = projectRun(remediation, { ...defaultConfigFor(remediation), dryRun: false })
    const dry = projectRun(remediation, { ...defaultConfigFor(remediation), dryRun: true })
    expect(real.readinessDelta).toBe(remediation.readinessDelta)
    expect(dry.readinessDelta).toBe(0)
  })

  it('keeps stage weights summing to one for every entry and config', () => {
    for (const e of allEntries()) {
      const p = projectRun(e, defaultConfigFor(e))
      const total = p.stages.reduce((n, s) => n + s.weight, 0)
      expect(total, e.name).toBeCloseTo(1, 5)
    }
  })

  it('is deterministic — the same inputs always project the same run', () => {
    for (const e of allEntries()) {
      const c = defaultConfigFor(e)
      expect(projectRun(e, c)).toEqual(projectRun(e, c))
    }
  })
})

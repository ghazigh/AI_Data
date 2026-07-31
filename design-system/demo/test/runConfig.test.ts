import { describe, it, expect } from 'vitest'
import { defaultConfigFor, projectRun, supportsRedaction, supportsChunkStrategy } from '../runConfig'
import { CATALOGUE_SECTIONS, allEntries, entryById } from '../data/pipelineCatalogue'

const structuring = CATALOGUE_SECTIONS[0].entries[0] // tables: has a redaction stage (Mask), no chunk stage
const construct = entryById('graph-construct')!
const remediation = CATALOGUE_SECTIONS[2].entries[0]
const documents = entryById('structuring-documents')! // no redaction stage at all
const email = entryById('structuring-email')! // has a genuine Chunk stage

describe('defaultConfigFor', () => {
  it('starts at full scope with every source selected', () => {
    const c = defaultConfigFor(structuring)
    expect(c.sourceIds).toEqual(structuring.sourceIds)
  })

  // The pipeline that warns on re-fit is the one whose whole purpose is the fit —
  // graph-construct is named "Build the topic model" and its baseline runtime IS the
  // from-scratch fit, so opening it on the applying stages would contradict its own
  // name, summary and stated runtime. Everything else applies what it already fitted.
  it('defaults the pipeline that fits the models to fitting them', () => {
    expect(construct.warnsOnRefit).toBe(true)
    expect(defaultConfigFor(construct).refitModels).toBe(true)
  })

  it('defaults every other pipeline to reusing the fitted models', () => {
    for (const e of allEntries()) {
      if (e.warnsOnRefit) continue
      expect(defaultConfigFor(e).refitModels, e.name).toBe(false)
    }
  })

  it('defaults structuring to redacting personal data', () => {
    expect(defaultConfigFor(structuring).redact).toBe(true)
  })

  it('defaults remediation to a real run, not a dry run', () => {
    expect(defaultConfigFor(remediation).dryRun).toBe(false)
  })
})

describe('supportsRedaction', () => {
  it('is true for a structuring entry with a masking stage', () => {
    expect(supportsRedaction(structuring)).toBe(true)
  })

  it('is false for a structuring entry with no masking or redaction stage', () => {
    expect(supportsRedaction(documents)).toBe(false)
  })

  it('is false outside structuring', () => {
    expect(supportsRedaction(construct)).toBe(false)
  })
})

describe('supportsChunkStrategy', () => {
  it('is true for a structuring entry with a Chunk stage', () => {
    expect(supportsChunkStrategy(email)).toBe(true)
  })

  it('is false for a structuring entry with no Chunk stage', () => {
    expect(supportsChunkStrategy(structuring)).toBe(false)
  })

  it('is false outside structuring', () => {
    expect(supportsChunkStrategy(construct)).toBe(false)
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

  // graph-construct's own baseline (Embed + Reduce dimensions + Cluster + Define topics) IS a
  // from-scratch fit. refitModels: true (the default for this entry) is that baseline,
  // unchanged. refitModels: false substitutes the fitting stages for their far cheaper
  // applying equivalents, so reusing costs strictly less than fitting and fitting is the
  // choice that warns.
  it('reusing fitted models substitutes cheaper applying stages and costs less than a refit', () => {
    const reuse = projectRun(construct, { ...defaultConfigFor(construct), refitModels: false })
    const refit = projectRun(construct, { ...defaultConfigFor(construct), refitModels: true })
    expect(reuse.stages.map(s => s.name)).not.toEqual(refit.stages.map(s => s.name))
    expect(reuse.minutes).toBeLessThan(refit.minutes)
    expect(refit.minutes).toBe(construct.baselineMinutes)
  })

  it('warns that re-fitting requires rebinding every agent', () => {
    const refit = projectRun(construct, { ...defaultConfigFor(construct), refitModels: true })
    expect(refit.warnings.join(' ')).toMatch(/rebind/i)
    const reuse = projectRun(construct, { ...defaultConfigFor(construct), refitModels: false })
    expect(reuse.warnings).toHaveLength(0)
  })

  it('changes the chunk count with the chunk strategy, on a chain that actually chunks', () => {
    const clause = projectRun(email, { ...defaultConfigFor(email), chunkStrategy: 'clause' })
    const fixed = projectRun(email, { ...defaultConfigFor(email), chunkStrategy: 'fixed' })
    expect(fixed.records).not.toBe(clause.records)
  })

  it('leaves records unchanged across chunk strategies on a chain with no chunk stage', () => {
    const clause = projectRun(structuring, { ...defaultConfigFor(structuring), chunkStrategy: 'clause' })
    const fixed = projectRun(structuring, { ...defaultConfigFor(structuring), chunkStrategy: 'fixed' })
    const semantic = projectRun(structuring, { ...defaultConfigFor(structuring), chunkStrategy: 'semantic' })
    expect(fixed.records).toBe(clause.records)
    expect(semantic.records).toBe(clause.records)
  })

  it('drops the redaction stage when redaction is turned off, and warns', () => {
    const on = projectRun(structuring, { ...defaultConfigFor(structuring), redact: true })
    const off = projectRun(structuring, { ...defaultConfigFor(structuring), redact: false })
    expect(off.stages.length).toBeLessThan(on.stages.length)
    expect(off.warnings.join(' ')).toMatch(/personal data/i)
  })

  it('leaves stages and warnings unchanged when redaction is turned off on a chain with no redaction stage', () => {
    const on = projectRun(documents, { ...defaultConfigFor(documents), redact: true })
    const off = projectRun(documents, { ...defaultConfigFor(documents), redact: false })
    expect(off.stages.map(s => s.name)).toEqual(on.stages.map(s => s.name))
    expect(off.warnings).toHaveLength(0)
  })

  it('claims no readiness delta on a dry run', () => {
    const real = projectRun(remediation, { ...defaultConfigFor(remediation), dryRun: false })
    const dry = projectRun(remediation, { ...defaultConfigFor(remediation), dryRun: true })
    expect(real.readinessDelta).toBe(remediation.readinessDelta)
    expect(dry.readinessDelta).toBe(0)
  })

  it('has no effect outside remediation', () => {
    const real = projectRun(construct, { ...defaultConfigFor(construct), dryRun: false })
    const dry = projectRun(construct, { ...defaultConfigFor(construct), dryRun: true })
    expect(dry.readinessDelta).toBe(real.readinessDelta)
    expect(dry.warnings.join(' ')).not.toMatch(/written/i)
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

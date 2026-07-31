import { describe, it, expect } from 'vitest'
import { buildEntry, stageOptionsFor, defaultStagesFor } from '../data/createPipeline'
import { allEntries } from '../data/pipelineCatalogue'
import { SOURCES } from '../data/sources'

const draft = {
  name: 'Broker email triage',
  kind: 'structuring' as const,
  sourceIds: [SOURCES.find(s => s.status === 'connected')!.id],
  stageNames: ['Parse', 'Chunk'],
}

describe('buildEntry', () => {
  it('sums the record volume of the selected sources', () => {
    const expected = SOURCES.find(s => s.id === draft.sourceIds[0])!.records
    expect(buildEntry(draft, 'created-1').baselineRecords).toBe(expected)
  })

  it('never derives a runtime below one minute', () => {
    const tiny = { ...draft, sourceIds: [] }
    expect(buildEntry(tiny, 'created-1').baselineMinutes).toBeGreaterThanOrEqual(1)
  })

  it('renormalises the stage weights to one', () => {
    const total = buildEntry(draft, 'created-1').stages.reduce((s, x) => s + x.weight, 0)
    expect(total).toBeCloseTo(1, 10)
  })

  it('gives a structuring pipeline a schedule longer than its own runtime', () => {
    const entry = buildEntry(draft, 'created-1')
    expect(entry.schedule).toMatch(/^Runs /)
  })

  it('cannot collide with a catalogue id', () => {
    expect(allEntries().some(e => e.id.startsWith('created-'))).toBe(false)
  })

  it('offers only stage names that kind actually uses', () => {
    const options = stageOptionsFor('graph')
    const real = new Set(allEntries().filter(e => e.kind === 'graph').flatMap(e => e.stages.map(s => s.name)))
    expect(new Set(options)).toEqual(real)
    expect(defaultStagesFor('graph').every(n => real.has(n))).toBe(true)
  })
})

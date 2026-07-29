import { describe, it, expect } from 'vitest'
import { GRAPH_PIPELINES, EMBEDDING_DIMENSIONS, REDUCED_DIMENSIONS } from '../data/graphPipelines'
import { MODALITY_PIPELINES } from '../data/modalities'
import { KNOWLEDGE_BASES } from '../data/graph'
import { DOMAINS } from '../data/tenant'

const construct = GRAPH_PIPELINES.find(p => p.id === 'construct')!
const extend = GRAPH_PIPELINES.find(p => p.id === 'extend')!

const hours = (r: string): number => {
  const h = /(\d+)\s*h/.exec(r)?.[1]
  const m = /(\d+)\s*min/.exec(r)?.[1]
  return (h ? Number(h) : 0) + (m ? Number(m) : 0) / 60
}

describe('graph pipelines', () => {
  it('defines exactly the construction and extension pipelines, in that order', () => {
    expect(GRAPH_PIPELINES.map(p => p.id)).toEqual(['construct', 'extend'])
  })

  it('gives each pipeline a title, a lead and four stages', () => {
    for (const p of GRAPH_PIPELINES) {
      expect(p.title.length, p.id).toBeGreaterThan(0)
      expect(p.lead.length, p.id).toBeGreaterThan(0)
      expect(p.stages, p.id).toHaveLength(4)
    }
  })

  it('discovers exactly as many topics as the graph has knowledge bases', () => {
    expect(construct.topicsAfter).toBe(KNOWLEDGE_BASES.length)
  })

  it('discovers exactly as many topics as the estate has scored domains', () => {
    expect(construct.topicsAfter).toBe(DOMAINS.length)
  })

  it('builds the first graph from no prior topics', () => {
    expect(construct.topicsBefore).toBe(0)
  })

  it('leaves the topic count unchanged when a dataset is added', () => {
    expect(extend.topicsBefore).toBe(extend.topicsAfter)
    expect(extend.topicsAfter).toBe(construct.topicsAfter)
  })

  it('never re-fits anything when adding a dataset', () => {
    for (const s of extend.stages) {
      expect(s.mode, `${s.name} re-fits on the extend path`).toBe('applies')
    }
  })

  it('fits the projection and the clustering exactly once, during construction', () => {
    const fitted = construct.stages.filter(s => s.mode === 'fits')
    expect(fitted.length).toBeGreaterThanOrEqual(2)
    for (const s of fitted) expect(s.produces, `${s.name} fits but names no artefact`).toBeTruthy()
  })

  it('reuses only artefacts construction fitted, or ones both paths treat as external', () => {
    // The sentence encoder is pre-trained: neither pipeline fits it, both apply it.
    // Only the projection and the cluster model are fitted here, so the pairing
    // check has to allow a shared external dependency rather than forcing
    // construction to claim it produced one.
    const produced = new Set(construct.stages.filter(s => s.produces).map(s => s.produces!))
    const external = new Set(construct.stages.filter(s => s.reuses).map(s => s.reuses!))
    const reused = extend.stages.filter(s => s.reuses).map(s => s.reuses!)
    expect(reused.length).toBeGreaterThanOrEqual(2)
    for (const r of reused) {
      expect(
        produced.has(r) || external.has(r),
        `extend reuses "${r}", which construction neither fits nor also treats as external`,
      ).toBe(true)
    }
  })

  it('reuses every artefact it went to the trouble of fitting', () => {
    const produced = construct.stages.filter(s => s.produces).map(s => s.produces!)
    const reused = extend.stages.filter(s => s.reuses).map(s => s.reuses!)
    for (const p of produced) {
      expect(reused, `construction fits "${p}" but the extend path never reuses it`).toContain(p)
    }
  })

  it('holds unmatched points for review rather than discarding them, on both paths', () => {
    expect(extend.unassigned).toBeDefined()
    expect(extend.unassigned!.count).toBeGreaterThan(0)
    expect(extend.unassigned!.note.length).toBeGreaterThan(0)
    expect(construct.unassigned).toBeDefined()
    expect(construct.unassigned!.count).toBeGreaterThan(0)
    expect(construct.unassigned!.note.length).toBeGreaterThan(0)
  })

  it('ties the extend residue to the stage counts it is computed from', () => {
    const embed = extend.stages.find(s => s.name === 'Embed')!
    const assign = extend.stages.find(s => s.name === 'Assign')!
    expect(extend.unassigned!.count).toBe(embed.count - assign.count)
  })

  it('derives the construction embed volume from what actually enters the graph per modality', () => {
    // Recomputes the sum independently of graphPipelines.ts's own derivation,
    // so this guards against the implementation drifting back to a
    // hand-typed literal as much as it guards against a modality change.
    const stageCount = (modality: string, stageName: string): number => {
      const pipeline = MODALITY_PIPELINES.find(p => p.modality === modality)!
      return pipeline.stages.find(s => s.name === stageName)!.count
    }
    const expected =
      stageCount('tables', 'Profile') +
      stageCount('documents', 'Embed') +
      stageCount('tickets', 'Embed') +
      stageCount('email', 'Embed') +
      stageCount('transcripts', 'Embed') +
      stageCount('images', 'Embed') +
      stageCount('streams', 'Aggregate')

    const embed = construct.stages.find(s => s.name === 'Embed')!
    expect(embed.count).toBe(expected)
  })

  it('marks every fitting stage with a produced artefact and no reuse, and every applying stage the reverse', () => {
    for (const p of GRAPH_PIPELINES) {
      for (const s of p.stages) {
        if (s.mode === 'fits') {
          expect(s.produces, `${p.id}/${s.name} fits but names no artefact`).toBeTruthy()
          expect(s.reuses, `${p.id}/${s.name} fits but also reuses`).toBeUndefined()
        } else {
          expect(s.reuses, `${p.id}/${s.name} applies but names nothing it reuses`).toBeTruthy()
          expect(s.produces, `${p.id}/${s.name} applies but also produces`).toBeUndefined()
        }
      }
    }
  })

  it('gives every stage a count, a unit and a runtime', () => {
    for (const p of GRAPH_PIPELINES) {
      for (const s of p.stages) {
        expect(s.count, `${p.id}/${s.name}`).toBeGreaterThan(0)
        expect(s.unit.length, `${p.id}/${s.name}`).toBeGreaterThan(0)
        expect(s.runtime, `${p.id}/${s.name}`).toMatch(/min|h|s/)
        expect(s.detail.length, `${p.id}/${s.name}`).toBeGreaterThan(0)
      }
    }
  })

  it('keeps every stage inside the bounds the rest of the demo obeys', () => {
    for (const p of GRAPH_PIPELINES) {
      for (const s of p.stages) {
        expect(hours(s.runtime), `${p.id}/${s.name} at ${s.runtime}`).toBeLessThanOrEqual(18)
      }
      const total = p.stages.reduce((n, s) => n + hours(s.runtime), 0)
      expect(total, `${p.id} chain totals ${total.toFixed(1)}h`).toBeLessThan(48)
    }
  })

  it('adds a dataset far faster than it builds the graph', () => {
    const t = (p: typeof construct) => p.stages.reduce((n, s) => n + hours(s.runtime), 0)
    expect(t(extend)).toBeLessThan(t(construct))
  })

  it('names its dimensions and reduces them', () => {
    expect(EMBEDDING_DIMENSIONS).toBe(1_024)
    expect(REDUCED_DIMENSIONS).toBeLessThan(EMBEDDING_DIMENSIONS)
    expect(REDUCED_DIMENSIONS).toBeGreaterThan(2)
  })
})

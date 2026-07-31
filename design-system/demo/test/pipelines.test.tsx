import { describe, it, expect } from 'vitest'
import { PLAN } from '../data/pipelines'
import { DOMAINS } from '../data/tenant'

// The screen-level assertions that used to live here (live run bar, "run step"
// buttons, the old plan panel) tested UI this task removed — the console this
// task builds instead is covered end to end by pipelinesList.test.tsx. What
// remains here is the underlying PLAN data every remediation catalogue entry is
// derived from (see pipelineCatalogue.ts's REMEDIATION_SECTION).
describe('pipeline data', () => {
  it('quotes the canon counts', () => {
    const counts = Object.fromEntries(PLAN.map(s => [s.kind, s.count]))
    expect(counts.resolve).toBe(41_208)
    expect(counts.type).toBe(380)
    expect(counts.mask).toBe(12)
    expect(counts.chunk).toBe(22_470)
  })

  it('attaches a readiness delta to every step, aimed at a real domain', () => {
    const keys = new Set(DOMAINS.map(d => d.key))
    for (const s of PLAN) {
      expect(s.delta).toBeGreaterThan(0)
      expect(keys.has(s.domain), s.kind).toBe(true)
    }
  })
})

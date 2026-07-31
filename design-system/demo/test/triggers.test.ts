import { describe, it, expect } from 'vitest'
import { triggersFor } from '../data/triggers'
import { allEntries, entryById } from '../data/pipelineCatalogue'
import { RED_FLAGS } from '../data/readiness'
import { PLAN } from '../data/pipelines'
import { REFIT_WARNING } from '../runConfig'

describe('triggersFor', () => {
  it('gives every pipeline exactly one fixed manual trigger', () => {
    for (const entry of allEntries()) {
      const manual = triggersFor(entry).filter(t => t.kind === 'manual')
      expect(manual, entry.id).toHaveLength(1)
      expect(manual[0].fixed).toBe(true)
    }
  })

  it('labels a structuring schedule with the pipeline own cadence', () => {
    for (const entry of allEntries().filter(e => e.kind === 'structuring')) {
      const schedule = triggersFor(entry).find(t => t.kind === 'schedule')
      expect(schedule?.label, entry.id).toBe(entry.schedule)
    }
  })

  it('gives the topic model no automatic trigger, and says why', () => {
    const triggers = triggersFor(entryById('graph-construct')!)
    expect(triggers.every(t => t.kind === 'manual')).toBe(true)
    expect(triggers[0].detail).toContain(REFIT_WARNING)
  })

  it('gives a remediation pipeline a flag trigger only when a flag shares its domain', () => {
    for (const step of PLAN) {
      const entry = entryById(`plan-${step.id}`)!
      const flag = RED_FLAGS.find(f => f.domain === step.domain)
      const event = triggersFor(entry).find(t => t.kind === 'event')
      if (flag) expect(event?.label, step.id).toContain(flag.title)
      else expect(event, step.id).toBeUndefined()
    }
  })

  it('has a unique id per trigger across the whole catalogue', () => {
    const ids = allEntries().flatMap(e => triggersFor(e).map(t => t.id))
    expect(new Set(ids).size).toBe(ids.length)
  })
})

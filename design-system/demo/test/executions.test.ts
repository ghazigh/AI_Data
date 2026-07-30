import { describe, it, expect } from 'vitest'
import { executionId } from '../data/executions'
import { RUN_HISTORY } from '../data/runHistory'

describe('executionId', () => {
  it('is stable for the same record id', () => {
    expect(executionId('hist-1')).toBe(executionId('hist-1'))
  })

  it('is eight lowercase hex characters behind an x- prefix', () => {
    expect(executionId('hist-1')).toMatch(/^x-[0-9a-f]{8}$/)
  })

  it('is unique across every seeded record and the first fifty session run ids', () => {
    const ids = [
      ...RUN_HISTORY.map(h => executionId(h.id)),
      ...Array.from({ length: 50 }, (_, i) => executionId(`run-${i + 1}`)),
    ]
    expect(new Set(ids).size).toBe(ids.length)
  })
})

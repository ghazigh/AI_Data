import type { RunRecord } from '../state'
import { RUN_HISTORY } from './runHistory'

/**
 * FNV-1a over the record id, rendered as eight hex characters. Deterministic and
 * clock-free: the same record gets the same execution id on the server, in the
 * browser after hydration, and across a rebuild.
 */
export const executionId = (recordId: string): string => {
  let hash = 0x811c9dc5
  for (let i = 0; i < recordId.length; i++) {
    hash ^= recordId.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return `x-${hash.toString(16).padStart(8, '0')}`
}

export type ExecutionStatus = 'running' | 'succeeded' | 'failed' | 'cancelled' | 'none'

export interface LastExecution {
  status: ExecutionStatus
  /** Relative label already fixed in the data, or 'In progress' / 'Not yet run'. */
  label: string
}

/**
 * The most recent execution of a pipeline: a session run if one exists — always
 * more recent than anything seeded — otherwise its RUN_HISTORY record.
 */
export const lastExecutionFor = (entryId: string, runs: RunRecord[]): LastExecution => {
  const run = runs.find(r => r.entryId === entryId)
  if (run) {
    if (run.status === 'running') return { status: 'running', label: 'In progress' }
    if (run.status === 'cancelled') return { status: 'cancelled', label: 'Just now' }
    return { status: 'succeeded', label: 'Just now' }
  }
  const seeded = RUN_HISTORY.find(h => h.entryId === entryId)
  if (!seeded) return { status: 'none', label: 'Not yet run' }
  return { status: seeded.outcome, label: seeded.finished }
}

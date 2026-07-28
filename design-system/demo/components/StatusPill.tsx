import type { SourceStatus } from '../data/types'
import type { UseCaseStatus } from '../data/useCases'

export type PillTone = 'ok' | 'warn' | 'neutral' | 'blue'

export function StatusPill({ tone, label }: { tone: PillTone; label: string }) {
  return <span className={`dm-pill is-${tone}`}>{label}</span>
}

/**
 * How a source's status looks, defined once. The table and the drawer show the
 * same row, so they must say the same thing about it — a row reading "Scanning"
 * in blue in the table and "scanning" in grey in its own drawer is the kind of
 * contradiction that costs a demo its credibility.
 */
export const sourceStatusPill = (status: SourceStatus): { tone: PillTone; label: string } =>
  status === 'connected' ? { tone: 'ok', label: 'Connected' }
  : status === 'scanning' ? { tone: 'blue', label: 'Scanning' }
  : { tone: 'neutral', label: 'Awaiting credentials' }

/**
 * How a use case's status looks, defined once. Overview's teaser list and the
 * full Use cases table show the same opportunities, so they must render the
 * same pill for the same status.
 */
export const useCaseStatusPill = (status: UseCaseStatus): { tone: PillTone; label: string } =>
  status === 'ready' ? { tone: 'ok', label: 'Ready to build' }
  : status === 'in-review' ? { tone: 'neutral', label: 'In review' }
  : { tone: 'warn', label: 'Blocked' }

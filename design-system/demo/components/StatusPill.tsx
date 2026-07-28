import type { SourceStatus } from '../data/types'

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

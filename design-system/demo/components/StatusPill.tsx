export type PillTone = 'ok' | 'warn' | 'neutral' | 'blue'

export function StatusPill({ tone, label }: { tone: PillTone; label: string }) {
  return <span className={`dm-pill is-${tone}`}>{label}</span>
}

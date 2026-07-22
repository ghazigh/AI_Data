import type { ReactNode } from 'react'

export interface BadgeProps {
  tone?: 'ink' | 'blue' | 'neutral' | 'ok' | 'warn'
  children: ReactNode
}

/** Small pill chip for statuses and taxonomy. */
export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`dl-badge dl-badge--${tone}`}>{children}</span>
}

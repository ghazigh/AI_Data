import type { ReactNode } from 'react'

export interface SectionLabelProps {
  children: ReactNode
  /** Leading hairline rule (default true). */
  rule?: boolean
}

/** Mono uppercase eyebrow that opens a section. */
export function SectionLabel({ children, rule = true }: SectionLabelProps) {
  return <div className={`dl-seclabel${rule ? ' dl-seclabel--rule' : ''}`}>{children}</div>
}

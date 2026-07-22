import type { ReactNode } from 'react'

export interface CardProps {
  /** Mono eyebrow above the title, e.g. "Module 01". */
  label?: string
  title?: string
  tone?: 'paper' | 'canvas' | 'ink'
  children?: ReactNode
}

/** Sharp-cornered hairline surface — the gallery wall label. */
export function Card({ label, title, tone = 'paper', children }: CardProps) {
  return (
    <div className={`dl-card dl-card--${tone}${tone === 'ink' ? ' dl-on-ink' : ''}`}>
      {label && <span className="dl-card-label">{label}</span>}
      {title && <h3 className="dl-card-title">{title}</h3>}
      {children && <div className="dl-card-body">{children}</div>}
    </div>
  )
}

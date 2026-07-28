import type { ReactNode } from 'react'

export function PageHead({ eyebrow, title, actions }: { eyebrow: string; title: string; actions?: ReactNode }) {
  return (
    <div className="dm-pagehead">
      <div>
        <p className="dm-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      {actions && <div className="dm-pagehead-actions">{actions}</div>}
    </div>
  )
}

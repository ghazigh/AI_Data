import type { ReactNode } from 'react'

export interface PageHeadProps {
  eyebrow: string
  title: string
  /** One sentence under the title saying what the screen is for. */
  lead?: string
  actions?: ReactNode
}

export function PageHead({ eyebrow, title, lead, actions }: PageHeadProps) {
  return (
    <div className="dm-pagehead">
      <div>
        <p className="dm-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead && <p className="dm-pagehead-lead">{lead}</p>}
      </div>
      {actions && <div className="dm-pagehead-actions">{actions}</div>}
    </div>
  )
}

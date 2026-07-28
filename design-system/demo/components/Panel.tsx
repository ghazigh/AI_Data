import { useId, type ReactNode } from 'react'

export interface PanelProps {
  eyebrow?: string
  title: string
  action?: ReactNode
  children: ReactNode
}

export function Panel({ eyebrow, title, action, children }: PanelProps) {
  const id = useId()
  return (
    <section className="dm-panel" aria-labelledby={id}>
      <header className="dm-panel-h">
        <div>
          {eyebrow && <p className="dm-eyebrow">{eyebrow}</p>}
          <h2 className="dm-panel-title" id={id}>{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}

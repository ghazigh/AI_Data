import type { ReactNode } from 'react'

export interface PanelProps {
  eyebrow?: string
  title: string
  action?: ReactNode
  /** 'ink' marks this panel as the screen's one intelligence surface. At most
   * one per screen — the whole hierarchy rests on that being rare. */
  tone?: 'ink'
  children: ReactNode
}

// aria-label (not aria-labelledby + useId) so the accessible name is derived
// straight from props — identical on every render, server or client, with no
// dependency on React's per-root id counter.
export function Panel({ eyebrow, title, action, tone, children }: PanelProps) {
  return (
    <section className={`dm-panel${tone === 'ink' ? ' dm-ink' : ''}`} aria-label={title}>
      <header className="dm-panel-h">
        <div>
          {eyebrow && <p className="dm-eyebrow">{eyebrow}</p>}
          <h2 className="dm-panel-title">{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}

import { useEffect, useRef, type ReactNode } from 'react'

export interface DrawerProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function Drawer({ open, title, onClose, children }: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const panel = ref.current
    const previous = document.activeElement as HTMLElement | null
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('keydown', onKeyDown); previous?.focus?.() }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="dm-drawer-scrim" onClick={onClose}>
      <div
        className="dm-drawer"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={e => e.stopPropagation()}
      >
        <header className="dm-drawer-h">
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close panel">✕</button>
        </header>
        <div className="dm-drawer-body">{children}</div>
      </div>
    </div>
  )
}

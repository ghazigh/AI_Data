import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

/**
 * Transient confirmations for the actions a demo operator takes — a source
 * connected, a run started, the estate reset. They answer "did that work?"
 * without a dialog, and they leave on their own.
 *
 * The queue starts empty on the server and on the client's first render, so
 * there is nothing for hydration to disagree about; every toast is created by
 * an operator action. Ids come from a counter, never a clock.
 */
export type ToastTone = 'ok' | 'info' | 'warn'

export interface ToastInput {
  title: string
  detail?: string
  tone?: ToastTone
}

export interface ToastRecord extends ToastInput {
  id: number
  tone: ToastTone
}

interface ToastApi {
  toasts: ToastRecord[]
  push: (toast: ToastInput) => void
  dismiss: (id: number) => void
}

const NOOP_API: ToastApi = { toasts: [], push: () => {}, dismiss: () => {} }

const ToastContext = createContext<ToastApi>(NOOP_API)

/** How long a toast stays before leaving by itself. */
export const TOAST_MS = 4200

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([])
  const seq = useRef(0)

  const dismiss = useCallback((id: number) => setToasts(prev => prev.filter(t => t.id !== id)), [])
  const push = useCallback((toast: ToastInput) => {
    const id = (seq.current += 1)
    setToasts(prev => [...prev.slice(-2), { tone: 'ok', ...toast, id }])
  }, [])

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export const useToast = (): ToastApi['push'] => useContext(ToastContext).push

const ICON: Record<ToastTone, IconName> = { ok: 'check', info: 'info', warn: 'alert' }

function ToastItem({ toast, onDismiss }: { toast: ToastRecord; onDismiss: () => void }) {
  // The timer lives here, per toast, so dismissing one never resets another's.
  const onDismissRef = useRef(onDismiss)
  onDismissRef.current = onDismiss
  useEffect(() => {
    const id = setTimeout(() => onDismissRef.current(), TOAST_MS)
    return () => clearTimeout(id)
  }, [])

  return (
    <li className={`dm-toast is-${toast.tone}`} role="status">
      <span className="dm-toast-ic"><Icon name={ICON[toast.tone]} size={14} strokeWidth={2.2} /></span>
      <div>
        <p className="dm-toast-t">{toast.title}</p>
        {toast.detail && <p className="dm-toast-d">{toast.detail}</p>}
      </div>
      <button type="button" className="dm-toast-x" onClick={onDismiss} aria-label={`Dismiss: ${toast.title}`}>
        <Icon name="x" size={13} />
      </button>
    </li>
  )
}

/** Renders the queue. Mounted once by the shell, bottom-left, above the guide. */
export function ToastViewport() {
  const { toasts, dismiss } = useContext(ToastContext)
  if (toasts.length === 0) return null
  return (
    <ul className="dm-toasts" aria-label="Notifications">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />)}
    </ul>
  )
}

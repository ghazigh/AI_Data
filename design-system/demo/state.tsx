import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { SOURCES } from './data/sources'
import type { Source } from './data/types'

export interface DemoState {
  sources: Source[]
  /** Adds a source in `scanning` state; the caller settles it to `connected`. */
  connectSource: (source: Source) => void
  settleSource: (id: string, readiness: number) => void
  resetDemo: () => void
}

const Ctx = createContext<DemoState | null>(null)

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [sources, setSources] = useState<Source[]>(SOURCES)

  const value = useMemo<DemoState>(() => ({
    sources,
    connectSource: s => setSources(prev => (prev.some(p => p.id === s.id) ? prev : [{ ...s, status: 'scanning' }, ...prev])),
    settleSource: (id, readiness) =>
      setSources(prev => prev.map(s => (s.id === id ? { ...s, status: 'connected', readiness } : s))),
    resetDemo: () => setSources(SOURCES),
  }), [sources])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useDemoState(): DemoState {
  const v = useContext(Ctx)
  if (!v) throw new Error('useDemoState must be used inside DemoStateProvider')
  return v
}

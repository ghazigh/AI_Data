import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

/**
 * Chrome-level state the shell's parts share without threading props: whether
 * the presenter's guide is open. Lives in its own module, importing nothing but
 * React, for the same reason navigation.ts does — TopBar and DemoGuide both
 * need it, and neither should import the other.
 *
 * Closed by default, so the server's markup and the client's first render agree;
 * opened only by an operator action.
 */
export interface ShellState {
  guideOpen: boolean
  setGuideOpen: (open: boolean) => void
}

const NOOP: ShellState = { guideOpen: false, setGuideOpen: () => {} }

const ShellContext = createContext<ShellState>(NOOP)

export function ShellProvider({ children }: { children: ReactNode }) {
  const [guideOpen, setGuideOpen] = useState(false)
  const value = useMemo(() => ({ guideOpen, setGuideOpen }), [guideOpen])
  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>
}

export const useShell = (): ShellState => useContext(ShellContext)

import type { ReactNode } from 'react'
import { Rail } from './Rail'
import { TopBar } from './TopBar'
import { DemoGuide } from './DemoGuide'
import { ToastViewport } from './Toast'
import { ShellProvider } from '../shell'
import { ROUTES, routeForSlug } from '../routes'

export interface AppShellProps { current: string; prefix: string; children: ReactNode }

export function AppShell({ current, prefix, children }: AppShellProps) {
  // routeForSlug(), not a raw ALL_ROUTES lookup — see DemoApp.tsx's own note.
  const route = routeForSlug(current) ?? ROUTES[0]
  return (
    <ShellProvider>
      <div className="dm-root">
        <Rail current={current} prefix={prefix} />
        <div className="dm-main">
          <TopBar route={route} prefix={prefix} />
          <main className="dm-content" id="dm-content" tabIndex={-1}>
            {/* Keyed on the slug so a new screen enters with its own rise-in,
                while <main> itself stays mounted — the router focuses it right
                after navigating, before this subtree has re-rendered. */}
            <div className="dm-page" key={current}>{children}</div>
          </main>
        </div>
        <DemoGuide current={current} />
        <ToastViewport />
      </div>
    </ShellProvider>
  )
}

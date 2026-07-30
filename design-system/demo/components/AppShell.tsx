import type { ReactNode } from 'react'
import { Rail } from './Rail'
import { TopBar } from './TopBar'
import { ROUTES, ALL_ROUTES } from '../routes'

export interface AppShellProps { current: string; prefix: string; children: ReactNode }

export function AppShell({ current, prefix, children }: AppShellProps) {
  const route = ALL_ROUTES.find(r => r.slug === current) ?? ROUTES[0]
  return (
    <div className="dm-root">
      <Rail current={current} prefix={prefix} />
      <div className="dm-main">
        <TopBar route={route} prefix={prefix} />
        <main className="dm-content" id="dm-content" tabIndex={-1}>{children}</main>
      </div>
    </div>
  )
}

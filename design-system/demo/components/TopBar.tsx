import type { DemoRoute } from '../routes'
import { TENANT } from '../data/tenant'
import { ESTATE } from '../data/tenant'

export interface TopBarProps { route: DemoRoute }

export function TopBar({ route }: TopBarProps) {
  return (
    <div className="dm-topbar">
      <p className="dm-crumb">
        {TENANT.name} / <b>{route.title}</b>
      </p>
      <div className="dm-search" role="search">
        <span>Search the estate…</span>
        <kbd>⌘K</kbd>
      </div>
      <p className="dm-chip">Readiness <b>{ESTATE.score}</b></p>
    </div>
  )
}

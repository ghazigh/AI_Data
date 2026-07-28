import { useState } from 'react'
import type { DemoRoute } from '../routes'
import { TENANT } from '../data/tenant'
import { ESTATE } from '../data/tenant'
import { useDemoState } from '../state'

export interface TopBarProps { route: DemoRoute }

export function TopBar({ route }: TopBarProps) {
  const [query, setQuery] = useState('')
  const { resetDemo } = useDemoState()
  return (
    <div className="dm-topbar">
      <p className="dm-crumb">
        {`${TENANT.name} / `}<b>{route.title}</b>
      </p>
      <div className="dm-search">
        <input
          type="search"
          className="dm-search-input"
          placeholder="Search the estate…"
          aria-label="Search the estate"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <kbd aria-hidden="true">⌘K</kbd>
      </div>
      <p className="dm-chip">Readiness <b>{ESTATE.score}</b></p>
      <button className="dm-reset" type="button" onClick={resetDemo}>Reset demo</button>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import type { DemoRoute } from '../routes'
import { ALL_ROUTES, hrefFor } from '../routes'
import { TENANT, ESTATE } from '../data/tenant'
import { searchEstate } from '../search'
import { useDemoState } from '../state'

export interface TopBarProps { route: DemoRoute; prefix: string }

export function TopBar({ route, prefix }: TopBarProps) {
  const { resetDemo } = useDemoState()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const results = searchEstate(query)
  const searching = query.trim().length >= 2

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); inputRef.current?.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const parent = route.parentSlug ? ALL_ROUTES.find(r => r.slug === route.parentSlug) : undefined

  return (
    <div className="dm-topbar">
      {parent ? (
        <p className="dm-crumb">
          {TENANT.name} / <a href={hrefFor(parent.slug, prefix)} data-demo-link>{parent.title}</a> ▸ <b>{route.title}</b>
        </p>
      ) : (
        <p className="dm-crumb">{TENANT.name} / <b>{route.title}</b></p>
      )}

      <div className="dm-search">
        <input
          ref={inputRef}
          type="search"
          className="dm-search-input"
          value={query}
          placeholder="Search the estate…"
          aria-label="Search the estate"
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Escape') setQuery('') }}
        />
        <kbd aria-hidden="true">⌘K</kbd>
        {searching && (
          results.length > 0 ? (
            <ul className="dm-results" aria-label="Search results">
              {results.map(r => (
                <li key={r.id}>
                  <a href={hrefFor(r.slug, prefix)} data-demo-link onClick={() => setQuery('')}>
                    <span className="dm-result-label">{r.label}</span>
                    <span className="dm-result-sub">{r.sublabel}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dm-results dm-results-empty" role="status">
              Nothing in the estate matches “{query.trim()}”.
            </p>
          )
        )}
      </div>

      <p className="dm-chip">Readiness <b>{ESTATE.score}</b></p>
      <button className="dm-reset" type="button" onClick={resetDemo}>Reset demo</button>
    </div>
  )
}

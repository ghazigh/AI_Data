import { useEffect, useRef, useState } from 'react'
import type { DemoRoute } from '../routes'
import { ALL_ROUTES, ROUTES, hrefFor, pipelineIdForSlug } from '../routes'
import { TENANT, ESTATE } from '../data/tenant'
import { ACTIVITY } from '../data/activity'
import { searchEstate, type ResultKind } from '../search'
import { useDemoState } from '../state'
import { useNavigate } from '../navigation'
import { useShell } from '../shell'
import { useToast } from './Toast'
import { Icon, ROUTE_ICON, type IconName } from './Icon'
import { monogram } from './VendorMark'
import { arcPath } from './charts/ScoreRing'

export interface TopBarProps { route: DemoRoute; prefix: string }

/** The glyph and the word each result kind reads under in the palette. */
const KIND: Record<ResultKind, { icon: IconName; label: string }> = {
  source: { icon: 'database', label: 'Source' },
  domain: { icon: 'gauge', label: 'Domain' },
  entity: { icon: 'graph', label: 'Entity' },
  'use-case': { icon: 'sparkles', label: 'Use case' },
  agent: { icon: 'shield', label: 'Agent' },
}

/** Entries the bell counts: the ones that need a person, not the ones that merely happened. */
const ALERTS = ACTIVITY.filter(a => a.tone === 'warn')

/** A 20px readiness arc for the chip — the same geometry the Ready screen draws large. */
function MiniRing({ score }: { score: number }) {
  const start = 135, sweep = 270
  return (
    <svg className="dm-chip-ring" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path className="dm-chip-track" d={arcPath(9, 9, 6.5, start, start + sweep)} />
      <path className="dm-chip-fill" d={arcPath(9, 9, 6.5, start, start + (sweep * score) / 100)} />
    </svg>
  )
}

export function TopBar({ route, prefix }: TopBarProps) {
  const { resetDemo, allEntriesWithCreated, sources } = useDemoState()
  const navigate = useNavigate()
  const { guideOpen, setGuideOpen } = useShell()
  const toast = useToast()

  // ---- the command palette ------------------------------------------------
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)
  const results = searchEstate(query)
  const searching = query.trim().length >= 2
  // With nothing typed the palette offers the screens themselves — the fastest
  // way between two parts of the demo mid-conversation.
  const jumps = ROUTES.map(r => ({ id: `jump-${r.slug || 'overview'}`, label: r.title, slug: r.slug, icon: ROUTE_ICON[r.slug] ?? 'layers' }))
  const items = searching ? results.map(r => ({ id: r.id, slug: r.slug })) : jumps.map(j => ({ id: j.id, slug: j.slug }))

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); inputRef.current?.focus(); setOpen(true) }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  // Clicking anywhere outside the palette closes it — the same rule every
  // popover in the bar follows.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!paletteRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const go = (slug: string) => {
    setQuery('')
    setOpen(false)
    navigate(slug)
  }

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') { setQuery(''); setOpen(false); return }
    if (!open || items.length === 0) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => (i + 1) % items.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => (i - 1 + items.length) % items.length) }
    else if (e.key === 'Enter') { e.preventDefault(); go(items[Math.min(active, items.length - 1)].slug) }
  }

  // ---- notifications --------------------------------------------------------
  const [bellOpen, setBellOpen] = useState(false)
  const bellRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!bellOpen) return
    const onDown = (e: MouseEvent) => { if (!bellRef.current?.contains(e.target as Node)) setBellOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setBellOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [bellOpen])

  // ---- breadcrumb -----------------------------------------------------------
  const parent = route.parentSlug ? ALL_ROUTES.find(r => r.slug === route.parentSlug) : undefined
  // A session-created pipeline's route is synthetic (see routes.tsx), so its
  // real name is read live from state — the same source its own <h1> reads.
  const pipelineId = pipelineIdForSlug(route.slug)
  const leaf = pipelineId ? allEntriesWithCreated().find(e => e.id === pipelineId)?.name ?? route.title : route.title
  const connected = sources.filter(s => s.status === 'connected').length

  const onReset = () => {
    resetDemo()
    toast({ title: 'Demo reset', detail: 'Back to the starting estate — every source, run and setting.', tone: 'info' })
  }

  const activeId = open && items.length > 0 ? `dm-opt-${items[Math.min(active, items.length - 1)].id}` : undefined

  return (
    <div className="dm-topbar">
      <p className="dm-crumb">
        <span className="dm-crumb-root">{TENANT.name}</span>
        <Icon name="chevron-right" size={12} className="dm-crumb-sep" />
        {parent && (
          <>
            <a href={hrefFor(parent.slug, prefix)} data-demo-link>{parent.title}</a>
            <Icon name="chevron-right" size={12} className="dm-crumb-sep" />
          </>
        )}
        <b>{leaf}</b>
      </p>

      <div className={`dm-search${open ? ' is-open' : ''}`} ref={paletteRef}>
        <span className="dm-search-ic"><Icon name="search" size={15} /></span>
        <input
          ref={inputRef}
          type="search"
          className="dm-search-input"
          value={query}
          placeholder="Search the estate or jump to a screen…"
          aria-label="Search the estate"
          role="searchbox"
          aria-expanded={open}
          aria-controls={open ? 'dm-palette' : undefined}
          aria-activedescendant={activeId}
          autoComplete="off"
          onChange={e => { setQuery(e.target.value); setActive(0); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={onInputKey}
        />
        <kbd aria-hidden="true">⌘K</kbd>

        {open && (
          <div className="dm-palette" id="dm-palette">
            {searching ? (
              results.length > 0 ? (
                <>
                  <p className="dm-palette-h">Results <span>· {results.length}</span></p>
                  <ul className="dm-results" aria-label="Search results">
                    {results.map((r, i) => (
                      <li key={r.id} id={`dm-opt-${r.id}`} className={i === Math.min(active, items.length - 1) ? 'is-active' : undefined}>
                        <a href={hrefFor(r.slug, prefix)} data-demo-link onClick={() => { setQuery(''); setOpen(false) }} onMouseEnter={() => setActive(i)}>
                          <span className="dm-result-ic"><Icon name={KIND[r.kind].icon} size={14} /></span>
                          <span className="dm-result-body">
                            <span className="dm-result-label">{r.label}</span>
                            <span className="dm-result-sub">{r.sublabel}</span>
                          </span>
                          <span className="dm-result-kind">{KIND[r.kind].label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="dm-results-empty" role="status">
                  Nothing in the estate matches “{query.trim()}”.
                </p>
              )
            ) : (
              <>
                <p className="dm-palette-h">Jump to</p>
                <ul className="dm-results is-jumps" aria-label="Jump to a screen">
                  {jumps.map((j, i) => (
                    <li key={j.id} id={`dm-opt-${j.id}`} className={i === Math.min(active, items.length - 1) ? 'is-active' : undefined}>
                      <a href={hrefFor(j.slug, prefix)} data-demo-link onClick={() => setOpen(false)} onMouseEnter={() => setActive(i)}>
                        <span className="dm-result-ic"><Icon name={j.icon} size={14} /></span>
                        <span className="dm-result-body"><span className="dm-result-label">{j.label}</span></span>
                        {j.slug === route.slug && <span className="dm-result-kind">Current</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className="dm-palette-foot">
              <kbd>↑↓</kbd> navigate <kbd>↵</kbd> open <kbd>esc</kbd> close
              <span>Sources, domains, entities, use cases and agents</span>
            </p>
          </div>
        )}
      </div>

      <div className="dm-topbar-end">
        <span className="dm-livechip"><i aria-hidden="true" />{connected} sources live</span>

        <a className="dm-chip" href={hrefFor('ready', prefix)} data-demo-link title="Open readiness">
          <MiniRing score={ESTATE.score} />
          Readiness <b>{ESTATE.score}</b>
        </a>

        <div className="dm-bell" ref={bellRef}>
          <button
            type="button"
            className={`dm-iconbtn${bellOpen ? ' is-on' : ''}`}
            aria-label={`Notifications, ${ALERTS.length} need attention`}
            aria-expanded={bellOpen}
            onClick={() => setBellOpen(o => !o)}
          >
            <Icon name="bell" size={16} />
            {ALERTS.length > 0 && <span className="dm-badge" aria-hidden="true">{ALERTS.length}</span>}
          </button>
          {bellOpen && (
            <div className="dm-pop" role="dialog" aria-label="Recent notifications">
              <p className="dm-pop-h">Notifications <span>· {ALERTS.length} need attention</span></p>
              <ul className="dm-pop-list">
                {ACTIVITY.slice(0, 6).map(a => (
                  <li key={a.id}>
                    <span className={`dm-dot is-${a.tone}`} aria-hidden="true" />
                    <span>
                      <span className="dm-pop-t"><b>{a.subject}</b> {a.detail}</span>
                      <span className="dm-when">{a.when}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <a className="dm-pop-foot" href={hrefFor('governance', prefix)} data-demo-link onClick={() => setBellOpen(false)}>
                Open the full activity stream <Icon name="arrow-right" size={13} />
              </a>
            </div>
          )}
        </div>

        <button
          type="button"
          className={`dm-guidebtn${guideOpen ? ' is-on' : ''}`}
          aria-pressed={guideOpen}
          onClick={() => setGuideOpen(!guideOpen)}
        >
          <Icon name="presentation" size={15} /> Guide
        </button>

        <button className="dm-iconbtn" type="button" onClick={onReset} aria-label="Reset demo" title="Reset demo">
          <Icon name="refresh" size={16} />
        </button>

        <span className="dm-avatar is-sm" title={`${TENANT.viewer.name} · ${TENANT.viewer.role}`} aria-hidden="true">
          {monogram(TENANT.viewer.name)}
        </span>
      </div>
    </div>
  )
}

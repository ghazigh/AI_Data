import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { DemoRoot } from '../DemoRoot'
import { DemoStateProvider } from '../state'
import { ROUTES } from '../routes'
import { TOUR, stepIndexFor } from '../data/tour'
import { attentionItems } from '../components/AttentionFeed'
import { OpportunityMap, effortWeeks } from '../components/charts/OpportunityMap'
import { ScoreRing } from '../components/charts/ScoreRing'
import { monogram, hueFor } from '../components/VendorMark'
import { ICON_NAMES, ROUTE_ICON } from '../components/Icon'
import { Connect } from '../screens/Connect'
import { UseCases } from '../screens/UseCases'
import { USE_CASES } from '../data/useCases'
import { SOURCES } from '../data/sources'
import { RED_FLAGS } from '../data/readiness'
import { AGENTS } from '../data/governance'
import { allEntries } from '../data/pipelineCatalogue'
import { ESTATE } from '../data/tenant'

/** The whole console as the browser mounts it — shell, guide, toasts, router. */
const mount = (slug = '') => render(<DemoRoot initialSlug={slug} />)

describe('the guided tour', () => {
  it('has one step per tour screen, each on a real route, in product order', () => {
    const slugs = new Set(ROUTES.map(r => r.slug))
    for (const step of TOUR) expect(slugs.has(step.slug), step.slug).toBe(true)
    expect(TOUR.map(s => s.slug)).toEqual(['', 'connect', 'ready', 'pipelines', 'graph', 'search', 'use-cases', 'governance'])
  })

  it('quotes numbers that agree with the data it talks over', () => {
    const text = TOUR.flatMap(s => [s.claim, ...s.talk, s.tryThis ?? '']).join(' ')
    const ready = USE_CASES.filter(u => u.status === 'ready')
    const readyValue = ready.reduce((sum, u) => sum + u.impactValue, 0)
    expect(text).toContain(`${SOURCES.length} systems`)
    expect(text).toContain(`${ESTATE.score} out of 100`)
    expect(text).toContain(`${allEntries().length === 15 ? 'Fifteen' : allEntries().length} pipelines`)
    expect(text).toContain(`${USE_CASES.length === 14 ? 'Fourteen' : USE_CASES.length} opportunities`)
    expect(text).toContain(`$${(readyValue / 1_000_000).toFixed(1)}M`)
    expect(text).toContain(`${AGENTS.length === 6 ? 'Six' : AGENTS.length} registered agents`)
    expect(ready).toHaveLength(7)
  })

  it('starts closed as a pill, opens to the current step, and Next moves the whole console on', () => {
    mount('')
    expect(screen.queryByRole('complementary', { name: /guided tour/i })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /guided tour/i }))
    const guide = screen.getByRole('complementary', { name: /guided tour/i })
    expect(within(guide).getByText(/step 1 of/i)).toBeDefined()
    expect(within(guide).getByRole('heading', { level: 2, name: TOUR[0].title })).toBeDefined()

    fireEvent.click(within(guide).getByRole('button', { name: TOUR[1].title }))
    // The rail, the breadcrumb and the guide all moved together.
    expect(screen.getByRole('link', { name: /connect/i, current: 'page' })).toBeDefined()
    expect(document.querySelector('.dm-crumb b')?.textContent).toBe('Connect')
    expect(within(screen.getByRole('complementary', { name: /guided tour/i })).getByText(/step 2 of/i)).toBeDefined()
  })

  it('resolves a pipeline workspace to the Pipelines step rather than going blank', () => {
    expect(stepIndexFor('pipelines/structuring-tables')).toBe(-1)
    mount(`pipelines/${allEntries()[0].id}`)
    fireEvent.click(screen.getByRole('button', { name: /guided tour/i }))
    expect(within(screen.getByRole('complementary', { name: /guided tour/i })).getByText(/step 4 of/i)).toBeDefined()
  })

  it('toggles from the topbar too, and closes from its own header', () => {
    mount('')
    fireEvent.click(screen.getByRole('button', { name: /^guide$/i }))
    expect(screen.getByRole('complementary', { name: /guided tour/i })).toBeDefined()
    fireEvent.click(screen.getByRole('button', { name: /close the guide/i }))
    expect(screen.queryByRole('complementary', { name: /guided tour/i })).toBeNull()
  })
})

describe('the command palette', () => {
  it('offers every screen to jump to when nothing is typed', () => {
    mount('')
    fireEvent.focus(screen.getByRole('searchbox'))
    const jumps = screen.getByRole('list', { name: /jump to a screen/i })
    for (const r of ROUTES) expect(within(jumps).getByRole('link', { name: new RegExp(r.title, 'i') })).toBeDefined()
  })

  it('navigates to the highlighted result on Enter and clears itself', () => {
    mount('')
    const input = screen.getByRole('searchbox') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'guidewire' } })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(input.value).toBe('')
    expect(screen.queryByRole('list', { name: /search results/i })).toBeNull()
    expect(document.querySelector('.dm-crumb b')?.textContent).toBe('Connect')
  })

  it('labels every result with what kind of thing it is', () => {
    mount('')
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'claim' } })
    const results = screen.getByRole('list', { name: /search results/i })
    const kinds = within(results).getAllByText(/^(Source|Domain|Entity|Use case|Agent)$/)
    expect(kinds.length).toBeGreaterThan(1)
  })
})

describe('notifications and toasts', () => {
  it('counts the activity that needs a person and opens a popover listing recent activity', () => {
    mount('')
    const bell = screen.getByRole('button', { name: /notifications, 3 need attention/i })
    fireEvent.click(bell)
    const pop = screen.getByRole('dialog', { name: /recent notifications/i })
    expect(within(pop).getAllByRole('listitem').length).toBeGreaterThanOrEqual(5)
    expect(within(pop).getByRole('link', { name: /full activity stream/i }).getAttribute('href')).toContain('governance')
  })

  it('confirms a reset with a toast that can be dismissed', () => {
    mount('')
    fireEvent.click(screen.getByRole('button', { name: /reset demo/i }))
    const toast = screen.getByRole('status')
    expect(toast.textContent).toMatch(/demo reset/i)
    fireEvent.click(within(toast).getByRole('button', { name: /dismiss/i }))
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('confirms a run started from a workspace', () => {
    mount(`pipelines/${allEntries()[0].id}`)
    fireEvent.click(screen.getByRole('button', { name: /^run pipeline$/i }))
    expect(screen.getByRole('status').textContent).toMatch(/started/i)
  })
})

describe('the attention feed', () => {
  const items = attentionItems([], allEntries(), SOURCES)

  it('derives every item from the canon rather than listing it by hand', () => {
    const failed = allEntries().filter(e => items.some(i => i.id === `run-${e.id}`))
    expect(failed.length).toBeGreaterThan(0)
    for (const f of RED_FLAGS.filter(f => f.severity === 'high')) {
      expect(items.some(i => i.id === `flag-${f.id}`), f.id).toBe(true)
    }
    expect(items.find(i => i.id === 'pending')?.title).toContain(String(ESTATE.sourcesPending))
    expect(items.find(i => i.id === 'blocked')?.title).toContain(`${USE_CASES.filter(u => u.status === 'blocked').length} use cases`)
  })

  it('routes each item to the screen that fixes it', () => {
    mount('')
    const feed = screen.getByRole('list', { name: /needs attention/i })
    for (const link of within(feed).getAllByRole('link')) {
      expect(link.getAttribute('href')).toMatch(/\/$/)
    }
  })
})

describe('the opportunity map', () => {
  it('draws one distinct control per use case and opens the same drawer the table does', () => {
    render(<UseCases />)
    const fig = screen.getByRole('img', { name: /opportunity map/i })
    const points = within(fig).getAllByRole('button')
    expect(points).toHaveLength(USE_CASES.length)
    expect(new Set(points.map(p => p.getAttribute('aria-label'))).size).toBe(USE_CASES.length)
    fireEvent.click(points[0])
    expect(screen.getByRole('dialog')).toBeDefined()
  })

  it('reads effort off the fixed display string', () => {
    expect(effortWeeks('6 weeks')).toBe(6)
    expect(effortWeeks('nonsense')).toBe(0)
  })

  it('is pure geometry: the same data draws the same figure twice', () => {
    const a = render(<OpportunityMap useCases={USE_CASES} onSelect={() => {}} />).container.innerHTML
    const b = render(<OpportunityMap useCases={USE_CASES} onSelect={() => {}} />).container.innerHTML
    expect(a).toBe(b)
  })
})

describe('primitives', () => {
  it('ScoreRing exposes the score as a meter with the target marked', () => {
    const { container } = render(<ScoreRing score={71} target={80} delta={6} />)
    const meter = screen.getByRole('meter', { name: /agent-readiness/i })
    expect(meter.getAttribute('aria-valuenow')).toBe('71')
    expect(container.querySelector('.dm-ring-tick')).not.toBeNull()
    expect(screen.getByText(/6 this quarter/)).toBeDefined()
  })

  it('VendorMark is deterministic and two letters long', () => {
    expect(monogram('Guidewire')).toBe('GU')
    expect(monogram('Duck Creek')).toBe('DC')
    expect(hueFor('Snowflake')).toBe(hueFor('snowflake'))
    expect(monogram('Amara Diallo')).toBe('AD')
  })

  it('gives every route an icon that exists', () => {
    for (const r of ROUTES) expect(ICON_NAMES).toContain(ROUTE_ICON[r.slug])
  })
})

describe('Connect summary tiles', () => {
  it('count what the table shows, in words the status pills do not use', () => {
    const { container } = render(<DemoStateProvider><Connect /></DemoStateProvider>)
    expect(screen.getByText('Pending credentials')).toBeDefined()
    expect(container.querySelector('.dm-tile-v')?.textContent).toBe(`${SOURCES.filter(s => s.status === 'connected').length}systems`)
    expect(screen.getAllByText(/awaiting credentials/i)).toHaveLength(ESTATE.sourcesPending)
  })
})

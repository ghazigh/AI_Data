import type { ComponentType } from 'react'
import { Overview } from './screens/Overview'
import { Connect } from './screens/Connect'
import { Ready } from './screens/Ready'
import { Pipelines } from './screens/Pipelines'
import { Graph } from './screens/Graph'
import { UseCases } from './screens/UseCases'
import { Governance } from './screens/Governance'
import { PipelineWorkspace } from './components/PipelineWorkspace'
import { allEntries } from './data/pipelineCatalogue'

export interface DemoRoute {
  /** Path segment under /demo/. The Overview screen is the empty string. */
  slug: string
  /** Browser title and TopBar breadcrumb leaf. */
  title: string
  /** Product stage number, set only on the five pipeline stages. */
  stage?: '01' | '02' | '03' | '04' | '05'
  /** Slug of the route this one breadcrumbs under. Set only on workspace routes. */
  parentSlug?: string
  Component: ComponentType
}

export const ROUTES: DemoRoute[] = [
  { slug: '', title: 'Estate overview', Component: Overview },
  { slug: 'connect', title: 'Connect', stage: '01', Component: Connect },
  { slug: 'ready', title: 'Ready', stage: '02', Component: Ready },
  { slug: 'pipelines', title: 'Pipelines', stage: '03', Component: Pipelines },
  { slug: 'graph', title: 'Graph', stage: '04', Component: Graph },
  { slug: 'use-cases', title: 'Use cases', stage: '05', Component: UseCases },
  { slug: 'governance', title: 'Governance & audit', Component: Governance },
]

/**
 * One server-rendered workspace per pipeline, so /demo/pipelines/<id>/ is a real
 * linkable page. Kept out of ROUTES because the rail lists destinations, not
 * every reachable page; stage '03' keeps the stage strip lit while inside one.
 */
export const WORKSPACE_ROUTES: DemoRoute[] = allEntries().map(entry => ({
  slug: `pipelines/${entry.id}`,
  title: entry.name,
  stage: '03',
  parentSlug: 'pipelines',
  Component: () => <PipelineWorkspace entryId={entry.id} />,
}))

export const ALL_ROUTES: DemoRoute[] = [...ROUTES, ...WORKSPACE_ROUTES]

/** Base path the demo is served under, relative to the site root. */
export const DEMO_BASE = '/demo/'

/** Href for a route, as written into markup. Depth-relative, set by the build. */
export const hrefFor = (slug: string, prefix: string): string =>
  slug === '' ? `${prefix}index.html` : `${prefix}${slug}/`

/** Matches a two-segment workspace slug, 'pipelines/<id>'. */
const WORKSPACE_SLUG = /^pipelines\/([a-z0-9-]+)$/

/**
 * Resolves a slug to a route, ALL_ROUTES first. A pipeline created in the
 * current session is never built as a static file — build-demo.mjs only ever
 * sees allEntries(), so it can never appear in ALL_ROUTES — so any
 * `pipelines/<id>` slug ALL_ROUTES doesn't recognise falls back to a
 * synthetic workspace route for that id instead of resolving to nothing.
 * This only supplies the route *shape*; it does not claim the id is real —
 * PipelineWorkspace still looks the id up in session state (via
 * allEntriesWithCreated()) and renders null if nothing matches, exactly as
 * it always has for an unknown catalogue id.
 */
export function routeForSlug(slug: string): DemoRoute | undefined {
  const known = ALL_ROUTES.find(r => r.slug === slug)
  if (known) return known
  const match = WORKSPACE_SLUG.exec(slug)
  if (!match) return undefined
  return {
    slug,
    // Generic — the real name lives only in session state, unreachable from
    // here. PipelineWorkspace corrects document.title once it mounts with the
    // actual entry (see its own effect for why).
    title: 'Pipeline',
    stage: '03',
    parentSlug: 'pipelines',
    Component: () => <PipelineWorkspace entryId={match[1]} />,
  }
}

/**
 * Resolve a browser pathname to a route. Tolerates a missing trailing slash and
 * any deployment prefix (the site is served under /AI_Data/ on GitHub Pages).
 */
export function routeForPath(pathname: string): DemoRoute | undefined {
  const i = pathname.indexOf(DEMO_BASE)
  if (i === -1) return undefined
  const rest = pathname.slice(i + DEMO_BASE.length).replace(/index\.html$/, '')
  const slug = rest.replace(/^\/+|\/+$/g, '')
  return routeForSlug(slug)
}

/** The document title for a route — one place, so the SSR build and the
 * client router (which sets document.title on navigation) can't disagree. */
export const titleFor = (slug: string): string => {
  const route = routeForSlug(slug) ?? ROUTES[0]
  return route.slug === '' ? 'Product demo — Datalith' : `${route.title} — Datalith demo`
}

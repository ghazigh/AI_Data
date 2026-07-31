import type { ComponentType } from 'react'
import { DEMO_BASE, hrefFor, STAGES } from './navigation'
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

/** Screen component per stage slug — the half of a stage route that cannot
 * live in navigation.ts, since importing the screens is what makes this
 * module the top of the import graph rather than a leaf. */
const STAGE_SCREENS: Record<string, ComponentType> = {
  connect: Connect,
  ready: Ready,
  pipelines: Pipelines,
  graph: Graph,
  'use-cases': UseCases,
}

export const ROUTES: DemoRoute[] = [
  { slug: '', title: 'Estate overview', Component: Overview },
  ...STAGES.map(s => ({
    slug: s.slug,
    title: s.title,
    stage: s.stage,
    Component: STAGE_SCREENS[s.slug],
  })),
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

// Both defined in navigation.ts — which imports nothing but React — and
// re-exported here so existing callers are unaffected. A component that only
// needs to build an href must import it from there, not from this module:
// this module imports the screens, so a screen's own subtree importing it
// back closes a cycle and the route table ends up holding undefined.
export { DEMO_BASE, hrefFor }

/** Matches a two-segment workspace slug, 'pipelines/<id>'. */
const WORKSPACE_SLUG = /^pipelines\/([a-z0-9-]+)$/

/** The pipeline id embedded in a two-segment workspace slug ('pipelines/<id>'),
 * or undefined for anything else. Shared by routeForSlug's fallback below and
 * by TopBar, which needs the same id to read a session-created pipeline's
 * real name live from state — the fallback route's own `title` is a generic
 * placeholder (see the comment on it below), not something TopBar can quote. */
export const pipelineIdForSlug = (slug: string): string | undefined => WORKSPACE_SLUG.exec(slug)?.[1]

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
  const id = pipelineIdForSlug(slug)
  if (!id) return undefined
  return {
    slug,
    // Generic — the real name lives only in session state, unreachable from
    // here. PipelineWorkspace corrects document.title once it mounts with the
    // actual entry (see its own effect for why); TopBar corrects the
    // breadcrumb leaf the same way, via pipelineIdForSlug above.
    title: 'Pipeline',
    stage: '03',
    parentSlug: 'pipelines',
    Component: () => <PipelineWorkspace entryId={id} />,
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

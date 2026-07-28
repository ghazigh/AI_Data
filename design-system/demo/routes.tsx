import type { ComponentType } from 'react'
import { Overview } from './screens/Overview'
import { Connect } from './screens/Connect'
import { Ready } from './screens/Ready'

export interface DemoRoute {
  /** Path segment under /demo/. The Overview screen is the empty string. */
  slug: string
  /** Browser title and TopBar breadcrumb leaf. */
  title: string
  /** Product stage number, set only on the five pipeline stages. */
  stage?: '01' | '02' | '03' | '04' | '05'
  Component: ComponentType
}

const Stub = (name: string) => {
  const S = () => <div data-stub={name} />
  S.displayName = `Stub(${name})`
  return S
}

export const ROUTES: DemoRoute[] = [
  { slug: '', title: 'Estate overview', Component: Overview },
  { slug: 'connect', title: 'Connect', stage: '01', Component: Connect },
  { slug: 'ready', title: 'Ready', stage: '02', Component: Ready },
  { slug: 'pipelines', title: 'Pipelines', stage: '03', Component: Stub('Pipelines') },
  { slug: 'graph', title: 'Graph', stage: '04', Component: Stub('Graph') },
  { slug: 'use-cases', title: 'Use cases', stage: '05', Component: Stub('UseCases') },
  { slug: 'governance', title: 'Governance & audit', Component: Stub('Governance') },
]

/** Base path the demo is served under, relative to the site root. */
export const DEMO_BASE = '/demo/'

/** Href for a route, as written into markup. Depth-relative, set by the build. */
export const hrefFor = (slug: string, prefix: string): string =>
  slug === '' ? `${prefix}index.html` : `${prefix}${slug}/`

/**
 * Resolve a browser pathname to a route. Tolerates a missing trailing slash and
 * any deployment prefix (the site is served under /AI_Data/ on GitHub Pages).
 */
export function routeForPath(pathname: string): DemoRoute | undefined {
  const i = pathname.indexOf(DEMO_BASE)
  if (i === -1) return undefined
  const rest = pathname.slice(i + DEMO_BASE.length).replace(/index\.html$/, '')
  const slug = rest.replace(/^\/+|\/+$/g, '')
  return ROUTES.find(r => r.slug === slug)
}

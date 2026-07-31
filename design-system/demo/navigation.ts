import { createContext, useContext } from 'react'

/**
 * Path back to /demo/ from a screen's own directory. Depth-relative, mirroring
 * the depth calculation in scripts/build-demo.mjs so a directly-loaded nested
 * page resolves its assets and links exactly as the server-rendered file did.
 *
 * Here rather than in router.ts because a screen needs it to build its own
 * links, and router.ts imports the route table — which imports the screens.
 * A screen importing it from there closes that cycle, and whichever module is
 * mid-initialisation hands out `undefined` for its exports.
 */
export const prefixForSlug = (slug: string): string =>
  slug === '' ? '' : '../'.repeat(slug.split('/').length)

/** Base path the demo is served under, relative to the site root. */
export const DEMO_BASE = '/demo/'

/**
 * Href for a route, as written into markup. Depth-relative, set by the build.
 *
 * Here for the same reason as prefixForSlug: a component that renders links —
 * PipelineTable, Rail, StageStrip — needs it, and importing it from the route
 * table closes the cycle routes → screens → components → routes.
 */
export const hrefFor = (slug: string, prefix: string): string =>
  slug === '' ? `${prefix}index.html` : `${prefix}${slug}/`

/**
 * How a screen reaches the app's navigation without threading a callback down
 * every layer between it and whatever owns the active slug.
 *
 * This lives in its own module, importing nothing but React, on purpose: the
 * route table imports the screens, and a screen that needs to navigate imports
 * this. Were the context declared in router.ts — which imports the route table
 * — that would close a cycle (routes → screens → router → routes), and
 * whichever module happened to be mid-initialisation would hand out
 * `undefined` for its exports.
 *
 * DemoRoot is the only provider. Anything rendered outside it — a component
 * test that does not care about navigation — gets the no-op default, which is
 * the right behaviour for a screen nothing navigates away from.
 */
export const NavigateContext = createContext<(slug: string) => void>(() => {})

export const useNavigate = (): ((slug: string) => void) => useContext(NavigateContext)

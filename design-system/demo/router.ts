import type { DemoRoute } from './routes'
import { ROUTES, DEMO_BASE, hrefFor, routeForPath, routeForSlug, titleFor } from './routes'
import { prefixForSlug } from './navigation'

// Re-exported so callers that already reach for it here keep working. It is
// defined in navigation.ts, which imports nothing but React, because a screen
// needs it to build its own links and this module imports the route table —
// which imports the screens. See navigation.ts for the cycle that causes.
export { prefixForSlug }

/**
 * Pushes state (only when the URL actually changes), tells the app which slug
 * is current, and fixes up the document title and focus — the whole
 * side-effect bundle any navigation needs, in one place, so a click and a
 * programmatic navigate() call (below) can never drift apart into two
 * slightly different ideas of what "go to this screen" does.
 */
function commitNavigation(route: DemoRoute, pathname: string, onNavigate: (slug: string) => void): void {
  if (pathname !== window.location.pathname) {
    window.history.pushState({ slug: route.slug }, '', pathname)
  }
  onNavigate(route.slug)
  document.title = titleFor(route.slug)
  document.getElementById('dm-content')?.focus?.()
}

/**
 * Intercept clicks on links marked data-demo-link and navigate without a reload.
 * Returns a teardown function. Modified clicks and unknown targets fall through
 * to the browser, so every link keeps working if this never runs.
 */
export function installRouter(onNavigate: (slug: string) => void): () => void {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const link = (e.target as Element | null)?.closest?.('a[data-demo-link]') as HTMLAnchorElement | null
    if (!link) return
    const url = new URL(link.href, window.location.href)
    if (url.origin !== window.location.origin) return
    const route = routeForPath(url.pathname)
    if (!route) return
    e.preventDefault()
    commitNavigation(route, url.pathname, onNavigate)
  }

  const onPop = () => {
    const route = routeForPath(window.location.pathname)
    if (!route) return
    onNavigate(route.slug)
    document.title = titleFor(route.slug)
  }

  document.addEventListener('click', onClick)
  window.addEventListener('popstate', onPop)
  return () => {
    document.removeEventListener('click', onClick)
    window.removeEventListener('popstate', onPop)
  }
}

/**
 * Navigates to `slug` with exactly the side effects a click on a
 * data-demo-link anchor for it would have — pushState, then onNavigate(slug),
 * which is what makes AppShell (and TopBar's breadcrumb inside it) repaint
 * for the new route, plus the title/focus updates. For a screen that has to
 * swap itself for another screen from inside an event handler — Create
 * pipeline landing on the new workspace being the motivating case — rather
 * than wait for the operator to click a real link. Swapping the rendered
 * component in place without going through this (as screens/Pipelines.tsx
 * used to) leaves AppShell's `current` slug unchanged, so the rail and the
 * breadcrumb keep naming the *previous* screen while the content pane shows
 * the new one — the exact chrome-says-one-thing-content-says-another
 * contradiction the integrity guards exist to catch. Does nothing for a slug
 * routeForSlug can't resolve, matching every other navigation path here.
 */
export function navigateTo(slug: string, onNavigate: (slug: string) => void): void {
  const route = routeForSlug(slug)
  if (!route) return
  commitNavigation(route, hrefFor(route.slug, DEMO_BASE), onNavigate)
}

export { ROUTES }

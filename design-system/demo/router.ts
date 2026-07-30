import { ROUTES, routeForPath, titleFor } from './routes'

/** Path back to /demo/ from a screen's own directory. Depth-relative, mirroring
 * the depth calculation in scripts/build-demo.mjs so a directly-loaded nested
 * route (e.g. a two-segment workspace slug) hydrates with the same prefix the
 * server rendered. */
export const prefixForSlug = (slug: string): string =>
  slug === '' ? '' : '../'.repeat(slug.split('/').length)

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
    if (url.pathname !== window.location.pathname) {
      window.history.pushState({ slug: route.slug }, '', url.pathname)
    }
    onNavigate(route.slug)
    document.title = titleFor(route.slug)
    document.getElementById('dm-content')?.focus?.()
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

export { ROUTES }

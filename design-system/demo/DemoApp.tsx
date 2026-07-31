import { AppShell } from './components/AppShell'
import { DemoStateProvider } from './state'
import { NavigateContext } from './navigation'
import { ROUTES, ALL_ROUTES, routeForSlug } from './routes'

// The build script imports both from this one bundle entry.
export { ROUTES, ALL_ROUTES, titleFor } from './routes'

export interface DemoAppProps { slug: string; prefix: string; onNavigate?: (slug: string) => void }

/** The whole demo for one screen. SSR and the client render exactly this.
 * routeForSlug(), not a raw ALL_ROUTES lookup, so a session-created pipeline's
 * slug (never in ALL_ROUTES — see routes.ts) still resolves once the client
 * router navigates to it. */
export function DemoApp({ slug, prefix, onNavigate }: DemoAppProps) {
  const route = routeForSlug(slug) ?? ROUTES[0]
  const { Component } = route
  // The provider wraps everything so a screen that has to send itself somewhere
  // — Create pipeline landing on the new workspace — goes through the same
  // navigation the router performs, which is what repaints AppShell and the
  // breadcrumb inside it. Server-side there is nothing to navigate to yet, so
  // onNavigate is absent and the context default (a no-op) applies; the
  // provider renders no markup either way, so SSR and hydration still match.
  const navigate = onNavigate ?? NOOP_NAVIGATE
  return (
    <DemoStateProvider>
      <NavigateContext.Provider value={navigate}>
        <AppShell current={route.slug} prefix={prefix}>
          <Component />
        </AppShell>
      </NavigateContext.Provider>
    </DemoStateProvider>
  )
}

/** Module-level so the provider's value is referentially stable across renders
 * when no callback is passed — an inline `() => {}` would be a new value every
 * render and re-render every consumer for nothing. */
const NOOP_NAVIGATE = (_slug: string): void => {}

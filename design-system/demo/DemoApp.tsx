import { AppShell } from './components/AppShell'
import { DemoStateProvider } from './state'
import { ROUTES, ALL_ROUTES, routeForSlug } from './routes'

// The build script imports both from this one bundle entry.
export { ROUTES, ALL_ROUTES, titleFor } from './routes'

export interface DemoAppProps { slug: string; prefix: string }

/** The whole demo for one screen. SSR and the client render exactly this.
 * routeForSlug(), not a raw ALL_ROUTES lookup, so a session-created pipeline's
 * slug (never in ALL_ROUTES — see routes.ts) still resolves once the client
 * router navigates to it. */
export function DemoApp({ slug, prefix }: DemoAppProps) {
  const route = routeForSlug(slug) ?? ROUTES[0]
  const { Component } = route
  return (
    <DemoStateProvider>
      <AppShell current={route.slug} prefix={prefix}>
        <Component />
      </AppShell>
    </DemoStateProvider>
  )
}

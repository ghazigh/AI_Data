import { AppShell } from './components/AppShell'
import { DemoStateProvider } from './state'
import { ROUTES } from './routes'

// The build script imports both from this one bundle entry.
export { ROUTES, titleFor } from './routes'

export interface DemoAppProps { slug: string; prefix: string }

/** The whole demo for one screen. SSR and the client render exactly this. */
export function DemoApp({ slug, prefix }: DemoAppProps) {
  const route = ROUTES.find(r => r.slug === slug) ?? ROUTES[0]
  const { Component } = route
  return (
    <DemoStateProvider>
      <AppShell current={route.slug} prefix={prefix}>
        <Component />
      </AppShell>
    </DemoStateProvider>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { DemoApp } from './DemoApp'
import { installRouter, navigateTo, prefixForSlug } from './router'

/**
 * The demo as the browser runs it: owns the active slug, installs the click
 * router, and supplies the navigate callback screens use to send themselves
 * somewhere. client.tsx hydrates this, and a test that needs navigation to
 * actually happen renders this rather than assembling its own harness — so
 * what the test exercises is the composition that ships.
 *
 * Separate from DemoApp.tsx because that module is also the server-render
 * entry, imported by scripts/build-demo.mjs. Keeping the router out of it
 * keeps the SSR bundle free of the browser-only half of navigation.
 */
export function DemoRoot({ initialSlug }: { initialSlug: string }) {
  const [slug, setSlug] = useState(initialSlug)
  useEffect(() => installRouter(setSlug), [])
  const navigate = useCallback((next: string) => navigateTo(next, setSlug), [])
  return <DemoApp slug={slug} prefix={prefixForSlug(slug)} onNavigate={navigate} />
}

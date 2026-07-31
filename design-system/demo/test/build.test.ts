// @vitest-environment node
//
// This file only touches the filesystem, but it must opt out of the suite's
// default jsdom environment: under jsdom, Vite treats `new URL(relative,
// import.meta.url)` as a browser asset reference and rewrites it to an
// `/@fs/...` path with no trailing slash, which silently breaks existsSync()
// below (both before and after the build — the tests would look like they
// stayed skipped forever). Under the plain 'node' environment Vite leaves
// import.meta.url alone, and the URL resolves to a real filesystem path.
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { ALL_ROUTES } from '../routes'
import { allEntries } from '../data/pipelineCatalogue'

const OUT = new URL('../../../website/demo/', import.meta.url).pathname
const built = existsSync(`${OUT}index.html`)

// website/404.html is scripts/build-site.mjs's own output (site root, not
// demo/), generated whether or not the demo build has run — checked
// independently of `built` above.
const SITE_OUT = new URL('../../../website/', import.meta.url).pathname
const siteBuilt = existsSync(`${SITE_OUT}404.html`)

describe.skipIf(!built)('build output', () => {
  it('writes one html file per route', () => {
    for (const r of ALL_ROUTES) {
      const file = r.slug === '' ? `${OUT}index.html` : `${OUT}${r.slug}/index.html`
      expect(existsSync(file), file).toBe(true)
    }
  })

  it('server-renders real content, not an empty root', () => {
    const html = readFileSync(`${OUT}index.html`, 'utf8')
    expect(html).toContain('Meridian Assurance')
    expect(html).toContain('dm-rail')
  })

  it('uses depth-relative asset paths on nested screens', () => {
    const html = readFileSync(`${OUT}graph/index.html`, 'utf8')
    expect(html).toContain('../assets/demo.css')
    expect(html).not.toContain('"/demo/')
  })

  it('keeps inner screens out of the index', () => {
    const html = readFileSync(`${OUT}graph/index.html`, 'utf8')
    expect(html).toContain('name="robots" content="noindex"')
  })

  it('resolves workspace assets two levels up', () => {
    const entry = allEntries()[0]
    const html = readFileSync(`${OUT}pipelines/${entry.id}/index.html`, 'utf8')
    expect(html).toContain('href="../../assets/demo.css"')
    expect(html).toContain('src="../../assets/demo.js"')
  })

  it('emits the client bundle and stylesheet', () => {
    expect(existsSync(`${OUT}assets/demo.js`)).toBe(true)
    expect(existsSync(`${OUT}assets/demo.css`)).toBe(true)
  })

  // A component-level test can only ever check the href string a screen
  // emits, not whether that string actually lands on a file the build wrote —
  // exactly the class of bug that got through when the Pipelines list once
  // hardcoded prefix="" (see screens/Pipelines.tsx): the href looked
  // plausible in isolation but resolved to website/demo/pipelines/pipelines/
  // <id>/, a path nothing ever writes. This resolves every workspace href
  // the built page actually emits, the same way a browser would, and checks
  // the file it lands on exists.
  it('links every pipeline row to a workspace file the build actually wrote', () => {
    const html = readFileSync(`${OUT}pipelines/index.html`, 'utf8')
    const hrefs = [...html.matchAll(/href="([^"]*pipelines\/[a-z0-9-]+\/)"/g)].map(m => m[1])
    expect(hrefs.length).toBe(allEntries().length)

    for (const href of hrefs) {
      const resolved = new URL(href, 'https://example.invalid/demo/pipelines/').pathname
      expect(resolved.startsWith('/demo/'), href).toBe(true)
      const file = `${OUT}${resolved.slice('/demo/'.length)}index.html`
      expect(existsSync(file), `${href} -> ${file}`).toBe(true)
    }
  })
})

describe.skipIf(!siteBuilt)('the 404 page', () => {
  // A pipeline created in a demo session exists only in that browser's state
  // (demo/state.tsx's createdPipelines), so a hard refresh on its
  // /demo/pipelines/<id>/ URL is a path the build never wrote a file for —
  // GitHub Pages serves this 404 page for it. Without the redirect script this
  // asserts, that operator would land on a plain not-found page for a
  // pipeline that, from their point of view, genuinely exists. This guards
  // scripts/build-site.mjs (which owns 404.html — the site's own copy, OG
  // tags and canonical URL) against a future edit silently dropping the
  // script build-site.mjs is supposed to inline into it.
  it('redirects a /demo/pipelines/ path back to the pipelines list', () => {
    const html = readFileSync(`${SITE_OUT}404.html`, 'utf8')
    expect(html).toContain('/demo/pipelines/')
    expect(html).toMatch(/location\.replace/)
  })

  it('keeps the site\'s own not-found copy, unrelated to the redirect', () => {
    const html = readFileSync(`${SITE_OUT}404.html`, 'utf8')
    expect(html).toContain('isn')
    expect(html).toContain('graph')
  })
})

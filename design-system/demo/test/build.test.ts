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
import { ROUTES } from '../routes'

const OUT = new URL('../../../website/demo/', import.meta.url).pathname
const built = existsSync(`${OUT}index.html`)

describe.skipIf(!built)('build output', () => {
  it('writes one html file per route', () => {
    for (const r of ROUTES) {
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

  it('emits the client bundle and stylesheet', () => {
    expect(existsSync(`${OUT}assets/demo.js`)).toBe(true)
    expect(existsSync(`${OUT}assets/demo.css`)).toBe(true)
  })
})

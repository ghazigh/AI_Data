import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { render } from '@testing-library/react'
import { DemoApp } from '../DemoApp'
import { ALL_ROUTES } from '../routes'
import { prefixForSlug } from '../router'

describe('prefixForSlug', () => {
  it('is empty at the root and one level up when nested', () => {
    expect(prefixForSlug('')).toBe('')
    expect(prefixForSlug('graph')).toBe('../')
  })
})

// Inline `style` attributes hit a second serializer asymmetry, distinct from the
// void-element one below: react-dom/server writes the style attribute as a raw
// string ("left:71%"), which jsdom echoes back verbatim when it's parsed from
// markup. The client renderer instead sets each property through the live
// CSSStyleDeclaration, which jsdom always re-serializes in canonical form
// ("left: 71%;"). Same computed style, two different serializers — not a real
// hydration hazard — so canonicalize every style attribute the same way on both
// sides before comparing.
const normalizeStyleAttrs = (html: string): string =>
  html.replace(/ style="([^"]*)"/g, (_match, decls: string) => {
    const canonical = decls
      .split(';')
      .map(d => d.trim())
      .filter(Boolean)
      .map(d => {
        const i = d.indexOf(':')
        return `${d.slice(0, i).trim()}: ${d.slice(i + 1).trim()};`
      })
      .join(' ')
    return ` style="${canonical}"`
  })

// A third serializer asymmetry: react-dom/server inserts an empty `<!-- -->`
// comment between two adjacent text-like JSX children (e.g. `<b>{x}</b> {y}`) to
// mark the node boundary for hydration. A fresh client mount never produces that
// comment, so it appears only on the server side. An *empty* comment carries no
// text, no attribute and no element content — it cannot encode a clock, a random
// value or a measured layout — so stripping exactly `<!-- -->` costs nothing in
// strictness. A comment with any content inside is left untouched and still
// compared, since that could carry a real divergence.
const stripEmptyComments = (html: string): string => html.split('<!-- -->').join('')

describe('SSR and client agree', () => {
  for (const route of ALL_ROUTES) {
    it(`renders identical markup for "${route.slug || 'index'}"`, () => {
      const prefix = prefixForSlug(route.slug)
      const server = renderToString(<DemoApp slug={route.slug} prefix={prefix} />)
      // renderToString self-closes void elements (e.g. <input/>) while every DOM's
      // .innerHTML getter never does, per the WHATWG serialization algorithm. That
      // asymmetry is a formatting artifact of two different serializers, not a real
      // hydration hazard, so round-trip the server string through the DOM once to put
      // both sides through the same serializer before the byte-identical comparison.
      const normalized = document.createElement('div')
      normalized.innerHTML = server
      const { container } = render(<DemoApp slug={route.slug} prefix={prefix} />)
      const clean = (html: string) => stripEmptyComments(normalizeStyleAttrs(html))
      expect(clean(container.innerHTML)).toBe(clean(normalized.innerHTML))
    })
  }
})

// A fourth, deliberately *not* normalized here: React's useId(). This guard compares
// a renderToString() output against a separate fresh mount, not a real hydrateRoot()
// — production hydration reconciles server and client ids onto the same DOM, but two
// independent render passes each get their own id-counter salt (":R0:" server vs
// ":r0:" client), so useId legitimately differs across this specific harness even
// though it never would in the browser. That's why `Panel` no longer uses it: the id
// was purely decorative (aria-labelledby duplicating the title text), so it was
// replaced with aria-label={title} — same accessible name, no id to diverge. Where an
// id is load-bearing instead — e.g. `src/components/Input.tsx`'s useId() links a
// <label htmlFor> to its <input>, and deleting that association would break
// click-the-label-to-focus — do not repeat the Panel fix. Normalize the id in the
// test (the same way style attributes are canonicalized above) rather than removing
// the label/control association.

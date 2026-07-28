import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { render } from '@testing-library/react'
import { DemoApp } from '../DemoApp'
import { ROUTES } from '../routes'
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

describe('SSR and client agree', () => {
  for (const route of ROUTES) {
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
      expect(normalizeStyleAttrs(container.innerHTML)).toBe(normalizeStyleAttrs(normalized.innerHTML))
    })
  }
})

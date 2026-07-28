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
      expect(container.innerHTML).toBe(normalized.innerHTML)
    })
  }
})

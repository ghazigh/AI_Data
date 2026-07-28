import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { DemoApp } from '../DemoApp'
import { installRouter, prefixForSlug } from '../router'

describe('installRouter', () => {
  let teardown: (() => void) | undefined

  afterEach(() => {
    teardown?.()
    teardown = undefined
  })

  const setup = () => {
    window.history.pushState({}, '', '/demo/')
    const result = render(<DemoApp slug="" prefix={prefixForSlug('')} />)
    teardown = installRouter(() => {})
    return result
  }

  it('moves focus to the main content region after a client-side navigation', () => {
    setup()
    const nav = screen.getByRole('navigation', { name: 'Demo screens' })
    fireEvent.click(within(nav).getByRole('link', { name: /^connect$/i }), { button: 0 })
    expect(document.activeElement).toBe(document.getElementById('dm-content'))
  })

  it('sets the document title from the destination route', () => {
    setup()
    const nav = screen.getByRole('navigation', { name: 'Demo screens' })
    fireEvent.click(within(nav).getByRole('link', { name: /^connect$/i }), { button: 0 })
    expect(document.title).toBe('Connect — Datalith demo')
  })

  it('sets the root title when navigating back to the overview', () => {
    window.history.pushState({}, '', '/demo/connect/')
    render(<DemoApp slug="connect" prefix={prefixForSlug('connect')} />)
    teardown = installRouter(() => {})
    const nav = screen.getByRole('navigation', { name: 'Demo screens' })
    fireEvent.click(within(nav).getByRole('link', { name: /^estate overview$/i }), { button: 0 })
    expect(document.title).toBe('Product demo — Datalith')
  })
})

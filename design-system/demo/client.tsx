import { hydrateRoot } from 'react-dom/client'
import { createElement, useEffect, useState } from 'react'
import { DemoApp } from './DemoApp'
import { installRouter, prefixForSlug } from './router'

function Client({ initialSlug }: { initialSlug: string }) {
  const [slug, setSlug] = useState(initialSlug)
  useEffect(() => installRouter(setSlug), [])
  return createElement(DemoApp, { slug, prefix: prefixForSlug(slug) })
}

const root = document.getElementById('dm-app')
if (root) hydrateRoot(root, createElement(Client, { initialSlug: root.dataset.slug ?? '' }))

import { hydrateRoot } from 'react-dom/client'
import { createElement } from 'react'
import { DemoRoot } from './DemoRoot'

// DemoRoot owns the slug, the router and the navigate callback — see its
// comment in DemoApp.tsx. Keeping that composition there rather than here is
// what lets a test drive real navigation through the same code that ships.
const root = document.getElementById('dm-app')
if (root) hydrateRoot(root, createElement(DemoRoot, { initialSlug: root.dataset.slug ?? '' }))

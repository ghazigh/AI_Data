import { Logo, Button } from '../../src/index'

export interface SiteNavProps {
  /** Slug of the current page, e.g. "platform" — used for aria-current styling. */
  current?: string
}

const LINKS = [
  { slug: 'platform', label: 'Platform', href: './platform.html' },
  { slug: 'demo', label: 'Demo', href: './demo/' },
  { slug: 'pricing', label: 'Pricing', href: './pricing.html' },
  { slug: 'company', label: 'Company', href: './company.html' },
  { slug: 'investors', label: 'Investors', href: './investors.html' },
]

/** Site-wide navigation: DS navbar plus scroll state and a mobile drawer (wired by site.js). */
export function SiteNav({ current }: SiteNavProps) {
  return (
    <header className="dl-navbar st-nav" data-nav>
      <div className="dl-wrap dl-navbar-in">
        <a href="./index.html" aria-label="Datalith home"><Logo /></a>
        <nav aria-label="Primary">
          <ul className="dl-navbar-links">
            {LINKS.map(l => (
              <li key={l.slug}>
                <a href={l.href} aria-current={current === l.slug ? 'page' : undefined}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="st-nav-cta"><Button variant="blue" size="sm" href="./index.html#audit">Run the 48h audit</Button></span>
        <button className="st-burger" type="button" data-nav-toggle aria-label="Open menu" aria-expanded="false" aria-controls="st-drawer">
          <span /><span />
        </button>
      </div>
      <div className="st-drawer" id="st-drawer" data-nav-drawer>
        <ul>
          {LINKS.map(l => (
            <li key={l.slug}>
              <a href={l.href} aria-current={current === l.slug ? 'page' : undefined}>{l.label}</a>
            </li>
          ))}
        </ul>
        <Button variant="blue" size="md" href="./index.html#audit">Run the 48h audit</Button>
      </div>
    </header>
  )
}

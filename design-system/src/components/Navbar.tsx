import { Logo } from './Logo'
import { Button } from './Button'
import type { CtaSpec } from './Hero'

export interface NavbarProps {
  links?: { label: string; href: string }[]
  cta?: CtaSpec
}

/** Top navigation: wordmark, quiet links, one CTA. Hairline bottom rule. */
export function Navbar({
  links = [
    { label: 'Platform', href: '#platform' },
    { label: 'Method', href: '#method' },
    { label: 'Pricing', href: '#pricing' },
  ],
  cta = { label: 'Run the 48h audit', href: '#audit' },
}: NavbarProps) {
  return (
    <nav className="dl-navbar">
      <div className="dl-wrap dl-navbar-in">
        <a href="#top" aria-label="Datalith home"><Logo /></a>
        <ul className="dl-navbar-links">
          {links.map(l => (<li key={l.href}><a href={l.href}>{l.label}</a></li>))}
        </ul>
        {cta && <Button variant="blue" size="sm" href={cta.href}>{cta.label}</Button>}
      </div>
    </nav>
  )
}

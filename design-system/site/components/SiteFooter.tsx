import { Footer } from '../../src/index'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: './platform.html' },
      { label: 'Pricing', href: './pricing.html' },
      { label: 'The 48h audit', href: './index.html#audit' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: './company.html' },
      { label: 'Investors', href: './investors.html' },
      { label: 'Contact', href: 'mailto:hello@datalith.ai' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Pitch deck', href: './deck/Datalith-Pitch-Deck.pptx' },
      { label: 'How it works', href: './index.html#how' },
      { label: 'Security', href: './platform.html#security' },
    ],
  },
]

/** Site-wide footer with real page links. */
export function SiteFooter() {
  return <Footer columns={COLUMNS} note="© 2026 Datalith. Every source. One graph. Agent-ready." />
}

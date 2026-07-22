import { Button } from './Button'
import { SectionLabel } from './SectionLabel'
import type { CtaSpec } from './Hero'

export interface Tier {
  name: string
  price: string
  period?: string
  blurb: string
  features: string[]
  cta: CtaSpec
  /** Exactly one tier should be featured — it gets the blue treatment. */
  featured?: boolean
}

export interface PricingTableProps {
  label?: string
  title?: string
  tiers?: Tier[]
}

const DEFAULT_TIERS: Tier[] = [
  { name: 'Audit', price: 'Free', blurb: '48-hour Agent-Readiness Audit. Read-only credentials in, board-ready score out.', features: ['Estate map', 'ARS 0–100', 'Top-10 findings'], cta: { label: 'Run the audit', href: '#audit' } },
  { name: 'Growth', price: '$2.5K', period: '/mo', blurb: 'The graph, live. For teams making their first agents work.', features: ['Knowledge graph', 'Semantic layer', 'MCP gateway', 'Standard audit trail'], cta: { label: 'Start Growth', href: '#growth' }, featured: true },
  { name: 'Scale', price: '$6K', period: '/mo', blurb: 'Full governance for agent fleets in production.', features: ['Everything in Growth', 'Per-agent identity', 'Workflow recommendations', 'Priority support'], cta: { label: 'Start Scale', href: '#scale' } },
  { name: 'Enterprise', price: 'Custom', blurb: '$100K+ ACV. The whole estate, every guarantee.', features: ['Everything in Scale', 'On-prem connectors', 'Security review', 'Dedicated team'], cta: { label: 'Talk to us', href: '#contact' } },
]

/** Hairline pricing grid; one featured tier carries the blue. */
export function PricingTable({ label = 'Pricing', title = 'Land with the audit. Expand with the graph.', tiers = DEFAULT_TIERS }: PricingTableProps) {
  return (
    <section className="dl-pricing">
      <div className="dl-wrap">
        <SectionLabel>{label}</SectionLabel>
        {title && <h2 className="dl-h2">{title}</h2>}
        <div className="dl-pricing-grid">
          {tiers.map(t => (
            <div className={`dl-pricing-tier${t.featured ? ' dl-pricing-tier--featured' : ''}`} key={t.name}>
              <span className="dl-pricing-name">{t.name}</span>
              <div className="dl-pricing-price">{t.price}{t.period && <span className="dl-pricing-period">{t.period}</span>}</div>
              <p className="dl-pricing-blurb">{t.blurb}</p>
              <ul className="dl-pricing-features">
                {t.features.map(f => (<li key={f}>{f}</li>))}
              </ul>
              <Button variant={t.featured ? 'blue' : 'ghost'} href={t.cta.href}>{t.cta.label}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

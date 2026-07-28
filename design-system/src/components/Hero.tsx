import type { ReactNode } from 'react'
import { Button } from './Button'
import { TextLink } from './TextLink'
import { ConfluenceFigure } from './ConfluenceFigure'

/** A call-to-action target shared by Hero, Navbar, CTABand. */
export interface CtaSpec { label: string; href: string }

export interface HeroProps {
  /** Main display headline. Line breaks: pass "\n" to break lines. */
  headline?: string
  /** Final phrase rendered as the single blue accent. */
  accent?: string
  lead?: string
  primaryCta?: CtaSpec
  secondaryCta?: CtaSpec
  /** Optional third action, rendered as a ghost button beside the primary. */
  tertiaryCta?: CtaSpec
  /** Right column; defaults to the ConfluenceFigure. Pass null to omit. */
  figure?: ReactNode
  /** Small mono note under the CTA row, e.g. trial or pricing terms. */
  note?: string
}

/** Landing hero: display type left, the confluence artwork right. */
export function Hero({
  headline = 'Every source.\nOne graph.',
  accent = 'Agent-ready.',
  lead = 'Datalith draws every database, warehouse, wiki and inbox into a single governed knowledge graph — then serves it to any agent, audited end to end.',
  primaryCta = { label: 'Begin the audit', href: '#audit' },
  secondaryCta = { label: 'the method', href: '#method' },
  tertiaryCta,
  figure = <ConfluenceFigure />,
  note,
}: HeroProps) {
  const lines = headline.split('\n')
  return (
    <section className="dl-hero">
      <div className="dl-wrap dl-hero-grid">
        <div>
          <h1 className="dl-hero-headline">
            {lines.map((l, i) => (<span key={i}>{l}<br /></span>))}
            {accent && <em>{accent}</em>}
          </h1>
          {lead && <p className="dl-hero-lead">{lead}</p>}
          <div className="dl-hero-ctas">
            {primaryCta && <Button variant="ink" size="lg" href={primaryCta.href}>{primaryCta.label}</Button>}
            {tertiaryCta && <Button variant="ghost" size="lg" href={tertiaryCta.href}>{tertiaryCta.label}</Button>}
            {secondaryCta && <TextLink href={secondaryCta.href}>{secondaryCta.label}</TextLink>}
          </div>
          {note && <p className="dl-hero-note">{note}</p>}
        </div>
        {figure && <div className="dl-hero-figure">{figure}</div>}
      </div>
    </section>
  )
}

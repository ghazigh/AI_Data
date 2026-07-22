import { Button } from './Button'
import { ConfluenceFigure } from './ConfluenceFigure'
import type { CtaSpec } from './Hero'

export interface CTABandProps {
  headline?: string
  lead?: string
  primaryCta?: CtaSpec
  secondaryCta?: CtaSpec
  /** Show the inverted confluence figure behind the copy (default true). */
  withFigure?: boolean
}

/** Full-width ink closing section. The blue CTA is the last word on the page. */
export function CTABand({
  headline = 'See what your data is capable of.',
  lead = 'Read-only credentials in. Board-ready Agent-Readiness Score out. 48 hours.',
  primaryCta = { label: 'Run the 48h audit', href: '#audit' },
  secondaryCta = { label: 'Talk to us', href: '#contact' },
  withFigure = true,
}: CTABandProps) {
  return (
    <section className="dl-ctaband dl-on-ink">
      <div className="dl-wrap dl-ctaband-in">
        <div className="dl-ctaband-copy">
          <h2 className="dl-ctaband-headline">{headline}</h2>
          {lead && <p className="dl-ctaband-lead">{lead}</p>}
          <div className="dl-ctaband-ctas">
            {primaryCta && <Button variant="blue" size="lg" href={primaryCta.href}>{primaryCta.label}</Button>}
            {secondaryCta && <Button variant="ghost" size="lg" href={secondaryCta.href}>{secondaryCta.label}</Button>}
          </div>
        </div>
        {withFigure && (
          <div className="dl-ctaband-figure">
            <ConfluenceFigure onInk sources={['databases', 'warehouses', 'documents', 'apps', 'streams']} mergedLabel="AGENT-READY" height={240} />
          </div>
        )}
      </div>
    </section>
  )
}

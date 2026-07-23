import {
  Navbar, Hero, LogoStrip, StatBand, FeatureGrid, Steps, Quote,
  PricingTable, FAQ, CTABand, Footer, SectionLabel, ScoreMeter, ConfluenceFigure,
} from '../src/index'

/** The Datalith landing page, composed entirely from @datalith/ui. */
export function LandingPage() {
  return (
    <div className="dl-root">
      <Navbar
        links={[
          { label: 'Platform', href: '#platform' },
          { label: 'Method', href: '#method' },
          { label: 'The score', href: '#score' },
          { label: 'Pricing', href: '#pricing' },
        ]}
        cta={{ label: 'Run the 48h audit', href: '#audit' }}
      />
      <Hero />
      <LogoStrip />
      <StatBand />
      <div id="platform"><FeatureGrid /></div>
      <div id="method"><Steps /></div>
      <section id="score" style={{ padding: 'var(--dl-space-9) 0', borderTop: 'var(--dl-hairline)' }}>
        <div className="dl-wrap">
          <SectionLabel>The score</SectionLabel>
          <h2 className="dl-h2">One number your board understands.</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dl-space-8)', marginTop: 'var(--dl-space-7)', alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px' }}>
              <ScoreMeter value={87} caption="Certified · full audit" />
            </div>
            <div style={{ flex: '1.2 1 340px' }}>
              <ConfluenceFigure
                sources={['databases', 'warehouses', 'documents', 'apps', 'streams']}
                mergedLabel="AGENT-READY"
                height={260}
              />
            </div>
          </div>
        </div>
      </section>
      <Quote
        quote="First we show you what you have. Then we turn it into an agent workforce."
        name="Datalith"
        role="The agentic data center"
      />
      <div id="pricing"><PricingTable /></div>
      <FAQ />
      <div id="audit"><CTABand /></div>
      <Footer />
    </div>
  )
}

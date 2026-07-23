import {
  Hero, StatBand, FeatureGrid, Steps, Quote, FAQ, CTABand,
  SectionLabel, ScoreMeter, ConfluenceFigure, Card, TextLink,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'

const CONNECTORS = [
  'Snowflake', 'Databricks', 'BigQuery', 'Postgres', 'MySQL', 'MongoDB',
  'Salesforce', 'HubSpot', 'Zendesk', 'Jira', 'Notion', 'Slack',
  'SharePoint', 'Google Drive', 'S3', 'Kafka', 'Redshift', 'Kinesis',
]

export function Home() {
  return (
    <div className="dl-root">
      <SiteNav />
      <div className="st-hero-anim">
        <Hero
          headline={'Every source.\nOne graph.'}
          accent="Agent-ready."
          lead="Datalith draws every database, warehouse, wiki and inbox into a single governed knowledge graph — then serves it to any agent, audited end to end."
          primaryCta={{ label: 'Run the 48h audit', href: '#audit' }}
          secondaryCta={{ label: 'see the platform', href: './platform.html' }}
          figure={<ConfluenceFigure animated />}
        />
      </div>

      {/* connector marquee */}
      <section className="dl-logostrip st-marquee" aria-label="Connects to 150+ sources">
        <div className="dl-wrap st-marquee-head">
          <span className="dl-logostrip-title">Connects to 150+ sources</span>
        </div>
        <div className="st-marquee-viewport">
          <ul className="st-marquee-track">
            {[...CONNECTORS, ...CONNECTORS].map((n, i) => (
              <li key={n + i} aria-hidden={i >= CONNECTORS.length || undefined}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <div data-reveal><StatBand /></div>

      {/* the two promises */}
      <section className="st-section" id="promises">
        <div className="dl-wrap">
          <SectionLabel>The two promises</SectionLabel>
          <h2 className="dl-h2">First we show you what you have. Then we turn it into an agent workforce.</h2>
          <div className="st-cols-2" data-reveal-group>
            <Card label="Promise 01" title="See everything.">
              Data everywhere, visibility nowhere — until now. One live dashboard maps the whole
              estate: what exists and where it lives, what is changing or going stale, and who —
              human or agent — can touch what, with a full audit trail.
            </Card>
            <Card label="Promise 02" title="Make it work for agents.">
              Every modality — tables, documents, tickets, transcripts — cleaned, typed, chunked,
              embedded and scored for agent consumption. Then Datalith finds the potential sleeping
              in your data and suggests the agentic workflows to build, ROI attached.
            </Card>
          </div>
        </div>
      </section>

      <div id="platform" data-reveal>
        <FeatureGrid />
        <div className="dl-wrap st-more">
          <TextLink href="./platform.html">explore all six modules</TextLink>
        </div>
      </div>

      <div id="method" data-reveal><Steps /></div>

      {/* the score */}
      <section id="score" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>The score</SectionLabel>
          <h2 className="dl-h2">One number your board understands.</h2>
          <p className="st-lead">
            The Agent-Readiness Score measures how consumable your estate is for AI agents —
            coverage, semantics, governance, freshness — per domain and overall. Free, in 48 hours,
            from read-only credentials.
          </p>
          <div className="st-score-row" data-reveal>
            <div className="st-score-meter" data-scoremeter>
              <ScoreMeter value={87} caption="Certified · full audit" />
            </div>
            <div className="st-score-fig" data-draw>
              <ConfluenceFigure
                sources={['databases', 'warehouses', 'documents', 'apps', 'streams']}
                mergedLabel="AGENT-READY"
                height={260}
              />
            </div>
          </div>
        </div>
      </section>

      <div data-reveal>
        <Quote
          quote="MCP moves context. It doesn't produce it. Datalith is the layer that produces it."
          name="Datalith"
          role="The agentic data center"
        />
      </div>

      <div data-reveal><FAQ /></div>

      <div id="audit">
        <CTABand
          headline="See what your data is capable of."
          lead="Read-only credentials in. Board-ready Agent-Readiness Score out. 48 hours."
          primaryCta={{ label: 'Request the audit', href: 'mailto:hello@datalith.ai?subject=Agent-Readiness%20Audit' }}
          secondaryCta={{ label: 'See pricing', href: './pricing.html' }}
        />
      </div>
      <SiteFooter />
    </div>
  )
}

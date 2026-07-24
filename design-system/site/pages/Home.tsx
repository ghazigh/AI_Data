import {
  Hero, StatBand, FeatureGrid, Steps, Quote, FAQ, CTABand,
  SectionLabel, ScoreMeter, ConfluenceFigure, Card, TextLink,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { HeroFigure } from '../components/HeroFigure'
import { DashboardFigure } from '../components/figures'
import { KnowledgeGraph } from '../components/KnowledgeGraph'
import {
  siSnowflake, siDatabricks, siGooglebigquery, siPostgresql, siMysql,
  siMongodb, siRedis, siClickhouse, siApachekafka, siHubspot, siZendesk,
  siJira, siConfluence, siNotion, siGoogledrive, siElastic, siStripe,
  siAirtable, siDropbox, siSap, type SimpleIcon,
} from 'simple-icons'

/** Marquee roster — icon where a redistributable mark exists, name-only otherwise. */
const CONNECTORS: { name: string; icon?: SimpleIcon }[] = [
  { name: 'Snowflake', icon: siSnowflake },
  { name: 'Databricks', icon: siDatabricks },
  { name: 'BigQuery', icon: siGooglebigquery },
  { name: 'Postgres', icon: siPostgresql },
  { name: 'MySQL', icon: siMysql },
  { name: 'MongoDB', icon: siMongodb },
  { name: 'Redis', icon: siRedis },
  { name: 'ClickHouse', icon: siClickhouse },
  { name: 'Kafka', icon: siApachekafka },
  { name: 'Salesforce' },
  { name: 'HubSpot', icon: siHubspot },
  { name: 'Zendesk', icon: siZendesk },
  { name: 'Jira', icon: siJira },
  { name: 'Confluence', icon: siConfluence },
  { name: 'Notion', icon: siNotion },
  { name: 'Slack' },
  { name: 'Google Drive', icon: siGoogledrive },
  { name: 'SharePoint' },
  { name: 'S3' },
  { name: 'Elastic', icon: siElastic },
  { name: 'Stripe', icon: siStripe },
  { name: 'Airtable', icon: siAirtable },
  { name: 'Dropbox', icon: siDropbox },
  { name: 'SAP', icon: siSap },
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
          figure={<HeroFigure />}
        />
      </div>

      {/* connector marquee */}
      <section className="dl-logostrip st-marquee" aria-label="Connects to 150+ sources">
        <div className="dl-wrap st-marquee-head">
          <span className="dl-logostrip-title">Connects to 150+ sources</span>
        </div>
        <div className="st-marquee-viewport">
          <ul className="st-marquee-track">
            {[...CONNECTORS, ...CONNECTORS].map((c, i) => (
              <li key={c.name + i} aria-hidden={i >= CONNECTORS.length || undefined}>
                {c.icon && (
                  <svg className="st-marquee-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={c.icon.path} />
                  </svg>
                )}
                {c.name}
              </li>
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

      {/* the knowledge graph */}
      <section id="graph" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>The knowledge graph</SectionLabel>
          <h2 className="dl-h2">Every source, wired into one intelligence.</h2>
          <p className="st-lead">
            Datalith doesn&rsquo;t stop at connecting sources — it resolves them into each other.
            One customer, one order, one contract across every system, with lineage on every link.
            That graph is your company&rsquo;s intelligence, and every agent inherits it.
          </p>
          <KnowledgeGraph />
          <div className="st-kg-stats" data-reveal-group>
            <div className="st-kg-stat">
              <span className="st-kg-statvalue"><span data-countup="23">23</span></span>
              <span className="st-kg-statlabel">sources connected</span>
            </div>
            <div className="st-kg-stat">
              <span className="st-kg-statvalue"><span data-countup="4.2" data-decimals="1">4.2</span>M</span>
              <span className="st-kg-statlabel">entities resolved</span>
            </div>
            <div className="st-kg-stat">
              <span className="st-kg-statvalue"><span data-countup="18">18</span>M</span>
              <span className="st-kg-statlabel">relationships, lineage on every link</span>
            </div>
            <TextLink href="./platform.html#graph">how the graph is built</TextLink>
          </div>
        </div>
      </section>

      <section id="platform" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>The platform</SectionLabel>
          <h2 className="dl-h2">Six modules. One monolith.</h2>
          <p className="st-lead">
            The whole agentic data program in one pane — estate map, Agent-Readiness Score, live
            agent activity, and the workflow pipeline with ROI attached.
          </p>
          <DashboardFigure />
        </div>
        <div data-reveal>
          <FeatureGrid label="The modules" title="" />
          <div className="dl-wrap st-more">
            <TextLink href="./platform.html">explore all six modules</TextLink>
          </div>
        </div>
      </section>

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

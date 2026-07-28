import {
  Hero, StatBand, Steps, FAQ, CTABand,
  SectionLabel, ScoreMeter, ConfluenceFigure, TextLink, Stat, Card,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { HeroFigure } from '../components/HeroFigure'
import { DashboardFigure } from '../components/figures'
import { KnowledgeGraph } from '../components/KnowledgeGraph'
import { CapabilityFlow } from '../components/CapabilityFlow'
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
          headline={'Make your enterprise data'}
          accent="usable by AI agents."
          lead="Datalith makes your company Agentic Friendly! One dashboard over every database, warehouse, wiki and app you run — showing what to fix, building the governed knowledge graph your agents read from, and proposing the workflows your data makes possible."
          primaryCta={{ label: 'Get your free readiness score', href: '#audit' }}
          secondaryCta={{ label: 'see how it works', href: '#how' }}
          note="Free 48-hour Agent-Readiness Score. Read-only credentials, no migration."
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

      {/* what the platform provides — the first thing after the hero */}
      <section id="capabilities" className="st-section">
        <div className="dl-wrap">
          <SectionLabel>The agentic platform</SectionLabel>
          <h2 className="dl-h2">What the Datalith platform gives you.</h2>
          <p className="st-lead">
            Five stages, in order. We connect to your systems, score how ready their data is for
            agents, propose the restructuring that estate actually needs, build it into one
            knowledge graph of your business — then tell you which agents that graph makes possible.
          </p>
        </div>
        <CapabilityFlow />
        <div className="dl-wrap st-more">
          <TextLink href="./platform.html">see each stage in depth</TextLink>
        </div>
      </section>

      <section className="st-section st-section--rule" id="problem">
        <div className="dl-wrap">
          <SectionLabel>The problem</SectionLabel>
          <h2 className="dl-h2">Most agent projects stall on the data, not the model.</h2>
          <p className="st-lead">
            Teams buy the model, pick the framework, then spend the next two quarters discovering
            their data isn&rsquo;t in a shape any agent can use.
          </p>
        </div>
        <div data-reveal><StatBand /></div>
      </section>

      <div id="how" data-reveal><Steps /></div>

      <section id="value" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>What it&rsquo;s worth</SectionLabel>
          <h2 className="dl-h2">The cost of data that isn&rsquo;t agent-ready.</h2>
          <div className="st-cols-3" data-reveal-group>
            <Stat
              value="$300–375K"
              label="of a $500K agent program goes to data preparation before a single agent works — 60–75% of project effort."
              source="Published industry benchmarks"
            />
            <Stat
              value=">40%"
              label="of agentic AI projects will be canceled by the end of 2027. Data readiness is the leading cause."
              source="Gartner"
            />
            <Stat
              value="Weeks, not quarters"
              label="to a first governed agent once the graph is live, because the preparation work is already done and scored."
              source="Datalith model"
            />
          </div>
          <p className="st-footnote">
            Illustrative model based on published industry benchmarks, not customer results.
            Datalith is pre-launch; the first design-partner cohort is open.
          </p>
        </div>
      </section>

      {/* the knowledge graph */}
      <section id="graph" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>The knowledge graph</SectionLabel>
          <h2 className="dl-h2">One customer. One record. Across every system.</h2>
          <p className="st-lead">
            Datalith doesn&rsquo;t just connect your sources — it works out which records in one
            system are the same thing as records in another. You can trace every fact back to the
            system it came from, and every agent inherits that map.
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
              <span className="st-kg-statlabel">relationships mapped, each traceable to its source</span>
            </div>
            <TextLink href="./platform.html#graph">how the graph is built</TextLink>
          </div>
          <p className="st-footnote">
            Figures illustrate a representative estate, not a customer deployment. Datalith is
            pre-launch.
          </p>
        </div>
      </section>

      <section id="dashboard" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>The dashboard</SectionLabel>
          <h2 className="dl-h2">Your whole estate in one view.</h2>
          <p className="st-lead">
            What data you have and where it lives, what changed, which agents are using it, and
            what it&rsquo;s costing you — in a view your board can read.
          </p>
          <DashboardFigure />
        </div>
      </section>

      {/* the score */}
      <section id="score" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>The score</SectionLabel>
          <h2 className="dl-h2">One number your board understands.</h2>
          <p className="st-lead">
            The Agent-Readiness Score is a 0–100 measure of how usable your data is for AI agents —
            how much of your estate is covered, how well it&rsquo;s defined, how well it&rsquo;s
            governed, and how fresh it is. Free, in 48 hours, from read-only credentials.
          </p>
          <div className="st-score-row" data-reveal>
            <div className="st-score-meter" data-scoremeter>
              <ScoreMeter value={87} caption="Example score · illustrative" />
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

      <section id="cost" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>What it costs</SectionLabel>
          <h2 className="dl-h2">Start free. Pay when the graph goes live.</h2>
          <div className="st-cols-3" data-reveal-group>
            <Card label="Free" title="Agent-Readiness Score">
              Your score, your estate map and your top-10 findings in 48 hours, across 3 sources.
              No commitment.
            </Card>
            <Card label="$2.5K / month" title="Growth">
              The graph live across 10 sources, with your first agents served through the gateway.
            </Card>
            <Card label="$6K / month → custom" title="Scale and Enterprise">
              Agent fleets in production, full governance, and deployment inside your own VPC.
            </Card>
          </div>
          <div className="st-more">
            <TextLink href="./pricing.html">see full pricing and what&rsquo;s in each plan</TextLink>
          </div>
        </div>
      </section>

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

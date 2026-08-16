import {
  Hero, Steps, FAQ, CTABand,
  SectionLabel, ScoreMeter, ConfluenceFigure, TextLink, Stat, Card,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { HeroFigure } from '../components/HeroFigure'
import { ConsoleFigure } from '../components/ConsoleFigure'
import { StageSection } from '../components/StageSection'
import {
  ConnectFigure, ReadyFigure, PipelineFigure, GraphStageFigure, SearchFigure, UseCaseFigure,
} from '../components/StageFigures'
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
          tertiaryCta={{ label: 'Explore the product', href: './demo/' }}
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

      {/* what the platform provides — one section per stage */}
      <section id="capabilities" className="st-section">
        <div className="dl-wrap">
          <SectionLabel>The agentic platform</SectionLabel>
          <h2 className="dl-h2">What the Datalith platform gives you.</h2>
          <p className="st-lead">
            Six stages, in order — from the systems you already run to the agents your data
            makes possible.
          </p>
        </div>
      </section>

      <StageSection
        id="connect" num="01" name="Connect"
        title="Plugs into every database you run."
        lead="Warehouses, OLTP databases, SaaS apps, object stores, streams — connected with scoped read-only credentials, in an afternoon."
        value="No migration and no engineering project. Nothing is ever written back to your systems."
        figure={<ConnectFigure />}
      />
      <StageSection
        id="ready" num="02" name="Ready" flip
        title="Scores how ready your data is for agents."
        lead="Every source and every business domain gets an Agent-Readiness Score out of 100 — coverage, definitions, governance, freshness — and Datalith keeps watching it after the first pass."
        value="Continuous monitoring, not a one-off audit. You see readiness move as your estate changes."
        note="Console shows an illustrative estate. Datalith is pre-launch; these are not customer figures."
        figure={<ReadyFigure />}
      />
      <StageSection
        id="pipelines" num="03" name="Pipelines"
        title="Runs pipelines that turn any data modality into agent-ready data."
        lead="One pipeline per modality: documents, images, tables, email, tickets, transcripts, streams. Each runs the best extraction stack for its format and lands the same output — typed records, resolved entities, citations back to the source."
        value="Built for your data as it is, not a generic template someone else's estate needed."
        figure={<PipelineFigure />}
      />
      <StageSection
        id="graph" num="04" name="Graph" flip
        title="Builds one map of your whole business."
        lead="Every system resolved into a single knowledge graph, with the topics, domains and pockets of expertise inside it detected and named — so each becomes a knowledge base in its own right."
        value="Knowledge bases any agentic AI can read, whatever framework you build on."
        figure={<GraphStageFigure />}
      />
      <StageSection
        id="search" num="05" name="Search"
        title="A search engine for the data itself."
        lead="Ask whether the company holds anything on a subject and the agent searches your estate rather than your records — every table, document store and stream — and answers with the datasets that carry it: where each one lives, how large, how fresh, who owns it, and how ready it is."
        value="Then attach one as your reference and ask about its contents. Datalith builds the retrieval against that dataset on the fly, anchored to the graph, so the answer stays inside the data you chose."
        note="Illustrative estate and counts. Datalith is pre-launch; these are not customer figures."
        figure={<SearchFigure />}
      />
      <StageSection
        id="usecases" num="06" name="Use cases" flip
        title="Tells you which agents are worth building."
        lead="Datalith reads the graph and proposes the agentic applications your data actually supports — what each one would need, and what it would be worth."
        value="You find out what to build before you spend a quarter building it."
        note="Example workflows and payback figures are modelled, not customer results. Datalith is pre-launch."
        figure={<UseCaseFigure />}
      />

      <div className="dl-wrap st-more">
        <TextLink href="./platform.html">see each stage in depth</TextLink>
      </div>

      <section id="security" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>Security</SectionLabel>
          <h2 className="dl-h2">Enterprise-grade from the first connection.</h2>
          <p className="st-lead">
            Connecting your estate is the part your security team will ask about first. Datalith
            reads, never writes; it inherits the permissions your systems already enforce; and
            every read an agent makes is logged against the person or service that asked.
          </p>
          <div className="st-cols-3" data-reveal-group>
            <Card label="Access" title="Read-only and least-privilege">
              Every connector runs on scoped, read-only credentials you issue and can revoke in
              one click. Nothing is ever written back to your systems.
            </Card>
            <Card label="Encryption" title="Encrypted end to end">
              TLS 1.3 in transit, AES-256 at rest, secrets held in a managed vault — and
              bring-your-own-key on Enterprise, so you hold the key that unlocks your data.
            </Card>
            <Card label="Residency" title="Your region, or your VPC">
              Pick the region your data stays in, or deploy Datalith entirely inside your own
              cloud account so nothing crosses your perimeter.
            </Card>
            <Card label="Governance" title="Permissions travel with the data">
              Source ACLs, row and column policy and PII masking are applied at ingest and
              enforced at query time — an agent can only see what the person behind it could see.
            </Card>
            <Card label="Audit" title="Every query on the record">
              A full trail of which agent read which dataset, on whose behalf, when, and what came
              back — exportable to your SIEM.
            </Card>
            <Card label="Isolation" title="Never used to train models">
              Your data, your graph and your queries stay yours. Nothing is used to train shared
              models, and no tenant can reach another tenant&rsquo;s graph.
            </Card>
          </div>
          <p className="st-footnote">
            SOC 2 Type I is on the roadmap for GA, with Type II to follow. GDPR data-processing
            terms and a security review pack are available to design partners on request.
          </p>
        </div>
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

      <section id="dashboard" className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>The dashboard</SectionLabel>
          <h2 className="dl-h2">Your whole estate in one view.</h2>
          <p className="st-lead">
            What data you have and where it lives, what changed, which agents are using it, and
            what it&rsquo;s costing you — in a view your board can read.
          </p>
          <ConsoleFigure />
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

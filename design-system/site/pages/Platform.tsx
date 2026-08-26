import type { ReactNode } from 'react'
import {
  SectionLabel, ScoreMeter, ConfluenceFigure, Card, Badge, CTABand, Quote, Button,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { PageIntro } from '../components/PageIntro'
import { LoopFigure, GraphFigure } from '../components/figures'
import { SearchFigure } from '../components/StageFigures'
import { ConsoleFigure } from '../components/ConsoleFigure'

interface Stage {
  id: string
  num: string
  name: string
  tagline: string
  body: string
  value: string
  points: string[]
  figure?: ReactNode
}

const STAGES: Stage[] = [
  {
    id: 'connect', num: '01', name: 'Connect', tagline: 'Every system you run, read-only',
    body: 'Multi-source, multi-platform, multi-modal ingestion — agentless, incremental, and read-only by default. No migration; Datalith meets the estate where it is.',
    value: 'No migration and no engineering project — connected in an afternoon.',
    points: [
      '150+ connectors: warehouses, OLTP databases, SaaS apps, object stores, streams',
      'Every modality: tables, documents, PDFs, wikis, tickets, emails, transcripts, images',
      'Deploys as SaaS or entirely inside your VPC',
    ],
    figure: <div data-draw><ConfluenceFigure height={280} /></div>,
  },
  {
    id: 'ready', num: '02', name: 'Ready', tagline: 'A score for how usable your data is',
    body: 'Every source and every business domain is measured for machine consumption — coverage, semantics, governance and freshness — and kept under watch after the first pass.',
    value: 'Continuous monitoring, not a one-off audit. You see readiness move as the estate changes.',
    points: [
      'Agent-Readiness Score 0–100 per source, per domain, and estate-wide',
      'Red flags a data team can act on: unmasked PII, duplicates, stale sources',
      'The board-level KPI for AI programs — and the free-audit wedge',
    ],
    figure: <div data-scoremeter data-reveal><ScoreMeter value={78} caption="Example score · illustrative" /></div>,
  },
  {
    id: 'pipelines', num: '03', name: 'Pipelines', tagline: 'One pipeline per data modality',
    body: 'The score becomes a plan, and the plan runs as pipelines — one per modality. Documents, images, tables, email, tickets, transcripts and streams each get the extraction stack their format actually needs, and all of them land the same output: typed records, resolved entities, citations back to the source.',
    value: 'Built for your data as it is, not a generic template someone else’s estate needed.',
    points: [
      'Each step carries the count that justifies it: 380 columns to type, 12 to mask, 22K documents to chunk',
      'Runs in place; nothing is written back to your source systems',
      'Re-runs as the estate drifts, so preparation never goes stale',
    ],
    figure: (
      <div className="st-topics" data-reveal>
        {['documents', 'images', 'tables', 'email', 'tickets', 'transcripts', 'streams'].map((s, i) => (
          <Badge key={s} tone={i === 0 ? 'blue' : 'neutral'}>{s}</Badge>
        ))}
        <p className="st-topics-note">one pipeline each · same output: typed records, resolved entities, citations to source</p>
      </div>
    ),
  },
  {
    id: 'graph', num: '04', name: 'Graph', tagline: 'One map of the whole business',
    body: 'Every system resolved into a single knowledge graph — entities, relationships and cross-source identity — with the topics, domains and pockets of expertise inside it detected and named, so each becomes a knowledge base in its own right.',
    value: 'Knowledge bases any agentic AI can read, whatever framework you build on.',
    points: [
      '"This Salesforce Account = this Snowflake row = this Zendesk org" — resolved automatically',
      'Domains surfaced and scored: Customers, Contracts, Support, Supply',
      'Every fact traceable to the system it came from, with freshness attached',
    ],
    figure: <GraphFigure />,
  },
  {
    id: 'search', num: '05', name: 'Search', tagline: 'A search engine for the data itself',
    body: 'Ask whether the company holds anything on a subject and Datalith searches the estate rather than the records — every table, document store and stream — and answers with the datasets that carry it: where each lives, how large, how fresh, who owns it, and how ready it is. Attach one as your reference and the retrieval over its contents is assembled on the fly, anchored to the graph.',
    value: 'People stop asking colleagues whether the data exists — and stop standing up a retrieval stack per dataset.',
    points: [
      '“Do we hold anything on EU customer churn?” → the datasets that do, with location, size, freshness and owner',
      'Attach a dataset as reference and ask about its contents — retrieval built per question, no index to keep warm',
      'Governed like every other read: you only see the datasets your permissions already cover',
    ],
    figure: <div data-reveal><SearchFigure /></div>,
  },
  {
    id: 'usecases', num: '06', name: 'Use cases', tagline: 'Which agents are worth building',
    body: 'Datalith reads the graph and proposes the agentic applications your data actually supports — the sources each would draw on, the effort, and the payback — including the ones the graph cannot support yet.',
    value: 'You find out what to build before you spend a quarter building it.',
    points: [
      '"Invoices + contracts + tickets → a collections agent is feasible; projected impact $X"',
      'Blueprints export to LangGraph, CrewAI, OpenAI Agents SDK, n8n',
      'Blocked proposals name the domain holding them back, and its score',
    ],
    figure: (
      <div className="st-flowcards" data-reveal-group>
        {[
          { name: 'Collections follow-up agent', roi: '$340K/yr', src: 'netsuite + sharepoint + zendesk' },
          { name: 'Churn-risk weekly digest', roi: '$120K/yr', src: 'salesforce + product events' },
          { name: 'Contract renewal agent', roi: 'blocked', src: 'contracts scoring below 60' },
        ].map(f => (
          <Card key={f.name} label={f.src} title={f.name}>
            <Badge tone={f.roi === 'blocked' ? 'warn' : 'ok'}>{f.roi === 'blocked' ? 'blocked' : `projected ${f.roi}`}</Badge>
          </Card>
        ))}
      </div>
    ),
  },
]

export function Platform() {
  return (
    <div className="dl-root">
      <SiteNav current="platform" />
      <PageIntro
        label="The platform"
        title={'One platform.'}
        accent="Six stages."
        lead="Datalith sits between your data estate and your AI agents, in six stages: connect every system read-only, score how ready its data is, propose the restructuring that estate needs, build it into one knowledge graph, make that estate searchable — what data you hold and where — then name the agents the graph makes possible."
      >
        <div className="dl-hero-ctas">
          <Button variant="ghost" size="lg" href="./demo/">Explore the product</Button>
        </div>
      </PageIntro>

      {/* command dashboard — the product, before the explanation */}
      <section className="st-section st-section--tight" id="dashboard" data-rail="Console">
        <div className="dl-wrap">
          <SectionLabel>Command</SectionLabel>
          <h2 className="dl-h2">Built for the CDO&rsquo;s Monday meeting.</h2>
          <p className="st-lead">
            One pane: estate map, readiness-score trends, agent activity, policy violations, and the workflow
            pipeline with ROI — the whole agentic data program, in a view your board can read.
          </p>
          <ConsoleFigure />
        </div>
      </section>

      <section className="st-section st-section--rule">
        <div className="dl-wrap">
          <SectionLabel>The loop</SectionLabel>
          <h2 className="dl-h2">Connect → Recommend, then back again.</h2>
          <LoopFigure />
        </div>
      </section>

      {/* module deep-dives */}
      <section className="st-modules">
        {STAGES.map((m, i) => (
          <article className={`st-module${i % 2 ? ' st-module--flip' : ''}`} id={m.id} data-rail={m.name} key={m.id}>
            <div className="dl-wrap st-module-in" data-reveal>
              <div className="st-module-copy">
                <span className="dl-featuregrid-label">{m.num} · {m.name}</span>
                <h3 className="st-module-title">{m.tagline}</h3>
                <p className="st-module-body">{m.body}</p>
                <p className="dl-featuregrid-value">{m.value}</p>
                <ul className="st-module-points">
                  {m.points.map(p => (<li key={p}>{p}</li>))}
                </ul>
              </div>
              <div className="st-module-fig">{m.figure}</div>
            </div>
          </article>
        ))}
      </section>

      <div data-reveal>
        <Quote
          quote="MCP moves context. It doesn't produce it. Datalith is the layer that produces it."
          name="Datalith"
          role="Why this layer exists"
        />
      </div>

      {/* security */}
      <section className="dl-on-ink st-section" id="security" data-rail="Trust">
        <div className="dl-wrap">
          <SectionLabel>Trust</SectionLabel>
          <h2 className="dl-h2">Read-only in. Governed out. Audited always.</h2>
          <div className="st-cols-3" data-reveal-group>
            <Card tone="ink" label="Access" title="Read-only by default.">
              Scoped, read-only credentials you issue and can revoke in one click; nothing writes
              back to your systems. Write access is never assumed.
            </Card>
            <Card tone="ink" label="Encryption" title="Encrypted end to end.">
              TLS 1.3 in transit, AES-256 at rest, secrets in a managed vault — and
              bring-your-own-key on Enterprise, so you hold the key that unlocks your data.
            </Card>
            <Card tone="ink" label="Deployment" title="Your region, or your VPC.">
              SaaS or fully in-VPC. Federate and prepare in place — no &ldquo;move your data to
              us,&rdquo; materialize only what serving requires.
            </Card>
            <Card tone="ink" label="Governance" title="Permissions travel with the data.">
              Source ACLs, row and column policy and PII masking applied at ingest and enforced at
              query time — including on search, where you only see the datasets you are cleared for.
            </Card>
            <Card tone="ink" label="Audit" title="Every query, logged.">
              Per-agent identity and least-privilege scopes, with a complete audit trail of what was
              read, on whose behalf and when — exportable to your SIEM.
            </Card>
            <Card tone="ink" label="Isolation" title="Never used to train models.">
              Your data, your graph and your queries stay yours. Nothing trains shared models, and
              no tenant can reach another tenant&rsquo;s graph. SOC 2 Type I at GA, Type II to follow.
            </Card>
          </div>
        </div>
      </section>

      <div data-reveal>
        <Quote
          quote="Agents are the primary consumers; humans set policy, review, and approve."
          name="Datalith"
          role="Product principle 01"
        />
      </div>

      <div id="audit" data-rail="Audit">
        <CTABand
          headline="Start with the free audit."
          lead="25 connectors at launch, the Agent-Readiness Score, and your estate map — from read-only credentials to board-ready readout in 48 hours."
          primaryCta={{ label: 'Request the audit', href: 'mailto:hello@datalith.ai?subject=Agent-Readiness%20Audit' }}
          secondaryCta={{ label: 'See pricing', href: './pricing.html' }}
        />
      </div>
      <SiteFooter />
    </div>
  )
}

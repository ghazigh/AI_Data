import type { ReactNode } from 'react'
import {
  SectionLabel, ScoreMeter, ConfluenceFigure, Card, Badge, CTABand, Quote,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { PageIntro } from '../components/PageIntro'
import { LoopFigure, GraphFigure, GatewayFigure, DashboardFigure } from '../components/figures'

interface Module {
  id: string
  num: string
  name: string
  tagline: string
  body: string
  value: string
  points: string[]
  figure?: ReactNode
}

const MODULES: Module[] = [
  {
    id: 'connect', num: '01', name: 'Datalith Connect', tagline: 'Every source, read-only',
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
    id: 'graph', num: '02', name: 'Datalith Graph', tagline: 'The Enterprise Knowledge Graph',
    body: 'An auto-constructed ontology of your business — entities, relationships, and cross-source identity resolution, with column- and chunk-level lineage on every node.',
    value: 'Agents stop giving contradictory answers from three systems.',
    points: [
      '"This Salesforce Account = this Snowflake row = this Zendesk org" — resolved automatically',
      'Freshness and provenance tracked on every node',
      'Stewards confirm or correct mappings; corrections retrain the mappers',
    ],
    figure: <GraphFigure />,
  },
  {
    id: 'topics', num: '03', name: 'Datalith Topics', tagline: 'Business definitions agents can trust',
    body: 'Business domains defined once, consistently: canonical metrics, glossary, authoritative sources and freshness targets. Gartner expects 60% of agent analytics projects without this layer to fail by 2028.',
    value: '"Revenue" means the same thing to every agent, every time.',
    points: [
      'Auto-defined domains: Revenue, Churn, Inventory, Support…',
      'One canonical definition per metric — agents stop inventing their own',
      'Freshness SLAs per topic, enforced and visible',
    ],
    figure: (
      <div className="st-topics" data-reveal>
        {['Revenue', 'Churn', 'Inventory', 'Support', 'Pipeline', 'Payroll', 'Logistics', 'Contracts'].map((t, i) => (
          <Badge key={t} tone={i === 0 ? 'blue' : 'neutral'}>{t}</Badge>
        ))}
        <p className="st-topics-note">revenue · canonical metrics: ARR, NRR, ACV · SLA: 24h · source of truth: snowflake.finance</p>
      </div>
    ),
  },
  {
    id: 'ready', num: '04', name: 'Datalith Ready', tagline: 'The agent-ready data engine',
    body: 'Preparation for machine consumption — cleaning, deduplication, normalization, semantic typing, chunking, embedding, PII masking — measured by the Agent-Readiness Score.',
    value: 'Removes the 60–75% of agent project effort that goes to data prep.',
    points: [
      'Score 0–100 per source, per domain, and estate-wide',
      'Completeness, freshness, consistency, semantic and governance coverage',
      'The board-level KPI for AI programs — and the free-audit wedge',
    ],
    figure: <div data-scoremeter data-reveal><ScoreMeter value={87} caption="Example score · illustrative" /></div>,
  },
  {
    id: 'gateway', num: '05', name: 'Datalith Gateway', tagline: 'Governed serving for any agent',
    body: 'One endpoint for the whole estate, speaking MCP — the standard protocol agents use to pull context. Per-agent identities, least-privilege scopes, row/column/chunk-level policy — and a full audit log of every agent query.',
    value: 'Security signs off, because every agent query is identified and logged.',
    points: [
      'MCP-native; adapters for A2A, OpenAI tool calling, LangChain/CrewAI SDKs',
      'Sub-second retrieval: semantic search, graph traversal, SQL-over-federation',
      'The audit artifact that gets security teams to "yes"',
    ],
    figure: <GatewayFigure />,
  },
  {
    id: 'flows', num: '06', name: 'Datalith Flows', tagline: 'Workflows, ROI attached',
    body: 'Datalith mines the graph for automation opportunities and generates deployable agent blueprints — data bindings, guardrails, eval set — exportable to your framework of choice.',
    value: 'Turns a data cleanup budget into a revenue roadmap.',
    points: [
      '"Invoices + contracts + tickets → a collections agent is feasible; projected impact $X"',
      'Blueprints export to LangGraph, CrewAI, OpenAI Agents SDK, n8n',
      'Turns readiness spend into revenue creation — the expansion engine',
    ],
    figure: (
      <div className="st-flowcards" data-reveal-group>
        {[
          { name: 'Collections follow-up agent', roi: '$340K/yr', src: 'netsuite + sharepoint + zendesk' },
          { name: 'Churn-risk weekly digest', roi: '$120K/yr', src: 'salesforce + product events' },
          { name: 'Invoice ↔ contract reconciliation', roi: '$95K/yr', src: 'netsuite + drive' },
        ].map(f => (
          <Card key={f.name} label={f.src} title={f.name}>
            <Badge tone="ok">projected {f.roi}</Badge>
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
        accent="Six capabilities."
        lead="Datalith sits between your data estate and your AI agents: it connects every system read-only, builds one map of your business, scores how ready that data is for agents, serves it through a single governed door, and tells you which agents are worth building next."
      />

      {/* command dashboard — the product, before the explanation */}
      <section className="st-section st-section--tight" id="dashboard">
        <div className="dl-wrap">
          <SectionLabel>Command</SectionLabel>
          <h2 className="dl-h2">Built for the CDO&rsquo;s Monday meeting.</h2>
          <p className="st-lead">
            One pane: estate map, readiness-score trends, agent activity, policy violations, and the workflow
            pipeline with ROI — the whole agentic data program, in a view your board can read.
          </p>
          <DashboardFigure />
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
        {MODULES.map((m, i) => (
          <article className={`st-module${i % 2 ? ' st-module--flip' : ''}`} id={m.id} key={m.id}>
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
      <section className="dl-on-ink st-section" id="security">
        <div className="dl-wrap">
          <SectionLabel>Trust</SectionLabel>
          <h2 className="dl-h2">Read-only in. Governed out. Audited always.</h2>
          <div className="st-cols-3" data-reveal-group>
            <Card tone="ink" label="Access" title="Read-only by default.">
              Scoped, read-only credentials; nothing writes back to your systems. Value first,
              write access never assumed.
            </Card>
            <Card tone="ink" label="Deployment" title="Your VPC, your rules.">
              SaaS or fully in-VPC. Federate and prepare in place — no &ldquo;move your data to
              us,&rdquo; materialize only what serving requires.
            </Card>
            <Card tone="ink" label="Audit" title="Every query, logged.">
              Per-agent identity and least-privilege scopes, with a complete audit trail. SOC 2
              Type I on the roadmap at GA, Type II to follow.
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

      <div id="audit">
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

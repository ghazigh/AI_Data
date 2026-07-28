import type { ReactNode } from 'react'
import {
  SectionLabel, ScoreMeter, ConfluenceFigure, Card, Badge, CTABand, Quote,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { PageIntro } from '../components/PageIntro'
import { LoopFigure, GraphFigure, DashboardFigure } from '../components/figures'

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
    id: 'pipelines', num: '03', name: 'Pipelines', tagline: 'The restructuring your estate needs',
    body: 'The score becomes a plan. Datalith designs the preparation your data actually requires — resolution, deduplication, semantic typing, PII masking, chunking and embedding — sized to what the scan found.',
    value: 'Built for your data as it is, not a generic template someone else’s estate needed.',
    points: [
      'Each step carries the count that justifies it: 380 columns to type, 12 to mask',
      'Runs in place; nothing is written back to your source systems',
      'Re-runs as the estate drifts, so preparation never goes stale',
    ],
    figure: (
      <div className="st-topics" data-reveal>
        {['resolve + dedupe', 'semantic typing', 'mask PII', 'chunk + embed'].map((s, i) => (
          <Badge key={s} tone={i === 0 ? 'blue' : 'neutral'}>{s}</Badge>
        ))}
        <p className="st-topics-note">generated from your scan · 41K duplicates · 380 untyped columns · 12 unmasked PII</p>
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
    id: 'usecases', num: '05', name: 'Use cases', tagline: 'Which agents are worth building',
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
        accent="Five stages."
        lead="Datalith sits between your data estate and your AI agents, in five stages: connect every system read-only, score how ready its data is, propose the restructuring that estate needs, build it into one knowledge graph, then name the agents that graph makes possible."
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
        {STAGES.map((m, i) => (
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

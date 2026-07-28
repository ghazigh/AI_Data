import {
  SectionLabel, FeatureGrid, Quote, CTABand, Card, Badge, TextLink,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { PageIntro } from '../components/PageIntro'
import { KnowledgeGraph } from '../components/KnowledgeGraph'

const PRINCIPLES = [
  { label: 'Principle 01', title: 'Agent-native, human-governed', body: 'Agents are the primary consumers; humans set policy, review, and approve.' },
  { label: 'Principle 02', title: 'Read-only by default', body: 'Connect with read-only credentials and produce value before asking for anything more. Kills the #1 security objection.' },
  { label: 'Principle 03', title: 'Meet the estate where it is', body: 'No migration, no "move your data to us." Federate, index and prepare in place.' },
  { label: 'Principle 04', title: 'Protocol-open', body: 'Built on the standard agent-context protocol first; adapters for A2A, OpenAI tool calling, and agent SDKs. The graph is the asset; wire formats are commodities.' },
  { label: 'Principle 05', title: 'Score everything', body: 'If readiness isn’t measurable, it isn’t manageable. The Agent-Readiness Score is the product’s heartbeat.' },
  { label: 'Principle 06', title: 'Ship the wedge first', body: 'A free 48-hour audit before a single sales call. The product earns the conversation.' },
]

const ROADMAP = [
  {
    phase: 'v0 · The Audit', when: 'Now → +3 months', badge: 'in build' as const,
    body: '25 connectors, readiness scoring, estate map. Free tier live; goal: 100 audits run.',
  },
  {
    phase: 'v1 · The Graph', when: '+3 → +9 months', badge: 'next' as const,
    body: 'Knowledge graph GA, pipeline plans, use-case recommender in beta, in-VPC deploy, SOC 2 Type I. Ten design partners converting to paid.',
  },
  {
    phase: 'v2 · The Platform', when: '+9 → +18 months', badge: 'horizon' as const,
    body: 'Ready engine GA, Flows recommendations, audit & permissions GA, SOC 2 Type II. $1M+ ARR — Series A metrics.',
  },
]

export function Company() {
  return (
    <div className="dl-root">
      <SiteNav current="company" />
      <PageIntro
        label="Company"
        title={'Data everywhere.'}
        accent="Ready nowhere. Until now."
        lead="Enterprises are deploying AI agents faster than their data can support them. Datalith exists to close that gap — to be the layer between the enterprise data estate and the agent workforce. We call the category the Agentic Data Center."
      />

      <section className="st-section st-section--tight">
        <div className="dl-wrap">
          <SectionLabel>The mission</SectionLabel>
          <h2 className="dl-h2">Make every enterprise&rsquo;s data ready for its agents.</h2>
          <p className="st-lead">
            The model war is over for buyers; the context war is starting. More than 40% of agentic
            AI projects will be canceled by 2027, and the autopsy is always the same: the data
            wasn&rsquo;t ready. We build the readiness layer — visible, scored, governed, and served
            to any agent over open protocols.
          </p>
        </div>
      </section>

      <div data-reveal>
        <FeatureGrid label="How we build" title="Six principles we don't trade away." items={PRINCIPLES} columns={3} />
      </div>

      {/* roadmap */}
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

      <section className="st-section st-section--rule" id="roadmap">
        <div className="dl-wrap">
          <SectionLabel>Roadmap</SectionLabel>
          <h2 className="dl-h2">Audit. Graph. Platform.</h2>
          <ol className="st-roadmap" data-reveal-group>
            {ROADMAP.map(r => (
              <li className="st-roadmap-row" key={r.phase}>
                <span className="st-roadmap-when">{r.when}</span>
                <div>
                  <h3 className="dl-steps-title">{r.phase} <Badge tone={r.badge === 'in build' ? 'blue' : 'neutral'}>{r.badge}</Badge></h3>
                  <p className="dl-steps-body">{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* team */}
      <section className="st-section" id="team">
        <div className="dl-wrap">
          <SectionLabel>The team</SectionLabel>
          <h2 className="dl-h2">Built by people who lived the grounding pain.</h2>
          <div className="st-cols-3" data-reveal-group>
            <Card label="Founder · CEO" title="Ghazi Gharsallah">
              Data &amp; AI product background. Owns the narrative, design partners, and the raise.
            </Card>
            <Card label="Founding · CTO" title="Joining Q3 2026">
              Distributed-systems / knowledge-graph background. Owns graph and gateway
              architecture. <Badge tone="blue">in conversations</Badge>
            </Card>
            <Card label="Founding engineers" title="We're hiring">
              Connectors/infra ×2, graph/ML ×2, product ×1, founding designer. If read-only
              ingestion at estate scale excites you: <a className="dl-textlink" href="mailto:hello@datalith.ai?subject=Founding%20engineer">write to us →</a>
            </Card>
          </div>
        </div>
      </section>

      <div data-reveal>
        <Quote
          quote="First we show you what you have. Then we turn it into an agent workforce."
          name="Datalith"
          role="The founding promise"
        />
      </div>

      <div id="audit">
        <CTABand
          headline="Join us early."
          lead="Design partners get the audit, the graph, and a direct line to the roadmap."
          primaryCta={{ label: 'Become a design partner', href: 'mailto:hello@datalith.ai?subject=Design%20partner' }}
          secondaryCta={{ label: 'Read the investor page', href: './investors.html' }}
        />
      </div>
      <SiteFooter />
    </div>
  )
}

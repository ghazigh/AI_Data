import {
  SectionLabel, StatBand, Card, FAQ, CTABand, Button, TextLink,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { PageIntro } from '../components/PageIntro'
import { PositioningMap, AllocationBars } from '../components/figures'

const WHY_NOW = [
  { label: 'Curve 01', title: 'Agent adoption is exploding', body: '17% of organizations have deployed agents today; over 60% plan to within two years. The deployment wave is ahead of the data-readiness wave — that gap is the market.' },
  { label: 'Curve 02', title: 'MCP standardized the pipe, not the content', body: 'Gartner: 60% of MCP-only agentic analytics projects fail by 2028 for lack of a semantic layer. MCP moves context; it doesn’t produce it.' },
  { label: 'Curve 03', title: 'Context is becoming shared infrastructure', body: '89% of teams are investing in context management in the next 12 months; 93% expect to treat it as shared infrastructure, not per-team tooling.' },
]

const MODEL_ROWS = [
  { k: 'Paying customers', y1: '25', y2: '90', y3: '240' },
  { k: 'Blended ACV', y1: '$40K', y2: '$55K', y3: '$70K' },
  { k: 'ARR', y1: '$1.0M', y2: '$5.0M', y3: '$16.8M' },
  { k: 'Team (FTE)', y1: '9', y2: '20', y3: '38' },
  { k: 'Net burn', y1: '$2.6M', y2: '$4.5M', y3: 'breakeven path optional' },
]

const MILESTONES = [
  '100+ audits run', '25 paying accounts', '$1M ARR', 'NRR > 125%',
  '3 lighthouse enterprise logos', 'SOC 2 Type II',
]

const OBJECTIONS = [
  { q: 'Won’t Snowflake or Databricks build this?', a: 'They already do — for their own data. Enterprises average many systems, and cross-source neutrality is the product. Same durable seat dbt, Fivetran and Confluent occupied against warehouse-native tooling.' },
  { q: 'Why not Glean?', a: 'Glean sells answers to employees. We sell infrastructure to agents — open protocols, any framework, governed at the data layer. Different consumer, different architecture, different buyer.' },
  { q: 'Isn’t this a feature of data catalogs?', a: 'Catalogs describe data for humans. Datalith prepares and serves data to machines, with a runtime (Gateway) and a recommendation engine (Flows). The incumbents’ pivots validate the category; their human-workflow legacy is our opening.' },
  { q: 'What about MCP churn risk?', a: 'The Gateway is protocol-agnostic — MCP today, A2A and OpenAI tool-calling adapters alongside. The durable asset is the knowledge graph, not the wire format.' },
  { q: 'Why will Datalith win?', a: 'Speed to the category name, plus the audit wedge: every free audit generates proprietary readiness-benchmark data nobody else has — which compounds into scoring and recommendation quality.' },
]

export function Investors() {
  return (
    <div className="dl-root">
      <SiteNav current="investors" />
      <PageIntro
        label="Seed round · open"
        title={'Raising $4M to build'}
        accent="the Agentic Data Center."
        lead="Datalith connects every database, warehouse, wiki and app an enterprise runs into one governed knowledge graph — then serves it to any AI agent, with a full audit trail. Every company that adopted agents in 2025–2026 is hitting the same bottleneck: not the model, not the framework — the data. We land with a free readiness score and price on the agent wave itself."
      >
        <div className="dl-hero-ctas">
          <Button variant="blue" size="lg" href="./deck/Datalith-Pitch-Deck.pptx">Download the deck</Button>
          <TextLink href="mailto:hello@datalith.ai?subject=Datalith%20seed%20round">request the data room</TextLink>
        </div>
      </PageIntro>

      <div data-reveal><StatBand /></div>

      <section className="st-section" id="why-now">
        <div className="dl-wrap">
          <SectionLabel>Why now</SectionLabel>
          <h2 className="dl-h2">Three curves, crossing.</h2>
          <div className="st-cols-3" data-reveal-group>
            {WHY_NOW.map(c => (
              <Card key={c.label} label={c.label} title={c.title}>{c.body}</Card>
            ))}
          </div>
        </div>
      </section>

      {/* market */}
      <section className="st-section st-section--rule" id="market">
        <div className="dl-wrap">
          <SectionLabel>Market</SectionLabel>
          <h2 className="dl-h2">A category being born, with comps attached.</h2>
          <div className="st-market" data-reveal-group>
            <div className="st-market-stat">
              <div className="dl-stat-value"><span data-countup="1.05" data-prefix="$" data-suffix="B" data-decimals="2">$1.05B</span> → <span data-countup="6.55" data-prefix="$" data-suffix="B" data-decimals="2">$6.55B</span></div>
              <p className="dl-stat-label">AI-ready enterprise knowledge-graph market, 2026 → 2036 (20.1% CAGR)</p>
              <span className="dl-stat-source">PR Newswire forecast</span>
            </div>
            <div className="st-market-stat">
              <div className="dl-stat-value"><span data-countup="3" data-prefix="$" data-suffix="–6B">$3–6B</span></div>
              <p className="dl-stat-label">serviceable annually, bottom-up: ~50K target companies × $60–120K ACV — before usage expansion</p>
              <span className="dl-stat-source">Internal, docs/01</span>
            </div>
            <div className="st-market-stat">
              <div className="dl-stat-value"><span data-countup="316" data-prefix="$" data-suffix="M">$316M</span></div>
              <p className="dl-stat-label">venture funding into agent infrastructure in a single recent quarter — picks-and-shovels funded as aggressively as agents</p>
              <span className="dl-stat-source">Agentic AI trackers, 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* positioning */}
      <section className="st-section" id="positioning">
        <div className="dl-wrap">
          <SectionLabel>Competition</SectionLabel>
          <h2 className="dl-h2">Nobody serves the whole estate to agents.</h2>
          <div className="st-pos-row">
            <PositioningMap />
            <div className="st-pos-copy" data-reveal-group>
              <Card label="Moat 01" title="Data-network effect">
                Every connected source enriches the graph; every agent interaction trains scoring
                and recommendations.
              </Card>
              <Card label="Moat 02" title="Switching cost">
                The graph becomes the substrate every internal agent depends on — ripping it out
                means re-grounding every agent.
              </Card>
              <Card label="Moat 03" title="Neutrality">
                The Switzerland seat between warehouses, frameworks, and model providers —
                historically durable (dbt, Fivetran, Confluent).
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* business model */}
      <section className="st-section st-section--rule" id="model">
        <div className="dl-wrap">
          <SectionLabel>Business model</SectionLabel>
          <h2 className="dl-h2">Free audit in. NRR ≥130% out.</h2>
          <p className="st-lead">
            SaaS plus usage — connected sources, graph entities, gateway calls. Land free, convert
            at $2.5K/mo, expand to $100K+ ACV. Customers add agents → calls grow → we grow.
          </p>
          <div className="st-table-wrap" data-reveal>
            <table className="st-table">
              <thead>
                <tr><th scope="col">Plan (summary)</th><th scope="col">Year 1</th><th scope="col">Year 2</th><th scope="col">Year 3</th></tr>
              </thead>
              <tbody>
                {MODEL_ROWS.map(r => (
                  <tr key={r.k}><th scope="row">{r.k}</th><td>{r.y1}</td><td>{r.y2}</td><td>{r.y3}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="st-footnote">
            Assumptions: audit→paid conversion 8–12% · sales cycle 45–75 days mid-market · gross
            margin ~78% with compute metered through.
          </p>
        </div>
      </section>

      {/* the ask */}
      <section className="dl-on-ink st-section" id="ask">
        <div className="dl-wrap">
          <SectionLabel>The ask</SectionLabel>
          <h2 className="dl-h2">$4.0M seed · 18–20 months of runway.</h2>
          <div className="st-ask-row">
            <div>
              <h3 className="st-ask-sub">Use of funds</h3>
              <AllocationBars />
            </div>
            <div>
              <h3 className="st-ask-sub">Milestones to Series A</h3>
              <ul className="st-milestones" data-reveal-group>
                {MILESTONES.map(m => (<li key={m}>{m}</li>))}
              </ul>
              <p className="st-footnote st-footnote--ink">
                Category comps: agentic-AI seeds run $5–15M; Series A $20–40M (VCBacked, 2026).
                Pattern validation: JetScale&rsquo;s $5.4M oversubscribed seed for the same
                read-only-wedge motion, applied to cloud spend.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div data-reveal>
        <FAQ label="Objection prep" title="The questions we hope you ask." items={OBJECTIONS} />
      </div>

      <div id="audit">
        <CTABand
          withFigure={false}
          headline="The deck is ready. So are we."
          lead="13 slides, the financial model, and a live product plan — plus a free audit for any portfolio company that wants its score."
          primaryCta={{ label: 'Download the deck', href: './deck/Datalith-Pitch-Deck.pptx' }}
          secondaryCta={{ label: 'hello@datalith.ai', href: 'mailto:hello@datalith.ai?subject=Datalith%20seed%20round' }}
        />
      </div>
      <SiteFooter />
    </div>
  )
}

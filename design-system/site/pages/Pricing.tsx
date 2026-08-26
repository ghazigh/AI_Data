import {
  PricingTable, Steps, FAQ, CTABand, SectionLabel, Card, type Tier,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { PageIntro } from '../components/PageIntro'

const TIERS: Tier[] = [
  {
    name: 'Audit', price: 'Free',
    blurb: 'For teams who want to know where they stand before committing budget.',
    features: ['3 sources', 'One-time readiness report', 'Estate map', 'Top-10 red flags'],
    cta: { label: 'Run the audit', href: 'mailto:hello@datalith.ai?subject=Agent-Readiness%20Audit' },
  },
  {
    name: 'Growth', price: '$2.5K', period: '/mo',
    blurb: 'For teams putting their first agents into production.',
    features: ['10 sources', 'Continuous readiness scoring', 'Pipeline plans', 'Knowledge graph · 100K agent queries/mo'],
    cta: { label: 'Start Growth', href: 'mailto:hello@datalith.ai?subject=Datalith%20Growth' }, featured: true,
  },
  {
    name: 'Scale', price: '$6K', period: '/mo',
    blurb: 'For teams running agent fleets that security has to sign off on.',
    features: ['25 sources', 'Use-case recommendations', 'RBAC + priority support', 'Metered agent queries'],
    cta: { label: 'Start Scale', href: 'mailto:hello@datalith.ai?subject=Datalith%20Scale' },
  },
  {
    name: 'Enterprise', price: 'Custom',
    blurb: 'For regulated estates that need Datalith inside their own VPC.',
    features: ['Unlimited sources', 'In-VPC / self-hosted', 'SSO/SCIM · custom policies', 'Audit exports · dedicated CSM'],
    cta: { label: 'Talk to us', href: 'mailto:hello@datalith.ai?subject=Datalith%20Enterprise' },
  },
]

const MOTION = [
  { title: 'Land — free', body: 'The Agent-Readiness Audit: connect read-only in an afternoon, get your Agent-Readiness Score and estate map in 48 hours. The score is the benchmark your board shares.' },
  { title: 'Convert — Growth', body: 'Unlock continuous scoring, the pipeline plans and the live knowledge graph. Your first agents get governed context instead of hand-built integrations.' },
  { title: 'Expand — Enterprise', body: 'More sources, more agents served, Flows blueprints, in-VPC deployment. Usage grows with your agent adoption — pricing is indexed to the wave itself.' },
]

const PRICING_FAQ = [
  { q: 'Do I have to buy the stages separately?', a: 'No — there is no à la carte menu, you pick a plan. Every plan connects, scores and maps your estate; Scale adds use-case recommendations and role-based access; Enterprise adds in-VPC deployment and custom policy.' },
  { q: 'What do the usage meters measure?', a: 'Three things: connected sources, graph entities, and agent queries. You pay for the estate you connect and the agent traffic you serve — not for seats.' },
  { q: 'What happens after the free audit?', a: 'You keep the report — estate map, Agent-Readiness Score, top-10 findings. Teams that convert to Growth typically do so to make the score continuous and put their first agents onto the graph.' },
  { q: 'Do you require write access to our systems?', a: 'Never to start. Datalith connects with scoped, read-only credentials, and every read is logged. In-VPC deployment is available on Enterprise.' },
  { q: 'How do contracts work?', a: 'Growth and Scale are monthly, cancel anytime. Enterprise is an annual contract, priced on the size of the estate you connect and the agent traffic you serve.' },
]

const MATRIX = [
  { k: '01 · Connect — sources', audit: '3', growth: '10', scale: '25', ent: 'Unlimited' },
  { k: '02 · Ready — readiness score', audit: 'One-time report', growth: 'Continuous', scale: 'Continuous', ent: 'Continuous' },
  { k: '02 · Ready — red flags', audit: 'Top 10', growth: 'All, monitored', scale: 'All, monitored', ent: 'All, monitored' },
  { k: '03 · Pipelines — preparation plan', audit: 'Recommendations only', growth: 'Generated + run', scale: 'Generated + run', ent: 'Custom policy' },
  { k: '04 · Graph — knowledge graph', audit: 'One-time snapshot', growth: 'Live', scale: 'Live', ent: 'Live' },
  { k: '04 · Graph — agent queries', audit: '—', growth: '100K / mo', scale: 'Metered', ent: 'Metered' },
  { k: '05 · Use cases — agent proposals', audit: 'Top-10 findings', growth: '—', scale: 'Included', ent: 'Included' },
  { k: 'Governance', audit: '—', growth: 'Audit log', scale: 'RBAC + audit log', ent: 'SSO/SCIM · custom policy' },
  { k: 'Deployment', audit: 'SaaS', growth: 'SaaS', scale: 'SaaS', ent: 'In-VPC / self-hosted' },
]

export function Pricing() {
  return (
    <div className="dl-root">
      <SiteNav current="pricing" />
      <PageIntro
        label="Pricing"
        title={'Land with the audit.'}
        accent="Expand with the graph."
        lead="Free to see your score. Paid when the graph goes live. Priced on usage — sources, entities, agent calls — so our growth is indexed to your agents actually working."
      />

      <div data-reveal id="plans" data-rail="Plans">
        <PricingTable label="Plans" title="" tiers={TIERS} />
      </div>

      <section className="st-section st-section--rule" id="whats-included" data-rail="What's in">
        <div className="dl-wrap">
          <SectionLabel>What&rsquo;s included</SectionLabel>
          <h2 className="dl-h2">What each plan includes.</h2>
          <p className="st-lead">
            You don&rsquo;t buy stages à la carte — you pick a plan. Higher plans connect more
            sources, serve more agent queries, and add deeper governance and use-case
            recommendations.
          </p>
          <div className="st-table-wrap" data-reveal>
            <table className="st-table">
              <thead>
                <tr>
                  <th scope="col">Stage</th>
                  <th scope="col">Audit</th>
                  <th scope="col">Growth</th>
                  <th scope="col">Scale</th>
                  <th scope="col">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map(r => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    <td>{r.audit}</td>
                    <td>{r.growth}</td>
                    <td>{r.scale}</td>
                    <td>{r.ent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="st-section st-section--rule" id="meters" data-rail="Meters">
        <div className="dl-wrap">
          <SectionLabel>Usage meters</SectionLabel>
          <h2 className="dl-h2">Three meters. No seats.</h2>
          <div className="st-cols-3" data-reveal-group>
            <Card label="Meter 01" title="Connected sources">
              Each warehouse, database, SaaS app, bucket or stream you plug in. The estate map
              grows with every one.
            </Card>
            <Card label="Meter 02" title="Graph entities">
              Customers, products, orders, contracts — the resolved nodes of your Enterprise
              Knowledge Graph.
            </Card>
            <Card label="Meter 03" title="Agent queries">
              Governed context served to your agents from the graph. More agents working means more
              queries — that is the point.
            </Card>
          </div>
        </div>
      </section>

      <div data-reveal id="motion" data-rail="Motion">
        <Steps label="The motion" title="Land. Convert. Expand." steps={MOTION} />
      </div>

      <div data-reveal id="questions" data-rail="Questions">
        <FAQ label="Pricing questions" title="The fine print, out loud." items={PRICING_FAQ} />
      </div>

      <div id="audit" data-rail="Audit">
        <CTABand
          headline="Your score is free."
          lead="Read-only credentials in. Board-ready Agent-Readiness Score out. 48 hours."
          primaryCta={{ label: 'Request the audit', href: 'mailto:hello@datalith.ai?subject=Agent-Readiness%20Audit' }}
          secondaryCta={{ label: 'Explore the platform', href: './platform.html' }}
        />
      </div>
      <SiteFooter />
    </div>
  )
}

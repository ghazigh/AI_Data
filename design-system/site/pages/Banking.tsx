import {
  Hero, SectionLabel, Card, FAQ, CTABand, ConfluenceFigure, TextLink,
} from '../../src/index'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { BankArchFigure, AuditTimeline, AgentRuns, PolicyTrail } from '../components/BankFigures'

/** An agent is proposed only when every domain it reads scores at or above this. */
const BAR = 60

const DOMAINS = [
  { id: 'pay', name: 'Payments', score: 84 },
  { id: 'cust', name: 'Customers & KYC', score: 61 },
  { id: 'lend', name: 'Lending & credit', score: 58 },
  { id: 'comp', name: 'Complaints & contact', score: 47 },
  { id: 'mkt', name: 'Markets & treasury', score: 72 },
]

/** The list every bank already has — front office, risk, operations and the desks. */
const AGENTS = [
  { name: 'Relationship briefing', needs: ['cust', 'pay'], gain: '4h → 10 min' },
  { name: 'KYC file refresh', needs: ['cust', 'pay'], gain: '−55% review effort' },
  { name: 'Alert triage pack', needs: ['pay', 'cust'], gain: '+30% cleared' },
  { name: 'Reconciliation breaks', needs: ['pay', 'mkt'], gain: '70% pre-explained' },
  { name: 'Desk exposure briefing', needs: ['mkt', 'pay'], gain: 'ready at the open' },
  { name: 'Credit memo draft', needs: ['lend', 'cust'], gain: '−40% drafting' },
  { name: 'Arrears follow-up', needs: ['lend', 'pay'], gain: '+15% cases worked' },
  { name: 'Complaint file assembly', needs: ['comp', 'cust'], gain: '2 days → 2h' },
  { name: 'Control evidence pack', needs: ['comp', 'lend', 'pay'], gain: 'continuous evidence' },
]

const score = (id: string) => DOMAINS.find(d => d.id === id)!.score
const blockers = (needs: string[]) => needs.filter(id => score(id) < BAR)
const SHIPS = AGENTS.filter(a => !blockers(a.needs).length).length
const WAITING = AGENTS.length - SHIPS
const HOLDING = new Set(AGENTS.flatMap(a => blockers(a.needs))).size

/** Categories rather than products: what a bank runs, without naming vendors. */
const ESTATE = [
  { k: 'Core banking', v: 'accounts, balances, mandates, postings', m: ['tables', 'events'] },
  { k: 'Cards & payments', v: 'authorisations, settlement, payment messages', m: ['streams', 'tables'] },
  { k: 'Lending & credit', v: 'applications, covenants, collateral, decisions', m: ['tables', 'documents'] },
  { k: 'CRM & onboarding', v: 'parties, ownership, screening, consents', m: ['tables', 'documents'] },
  { k: 'Case & contact centre', v: 'complaints, calls, correspondence', m: ['tickets', 'transcripts'] },
  { k: 'Document stores', v: 'policies, contracts, credit files, KYC packs', m: ['documents', 'images'] },
  { k: 'Markets & treasury', v: 'positions, limits, collateral, counterparties', m: ['tables', 'streams'] },
  { k: 'Ledgers & finance', v: 'general ledger, sub-ledgers, reconciliations', m: ['tables'] },
  { k: 'Warehouses & lakes', v: 'the marts and extracts already built on all of it', m: ['tables', 'files'] },
]

// The trail above already walks access, entitlements, masking, lineage and
// audit; these are the three questions it does not answer on its own.
const SECURITY = [
  { label: 'Deployment', title: 'Your region, or your VPC.', body: 'SaaS where you choose, or entirely inside your own cloud account.' },
  { label: 'Isolation', title: 'Your graph stays yours.', body: 'No tenant reaches another. Nothing here trains a shared model.' },
  { label: 'Evidence', title: 'Ready for your review.', body: 'Review pack, processing terms and audit-export format, before you connect anything.' },
]

const COMPARE = [
  { k: 'What it is for', cat: 'Finding data', rag: 'Answering over documents', mcp: 'Wiring one agent to one system', dl: 'Preparing the estate for agents' },
  { k: 'Who reads it', cat: 'People', rag: 'One application', mcp: 'One agent', dl: 'Any agent framework' },
  { k: 'Entitlements', cat: 'Described', rag: 'Rebuilt per app', mcp: 'Rebuilt per server', dl: 'Inherited from the source' },
  { k: 'Lineage', cat: 'At table level', rag: 'Chunk citations', mcp: 'None', dl: 'Fact to source record' },
  { k: 'Tells you what to build', cat: 'No', rag: 'No', mcp: 'No', dl: 'Yes — scored, with what blocks it' },
]

const BANK_FAQ = [
  { q: 'Do you need write access to our core systems?', a: 'No. Datalith connects with scoped, read-only credentials and never writes back to a system of record. Any action an agent proposes stays inside your own workflow tools, under your own approvals.' },
  { q: 'Can it run inside our own perimeter?', a: 'Yes — SaaS in the region you choose, or deployed entirely inside your own cloud account. Datalith prepares data in place; only what serving requires is materialised.' },
  { q: 'How do agents respect who can see what?', a: 'Entitlements are read from the source systems at ingest and enforced at query time, so an agent sees only what the person behind it could already see. Personal data is masked or tokenised before anything is served.' },
  { q: 'Most of our answers live in documents. Does that work?', a: 'That is the point. Contracts, credit files, correspondence and transcripts each get the extraction their format needs, and land as typed records with citations back to the source page.' },
  { q: 'What do you need from us to start?', a: 'Read-only credentials on three sources, about two hours of a data engineer to issue them, and 45 minutes for the readout. Nothing is installed, and there is no commitment.' },
]

const NEEDS = [
  { k: '3 sources', v: 'Read-only credentials, scoped and revocable at any point.' },
  { k: '~2 hours', v: 'Of one data engineer, to issue them. Nothing is installed.' },
  { k: '45 minutes', v: 'At the end, for the readout with your team.' },
]

export function Banking() {
  return (
    <div className="dl-root">
      <SiteNav current="banking" />

      {/* hero: the estate spans the whole section and runs behind the copy.
          The Hero component still sets the margins, so they stay the home
          page's; the scene is a layer under it rather than a column beside it. */}
      <section className="st-bankhero">
        <div className="st-bankhero-scene" data-graph-island="bank">
          <ConfluenceFigure
            sources={['core banking', 'cards & payments', 'lending', 'crm & cases', 'documents', 'market data']}
            mergedLabel="ONE GRAPH" height={420}
          />
        </div>
        <div className="st-hero-anim">
          <Hero
            headline={'AI agents your bank'}
            accent="can run in production."
            lead="Datalith connects every system read-only, scores what your agents can use, and builds the governed graph they read from."
            primaryCta={{ label: 'Get the 48-hour audit', href: '#audit' }}
            tertiaryCta={{ label: 'Explore the product', href: './demo/' }}
            note="Read-only credentials · no migration · your perimeter"
            figure={null}
          />
        </div>
        <p className="st-figcaption">
          <span className="st-wideonly">Live scene · drag to rotate · </span>
          Illustrative estate · 5 knowledge bases · <span data-countup="4.97" data-decimals="2" data-suffix="M">4.97M</span> entities
        </p>
      </section>

      {/* what an agent actually does, before any claim about it */}
      <section className="st-section st-section--rule" id="use-cases" data-rail="Use cases">
        <div className="dl-wrap">
          <SectionLabel>Use cases</SectionLabel>
          <h2 className="dl-h2">What these AI agents actually do.</h2>
          <AgentRuns />
          <p className="st-footnote">
            Modelled from published industry benchmarks and a typical bank estate — illustrative, not
            customer results. Datalith is pre-launch.
          </p>
        </div>
      </section>
      {/* the estate, in categories a bank recognises */}
      <section className="st-section st-section--rule" id="estate" data-rail="Connectors">
        <div className="dl-wrap">
          <SectionLabel>Connectors</SectionLabel>
          <h2 className="dl-h2">The systems we connect to.</h2>
          <div className="st-estate" data-reveal-group>
            {ESTATE.map(e => (
              <div className="st-estate-cell" key={e.k}>
                <span className="st-estate-k">{e.k}</span>
                <span className="st-estate-v">{e.v}</span>
                <span className="st-estate-mods">
                  {e.m.map(m => (<span key={m}>{m}</span>))}
                </span>
              </div>
            ))}
          </div>
          <p className="st-footnote">
            <span data-countup="150" data-suffix="+">150+</span> connectors, agentless and incremental.
            Read-only by default; nothing is written back.
          </p>
        </div>
      </section>

      {/* the board */}
      <section className="st-section st-section--rule" id="agents" data-rail="Readiness">
        <div className="dl-wrap">
          <SectionLabel>Readiness</SectionLabel>
          <h2 className="dl-h2">Which agents your data can run today.</h2>
          <p className="st-tally">
            {SHIPS} of {AGENTS.length} ship now.{' '}
            <span className="st-tally-rest">{HOLDING} domains hold the other {WAITING}.</span>
          </p>

          <div className="st-board" data-board>
            <svg className="st-wires" data-wires aria-hidden="true" />
            <div className="st-board-col" data-agents>
              <p className="st-col-label">Agents</p>
              {AGENTS.map((a, i) => {
                const bl = blockers(a.needs)
                return (
                  <button
                    key={a.name} type="button"
                    className={`st-node${bl.length ? ' st-node--warn' : ''}`}
                    data-agent={i} data-needs={a.needs.join(' ')}
                    aria-pressed="false"
                  >
                    <span className="st-node-dot" />
                    <span className="st-node-name">{a.name}</span>
                    <span className={`dl-badge dl-badge--${bl.length ? 'warn' : 'ok'}`}>
                      {bl.length ? 'blocked' : a.gain}
                    </span>
                  </button>
                )
              })}
            </div>
            <div />
            <div className="st-board-col st-board-col--right" data-domains>
              <p className="st-col-label">Your data</p>
              {DOMAINS.map(d => (
                <button
                  key={d.id} type="button"
                  className={`st-node${d.score < BAR ? ' st-node--warn' : ''}`}
                  data-dom={d.id} data-low={d.score < BAR ? '' : undefined}
                  aria-pressed="false"
                >
                  <span className="st-node-dot" />
                  <span className="st-node-name">{d.name}</span>
                  <span className={`dl-badge dl-badge--${d.score < BAR ? 'warn' : 'neutral'}`}>{d.score}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="st-hint">Pick either side. Amber is the domain under {BAR} holding an agent back.</p>
          <p className="st-footnote">
            Illustrative estate and modelled payback — not customer results. Datalith is pre-launch.
          </p>
        </div>
      </section>

      {/* what actually lands, and when */}
      <section className="st-section st-section--rule" id="audit-what" data-rail="The audit">
        <div className="dl-wrap">
          <SectionLabel>The audit</SectionLabel>
          <h2 className="dl-h2">What you get in 48 hours.</h2>
          <AuditTimeline />
          <p className="st-footnote">
            Free, and yours to keep whether or not you go further. Timings are what the audit is run
            to; Datalith is pre-launch and the first design-partner cohort is open.
          </p>
        </div>
      </section>

      {/* the architecture question */}
      <section className="st-section st-section--rule" id="architecture" data-rail="Architecture">
        <div className="dl-wrap">
          <SectionLabel>Architecture</SectionLabel>
          <h2 className="dl-h2">How Datalith fits your architecture.</h2>
          <div className="st-arch-row">
            <ul className="st-arch-points" data-reveal-group>
              <li><b>No migration.</b> Systems of record stay exactly where they are.</li>
              <li><b>Read-only, agentless.</b> Nothing installed in your estate.</li>
              <li><b>Your perimeter.</b> Your region, or inside your own cloud account.</li>
              <li><b>Any framework.</b> Agents read under their own identity.</li>
            </ul>
            <BankArchFigure />
          </div>
        </div>
      </section>

      {/* the review */}
      <section className="dl-on-ink st-section" id="governance" data-rail="Security">
        <div className="dl-wrap">
          <SectionLabel>Security</SectionLabel>
          <h2 className="dl-h2">How every agent request is governed.</h2>
          <PolicyTrail />
          <div className="st-cols-3" data-reveal-group>
            {SECURITY.map(sec => (
              <Card key={sec.label} tone="ink" label={sec.label} title={sec.title}>{sec.body}</Card>
            ))}
          </div>
          <p className="st-footnote st-footnote--ink">
            How the product is built, not certifications: Datalith is pre-launch. SOC 2 Type I is on
            the roadmap for GA with Type II to follow, and a security review pack and data-processing
            terms are available to design partners on request.
          </p>
        </div>
      </section>

      {/* the comparison every IS director asks for */}
      <section className="st-section st-section--rule" id="compare" data-rail="Comparison">
        <div className="dl-wrap">
          <SectionLabel>Comparison</SectionLabel>
          <h2 className="dl-h2">How this compares to what you have.</h2>
          <div className="st-table-wrap" data-reveal>
            <table className="st-table">
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">Data catalog</th>
                  <th scope="col">RAG stack</th>
                  <th scope="col">Hand-built MCP servers</th>
                  <th scope="col" className="st-table-ushead">Datalith</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(r => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    <td>{r.cat}</td>
                    <td>{r.rag}</td>
                    <td>{r.mcp}</td>
                    <td className="st-table-us">{r.dl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="st-more">
            <TextLink href="./platform.html">see the platform in depth</TextLink>
            <TextLink href="./pricing.html">how engagements are priced</TextLink>
          </div>
        </div>
      </section>

      <div data-reveal>
        <FAQ label="FAQ" title="Questions banks ask." items={BANK_FAQ} />
      </div>

      {/* what starting actually costs them */}
      <section className="st-section st-section--rule" id="start" data-rail="Start">
        <div className="dl-wrap">
          <SectionLabel>Getting started</SectionLabel>
          <h2 className="dl-h2">What we need from you.</h2>
          <div className="st-cols-3" data-reveal-group>
            {NEEDS.map(n => (
              <div className="st-need" key={n.k}>
                <span className="st-need-k">{n.k}</span>
                <p className="st-need-v">{n.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="audit">
        <CTABand
          headline="Get your free readiness audit."
          lead="Read-only credentials in. Your estate map, a score per banking domain, and the agent list your data supports — in 48 hours."
          primaryCta={{ label: 'Request the audit', href: 'mailto:hello@datalith.ai?subject=Agent-Readiness%20Audit%20—%20Banking' }}
          secondaryCta={{ label: 'See the platform', href: './platform.html' }}
        />
      </div>
      <SiteFooter />
    </div>
  )
}

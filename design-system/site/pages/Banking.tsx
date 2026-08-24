import {
  SectionLabel, Card, Button, FAQ, CTABand, ConfluenceFigure, TextLink,
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
  { label: 'Deployment', title: 'Your region, or your VPC.', body: 'SaaS where you choose, or deployed entirely inside your own cloud account. Federated and prepared in place.' },
  { label: 'Isolation', title: 'Your graph stays yours.', body: 'No tenant can reach another, and nothing you connect is ever used to train a shared model.' },
  { label: 'Evidence', title: 'Ready for your review.', body: 'Security review pack, data-processing terms and the audit-export format, on request before you connect anything.' },
]

const COMPARE = [
  { k: 'What it is for', cat: 'Finding data', rag: 'Answering over documents', mcp: 'Wiring one agent to one system', dl: 'Preparing the estate for agents' },
  { k: 'Who reads it', cat: 'People', rag: 'One application', mcp: 'One agent', dl: 'Any agent framework' },
  { k: 'Entitlements', cat: 'Described', rag: 'Rebuilt per app', mcp: 'Rebuilt per server', dl: 'Inherited from the source' },
  { k: 'Lineage', cat: 'At table level', rag: 'Chunk citations', mcp: 'None', dl: 'Fact to source record' },
  { k: 'Tells you what to build', cat: 'No', rag: 'No', mcp: 'No', dl: 'Yes — scored, with what blocks it' },
  { k: 'Effort per new use case', cat: 'n/a', rag: 'A new stack', mcp: 'A new server', dl: 'A query against the graph' },
]

const BANK_FAQ = [
  { q: 'Do you need write access to our core systems?', a: 'No. Datalith connects with scoped, read-only credentials and never writes back to a system of record. Agents read prepared context from the graph; any action they propose stays inside your own workflow tools, under your own approvals.' },
  { q: 'Can it run inside our own perimeter?', a: 'Yes. SaaS in the region you choose, or deployed entirely inside your own cloud account. Datalith federates and prepares in place — only what serving requires is ever materialised.' },
  { q: 'How do agents respect who is allowed to see what?', a: 'Entitlements are read from the source systems at ingest and enforced at query time, so an agent sees only what the person or service behind it could already see. Customer, book and region restrictions travel with the data instead of being rebuilt.' },
  { q: 'What happens to personal data?', a: 'It is detected and masked or tokenised at ingest, before anything is served. The graph serves references rather than raw identifiers unless your policy says otherwise, and every read is logged against the identity that asked.' },
  { q: 'Most of our answers live in documents, not tables. Does that work?', a: 'That is the point. Policies, contracts, credit files, correspondence and transcripts each get the extraction their format needs and land as typed records with citations back to the source page, so a document-bound answer can still be checked.' },
  { q: 'How does this survive an internal review?', a: 'Datalith is not a model — it is the data layer underneath one. What it gives a reviewer is the trail: which sources an answer drew on, how fresh they were, who was cleared to see them, and what was read, by which agent, on whose behalf, and when.' },
  { q: 'What do you need from us to start?', a: 'Read-only credentials on three sources, roughly two hours of a data engineer’s time to issue them, and 45 minutes at the end for the readout. No migration, no software installed in your estate, no commitment.' },
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

      {/* hero: the estate as one graph, drawn by the product itself */}
      <section className="st-bankhero">
        <div className="dl-wrap st-bankhero-in">
          <div className="st-hero-anim">
            <div>
              <SectionLabel>Banking</SectionLabel>
              <h1 className="st-intro-title">
                AI agents your bank can{' '}<br />
                <em>put into production.</em>
              </h1>
              <p className="st-intro-lead">
                Datalith connects every system read-only, scores how ready your data is, and builds
                the governed knowledge graph your agents read from — without moving a single system
                of record.
              </p>
              <div className="dl-hero-ctas">
                <Button variant="blue" size="lg" href="#audit">Get the 48-hour audit</Button>
                <Button variant="ghost" size="lg" href="./demo/">Explore the product</Button>
              </div>
            </div>
          </div>
          <div className="st-bankhero-fig">
            <div className="st-graph-live st-bankgraph" data-graph-island="bank">
              <ConfluenceFigure
                sources={['core banking', 'cards & payments', 'lending', 'crm & cases', 'documents', 'market data']}
                mergedLabel="ONE GRAPH" height={480}
              />
            </div>
            <p className="st-figcaption">
              {/* the scene only mounts where it fits — see site/graph-boot.ts */}
              <span className="st-wideonly">Live scene · drag to rotate · </span>
              Illustrative bank estate · 24 entities, 5 knowledge bases
            </p>
          </div>
        </div>
      </section>


      {/* what an agent actually does, before any claim about it */}
      <section className="st-section st-section--rule" id="use-cases">
        <div className="dl-wrap">
          <SectionLabel>Use cases</SectionLabel>
          <h2 className="dl-h2">What these AI agents actually do.</h2>
          <p className="st-uc-lead">
            Five runs a bank recognises. Pick one to see what the agent reads, in order, and what it
            hands back — with a person still deciding at the end.
          </p>
          <AgentRuns />
          <p className="st-footnote">
            Modelled from published industry benchmarks and a typical bank estate — illustrative, not
            customer results. Datalith is pre-launch.
          </p>
        </div>
      </section>
      {/* the estate, in categories a bank recognises */}
      <section className="st-section st-section--rule" id="estate">
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
            150+ connectors, agentless and incremental. Read-only by default, and nothing is written
            back to a system of record.
          </p>
        </div>
      </section>

      {/* the board */}
      <section className="st-section st-section--rule" id="agents">
        <div className="dl-wrap">
          <SectionLabel>Readiness</SectionLabel>
          <h2 className="dl-h2">Which agents your data can run today.</h2>
          <p className="st-tally">
            <span data-countup={SHIPS}>{SHIPS}</span> of {AGENTS.length} ship now.{' '}
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
            <div className="st-board-gap" />
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
      <section className="st-section st-section--rule" id="audit-what">
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
      <section className="st-section st-section--rule" id="architecture">
        <div className="dl-wrap">
          <SectionLabel>Architecture</SectionLabel>
          <h2 className="dl-h2">How Datalith fits your architecture.</h2>
          <div className="st-arch-row">
            <ul className="st-arch-points" data-reveal-group>
              <li><b>No migration.</b> Systems of record stay where they are and keep serving the bank.</li>
              <li><b>Read-only, agentless.</b> Scoped credentials you issue; nothing installed in your estate.</li>
              <li><b>Your perimeter.</b> SaaS in your region, or deployed entirely inside your own cloud account.</li>
              <li><b>Any framework.</b> Agents read the graph under their own identity, whatever you build them on.</li>
            </ul>
            <BankArchFigure />
          </div>
        </div>
      </section>

      {/* the review */}
      <section className="dl-on-ink st-section" id="governance">
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
      <section className="st-section st-section--rule" id="compare">
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
      <section className="st-section st-section--rule" id="start">
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

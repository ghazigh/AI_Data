import type { CSSProperties } from 'react'
/** Figures that only the banking page uses. */

const SYSTEMS = ['core banking', 'lending', 'cards & payments', 'document stores', 'market & reference data']
const CONSUMERS = ['agent frameworks', 'copilots', 'workflow tools']

/**
 * Where Datalith sits in a bank's architecture: inside the perimeter, reading
 * the systems of record and never writing to them, serving prepared context out
 * to whatever the bank builds its agents on.
 */
export function BankArchFigure() {
  return (
    <figure className="st-svgfig st-arch" data-draw>
      <svg viewBox="0 0 660 380" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="Systems of record read read-only into Datalith, deployed inside the bank's perimeter, which serves governed context out to agent frameworks, copilots and workflow tools">
        {/* the perimeter everything sensitive stays inside */}
        <rect x="4" y="30" width="452" height="332" rx="4" className="st-arch-perim" />
        <text x="16" y="22" className="st-fig-mono">YOUR PERIMETER — SAAS IN YOUR REGION, OR YOUR OWN VPC</text>

        {/* systems of record */}
        <text x="20" y="60" className="st-fig-mono">SYSTEMS OF RECORD</text>
        {SYSTEMS.map((s, i) => (
          <g key={s}>
            <rect x="20" y={74 + i * 52} width="164" height="40" className="st-fig-box" />
            <text x="34" y={99 + i * 52} className="st-fig-body">{s}</text>
          </g>
        ))}

        {/* read-only path in */}
        {SYSTEMS.map((s, i) => (
          <path key={s} className="st-arch-in st-fig-axis" pathLength={100}
            d={`M184 ${94 + i * 52} C232 ${94 + i * 52}, 236 196, 268 196`} />
        ))}
        <text x="196" y="180" className="st-fig-mono">READ-ONLY</text>

        {/* the platform */}
        <rect x="268" y="74" width="168" height="244" rx="3" className="st-fig-box--blue" />
        <text x="284" y="100" className="st-fig-mono">DATALITH</text>
        {['connect · read-only', 'prepare · score', 'one governed graph'].map((s, i) => (
          <g key={s}>
            <rect x="284" y={120 + i * 62} width="136" height="46" className="st-fig-box" />
            <text x="296" y={148 + i * 62} className="st-fig-body">{s}</text>
          </g>
        ))}

        {/* governed context out */}
        <path className="st-arch-out st-fig-axis" pathLength={100} d="M436 196 H524" />
        <text x="480" y="178" textAnchor="middle" className="st-fig-mono">GOVERNED</text>
        <text x="480" y="190" textAnchor="middle" className="st-fig-mono">CONTEXT</text>
        <circle cx="524" cy="196" r="4" className="st-arch-node" />

        {CONSUMERS.map((c, i) => (
          <g key={c}>
            <path className="st-arch-out st-fig-axis" pathLength={100}
              d={`M524 196 C552 196, 556 ${112 + i * 84}, 584 ${112 + i * 84}`} />
            <rect x="524" y={92 + i * 84} width="128" height="40" className="st-fig-box" />
            <text x="538" y={117 + i * 84} className="st-fig-body">{c}</text>
          </g>
        ))}
        <text x="652" y="352" textAnchor="end" className="st-fig-mono">PER-AGENT IDENTITY · EVERY READ LOGGED</text>
      </svg>
    </figure>
  )
}

const STEPS = [
  { at: 'hour 0', title: 'Read-only credentials', body: 'Three sources, scoped and revocable. No migration, no agent installed.' },
  { at: 'hour 4', title: 'Estate mapped', body: 'What you hold, where it lives, how fresh it is, who owns it.' },
  { at: 'hour 24', title: 'Scored per domain', body: 'Coverage, definitions, governance and freshness, 0–100, with red flags.' },
  { at: 'hour 48', title: 'Readout', body: 'Board-ready score, the red-flag list, and the agents your data supports.' },
]

/** The audit as a clock, because the promise being made is a duration. */
export function AuditTimeline() {
  return (
    <ol className="st-timeline" data-reveal-group>
      {STEPS.map(s => (
        <li key={s.at}>
          <span className="st-timeline-at">{s.at}</span>
          <span className="st-timeline-dot" aria-hidden="true" />
          <h3 className="st-timeline-title">{s.title}</h3>
          <p className="st-timeline-body">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

interface UseCase {
  id: string
  fn: string
  name: string
  ask: string
  steps: { verb: string; body: string }[]
  out: string
  human: string
  gain: string
}

/** Five agents, each shown as the run it performs rather than as a claim. */
export const USE_CASES: UseCase[] = [
  {
    id: 'kyc', fn: 'Financial crime', name: 'KYC file refresh',
    ask: 'Refresh the file on this corporate customer.',
    steps: [
      { verb: 'Reads', body: 'onboarding, CRM, registry extracts and the document store' },
      { verb: 'Resolves', body: 'the same customer across five product systems into one identity' },
      { verb: 'Assembles', body: 'ownership structure, screening results and expiring documents' },
      { verb: 'Flags', body: 'the three gaps it cannot evidence, and where they should live' },
    ],
    out: 'A refreshed KYC file, every field cited to the system it came from.',
    human: 'The analyst reviews and signs off.',
    gain: '−55% review effort',
  },
  {
    id: 'memo', fn: 'Commercial lending', name: 'Credit memo draft',
    ask: 'Draft the annual review memo for this borrower.',
    steps: [
      { verb: 'Reads', body: 'the lending platform, spread financials and the credit file' },
      { verb: 'Extracts', body: 'covenants and collateral terms out of the signed documents' },
      { verb: 'Compares', body: 'this year against the last decision and the covenant tests' },
      { verb: 'Drafts', body: 'the memo, with every figure linked to its source page' },
    ],
    out: 'A first-draft memo a credit officer edits instead of assembles.',
    human: 'The credit officer owns the recommendation.',
    gain: '−40% drafting time',
  },
  {
    id: 'complaint', fn: 'Customer office', name: 'Complaint file assembly',
    ask: 'Build the file for this complaint.',
    steps: [
      { verb: 'Reads', body: 'the case system, call transcripts and correspondence' },
      { verb: 'Rebuilds', body: 'the account timeline around the events complained about' },
      { verb: 'Retrieves', body: 'the product terms that were in force on those dates' },
      { verb: 'Summarises', body: 'what happened, what was promised and what was delivered' },
    ],
    out: 'A complete case file before a human opens the complaint.',
    human: 'The case handler decides the outcome.',
    gain: '2 days → 2 hours',
  },
  {
    id: 'alert', fn: 'Financial crime', name: 'Alert triage pack',
    ask: 'Prepare this monitoring alert for review.',
    steps: [
      { verb: 'Reads', body: 'the alert, the customer, their payments and prior cases' },
      { verb: 'Assembles', body: 'the history behind the pattern that triggered it' },
      { verb: 'Checks', body: 'whether the same behaviour was cleared before, and why' },
      { verb: 'Presents', body: 'the pack with the evidence for and against' },
    ],
    out: 'An alert that arrives investigated rather than merely raised.',
    human: 'The investigator decides. Always.',
    gain: '+30% alerts cleared',
  },
  {
    id: 'desk', fn: 'Treasury & markets', name: 'Desk exposure briefing',
    ask: 'Brief the desk before the open.',
    steps: [
      { verb: 'Reads', body: 'overnight positions, limits, collateral and counterparty data' },
      { verb: 'Computes', body: 'limit utilisation and the exposures that moved most' },
      { verb: 'Correlates', body: 'the moves with counterparty and reference-data changes' },
      { verb: 'Writes', body: 'the briefing, each line traceable to the run it came from' },
    ],
    out: 'The morning briefing, ready before the desk sits down.',
    human: 'The head of desk sets the day from it.',
    gain: 'ready at the open',
  },
]

/**
 * The use cases as runs: pick one and see what the agent reads, in order, and
 * what it hands back. Every panel is in the markup — with JavaScript off they
 * stack, which is the whole section rather than an empty tab strip.
 */
export function AgentRuns() {
  return (
    <div className="st-uc" data-usecases>
      <div className="st-uc-tabs" role="tablist" aria-label="Agent use cases">
        {USE_CASES.map((u, i) => (
          <button
            key={u.id} type="button" role="tab" data-uc-tab={u.id}
            id={`uc-tab-${u.id}`} aria-controls={`uc-panel-${u.id}`}
            aria-selected={i === 0 ? 'true' : 'false'}
            className={`st-uc-tab${i === 0 ? ' is-active' : ''}`}
          >
            <span className="st-uc-tab-fn">{u.fn}</span>
            <span className="st-uc-tab-name">{u.name}</span>
          </button>
        ))}
      </div>

      <div className="st-uc-stage">
        {USE_CASES.map((u, i) => (
          <section
            key={u.id} role="tabpanel" data-uc-panel={u.id}
            id={`uc-panel-${u.id}`} aria-labelledby={`uc-tab-${u.id}`}
            className={`st-uc-panel${i === 0 ? ' is-active' : ''}`}
          >
            <p className="st-uc-ask"><span>ask</span>{u.ask}</p>
            <ol className="st-uc-steps">
              {u.steps.map((s, si) => (
                <li key={s.verb} style={{ '--i': si } as CSSProperties}>
                  <span className="st-uc-verb">{s.verb}</span>
                  <span className="st-uc-body">{s.body}</span>
                </li>
              ))}
            </ol>
            <div className="st-uc-out" style={{ '--i': u.steps.length } as CSSProperties}>
              <p className="st-uc-outline">{u.out}</p>
              <p className="st-uc-human">{u.human}</p>
              <span className="dl-badge dl-badge--ok">{u.gain}</span>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

const TRAIL = [
  { k: 'Agent asks', v: 'on behalf of a named person or service' },
  { k: 'Identity checked', v: 'per-agent credentials, least privilege' },
  { k: 'Entitlements applied', v: 'your source access rules, row and column policy' },
  { k: 'Personal data masked', v: 'references served, not raw identifiers' },
  { k: 'Answer returned', v: 'every fact cited to its source record' },
  { k: 'Read logged', v: 'exportable to your own monitoring' },
]

/** Governance as the path one request takes, rather than six assurances. */
export function PolicyTrail() {
  return (
    <ol className="st-trail" data-reveal-group>
      {TRAIL.map((t, i) => (
        <li key={t.k} style={{ '--i': i } as CSSProperties}>
          <span className="st-trail-dot" aria-hidden="true" />
          <span className="st-trail-k">{t.k}</span>
          <span className="st-trail-v">{t.v}</span>
        </li>
      ))}
    </ol>
  )
}

import type { ReactNode } from 'react'
import { Badge } from '../../src/index'

/* ============================================================
   Site-level figures — inline SVG / HTML artwork in the
   Confluence identity: hairlines, mono labels, one blue voice.
   ============================================================ */

const LOOP_STAGES = ['Connect', 'Graph', 'Score', 'Prepare', 'Serve', 'Recommend']

/** The platform loop: six stages, one feedback line back to the start. */
export function LoopFigure() {
  return (
    <figure className="st-loop" data-reveal>
      <ol className="st-loop-row">
        {LOOP_STAGES.map((s, i) => (
          <li className="st-loop-node" key={s}>
            <span className="st-loop-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="st-loop-name">{s}</span>
          </li>
        ))}
      </ol>
      <div className="st-loop-back">
        <span>every agent interaction feeds back into scoring &amp; recommendations</span>
      </div>
    </figure>
  )
}

/** Identity resolution: three source records resolved into one graph entity. */
export function GraphFigure() {
  return (
    <figure className="st-svgfig" data-draw>
      <svg viewBox="0 0 560 300" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="Three source records — Salesforce account, warehouse row, support org — resolved into one customer entity with lineage">
        {/* source records */}
        {[
          { y: 60, label: 'salesforce · Account 0018Z', sub: 'ACME Corp' },
          { y: 150, label: 'snowflake · dim_customer #4471', sub: 'Acme Corporation' },
          { y: 240, label: 'zendesk · Org 99213', sub: 'acme.com' },
        ].map(r => (
          <g key={r.y}>
            <rect x="8" y={r.y - 26} width="212" height="52" className="st-fig-box" />
            <text x="22" y={r.y - 6} className="st-fig-mono">{r.label}</text>
            <text x="22" y={r.y + 13} className="st-fig-body">{r.sub}</text>
            <path className="dl-confluence-stream" d={`M220 ${r.y} C 300 ${r.y}, 320 150, 380 150`} />
          </g>
        ))}
        {/* resolved entity */}
        <circle cx="380" cy="150" r="6" className="dl-confluence-node" />
        <path className="dl-confluence-merge" d="M380 150 L470 150" />
        <text x="384" y="122" className="dl-confluence-mergelabel">ONE ENTITY</text>
        <text x="384" y="182" className="st-fig-mono">customer · acme</text>
        <text x="384" y="200" className="st-fig-mono">lineage · 3 sources</text>
      </svg>
    </figure>
  )
}

/** Governed serving: agent fleet converging on the gateway, one line to the graph. */
export function GatewayFigure() {
  const agents = ['claude agent', 'langgraph', 'crewai', 'openai sdk', 'custom mcp client']
  return (
    <figure className="st-svgfig" data-draw>
      <svg viewBox="0 0 560 300" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="Five agent frameworks connecting through one governed MCP gateway to the knowledge graph, every query audited">
        {agents.map((a, i) => {
          const y = 40 + i * 55
          return (
            <g key={a}>
              <text x="8" y={y - 10} className="st-fig-mono">{a}</text>
              <path className="dl-confluence-stream" d={`M8 ${y} C 120 ${y}, 160 150, 250 150`} />
            </g>
          )
        })}
        <rect x="250" y="122" width="130" height="56" className="st-fig-box st-fig-box--blue" />
        <text x="315" y="147" textAnchor="middle" className="dl-confluence-mergelabel">GATEWAY</text>
        <text x="315" y="166" textAnchor="middle" className="st-fig-mono">per-agent identity</text>
        <path className="dl-confluence-merge" d="M380 150 L470 150" />
        <circle cx="470" cy="150" r="6" className="dl-confluence-node" />
        <text x="484" y="145" className="st-fig-mono">the</text>
        <text x="484" y="161" className="st-fig-mono">graph</text>
        <text x="250" y="212" className="st-fig-mono">audit · every query logged, per agent, per scope</text>
        <path className="dl-confluence-stream" d="M250 220 L470 220" strokeDasharray="3 4" />
      </svg>
    </figure>
  )
}

/** Competitive positioning: humans↔agents × single-source↔whole-estate. */
export function PositioningMap() {
  const dots = [
    { x: 120, y: 78, label: 'Collibra · Alation · Atlan' },
    { x: 130, y: 232, label: 'Glean' },
    { x: 400, y: 218, label: 'LlamaIndex · Unstructured' },
    { x: 418, y: 258, label: 'ad-hoc scripts' },
  ]
  return (
    <figure className="st-svgfig st-posmap" data-reveal>
      <svg viewBox="0 0 560 320" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="Positioning map: Datalith alone in the agent-native, whole-estate quadrant">
        <path className="st-fig-axis" d="M280 16 L280 296" />
        <path className="st-fig-axis" d="M30 156 L530 156" />
        <text x="280" y="10" textAnchor="middle" className="st-fig-mono">whole estate</text>
        <text x="280" y="314" textAnchor="middle" className="st-fig-mono">single source</text>
        <text x="26" y="152" className="st-fig-mono">humans</text>
        <text x="534" y="152" textAnchor="end" className="st-fig-mono">agents</text>
        {dots.map(d => (
          <g key={d.label}>
            <circle cx={d.x} cy={d.y} r="4" className="st-fig-dot" />
            <text x={d.x + 10} y={d.y + 4} className="st-fig-body">{d.label}</text>
          </g>
        ))}
        <g>
          <circle cx="425" cy="70" r="7" className="dl-confluence-node" />
          <text x="425" y="48" textAnchor="middle" className="dl-confluence-mergelabel">DATALITH</text>
        </g>
      </svg>
    </figure>
  )
}

/** Use-of-funds bars; widths animate in on reveal. */
export function AllocationBars() {
  const rows = [
    { label: 'Engineering — connectors, graph, gateway', pct: 60 },
    { label: 'Go-to-market — founding AE + content', pct: 15 },
    { label: 'Security & compliance — SOC 2 I+II, in-VPC', pct: 15 },
    { label: 'Operations', pct: 10 },
  ]
  return (
    <div className="st-alloc" data-reveal>
      {rows.map(r => (
        <div className="st-alloc-row" key={r.label}>
          <span className="st-alloc-label">{r.label}</span>
          <span className="st-alloc-track">
            <span className="st-alloc-fill" style={{ ['--st-pct' as never]: `${r.pct}%` }} />
          </span>
          <span className="st-alloc-pct">{r.pct}%</span>
        </div>
      ))}
    </div>
  )
}

/* ---- command dashboard mock: tiny stroke glyphs for the module nav ---- */
function NavGlyph({ kind }: { kind: string }) {
  const d: Record<string, ReactNode> = {
    command: <><rect x="1.5" y="1.5" width="4" height="4" /><rect x="8.5" y="1.5" width="4" height="4" /><rect x="1.5" y="8.5" width="4" height="4" /><rect x="8.5" y="8.5" width="4" height="4" /></>,
    connect: <><path d="M1 3.5 C6 3.5 6 7 10 7" /><path d="M1 10.5 C6 10.5 6 7 10 7" /><path d="M10 7 L13 7" /></>,
    graph: <><circle cx="3" cy="3.5" r="1.8" /><circle cx="11" cy="3.5" r="1.8" /><circle cx="7" cy="11" r="1.8" /><path d="M4.4 4.6 L6 9.4 M9.6 4.6 L8 9.4 M4.8 3.5 L9.2 3.5" /></>,
    topics: <><path d="M4.5 1.5 L3.5 12.5 M10.5 1.5 L9.5 12.5 M1.5 5 L12.5 5 M1.5 9.5 L12.5 9.5" /></>,
    ready: <><path d="M2 11 A5.5 5.5 0 0 1 12 11" /><path d="M7 11 L10 5.5" /></>,
    gateway: <><path d="M7 1.5 L12 3.5 V8 C12 10.5 9.8 12 7 13 C4.2 12 2 10.5 2 8 V3.5 Z" /></>,
    flows: <><path d="M2 7 L7 7 M7 7 L11.5 3 M7 7 L11.5 11" /><circle cx="12" cy="3" r="1.3" /><circle cx="12" cy="11" r="1.3" /></>,
    audit: <><rect x="2.5" y="1.5" width="9" height="11" /><path d="M4.8 4.5 L9.2 4.5 M4.8 7 L9.2 7 M4.8 9.5 L7.5 9.5" /></>,
    policy: <><circle cx="7" cy="7" r="5.5" /><path d="M7 4.2 V7.4 L9.2 8.8" /></>,
  }
  return (
    <svg className="st-app-glyph" viewBox="0 0 14 14" fill="none" aria-hidden="true">{d[kind]}</svg>
  )
}

const APP_NAV: { section: string; items: { glyph: string; label: string; meta?: string; active?: boolean }[] }[] = [
  {
    section: 'Overview',
    items: [{ glyph: 'command', label: 'Command', active: true }],
  },
  {
    section: 'Stages',
    items: [
      { glyph: 'connect', label: 'Connect', meta: '23' },
      { glyph: 'ready', label: 'Ready', meta: '78' },
      { glyph: 'topics', label: 'Pipelines', meta: '4' },
      { glyph: 'graph', label: 'Graph', meta: '4.2M' },
      { glyph: 'flows', label: 'Use cases', meta: '3' },
    ],
  },
  {
    section: 'Govern',
    items: [
      { glyph: 'policy', label: 'Policies' },
      { glyph: 'audit', label: 'Audit log' },
    ],
  },
]

const KPIS = [
  { label: 'Agent-Readiness Score', value: '78', count: { v: '78' }, unit: '/100', delta: '+11 this quarter', tone: 'ok' as const },
  { label: 'Sources connected', value: '23', count: { v: '23' }, unit: '/ 31 mapped', delta: '+4 this month', tone: 'ok' as const },
  { label: 'Graph entities', value: '4.2', count: { v: '4.2', decimals: '1' }, unit: 'M', delta: '214 resolved today', tone: 'ok' as const },
  { label: 'Agent calls · 24h', value: '128', count: { v: '128' }, unit: 'K', delta: '31 agents served', tone: 'ok' as const },
  { label: 'Policy blocks · 24h', value: '3', count: { v: '3' }, unit: '', delta: 'all quarantined', tone: 'warn' as const },
]

const ESTATE = [
  { name: 'snowflake · prod', type: 'warehouse', entities: '1.8M', fresh: '2m', ars: 91, tone: 'ok' as const, note: 'healthy' },
  { name: 'postgres · core', type: 'oltp', entities: '640K', fresh: '1m', ars: 84, tone: 'ok' as const, note: 'healthy' },
  { name: 'kafka · events', type: 'stream', entities: '380K', fresh: 'live', ars: 74, tone: 'ok' as const, note: 'lag 4m' },
  { name: 'salesforce', type: 'crm', entities: '92K', fresh: '38m', ars: 72, tone: 'warn' as const, note: '2 stale objects' },
  { name: 's3 · data-lake', type: 'objects', entities: '1.2M', fresh: '3h', ars: 66, tone: 'warn' as const, note: 'pii unmasked' },
  { name: 'sharepoint', type: 'documents', entities: '310K', fresh: '1h', ars: 58, tone: 'warn' as const, note: 'unchunked docs' },
  { name: 'mysql · analytics', type: 'oltp', entities: '210K', fresh: '12m', ars: 79, tone: 'ok' as const, note: 'healthy' },
  { name: 'gdrive · contracts', type: 'documents', entities: '45K', fresh: '2h', ars: 61, tone: 'warn' as const, note: 'ocr pending' },
]

const DOMAINS = [
  { name: 'revenue', ars: 87 },
  { name: 'support', ars: 81 },
  { name: 'inventory', ars: 74 },
  { name: 'people ops', ars: 52 },
]

const ACTIVITY = [
  '10:02:41 agent:collections read invoices.q3 — allowed',
  '10:02:12 graph resolved 214 new identities',
  '10:01:58 agent:support-bot read tickets.* — allowed',
  '09:58:07 policy blocked agent:intern-demo on payroll.*',
  '09:55:30 ars recomputed · revenue domain 87 (+3)',
  '09:54:44 connect synced salesforce · 1,204 rows',
  '09:51:19 agent:churn-digest read accounts.* — allowed',
  '09:49:02 ready masked 36 pii columns in s3 · data-lake',
  '09:47:38 use cases: drafted blueprint for invoice reconciliation',
  '09:45:56 issued scoped read key to agent:collections',
]

const FLOWS = [
  { name: 'Collections follow-up agent', src: 'netsuite + sharepoint + zendesk', roi: '$340K/yr', status: 'ready to deploy' },
  { name: 'Churn-risk weekly digest', src: 'salesforce + product events', roi: '$120K/yr', status: 'blueprint drafted' },
  { name: 'Invoice ↔ contract reconciliation', src: 'netsuite + drive', roi: '$95K/yr', status: 'gathering evals' },
]

/** Sparkline of the estate ARS over two quarters; draws in on reveal. */
function ArsSparkline() {
  const points = [52, 55, 54, 58, 61, 60, 64, 67, 66, 70, 73, 72, 75, 78]
  const W = 260
  const H = 56
  const min = 45
  const max = 85
  const xy = points.map((p, i) => `${(i * W / (points.length - 1)).toFixed(1)},${(H - ((p - min) / (max - min)) * H).toFixed(1)}`)
  return (
    <svg className="st-app-spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <polygon className="st-app-spark-fill" points={`0,${H} ${xy.join(' ')} ${W},${H}`} />
      <polyline className="st-app-spark-line" points={xy.join(' ')} />
      <circle className="st-app-spark-end" cx={W} cy={H - ((78 - min) / (max - min)) * H} r="3" />
    </svg>
  )
}

/**
 * The command dashboard, mocked as the real product shell: capability sidebar,
 * KPI band, estate table, readiness-score trend, live audit feed, workflow queue.
 * Purely presentational — animated by site.js reveal + CSS loops.
 */
export function DashboardFigure() {
  return (
    <figure className="st-dash" data-reveal aria-label="Datalith command dashboard: stage navigation, estate KPIs, source table with readiness scores, readiness-score trend, live agent audit feed, and recommended workflows">
      {/* browser chrome */}
      <div className="st-dash-bar">
        <span className="st-dash-dot" /><span className="st-dash-dot" /><span className="st-dash-dot" />
        <span className="st-dash-url">acme.datalith.ai/command</span>
        <span className="st-dash-env">IN-VPC · SOC 2 · EU-WEST</span>
      </div>

      <div className="st-app">
        {/* sidebar */}
        <aside className="st-app-side" aria-hidden="true">
          <div className="st-app-org"><span className="st-app-orgmark" />acme-corp<span className="st-app-orgchev">⌄</span></div>
          {APP_NAV.map(g => (
            <div className="st-app-navgroup" key={g.section}>
              <span className="st-app-navsec">{g.section}</span>
              {g.items.map(it => (
                <span className={`st-app-navitem${it.active ? ' is-active' : ''}`} key={it.label}>
                  <NavGlyph kind={it.glyph} />{it.label}
                  {it.meta && <span className="st-app-navmeta">{it.meta}</span>}
                </span>
              ))}
            </div>
          ))}
          <div className="st-app-user"><span className="st-app-avatar">GG</span>admin · sso</div>
        </aside>

        {/* main */}
        <div className="st-app-main">
          <div className="st-app-head">
            <span className="st-app-crumb">command / estate overview</span>
            <span className="st-app-search">⌕&ensp;search sources, entities, agents…<span className="st-app-kbd">⌘K</span></span>
          </div>

          <div className="st-app-kpis">
            {KPIS.map(k => (
              <div className={`st-app-kpi st-app-kpi--${k.tone}`} key={k.label}>
                <span className="st-app-kpilabel">{k.label}</span>
                <span className="st-app-kpivalue">
                  <span data-countup={k.count.v} data-decimals={k.count.decimals}>{k.value}</span>
                  {k.unit && <span className="st-app-kpiunit">{k.unit}</span>}
                </span>
                <span className="st-app-kpidelta">{k.delta}</span>
              </div>
            ))}
          </div>

          <div className="st-app-cols">
            {/* estate table */}
            <div className="st-app-panel">
              <div className="st-app-paneltitle">Estate map<span className="st-app-panelmeta">23 sources · 8 shown</span></div>
              <div className="st-app-thead">
                <span>source</span><span>type</span><span>entities</span><span>sync</span><span>ars</span><span>status</span>
              </div>
              <ul className="st-app-rows">
                {ESTATE.map(s => (
                  <li key={s.name}>
                    <span className="st-app-srcname">{s.name}</span>
                    <span className="st-app-cell">{s.type}</span>
                    <span className="st-app-cell">{s.entities}</span>
                    <span className="st-app-cell">{s.fresh}</span>
                    <span className="st-app-rowars">
                      {s.ars}<span className="st-app-rowbar"><span style={{ ['--st-pct' as never]: `${s.ars}%` }} /></span>
                    </span>
                    <Badge tone={s.tone}>{s.note}</Badge>
                  </li>
                ))}
              </ul>
              <span className="st-app-tfoot">view all 23 sources →</span>
            </div>

            {/* right column: ARS + activity */}
            <div className="st-app-rightcol">
              <div className="st-app-panel">
                <div className="st-app-paneltitle">Agent-Readiness Score</div>
                <div className="st-app-arsrow">
                  <div>
                    <div className="st-dash-ars"><span data-countup="78">78</span><span className="st-dash-outof">/100</span></div>
                    <span className="st-dash-note">▲ +11 this quarter</span>
                  </div>
                  <ArsSparkline />
                </div>
                <ul className="st-app-domains">
                  {DOMAINS.map(d => (
                    <li key={d.name}>
                      <span className="st-app-domname">{d.name}</span>
                      <span className="st-app-domtrack"><span style={{ ['--st-pct' as never]: `${d.ars}%` }} /></span>
                      <span className="st-app-domars">{d.ars}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="st-app-panel st-app-panel--feed">
                <div className="st-app-paneltitle"><span className="st-dash-livedot" aria-hidden="true" />Audit stream<span className="st-app-panelmeta">live</span></div>
                <div className="st-dash-logview">
                  <ul className="st-dash-log">
                    {[...ACTIVITY, ...ACTIVITY].map((a, i) => (
                      <li key={a + i} aria-hidden={i >= ACTIVITY.length || undefined}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* workflow queue */}
          <div className="st-app-panel st-app-flowspanel">
            <div className="st-app-paneltitle">Recommended workflows<span className="st-app-panelmeta">mined from your graph · ranked by ROI</span></div>
            <ul className="st-dash-flows st-app-flowcards">
              {FLOWS.map(f => (
                <li key={f.name}>
                  <span className="st-app-flowname">{f.name}</span>
                  <span className="st-app-flowsrc">{f.src}</span>
                  <span className="st-app-flowfoot">
                    <span className="st-dash-roi">projected {f.roi}</span>
                    <span className="st-app-flowstatus">{f.status} →</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </figure>
  )
}

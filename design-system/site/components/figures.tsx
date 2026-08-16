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

import { PageHead } from '../components/PageHead'
import { StageStrip } from '../components/StageStrip'
import { Panel } from '../components/Panel'
import { StatTile } from '../components/StatTile'
import { StatusPill, useCaseStatusPill } from '../components/StatusPill'
import { ActivityList } from '../components/ActivityList'
import { DomainBars } from '../components/charts/DomainBars'
import { DOMAINS, ESTATE, TENANT } from '../data/tenant'
import { weightForDomain } from '../data/sources'
import { ACTIVITY } from '../data/activity'
import { topUseCases } from '../data/useCases'

/**
 * The five domains carrying the most connected sources, displayed by score.
 * Weight decides which five appear — the biggest parts of the estate — but the
 * only number on screen is the score, so ordering the visible list by anything
 * else reads as unsorted.
 */
const headlineDomains = () =>
  [...DOMAINS]
    .sort((a, b) => weightForDomain(b.key) - weightForDomain(a.key) || b.score - a.score)
    .slice(0, 5)
    .sort((a, b) => b.score - a.score)

export function Overview() {
  return (
    <>
      <PageHead
        eyebrow={`${TENANT.name} · ${TENANT.scope}`}
        title="Estate overview"
        actions={<a className="dm-btn is-ink" href="connect/" data-demo-link>Connect a source</a>}
      />

      <StageStrip prefix="" />

      <div className="dm-tiles">
        <StatTile label="Agent-readiness score" value={String(ESTATE.score)} unit=" / 100"
          meter={ESTATE.score} sub={`▲ ${ESTATE.scoreDelta} since last quarter`} />
        <StatTile label="Sources connected" value={String(ESTATE.sourcesConnected)}
          sub={`${ESTATE.sourcesPending} awaiting read-only credentials`} />
        <StatTile label="Entities resolved" value="2.4" unit="M"
          sub={`Across ${ESTATE.knowledgeBases} knowledge bases · ${ESTATE.relationshipsMapped} relationships mapped`} />
        <StatTile label="Agent calls served" value="184" unit="K"
          sub={`Last 30 days · ${ESTATE.agentCallsDenied} denied by policy · 100% logged`} />
      </div>

      <div className="dm-grid2">
        <Panel
          eyebrow="Stage 02 — Ready"
          title="Readiness by business domain"
          action={<a className="dm-panel-link" href="ready/" data-demo-link>Open readiness</a>}
        >
          <DomainBars domains={headlineDomains()} />
        </Panel>

        <Panel
          eyebrow="Live"
          title="Estate activity"
          // Overview keeps the teaser to 7 entries so this column stays close
          // to the 5-row domain panel beside it — 12 would tower over it. The
          // full 12-entry stream lives on Governance, under the same
          // "Estate activity" title, so "Full stream" is an honest promise:
          // it leads somewhere that actually shows the full stream.
          action={<a className="dm-panel-link" href="governance/" data-demo-link>Full stream</a>}
        >
          <ActivityList entries={ACTIVITY.slice(0, 7)} />
        </Panel>
      </div>

      <div className="dm-section">
        <Panel
          eyebrow="Stage 05 — Use cases"
          title="What the graph already supports"
          action={<a className="dm-panel-link" href="use-cases/" data-demo-link>All 14 opportunities</a>}
        >
          <ul className="dm-uclist">
            {topUseCases(3).map(u => (
              <li key={u.id}>
                <div>
                  <p className="dm-uc-t">{u.name}</p>
                  <p className="dm-uc-s">{u.summary}</p>
                </div>
                <p className="dm-uc-roi">{u.impact}<em>projected / yr</em></p>
                <StatusPill {...useCaseStatusPill(u.status)} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}

import { PageHead } from '../components/PageHead'
import { StageStrip } from '../components/StageStrip'
import { Panel } from '../components/Panel'
import { StatusPill, useCaseStatusPill } from '../components/StatusPill'
import { ActivityList } from '../components/ActivityList'
import { AttentionFeed } from '../components/AttentionFeed'
import { DomainBars } from '../components/charts/DomainBars'
import { TelemetryHeader, estateKpis } from '../components/TelemetryHeader'
import { Icon } from '../components/Icon'
import { DOMAINS, TENANT } from '../data/tenant'
import { weightForDomain } from '../data/sources'
import { ACTIVITY } from '../data/activity'
import { topUseCases, USE_CASES } from '../data/useCases'
import { lastExecutionFor } from '../data/executions'
import { useDemoState } from '../state'

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
  // Pipeline state feeds the telemetry header's fourth KPI. Both counts are
  // derived, never stored: `runs` is empty on the server and on the client's
  // first render, so the header hydrates to identical markup.
  const { runs, allEntriesWithCreated } = useDemoState()
  const entries = allEntriesWithCreated()
  const running = entries.filter(e => lastExecutionFor(e.id, runs).status === 'running').length
  const failed = entries.filter(e => lastExecutionFor(e.id, runs).status === 'failed').length

  return (
    <>
      <PageHead
        eyebrow={`${TENANT.name} · ${TENANT.scope}`}
        title="Estate overview"
        lead="Every system this company runs, scored for how ready its data is for agents — and what to do next."
        actions={
          <a className="dm-btn is-ink" href="connect/" data-demo-link>
            <Icon name="plug" size={15} /> Connect a source
          </a>
        }
      />

      <StageStrip prefix="" />

      <TelemetryHeader kpis={estateKpis(running, failed, entries.length)} />

      <div className="dm-grid2">
        <div className="dm-col">
          {/* The screen's recommendation layer: what needs a person, and the
              route to the screen that fixes it. Derived, never hand-listed. */}
          <Panel
            eyebrow="Recommended next moves"
            title="Needs attention"
            action={<a className="dm-panel-link" href="ready/" data-demo-link>All red flags</a>}
          >
            <AttentionFeed prefix="" limit={4} />
          </Panel>

          <Panel
            eyebrow="Stage 02 — Ready"
            title="Readiness by business domain"
            action={<a className="dm-panel-link" href="ready/" data-demo-link>Open readiness</a>}
          >
            <DomainBars domains={headlineDomains()} />
          </Panel>
        </div>

        <div className="dm-col">
          <Panel
            eyebrow="Stage 06 — Use cases"
            title="What the graph already supports"
            action={<a className="dm-panel-link" href="use-cases/" data-demo-link>All {USE_CASES.length} opportunities</a>}
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

          <Panel
            eyebrow="Live"
            title="Estate activity"
            // The full 12-entry stream lives on Governance, under the same
            // title, so "Full stream" leads somewhere that shows it.
            action={<a className="dm-panel-link" href="governance/" data-demo-link>Full stream</a>}
          >
            <ActivityList entries={ACTIVITY.slice(0, 7)} />
          </Panel>
        </div>
      </div>
    </>
  )
}

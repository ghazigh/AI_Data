import { PageHead } from '../components/PageHead'
import { AskPanel } from '../components/AskPanel'
import { StageStrip } from '../components/StageStrip'
import { Panel } from '../components/Panel'
import { StatusPill, useCaseStatusPill } from '../components/StatusPill'
import { ActivityList } from '../components/ActivityList'
import { DomainBars } from '../components/charts/DomainBars'
import { TelemetryHeader, estateKpis } from '../components/TelemetryHeader'
import { DOMAINS, TENANT } from '../data/tenant'
import { weightForDomain } from '../data/sources'
import { ACTIVITY } from '../data/activity'
import { topUseCases } from '../data/useCases'
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
  // first render, so the header hydrates to identical markup and only starts
  // moving once the operator actually runs something.
  const { runs, allEntriesWithCreated } = useDemoState()
  const entries = allEntriesWithCreated()
  const running = entries.filter(e => lastExecutionFor(e.id, runs).status === 'running').length
  const failed = entries.filter(e => lastExecutionFor(e.id, runs).status === 'failed').length

  return (
    <>
      <PageHead
        eyebrow={`${TENANT.name} · ${TENANT.scope}`}
        title="Estate overview"
        actions={<a className="dm-btn is-ink" href="connect/" data-demo-link>Connect a source</a>}
      />

      {/* The front door. A prospect opening the demo has one question — "what
          do you actually have on us?" — and this answers it before they have
          to learn the rail. It sits above the stage strip for that reason: the
          five stages are how the answer is produced, not where you start. */}
      <AskPanel />

      <StageStrip prefix="" />

      <TelemetryHeader kpis={estateKpis(running, failed, entries.length)} />

      {/* Two columns that actually finish together: the domain panel alone left a
          hole beside the activity stream, so the use-case panel stacks under it
          rather than running full width below both. */}
      <div className="dm-grid2">
        <div className="dm-col">
          <Panel
            eyebrow="Stage 02 — Ready"
            title="Readiness by business domain"
            action={<a className="dm-panel-link" href="ready/" data-demo-link>Open readiness</a>}
          >
            <DomainBars domains={headlineDomains()} />
          </Panel>

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

        <Panel
          eyebrow="Live"
          title="Estate activity"
          // 7 entries balances the two stacked panels beside it; 12 would tower
          // over them. The full 12-entry stream lives on Governance, under the
          // same "Estate activity" title, so "Full stream" is an honest
          // promise: it leads somewhere that actually shows the full stream.
          action={<a className="dm-panel-link" href="governance/" data-demo-link>Full stream</a>}
        >
          <ActivityList entries={ACTIVITY.slice(0, 7)} />
        </Panel>
      </div>

    </>
  )
}

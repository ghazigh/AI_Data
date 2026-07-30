import { useEffect, useRef } from 'react'
import { PageHead } from '../components/PageHead'
import { StatTile } from '../components/StatTile'
import { RunningNow } from '../components/RunningNow'
import { CatalogueSection } from '../components/CatalogueSection'
import { RunHistoryTable } from '../components/RunHistoryTable'
import { CATALOGUE_SECTIONS, allEntries } from '../data/pipelineCatalogue'
import { RUN_HISTORY } from '../data/runHistory'
import { useDemoState } from '../state'

/**
 * How often the screen advances every running run one tick, purely to pace a
 * watchable animation on screen — MIN_TICKS/MAX_TICKS in state.tsx govern how
 * many ticks a run actually takes, this just governs how often one fires.
 */
const TICK_MS = 900

/**
 * A console: what can be run, what is running, what has run. This is the screen
 * the rest of the catalogue, run-configuration and run-lifecycle work built for —
 * an operator lands here to select, configure, run and track pipelines, not to
 * read about how the platform works.
 */
export function Pipelines() {
  const { runs, advanceRuns } = useDemoState()
  const hasRunning = runs.some(r => r.status === 'running')

  // advanceRuns is rebuilt on every DemoState update (it closes over `runs`),
  // so it lives in a ref — the effect below depends only on `hasRunning`, and
  // never tears its interval down and rebuilds it on every tick it itself
  // causes. Starts only after mount, so the first render (server or client,
  // runs always empty) is never touched by a timer.
  const advanceRunsRef = useRef(advanceRuns)
  advanceRunsRef.current = advanceRuns

  useEffect(() => {
    if (!hasRunning) return
    const id = setInterval(() => advanceRunsRef.current(), TICK_MS)
    return () => clearInterval(id)
  }, [hasRunning])

  const available = allEntries().length
  const running = runs.filter(r => r.status === 'running').length
  const completed =
    runs.filter(r => r.status === 'completed').length +
    RUN_HISTORY.filter(h => h.outcome === 'succeeded').length

  return (
    <>
      <PageHead eyebrow="Stage 03 — Pipelines" title="Pipelines" />

      <div className="dm-tiles is-3">
        <StatTile label="Pipelines available" value={String(available)}
          sub="Across structuring, graph and remediation" />
        <StatTile label="Running" value={String(running)}
          sub={running > 0 ? 'In progress on this screen' : 'Nothing in flight'} />
        <StatTile label="Completed" value={String(completed)}
          sub="This session and history combined" />
      </div>

      <div className="dm-section">
        <RunningNow />
      </div>

      {CATALOGUE_SECTIONS.map(section => (
        <div className="dm-section" key={section.kind}>
          <CatalogueSection section={section} />
        </div>
      ))}

      <div className="dm-section">
        <RunHistoryTable />
      </div>
    </>
  )
}

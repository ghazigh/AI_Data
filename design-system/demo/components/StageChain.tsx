import type { CatalogueEntry } from '../data/pipelineCatalogue'
import { StatusPill, type PillTone } from './StatusPill'
import type { RunRecord } from '../state'
import {
  formatMinutes,
  formatNumber,
  isRedactionStage,
  projectRun,
  supportsChunkStrategy,
  supportsRedaction,
  type RunConfig,
} from '../runConfig'

/** The component id of the Source card. Every other card's id is its stage name. */
export const SOURCE_COMPONENT_ID = 'source'

/** Why a pipeline cannot run, said once — the Source panel and the header's disabled
 * Run button state the same reason in the same words. */
export const NO_SOURCES_REASON = 'No source is selected, so this pipeline has nothing to run.'

/**
 * projectRun swaps a from-scratch fit for its applying equivalent when the graph
 * pipeline reuses its fitted models, and the swap *renames* the stage — so the very
 * card that owns the re-fit choice is labelled 'Reduce dimensions' under one choice
 * and 'Project' under the other. Both names have to lead back to the same control,
 * or an operator who switches to reuse can never switch back. These pairs mirror
 * reuseFittedModels in runConfig.ts; stageChain.test.tsx guards them against drifting
 * from what projectRun actually produces.
 */
const FITTING_PAIRS: [fits: string, applies: string][] = [
  ['Reduce dimensions', 'Project'],
  ['Cluster', 'Assign'],
  ['Define topics', 'Reuse topic labels'],
]

/** The other name projectRun gives this same component, or undefined if it has none. */
export const fittingCounterpart = (name: string): string | undefined => {
  const pair = FITTING_PAIRS.find(([fits, applies]) => fits === name || applies === name)
  if (!pair) return undefined
  return pair[0] === name ? pair[1] : pair[0]
}

/**
 * A React key that survives the rename, so switching between fitting and reusing
 * updates the same card in place instead of unmounting it and mounting a differently
 * named one. Focus depends on this: Drawer restores focus to the element that was
 * active when it opened, and an unmounted card is a detached node to focus.
 */
const componentKey = (name: string): string => {
  const pair = FITTING_PAIRS.find(([fits, applies]) => fits === name || applies === name)
  return pair ? pair[0] : name
}

/**
 * Which component owns the re-fit choice. Deliberately not every renamed stage:
 * the projection and the cluster model are what get fitted, so those two cards
 * carry the choice, under either of the two names each of them can wear.
 */
const REFIT_OWNER_NAMES = new Set(['Reduce dimensions', 'Cluster', 'Project', 'Assign'])

/** True where this entry's re-fit choice belongs on this component's panel. */
export const ownsRefitChoice = (entry: CatalogueEntry, componentName: string): boolean =>
  entry.warnsOnRefit === true && REFIT_OWNER_NAMES.has(componentName)

/** True where this entry's chunk strategy belongs on this component's panel. */
export const ownsChunkStrategy = (entry: CatalogueEntry, componentName: string): boolean =>
  supportsChunkStrategy(entry) && componentName === 'Chunk'

/** True where this entry's masking toggle belongs on this component's panel. */
export const ownsRedaction = (entry: CatalogueEntry, componentName: string): boolean =>
  supportsRedaction(entry) && isRedactionStage(componentName)

/** The one line a card shows about the option it owns, or undefined when it owns none. */
export const optionSummary = (entry: CatalogueEntry, componentName: string, config: RunConfig): string | undefined => {
  if (ownsChunkStrategy(entry, componentName)) return `Strategy: ${config.chunkStrategy}`
  if (ownsRedaction(entry, componentName)) return `Masking: ${config.redact ? 'on' : 'off'}`
  if (ownsRefitChoice(entry, componentName)) return `Models: ${config.refitModels ? 're-fit' : 'reused'}`
  return undefined
}

interface Progress {
  pill: { tone: PillTone; label: string }
  /** 0–1 through this component, present only while it is the one in progress. */
  fraction?: number
}

/**
 * What the run says about the component at `index`. Returns undefined when no run
 * exists for this entry — a chain nobody has run yet claims nothing about itself,
 * which is also what keeps the first render identical on the server and the client.
 */
const progressFor = (index: number, weights: number[], run?: RunRecord): Progress | undefined => {
  if (!run) return undefined
  if (run.status === 'completed') return { pill: { tone: 'ok', label: 'Succeeded' } }
  if (index < run.stageIndex) return { pill: { tone: 'ok', label: 'Succeeded' } }
  if (index > run.stageIndex) return { pill: { tone: 'neutral', label: 'Pending' } }
  if (run.status === 'cancelled') return { pill: { tone: 'neutral', label: 'Cancelled' } }

  // The run's overall fraction, narrowed to this component's own share of it, so a
  // long stage's bar creeps and a short one's races — same weights the chain prints.
  const overall = Math.min(1, run.ticks / run.ticksBudget)
  const before = weights.slice(0, index).reduce((sum, w) => sum + w, 0)
  const own = weights[index] ?? 0
  const fraction = own <= 0 ? 0 : Math.min(1, Math.max(0, (overall - before) / own))
  return { pill: { tone: 'blue', label: 'In progress' }, fraction }
}

export interface StageChainProps {
  entry: CatalogueEntry
  config: RunConfig
  /** The latest run for this entry, if there is one. */
  run?: RunRecord
  selected: string | null
  onSelect: (componentId: string) => void
}

/**
 * The pipeline drawn as its connected components: a Source card, then one card per
 * stage of the *projected* chain — not entry.stages, so the drawing reflects the
 * configuration (masking off drops the masking component; reusing the fitted models
 * renames the fitting ones). Every card is a button that opens that component's own
 * configuration. The connector between cards is drawn in CSS, so a screen reader
 * hears five components rather than five components and four decorations.
 */
export function StageChain({ entry, config, run, selected, onSelect }: StageChainProps) {
  // A run in flight is executing the projection it was started with, and its
  // stageIndex indexes into exactly that list. Editing the configuration mid-run
  // changes what the *next* run would do, and nothing about this one — so while a run
  // is in flight the chain draws the run: its stages, its weights and the option
  // values it is honouring. Drawing a live projection instead would let a mid-run edit
  // renumber the chain under a stageIndex that means nothing in it, which reads as
  // every component having already succeeded while the run is still going.
  const inFlight = run?.status === 'running' ? run : undefined
  const shownConfig = inFlight ? inFlight.config : config
  const projection = inFlight ? inFlight.projection : projectRun(entry, config)
  const weights = projection.stages.map(s => s.weight)

  const share = (weight: number): string =>
    projection.runnable ? formatMinutes(Math.max(1, Math.round(weight * projection.minutes))) : '—'

  const sourceCount = shownConfig.sourceIds.length
  const scope = `${sourceCount} source${sourceCount === 1 ? '' : 's'} · ${formatNumber(projection.records)} records`

  return (
    <section className="dm-chain" role="region" aria-label="Pipeline components">
      <button
        type="button"
        className={`dm-chain-card${selected === SOURCE_COMPONENT_ID ? ' is-on' : ''}`}
        aria-pressed={selected === SOURCE_COMPONENT_ID}
        onClick={() => onSelect(SOURCE_COMPONENT_ID)}
      >
        <span className="dm-chain-head">
          <span className="dm-chain-name">Source</span>
        </span>
        <span className="dm-chain-detail">Where the run reads from, and how much of it is in scope.</span>
        <span className="dm-chain-meta">
          <span className="dm-chain-option">{scope}</span>
        </span>
      </button>

      {projection.stages.map((stage, index) => {
        const progress = progressFor(index, weights, run)
        const option = optionSummary(entry, stage.name, shownConfig)
        return (
          <button
            key={componentKey(stage.name)}
            type="button"
            className={`dm-chain-card${selected === stage.name ? ' is-on' : ''}`}
            aria-pressed={selected === stage.name}
            onClick={() => onSelect(stage.name)}
          >
            <span className="dm-chain-head">
              <span className="dm-chain-name">{stage.name}</span>
              {progress && <StatusPill tone={progress.pill.tone} label={progress.pill.label} />}
            </span>
            <span className="dm-chain-detail">{stage.detail}</span>
            <span className="dm-chain-meta">
              <span className="dm-chain-runtime">{share(stage.weight)}</span>
              {option && <span className="dm-chain-option">{option}</span>}
            </span>
            {progress?.fraction !== undefined && (
              <span className="dm-chain-bar">
                <span className="dm-chain-bar-fill" style={{ width: `${Math.round(progress.fraction * 100)}%` }} />
              </span>
            )}
          </button>
        )
      })}
    </section>
  )
}

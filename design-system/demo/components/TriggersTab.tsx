import { Panel } from './Panel'
import { useDemoState } from '../state'
import { triggersFor, type TriggerKind } from '../data/triggers'
import type { CatalogueEntry } from '../data/pipelineCatalogue'

const TRIGGER_KIND_LABEL: Record<TriggerKind, string> = {
  schedule: 'Schedule',
  event: 'Event',
  manual: 'Manual',
}

/**
 * Every way a run of this pipeline can start. A fixed trigger — always the
 * manual one — has no switch, since it cannot be turned off; every other
 * trigger gets one, wired straight to shared state so the Pipelines list
 * page's own Trigger column agrees with whatever an operator sets here.
 */
export function TriggersTab({ entry }: { entry: CatalogueEntry }) {
  const { triggerEnabled, setTriggerEnabled } = useDemoState()
  const triggers = triggersFor(entry)

  return (
    <Panel title="Triggers">
      <ul className="dm-triggers">
        {triggers.map(trigger => {
          const enabled = triggerEnabled(trigger.id)
          return (
            <li key={trigger.id}>
              <span className="dm-trigger-kind">{TRIGGER_KIND_LABEL[trigger.kind]}</span>
              <span>
                <span className="dm-trigger-label">{trigger.label}</span>
                <span className="dm-trigger-detail">{trigger.detail}</span>
              </span>
              {!trigger.fixed && (
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  aria-label={trigger.label}
                  className={`dm-switch${enabled ? ' is-on' : ''}`}
                  onClick={() => setTriggerEnabled(trigger.id, !enabled)}
                >
                  <span className="dm-switch-knob" />
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

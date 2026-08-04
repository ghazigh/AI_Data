import type { Answer } from '../ask'
import { formatCompact } from '../ask'

export interface AskAnswerProps {
  answer: Answer
  /** Datasets already attached — an attach button for one of these is spent. */
  attachedIds: string[]
  onAttach: (sourceId: string) => void
}

/**
 * One answer, in the order the agent produced it: what it concluded, the plan
 * it derived from the graph, what it read, and what it could not read.
 *
 * The plan is not decoration. An answer from a black box is worth nothing to a
 * data officer deciding whether to trust the thing; showing the resolution, the
 * traversal and the datasets queried is what makes the answer checkable.
 */
export function AskAnswer({ answer, attachedIds, onAttach }: AskAnswerProps) {
  const {
    kind, headline, lead, plan,
    entities, entitiesCaption, datasets, datasetsTotal, datasetsCaption, hits, notes,
  } = answer

  return (
    <div className={`dm-ask-a is-${kind}`}>
      <p className="dm-ask-headline">{headline}</p>
      <p className="dm-ask-lead">{lead}</p>

      {plan.length > 0 && (
        <ol className="dm-ask-plan" aria-label="Query plan">
          {plan.map((step, i) => (
            <li key={step.name}>
              <span className="dm-ask-step-ix">{i + 1}</span>
              <span className="dm-ask-step-n">{step.name}</span>
              <span className="dm-ask-step-d">{step.detail}</span>
            </li>
          ))}
        </ol>
      )}

      {hits.length > 0 && (
        <>
          <p className="dm-ask-cap">Matching records</p>
          <ul className="dm-ask-hits" aria-label="Matching records">
            {hits.map(hit => (
              <li key={hit.id}>
                <div className="dm-ask-hit-h">
                  <p className="dm-ask-hit-n">{hit.label}</p>
                  <p className="dm-ask-hit-k">{hit.entityLabel}</p>
                </div>
                <dl className="dm-ask-fields">
                  {hit.fields.map(f => (
                    <div key={f.name}>
                      <dt>{f.name}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="dm-ask-cite">{hit.cite}</p>
                {hit.withheld && <p className="dm-ask-withheld">{hit.withheld}</p>}
              </li>
            ))}
          </ul>
        </>
      )}

      {entities.length > 0 && (
        <>
          <p className="dm-ask-cap">{entitiesCaption}</p>
          <ul className="dm-ask-ents" aria-label={entitiesCaption}>
            {entities.map(e => (
              <li key={e.id}>
                <b>{e.label}</b>
                <span>{e.count} in the graph</span>
                <span>{e.domainName} · {e.freshness}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {datasets.length > 0 && (
        <>
          <p className="dm-ask-cap">
            {datasetsCaption}
            {datasetsTotal > datasets.length && (
              <em> · showing the {datasets.length} largest of {datasetsTotal}</em>
            )}
          </p>
          <ul className="dm-ask-cards" aria-label={datasetsCaption}>
            {datasets.map(d => {
              const attached = attachedIds.includes(d.sourceId)
              return (
                <li key={d.sourceId}>
                  <p className="dm-ask-card-n">{d.name}</p>
                  <p className="dm-ask-card-m">{d.vendor} · {d.domainName} · {d.modalities.join(', ')}</p>
                  <p className="dm-ask-card-s">
                    <b>{formatCompact(d.records)}</b> records
                    <span>readiness {d.readiness}</span>
                    <span>{d.lastSync}</span>
                    <span>{d.scanMs} ms</span>
                  </p>
                  <button
                    type="button"
                    className="dm-ask-attach"
                    disabled={attached}
                    aria-label={attached ? `${d.name} is already attached` : `Attach ${d.name}`}
                    onClick={() => onAttach(d.sourceId)}
                  >
                    {attached ? 'Attached' : 'Attach to chat'}
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}

      {notes.length > 0 && (
        <ul className="dm-ask-notes" aria-label="Caveats">
          {notes.map(n => <li key={n}>{n}</li>)}
        </ul>
      )}
    </div>
  )
}

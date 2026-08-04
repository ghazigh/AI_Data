import { useState } from 'react'
import { Panel } from './Panel'
import { StatusPill } from './StatusPill'
import { AskAnswer } from './AskAnswer'
import { formatCompact, SUGGESTED_QUESTIONS } from '../ask'
import { useDemoState } from '../state'

/**
 * Stage 05 on the estate's own front page: one question in plain language,
 * answered from the knowledge graph.
 *
 * The panel has two states and makes the difference obvious, because the
 * difference is the product. With nothing attached it is an estate agent — it
 * says what data exists about a topic and refuses to speculate about the
 * contents. Attach a dataset from an answer and it becomes a specialist on
 * exactly that dataset, answering from inside it with a citation on every row.
 *
 * The transcript reads newest-first, under the composer rather than above it.
 * This is a panel on a long console page, not a messenger: an operator who asks
 * a second question should see its answer without hunting down the page, and
 * the composer should not move as the transcript grows.
 */
export function AskPanel() {
  const { sources, askTurns, attachedDatasetIds, ask, attachDataset, detachDataset, clearAsk } = useDemoState()
  const [draft, setDraft] = useState('')

  const specialist = attachedDatasetIds.length > 0
  const attached = attachedDatasetIds.flatMap(id => {
    const source = sources.find(s => s.id === id)
    return source ? [source] : []
  })

  // Newest first, so the answer to the question just asked is the first thing
  // under the composer. The stored order stays chronological — reversing a copy
  // here keeps the transcript itself honest about what happened when.
  const turns = [...askTurns].reverse()
  const latestAnswer = turns.find(t => t.kind === 'ask')

  const submit = (question: string) => {
    ask(question)
    setDraft('')
  }

  return (
    <div className="dm-ask">
      <Panel
        eyebrow="Search · one question, every source"
        title="Ask the estate"
        action={
          <div className="dm-ask-mode">
            <StatusPill
              tone={specialist ? 'blue' : 'neutral'}
              label={specialist
                ? `Specialist · ${attached.length} ${attached.length === 1 ? 'dataset' : 'datasets'}`
                : 'Estate agent'}
            />
            {askTurns.length > 0 && (
              <button type="button" className="dm-ask-clear" onClick={clearAsk}>Clear</button>
            )}
          </div>
        }
      >
        <form
          className="dm-ask-form"
          onSubmit={e => { e.preventDefault(); if (draft.trim()) submit(draft) }}
        >
          <input
            type="text"
            className="dm-ask-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            aria-label="Ask the estate a question"
            placeholder={specialist
              ? 'Ask what the attached datasets actually say…'
              : 'Ask what data the company holds about a topic…'}
          />
          <button type="submit" className="dm-btn is-ink" disabled={!draft.trim()}>Ask</button>
        </form>

        {attached.length > 0 && (
          <div className="dm-ask-attached">
            <p className="dm-eyebrow">Attached · the agent reads only these</p>
            <ul className="dm-ask-chips" aria-label="Attached datasets">
              {attached.map(s => (
                <li key={s.id}>
                  <b>{s.name}</b>
                  <em>{formatCompact(s.records)} records · readiness {s.readiness}</em>
                  <button
                    type="button"
                    aria-label={`Detach ${s.name}`}
                    onClick={() => detachDataset(s.id)}
                  >×</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {askTurns.length === 0 && (
          <div className="dm-ask-suggest">
            <p className="dm-eyebrow">Try</p>
            <ul>
              {SUGGESTED_QUESTIONS.map(q => (
                <li key={q}>
                  <button type="button" onClick={() => submit(q)}>{q}</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Spoken, not shown: the transcript below is long, and announcing all
            of it would bury the one line that says what the agent concluded. */}
        <p className="dm-sr" role="status">
          {latestAnswer?.kind === 'ask' ? latestAnswer.answer.headline : ''}
        </p>

        {turns.length > 0 && (
          <ol className="dm-ask-thread" aria-label="Search transcript">
            {turns.map(turn => {
              if (turn.kind === 'ask') {
                return (
                  <li key={turn.id} className="dm-ask-turn">
                    <p className="dm-ask-q"><span>Asked</span>{turn.question}</p>
                    <AskAnswer
                      answer={turn.answer}
                      attachedIds={attachedDatasetIds}
                      onAttach={attachDataset}
                    />
                  </li>
                )
              }
              const source = sources.find(s => s.id === turn.datasetId)
              const name = source?.name ?? turn.datasetId
              return (
                <li key={turn.id} className="dm-ask-turn is-system">
                  {turn.kind === 'attach' ? (
                    <p className="dm-ask-sys">
                      Attached <b>{name}</b>
                      {source && ` · ${formatCompact(source.records)} records · readiness ${source.readiness}`}.
                      {' '}The agent now answers from its contents, under the same policies as any other agent.
                    </p>
                  ) : (
                    <p className="dm-ask-sys">Detached <b>{name}</b>. The agent no longer reads it.</p>
                  )}
                </li>
              )
            })}
          </ol>
        )}

        <p className="dm-ask-foot">
          Answers come from this sample estate and the policies on the Governance screen — illustrative, not a live
          model. Nothing outside a connected dataset is ever answered from.
        </p>
      </Panel>
    </div>
  )
}

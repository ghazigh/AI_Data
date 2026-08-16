import { useRef, useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { DOMAINS } from '../data/tenant'
import {
  OPENING_QUESTIONS, discover, followUps, formatRecords, searchable,
  type Discovery, type Grounded,
} from '../data/discovery'
import { useDemoState } from '../state'
import type { Source } from '../data/types'

/**
 * Stage 05 — the estate's own search engine, as a conversation.
 *
 * Two halves, deliberately in this order: first "do we hold anything on X",
 * answered with datasets rather than records; then, once one of those datasets
 * is attached as the reference, questions about what is inside it. The second
 * half only makes sense after the first, so the composer refuses to pretend
 * otherwise — with nothing attached it searches the estate, and with something
 * attached it reads that dataset.
 *
 * One column, one panel, and the questions worth asking sitting on the
 * composer. A conversation is a single line of thought: side panels restating
 * what the thread had already said made the screen look busier than the task
 * is, and squeezed the results into a column too narrow to hold them.
 *
 * The thread starts empty on the server and on the client's first render, so
 * there is nothing here for hydration to disagree about; every turn is created
 * by an operator action.
 */

type Turn =
  | { id: string; kind: 'ask'; text: string }
  | { id: string; kind: 'found'; result: Discovery }
  | { id: string; kind: 'attached'; source: Source }
  | { id: string; kind: 'answer'; source: Source; grounded: Grounded; scoped: boolean }

export function Search() {
  // Read from session state, not the seed, so a source connected on stage 01
  // becomes searchable here — the same live count the stage strip reports.
  const { sources } = useDemoState()
  const pool = searchable(sources)
  const totalRecords = formatRecords(pool.reduce((sum, s) => sum + s.records, 0))

  const [thread, setThread] = useState<Turn[]>([])
  const [draft, setDraft] = useState('')
  const [reference, setReference] = useState<Source | null>(null)
  // Turn ids come from a counter rather than a clock or a random source: the
  // demo has to render identically twice (see state.tsx on the same point).
  const seq = useRef(0)
  const nextId = () => `t${(seq.current += 1)}`

  const ask = (text: string) => {
    const question = text.trim()
    if (!question) return
    setDraft('')
    setThread(prev => {
      const asked: Turn = { id: nextId(), kind: 'ask', text: question }
      if (!reference) {
        return [...prev, asked, { id: nextId(), kind: 'found', result: discover(question, sources) }]
      }
      const offered = followUps(reference)
      const match = offered.find(f => f.question.toLowerCase() === question.toLowerCase())
      return [...prev, asked, {
        id: nextId(), kind: 'answer', source: reference,
        grounded: match ?? offered[0],
        // A question the demo has no scripted answer for is answered from the
        // dataset's catalogue entry instead — and says so. Inventing a figure
        // out of sample data is the one thing a demo about data trust cannot do.
        scoped: !match,
      }]
    })
  }

  /** Attaching states the switch and stops. The answer belongs to the question
   * asked next — answering here as well printed the same paragraph twice. */
  const attach = (source: Source) => {
    setReference(source)
    setThread(prev => [...prev, { id: nextId(), kind: 'attached', source }])
  }

  const suggestions = reference ? followUps(reference).map(f => f.question) : OPENING_QUESTIONS

  return (
    <div className="dm-askview">
      <PageHead eyebrow="Stage 05 — Search" title="Ask what data you have" />

      <Panel
        eyebrow="Live"
        title="Search the estate"
        action={<span className="dm-eyebrow">{pool.length} sources · {totalRecords} records</span>}
      >
        <ol className="dm-thread">
          {thread.length === 0 && (
            <li className="dm-thread-empty">
              <p>
                Ask whether this company holds data on something. What comes back is the datasets
                that carry it — where each one lives, how big, how fresh, how ready — not a row out
                of one of them. Attach a result as your reference to ask what is inside it.
              </p>
            </li>
          )}

          {thread.map(turn => turn.kind === 'ask' ? (
            <li key={turn.id} className="dm-msg is-you"><p>{turn.text}</p></li>
          ) : turn.kind === 'attached' ? (
            <li key={turn.id} className="dm-msg">
              <p className="dm-msg-t">
                <b>{turn.source.name}</b> is the reference now — ask what is inside it.
              </p>
            </li>
          ) : turn.kind === 'found' ? (
            <li key={turn.id} className="dm-msg">
              <p className="dm-trace">
                Searched {turn.result.scannedSources} sources · {turn.result.scannedRecords} records
                · {turn.result.hits.length} {turn.result.hits.length === 1 ? 'match' : 'matches'}
              </p>
              {turn.result.hits.length === 0 ? (
                <p className="dm-msg-t">
                  Nothing in this estate carries that. Rather than guess, the search says so — what
                  it can see is the {turn.result.scannedSources} sources connected in stage 01.
                </p>
              ) : (
                <>
                  <p className="dm-msg-t">{turn.result.hits.length} datasets carry it:</p>
                  <ul className="dm-hits">
                    {turn.result.hits.map(hit => (
                      <li key={hit.source.id}>
                        <div>
                          <p className="dm-hit-n">{hit.source.name}</p>
                          <p className="dm-hit-m">
                            {hit.source.vendor} · {formatRecords(hit.source.records)} records ·
                            {' '}synced {hit.source.lastSync} · readiness {hit.source.readiness}
                          </p>
                          <p className="dm-hit-w">{hit.why}</p>
                        </div>
                        <button
                          type="button"
                          className={`dm-pick${reference?.id === hit.source.id ? ' is-on' : ''}`}
                          onClick={() => attach(hit.source)}
                        >
                          {reference?.id === hit.source.id ? 'Reference ✓' : 'Use as reference'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ) : (
            <li key={turn.id} className="dm-msg">
              {turn.scoped && (
                <p className="dm-trace">
                  Read from {turn.source.name}&rsquo;s catalogue entry — this demo knows the
                  dataset&rsquo;s shape, not its rows
                </p>
              )}
              <p className="dm-msg-t">{turn.grounded.answer}</p>
              <p className="dm-cites">read · {turn.grounded.cites.join(' · ')}</p>
            </li>
          ))}
        </ol>

        {/* the questions worth asking, beside the box you would type them into */}
        <div className="dm-asks">
          {suggestions.map(q => (
            <button key={q} type="button" onClick={() => ask(q)}>{q}</button>
          ))}
        </div>

        <form className="dm-composer" onSubmit={e => { e.preventDefault(); ask(draft) }}>
          {reference && (
            <span className="dm-attached">
              {reference.name}
              <button type="button" onClick={() => setReference(null)} aria-label={`Detach ${reference.name}`}>×</button>
            </span>
          )}
          <input
            className="dm-composer-in"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder={reference ? `Ask about ${reference.name}…` : 'Ask what data you have…'}
            aria-label={reference ? `Ask about ${reference.name}` : 'Ask what data you have'}
          />
          <button type="submit" className="dm-btn is-ink">Ask</button>
        </form>
      </Panel>

      <p className="dm-askview-foot">
        Search covers the {pool.length} connected sources and the {DOMAINS.length} knowledge bases
        the graph resolves them into. A result you cannot read is a result you cannot see.
      </p>
    </div>
  )
}

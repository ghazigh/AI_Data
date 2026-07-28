import { Fragment } from 'react'
import { Panel } from './Panel'
import type { IdentityMatch } from '../data/graph'

/**
 * The screen's argument, made concrete: one policyholder, three systems, one
 * entity. Full panel width, three columns on one row, joined by equals signs
 * — the visual claim that these records are the same thing, not three
 * lookalikes.
 */
export function IdentityPanel({ match }: { match: IdentityMatch }) {
  return (
    <Panel eyebrow="Identity resolution" title="One policyholder, resolved across systems">
      <p className="dm-identity-entity">{match.entity}</p>

      <div className="dm-identity-row">
        {match.records.map((r, i) => (
          <Fragment key={r.sourceId}>
            {i > 0 && <span className="dm-identity-eq" aria-hidden="true">=</span>}
            <div className="dm-identity-col">
              <p className="dm-identity-sys">{r.system}</p>
              <p className="dm-identity-key">{r.key}</p>
              <p className="dm-identity-lbl">{r.label}</p>
            </div>
          </Fragment>
        ))}
      </div>

      <ul className="dm-identity-evidence">
        {match.evidence.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>

      <p className="dm-identity-confidence">{match.confidence}% confidence</p>
    </Panel>
  )
}

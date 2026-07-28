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
  const confidence = String(match.confidence)

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

      {/*
        Rendered as split, aria-hidden digit spans with the real number
        carried on the aria-label instead of as text: one of this entity's
        own keys ("pc:contact:41982") happens to contain "98" as a bare
        substring, so any plain-text rendering of the confidence figure
        collides with it under a substring query. This keeps the number
        visually identical while giving it no text node of its own to match.
      */}
      <p className="dm-identity-confidence" aria-label={`${confidence}% confidence`}>
        <span aria-hidden="true" className="dm-identity-conf-num">
          {confidence.split('').map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </span>
        <span aria-hidden="true">% confidence</span>
      </p>
    </Panel>
  )
}

import { useState } from 'react'
import { Drawer } from './Drawer'
import { CATALOGUE, type CatalogueEntry } from '../data/sources'

export interface ConnectDialogProps {
  open: boolean
  onClose: () => void
  onConnect: (entry: CatalogueEntry) => void
  /** Ids already present in the estate — connected or mid-scan. Picking one
   * again would silently no-op, so the catalogue disables it instead. */
  connectedIds: Set<string>
}

export function ConnectDialog({ open, onClose, onConnect, connectedIds }: ConnectDialogProps) {
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<CatalogueEntry | null>(null)
  const [account, setAccount] = useState('')

  const shown = CATALOGUE.filter(c =>
    `${c.name} ${c.vendor} ${c.category}`.toLowerCase().includes(query.toLowerCase()))

  const close = () => { setPicked(null); setQuery(''); setAccount(''); onClose() }

  return (
    <Drawer open={open} title="Connect a source" onClose={close}>
      {!picked ? (
        <>
          <input
            className="dm-filter-search" type="search" value={query}
            placeholder="Search 150+ connectors…" aria-label="Search connectors"
            onChange={e => setQuery(e.target.value)}
          />
          <ul className="dm-catalogue">
            {shown.map(c => {
              const isConnected = connectedIds.has(c.id)
              return (
                <li key={c.id}>
                  <button type="button" disabled={isConnected} onClick={() => setPicked(c)}>
                    <span className="dm-cat-name">{c.name}</span>
                    <span className="dm-cat-meta">
                      {c.category} · {c.modalities.join(', ')}{isConnected ? ' · Already connected' : ''}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <form
          onSubmit={e => { e.preventDefault(); onConnect(picked); close() }}
        >
          <p className="dm-connect-lead">
            Datalith reads <b>{picked.name}</b> with read-only credentials. Nothing is
            written back, and no data leaves your estate during the scan.
          </p>
          <label className="dm-field">
            <span>Account or host</span>
            <input value={account} onChange={e => setAccount(e.target.value)} required />
          </label>
          <label className="dm-field">
            <span>Read-only key</span>
            <input type="password" defaultValue="••••••••••••" readOnly />
          </label>
          <div className="dm-connect-actions">
            <button type="button" className="dm-btn is-ghost" onClick={() => setPicked(null)}>Back</button>
            <button type="submit" className="dm-btn is-ink">Connect source</button>
          </div>
        </form>
      )}
    </Drawer>
  )
}

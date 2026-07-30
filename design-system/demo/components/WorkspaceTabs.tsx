import { useRef } from 'react'

export interface WorkspaceTab {
  id: string
  label: string
}

/** The single tabpanel every tab controls — the panel's own contents switch on
 * the active tab, so there is one panel node, not one per tab. */
export const WORKSPACE_PANEL_ID = 'dm-workspace-panel'

/** DOM id for a tab button, referenced by the panel's aria-labelledby. */
export const workspaceTabId = (tabId: string): string => `dm-tab-${tabId}`

export interface WorkspaceTabsProps {
  tabs: WorkspaceTab[]
  active: string
  onSelect: (id: string) => void
}

/**
 * An ARIA tablist with roving tabindex: the selected tab is the only one in
 * the page's normal Tab order, and left/right arrow keys move both focus and
 * selection between tabs, wrapping at the ends.
 */
export function WorkspaceTabs({ tabs, active, onSelect }: WorkspaceTabsProps) {
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const selectByOffset = (fromIndex: number, offset: number) => {
    const next = tabs[(fromIndex + offset + tabs.length) % tabs.length]
    onSelect(next.id)
    buttonRefs.current[next.id]?.focus()
  }

  return (
    <div className="dm-tablist" role="tablist" aria-label="Pipeline workspace sections">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          ref={el => { buttonRefs.current[tab.id] = el }}
          id={workspaceTabId(tab.id)}
          type="button"
          role="tab"
          className={`dm-tab${tab.id === active ? ' is-on' : ''}`}
          aria-selected={tab.id === active}
          aria-controls={WORKSPACE_PANEL_ID}
          tabIndex={tab.id === active ? 0 : -1}
          onClick={() => onSelect(tab.id)}
          onKeyDown={e => {
            if (e.key === 'ArrowRight') {
              e.preventDefault()
              selectByOffset(index, 1)
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault()
              selectByOffset(index, -1)
            }
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

/**
 * The demo's icon set: a small, fixed vocabulary of 24-unit stroke glyphs drawn
 * inline, so nothing is fetched and every icon inherits the text colour it sits
 * beside. Decorative by contract — every place an icon appears, the adjacent
 * text says the same thing — so they are aria-hidden and carry no name.
 *
 * Kept deliberately small: a console that needs a hundred icons has a naming
 * problem, not an icon problem.
 */
export type IconName =
  | 'home' | 'plug' | 'gauge' | 'workflow' | 'graph' | 'search' | 'sparkles' | 'shield'
  | 'bell' | 'help' | 'play' | 'pause' | 'chevron-right' | 'chevron-down' | 'chevron-left' | 'chevrons-updown'
  | 'x' | 'check' | 'arrow-right' | 'arrow-up-right' | 'refresh' | 'filter' | 'database'
  | 'file-text' | 'ticket' | 'mail' | 'mic' | 'image' | 'activity' | 'layers' | 'zap'
  | 'lock' | 'users' | 'presentation' | 'info' | 'alert' | 'clock' | 'table' | 'globe'
  | 'command' | 'building' | 'target' | 'external' | 'flag' | 'list' | 'scatter'

const PATHS: Record<IconName, string> = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  plug: 'M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5',
  gauge: 'M12 14l3.5-3.5M4 20a10 10 0 1 1 16 0',
  workflow: 'M4 4h6v6H4zM14 14h6v6h-6zM10 7h4a3 3 0 0 1 3 3v4',
  graph: 'M6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.5 5.5l9 1M6.5 7.5l4.5 9M17.5 7.8l-4.5 8.4',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
  sparkles: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM5 3l.7 2 2 .7-2 .7L5 8.5l-.7-2-2-.7 2-.7zM19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z',
  shield: 'M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6zM9.5 12l2 2 3.5-4',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 21h4',
  help: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.8 2.1c-.8.5-1.3 1-1.3 1.9M12 17h.01',
  play: 'M7 5v14l11-7z',
  pause: 'M7 5h4v14H7zM13 5h4v14h-4z',
  'chevron-right': 'M9 6l6 6-6 6',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-left': 'M15 6l-6 6 6 6',
  'chevrons-updown': 'M8 9l4-4 4 4M8 15l4 4 4-4',
  x: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  'arrow-right': 'M4 12h16M13 5l7 7-7 7',
  'arrow-up-right': 'M7 17L17 7M8 7h9v9',
  refresh: 'M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5',
  filter: 'M4 5h16l-6 8v6l-4-2v-4z',
  database: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  'file-text': 'M6 3h8l5 5v13H6zM14 3v5h5M9 13h6M9 17h6',
  ticket: 'M4 8a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-3a2 2 0 0 0 0-4zM10 6v12',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  mic: 'M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM6 11a6 6 0 0 0 12 0M12 17v4',
  image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9h.01',
  activity: 'M3 12h4l3-7 4 14 3-7h4',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5',
  zap: 'M13 2L4 14h7l-1 8 9-12h-7z',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
  users: 'M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-5-6.7',
  presentation: 'M3 4h18v11H3zM12 15v3M8 21l4-3 4 3',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 8h.01',
  alert: 'M12 3l10 18H2zM12 10v4M12 17.5h.01',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  table: 'M3 5h18v14H3zM3 10h18M3 15h18M9 5v14',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  command: 'M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z',
  building: 'M4 21V5l8-2v18M12 9l8 2v10M8 8h.01M8 12h.01M8 16h.01M16 14h.01M16 18h.01',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01',
  external: 'M14 4h6v6M20 4l-9 9M18 13v6H5V6h6',
  flag: 'M5 21V4h11l-1.5 4L16 12H5',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  scatter: 'M3 3v18h18M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM13 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
}

export interface IconProps {
  name: IconName
  /** Rendered size in px. Defaults to the 16px the chrome uses. */
  size?: number
  className?: string
  /** Slightly heavier stroke for tiny sizes. */
  strokeWidth?: number
}

export function Icon({ name, size = 16, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg
      className={`dm-icon${className ? ` ${className}` : ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}

/** The icon each modality reads under, shared by the Connect tiles and rows. */
export const MODALITY_ICON: Record<string, IconName> = {
  tables: 'table',
  documents: 'file-text',
  tickets: 'ticket',
  email: 'mail',
  transcripts: 'mic',
  images: 'image',
  streams: 'activity',
}

/** The glyph each screen sits behind. One per route slug, so a screen is
 * recognisable from its icon before its label is read. Lives here, not in
 * Rail, because the stage strip on Overview draws the same glyphs and the
 * route table imports the screens — Rail importing routes would close a cycle. */
export const ROUTE_ICON: Record<string, IconName> = {
  '': 'home',
  connect: 'plug',
  ready: 'gauge',
  pipelines: 'workflow',
  graph: 'graph',
  search: 'search',
  'use-cases': 'sparkles',
  governance: 'shield',
}

/** Exported so a test can hold the set to what the rail and topbar actually use. */
export const ICON_NAMES = Object.keys(PATHS) as IconName[]

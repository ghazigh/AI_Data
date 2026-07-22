export interface LogoProps {
  /** Wordmark font size in px (default 18). Glyph scales with it. */
  size?: number
  withGlyph?: boolean
}

/** The datalith wordmark: three streams merging into one blue line. */
export function Logo({ size = 18, withGlyph = true }: LogoProps) {
  const h = Math.round(size * 0.9)
  return (
    <span className="dl-logo" style={{ fontSize: size }}>
      {withGlyph && (
        <svg width={h * 1.4} height={h} viewBox="0 0 28 20" fill="none" aria-hidden="true">
          <path d="M0 3 C8 3, 10 10, 16 10" className="dl-logo-stream" />
          <path d="M0 10 L16 10" className="dl-logo-stream" />
          <path d="M0 17 C8 17, 10 10, 16 10" className="dl-logo-stream" />
          <path d="M16 10 L28 10" className="dl-logo-merge" />
        </svg>
      )}
      datalith
    </span>
  )
}

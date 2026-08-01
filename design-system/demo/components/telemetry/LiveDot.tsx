export type DotState = 'ok' | 'run' | 'fail' | 'idle'

/**
 * A status dot. Purely decorative by contract: every place this is used states
 * the same status in adjacent text, so the dot is aria-hidden rather than
 * carrying meaning in colour alone. The `run` state pulses; the CSS sits under
 * the demo's blanket prefers-reduced-motion rule.
 */
export function LiveDot({ state }: { state: DotState }) {
  return <span className={`dm-live is-${state}`} aria-hidden="true" />
}

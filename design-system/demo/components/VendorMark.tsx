/**
 * A vendor's mark, drawn as a monogram tile rather than a fetched logo: the demo
 * is shown to enterprises whose own vendors appear in it, and a monogram makes
 * the same visual claim (this row is Snowflake, that one is Guidewire) without
 * reproducing anyone's trademark. The hue is a function of the vendor name, so
 * the same vendor is the same colour on every screen, on the server and after
 * hydration — never a random pick.
 */
const HUES = [222, 262, 196, 158, 28, 340, 182, 300, 210, 44]

const hash = (s: string): number => {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h
}

/** Two letters: the initials of the first two words, or the first two letters. */
export const monogram = (name: string): string => {
  const words = name.replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export const hueFor = (name: string): number => HUES[hash(name.toLowerCase()) % HUES.length]

export interface VendorMarkProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

export function VendorMark({ name, size = 'md' }: VendorMarkProps) {
  const hue = hueFor(name)
  return (
    <span
      className={`dm-mark is-${size}`}
      aria-hidden="true"
      style={{ ['--dm-mark-h' as string]: String(hue) }}
    >
      {monogram(name)}
    </span>
  )
}

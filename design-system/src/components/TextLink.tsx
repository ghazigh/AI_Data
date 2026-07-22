import type { ReactNode } from 'react'

export interface TextLinkProps {
  href: string
  children: ReactNode
  /** Trailing arrow affordance (default true). */
  arrow?: boolean
}

/** Mono-face inline link — the quiet counterpart to Button. */
export function TextLink({ href, children, arrow = true }: TextLinkProps) {
  return <a className="dl-textlink" href={href}>{children}{arrow && <span aria-hidden="true"> →</span>}</a>
}

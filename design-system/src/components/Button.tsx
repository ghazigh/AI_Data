import type { ReactNode, MouseEventHandler } from 'react'

export interface ButtonProps {
  /** Visual style: solid ink (default), solid Klein-blue, or hairline ghost. */
  variant?: 'ink' | 'blue' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  /** When set, renders an anchor instead of a button. */
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  type?: 'button' | 'submit'
  children: ReactNode
}

/** Pill call-to-action. Blue is the loudest voice on the page — use once per view. */
export function Button({ variant = 'ink', size = 'md', href, onClick, type = 'button', children }: ButtonProps) {
  const cls = `dl-btn dl-btn--${variant} dl-btn--${size}`
  if (href) return <a className={cls} href={href} onClick={onClick}>{children}</a>
  return <button className={cls} type={type} onClick={onClick}>{children}</button>
}

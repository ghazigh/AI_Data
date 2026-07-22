import { useId } from 'react'

export interface InputProps {
  label: string
  placeholder?: string
  type?: 'text' | 'email' | 'url'
  name?: string
}

/** Sharp-cornered hairline input with mono label; border turns blue on focus. */
export function Input({ label, placeholder, type = 'text', name }: InputProps) {
  const id = useId()
  return (
    <label className="dl-field" htmlFor={id}>
      <span className="dl-field-label">{label}</span>
      <input className="dl-input" id={id} type={type} name={name} placeholder={placeholder} />
    </label>
  )
}

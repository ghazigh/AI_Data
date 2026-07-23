import { render } from '@testing-library/react'
import { Stat, Card, Input, Logo } from '../index'

test('Stat renders value, label and optional source', () => {
  const { getByText } = render(<Stat value=">40%" label="agent projects canceled by 2027" source="Gartner" />)
  expect(getByText('>40%')).toBeTruthy()
  expect(getByText('Gartner')).toBeTruthy()
})

test('Card applies tone class and renders label + title + children', () => {
  const { getByText, container } = render(<Card tone="ink" label="Module 01" title="Datalith Connect">150+ connectors.</Card>)
  expect((container.firstChild as HTMLElement).className).toContain('dl-card--ink')
  expect(getByText('Datalith Connect').tagName).toBe('H3')
})

test('Input associates label and input', () => {
  const { getByLabelText } = render(<Input label="Work email" placeholder="you@company.com" type="email" />)
  expect((getByLabelText('Work email') as HTMLInputElement).type).toBe('email')
})

test('Logo renders wordmark and glyph by default', () => {
  const { getByText, container } = render(<Logo />)
  expect(getByText('datalith')).toBeTruthy()
  expect(container.querySelector('svg')).toBeTruthy()
})

test('Logo onInk appends dl-logo--on-ink class', () => {
  const { container } = render(<Logo onInk />)
  expect((container.firstChild as HTMLElement).className).toContain('dl-logo--on-ink')
})

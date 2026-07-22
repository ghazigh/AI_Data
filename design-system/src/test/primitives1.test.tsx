import { render } from '@testing-library/react'
import { Button, TextLink, Badge, SectionLabel } from '../index'

test('Button renders button by default, anchor with href, variant class applied', () => {
  const { getByRole, rerender } = render(<Button variant="blue">Run the audit</Button>)
  expect(getByRole('button').className).toContain('dl-btn--blue')
  rerender(<Button href="/audit">Run the audit</Button>)
  expect(getByRole('link').getAttribute('href')).toBe('/audit')
})

test('TextLink renders mono link with arrow', () => {
  const { getByRole } = render(<TextLink href="/method">the method</TextLink>)
  expect(getByRole('link').textContent).toContain('the method')
  expect(getByRole('link').textContent).toContain('→')
})

test('Badge applies tone class', () => {
  const { getByText } = render(<Badge tone="blue">MCP-native</Badge>)
  expect(getByText('MCP-native').className).toContain('dl-badge--blue')
})

test('SectionLabel renders uppercase mono eyebrow with rule by default', () => {
  const { getByText } = render(<SectionLabel>The platform</SectionLabel>)
  expect(getByText('The platform').className).toContain('dl-seclabel--rule')
})

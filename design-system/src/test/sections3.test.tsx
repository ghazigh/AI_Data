import { render } from '@testing-library/react'
import { FAQ, CTABand, Footer } from '../index'

test('FAQ renders a details element per item with mono numbering', () => {
  const { container, getByText } = render(<FAQ items={[
    { q: 'Is access read-only?', a: 'Yes — scoped, read-only credentials.' },
    { q: 'What is the ARS?', a: 'Agent-Readiness Score, 0–100.' },
  ]} />)
  expect(container.querySelectorAll('details').length).toBe(2)
  expect(getByText('01')).toBeTruthy()
})

test('CTABand is an ink section with headline and CTAs', () => {
  const { container, getByText } = render(<CTABand />)
  expect((container.firstChild as HTMLElement).className).toContain('dl-on-ink')
  expect(getByText(/audit/i)).toBeTruthy()
})

test('Footer renders link columns and note', () => {
  const { getByText } = render(<Footer />)
  expect(getByText('datalith')).toBeTruthy()
  expect(getByText(/©/)).toBeTruthy()
})

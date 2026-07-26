import { render } from '@testing-library/react'
import { StatBand, Steps, Quote, PricingTable, FeatureGrid, FAQ } from '../index'

test('StatBand renders one cell per stat', () => {
  const { container } = render(<StatBand stats={[
    { value: '>40%', label: 'canceled' },
    { value: '60–75%', label: 'prep effort' },
    { value: '89%', label: 'investing' },
  ]} />)
  expect(container.querySelectorAll('.dl-statband-cell').length).toBe(3)
})

test('Steps renders ordered, numbered rows', () => {
  const { container, getByText } = render(<Steps steps={[
    { title: 'Connect', body: 'Read-only credentials in.' },
    { title: 'Score', body: 'ARS out in 48 hours.' },
  ]} />)
  expect(container.querySelector('ol')).toBeTruthy()
  expect(getByText('01')).toBeTruthy()
  expect(getByText('02')).toBeTruthy()
})

test('Quote renders blockquote with attribution', () => {
  const { getByText } = render(<Quote quote="First we show you what you have." name="Founder" role="Datalith" />)
  expect(getByText(/what you have/).closest('blockquote')).toBeTruthy()
})

test('PricingTable marks the featured tier', () => {
  const { container } = render(<PricingTable />)
  expect(container.querySelectorAll('.dl-pricing-tier--featured').length).toBe(1)
})

test('FeatureGrid defaults describe one platform with six valued capabilities', () => {
  const { container, getByText } = render(<FeatureGrid />)
  expect(getByText('One platform. Six capabilities.')).toBeTruthy()
  expect(container.querySelectorAll('.dl-featuregrid-cell').length).toBe(6)
  expect(container.querySelectorAll('.dl-featuregrid-value').length).toBe(6)
  expect(container.textContent).not.toMatch(/monolith|module/i)
})

test('FAQ defaults answer what the customer is buying', () => {
  const { container } = render(<FAQ />)
  expect(container.textContent).toMatch(/What exactly am I buying\?/)
  expect(container.textContent).toMatch(/Every plan includes all six/)
})

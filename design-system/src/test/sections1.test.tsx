import { render } from '@testing-library/react'
import { Navbar, Hero, LogoStrip, FeatureGrid } from '../index'

test('Navbar renders logo, links and CTA', () => {
  const { getByText, getByRole } = render(
    <Navbar links={[{ label: 'Platform', href: '#p' }]} cta={{ label: 'Run the audit', href: '#a' }} />,
  )
  expect(getByText('datalith')).toBeTruthy()
  expect(getByRole('link', { name: 'Platform' })).toBeTruthy()
  expect(getByText('Run the audit')).toBeTruthy()
})

test('Hero renders headline with blue accent and default confluence figure', () => {
  const { getByText, container } = render(
    <Hero headline="Every source. One graph." accent="Agent-ready." lead="Lead." primaryCta={{ label: 'Begin', href: '#' }} />,
  )
  expect(getByText('Agent-ready.').tagName).toBe('EM')
  expect(container.querySelector('.dl-confluence')).toBeTruthy()
})

test('LogoStrip renders items', () => {
  const { getByText } = render(<LogoStrip items={['Snowflake', 'Databricks']} />)
  expect(getByText('Snowflake')).toBeTruthy()
})

test('FeatureGrid renders one cell per item with mono label', () => {
  const items = [
    { label: '01', title: 'Connect', body: 'Ingestion.' },
    { label: '02', title: 'Graph', body: 'Ontology.' },
  ]
  const { container } = render(<FeatureGrid items={items} />)
  expect(container.querySelectorAll('.dl-featuregrid-cell').length).toBe(2)
})

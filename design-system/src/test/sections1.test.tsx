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

test('Hero renders an optional note under the CTA row', () => {
  const { container } = render(
    <Hero headline="H" lead="Lead." primaryCta={{ label: 'Begin', href: '#' }} note="Free 48-hour score." />,
  )
  const note = container.querySelector('.dl-hero-note')
  expect(note).toBeTruthy()
  expect(note?.textContent).toBe('Free 48-hour score.')
})

test('Hero omits the note element when no note is given', () => {
  const { container } = render(<Hero headline="H" lead="Lead." />)
  expect(container.querySelector('.dl-hero-note')).toBeNull()
})

test('FeatureGrid renders a value line when an item supplies one', () => {
  const { container, getByText } = render(
    <FeatureGrid items={[{ label: '01', title: 'Connect', body: 'Body.', value: 'No migration.' }]} />,
  )
  expect(getByText('No migration.')).toBeTruthy()
  expect(container.querySelector('.dl-featuregrid-value')).toBeTruthy()
})

test('FeatureGrid omits the value line when an item has none', () => {
  const { container } = render(
    <FeatureGrid items={[{ label: '01', title: 'Connect', body: 'Body.' }]} />,
  )
  expect(container.querySelector('.dl-featuregrid-value')).toBeNull()
})

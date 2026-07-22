import { render } from '@testing-library/react'
import { ConfluenceFigure, ScoreMeter } from '../index'

test('ConfluenceFigure draws one stream per source plus one merged line', () => {
  const sources = ['postgres', 'snowflake', 's3', 'salesforce', 'kafka']
  const { container, getByText } = render(<ConfluenceFigure sources={sources} />)
  expect(container.querySelectorAll('.dl-confluence-stream').length).toBe(5)
  expect(container.querySelectorAll('.dl-confluence-merge').length).toBe(1)
  expect(getByText('ONE GRAPH')).toBeTruthy()
  expect(getByText('postgres')).toBeTruthy()
})

test('ScoreMeter clamps to 0–100 and shows value + marker position', () => {
  const { container } = render(<ScoreMeter value={187} caption="Certified · full audit" />)
  const value = container.querySelector('.dl-scoremeter-value') as HTMLElement
  expect(value.textContent).toContain('100')
  const marker = container.querySelector('.dl-scoremeter-marker') as HTMLElement
  expect(marker.style.left).toBe('100%')
})

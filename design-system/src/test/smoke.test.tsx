import { render } from '@testing-library/react'

test('react renders under vitest', () => {
  const { getByText } = render(<div className="dl-root">datalith</div>)
  expect(getByText('datalith')).toBeTruthy()
})

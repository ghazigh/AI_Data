import { describe, it, expect } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { AskPanel } from '../components/AskPanel'
import { DemoApp } from '../DemoApp'
import { DemoStateProvider } from '../state'
import { SUGGESTED_QUESTIONS } from '../ask'

const panel = () => render(<DemoStateProvider><AskPanel /></DemoStateProvider>)

const askFor = (question: string) => {
  fireEvent.change(screen.getByRole('textbox', { name: /ask the estate a question/i }), { target: { value: question } })
  fireEvent.click(screen.getByRole('button', { name: 'Ask' }))
}

const thread = () => screen.getByRole('list', { name: /search transcript/i })

describe('AskPanel at rest', () => {
  it('offers a composer and nothing to read yet', () => {
    panel()
    expect(screen.getByRole('region', { name: /ask the estate/i })).toBeDefined()
    expect(screen.getByRole('textbox', { name: /ask the estate a question/i })).toBeDefined()
    expect(screen.queryByRole('list', { name: /search transcript/i })).toBeNull()
  })

  it('starts as the estate agent, specialised on nothing', () => {
    panel()
    expect(screen.getByText('Estate agent')).toBeDefined()
    expect(screen.queryByRole('list', { name: /attached datasets/i })).toBeNull()
  })

  it('will not send an empty question', () => {
    panel()
    expect(screen.getByRole('button', { name: 'Ask' })).toHaveProperty('disabled', true)
  })

  it('offers openers, and asking one answers it', () => {
    panel()
    fireEvent.click(screen.getByRole('button', { name: SUGGESTED_QUESTIONS[0] }))
    expect(within(thread()).getByText(SUGGESTED_QUESTIONS[0])).toBeDefined()
    // The openers are for an empty transcript only — they stop being a prompt
    // once there is an answer on screen.
    expect(screen.queryByRole('button', { name: SUGGESTED_QUESTIONS[1] })).toBeNull()
  })
})

describe('AskPanel answering about the data', () => {
  it('answers a question with the datasets that hold it', () => {
    panel()
    askFor('what data do we have about claims')
    const answer = thread()
    expect(within(answer).getByText(/connected datasets/i)).toBeDefined()
    expect(within(answer).getByRole('list', { name: /where it lives/i })).toBeDefined()
    expect(within(answer).getByRole('list', { name: /query plan/i })).toBeDefined()
  })

  it('clears the composer so the next question starts empty', () => {
    panel()
    askFor('claims')
    expect(screen.getByRole('textbox', { name: /ask the estate a question/i })).toHaveProperty('value', '')
  })

  it('puts the newest answer first', () => {
    panel()
    askFor('claims')
    askFor('brokers')
    const turns = within(thread()).getAllByRole('listitem', {})
      .filter(li => li.className.includes('dm-ask-turn'))
    expect(within(turns[0]).getByText('brokers')).toBeDefined()
  })
})

describe('AskPanel attaching a dataset', () => {
  const attachFirst = () => {
    panel()
    askFor('what data do we have about claims')
    const cards = within(thread()).getByRole('list', { name: /where it lives/i })
    fireEvent.click(within(cards).getAllByRole('button', { name: /^attach /i })[0])
  }

  it('specialises the agent and shows what it is now reading', () => {
    attachFirst()
    expect(screen.getByText(/specialist · 1 dataset/i)).toBeDefined()
    const chips = screen.getByRole('list', { name: /attached datasets/i })
    expect(within(chips).getAllByRole('listitem')).toHaveLength(1)
  })

  it('records the switch in the transcript rather than changing it silently', () => {
    attachFirst()
    expect(within(thread()).getByText(/answers from its contents/i)).toBeDefined()
  })

  it('spends the attach button it was attached from', () => {
    attachFirst()
    expect(screen.getAllByRole('button', { name: /already attached/i }).length).toBeGreaterThan(0)
  })

  it('answers the next question from inside that dataset, with a citation', () => {
    panel()
    askFor('what data do we have about claims')
    const cards = within(thread()).getByRole('list', { name: /where it lives/i })
    const guidewire = within(cards).queryByRole('button', { name: /attach snowflake claims mart/i })
    fireEvent.click(guidewire!)
    askFor('what is the reserve on CL-88533')

    const answer = thread()
    expect(within(answer).getByText('Claim CL-88533')).toBeDefined()
    expect(within(answer).getByText('$32,400')).toBeDefined()
    // The citation, not just any mention of the dataset — the earlier coverage
    // answer names it too, and a row without its own source line is the thing
    // this whole panel is supposed to make impossible.
    expect(answer.querySelector('.dm-ask-cite')?.textContent).toContain('Snowflake Claims Mart')
  })

  it('refuses a question the attached dataset cannot answer', () => {
    panel()
    askFor('what data do we have about claims')
    const cards = within(thread()).getByRole('list', { name: /where it lives/i })
    fireEvent.click(within(cards).getAllByRole('button', { name: /^attach /i })[0])
    askFor('which brokers have stalled submissions')

    const answer = thread()
    expect(within(answer).getByText(/nothing in the attached data answers that/i)).toBeDefined()
    expect(within(answer).getByRole('list', { name: /attach one of these instead/i })).toBeDefined()
  })

  it('detaches, and says so', () => {
    attachFirst()
    fireEvent.click(screen.getByRole('button', { name: /^detach /i }))
    expect(screen.queryByRole('list', { name: /attached datasets/i })).toBeNull()
    expect(screen.getByText('Estate agent')).toBeDefined()
    expect(within(thread()).getByText(/no longer reads it/i)).toBeDefined()
  })

  it('clears the whole session, transcript and attachments together', () => {
    attachFirst()
    fireEvent.click(screen.getByRole('button', { name: /^clear$/i }))
    expect(screen.queryByRole('list', { name: /search transcript/i })).toBeNull()
    expect(screen.queryByRole('list', { name: /attached datasets/i })).toBeNull()
    expect(screen.getByRole('button', { name: SUGGESTED_QUESTIONS[0] })).toBeDefined()
  })
})

describe('AskPanel on the Overview screen', () => {
  it('is the first thing under the page title', () => {
    render(<DemoApp slug="" prefix="" />)
    expect(screen.getByRole('region', { name: /ask the estate/i })).toBeDefined()
  })

  it('is forgotten when the demo is reset', () => {
    render(<DemoApp slug="" prefix="" />)
    askFor('claims')
    expect(screen.getByRole('list', { name: /search transcript/i })).toBeDefined()
    fireEvent.click(screen.getByRole('button', { name: /reset demo/i }))
    expect(screen.queryByRole('list', { name: /search transcript/i })).toBeNull()
  })
})

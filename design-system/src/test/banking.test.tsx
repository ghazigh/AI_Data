import { render } from '@testing-library/react'
import { Banking } from '../../site/pages/Banking'
import { SiteNav } from '../../site/components/SiteNav'
import { PAGES } from '../../site/pages/index'
import { BANK_NODES, BANK_DOMAIN_NAMES, BANK_DOMAIN_ENTITIES } from '../../site/data/bank-graph'
import { USE_CASES } from '../../site/components/BankFigures'

test('the banking page is registered and prerendered as banking.html', () => {
  const page = PAGES.find(p => p.slug === 'banking')
  expect(page).toBeTruthy()
  expect(page!.title).toMatch(/Banking/)
  expect(page!.noindex).toBeFalsy()
})

test('the nav carries Banking, marked current on the banking page', () => {
  const { container } = render(<SiteNav current="banking" />)
  const link = container.querySelector('.dl-navbar-links a[aria-current="page"]')
  expect(link?.textContent).toBe('Banking')
  expect(link?.getAttribute('href')).toBe('./banking.html')
})

test('the hero mounts the bank estate, over a figure that stands alone without it', () => {
  const { container } = render(<Banking />)
  const island = container.querySelector('[data-graph-island]')!
  // the home page's island renders the demo tenant; this one must ask for the bank
  expect(island.getAttribute('data-graph-island')).toBe('bank')
  // the SVG in the markup is what a browser without WebGL — or without JS — keeps
  expect(island.querySelector('svg')).toBeTruthy()
})

test('the bank estate is a banking one, and every node lands in a named base', () => {
  const domains = new Set(BANK_NODES.map(n => n.domain))
  expect(domains.size).toBe(5)
  domains.forEach(d => {
    expect(BANK_DOMAIN_NAMES[d]).toBeTruthy()
    expect(BANK_DOMAIN_ENTITIES[d]).toMatch(/^[\d.]+[KM]$/)
  })
  const labels = BANK_NODES.map(n => n.label).join(' ')
  expect(labels).toMatch(/KYC file|Covenant|Collateral call/)
  // the demo tenant is an insurer — its entities must not leak onto a bank's page
  expect(labels).not.toMatch(/Policy|Claim|Broker|Reinsur/i)
  expect(new Set(BANK_NODES.map(n => n.id)).size).toBe(BANK_NODES.length)
})

test('the board wires nine agents to the five domains they read', () => {
  const { container } = render(<Banking />)
  const board = container.querySelector('[data-board]')!
  const agents = board.querySelectorAll('[data-agent]')
  const domains = board.querySelectorAll('[data-dom]')
  expect(agents.length).toBe(9)
  expect(domains.length).toBe(5)
  const ids = new Set([...domains].map(d => d.getAttribute('data-dom')))
  agents.forEach(a => a.getAttribute('data-needs')!.split(' ')
    .forEach(n => expect(ids.has(n)).toBe(true)))
})

test('an agent reads as blocked exactly when a domain it needs scores under the bar', () => {
  const { container } = render(<Banking />)
  const board = container.querySelector('[data-board]')!
  const low = new Set([...board.querySelectorAll('[data-dom][data-low]')].map(d => d.getAttribute('data-dom')))
  expect(low.size).toBe(2)
  const agents = [...board.querySelectorAll('[data-agent]')]
  agents.forEach(a => {
    const held = a.getAttribute('data-needs')!.split(' ').some(n => low.has(n))
    expect(a.classList.contains('st-node--warn')).toBe(held)
    expect(a.querySelector('.dl-badge')!.textContent === 'blocked').toBe(held)
  })
  const shipping = agents.filter(a => !a.classList.contains('st-node--warn')).length
  expect(container.querySelector('.st-tally')!.textContent)
    .toMatch(new RegExp(`${shipping} of 9 ship now`))
})

test('the page answers the questions a bank buyer arrives with, in order', () => {
  const { container } = render(<Banking />)
  const ids = [...container.querySelectorAll('section[id], div[id]')].map(s => s.id)
  const spine = ['use-cases', 'estate', 'agents', 'audit-what', 'architecture', 'governance', 'compare', 'start', 'audit']
  spine.forEach(id => expect(ids).toContain(id))
  expect(ids.filter(id => spine.includes(id))).toEqual(spine)
  // what starting costs them is stated, not implied
  expect(container.querySelector('#start')!.textContent).toMatch(/read-only credentials/i)
  expect(container.querySelector('.dl-faq')).toBeTruthy()
})

test('every use case ships in the markup, with one selected and a human at the end', () => {
  const { container } = render(<Banking />)
  const panels = container.querySelectorAll('[data-uc-panel]')
  const tabs = container.querySelectorAll('[data-uc-tab]')
  expect(panels.length).toBe(USE_CASES.length)
  expect(tabs.length).toBe(USE_CASES.length)
  // JavaScript narrows this to one; without it the whole section is still there
  expect(container.querySelectorAll('.st-uc-panel.is-active').length).toBe(1)
  expect(container.querySelectorAll('[aria-selected="true"]').length).toBe(1)
  panels.forEach(pn => {
    expect(pn.querySelectorAll('.st-uc-steps li').length).toBeGreaterThanOrEqual(4)
    // the agent proposes; a person still decides — that must be on every run
    expect(pn.querySelector('.st-uc-human')!.textContent).toBeTruthy()
  })
})

test('governance is shown as the path one request takes', () => {
  const { container } = render(<Banking />)
  const steps = container.querySelectorAll('#governance .st-trail li')
  expect(steps.length).toBe(6)
  const text = [...steps].map(s => s.textContent).join(' ')
  expect(text).toMatch(/identity/i)
  expect(text).toMatch(/entitlements/i)
  expect(text).toMatch(/logged/i)
})

test('modelled figures are labelled as illustrative, never as customer results', () => {
  const { container } = render(<Banking />)
  expect(container.textContent).toMatch(/illustrative/i)
  expect(container.textContent).toMatch(/pre-launch/i)
  expect(container.querySelectorAll('.st-footnote').length).toBeGreaterThanOrEqual(4)
})

test('the banking claims stay generic — no vendors, no named rules, no certifications', () => {
  const { container } = render(<Banking />)
  const copy = container.textContent ?? ''
  expect(copy).not.toMatch(/Temenos|Finastra|Mambu|Murex|Jack Henry|Fiserv|\bFIS\b|\bSWIFT\b/i)
  expect(copy).not.toMatch(/BCBS|Basel|\bDORA\b|MiFID|PSD2|\bGDPR\b|AI Act|SR 11-7/i)
  expect(copy).not.toMatch(/certified|compliant|guarantee|regulator-approved/i)
})

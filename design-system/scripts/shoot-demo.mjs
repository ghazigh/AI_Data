// Screenshots every built demo screen for visual review. Requires the demo to
// have been built first: npm run build:demo
import { mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright-core')

const SCREENS = ['', 'connect', 'ready', 'pipelines', 'graph', 'use-cases', 'governance']
const OUT = 'dist-site/shots'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
for (const slug of SCREENS) {
  const page = await ctx.newPage()
  const path = slug === '' ? 'index.html' : `${slug}/index.html`
  await page.goto(`file://${process.cwd()}/../website/demo/${path}`)
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${OUT}/${slug || 'index'}.png`, fullPage: true })
  await page.close()
  console.log('shot', slug || 'index')
}
await browser.close()

// Screenshots the interactive states a static screenshot never shows — the
// guide open, the command palette open, a pipeline workspace — for visual
// review. Same server and browser setup as shoot-demo.mjs; run that first.
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { extname, join, normalize } from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright-core')
const ROOT = join(process.cwd(), '../website/demo')
const OUT = 'dist-site/shots'
mkdirSync(OUT, { recursive: true })
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
const server = createServer((req, res) => {
  const rel = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '')
  let file = join(ROOT, rel)
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  if (!file.startsWith(ROOT) || !existsSync(file)) { res.writeHead(404).end('not found'); return }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
})
await new Promise(r => server.listen(0, '127.0.0.1', r))
const base = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })

const page = await ctx.newPage()
await page.goto(`${base}/`)
await page.waitForTimeout(800)
await page.click('text=Guided tour')
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/state-guide.png` })

await page.click('.dm-search-input')
await page.keyboard.type('claim')
await page.waitForTimeout(300)
await page.screenshot({ path: `${OUT}/state-palette.png` })
await page.keyboard.press('Escape')
await page.click('[aria-label^="Notifications"]')
await page.waitForTimeout(300)
await page.screenshot({ path: `${OUT}/state-bell.png` })

await page.goto(`${base}/pipelines/plan-p1/`)
await page.waitForTimeout(800)
await page.click('text=Run pipeline')
await page.waitForTimeout(2500)
await page.screenshot({ path: `${OUT}/state-workspace.png`, fullPage: true })

await page.goto(`${base}/search/`)
await page.waitForTimeout(800)
await page.click('text=Do we hold anything on claim fraud?')
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/state-search.png`, fullPage: true })

await page.goto(`${base}/connect/`)
await page.waitForTimeout(800)
await page.click('text=Connect a source')
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/state-connect-dialog.png` })

await browser.close()
server.close()
console.log('states shot')

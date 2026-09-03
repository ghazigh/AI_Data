// Records short clips of the live demo — the 3D graph settling, a pipeline
// run in flight, a search being asked, a source being connected — as webm
// videos for the launch video. Same http server and browser setup as
// shoot-demo.mjs. Run after `npm run build:demo`.
import { createReadStream, existsSync, mkdirSync, statSync, renameSync, readdirSync } from 'node:fs'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { extname, join, normalize } from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright-core')
const ROOT = join(process.cwd(), '../website/demo')
const OUT = process.env.FOOTAGE_OUT || 'dist-site/footage'
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
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})
const SIZE = { width: 1920, height: 1080 }

async function record(name, drive) {
  const ctx = await browser.newContext({ viewport: SIZE, deviceScaleFactor: 1, recordVideo: { dir: OUT, size: SIZE } })
  const page = await ctx.newPage()
  // Hide the floating guide pill and toasts — the video composition adds its own chrome.
  await page.addInitScript(() => {
    const s = document.createElement('style')
    s.textContent = '.dm-guide-pill, .dm-toasts { display: none !important; }'
    document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s))
  })
  await drive(page)
  const video = page.video()
  await ctx.close()
  const path = await video.path()
  renameSync(path, join(OUT, `${name}.webm`))
  console.log('recorded', name)
}

// Also full-size stills at 2x for the clean UI plates.
async function still(name, path, drive) {
  const ctx = await browser.newContext({ viewport: SIZE, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.addInitScript(() => {
    const s = document.createElement('style')
    s.textContent = '.dm-guide-pill, .dm-toasts { display: none !important; }'
    document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s))
  })
  await page.goto(`${base}/${path}`)
  await page.waitForTimeout(path.startsWith('graph') ? 5000 : 1000)
  if (drive) await drive(page)
  await page.screenshot({ path: join(OUT, `${name}.png`) })
  await ctx.close()
  console.log('still', name)
}

await record('graph', async page => {
  await page.goto(`${base}/graph/`)
  await page.waitForTimeout(9000)
  await page.click('button:has-text("Claims")')
  await page.waitForTimeout(3500)
  await page.click('button:has-text("Claims")')
  await page.waitForTimeout(3000)
})

await record('pipeline', async page => {
  await page.goto(`${base}/pipelines/plan-p1/`)
  await page.waitForTimeout(1200)
  await page.click('text=Run pipeline')
  await page.waitForTimeout(12000)
})

await record('search', async page => {
  await page.goto(`${base}/search/`)
  await page.waitForTimeout(1200)
  await page.click('.dm-composer-in')
  await page.keyboard.type('Do we hold anything on claim fraud?', { delay: 45 })
  await page.waitForTimeout(500)
  await page.keyboard.press('Enter')
  await page.waitForTimeout(3500)
})

await record('connect', async page => {
  await page.goto(`${base}/connect/`)
  await page.waitForTimeout(1200)
  await page.click('button:has-text("Connect a source")')
  await page.waitForTimeout(900)
  await page.click('button:has-text("Amazon Redshift")')
  await page.waitForTimeout(700)
  await page.fill('input[required]', 'meridian-prod')
  await page.waitForTimeout(500)
  await page.click('button:has-text("Connect source")')
  await page.waitForTimeout(4500)
})

await record('overview', async page => {
  await page.goto(`${base}/`)
  await page.waitForTimeout(1000)
  await page.mouse.move(960, 400)
  await page.mouse.wheel(0, 500)
  await page.waitForTimeout(1500)
  await page.mouse.wheel(0, -500)
  await page.waitForTimeout(1500)
})

for (const [name, path] of [['overview', ''], ['connect', 'connect/'], ['ready', 'ready/'], ['pipelines', 'pipelines/'], ['graph', 'graph/'], ['search', 'search/'], ['use-cases', 'use-cases/'], ['governance', 'governance/']]) {
  await still(name, path)
}
await still('workspace', 'pipelines/plan-p1/')

await browser.close()
server.close()
console.log('footage in', OUT, readdirSync(OUT).join(', '))

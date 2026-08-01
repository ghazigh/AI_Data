// Screenshots every built demo screen for visual review. Requires the demo to
// have been built first: npm run build:demo
//
// Served over http rather than opened from file://, because the client bundle is
// an ES module and browsers refuse to load module scripts cross-origin from the
// filesystem. Under file:// the pages still *look* right — they are
// server-rendered — but nothing hydrates, so anything interactive (a running
// pipeline, the WebGL graph) would never reach the shot.
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { extname, join, normalize } from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright-core')

const SCREENS = ['', 'connect', 'ready', 'pipelines', 'graph', 'use-cases', 'governance']
const ROOT = join(process.cwd(), '../website/demo')
const OUT = 'dist-site/shots'
mkdirSync(OUT, { recursive: true })

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png',
}

const server = createServer((req, res) => {
  // normalize() collapses any ../ before it can escape the demo directory.
  const rel = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '')
  let file = join(ROOT, rel)
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  if (!file.startsWith(ROOT) || !existsSync(file)) {
    res.writeHead(404).end('not found')
    return
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
})

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${server.address().port}`

// SwiftShader gives headless chromium a real (software) WebGL context, so the
// 3D graph renders here instead of falling back to its SVG twin.
const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })

for (const slug of SCREENS) {
  const page = await ctx.newPage()
  await page.goto(`${base}/${slug ? `${slug}/` : ''}`)
  // The graph screen has to fetch and evaluate its WebGL chunk, then let the
  // scene animate itself in, before it is worth photographing.
  await page.waitForTimeout(slug === 'graph' ? 4500 : 900)
  await page.screenshot({ path: `${OUT}/${slug || 'index'}.png`, fullPage: true })
  await page.close()
  console.log('shot', slug || 'index')
}

await browser.close()
server.close()

// Serves ../website over http for local review.
//
// Opening website/*.html from the filesystem does not work: the knowledge graph
// and the demo both ship as ES modules, and browsers refuse to load module
// scripts cross-origin from file://. The page still renders — it falls back to
// the static figure in the markup — so the failure looks like "the graph is not
// interactive" rather than like an error. Run this instead.
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'

const ROOT = new URL('../../website/', import.meta.url).pathname
const PORT = Number(process.env.PORT ?? 4173)
const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.pptx':
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
}

createServer((req, res) => {
  const rel = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname))
    .replace(/^(\.\.[/\\])+/, '')
  let file = join(ROOT, rel)
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  if (!file.startsWith(ROOT) || !existsSync(file)) {
    res.writeHead(404, { 'content-type': 'text/html' })
    createReadStream(join(ROOT, '404.html')).pipe(res)
    return
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
}).listen(PORT, () => {
  console.log(`website/ on http://localhost:${PORT}/  —  banking page: http://localhost:${PORT}/banking.html`)
})

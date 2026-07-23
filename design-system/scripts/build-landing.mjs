// Pre-renders site/LandingPage.tsx to a fully self-contained landing/index.html:
// static markup + inlined tokens/styles + base64-embedded woff2 fonts. No runtime JS.
import { build } from 'esbuild'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

await build({
  entryPoints: ['site/LandingPage.tsx'],
  outfile: 'dist-site/LandingPage.mjs',
  bundle: true,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: { '.css': 'empty' },
})

const { LandingPage } = await import(pathToFileURL('dist-site/LandingPage.mjs'))
const { createElement } = await import('react')
const { renderToStaticMarkup } = await import('react-dom/server')
const body = renderToStaticMarkup(createElement(LandingPage))

// CSS closure: fonts (woff2 → data URIs) + tokens + component styles.
const tokens = readFileSync('src/tokens.css', 'utf8')
const fonts = readFileSync('src/fonts/fonts.css', 'utf8').replace(
  /url\('\.\/([^']+\.woff2)'\)/g,
  (_, f) => `url('data:font/woff2;base64,${readFileSync(`src/fonts/${f}`).toString('base64')}')`,
)
const styles = readFileSync('src/styles.css', 'utf8')
  .replace(`@import './fonts/fonts.css';`, '')
  .replace(`@import './tokens.css';`, '')

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Datalith — The Agentic Data Center</title>
<meta name="description" content="Datalith connects every data source, builds your Enterprise Knowledge Graph, and serves governed, agent-ready data to any AI agent.">
<style>
${fonts}
${tokens}
${styles}
html, body { margin: 0; }
</style>
</head>
<body>
${body}
</body>
</html>
`
mkdirSync('../landing', { recursive: true })
writeFileSync('../landing/index.html', html)
console.log(`wrote ../landing/index.html (${Math.round(html.length / 1024)} KB)`)

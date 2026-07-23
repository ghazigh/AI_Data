import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
mkdirSync('dist/fonts', { recursive: true })
cpSync('src/tokens.css', 'dist/tokens.css')
// Inline tokens into the shipped stylesheet so its @import closure is
// self-contained wherever the file is copied (tokens.css stays available
// for consumers who import it directly).
const tokens = readFileSync('src/tokens.css', 'utf8')
const styles = readFileSync('src/styles.css', 'utf8')
writeFileSync('dist/styles.css', styles.replace(`@import './tokens.css';`, tokens))
cpSync('src/fonts', 'dist/fonts', { recursive: true })
console.log('assets copied to dist/ (tokens inlined into styles.css)')

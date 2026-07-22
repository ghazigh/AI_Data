import { cpSync, mkdirSync } from 'node:fs'
mkdirSync('dist/fonts', { recursive: true })
cpSync('src/tokens.css', 'dist/tokens.css')
cpSync('src/styles.css', 'dist/styles.css')
cpSync('src/fonts', 'dist/fonts', { recursive: true })
console.log('assets copied to dist/')

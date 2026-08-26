import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Every st-* class the site's markup uses must be styled in site.css.
 *
 * The site layer is hand-written CSS beside hand-written JSX, so a class can
 * lose its rule — in an edit that rewrites a neighbouring block, say — and the
 * page still renders, just unstyled. No other test here sees that: the markup
 * is correct, the build succeeds, and the section quietly becomes raw text.
 *
 * A class counts as styled if it has its own rule, or if site.css styles
 * anything under it (`.st-uc-tab`, `.st-node--warn`) — plenty of classes are
 * grid cells or namespace roots that legitimately carry no rule themselves.
 */
const css = readFileSync('site/site.css', 'utf8')
const defined = [...css.matchAll(/\.(st-[a-z0-9-]+)/g)].map(m => m[1])
const styled = (cls: string): boolean =>
  defined.some(d => d === cls || d.startsWith(`${cls}-`))

const sources = (dir: string): string[] =>
  readdirSync(dir).flatMap(name => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sources(path)
    return /\.(tsx|ts|js)$/.test(name) ? [path] : []
  })

/* Five classes in older figures carry no rules of their own — st-kg-corenode,
   st-sf-row, st-sf-kbrow, st-posmap, st-market-stat. They are left as they are
   rather than swept into this change; the guard covers the pages and figures
   that have been built since. */
const COVERED = /Banking|BankFigures|BankNebula|SiteNav|SiteFooter|PageIntro|StageSection|site\.js/

test('every st-* class the site uses is styled in site.css', () => {
  const used = new Map<string, string>()
  for (const file of sources('site').filter(f => COVERED.test(f))) {
    const text = readFileSync(file, 'utf8')
    for (const m of text.matchAll(/(?:className=["'`{]|class(?:Name)?\s*=\s*["'])([^"'`}]*)/g)) {
      for (const cls of m[1].split(/[\s{}$`]+/)) {
        if (cls.startsWith('st-') && !used.has(cls)) used.set(cls, file)
      }
    }
  }
  expect(used.size).toBeGreaterThan(20)
  const unstyled = [...used].filter(([cls]) => !styled(cls))
    .map(([cls, file]) => `${cls} (${file})`)
  expect(unstyled).toEqual([])
})

test('the banking page’s own sections are all styled', () => {
  // the section that lost its rules once already, plus the two beside it
  const page = readFileSync('site/pages/Banking.tsx', 'utf8')
    + readFileSync('site/components/BankFigures.tsx', 'utf8')
  const bankClasses = [...page.matchAll(/className="([^"]*)"/g)]
    .flatMap(m => m[1].split(/\s+/))
    .filter(c => c.startsWith('st-'))
  expect(new Set(bankClasses).size).toBeGreaterThan(15)
  bankClasses.forEach(c => expect(styled(c)).toBe(true))
})

// No @types/node is installed anywhere in this workspace (checked: not in
// design-system/node_modules, not hoisted to any parent node_modules), and
// this task may not add dependencies. This is a minimal ambient declaration
// for the 'node:fs' and 'node:path' functions the tests import, scoped to
// just those signatures rather than standing in for the full @types/node
// surface.
declare module 'node:fs' {
  export function existsSync(path: string): boolean
  export function readFileSync(path: string, encoding: 'utf8' | 'utf-8'): string
  export function readdirSync(path: string): string[]
  export function statSync(path: string): { isDirectory(): boolean }
}
declare module 'node:path' {
  export function join(...parts: string[]): string
  export function dirname(path: string): string
}
declare module 'node:url' {
  export function fileURLToPath(url: string | URL): string
}

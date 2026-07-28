// No @types/node is installed anywhere in this workspace (checked: not in
// design-system/node_modules, not hoisted to any parent node_modules), and
// this task may not add dependencies. This is a minimal ambient declaration
// for the two 'node:fs' functions build.test.ts imports, scoped to just
// those two signatures rather than standing in for the full @types/node
// surface.
declare module 'node:fs' {
  export function existsSync(path: string): boolean
  export function readFileSync(path: string, encoding: 'utf8' | 'utf-8'): string
}

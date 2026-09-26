// Bundles src/ (the three.js world + the film timeline) into one classic script the renderer can load.
// HyperFrames needs the timeline registered from an inline <script>, so the bundle only defines
// window.__buildFilm; index.html calls it.
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const minify = !process.argv.includes('--dev');

await build({
  entryPoints: [resolve(root, 'src/main.js')],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  outfile: resolve(root, 'assets/film.js'),
  minify,
  legalComments: 'none',
  banner: { js: '/* Datalith spot — built from video/spot/src by tools/build.mjs. Do not edit by hand. */' },
  logLevel: 'info',
});

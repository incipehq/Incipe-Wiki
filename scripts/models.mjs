#!/usr/bin/env node
/**
 * Models — the Wiki's 3D viewer assets and their still thumbnails.
 *
 * For every page in wiki/ whose frontmatter names a `model:` it:
 *   1. reads the source GLB from the Incipe Workspace's board3d assets
 *      (`modules/<model>.glb`, or `<model>.glb` for the board itself),
 *   2. meshopt-compresses it to public/models/<page>.glb (the CAD exports are
 *      geometry-only and up to 13 MB; compressed they are a fifth of that),
 *   3. renders it headless in Google Chrome, with the same scene the site uses
 *      (scripts/render-model.html), to public/thumbs/wiki/<page>.png on a
 *      transparent ground.
 *
 * The outputs are committed; Vercel never runs this.
 *
 *   npm run models                       # everything
 *   npm run models -- --only light,servo # a few
 *   npm run models -- --from <assets dir>
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, meshopt, prune, weld } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const from = arg('from') ?? join(root, '..', 'Incipe-Workspace', 'apps', 'desktop', 'src', 'renderer', 'features', 'board3d', 'assets');
const only = arg('only')?.split(',');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const modelsDir = join(root, 'public', 'models');
const thumbsDir = join(root, 'public', 'thumbs', 'wiki');
mkdirSync(modelsDir, { recursive: true });
mkdirSync(thumbsDir, { recursive: true });

function frontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const data = {};
  for (const line of match?.[1].split(/\r?\n/) ?? []) {
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (m) data[m[1]] = m[2].trim();
  }
  return data;
}

const pages = readdirSync(join(root, 'wiki'))
  .filter((name) => name.endsWith('.md'))
  .map((name) => ({ slug: name.replace(/\.md$/, ''), ...frontmatter(readFileSync(join(root, 'wiki', name), 'utf8')) }))
  .filter((page) => page.model && (!only || only.includes(page.slug)));

await MeshoptEncoder.ready;
await MeshoptDecoder.ready;
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });

for (const page of pages) {
  const source = page.model === 'incipe01' ? join(from, 'incipe01.glb') : join(from, 'modules', `${page.model}.glb`);
  if (!existsSync(source)) {
    console.error(`✗ ${page.slug}: no model at ${source}`);
    process.exitCode = 1;
    continue;
  }
  const document = await io.read(source);
  await document.transform(dedup(), weld(), prune(), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
  const out = join(modelsDir, `${page.slug}.glb`);
  await io.write(out, document);
  const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  console.log(`✓ ${page.slug}  ${mb(statSync(source).size)} → ${mb(statSync(out).size)}`);
}

if (!existsSync(chrome)) {
  console.error('✗ Google Chrome not found — models compressed, thumbnails skipped.');
  process.exit(1);
}

/** Ask a page over the DevTools protocol (Node's built-in WebSocket) for one value. */
function evaluate(wsUrl, expression) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression, returnByValue: true } }));
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== 1) return;
      ws.close();
      resolve(message.result?.result?.value);
    };
    ws.onerror = reject;
  });
}

const server = await createServer({ root, logLevel: 'error', server: { port: 5199, strictPort: true } });
await server.listen();
// One headless Chrome, driven over DevTools: `--dump-dom` / `--screenshot`
// fire on the load event, long before a large model has decoded and drawn.
const debugPort = 9333;
const browser = spawn(
  chrome,
  [
    '--headless=new',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--force-device-scale-factor=1',
    '--window-size=1400,900',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${join(tmpdir(), 'incipe-wiki-models')}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);
const devtools = `http://127.0.0.1:${debugPort}`;
try {
  for (let i = 0; i < 50; i += 1) {
    if (await fetch(`${devtools}/json/version`).then((r) => r.ok, () => false)) break;
    await new Promise((r) => setTimeout(r, 200));
  }
  for (const page of pages) {
    const png = join(thumbsDir, `${page.slug}.png`);
    const url = `http://localhost:5199/scripts/render-model.html?src=/models/${page.slug}.glb`;
    const target = await fetch(`${devtools}/json/new?${encodeURI(url)}`, { method: 'PUT' }).then((r) => r.json());
    let out = '';
    for (let waited = 0; waited < 180_000 && !out; waited += 500) {
      await new Promise((r) => setTimeout(r, 500));
      out = (await evaluate(target.webSocketDebuggerUrl, "document.getElementById('out')?.textContent ?? ''")) ?? '';
    }
    await fetch(`${devtools}/json/close/${target.id}`);
    const data = /^data:image\/png;base64,(.+)$/.exec(out)?.[1];
    if (!data) {
      console.error(`✗ ${page.slug}: render failed — ${out || 'timed out'}`);
      process.exitCode = 1;
      continue;
    }
    writeFileSync(png, Buffer.from(data, 'base64'));
    console.log(`✓ ${relative(root, png)}`);
  }
} finally {
  browser.kill();
  await server.close();
}

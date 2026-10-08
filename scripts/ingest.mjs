#!/usr/bin/env node
/**
 * Ingest — turns the source decks under raw/ into what the site serves.
 *
 * For every page in content/ whose frontmatter names a `source:` file it:
 *   1. copies the file to public/files/<course>--<page>.<ext>   (the download)
 *   2. renders its cover to public/thumbs/<course>--<page>.jpg   (the thumbnail)
 *   3. records size, slide/page count and paths in src/generated/assets.json
 *   4. deletes files and thumbnails no page names any more
 *
 * A page may also name a `pdf:` — the same deck exported as PDF — which is copied
 * to public/files/<course>--<page>.view.pdf and read in the page's own viewer, so a
 * deck can be looked through without downloading the .pptx. A `source:` that is
 * itself a PDF is its own viewer.
 *
 * Thumbnails come from macOS Quick Look (`qlmanage`) and are recompressed with
 * `sips`, so this step runs on a Mac. Its outputs are committed; the Vercel build
 * only reads them and never needs raw/ or a Mac.
 *
 *   npm run ingest            # everything
 *   npm run ingest -- --force # re-render thumbnails that already exist
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const contentDir = join(root, 'content');
const filesDir = join(root, 'public', 'files');
const thumbsDir = join(root, 'public', 'thumbs');
const outJson = join(root, 'src', 'generated', 'assets.json');
const force = process.argv.includes('--force');

mkdirSync(filesDir, { recursive: true });
mkdirSync(thumbsDir, { recursive: true });
mkdirSync(join(root, 'src', 'generated'), { recursive: true });

/** The same tiny `key: value` frontmatter reader the site uses (src/content.ts). */
function frontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const data = {};
  if (!match) return data;
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (m) data[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
  return data;
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : entry.name.endsWith('.md') ? [path] : [];
  });
}

function countPages(path) {
  const ext = extname(path).toLowerCase();
  try {
    if (ext === '.pptx') {
      const listing = execFileSync('unzip', ['-Z1', path], { encoding: 'utf8' });
      return listing.split('\n').filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n)).length;
    }
    if (ext === '.pdf') {
      const out = execFileSync('mdls', ['-raw', '-name', 'kMDItemNumberOfPages', path], { encoding: 'utf8' });
      const n = Number.parseInt(out, 10);
      if (Number.isFinite(n)) return n;
      return (readFileSync(path, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length || null;
    }
  } catch {
    /* A count is a nicety; a missing one never fails the ingest. */
  }
  return null;
}

function renderThumb(source, target) {
  const scratch = mkdtempSync(join(tmpdir(), 'incipe-wiki-'));
  try {
    execFileSync('qlmanage', ['-t', '-s', '1600', '-o', scratch, source], { stdio: 'ignore' });
    const png = join(scratch, `${basename(source)}.png`);
    if (!existsSync(png)) throw new Error('Quick Look produced no thumbnail');
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', png, '--out', target], { stdio: 'ignore' });
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

const assets = {};
let failures = 0;

for (const page of walk(contentDir).sort()) {
  const meta = frontmatter(readFileSync(page, 'utf8'));
  if (!meta.source) continue;

  const id = relative(contentDir, page).replace(/\.md$/, '').replace(/\/index$/, '');
  const source = join(root, meta.source);
  const key = id.replace(/\//g, '--');
  const ext = extname(source).toLowerCase();

  if (!existsSync(source)) {
    console.error(`✗ ${id}: source not found — ${meta.source}`);
    failures += 1;
    continue;
  }

  const file = `${key}${ext}`;
  copyFileSync(source, join(filesDir, file));

  const thumb = `${key}.jpg`;
  const thumbPath = join(thumbsDir, thumb);
  if (force || !existsSync(thumbPath)) {
    try {
      renderThumb(source, thumbPath);
    } catch (error) {
      console.error(`✗ ${id}: thumbnail failed — ${error.message}`);
      failures += 1;
    }
  }

  let viewer = ext === '.pdf' ? `/files/${file}` : null;
  if (meta.pdf) {
    const pdf = join(root, meta.pdf);
    if (!existsSync(pdf) || extname(pdf).toLowerCase() !== '.pdf') {
      console.error(`✗ ${id}: pdf not found or not a .pdf — ${meta.pdf}`);
      failures += 1;
    } else {
      copyFileSync(pdf, join(filesDir, `${key}.view.pdf`));
      viewer = `/files/${key}.view.pdf`;
    }
  }

  assets[id] = {
    file: `/files/${file}`,
    viewer,
    downloadName: basename(source).replace(/\s+\./, '.'),
    format: ext.slice(1).toUpperCase(),
    bytes: statSync(source).size,
    pages: countPages(source),
    thumbnail: existsSync(thumbPath) ? `/thumbs/${thumb}` : null,
  };
  console.log(`✓ ${id}  ${assets[id].format}  ${assets[id].pages ?? '–'} pages${viewer ? '  + PDF viewer' : ''}`);
}

// Anything a page no longer names is stale: a removed deck must not stay downloadable.
const keep = new Set(
  Object.values(assets).flatMap((a) => [basename(a.file), a.viewer && basename(a.viewer), a.thumbnail && basename(a.thumbnail)]),
);
for (const dir of [filesDir, thumbsDir]) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const name = entry.name;
    // Folders are other scripts' outputs (public/thumbs/wiki is `npm run models`).
    if (!entry.isFile() || name.startsWith('.') || keep.has(name)) continue;
    rmSync(join(dir, name));
    console.log(`− removed stale ${relative(root, join(dir, name))}`);
  }
}

writeFileSync(outJson, `${JSON.stringify(assets, null, 2)}\n`);
console.log(`\n${Object.keys(assets).length} assets → ${relative(root, outJson)}`);
if (failures) process.exit(1);

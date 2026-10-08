# 2026-10-08 — Firmware privacy incident and the rule it left

**Rule: the Incipe firmware is private; this repository and the site are public.**
Nothing from the firmware or from internal Workspace / INCIPE-1 docs may be copied,
quoted or bundled here. Firmware detail on a Wiki page must be text the owner has
approved for publication.

## What happened

The first build of the Wiki copied the Workspace's private `incipe-firmware` skill
references into `wiki/references/` and published them through the site — exact C++
declarations, internal source file names, runtime and OTA internals. The site was
committed, pushed and auto-deployed by Vercel before this was caught. The owner then
emptied the old GitHub repo, created a new one (also `incipehq/Incipe-Wiki`, public),
and asked for the files to be migrated back here.

## What was done in the migration

- Files copied from the local `Incipe-Wiki-2` checkout **except** `wiki/references/`,
  `dist/` and the old `.git` (whose history contained the references). This checkout
  has a fresh history; nothing has been committed or pushed.
- `src/wikiContent.ts` no longer reads any references folder — only `wiki/*.md`. The
  function tables ("What it reads"), the firmware-ID parsing and the reference-derived
  notes are gone; `functions` is always empty until there is an approved public source.
- `reference:` removed from every `wiki/*.md`; `wiki/references/` added to
  `.gitignore` as a backstop.
- CLAUDE.md, README and the earlier handoff rewritten to state the rule and drop the
  instructions to copy the references.

## Owner's to do (outside this repo)

- **Vercel `incipe-wiki`**: the old production build still served the firmware text
  at the time of migration. Delete it or enable Deployment Protection; older
  deployments have their own URLs. (`incipe-wiki-academy` was already gone.)
- **Local `Incipe-Wiki-2`** still holds the references, a `dist/` build containing
  them, and git history with them, and its `origin` points at the public repo. Do not
  push from it; delete it or clean it.

## Still to decide — firmware-adjacent text that came across

These were written in the first session and are now in this public repo, uncommitted.
They contain no source code or declarations, but they do describe firmware behaviour:

- `wiki/*.md` summaries and `reads:` lines — `incipe.*` function names, value ranges,
  "returns −1 until detected".
- `wiki/connect-the-board.md` — a user-thread code sample using `incipe.*`, and that the
  build service adds the runtime.
- `wiki/wireless-setup.md` — the Wi-Fi/OTA setup flow, network requirements, the
  ~20-second Bluetooth fallback, and rules for what sketches must not do.
- `wiki/board.md`, `wiki/user-threads.md` — summaries of the runtime and the FreeRTOS
  pattern (their reference bodies are gone; the pages are near-empty).
- `public/models/*.glb` + `public/thumbs/wiki/` — the board and module CAD models
  (hardware, not firmware; confirm they may be public).

The Academy's `content/` decks and notes, and the owner's own `lessons/`, also use
`incipe.*` function names; those are the owner's course material.

# 2026-10-08 — Incipe Wiki built: Wiki (devices) + Academy (curriculum)

First session on this repo, from an empty folder to a deployable site. Read
[`CLAUDE.md`](../CLAUDE.md) for what the app is for and the rules; this file is what
happened, why, and what is open.

## State at hand-off

- Builds clean (`npm run build`), no console errors, checked in the browser pane in
  dark and light themes and at drawer width (<820px).
- **Nothing is committed.** The repo has no commits; everything is untracked. `raw/`
  is git-ignored on purpose (its decks are copied into `public/files` by the ingest).
- **Not deployed.** `vercel.json` is ready (Vite, `dist`, SPA rewrite, cache headers).
- Dev server: `.claude/launch.json` → `wiki` on port 5179.

## What the site is now

Two tabs head the left rail — **Wiki** above **Academy** — and the rail below them is
the section you are in (on `/`, the last section used).

| Route | What |
| --- | --- |
| `/` | Landing: one card per section |
| `/wiki` | Get started (board, connect, wireless, user threads) · Sensors · Actuators · Modules. Search field + kind filter, both in the URL (`?q=dht11&kind=sensor`); `/` focuses it |
| `/wiki/<page>` | Live three.js model (poster first) → the page's own notes → prev / next |
| `/academy` | The former home: modules M1–M5 + "Read the curriculum" |
| `/academy/curriculum` | The full curriculum. Its back arrow goes to `/academy` (was a bug: it went to the bare `program` course) |
| `/academy/<module>` | Materials cards + that module's slice of `curriculum/learning-curriculum.md` |
| `/academy/<module>/<page>` | Deck cover → download bar → notes → prev / next |

Old routes (`/m1-ai-literacy`, `/program/curriculum`, …) were never deployed, so there
are no redirects.

## How it was built (decisions worth keeping)

- **Design system copied verbatim** from `Incipe-Workspace/apps/desktop/src/renderer/`
  into `src/styles/` (tokens, base, `ui.css`, `markdown.css`, fonts). The shell follows
  the workspace's LMS window and nav pane: 48px bar, `nav-pane` rail, `sh-panel` stage,
  `inc-row` selection, `inc-btn` ladder, `inc-search`, `inc-seg`, `inc-pop` menus.
- **Wiki content.** *(Superseded — see
  [`2026-10-08-firmware-privacy.md`](2026-10-08-firmware-privacy.md).)* The first build
  bundled private firmware reference material; it has been removed and must not come
  back. Wiki pages now carry only their own `wiki/<page>.md` text. Catalog metadata
  (kind, order, model, reads, keywords, summary) lives in that frontmatter.
- **3D models.** `npm run models` reads the workspace's board3d GLBs, meshopt-compresses
  them (31 MB → 7.6 MB; the AQ sensor alone 12.9 → 3.0 MB — they are geometry-only CAD
  exports), and renders thumbnails in headless Chrome driven over the DevTools
  protocol. Two traps solved there: `--screenshot`'s viewport is shorter than
  `--window-size` (633 vs 720), and `--dump-dom` fires on `load`, long before a large
  model draws — so the page exports its canvas to a data URL and the script polls for
  it. The camera fit projects sampled vertices, not the bounding box (box corners left
  the joystick small and off-centre). three.js is a lazy chunk (~155 kB gz) loaded only
  on model pages; the meshopt decoder is three's bundled module, so no CDN.
- **Academy content model.** Modules are folders in `content/`; each module's
  curriculum is *cut from* the user's `curriculum/learning-curriculum.md` at build time
  (a section ends at the next `M…`/`Part …` heading), so the user edits one file. Session
  pages can pull their notes from the user's `lessons/` via `body:`. Real-life projects
  are written `**Project N: Title**` in the curriculum and render as cards.
- **Decks.** `npm run ingest` copies `raw/` decks to `public/files/`, makes cover
  thumbnails with macOS Quick Look (no LibreOffice on this Mac), counts slides, and
  deletes outputs nothing references.

## Open questions and known gaps

1. **Resolved — the firmware is private.** See
   [`2026-10-08-firmware-privacy.md`](2026-10-08-firmware-privacy.md).
2. **Academy lessons may not match the current firmware.** The M2 decks/notes
   (`content/m2-fundamentals-of-programming/*`) teach an older setup/loop style of
   using the board library. The curriculum owner should confirm they match current
   firmware behaviour (check against the private docs, never copy them here).
3. **Curriculum numbering** in `curriculum/learning-curriculum.md` does not match the
   module folders: Fundamentals is headed "M3", Board/Sensors "M4", Ideation "M4"
   (sessions 5–6, placed after 20). Sections are matched by title, so the site works;
   the labels shown (M1–M5) come from `content/*/index.md`.
4. **Modules without a 3D model:** soil moisture, flame, pump, IR receiver, IR sender
   (cards show a glyph). The workspace also has grayscale and IMU models; neither has a
   Wiki page.
5. **M3 Session 12** notes say IMU code is "coming soon" — consistent with item 4.
6. Empty modules: M4 and M5 have curriculum text but no decks or notes yet. `raw/LMS/M3…`
   and `raw/LMS/M4…` folders exist and are empty.
7. No tests. Worth adding: `wikiContent` parsing and `curriculumSection` against the
   real curriculum file — plus a check that no private firmware text is in the bundle.

## If you pick this up

- New sensor → add `wiki/<page>.md` with owner-approved public text, then
  `npm run models -- --only <page>` if there is a GLB.
- New deck → put it in `raw/LMS/<module>/`, add a page with `source:`, `npm run ingest`.
- Before deploying: commit (including `public/` outputs), import in Vercel.

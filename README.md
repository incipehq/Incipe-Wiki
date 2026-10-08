# Incipe Wiki

**The public knowledge site for Incipe's B2B education product.** Incipe sells schools
and organisations a hardware-learning program: the **INCIPE Board** (an ESP32 board
that plug-and-play sensor and actuator modules snap onto), the **INCIPE Workspace**
desktop app students code it in, and a **curriculum** teachers run. This site is
where both halves of that are written down:

| Section | For | What is in it |
| --- | --- | --- |
| **Wiki** (`/wiki`) | Anyone building on the board — students, teachers, partners | How to connect the board and set up Wi-Fi, and every sensor, actuator and module: what it does, what data it reads, and a 3D model of the part. Searchable by name, part number or what it measures. |
| **Academy** (`/academy`) | Schools on the Educational for Organization plan | The learning curriculum, module by module (M1–M5): slide decks to view and download, lesson notes with copyable code, and the real-life projects. |

It is a static React site styled with the Incipe Workspace design system, hosted on
Vercel.

```
/                          landing — one door to each section
/wiki                      board + guides + every module, with sensor search (?q= &kind=)
/wiki/<page>               3D model → what it reads → notes
/academy                   modules M1–M5, "Read the curriculum"
/academy/curriculum        the whole curriculum on one page
/academy/<module>          materials + that module's slice of the curriculum
/academy/<module>/<page>   cover thumbnail → download → rich-text notes → prev / next
```

## Develop

```bash
npm install
npm run dev
```

`npm run build` typechecks and builds to `dist/`. Agents: read [CLAUDE.md](CLAUDE.md)
first; the latest session notes are in [handoffs/](handoffs/).

## Wiki content — `wiki/`

Each page is `wiki/<page>.md`. Frontmatter:

| Key | |
| --- | --- |
| `title` | Page title |
| `kind` | `board`, `guide`, `sensor`, `actuator` or `module` — sets its group and filter |
| `order` | Position in the rail and on the Wiki home |
| `model` | Optional: the board3d asset name (`light`, `temp`, … or `incipe01` for the board) |
| `identifier` | Optional: the part number shown on cards (e.g. `DHT11`) |
| `reads` | One line: what it measures or takes — shown on cards |
| `keywords` | Extra search words — synonyms, part numbers |
| `summary` | One or two sentences under the title |

The page's Markdown body is its notes.

> **The firmware is private; this repository is public.** Do not copy the Incipe
> firmware references, firmware source or internal Workspace docs into `wiki/` or
> anywhere else here. `wiki/references/` is git-ignored as a backstop. Firmware detail
> on a Wiki page must be text approved for publication. See [CLAUDE.md](CLAUDE.md).

### 3D models and thumbnails

```bash
npm run models                        # every page with a `model:`
npm run models -- --only light,servo
```

Reads the GLBs from the sibling `Incipe-Workspace` checkout
(`apps/desktop/src/renderer/features/board3d/assets/`), meshopt-compresses them to
`public/models/`, and renders each in headless Google Chrome — with the same scene the
site uses — to a transparent `public/thumbs/wiki/<page>.png`. Mac + Chrome only;
commit the outputs.

## Academy content — `content/`

Each module is a folder in `content/`; each page is a Markdown file in it. Files sort
by name, so a number prefix sets the order.

```
content/
  m2-fundamentals-of-programming/
    index.md                # the module
    01-coding-basics.md     # a page
  program/                  # not a module — /academy/curriculum
```

**Module** (`index.md`) frontmatter: `title`, `label` (`M2`), `order`, `meta`
(`Part B · Weeks 5–8`), `summary`, and `curriculum` — text from the module's heading in
`curriculum/learning-curriculum.md`. The module page shows that section of the
curriculum, cut from the file at build time, so edit the curriculum there and every
module follows. A section runs until the next module (`M…`) or part (`Part …`)
heading, so headings inside it stay with it. A session that has a page
(`lesson: Session 11`) is linked, and `**Project N: Title**` entries render as cards.

**Page** frontmatter:

| Key | |
| --- | --- |
| `title` | Page title (optional when `body` names a file starting with `# Title`) |
| `lesson` | Short label — `Lesson 3`, `Session 11` |
| `type` | `slides`, `video`, `document` or `notes` |
| `summary` | One or two sentences, shown under the title and on cards |
| `source` | The original deck, e.g. `raw/LMS/M2 Fundamentals of Programming/Lesson 3 Sensors.pptx` — becomes the download and the thumbnail |
| `video` | Optional YouTube video id — the page then leads with the video |
| `body` | Optional Markdown file used as the notes, e.g. `lessons/phase-2/session-11-analog-sensors-adc.md` |
| `duration` | Optional, e.g. `30 min` |

The body is GitHub-flavoured Markdown. `<details><summary>…</summary>…</details>`
works for checkpoint answers.

After adding or replacing a `source:` file, run the ingest **on a Mac**:

```bash
npm run ingest
```

It copies each source to `public/files/`, renders its first slide or page to
`public/thumbs/` with Quick Look, and writes sizes and slide counts to
`src/generated/assets.json`. Commit those outputs — Vercel only builds the site and
never needs `raw/`, which is git-ignored. `npm run ingest -- --force` re-renders
existing thumbnails. Files a page no longer names are deleted from `public/`.

## Design system

`src/styles/` is copied verbatim from
`Incipe-Workspace/apps/desktop/src/renderer/` — `styles/` (fonts, tokens,
`base.css`), `components/ui/ui.css` and `components/markdown/markdown.css`. Re-copy
those files rather than editing them here. The wiki's own layout lives in
`src/wiki.css` and uses only those tokens and the workspace's recipes (`inc-row`,
`inc-btn`, `inc-search`, `inc-seg`, `inc-pop`, the nav-pane and side-panel frames).

## Deploy

Import the repository in Vercel. `vercel.json` sets the Vite build, the `dist`
output and the single-page-app rewrite.

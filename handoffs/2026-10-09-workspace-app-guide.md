# 2026-10-09 — Workspace app guide

## What shipped (uncommitted)

- **App guide**: 15 Wiki pages, `wiki/app-*.md` (`kind: app`, `step:`, `order: 200+step`).
  One story, the *classroom climate monitor* (project `climate-reader`, temperature &
  humidity module on L1): install → tour → projects → first prompt → connect → verify
  and flash → serial/plotter → Plan mode → editor → wireless → artifacts → settings →
  help → troubleshooting → final build. Each page: muted story line, steps, *You can
  now*, **Next**.
- **`AppScreen`** (`src/components/AppScreen.tsx`, ```` ```screen ```` blocks): annotated
  screenshots with ring pins + a key. Spec in `design.md` §4.1.
- **Wiki wiring**: `app` kind, *Workspace app* group, `APP_STEPS`, Step N of 15 in the
  page head and step numbers in the rail, App filter on the Wiki home, Previous/Next
  kept inside the guide (`wikiNeighbours`).
- **`design.md`** (new, root): directory, tokens, components, new-element specs,
  screenshot spec, writing voice. **`design/workspace-ui-inventory.md`**: every
  release-build surface with its exact labels.

## Open

1. **Screenshots are interim** (`public/app-guide/README.md`): cut from development-build
   captures. Retake on the release `Incipe.app` with a demo account, then re-check pin
   percentages. Several pages have no image yet (list in that README).
2. **Download link** for the Mac app: step 1 says "the link your school or Incipe sent
   you". Replace with the real link when there is a public one.
3. **Billing in release** is unconfirmed; step 12 hedges Plan & usage ("when your
   account has one").
4. `wiki/connect-the-board.md` says **Upload** and **Board menu**; the app says **Flash**
   and **Board Connection**. Align when the owner agrees.
5. `.claude/launch.json` → `wiki` now has `autoPort: true` and no `--port` flag;
   `vite.config.ts` uses `PORT` when the preview tool assigns one, else 5179. Two
   sessions can now run the preview side by side.

## Sample projects (Academy)

- New course **Sample Projects** (`content/sample-projects/`, track `Sample Projects`,
  label SP), four pages with the new `type: project` (glyph Hammer, label "Sample
  project", rail meta P1–P4): Smart plant plot → Control home appliances → Quiz alarm →
  Air purifier, one "smarter room" story, easiest first.
- Source: site.incipeacademy.com/doc/{smart-plant-plot, control-home-appliances,
  quiz-alarm, air-purifier}, written for the **IA Kit** (built-in screen). Answers use
  only functions in those starters and the public IA Screen / SensorSync / Getting
  Started pages. Wi-Fi credentials in the starters were replaced with placeholders; a
  stray `)` and comment typos in the air purifier host were fixed.
- The original **air purifier guest** sketch is unfinished on the source site; the page
  shows it as far as it goes and lists the remaining steps in words (no invented
  receive call).
- Control home appliances is plain Arduino (IRremote + EEPROM, pins 2/3); 10 slots need
  4,220 bytes of EEPROM — the page says so.

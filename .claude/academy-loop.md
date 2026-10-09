GOAL — Incipe Academy content loop

Write every missing Academy session in curriculum/learning-curriculum.md as a
beginner-friendly notes page plus a slide deck, one session per iteration, until
the curriculum is fully covered. Work in the Incipe-Wiki repo and follow CLAUDE.md
and the newest file in handoffs/.

QUEUE (curriculum order; skip anything that already has a page)
- M1 AI Literacy: Sessions 2, 3, 4                          → content/m1-ai-literacy/
- M2 Fundamentals of Programming: Sessions 1, 2, 3, 4       → content/m2-fundamentals-of-programming/
- M3 INCIPE Board, Sensors & Modules: Sessions 1–10         → content/m3-incipe-board-sensors-modules/
- M4 Ideation: Sessions 1, 2                                → content/m4-ideation/
- M5 Presentation Training: Sessions 1–8                    → content/m5-presentation-portfolio/
Sessions are numbered per module (owner, 2026-10-09): label a page `Session N` within
its module, and write "M3 Session 1" when pointing to another module. Match sections by
title. Existing URLs and file names keep the old global numbers so links don't break. Leave the existing M2 Lessons 1–5
alone. If a new session overlaps one of them, link to it instead of repeating it.

OWNER DECISIONS (2026-10-09)
- M1 Session 4: skipped for now (no public command-line compile/upload path).
- M2 Session 1 (was 7): already covered by the existing M2 Lessons 1–5 decks. Do not write it.
- The M2 decks in raw/LMS/M2 Fundamentals of Programming/ are the standard for the
  Fundamentals module: match their content and level.
- M2 Sessions 2, 3, 4 (were 8, 9, 10): write only what the M2 lessons do not already teach (e.g. switch,
  while / do-while, writing your own functions; pointers and bitwise; structs and state
  machines), and link to the M2 lesson for everything else.

DONE WHEN
Every session in the queue has (1) a content page, (2) its notes in
lessons/<phase>/session-NN-<slug>.md pulled in with `body:`, (3) a deck made as a
Slides artifact, exported to .pptx AND .pdf in raw/LMS/<module>/ and ingested with
`npm run ingest` — the .pptx is the download, the .pdf is read on the page without
downloading — and (4) a line in the progress file. `npm run build` is clean
and nothing private is in dist/.

EACH ITERATION
1. Open the progress file handoffs/<today>-academy-content-loop.md (create it on
   the first run). Take the next unchecked session.
2. Read that session's curriculum section, the module's existing pages and the
   wiki/*.md pages for every part the session uses.
3. Write the notes, then build the deck from the notes (see SLIDES). Keep the style
   of content/m2-fundamentals-of-programming/04-arrays-for-loop.md: lesson
   overview, short sections, tables, checkpoints in <details>, a 3-point recap.
4. Verify (below), tick the session in the progress file with the deck's artifact
   link, and commit only that session's files.

FOR BEGINNERS
- The audience is secondary-school students who are not CS majors. Explain one new
  idea at a time and give a real-life analogy before any code.
- Keep code examples to 15 lines or fewer, and explain every line.
- The first time a term appears, define it in plain words.
- Each session gets a "Try it" exercise, 3–5 checkpoints with answers traced by
  hand, and the curriculum's Practice / AI Integration item turned into a concrete
  task.

ACCURACY
- Use only `incipe.*` functions that already appear in wiki/*.md, with the same
  name, arguments, return values and units given there. Never invent, rename or
  guess a function.
- Known gaps: the IMU is "coming soon", and the colour sensor has no published
  functions yet. If a session needs one of these, or anything else that isn't
  documented (pointers on hardware, etc.), write the lesson without it and add it
  to "Questions for the owner" in the progress file.
- Standard C++/Arduino code (Serial, millis, for, struct …) must be correct. If a
  local Arduino/ESP32 compiler is available, compile each sketch. If not, trace it
  by hand and say so in the progress file.
- Every checkpoint answer must match what the code actually prints.

SENSORS IN LESSONS
- Every time a lesson introduces a sensor, show it the way the Wiki does: a
  "One line of code" block with the single `float x = incipe.get…();` call, then a
  "What you get" table: value, unit/range, -1 when not detected, how often to read.
  Copy these facts from that sensor's wiki/<page>.md and link to it. Never state
  more than the Wiki page does.
- The IMU is "coming soon": link to /wiki/imu and use the joystick for practice.

SLIDES
- Build every deck from the Slides artifact type with the "Incipe Academy Slides"
  design system (https://claude.ai/artifact/AXmnrhmf757bBwN973EqfZ). Read it before
  the first deck and follow it exactly.
- Export each deck twice into raw/LMS/<module>/, with the same file name: as .pptx
  (Share › Export › PowerPoint) and as .pdf (Share › Export › PDF).
- On the page, set `source:` to the .pptx (the download) and `pdf:` to the .pdf. Run
  `npm run ingest`: it copies the PDF to public/files/<module>--<page>.view.pdf, and the
  page shows the deck cover with a "View slides" button that opens the PDF in place
  (plus an Open button for a new tab), so students can read it without downloading.
- Link the live deck from the page.
- Check in the browser that "View slides" shows the PDF on the page.

LINE-BY-LINE CODE ANIMATIONS
- In the first iteration only, build a reusable code walkthrough for the site: a
  fenced ```walkthrough block rendered by src/components/Markdown.tsx. It shows the
  code, highlights one line per step, gives a one-sentence explanation per step and
  shows variable values changing (e.g. i = 0 → 1 → 2), with Prev / Next / Play
  controls.
- Build it from existing inc-* classes and tokens only. Follow the design system:
  flat, one accent through --signal*, every press is scale(0.98). Respect
  prefers-reduced-motion and make it keyboard-operable.
- Use it for every loop, if/else, array and function example.
- In the Slides artifact, animate the same steps: highlight one line at a time and
  show the variables changing. Check the .pptx export. If the animation is lost
  there, the exported deck shows each step as its own slide instead.

SCREENSHOTS
- When a step happens in the INCIPE Workspace (AI chat, Verify, Upload, Board menu,
  Serial monitor/plotter), use a real screenshot. Capture the current Workspace app.
  Use ../Incipe-Workspace/raw/incipe-workspace-app-prototype/ only if it matches the
  current UI.
- Crop each screenshot to the area being taught and save it under
  public/screens/<module>/. Use the same images in the deck.
- Before saving, check that no file paths, emails, keys, tokens or firmware source
  are visible.

FIRMWARE PRIVACY (hard rule — applies to the repo and to every published deck)
- Never open, quote or summarise ../Incipe-Workspace/packages/skills/official/
  incipe-firmware/, OTA.md, lifecycle.md, firmware source or any internal
  Workspace / INCIPE-1 document.
- Teach only what a student types: `incipe.*` calls and their results. Do not
  describe pins, registers, libraries, protocols or anything else inside the
  firmware beyond what wiki/*.md already says publicly.
- Before each commit and each deck publish, grep the diff, the deck and dist/ for
  firmware file names and internal identifiers. Stop if anything matches.

VERIFY (every iteration)
- `npm run build` is clean.
- Check the new page in the browser pane (launch.json → wiki, port 5179) in dark
  and light themes and at <820px width. Step through every walkthrough. No console
  errors.
- Page through the deck once. Confirm it uses the Incipe Academy Slides design and
  that its code and sensor facts match the notes.

FILES
- Never edit curriculum/learning-curriculum.md or existing lessons/ files.
- New files in lessons/ and raw/LMS/ are allowed for this goal.

STOP AND ASK
Stop and ask when a session can't be taught accurately without undocumented
firmware behaviour, when the curriculum contradicts a wiki page, or when the queue
is empty. In each case, write a short summary in the progress file and stop.

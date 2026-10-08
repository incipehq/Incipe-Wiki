# 2026-10-09 — Academy content loop: progress

The loop in [`.claude/academy-loop.md`](../.claude/academy-loop.md) writes one missing
curriculum session per iteration: notes in `lessons/`, a page in `content/`, a deck
made as a Slides artifact (Incipe Academy Slides design system), exported to
`raw/LMS/<module>/` and ingested. This file is the queue and the log.

## Queue

### M1 AI Literacy → `content/m1-ai-literacy/`
- [x] Session 2 — AI-powered firmware development · deck: https://claude.ai/artifact/BHG96UPKkgByGiPcGzgerR · **.pptx and .pdf pending** (see Pending)
- [x] Session 3 — Terminal commands & environment setup · deck: https://claude.ai/artifact/WeMxkZxi3rjcN29Tf7uNAV · .pptx ingested · **.pdf pending**
- [-] Session 4 — Command line for embedded development · **skipped for now** (owner, 2026-10-09): no public command-line compile/upload path to teach

### Fundamentals of Programming (curriculum "M3") → `content/m2-fundamentals-of-programming/`
- [-] Session 7 — Introduction to C++ for embedded systems · **already covered** by the existing M2 Lessons 1–5 decks (owner, 2026-10-09); their content is the standard. A draft page was set aside, not committed.
- [ ] Session 8 — Control structures & functions · gaps only (owner): `switch`, `while` / `do-while`, own functions; link M2 Lessons 2 and 4
- [ ] Session 9 — Arrays, pointers & bitwise operations · gaps only: pointers, references, bitwise; link M2 Lesson 4 for arrays
- [ ] Session 10 — Structs & state machines (FSM) · not covered by M2 — write in full

### INCIPE Board, Sensors & Modules → `content/m3-incipe-board-sensors-modules/`
- [ ] Session 13 — Actuators: PWM & motor control
- [ ] Session 14 — Audio & indicators
- [ ] Session 15 — Input devices: joystick, IR & buttons
- [ ] Session 16 — Data logging with SD card
- [ ] Session 17 — Communication: IR transmitter & receiver
- [ ] Session 18 — Integration: Smart Garden
- [ ] Session 19 — Integration: Game Console
- [ ] Session 20 — System integration & debugging

### Ideation → `content/m4-ideation/`
- [ ] Session 5 — Design thinking & problem statement
- [ ] Session 6 — Product-market fit & solution validation

### Presentation & Portfolio → `content/m5-presentation-portfolio/`
- [ ] Sessions 21–28

## Log

### Iteration 1 — shared walkthrough block

- `src/components/Walkthrough.tsx` + `src/components/Markdown.tsx`: a fenced
  ` ```walkthrough ` block renders as a stepper — code with one line lit, a sentence
  per step, variables with their history (`i = 0 → 1 → 2`), an optional Serial
  monitor pane, Prev / Play / Next. Arrow keys, Home / End and `p` work when the
  block has focus. Styles in `src/wiki.css` (`.wk-walk*`), tokens only; reduced
  motion drops the line transition. Syntax is documented at the top of the
  component.

### Iteration 1 — Session 2: AI-powered firmware development

- Notes: `lessons/m1-ai-literacy/session-02-ai-powered-firmware-development.md`; page:
  `content/m1-ai-literacy/02-ai-powered-firmware-development.md` (`body:` + a link to the
  live deck). M1 notes live in `lessons/m1-ai-literacy/` — the existing `phase-2/` folder
  does not say which weeks "phase 1" is, so module names are used instead.
- Sensor: DHT11 only, facts copied from `wiki/temperature-humidity.md`.
- Code: AI draft (`double` + `String`) vs optimised `printClimate()` (`float`, −1 check,
  printed piece by piece). One walkthrough block (10 steps, Serial output shown).
- Screenshots (`public/screens/m1-ai-literacy/`): the AI chat composer with the lesson
  prompt, and the top bar. Captured from the running Workspace dev build (Electron) in a
  throwaway project in the session scratchpad; no paths, emails or keys visible.
- Deck: 29 slides, Slides type + Incipe Academy Slides design system (installed: tokens,
  logo, cover texture). The walkthrough is one slide per step with a magic-move
  highlight, so the .pptx keeps every step even if the animation is lost.
- Verified: `npm run build` clean; page checked in dark, light and 375px; walkthrough
  stepped with buttons, arrow keys, Home / End; no console errors. Privacy grep of the
  notes, page, component and deck: no matches.

### Iteration 2 — Session 3: Terminal commands & environment setup

- Notes: `lessons/m1-ai-literacy/session-03-terminal-commands-environment-setup.md`; page:
  `content/m1-ai-literacy/03-terminal-commands-environment-setup.md`.
- Covers the curriculum's six commands (`ls`, `cd`, `mkdir`, `rm`, `cp`, `mv`) plus `pwd`
  and `touch` (needed to show where you are and to make a file), a project-folder layout,
  and Git (`config`, `init`, `status`, `add`, `commit`, `log`) and GitHub (`remote add`,
  `push`). The curriculum has no Practice item for this session; the practice task is a
  Terminal screenshot proving all three skills.
- Every command and its output was run for real (macOS zsh, git 2.53) in a scratch folder;
  paths in the notes use a placeholder user `alex`. Commit hashes and the default branch
  name are flagged as different per student.
- Walkthrough block gained `output: Terminal` to rename its output pane; three
  walkthroughs on this page. No board, no `incipe.*` calls, no Workspace screens.
- Deck: 25 slides, same design system install; Terminal sessions drawn as dark panels.
- Verified: build clean; page in light theme and 375px; all three walkthroughs stepped to
  the end; no console errors. Privacy grep clean.

### Iteration 3 — PDF viewing, Session 7 set aside

- Owner asked for every deck to be readable on the site without downloading. Pages now
  take `pdf:` beside `source:`; the ingest copies it to `public/files/…view.pdf` and the
  page opens it in place behind a "View slides" button (commit `4f45c9b`). Checked with
  a throwaway PDF, then reverted. `.claude/academy-loop.md` now asks for a .pptx **and**
  a .pdf export of every deck.
- Session 3's .pptx (exported by the owner) is the page's download now.
- Session 7: owner says the existing M2 decks already are Session 7 and are the standard.
  The draft page written this iteration was moved out of the repo; its Session 7 deck
  artifact (https://claude.ai/artifact/V3UBH8Hr1jtLUUeS3r43qi) was created but left empty.

## Pending

- **Deck exports (.pptx + .pdf).** The browser pane here is not signed in to claude.ai, so
  decks cannot be exported from this session. For each deck: open it, Share › Export ›
  PowerPoint and › PDF, save both into `raw/LMS/<module>/`; the loop then sets `source:`
  and `pdf:` and runs `npm run ingest`.
  - Session 2 → .pptx and .pdf
  - Session 3 → .pdf (the .pptx is in)
- Stray files in `raw/` (a throwaway test PDF and a copy of the M2 Lesson 2 deck in the M1
  folder) were deleted with the owner's OK on 2026-10-09.
- **More Workspace screenshots for Session 2** (owner approved capturing from the dev
  build on 2026-10-09). Still missing: a Verify result, the code editor with the AI
  draft, and the Console showing output. What the dev build showed when they were tried:
  - The AI answered the lesson prompt and wrote the project, but the dev build's Verify
    compiled it with the local toolchain and failed on the missing runtime header. The
    Console then prints full local file paths, so that screen cannot be published.
  - The board was offline, so there was no Serial output to capture.
  - The dev build then quit (not relaunched from here — it lives in `../Incipe-Workspace`).
  To finish: run the dev build with a board connected and the Incipe build service,
  then capture a passing Verify, the editor and the Console's Serial tab.

## Questions for the owner

1. **Upload or Flash?** The Wiki (`connect-the-board.md`) calls the button **Upload**; the
   current Workspace build labels it **Flash** (its accessibility name). The notes say
   Upload. Which name should lessons use?
2. **Code font in decks.** The design system has one face (Helvetica Neue) and no
   monospace. Decks use Courier New (a basic face that survives .pptx) for code. OK, or
   add a mono face to the design system?
3. **`startUserThreads()`** appears in the built site, from the existing Session 11 and 12 notes
   (`lessons/phase-2/session-11-analog-sensors-adc.md`, `session-12-digital-sensors-protocols.md`). It is not in any `wiki/*.md`
   page, so new lessons do not use it. Is it approved for publication?
4. The dev build shows a "Test mode" banner with a staging URL on new projects; it was
   dismissed before capturing and is not in any screenshot.

6. **Actuator functions have no published arguments.** `wiki/led-strip.md`, `buzzer.md`,
   `motor.md`, `servo.md`, `pump.md`, `ir-sender.md`, `ir-receiver.md` and `sd-card.md` have
   a summary naming functions but no body: no argument meanings, ranges or units
   (e.g. what `incipe.setLEDcolour(...)` takes, the range of `setMotorSpeed(speed)`, valid
   `writeMicroseconds` values). Sessions 8, 10 and 13–19 need them for their practice
   tasks; until they are published those lessons can only describe the hardware step.
5. **Session 4 needs the build path.** The curriculum says "use the terminal to compile and
   upload firmware" and "automate the process using INCIPE Board". The public Wiki says
   compilation happens on Incipe's build service, and the dev build's local compile fails
   without the private runtime. Is there a student-facing command-line way to compile and
   upload (e.g. a Workspace CLI), or should Session 4 teach the terminal around the
   Workspace (project folders, Git, Serial logs) instead? The loop stops here until answered.

## How code was checked

`arduino-cli` with `esp32:esp32` 3.3.10 is installed. Sketches are compiled against a
throwaway stub (`incipe` object declaring only functions published in `wiki/*.md`,
kept in the session scratchpad, never in this repo) for the ESP32 Dev Module target.

| Session | Result |
| --- | --- |
| 2 | Both `readClimate()` (AI draft) and `printClimate()` plus a thread that calls it every 2000 ms compile for `esp32:esp32:esp32`; `static_assert` confirms `float` = 4 and `double` = 8 bytes. Printed values (`23.40`, `51.00`) follow Arduino's two-decimal `print(float)`. |

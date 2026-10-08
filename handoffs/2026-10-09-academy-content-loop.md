# 2026-10-09 — Academy content loop: progress

The loop in [`.claude/academy-loop.md`](../.claude/academy-loop.md) writes one missing
curriculum session per iteration: notes in `lessons/`, a page in `content/`, a deck
made as a Slides artifact (Incipe Academy Slides design system), exported to
`raw/LMS/<module>/` and ingested. This file is the queue and the log.

## Queue

### M1 AI Literacy → `content/m1-ai-literacy/`
- [x] Session 2 — AI-powered firmware development · deck: https://claude.ai/artifact/BHG96UPKkgByGiPcGzgerR · **.pptx export pending** (see Pending)
- [ ] Session 3 — Terminal commands & environment setup
- [ ] Session 4 — Command line for embedded development

### Fundamentals of Programming (curriculum "M3") → `content/m2-fundamentals-of-programming/`
- [ ] Session 7 — Introduction to C++ for embedded systems
- [ ] Session 8 — Control structures & functions
- [ ] Session 9 — Arrays, pointers & bitwise operations
- [ ] Session 10 — Structs & state machines (FSM)

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

## Pending

- **.pptx exports.** The browser pane here is not signed in to claude.ai, so decks cannot
  be exported from this session. For each deck: open it, Share › Export › PowerPoint, save
  into `raw/LMS/<module>/`, then add `source:` to the page and run `npm run ingest`.
  - Session 2 → `raw/LMS/M1 AI Literacy/Session 2 AI-Powered Firmware Development.pptx`
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

## How code was checked

`arduino-cli` with `esp32:esp32` 3.3.10 is installed. Sketches are compiled against a
throwaway stub (`incipe` object declaring only functions published in `wiki/*.md`,
kept in the session scratchpad, never in this repo) for the ESP32 Dev Module target.

| Session | Result |
| --- | --- |
| 2 | Both `readClimate()` (AI draft) and `printClimate()` plus a thread that calls it every 2000 ms compile for `esp32:esp32:esp32`; `static_assert` confirms `float` = 4 and `double` = 8 bytes. Printed values (`23.40`, `51.00`) follow Arduino's two-decimal `print(float)`. |

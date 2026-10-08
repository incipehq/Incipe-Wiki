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
- [x] Session 8 — Control structures & functions (gaps only) · deck: https://claude.ai/artifact/1iVoDUPtWW9MHdcp8iPhm3 · **.pptx and .pdf pending**
- [x] Session 9 — Arrays, pointers & bitwise operations (gaps only) · deck: https://claude.ai/artifact/XWTrgHUxz6Myt7j681mfM3 · **.pptx and .pdf pending**
- [x] Session 10 — Structs & state machines (FSM) · deck: https://claude.ai/artifact/J9nYPccoVnefmod11t4Ji4 · **.pptx and .pdf pending**

### INCIPE Board, Sensors & Modules → `content/m3-incipe-board-sensors-modules/`
- [ ] Session 13 — Actuators: PWM & motor control · **stopped: needs the owner** (Question 8)
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

### Iteration 4 — Session 8: Control structures & functions (gaps only)

- Notes: `lessons/m2-fundamentals-of-programming/session-08-control-structures-functions.md`;
  page: `content/m2-fundamentals-of-programming/08-control-structures-functions.md`.
- Teaches only what M2 Lessons 2–4 do not: `switch` (with fall-through), `while` and
  `do-while`, writing functions with parameters and return values; links back to the M2
  lessons for `if`/`else`, the button release pattern and `for`. Follows the M2 style:
  `setup()`/`loop()`, Serial at 9600, `incipe.getButtonResponse()` read in `loop()`.
- Practice (Digital Dice) shows the roll on the Serial monitor; the LED-strip display waits
  on the LED strip page (Question 6). AI task: an AI-style `millis()` debounce, reviewed.
- Four walkthroughs; deck 52 slides, one slide per walkthrough step.
- Checked: every printed result run on the host (C++17) and the full sketch compiled for
  `esp32:esp32:esp32` against the scratch stub; build clean; page at 375px; no console
  errors; privacy grep clean.

### Iteration 5 — Session 9: Arrays, pointers & bitwise (gaps only)

- Notes: `lessons/m2-fundamentals-of-programming/session-09-arrays-pointers-bitwise.md`; page:
  `content/m2-fundamentals-of-programming/09-arrays-pointers-bitwise.md`.
- New: references (`int &x`), pointers (`&`, `*`, arrays passed without copying), bitwise
  `& | ^ << >>` on a byte of flags (plus `~` to clear a bit). Arrays and averaging link back
  to Lesson 4. Practice: the curriculum's moving average of 10 light readings, with the
  low-start effect called out and a task to fix it.
- "Register-level control" and "pointers for hardware manipulation" are taught only in
  general terms: the notes say the INCIPE runtime handles the hardware and students use
  these tools on their own data (Question 7).
- Five walkthroughs; deck 59 slides, one per step.
- Checked: all printed values run on the host; full sketch compiled for
  `esp32:esp32:esp32`; build clean; 375px; no console errors; privacy grep clean.

### Iteration 6 — Session 10: Structs & state machines (in full)

- Notes: `lessons/m2-fundamentals-of-programming/session-10-structs-state-machines.md`; page:
  `content/m2-fundamentals-of-programming/10-structs-state-machines.md`.
- `struct SensorData` filled by `readAll()` from the temperature, humidity and light
  sensors (Wiki-style "One line of code" + "What you get"); state machines with an `enum`,
  planned as a table, then the curriculum's Red → Yellow → Green traffic light as a
  `switch`. The practice runs on the Serial monitor; the LED-strip version waits for the
  strip's published arguments (Question 6). AI review prompt plus a reviewer checklist.
- Two walkthroughs; deck 35 slides, one per step.
- Checked: `sizeof` 12, `21.50`, `23.40 700.00`, RED/YELLOW/GREEN/RED and the 7000 ms
  cycle run on the host; the full sketch compiled for `esp32:esp32:esp32`; build clean;
  both themes and 375px; no console errors; privacy grep clean.

### Iteration 7 — Session 13: stopped and asked

- Session 13's practice is "sweep the Servo from 0° to 180° and control DC motor speed with
  a potentiometer". `wiki/servo.md` and `wiki/motor.md` are frontmatter only: they name
  `incipe.writeMicroseconds(value)` and `incipe.setMotorSpeed(speed)` but give no range,
  no direction rule and no example, so neither the sweep nor the speed control can be
  written accurately. There is no potentiometer page on the Wiki at all.
- The same gap blocks most of the module: Sessions 14 (buzzer, LED strip), 16 (SD card),
  17 (IR sender/receiver), 18 (pump, servo, LED strip) and 19 (LED strip as a display).
  Session 15's joystick half and Session 20's debugging half are teachable today.
- Nothing written for Session 13. The loop stops here (STOP AND ASK) — Question 8.

## Pending

- **Deck exports (.pptx + .pdf).** The browser pane here is not signed in to claude.ai, so
  decks cannot be exported from this session. For each deck: open it, Share › Export ›
  PowerPoint and › PDF, save both into `raw/LMS/<module>/`; the loop then sets `source:`
  and `pdf:` and runs `npm run ingest`.
  - Session 2 → .pptx and .pdf
  - Session 3 → .pdf (the .pptx is in)
  - Session 8 → .pptx and .pdf
  - Session 9 → .pptx and .pdf
  - Session 10 → .pptx and .pdf
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
7. **Register-level work.** Session 9's curriculum line mentions bitwise operators "for
   register-level control" and pointers "for hardware manipulation". Nothing public says
   whether students may touch ESP32 registers on the INCIPE Board (or whether that would
   interfere with the runtime), so the lesson keeps both on students' own data. Is a
   register example wanted, and is it safe alongside the runtime?
8. **Sessions 13–19 need the actuator and module pages.** What do `setMotorSpeed(speed)`
   (range, and how to reverse), `writeMicroseconds(value)` (the µs for 0° and 180°),
   the buzzer, LED strip, SD card, IR and pump functions take? And the curriculum's
   potentiometer has no Wiki page — is there a potentiometer module, or should Session 13
   use the joystick X axis as the dial? Until then: wait, write the teachable parts only,
   or move on to Ideation (5–6) and Presentation (21–28)?
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
| 9 | References (60 vs 50 by copy), pointer write (600), `*p * 2` (10), flags (`101`, `1`, `100`), `6&3`=2, `6\|1`=7, `1<<4`=16, `average({10,20,30})`=20 and the moving-average prints `50.00`, `102.00` run on the host; the full sketch compiles for `esp32:esp32:esp32`. |
| 8 | `showDice`, the countdown, `do-while`, `addDice` and the fall-through checkpoint run on the host with the printed results in the notes; the Digital Dice sketch (with `rollDice`, `showDice`, release logic and the debounce) compiles for `esp32:esp32:esp32`. |
| 2 | Both `readClimate()` (AI draft) and `printClimate()` plus a thread that calls it every 2000 ms compile for `esp32:esp32:esp32`; `static_assert` confirms `float` = 4 and `double` = 8 bytes. Printed values (`23.40`, `51.00`) follow Arduino's two-decimal `print(float)`. |
| 10 | `sizeof(SensorData)` = 12 (static_assert), `21.50`, `23.40 700.00`, the first four states RED, YELLOW, GREEN, RED and the 7000 ms cycle run on the host; the full sketch compiles for `esp32:esp32:esp32`. |

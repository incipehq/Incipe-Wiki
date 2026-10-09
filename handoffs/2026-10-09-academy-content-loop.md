# 2026-10-09 — Academy content loop: progress

The loop in [`.claude/academy-loop.md`](../.claude/academy-loop.md) writes one missing
curriculum session per iteration: notes in `lessons/`, a page in `content/`, a deck
made as a Slides artifact (Incipe Academy Slides design system), exported to
`raw/LMS/<module>/` and ingested. This file is the queue and the log.

## Queue

> **Two courses (owner, 2026-10-09):** the Academy is now **Incipe 101** (M1–M5, below) and
> the **Taster Workshop** (`content/taster-workshop/`, Lessons 1–6). The old M2 Lessons 1–5
> moved there (old URLs redirect in `vercel.json`); Lesson 6 *Advanced programming* is new.
> Decks now live in `raw/LMS/Incipe 101/<module>/` and `raw/LMS/Taster Workshop/`. Where a
> session below says "Lesson N", it now means Taster Workshop Lesson N.

> **Numbering (owner, 2026-10-09):** the curriculum now numbers sessions per module —
> M1 Session 1–4, M2 Session 1–4, M3 Session 1–10, M4 Session 1–2, M5 Session 1–8.
> The queue uses the new numbers; the log below keeps the old global ones it was written
> with (old M2 8–10 = new M2 2–4; old 11–20 = M3 1–10; old 5–6 = M4 1–2; old 21–28 = M5 1–8).
> Pages, notes and decks were relabelled; URLs and file names keep the old numbers so
> links don't break.

### M1 AI Literacy → `content/m1-ai-literacy/`
- [x] Session 2 — AI-powered firmware development · deck: https://claude.ai/artifact/BHG96UPKkgByGiPcGzgerR · .pptx + .pdf ingested
- [x] Session 3 — Terminal commands & environment setup · deck: https://claude.ai/artifact/WeMxkZxi3rjcN29Tf7uNAV · .pptx + .pdf ingested
- [-] Session 4 — Command line for embedded development · **skipped for now** (owner, 2026-10-09): no public command-line compile/upload path to teach

### M2 Fundamentals of Programming → `content/m2-fundamentals-of-programming/`
- [-] Session 1 — Introduction to C++ for embedded systems · **already covered** by the existing M2 Lessons 1–5 decks (owner, 2026-10-09); their content is the standard. A draft page was set aside, not committed.
- [x] Session 2 — Control structures & functions (gaps only) · deck: https://claude.ai/artifact/1iVoDUPtWW9MHdcp8iPhm3 · .pptx + .pdf ingested
- [x] Session 3 — Arrays, pointers & bitwise operations (gaps only) · deck: https://claude.ai/artifact/XWTrgHUxz6Myt7j681mfM3 · .pptx + .pdf ingested
- [x] Session 4 — Structs & state machines (FSM) · deck: https://claude.ai/artifact/J9nYPccoVnefmod11t4Ji4 · .pptx + .pdf ingested

### M3 INCIPE Board, Sensors & Modules → `content/m3-incipe-board-sensors-modules/`
- [-] Session 3 — Actuators: PWM & motor control · **waiting on Question 8** (servo/motor arguments, potentiometer)
- [-] Session 4 — Audio & indicators · **waiting on Question 8** (buzzer and LED-strip arguments)
- [x] Session 5 — Input devices: joystick, IR & buttons · deck: https://claude.ai/artifact/GsYUWtugSMCYyt2sRSrc5s · .pptx ingested · **.pdf pending** · IR part waits on Question 8
- [-] Session 6 — Data logging with SD card · **waiting on Question 8** (no SD-card functions on the Wiki)
- [-] Session 7 — Communication: IR transmitter & receiver · **waiting on Question 8** (IR receiver has no functions; `sendIRRawSignal(signal, brand)` has no argument details)
- [x] Session 8 — Integration: Smart Garden · deck: https://claude.ai/artifact/7iYBBA6gmgnSRtyasXKe6N · .pdf ingested · **.pptx pending** · pump, servo and LED strip are stand-ins until Question 8
- [x] Session 9 — Integration: Game Console · deck: https://claude.ai/artifact/QQCAomhxZDStqkqksk6C96 · .pdf ingested · **.pptx pending** · Serial Monitor stands in for the LED strip; IR waits on Question 8
- [x] Session 10 — System integration & debugging · deck: https://claude.ai/artifact/GmjhTWBmxy7yWvcnQDSGWR · **.pptx and .pdf pending**

### M4 Ideation → `content/m4-ideation/`
- [x] Session 1 — Design thinking & problem statement · deck: https://claude.ai/artifact/5Ymhf282z3sFX7AfFFdmJS · **.pptx and .pdf pending**
- [x] Session 2 — Product-market fit & solution validation · deck: https://claude.ai/artifact/TqDZsjkCKen8hGR5jU8Rav · **.pptx and .pdf pending**

### M5 Presentation & Portfolio → `content/m5-presentation-portfolio/`
- [x] Session 1 — Storytelling & product pitching · deck: https://claude.ai/artifact/P94BFvvKkN2RSv4v3ZTVmt · **.pptx and .pdf pending**
- [x] Session 2 — Presentation techniques · deck: https://claude.ai/artifact/VCzmzzKhuTL9pWBdTcreQ4 · **.pptx and .pdf pending**
- [x] Session 3 — Technical presentation skills · deck: https://claude.ai/artifact/1aWhicnoqqrU6zWPS2DB7k · **.pptx and .pdf pending**
- [x] Session 4 — Final pitch & career preparation · deck: https://claude.ai/artifact/Fo1h24NLqrnjFENmaR7oFi · **.pptx and .pdf pending**
- [ ] Session 5 — Portfolio & project showcase
- [ ] Session 6 — Technical knowledge prep
- [ ] Session 7 — Building a technical CV & LinkedIn
- [ ] Session 8 — Application strategy & networking

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

### Iteration 8 — Session 15: Input devices (joystick and button; IR waits)

- The owner said "continue with the loop" after the Session 13 stop. Sessions 13 and 14
  stay parked on Question 8; the loop moved to the next session it can teach accurately.
- Notes: `lessons/m3-incipe-board-sensors-modules/session-15-input-devices.md`; page:
  `content/m3-incipe-board-sensors-modules/15-input-devices.md`.
- Joystick introduced Wiki-style; students find their own limits in the Plotter (linking
  Session 12's worksheet). The code uses 25 and 75 as stand-in limits, labelled as such,
  because the Wiki gives no range. `zone()` treats -1 as resting. The edge idea (just
  pushed / just released) drives the curriculum's joystick menu on the Serial Monitor;
  the push button (`1` / `0` / `-1`, from the Wiki) selects on release.
- IR receiver: its page has no functions, so the lesson only says the part is coming.
- Three walkthroughs; deck 52 slides, one per step.
- Checked: `zone()` results, the menu sequence (Humidity, Temperature, Light), the wrap,
  one line per held push and one `showChoice()` per release run on the host; the full
  sketch compiled for `esp32:esp32:esp32`; build clean; dark, light and 375px; every
  walkthrough stepped; no console errors; privacy grep clean.
- Not captured: a Workspace Serial Monitor screenshot (the dev build is not running).

### Iteration 9 — Session 18: Smart Garden (logic in full, actuators as stand-ins)

- Sessions 16 (SD card) and 17 (IR) have no published functions to teach, so they are
  parked on Question 8 with 13 and 14. Session 18's sensors are all documented and its
  hard part is the decision logic, so it is written in full, with `Serial.println`
  stand-ins (`PUMP ON` / `PUMP OFF`) where the pump, servo and LED-strip calls will go —
  the same approach as the LED strip in Session 10.
- Notes: `lessons/m3-incipe-board-sensors-modules/session-18-smart-garden.md`; page:
  `content/m3-incipe-board-sensors-modules/18-smart-garden.md`.
- New: `wetPercent()` from the Session 11 calibration (works for either probe
  direction; stand-in values 100 dry / 40 wet, labelled), hysteresis with `START` 30 and
  `STOP` 60 as a two-state machine with a `bool`, and the −1 fail-safe. Grow light and
  window are task steps. AI prompt for thresholds plus a reviewer checklist.
- Two walkthroughs; deck 38 slides, one per step.
- Checked: `wetPercent` 70→50, 100→0, 40→100, −1→168.33, and the watering rounds
  (70, 85, 73, 61, −1 → PUMP ON once, PUMP OFF once, nothing on −1) run on the host;
  the full sketch compiled for `esp32:esp32:esp32`; build clean; dark, light and 375px;
  every walkthrough stepped; no console errors; privacy grep clean.

### Iteration 10 — M3 Session 9: Game Console (logic in full, Serial as the screen)

- Files keep the old global number so the module stays in order:
  `content/m3-incipe-board-sensors-modules/19-game-console.md`,
  `lessons/m3-incipe-board-sensors-modules/session-19-game-console.md`.
- The LED strip is the curriculum's display, but `setLEDcolour(...)` has no published
  arguments, so the Serial Monitor is the screen: one character per pixel, one line per
  frame. The notes map `print` → `setLEDcolour` and `println` → `showLED()`, the two names
  the Wiki gives, and say only `draw()` changes when the arguments are published.
- Practice "Strip Catcher": the joystick edge from Session 5 moves you, `constrain`
  keeps you on a 6-pixel strip, `%` wraps the fruit; the push button restarts (task).
  The IR remote waits for Session 7.
- Two walkthroughs; deck 37 slides, one per step.
- Checked: `draw()` prints `P...*.  score 0`; a catch from 3 → `.*..P.  score 1`; the
  wall → `.*...P  score 1`; `constrain(-1,0,5)`=0; `(4+3)%6`=1, `(5+3)%6`=2; run on the host.
  The full sketch compiles for `esp32:esp32:esp32`; build clean; dark, light and the
  narrow layout; both walkthroughs stepped; no console errors; privacy grep clean.

### Iteration 11 — M3 Session 10: System integration & debugging

- Files: `content/m3-incipe-board-sensors-modules/20-system-integration-debugging.md`,
  `lessons/m3-incipe-board-sensors-modules/session-20-system-integration-debugging.md`.
- The method (symptom → clue → hypothesis → one change → retest) and integrating one
  module at a time. A real bug hunt: the Smart Garden with `if (raw = -1)`, found with
  labelled `[debug]` prints. Logic analyzers explained as a concept only (no pins or
  board internals). Practice: two test plans (Smart Garden, Game Console) whose expected
  results come from the Session 8 and 9 code. AI prompt to predict edge cases, checked on
  the board.
- One walkthrough; deck 28 slides.
- Checked: the buggy round prints `[debug] raw=-1.00 wet=100.00`; fixed with 85 →
  `[debug] raw=85.00 wet=25.00` + `PUMP ON`; fixed with −1 → the same line as the bug;
  −1 while watering → `PUMP OFF`; run on the host. The buggy sketch compiles for
  `esp32:esp32:esp32` silently by default and warns ("suggest parentheses around
  assignment used as truth value") only with all warnings on — the notes say exactly
  that. Build clean; dark, light, narrow; walkthrough stepped; no console errors;
  privacy grep clean.

### Iteration 12 — owner's deck exports ingested; M4 Session 1: Design thinking

- The owner exported nine decks into `raw/LMS/`. Pages now name them (`source:` and, where
  there is one, `pdf:`; a page with only a .pdf uses it as `source:`, which the ingest
  serves as both download and viewer) and `npm run ingest` ran: page counts match every
  deck. "View slides" checked for a PDF-only page, a .pptx-only page and a page with both.
- M4 Session 1 files: `content/m4-ideation/01-design-thinking-problem-statement.md`,
  `lessons/m4-ideation/session-01-design-thinking-problem-statement.md` (M4 has no older
  pages, so its file numbers match the new session numbers).
- Empathy methods, pain point vs solution, the problem statement template and
  "How might we" (too broad / too narrow / just right), brainstorm rules, and the INCIPE
  building blocks taken from each Wiki page's own one-line description (IMU coming soon,
  colour sensor unpublished). Workshop: five IoT ideas with a template. No code, so no
  walkthrough; checkpoints are reasoning questions.
- Deck 23 slides. Checked: every `/wiki/` link resolves; build clean; dark, light,
  narrow; no console errors; privacy grep clean.

### Iteration 13 — M4 Session 2: Product-market fit & solution validation

- Files: `content/m4-ideation/02-product-market-fit-validation.md`,
  `lessons/m4-ideation/session-02-product-market-fit-validation.md`.
- Product-market fit (key-and-lock analogy, three signals, why it matters for a
  portfolio); narrowing the curriculum's three audiences; validation questions about past
  behaviour; sketches and flowcharts, with the M3 Session 8 watering logic drawn as a
  flowchart that matches the code (the −1 branch counts as 100 % wet); the nine Lean Canvas
  boxes with a worked Smart Garden example whose prices are `[ ]` placeholders; the
  3-minute problem-statement pitch (20/60/40/40/20 s).
- Deck 21 slides; the flowchart is drawn with shapes and connectors. Checked: build clean;
  dark, light, narrow (the text flowchart fits and scrolls inside its block); no console
  errors; privacy grep clean.

### Iteration 14 — M5 Session 1: Storytelling & product pitching

- Files: `content/m5-presentation-portfolio/01-storytelling-product-pitching.md`,
  `lessons/m5-presentation-portfolio/session-01-storytelling-product-pitching.md`.
- Stories vs feature lists; the curriculum's Problem → Solution → Technology → Impact with
  a Smart Garden example; impact backed only by the students' own numbers (`[ ]`
  placeholders, never invented); the Hero's Journey in six beats with the user as hero and
  the product as guide (Mei is labelled a made-up example); a 5-minute script template
  (30/60/60/75/45/30 s) and a partner check. AI used as an editor that must not add facts.
- Deck 18 slides. Checked: build clean; dark, light, narrow; no console errors; privacy
  grep clean.

### Iteration 15 — M5 Session 2: Presentation techniques

- Files: `content/m5-presentation-portfolio/02-presentation-techniques.md`,
  `lessons/m5-presentation-portfolio/session-02-presentation-techniques.md`.
- Slide rules and a block diagram of the Smart Garden (inputs → board → outputs); body
  language, voice (pace, pause, volume, variety, fillers) and nerves (rehearsal,
  breathing, the first 30 seconds); INCIPE-specific demo risks (a −1 reading, connection,
  an old sketch, conditions) with a checklist and a backup video; small-group practice
  with roles and a glow-and-grow form.
- Deck 20 slides; the block diagram is drawn with boxes and elbow connectors. Checked:
  build clean; dark, light, narrow (the text diagram fits); no console errors; privacy
  grep clean.

### Iteration 16 — M5 Session 3: Technical presentation skills

- Files: `content/m5-presentation-portfolio/03-technical-presentation-skills.md`,
  `lessons/m5-presentation-portfolio/session-03-technical-presentation-skills.md`.
- Three levels of detail (map-app analogy) and a jargon-to-analogy table; architecture in
  three views (system, data flow sense → clean → decide → act, code map); a walkthrough
  that narrates the two hysteresis lines from M3 Session 8 in plain words (values 25 → 65,
  the same as the Session 8 trace); honesty about AI (did / checked / changed); handling
  questions without inventing answers; a six-slide mock architecture talk with three
  audience roles. "Firmware" is defined as the student's own code; the board's runtime is
  mentioned only as the Wiki describes it (it detects modules on its own).
- Deck 24 slides. Checked: build clean; dark, light, narrow; walkthrough stepped (PUMP ON,
  PUMP OFF); no console errors; privacy grep clean.

### Iteration 17 — M5 Session 4: Final pitch & career preparation

- Files: `content/m5-presentation-portfolio/04-final-pitch-career-preparation.md`,
  `lessons/m5-presentation-portfolio/session-04-final-pitch-career-preparation.md`.
- An eight-point deck polish check (no `[ ]` placeholders or invented numbers left); a
  README template for an INCIPE project ("How to run it" points to the Wiki's Connect the
  board page and says "upload", the Wiki's word); a 60–90 s demo-video storyboard, filming
  tips and a privacy check before publishing (no paths, emails, passwords, keys; consent to
  film classmates); the showcase run of show with a code freeze, and what a panel often
  looks for — framed so the instructors' own rubric takes priority.
- Deck 19 slides. Checked: build clean; dark, light, narrow; no console errors; privacy
  grep clean.

## Pending

- **Deck exports (.pptx + .pdf).** The browser pane here is not signed in to claude.ai, so
  decks cannot be exported from this session. For each deck: open it, Share › Export ›
  PowerPoint and › PDF, save both into `raw/LMS/<module>/`; the loop then sets `source:`
  and `pdf:` and runs `npm run ingest`.
  - Ingested 2026-10-09 (owner's exports): M1 S2 (.pptx + .pdf), M1 S3 (+ .pdf),
    M2 S2 (.pdf), M2 S3 (.pdf), M2 S4 (.pptx + .pdf), M3 S5 (.pptx), M3 S8 (.pdf),
    M3 S9 (.pdf). A page with only a .pdf serves it as the download and the viewer.
  - Still to export: M2 Session 2 → .pptx · M2 Session 3 → .pptx · M3 Session 5 → .pdf ·
    M3 Session 8 → .pptx · M3 Session 9 → .pptx · M3 Session 10 → .pptx and .pdf ·
    M4 Session 1 → .pptx and .pdf · M4 Session 2 → .pptx and .pdf ·
    M5 Session 1 → .pptx and .pdf · M5 Session 2 → .pptx and .pdf ·
    M5 Session 3 → .pptx and .pdf · M5 Session 4 → .pptx and .pdf
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
8. **M3 Sessions 3–9 (old 13–19) need the actuator and module pages.** What do `setMotorSpeed(speed)`
   (range, and how to reverse), `writeMicroseconds(value)` (the µs for 0° and 180°),
   the buzzer, LED strip, SD card, IR and pump functions take? And the curriculum's
   potentiometer has no Wiki page — is there a potentiometer module, or should M3 Session 3
   use the joystick X axis as the dial? Until then: wait, write the teachable parts only,
   or move on to M4 Ideation and M5 Presentation?
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
| 15 | `zone(90)`=1, `zone(-1)`=0, `zone(10)`=-1; the menu prints `Humidity`, `Temperature`, `Light` for readings 50, 90, 90, 50, 10, 50, 10; `choice` 2 + 1 wraps to `Temperature`; a 10-pass hold prints once; a 3-pass button hold calls `showChoice()` once; run on the host. The full sketch compiles for `esp32:esp32:esp32`. |
| 18 | `wetPercent` 70→50, 100→0 (Arduino prints `0.00`), 40→100, −1→168.33; watering rounds 70, 85, 73, 61, −1 print `PUMP ON` then `PUMP OFF` once each and nothing on −1; run on the host. The full sketch compiles for `esp32:esp32:esp32`. |
| M3 9 (old 19) | `draw()` → `P...*.  score 0`; catch from 3 → `.*..P.  score 1`, fruit 1; push at the wall → `.*...P  score 1`; `constrain(-1, 0, 5)`=0; `(5+3)%6`=2; run on the host. The full sketch compiles for `esp32:esp32:esp32`. |
| M3 10 (old 20) | Buggy `if (raw = -1)` with 85 → `[debug] raw=-1.00 wet=100.00`, no pump; fixed → `[debug] raw=85.00 wet=25.00`, `PUMP ON`; −1 → `[debug] raw=-1.00 wet=100.00`; −1 while watering → `PUMP OFF`; run on the host. Compiles for `esp32:esp32:esp32`; `-Wparentheses` warning only with `--warnings all`. |

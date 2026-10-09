# Session 10: System Integration & Debugging

> **M3 INCIPE Board, Sensors & Modules** · Weeks 9–13
> **Projects tested:** the Smart Garden ([Session 8](/academy/m3-incipe-board-sensors-modules/18-smart-garden)) and the Game Console ([Session 9](/academy/m3-incipe-board-sensors-modules/19-game-console))

## Lesson overview

**Find out why it doesn't work — then prove that it does.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | Debugging like a detective | 7 min |
| 02 | Serial prints: make the invisible visible | 9 min |
| 03 | Practice: a full system test of both projects | 9 min |
| 04 | AI integration: edge cases and robustness | 5 min |

Builds on: everything in M3 — especially the −1 fail-safe from [Session 8](/academy/m3-incipe-board-sensors-modules/18-smart-garden) and the joystick edge from [Session 5](/academy/m3-incipe-board-sensors-modules/15-input-devices).

### Key words

| Word | Plain meaning |
| --- | --- |
| **Bug** | A mistake that makes a program do something you didn't mean. |
| **Debugging** | Finding the bug and fixing it. |
| **Symptom** | What you *see* go wrong — "the pump never starts". Not the cause. |
| **Hypothesis** | Your best guess at the cause, which a test can prove or disprove. |
| **Edge case** | An unusual situation at the limits: a sensor unplugged, a button held down, the player at the end of the strip. |
| **Test plan** | A table of things to try, what *should* happen, and what *did* happen. |

## 1. Debugging like a detective

**Analogy: a doctor.** A patient says "my head hurts" — that's the symptom. The doctor doesn't guess a cure; they form a hypothesis ("maybe dehydrated"), run a test, and only then treat. Debugging works the same way:

| Step | Ask yourself |
| --- | --- |
| 1. Symptom | What exactly goes wrong? When? Every time? |
| 2. Clue | What do the numbers *inside* the program say? (Serial prints — next part.) |
| 3. Hypothesis | Which line could cause this? |
| 4. Test | Change **one** thing, run it again. Did the symptom change? |
| 5. Fix and retest | Fix it, then rerun every test that used to pass. |

**Integrate one module at a time.** When the Smart Garden "doesn't work", which part is broken — the soil probe, the conversion, the thresholds? Add one module, test it, then add the next. If it breaks, the bug is in what you *just* added.

## 2. Serial prints: make the invisible visible

The board can't show you its variables — unless you print them. A **debug print** is a `Serial.print` that shows a variable with a label, so you can compare what the program *thinks* with what's really happening.

Here is the Smart Garden from [Session 8](/academy/m3-incipe-board-sensors-modules/18-smart-garden) with one small change on line 4 — and a bug. The soil is bone dry, but the pump never starts. Debug prints on lines 5–8 find it.

```walkthrough
void loop() {
  float raw = incipe.getSoilMoisture();
  float wet = wetPercent(raw);
  if (raw = -1) wet = 100;              // meant: no reading → act as if wet
  Serial.print("[debug] raw=");
  Serial.print(raw);
  Serial.print(" wet=");
  Serial.println(wet);
  if (!watering && wet < START) { watering = true;  Serial.println("PUMP ON"); }
  if (watering && wet > STOP)   { watering = false; Serial.println("PUMP OFF"); }
  delay(2000);
}
---
2 | The probe is in dry soil. The sensor gives 85. | raw = 85; watering = false
3 | 85 converts to 25 % wet — dry, as expected. | wet = 25
4 | Look closely: `=` not `==`. This line **puts** −1 into `raw`. | raw = -1
4 | The `if` sees −1, which isn't 0, so it counts as true: `wet` becomes 100. | wet = 100
6 | The debug print shows what the program now believes. | | prints: "[debug] raw=-1.00"
8 | …and the soil looks soaking wet. | | println: " wet=100.00"
9 | 100 is not below 30, so the pump never starts. That's the symptom.
4 | **The clue:** the sensor said 85, but the print says −1. Something between line 2 and line 6 changed `raw` — line 4. Fix: `raw == -1`.
```

| Line | What it does |
| --- | --- |
| 2–3 | Read the soil and convert it, as in Session 8. |
| 4 | The bug. `=` **sets** a value; `==` **compares**. In an `if`, `raw = -1` sets `raw` to −1 and then counts as true. |
| 5–8 | The debug print: a label, the value, another label, another value. `[debug]` makes these lines easy to spot. |
| 9–10 | The same hysteresis as Session 8. |

> **Read the warnings.** With all compiler warnings switched on, the compiler says *"suggest parentheses around assignment used as truth value"* about line 4. With the default settings the same code compiles **without a word** — so never count on a warning to catch it.

### Good debug prints

| Do | Why |
| --- | --- |
| Label every value: `raw=`, `wet=` | A bare `85` on the screen means nothing two minutes later. |
| Print **before and after** a suspect line | The bug is between the last right value and the first wrong one. |
| Print the state too: `watering=1` | Many bugs are "the program thinks it's in a different state". |
| Remove or switch them off when done | Extra prints slow the loop and hide real output. |

**Try it.** Put the buggy line into your Smart Garden, upload, and watch the debug lines. Then fix it to `==` and watch them again: `[debug] raw=85.00 wet=25.00`, then `PUMP ON`.

> **Logic analyzers.** The curriculum also names *logic analyzers*: a tool that records digital signals over time, so you can see two chips talking bit by bit. Engineers use one when a wired connection misbehaves. For `incipe.*` code, the board handles that conversation for you, so Serial prints are your first and best tool.

## 3. Practice: a full system test of both projects

The curriculum task: *full system test of the Smart Garden and Game Console projects.* A **test plan** turns "it seems to work" into proof. Copy each table, fill in the last two columns on the board, and fix every row that fails.

### Smart Garden

| # | Do this | Expected (from the Session 8 code) | Actual | Pass? |
| --- | --- | --- | --- | --- |
| 1 | Probe in the air (bone dry), with a debug print of `wet` | `wet` close to 0; `PUMP ON` once | | |
| 2 | Then probe into a cup of water | `wet` close to 100; `PUMP OFF` once | | |
| 3 | Damp soil between your thresholds | No new `PUMP` line — the state is kept | | |
| 4 | Unplug the probe while the pump is off | Nothing switches on | | |
| 5 | Unplug the probe while the pump is on | `PUMP OFF` on the next round | | |
| 6 | Cover the light sensor (if you did the grow-light task) | `GROW LIGHT ON` once | | |

### Game Console

| # | Do this | Expected (from the Session 9 code) | Actual | Pass? |
| --- | --- | --- | --- | --- |
| 1 | Leave the stick alone | No new frames | | |
| 2 | Push right and hold for 5 s | One frame, you moved one pixel | | |
| 3 | On pixel 0, push left | You stay on pixel 0 | | |
| 4 | Catch the fruit on pixel 4 | `score 1`, the next fruit on pixel 1 | | |
| 5 | Unplug the joystick | Nothing moves (`zone(-1)` is 0) | | |
| 6 | Hold the push button 3 s, then let go (if you did the restart task) | One restart, not several | | |

Each row is an **edge case** or a normal case you can check by eye. When a row fails, go back to Part 1: symptom, clue (add debug prints), hypothesis, one change, retest — then rerun the whole table, because a fix can break a row that used to pass.

## 4. AI integration: edge cases and robustness

The curriculum task: *use AI to simulate edge cases and suggest robustness improvements.* Paste one project's sketch into the Workspace AI chat:

> Here is my Smart Garden sketch for an ESP32 board. List 6 edge cases it might meet (missing sensors, odd readings, timing). For each, predict exactly what my code prints, and suggest one robustness improvement in one sentence for a beginner. Do not rewrite the program, and do not change or add any `incipe.*` calls.

The AI can't run your board — it **predicts**. Your job is to check the predictions:

| Ask yourself | Why |
| --- | --- |
| Can I test each edge case on the board? | Add the testable ones as new rows in your test plan. |
| Did the prediction match what really printed? | Mark every row where the AI was wrong — that's your own edge-case knowledge growing. |
| Does each suggestion keep the −1 fail-safe and the hysteresis? | "Robust" must never mean "the pump runs when it shouldn't". |
| Did it invent `incipe.*` functions or arguments? | Never accept that — compare with the [Wiki](/wiki). |

## Checkpoints

<details>
<summary>In the buggy code the sensor gives 85. What does the debug line print?</summary>

**`[debug] raw=-1.00 wet=100.00`** — line 4 sets `raw` to −1 and `wet` to 100 before the print.
</details>

<details>
<summary>After fixing line 4 to <code>raw == -1</code>, the sensor gives 85 and <code>watering</code> is false. What prints?</summary>

**`[debug] raw=85.00 wet=25.00`**, then **`PUMP ON`** — 25 is below `START` (30).
</details>

<details>
<summary>With the fix, the probe is unplugged (the sensor gives −1). What does the debug line print?</summary>

**`[debug] raw=-1.00 wet=100.00`** — exactly what the bug printed! A print alone can't tell "unplugged" from "bug". The test that tells them apart: plug the probe into dry soil and see whether `raw` changes.
</details>

<details>
<summary>Fixed code, <code>watering</code> is true, and the probe is unplugged. What does the next round print after the debug line?</summary>

**`PUMP OFF`** — a −1 reading keeps `wet` at 100, which is above `STOP` (60). The fail-safe switches the pump off.
</details>

<details>
<summary>Game Console: you're on pixel 5 of 6 and push right. What should the test plan say?</summary>

**You stay on pixel 5.** `constrain(6, 0, 5)` is 5.
</details>

## Recap

1. Debug like a detective: symptom, clue, hypothesis, change one thing, retest — and integrate one module at a time.
2. Labelled Serial prints show what the program *believes*; the bug sits between the last right value and the first wrong one. Watch for `=` where you meant `==`.
3. A test plan with expected results turns "it seems to work" into proof; the AI can suggest edge cases, but only the board can confirm them.

**Next — M4 Session 1: Design thinking & problem statement.** From building things right to building the right thing.

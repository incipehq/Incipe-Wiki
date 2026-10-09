# Session 9: Integration — Building the Game Console

> **M3 INCIPE Board, Sensors & Modules** · Weeks 9–13
> **Modules used:** [Joystick](/wiki/joystick), [Button](/wiki/button) · display: [LED strip](/wiki/led-strip) · coming: [IR receiver](/wiki/ir-receiver)

## Lesson overview

**Make a game: the joystick moves you, the board keeps score, and a row of pixels is the screen.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | A strip is a one-row screen | 6 min |
| 02 | Drawing the game state | 8 min |
| 03 | Practice: Strip Catcher — move, catch, score | 12 min |
| 04 | Make it a console: restart, speed, and what's coming | 4 min |

Builds on: the joystick zones and edges from [Session 5](/academy/m3-incipe-board-sensors-modules/15-input-devices), the `for` loop from [Lesson 4](/academy/m2-fundamentals-of-programming/04-arrays-for-loop), and states from [M2 Session 4](/academy/m2-fundamentals-of-programming/10-structs-state-machines).

### Key words

| Word | Plain meaning |
| --- | --- |
| **Pixel** | One dot of light on the screen — on an LED strip, one LED. |
| **Game state** | Every number that describes the game right now: where you are, where the fruit is, the score. |
| **Draw** | Turn the game state into what the player sees. |
| **`constrain`** | An Arduino function that keeps a number inside a range: `constrain(7, 0, 5)` is 5. |
| **`%` (remainder)** | What's left over after dividing: `7 % 6` is 1. It makes numbers wrap around, like a clock. |

## 1. A strip is a one-row screen

**Analogy: a scoreboard made of light bulbs.** A stadium screen is just rows of bulbs; switch the right ones on and you see a ball. An [LED strip](/wiki/led-strip) is **one row** of bulbs — a screen one pixel tall. So Snake and Pong become one-row games: you can only go left or right.

The Wiki says how the strip is driven: set pixels with `incipe.setLEDcolour(...)`, then push them all out with `incipe.showLED()`. What `setLEDcolour` takes is not published yet, so today the **Serial Monitor is the screen**: one character per pixel, one printed line per frame.

| On the strip | Today, on the Serial Monitor |
| --- | --- |
| Set one pixel's colour | Print one character: `P` you, `*` the fruit, `.` off |
| `incipe.showLED()` — show the frame | `Serial.println()` — end the line |

When the LED-strip page lists its arguments, each `Serial.print` becomes a pixel colour and the `println` becomes `showLED()`. The game logic stays exactly the same.

> The joystick is the controller. Reuse `zone()` and your own limits from [Session 5](/academy/m3-incipe-board-sensors-modules/15-input-devices); this lesson's code still uses the stand-in limits **25** and **75**.

## 2. Drawing the game state

**Analogy: a flip-book.** Each page is one frame. You don't move the drawing — you draw a new page from the facts: "you're at 0, the fruit is at 4".

The game state is three numbers. `draw()` turns them into one frame by visiting every pixel with a `for` loop:

```walkthrough
const int LEN = 6;                // pixels on our pretend strip
int player = 0;                   // where you are
int fruit = 4;                    // what you're catching
int score = 0;

void draw() {
  for (int i = 0; i < LEN; i++) {
    if (i == player) Serial.print("P");
    else if (i == fruit) Serial.print("*");
    else Serial.print(".");
  }
  Serial.print("  score ");
  Serial.println(score);
}
---
1 | Our strip has 6 pixels, numbered 0 to 5. | LEN = 6
2 | You start on pixel 0. | player = 0
3 | The fruit waits on pixel 4. | fruit = 4
4 | No points yet. | score = 0
7 | Visit every pixel, starting at 0. | i = 0
8 | Pixel 0 is where you are: print `P`. | | prints: P
7 | Next pixel. | i = 1
10 | Pixels 1, 2 and 3 are neither you nor the fruit: a dot each. | i = 3 | prints: ...
9 | Pixel 4 is the fruit: print `*`. | i = 4 | prints: *
10 | Pixel 5: a dot. `i` becomes 6, which is not below 6, so the loop ends. | i = 5 | prints: .
12 | Then the score label… | | prints: "  score "
13 | …and the score. `println` ends the frame. | | println: 0
```

| Line | What it does |
| --- | --- |
| 1 | `const int LEN` — how many pixels. Change it to fit a real strip later. |
| 2–4 | The game state: three numbers. |
| 7 | Visit pixels 0 to `LEN − 1`, one at a time. |
| 8–10 | Each pixel shows one thing: you first, then the fruit, otherwise off. |
| 12–13 | The score, then end the frame. |

## 3. Practice: Strip Catcher — move, catch, score

The curriculum task: *map joystick inputs to game movements and display game state on LEDs.* Push the stick to move one pixel; land on the fruit to score; a new fruit appears.

| Event | What changes |
| --- | --- |
| Stick pushed (an edge) | `player` moves one pixel — but never off the strip |
| `player` lands on `fruit` | `score` goes up, `fruit` jumps 3 pixels on (wrapping round) |
| Anything changed | Draw a new frame |

```walkthrough
int lastZone = 0;

void loop() {
  int z = zone(incipe.getJoystickXMovement());   // from Session 5
  if (z != 0 && lastZone == 0) {                 // just pushed
    player = constrain(player + z, 0, LEN - 1);  // stay on the strip
    if (player == fruit) {                       // caught it!
      score++;
      fruit = (fruit + 3) % LEN;                 // next fruit, 3 pixels on
    }
    draw();
  }
  lastZone = z;
  delay(50);
}
---
4 | Say you're on pixel 3 and the fruit is on 4. You push right: zone 1. | player = 3; fruit = 4; score = 0; z = 1
5 | Just pushed (it was resting last pass) — go in.
6 | 3 + 1 = 4, inside 0 to 5, so you move to pixel 4. | player = 4
7 | You're on the fruit!
8 | `score++` adds 1 to the score. | score = 1
9 | (4 + 3) is 7, and 7 % 6 is 1: the next fruit is on pixel 1. | fruit = 1
11 | Draw the new frame. | | println: .*..P.  score 1
13 | Remember: pushed. Holding the stick won't move you again. | lastZone = 1
6 | Later you're on pixel 5, the last one, and push right again: 5 + 1 = 6 — but `constrain` keeps you at 5. | player = 5; lastZone = 0
11 | Draw: you're stuck against the end wall. | | println: .*...P  score 1
```

| Line | What it does |
| --- | --- |
| 1 | Last pass's zone, for the edge. |
| 4 | Read the stick and sort it into −1, 0 or 1 with `zone()`. |
| 5 | Act only on the edge: one push, one move. |
| 6 | Move by the zone, but `constrain` keeps `player` between 0 and `LEN − 1`. |
| 7–10 | Caught it: add a point and move the fruit. `% LEN` wraps the fruit back to the start of the strip. |
| 11 | Something changed, so draw a frame. |
| 13–14 | Save the zone; pause briefly. |

Put `zone()` and `draw()` above `loop()`, call `draw()` once in `setup()` after `Serial.begin(9600);`, and Upload. You'll see `P...*.  score 0`. Push right four times to catch your first fruit.

> **Where the strip calls go.** In `draw()`, each `Serial.print` of a pixel becomes `incipe.setLEDcolour(...)` for pixel `i`, and the final `println` becomes `incipe.showLED()` — once the [LED strip](/wiki/led-strip) page says what `setLEDcolour` takes.

## 4. Make it a console

A console has a restart button. Use the [push button](/wiki/button):

#### One line of code

```cpp
float pressed = incipe.getButtonResponse();
```

#### What you get

| Button | You get |
| --- | --- |
| Pressed | `1` |
| Not pressed | `0` |
| Not detected | `-1` |

Restart on **release**, exactly like selecting a menu item in [Session 5](/academy/m3-incipe-board-sensors-modules/15-input-devices).

> **IR remote.** The curriculum also lists the IR receiver as a controller. Its functions are not on the Wiki yet, so it joins the game once [Session 7](/academy/m3-incipe-board-sensors-modules) can be written.

### Your task

| Step | Do this |
| --- | --- |
| 1 | Build Strip Catcher with your own joystick limits. Catch three fruits. |
| 2 | Restart: when the push button is released, set `player`, `fruit` and `score` back to their starting values and draw a frame. |
| 3 | Make it a real game: count your moves, and after 20 moves print `GAME OVER` and your score. Which state variable do you need to add? |
| 4 | Change `LEN` to 10 and the jump to `(fruit + 7) % LEN`. Trace the first three fruit positions by hand, then check on the board. |

## Checkpoints

<details>
<summary>With <code>LEN</code> 6, <code>player</code> 0, <code>fruit</code> 4 and <code>score</code> 0, what does <code>draw()</code> print?</summary>

**`P...*.  score 0`** — `P` on pixel 0, dots on 1–3, `*` on 4, a dot on 5, then the score.
</details>

<details>
<summary>You're on pixel 0 and push left (zone −1). Where are you now?</summary>

**Pixel 0.** 0 + (−1) is −1, and `constrain(-1, 0, 5)` keeps it at 0.
</details>

<details>
<summary>You catch the fruit on pixel 4. Where does the next fruit appear?</summary>

**Pixel 1.** (4 + 3) % 6 = 7 % 6 = 1.
</details>

<details>
<summary>And if you'd caught it on pixel 5?</summary>

**Pixel 2.** (5 + 3) % 6 = 8 % 6 = 2.
</details>

<details>
<summary>You start on pixel 0 and hold the stick right for 20 passes of <code>loop()</code>. Where are you?</summary>

**Pixel 1.** Only the first pass is an edge, so you move once.
</details>

## Recap

1. An LED strip is a one-row screen: draw a frame from the game state by visiting every pixel with a `for` loop.
2. The joystick's edge moves you one pixel per push; `constrain` keeps you on the strip and `%` wraps the fruit around.
3. Keep the game logic separate from the display: today the Serial Monitor is the screen, and only `draw()` changes when the strip's calls are published.

**Next — Session 10: System integration & debugging.** Testing the Smart Garden and the Game Console end to end, and finding bugs with Serial prints and AI.

# Session 15: Input Devices — Joystick, IR & Buttons

> **M3 INCIPE Board, Sensors & Modules** · Weeks 9–13
> **Modules used:** [Joystick](/wiki/joystick), [Button](/wiki/button), [Temperature & humidity sensor](/wiki/temperature-humidity), [Light sensor](/wiki/light)

## Lesson overview

**Turn a stick and a button into a menu you can steer.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | The joystick: read it, then find your limits | 8 min |
| 02 | Zones and edges: one push, one move | 7 min |
| 03 | Practice: a joystick menu on the Serial Monitor | 12 min |
| 04 | The IR receiver: what is coming | 3 min |

Builds on: plotting the joystick in [Session 12](/academy/m3-incipe-board-sensors-modules/12-digital-sensors-protocols), arrays from [Lesson 4](/academy/m2-fundamentals-of-programming/04-arrays-for-loop), `switch` and counting on release from [Session 8](/academy/m2-fundamentals-of-programming/08-control-structures-functions).

### Key words

| Word | Plain meaning |
| --- | --- |
| **Raw value** | The number exactly as the module gives it, before you decide what it means. |
| **Limit** | A number you pick: past it, the stick counts as pushed. |
| **Zone** | Which part of its travel the stick is in: pushed one way, resting, or pushed the other way. |
| **Edge** | The moment something changes — the stick *just* got pushed, the button *just* got let go. |
| **Wrap around** | Going past the last menu item brings you back to the first, like the hands of a clock. |

## 1. The joystick: read it, then find your limits

**Analogy: a game controller's thumbstick.** Push it and the game moves; let go and it springs back to the middle. The board can't see "left" or "right" — it gets a number for how far the stick is pushed, and *you* decide what each number means.

### Meet the joystick

#### One line of code

One line for each value:

```cpp
float x = incipe.getJoystickXMovement();
float y = incipe.getJoystickYMovement();
float button = incipe.getJoystickButtonResponse();
```

#### What you get

| Call | Value | Not detected |
| --- | --- | --- |
| `incipe.getJoystickXMovement()` | A `float`, raw left–right position | `-1` |
| `incipe.getJoystickYMovement()` | A `float`, raw up–down position | `-1` |
| `incipe.getJoystickButtonResponse()` | A `float`, raw stick-button reading | `-1` |

The range, the centre value and which button value means "pressed" are not fixed — find them by plotting all three in the Serial Plotter and moving the stick.

> Plug the joystick into one INCIPE connection and leave the **next** connection free — the joystick uses it for Y and the button.

Full details: [Joystick](/wiki/joystick).

### Try it: find your limits

1. Plot X in the Serial Plotter, as in [Session 12](/academy/m3-incipe-board-sensors-modules/12-digital-sensors-protocols).
2. Write down three numbers: X at **rest**, X pushed **fully one way**, X pushed **fully the other way**.
3. Pick your **lower limit** halfway between the rest value and the smaller end, and your **upper limit** halfway between the rest value and the bigger end.

Halfway gives room for a wobbly hand: a small nudge stays "resting", a real push counts.

> This lesson's code uses **25** and **75** as stand-in limits so the examples are easy to follow. They are not your joystick's numbers — replace them with the two you wrote down.

## 2. Zones and edges: one push, one move

**Analogy: a doorbell.** Holding the button down rings it once, not a hundred times. A menu should work the same way: one push of the stick moves **one** item, however long you hold it.

First, a function that sorts a reading into a **zone**:

```walkthrough
const float LOW_LIMIT = 25;    // change to your number
const float HIGH_LIMIT = 75;   // change to your number

int zone(float x) {
  if (x == -1) return 0;           // not detected: treat as resting
  if (x < LOW_LIMIT) return -1;    // pushed one way
  if (x > HIGH_LIMIT) return 1;    // pushed the other way
  return 0;                        // resting in the middle
}
---
1 | Your lower limit. Below it, the stick is pushed one way. | LOW_LIMIT = 25
2 | Your upper limit. Above it, pushed the other way. | HIGH_LIMIT = 75
4 | Call `zone(90)`: `x` starts as 90. | x = 90
5 | Is `x` −1, "not detected"? No.
6 | Is 90 below 25? No.
7 | Is 90 above 75? Yes — hand back 1: pushed. | result = 1
```

| Line | What it does |
| --- | --- |
| 1–2 | `const` makes a value that never changes — your two limits, named so the code reads clearly. |
| 4 | `zone` takes one reading and returns a whole number: −1, 0 or 1. |
| 5 | The −1 rule: a missing joystick must never look like a push, so it counts as resting. |
| 6–7 | Past a limit → pushed. `return` hands back the answer and leaves the function straight away. |
| 8 | Anything else is between the limits: resting. |

The zone alone is not enough. While you hold the stick, every pass of `loop()` sees zone 1 again. To move only once, act on the **edge**: zone is not 0 *now*, but it was 0 *last pass*. Keep last pass's zone in a variable, `lastZone`.

## 3. Practice: a joystick menu on the Serial Monitor

The curriculum task: *build a simple menu system controlled by the Joystick and displayed on the Serial Monitor.* The menu is an array of three words; `choice` is the box you are on.

```walkthrough
const char* items[] = {"Temperature", "Humidity", "Light"};
int choice = 0;
int lastZone = 0;

void loop() {
  int z = zone(incipe.getJoystickXMovement());
  if (z != 0 && lastZone == 0) {   // just pushed
    choice = choice + z;
    if (choice > 2) choice = 0;      // past the end: back to the start
    if (choice < 0) choice = 2;      // before the start: to the end
    Serial.println(items[choice]);
  }
  lastZone = z;
  delay(50);
}
---
1 | A list of three menu items. Box 0 holds "Temperature".
2 | Start on item 0. | choice = 0
3 | Last pass's zone: resting. | lastZone = 0
6 | Pass 1: the stick rests, the reading is 50, so the zone is 0. | z = 0
7 | Is `z` not 0? No — skip the block. Line 13 keeps `lastZone` at 0.
6 | Pass 2: you push. The reading is 90, so the zone is 1. | z = 1
7 | `z` is not 0 **and** `lastZone` is 0: it was *just* pushed. Go in.
8 | Move one item: 0 + 1. | choice = 1
11 | Show the new item. | | println: Humidity
13 | Remember this pass: pushed. | lastZone = 1
6 | Pass 3: you are still holding. Zone 1 again. | z = 1
7 | `lastZone` is 1 — this push was already counted. Skip: one push, one move.
6 | Later: you let go (so `lastZone` becomes 0), then push the other way. The reading is 10: zone −1. | z = -1; lastZone = 0
8 | Move back: 1 + (−1). | choice = 0
11 | Show it. | | println: Temperature
6 | Let go, then push that way again: zone −1. | z = -1; lastZone = 0
8 | 0 + (−1) is −1 — there is no box −1. | choice = -1
10 | Before the start: wrap to the end. | choice = 2
11 | Show it. | | println: Light
```

| Line | What it does |
| --- | --- |
| 1 | `const char* items[]` is an array of pieces of text — the menu. |
| 2–3 | Where the menu starts, and the zone from the last pass. |
| 6 | Read the stick and sort the reading into a zone. |
| 7 | `&&` means "and": act only on the edge — pushed now, resting last pass. |
| 8 | Add the zone: +1 moves forward, −1 moves back. |
| 9–10 | Wrap around at both ends so `choice` always stays 0, 1 or 2. |
| 11 | `items[choice]` is the text in that box. |
| 13 | Save this pass's zone for the next pass. |
| 14 | A short pause between passes. |

Put `zone()` above `loop()`, add `setup()` with `Serial.begin(9600);`, and Upload. Push the stick both ways and watch the menu move one item per push.

### Select with the button

Now use the [push button](/wiki/button) to show the reading for the item you are on.

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

Act when the button is **released** — the same edge idea as the stick, and the same trick as [Session 8](/academy/m2-fundamentals-of-programming/08-control-structures-functions). Say the menu is on "Light":

```walkthrough
float lastButton = 0;

void showChoice() {
  switch (choice) {
    case 0: Serial.println(incipe.getTemperature()); break;
    case 1: Serial.println(incipe.getHumidity()); break;
    case 2: Serial.println(incipe.getLightIntensity()); break;
  }
}

// inside loop(), after lastZone = z;
float b = incipe.getButtonResponse();
if (lastButton == 1 && b == 0) showChoice();   // on release
lastButton = b;
---
1 | Last pass's button reading: not pressed. The menu is on item 2, "Light". | lastButton = 0; choice = 2
12 | You press: `b` is 1. | b = 1
13 | Pressed last pass and released now? `lastButton` is 0 — no.
14 | Remember: pressed. | lastButton = 1
12 | You let go: `b` is 0. | b = 0
13 | Pressed last pass, released now — call `showChoice()`.
4 | Which item? `choice` is 2.
7 | `case 2`: print the light reading. Say it is 700. | | println: 700.00
14 | Back in `loop()`: remember, released. | lastButton = 0
```

| Line | What it does |
| --- | --- |
| 1 | The button reading from the last pass. |
| 3–9 | `showChoice()` prints the reading for the chosen item — one `case` per box. |
| 12 | Read the button: 1 pressed, 0 not pressed. |
| 13 | The release edge: 1 last pass, 0 now. |
| 14 | Save this pass's reading. |

> Each reading can still be **−1** if its sensor is not detected — the menu then prints `-1.00`. Check for it before you trust the number.

### Your task

| Step | Do this |
| --- | --- |
| 1 | Put your own limits from the Try it into `LOW_LIMIT` and `HIGH_LIMIT`. If the menu moves the "wrong" way, swap what +1 and −1 do. |
| 2 | Add a fourth item, "Distance", that prints `incipe.getDistance()` from the [ultrasonic sensor](/wiki/ultrasonic) (in cm). Find every line that has to change — there are four places. |
| 3 | Use the joystick's own button instead of the push button. Plot `incipe.getJoystickButtonResponse()` first to find which value means "pressed". |

## 4. The IR receiver: what is coming

The curriculum also covers *decoding IR signals with the IR Receiver*: capturing what a TV remote sends. The [IR receiver](/wiki/ir-receiver) page says what the module does, but its `incipe.*` functions are not published yet. This part will be added once they are — Session 17 builds on it.

## Checkpoints

<details>
<summary>With <code>LOW_LIMIT</code> 25 and <code>HIGH_LIMIT</code> 75, what does <code>zone(90)</code> return?</summary>

**1.** 90 is not −1 and not below 25, but it is above 75.
</details>

<details>
<summary>The joystick is unplugged, so the reading is −1. What does <code>zone(-1)</code> return?</summary>

**0** — resting. The first `if` catches −1 before it can count as "below 25", so a missing joystick never moves the menu.
</details>

<details>
<summary>The menu is on "Light" (<code>choice</code> is 2). You push and the zone is 1. What prints?</summary>

**Temperature.** 2 + 1 is 3, which is past the end, so line 9 wraps `choice` to 0.
</details>

<details>
<summary>You push the stick and hold it for 10 passes of <code>loop()</code>. How many menu lines print?</summary>

**1.** Only the first pass is an edge; on the other 9, `lastZone` is already 1.
</details>

<details>
<summary>You hold the push button for 3 passes, then let go. How many times does <code>showChoice()</code> run?</summary>

**Once** — on the pass where `lastButton` is 1 and `b` is 0.
</details>

## Recap

1. The joystick gives raw numbers. Plot them, pick two limits, and sort every reading into a zone: −1, 0 or 1 — with −1 "not detected" counting as resting.
2. Act on the edge — just pushed, just released — so one push moves one item, however long you hold.
3. A menu is an array plus a `choice` number that wraps around at both ends; the button's release edge selects.

**Next — Session 16: Data logging with SD card.** Saving readings to a file instead of only printing them.

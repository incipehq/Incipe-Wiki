# Session 8: Control Structures & Functions

> **M2 Fundamentals of Programming** · Weeks 5–8
> **Module used:** [Button](/wiki/button)

## Lesson overview

**Choose one of many, repeat until done, and give your code names.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | `switch`: one choice out of many | 6 min |
| 02 | `while` and `do-while`: repeat until done | 6 min |
| 03 | Writing your own functions | 7 min |
| 04 | Practice: Digital Dice | 7 min |
| 05 | AI integration: debouncing the button | 4 min |

**Already covered — look back if you need to:**

| Idea | Where |
| --- | --- |
| `if`, `else if`, `else`, `&&`, `\|\|`, `!` | [Lesson 2 · More about programming](/academy/m2-fundamentals-of-programming/02-data-types-if-else) |
| Reading the button and counting a press on release | [Lesson 3 · Programming sensors](/academy/m2-fundamentals-of-programming/03-sensors) |
| `for` loops | [Lesson 4 · Array & for loop](/academy/m2-fundamentals-of-programming/04-arrays-for-loop) |

### Key words

| Word | Plain meaning |
| --- | --- |
| **`switch`** | Picks one block of code to run, by matching a value exactly. |
| **`case`** | One possible value inside a `switch`. |
| **`break`** | "Stop here and leave the `switch`." |
| **`default`** | What runs when no `case` matches. |
| **`while`** | Repeats while a condition is true — checks first. |
| **`do-while`** | Runs once, then repeats while a condition is true — checks after. |
| **Function** | A named block of code you can run from anywhere by calling its name. |
| **Parameter** | A value you hand to a function when you call it. |
| **Return value** | The answer a function hands back. |
| **Debounce** | Ignoring the tiny flickers a button makes as it is pressed. |

## 1. `switch`: one choice out of many

**Analogy: a vending machine.** You press **4** and you get exactly the snack in slot 4 — not "bigger than 3", not "between 2 and 5". A `switch` does the same: it jumps straight to the `case` that **equals** the value.

```walkthrough
void showDice(int value) {
  switch (value) {
    case 1: Serial.println("one"); break;
    case 2: Serial.println("two"); break;
    case 3: Serial.println("three"); break;
    case 4: Serial.println("four"); break;
    case 5: Serial.println("five"); break;
    case 6: Serial.println("six"); break;
    default: Serial.println("not a dice number");
  }
}
---
1 | `showDice` takes one number. Say we call `showDice(4)`. | value = 4
2 | `switch (value)` — find the `case` that equals 4.
6 | `case 4` matches. Print "four"… | | println: four
6 | …then `break` jumps out of the `switch`. Cases 5, 6 and `default` are skipped.
10 | Leave the `switch`.
11 | The function ends.
```

| Line | What it does |
| --- | --- |
| 1 | A function that takes one `int` called `value`. |
| 2 | Start a `switch` on `value`. |
| 3–8 | One `case` per dice face. Each prints a word, then `break`s out. |
| 9 | `default` runs if `value` is anything else, like 7 or 0. |
| 10–11 | Close the `switch`, then the function. |

### `switch` or `if`?

| Use `switch` when… | Use `if` / `else if` when… |
| --- | --- |
| You match **exact values**: 1, 2, 3… | You compare **ranges**: `score >= 85` |
| There are many choices of one variable | The conditions mix different variables |

> **Forget a `break` and the code falls through.** Without `break`, C++ keeps running into the next `case` until it meets one. That is almost always a bug — Checkpoint 2 shows what happens.

## 2. `while` and `do-while`: repeat until done

**Analogy: two cooks.** The first checks *before* acting: "while the water isn't boiling, wait." The second acts *first*, then checks: "taste the soup, then decide if it needs more salt." The first is `while`; the second is `do-while`.

```walkthrough
int count = 3;
while (count > 0) {
  Serial.println(count);
  count = count - 1;
}
Serial.println("Roll!");
---
1 | Start the countdown at 3. | count = 3
2 | Is 3 > 0? Yes — go in.
3 | Print the count. | | println: 3
4 | Take 1 away. | count = 2
2 | Is 2 > 0? Yes.
3 | Print it. | | println: 2
4 | Take 1 away. | count = 1
2 | Is 1 > 0? Yes.
3 | Print it. | | println: 1
4 | Take 1 away. | count = 0
2 | Is 0 > 0? **No** — skip the loop.
6 | Carry on after the loop. | | println: Roll!
```

| Line | What it does |
| --- | --- |
| 1 | The counter starts at 3. |
| 2 | Checks `count > 0` **before** every pass. |
| 3–4 | Prints the count, then makes it 1 smaller — otherwise the loop would never end. |
| 6 | Runs once the condition is false. |

A `do-while` always runs **at least once**, because it checks at the end:

```cpp
int n = 10;
do {
  Serial.println(n);
  n = n + 1;
} while (n < 5);
```

| Line | What it does |
| --- | --- |
| 1 | `n` starts at 10. |
| 2–4 | The body runs first: prints `10`, then `n` becomes 11. |
| 5 | *Now* it checks `n < 5`. 11 is not less than 5, so it stops. It printed once. |

The same loop written with `while` would print **nothing**, because `10 < 5` is false before the first pass.

| Loop | Checks | Runs at least once? | Best for |
| --- | --- | --- | --- |
| `for` | Before each pass | No | Counting a known number of times ([Lesson 4](/academy/m2-fundamentals-of-programming/04-arrays-for-loop)) |
| `while` | Before each pass | No | "Keep going until something happens" |
| `do-while` | After each pass | **Yes** | "Do it once, then repeat if needed" |

## 3. Writing your own functions

**Analogy: a recipe card.** It has a **name** ("Pancakes"), a list of **ingredients** you bring (parameters), and a **dish** you get back (the return value). Once the card is written, anyone can say "make pancakes" without reading the steps again.

You have been *calling* functions all along — `Serial.println()`, `incipe.getButtonResponse()`. Now write one:

```walkthrough
int addDice(int a, int b) {
  return a + b;
}

void setup() {
  Serial.begin(9600);
  int total = addDice(3, 4);
  Serial.println(total);
}
---
6 | Start the Serial monitor.
7 | Call `addDice` with 3 and 4. Jump up to the function. | a = 3; b = 4
2 | Work out 3 + 4 and hand the answer back with `return`.
7 | Back in `setup()`: the answer goes into `total`. | total = 7
8 | Print it. | | println: 7
```

| Part | Meaning |
| --- | --- |
| `int` (first word) | The type of the answer it hands back. `void` means "hands nothing back". |
| `addDice` | The function's name — say what it does. |
| `(int a, int b)` | Two parameters: the ingredients. |
| `return a + b;` | Hand back the answer, and leave the function. |
| `addDice(3, 4)` | The call: 3 goes into `a`, 4 into `b`. |

**Why bother?** A function gives a few lines a name, so `loop()` reads like a sentence: *roll the dice, then show it*. Fix a bug inside the function once, and every call is fixed.

## 4. Practice: Digital Dice

The curriculum practice: *press the button → show a random number*. You need three pieces.

### Meet the button

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

The button needs no data cleaning — it already answers yes or no. Full details: [Button](/wiki/button).

### Piece 1 — roll

```cpp
int rollDice(int sides) {
  return random(1, sides + 1);
}
```

| Line | What it does |
| --- | --- |
| 1 | A function that takes how many sides the dice has and returns a whole number. |
| 2 | `random(1, 7)` picks a whole number from **1 up to, but not including, 7** — so 1 to 6. That is why it says `sides + 1`. |
| 3 | End of the function. |

### Piece 2 — show

`showDice(value)` from Part 1.

### Piece 3 — the button

Count a roll when the button is **released**, exactly as [Lesson 3](/academy/m2-fundamentals-of-programming/03-sensors) counted presses:

```walkthrough
bool pressed = false;

void loop() {
  float button = incipe.getButtonResponse();
  if (button == 1) {
    pressed = true;
  } else if (button == 0 && pressed) {
    pressed = false;
    showDice(rollDice(6));
  }
}
---
1 | Remember whether the button is being held. At the start it is not. | pressed = false
4 | Read the button. Say it is being pressed. | button = 1
5 | It is 1, so…
6 | …remember that it is held. Nothing is rolled yet. | pressed = true
4 | `loop()` runs again. Now the button has been let go. | button = 0
7 | It is 0 **and** it was held — so this is a release.
8 | Forget the press, so one press makes one roll. | pressed = false
9 | Roll a 6-sided dice and show it. Say it rolled 4. | | println: four
4 | Next pass: still 0, but `pressed` is false, so nothing happens until the next press. | button = 0
```

| Line | What it does |
| --- | --- |
| 1 | `pressed` remembers a press between passes of `loop()`. |
| 4 | Reads the button: 1, 0, or −1 if it is not detected. |
| 5–6 | While it is held, just remember that. |
| 7 | When it reads 0 and it *was* held, the button was released. A −1 matches neither branch, so an unplugged button rolls nothing. |
| 8–9 | Reset the memory and roll once: `rollDice(6)` gives a number, `showDice()` prints it. |

Put the three pieces in one sketch — `rollDice`, `showDice`, then `setup()` with `Serial.begin(9600);` and this `loop()`. Upload, open the Serial monitor at **9600** and press the button.

> **On the LED strip.** The curriculum shows the dice on the [LED strip](/wiki/led-strip), lighting one LED per pip. That version will be added once the Wiki page lists what `incipe.setLEDcolour(...)` and `incipe.showLED()` take. Until then, the Serial monitor is the display.

## 5. AI integration: debouncing the button

Real buttons do not switch cleanly: for a few milliseconds the contact can flicker 1-0-1-0 before it settles. That is called **bounce**, and it can turn one press into several rolls. Ask the Workspace AI:

> My Digital Dice reads `incipe.getButtonResponse()` in `loop()` and rolls when the button is released. Suggest a way to debounce the button. Keep my release logic, explain each line for a beginner, and say what happens if the button returns -1.

A typical answer waits until the reading has stayed the same for a short time:

```cpp
const unsigned long DEBOUNCE_MS = 50;
unsigned long changedAt = 0;
float lastReading = 0;

void loop() {
  float reading = incipe.getButtonResponse();
  if (reading != lastReading) {
    changedAt = millis();
    lastReading = reading;
  }
  if (millis() - changedAt > DEBOUNCE_MS) {
    // the reading has been steady for 50 ms: trust it here
  }
}
```

| Line | What it does |
| --- | --- |
| 1 | How long a reading must stay the same before we trust it: 50 ms. |
| 2 | When the reading last changed. `millis()` counts milliseconds since the board started, and it needs an `unsigned long` (a big whole number with no minus sign). |
| 3 | The last reading we saw. |
| 6 | Read the button. |
| 7–10 | If it changed, note the time and remember the new reading. |
| 11–13 | Only when it has been steady for more than 50 ms do we act on it — put the release logic from Part 4 there. |

**Review it like Session 2:** does it use the exact Wiki name? What does −1 do here? (It is just another value, so an unplugged button settles at −1 and still rolls nothing.) Did the AI keep your release logic, or rewrite it?

## Checkpoints

<details>
<summary><code>showDice(3);</code> — what prints? And <code>showDice(7);</code>?</summary>

**`three`**, then **`not a dice number`**. 3 matches `case 3`; 7 matches no case, so `default` runs.
</details>

<details>
<summary>In this switch, <code>case 2</code> has no <code>break</code>. What does a value of 2 print?</summary>

```cpp
switch (value) {
  case 1: Serial.println("one"); break;
  case 2: Serial.println("two");
  case 3: Serial.println("three"); break;
  default: Serial.println("?");
}
```

**`two`, then `three`.** Without a `break`, case 2 falls through into case 3 and stops at its `break`.
</details>

<details>
<summary><code>int count = 3; while (count &gt; 0) { Serial.println(count); count = count - 1; }</code> — what prints?</summary>

**3, 2, 1** on three lines. When `count` reaches 0, `0 > 0` is false and the loop stops.
</details>

<details>
<summary><code>int n = 10; do { Serial.println(n); n = n + 1; } while (n &lt; 5);</code> — what prints?</summary>

**10**, once. A `do-while` runs its body before it checks; then `11 < 5` is false.
</details>

<details>
<summary><code>rollDice(6)</code> uses <code>random(1, sides + 1)</code>. Which numbers can it return?</summary>

**1, 2, 3, 4, 5 or 6.** `random(1, 7)` includes 1 but stops *before* 7.
</details>

## Recap

1. `switch` jumps to the `case` that equals a value — end every case with `break`, and add a `default`.
2. `while` checks first; `do-while` runs once, then checks; `for` counts.
3. A function has a name, parameters in and a return value out — so `loop()` can read `showDice(rollDice(6));`.

**Next — Session 9: Arrays, pointers & bitwise operations.** Store ten light readings, find a moving average, and look inside a byte.

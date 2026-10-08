---
title: Recap
lesson: Lesson 5
type: slides
summary: Everything from Lessons 1 to 4 in one deck — data types, errors, onscreen, input and decisions, sensors, arrays and for loops — with fresh checkpoints.
source: raw/LMS/M2 Fundamentals of Programming/Lesson 5 Recap.pptx
---
## Lesson overview

**Everything from Lessons 1 to 4.**

1. Data types & errors
2. Showing data on the INCIPE Board screen
3. Input, compare & decide
4. Sensors & data cleaning
5. Arrays & for loops
6. Classwork: make a minigame

## The essentials

| Topic | Remember |
| --- | --- |
| Data types | `int`, `float`, `double`, `char`, `String`, `bool` |
| Variables | `type name = value;` — e.g. `int a = 10;` |
| Errors | Syntax (written mistakes), run-time (`1/0`), logic (wrong outcome) |
| Input | `while (Serial.available() == 0) {}` then `Serial.parseInt()` / `parseFloat()` |
| Sensors | `incipe.getTemperature()`, `getLightIntensity()`, `getDistance()` … |
| Compare | `== != <= >= < >` — and `=` assigns |
| Combine | `&&` both, `\|\|` either, `!` not |
| Arrays | Index from 0: `data[0]` is the first element |
| For loop | `for (int i = 0; i < 5; i++) { … data[i] … }` |

## Checkpoints

<details>
<summary>Which is the correct format for creating a variable?</summary>

**`int a = 10;`** — data type, name, `=`, value, then `;`.
</details>

<details>
<summary><code>int data = 8;</code> — <code>&lt;5</code> adds 5, <code>&gt;8</code> subtracts 3, else <code>data++</code></summary>

**9.** Neither condition is true, so `data++` makes 8 into 9.
</details>

<details>
<summary>Which values make <code>(x &gt; y) &amp;&amp; !(y &gt;= z)</code> true?</summary>

**x = 3, y = 1, z = 2** — x > y, and `!(y >= z)` means y < z.
</details>

<details>
<summary><code>int array[5] = {1,3,5,7,9}; array[1] = array[2] + 3; array[4] = array[3] - 2;</code></summary>

**{1, 8, 5, 7, 5}.**
</details>

<details>
<summary><code>int a = 20; int number[5] = {1,3,5,2,4}; for (i = 0; i &lt; 4; i++) a = a - number[i];</code></summary>

**9** — 20 − 1 − 3 − 5 − 2. `number[4]` is never used.
</details>

## Classwork — make a minigame

Combine screen interaction with what you know: read a button on the board's screen, decide with if-else, and show or hide objects.

```cpp
// When on-screen button 5 is pressed, print hello
if (incipe.screenReadValue("press.val") == 5) {
  Serial.println("hello");
}

incipe.vis("pop_up", 1);   // 1 shows the object, 0 hides it
```

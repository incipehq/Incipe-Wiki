# Session 3: Arrays, Pointers & Bitwise Operations

> **M2 Fundamentals of Programming** · Weeks 5–8
> **Module used:** [Light sensor](/wiki/light)

## Lesson overview

**Smooth a noisy sensor, give a box a second name, and pack eight yes/no answers into one byte.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | References: a second name for the same box | 5 min |
| 02 | Pointers: the address of a box | 7 min |
| 03 | Bitwise operators: eight switches in one byte | 9 min |
| 04 | Practice: a moving average of the light sensor | 9 min |

**Already covered — look back if you need to:**

| Idea | Where |
| --- | --- |
| Arrays: create, write, read, index from 0 | [Lesson 4 · Array & for loop](/academy/m2-fundamentals-of-programming/04-arrays-for-loop) |
| Average and largest value with a `for` loop | [Lesson 4 · Array & for loop](/academy/m2-fundamentals-of-programming/04-arrays-for-loop) |
| Writing functions with parameters and `return` | [Session 2 · Control structures & functions](/academy/m2-fundamentals-of-programming/08-control-structures-functions) |

### Key words

| Word | Plain meaning |
| --- | --- |
| **Reference** | A second name for a variable that already exists. Change one, and you change both. |
| **Address** | Where a variable lives in memory — like a locker number. |
| **Pointer** | A variable that holds an address. |
| **Bit** | The smallest piece of data: 0 or 1. A byte is 8 bits. |
| **Binary** | Writing a number in bits, like `101` for 5. |
| **Bitwise operator** | An operator that works on each bit separately: `&`, `\|`, `^`, `<<`, `>>`. |
| **Moving average** | The average of only the last few readings, updated as each new one arrives. |
| **Modulo (`%`)** | The remainder after dividing: `10 % 10` is 0, `7 % 10` is 7. |

## 1. References: a second name for the same box

**Analogy: a nickname.** At school you are "Alex"; at home you are "Al". Two names, one person — if Al gets a haircut, so does Alex. A **reference** is a second name for a variable.

In Session 2, a function got a **copy** of each value. Change the copy, and the original is untouched. Add `&` after the type, and the function gets the **real variable** instead:

```walkthrough
void addBonus(int &score) {
  score = score + 10;
}

void setup() {
  Serial.begin(9600);
  int points = 50;
  addBonus(points);
  Serial.println(points);
}
---
6 | Start the Serial monitor.
7 | `points` starts at 50. | points = 50
8 | Call `addBonus`. Because of `&`, `score` is not a copy — it is another name for `points`. | score = 50
2 | Add 10 to `score`… which **is** `points`. | score = 60; points = 60
9 | Back in `setup()`, `points` really changed. | | println: 60
```

| Line | What it does |
| --- | --- |
| 1 | `int &score` — the `&` makes `score` a reference: a second name for whatever is passed in. |
| 2 | Adds 10. Because `score` is `points`, `points` goes up too. |
| 7–9 | Make `points`, pass it in, print it: `60`. Without the `&`, it would print `50`. |

**Why use one?** So a function can change your variable — or hand back more than one answer — without copying it.

## 2. Pointers: the address of a box

**Analogy: a locker number on a sticky note.** The locker holds your stuff (the value). The sticky note holds the locker's **number** (the address). With the note you can go to the locker and change what is inside. A **pointer** is that sticky note.

| Symbol | Say it as | Example |
| --- | --- | --- |
| `&x` | "the address of `x`" | `int *p = &light;` |
| `int *p` | "`p` is a pointer to an `int`" | |
| `*p` | "go to the address in `p`" | `*p = 600;` |

```walkthrough
int light = 512;
int *p = &light;
*p = 600;
Serial.println(light);
---
1 | A normal `int` box holding 512. | light = 512
2 | `&light` is the address of `light`. `p` keeps it — `p` "points to" `light`. | p = address of light
3 | `*p` means "the box `p` points to". Put 600 in it. | light = 600
4 | `light` itself changed, though line 3 never named it. | | println: 600
```

| Line | What it does |
| --- | --- |
| 1 | An ordinary variable. |
| 2 | A pointer that holds the address of `light`. |
| 3 | Writes 600 into the box at that address — that is `light`. |
| 4 | Prints `600`. |

### Pointers and arrays

An array's name already works like a pointer to its first element. That is why, in the practice below, a function can take a whole array — `float values[]` — and read every reading without copying all ten.

> **Pointers on the INCIPE Board.** In firmware, pointers are also used to reach the chip's hardware directly. On the INCIPE Board the runtime does that for you — your code calls the `incipe.*` helpers — so in this course you use pointers on your own variables and arrays.

## 3. Bitwise operators: eight switches in one byte

**Analogy: a row of 8 light switches.** A byte is 8 bits, and each bit is a switch: on (1) or off (0). One `uint8_t` can hold eight yes/no answers — "sensor ready?", "button pressed?" — in a single byte.

Counting from the right, the switches are numbered 0 to 7:

| Switch | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Worth | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

So binary `101` is switch 2 and switch 0 on: 4 + 1 = **5**.

| Operator | Name | Each bit is 1 when… | Example | Result |
| --- | --- | --- | --- | --- |
| `&` | AND | both bits are 1 | `12 & 10` → `1100 & 1010` | `1000` = 8 |
| `\|` | OR | either bit is 1 | `12 \| 10` → `1100 \| 1010` | `1110` = 14 |
| `^` | XOR | the bits are different | `12 ^ 10` → `1100 ^ 1010` | `0110` = 6 |
| `<<` | shift left | — every bit moves left | `1 << 3` → `0001` → `1000` | 8 |
| `>>` | shift right | — every bit moves right | `8 >> 2` → `1000` → `0010` | 2 |

> Not to be confused with `&&`, `||` from [Lesson 2](/academy/m2-fundamentals-of-programming/02-data-types-if-else): those compare whole true/false values. `&`, `|` work on every bit.

`1 << n` makes a number with only switch `n` on. Combine it with `|`, `&` and `^` to switch one bit at a time:

```walkthrough
uint8_t flags = 0;
flags = flags | (1 << 0);
flags = flags | (1 << 2);
Serial.println(flags, BIN);
bool pressed = flags & (1 << 2);
Serial.println(pressed);
flags = flags ^ (1 << 0);
Serial.println(flags, BIN);
---
1 | One byte, all eight switches off. | flags = 00000000
2 | `1 << 0` is `00000001`. OR it in: switch 0 on — "sensor ready". | flags = 00000001
3 | `1 << 2` is `00000100`. OR it in: switch 2 on — "button pressed". | flags = 00000101
4 | `BIN` prints the number in binary. Leading zeros are not printed. | | println: 101
5 | AND with `00000100` keeps only switch 2. It is on, so the result is not 0: true. | pressed = true
6 | A `bool` prints as 1 for true. | | println: 1
7 | XOR flips switch 0: on → off. | flags = 00000100
8 | Only switch 2 is left. | | println: 100
```

| Line | What it does |
| --- | --- |
| 1 | Eight flags in one byte, all off. |
| 2–3 | `flags \| (1 << n)` switches bit `n` **on** and leaves the others alone. |
| 4 | Prints `101`: switches 2 and 0. |
| 5–6 | `flags & (1 << n)` **checks** bit `n`: non-zero means on. |
| 7 | `flags ^ (1 << n)` **flips** bit `n`. |
| 8 | Prints `100`. |

To switch a bit **off** no matter what it was, AND with everything except that bit: `flags = flags & ~(1 << n);` (`~` flips every bit).

## 4. Practice: a moving average of the light sensor

The curriculum task: *read 10 values from the light sensor and compute the moving average using an array.*

### Meet the light sensor

#### One line of code

```cpp
float light = incipe.getLightIntensity();
```

#### What you get

| Item | Detail |
| --- | --- |
| Value | A `float` from **0** (dark) to **1023** (bright) |
| Not detected | `-1` |
| Read it every | 20–500 ms — light changes quickly |

Full details: [Light sensor](/wiki/light).

### Why a moving average?

**Analogy: a football team's form.** You judge a team by its last 10 games, not its whole history and not just yesterday. A moving average does the same with readings: each new reading pushes out the oldest, so the number follows real changes but ignores single flickers.

### The average of an array

```walkthrough
float average(float values[], int count) {
  float total = 0;
  for (int i = 0; i < count; i++) {
    total = total + values[i];
  }
  return total / count;
}
---
1 | `values[]` is the array (passed like a pointer, so nothing is copied). Say it is {10, 20, 30} and `count` is 3. | count = 3
2 | Start the total at 0. | total = 0
3 | `i` starts at 0; 0 < 3, so go in. | i = 0
4 | Add `values[0]` = 10. | total = 10
3 | `i` becomes 1; 1 < 3. | i = 1
4 | Add `values[1]` = 20. | total = 30
3 | `i` becomes 2; 2 < 3. | i = 2
4 | Add `values[2]` = 30. | total = 60
3 | `i` becomes 3; 3 < 3 is false — the loop ends. | i = 3
6 | Hand back 60 / 3 = 20.
```

### The last 10 readings

```walkthrough
const int SIZE = 10;
float readings[SIZE];
int next = 0;

void loop() {
  float light = incipe.getLightIntensity();
  if (light >= 0) {
    readings[next] = light;
    next = (next + 1) % SIZE;
    Serial.println(average(readings, SIZE));
  }
  delay(100);
}
---
1 | Keep the last 10 readings. | SIZE = 10
2 | Ten boxes. A global array starts as all 0. | readings = {0,0,0,0,0,0,0,0,0,0}
3 | `next` is the box the next reading goes in. | next = 0
6 | Read the light. Say it is 500. | light = 500
7 | Not −1, so the sensor is there.
8 | Put it in box 0. | readings = {500,0,0,0,0,0,0,0,0,0}
9 | Move to the next box. `%` wraps 10 back to 0, so after box 9 it reuses box 0. | next = 1
10 | Average of the 10 boxes: 500 / 10. | | println: 50.00
12 | Wait 100 ms — inside the Wiki's 20–500 ms.
6 | Next pass: say the light reads 520. | light = 520
8 | Into box 1. | readings = {500,520,0,0,0,0,0,0,0,0}
9 | On to box 2. | next = 2
10 | (500 + 520) / 10. | | println: 102.00
```

| Line | What it does |
| --- | --- |
| 1 | A constant for how many readings to keep. |
| 2 | An array of 10 readings ([Lesson 4](/academy/m2-fundamentals-of-programming/04-arrays-for-loop)). |
| 3 | Which box to write next. |
| 6–7 | Read the light and skip −1 (not detected). |
| 8 | Overwrite the oldest box with the newest reading. |
| 9 | `% SIZE` makes `next` go 0, 1, … 9, 0, 1, … — round and round. |
| 10 | Print the average of all 10 boxes. |
| 12 | Wait 100 ms before the next reading. |

> **The first nine averages are too low**, because the empty boxes still hold 0. After 10 readings every box is real and the average is right. Fixing that is part of the task below.

Put `average()` above `loop()`, add `setup()` with `Serial.begin(9600);`, Upload, and open the **Plotter** to see the smooth line. Wave your hand over the sensor: the raw light would jump; the average glides.

### Your task

| Step | Do this |
| --- | --- |
| 1 | Build the sketch and plot it. |
| 2 | Also print the raw `light` on the same line, so the Plotter draws both: `Serial.print(light); Serial.print(" "); Serial.println(average(readings, SIZE));` |
| 3 | Fix the low start: keep a `count` of readings so far (up to 10) and average only those. |
| 4 | Try `SIZE` 3 and 30. Which follows your hand faster? Which is smoother? |

## Checkpoints

<details>
<summary>The function is <code>void addBonusCopy(int score) { score = score + 10; }</code> — no <code>&amp;</code>. With <code>int points = 50; addBonusCopy(points); Serial.println(points);</code>, what prints?</summary>

**50.** Without `&`, the function gets a copy. It adds 10 to the copy; `points` is untouched.
</details>

<details>
<summary><code>int a = 5; int *p = &amp;a; *p = *p * 2; Serial.println(a);</code> — what prints?</summary>

**10.** `p` points to `a`, so `*p * 2` is 5 × 2 = 10, written back into `a`.
</details>

<details>
<summary>What are <code>6 &amp; 3</code> and <code>6 | 1</code>?</summary>

**2 and 7.** `110 & 011` = `010` = 2. `110 | 001` = `111` = 7.
</details>

<details>
<summary>What is <code>1 &lt;&lt; 4</code>?</summary>

**16.** `00001` shifted left 4 places is `10000`, switch 4, worth 16.
</details>

<details>
<summary>In the moving average with <code>SIZE</code> 10, the very first reading is 500. What prints, and why is it not 500?</summary>

**50.00.** The other nine boxes still hold 0, so the average is 500 / 10 = 50. It becomes right once all ten boxes are filled.
</details>

## Recap

1. `int &x` is a reference — another name for the same variable, so a function can change it.
2. A pointer holds an address: `&` takes the address, `*` goes to it. An array's name works like a pointer to its first box.
3. `|` sets a bit, `&` checks it, `^` flips it and `<<` picks which one — eight flags in one byte. A moving average keeps the last N readings in an array.

**Next — Session 4: Structs & state machines.** Group related data with `struct`, and build a traffic light that moves from state to state.

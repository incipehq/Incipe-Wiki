---
title: Array & for loop
lesson: Lesson 4
type: slides
summary: Store many values under one name, loop through them with for, and combine the two to average and find the largest of 100 readings.
source: raw/LMS/Taster Workshop/Lesson 4 Arrays & For Loop.pptx
pdf: raw/LMS/Taster Workshop/Lesson 4 Arrays & For Loop.pdf
---
## Lesson overview

**Store many values, then loop through them.**

1. Quick review of Lesson 3
2. Array: create, write, read & clear
3. For loop
4. Array + for loop: average & largest value
5. Classwork: handling data

## Array

A collection of variables, like a database. One name holds many values; each box has an **index**, counted from **0**.

```cpp
int data[3] = {22, 24, 23};   // data[0]=22, data[1]=24, data[2]=23
```

### Create — type, name, size

```cpp
int data[6];                              // int, size 6, no data yet
int value[5] = {2, 4, -8, 3, 2};          // int, size 5, with data
float number[2] = {2.8943, 10.23189};     // other types work too
```

### Write, read & clear by index

| Action | Code | Result |
| --- | --- | --- |
| Write | `data[1] = 10;` | `{1,10,3,4,5,6}` — `[1]` is the *second* element |
| Read | `x = data[4];` | `x = 5` — a copy; the array does not change |
| Clear | `data[5] = 0;` | `{1,10,3,4,5,0}` — we treat 0 as "nothing" |

## For loop

A for loop repeats a command, and is mainly used to work through arrays.

```cpp
for (int i = 0; i <= 25; i++) {
  Serial.println(i);
}
```

| Part | Meaning |
| --- | --- |
| `int i = 0` | Initial value of the variable that controls the loop |
| `i <= 25` | When the loop ends |
| `i++` | How the value changes after each loop (adds 1) |

## For loop + array

Use `i` as the index:

```cpp
int data[5] = {0, 1, 2, 3, 4};

void setup() {
  Serial.begin(9600);
}

void loop() {
  for (int i = 0; i < 5; i = i + 1) {
    Serial.println(data[i]);   // data[0] first, then data[1], …
    delay(1000);
  }
}
```

### Average & largest of 100 readings

```cpp
// Average — add every element into database[0], then divide
for (int i = 1; i < 100; i++) {
  database[0] = database[0] + database[i];
  database[i] = 0;
}
float mean = database[0] / 100;
Serial.println(mean);
```

```cpp
// Largest — whenever a bigger value turns up, keep it in database[0]
for (int i = 1; i < 100; i++) {
  if (database[0] < database[i]) {
    database[0] = database[i];
  }
}
Serial.print(database[0]);
```

## Checkpoints

<details>
<summary>Which sensor does not require data cleaning?</summary>

**The button** — it already returns 1 (pressed) or 0 (not pressed).
</details>

<details>
<summary><code>int numbers[5] = {1,2,3,4,5}; numbers[2] = numbers[1] + numbers[4];</code></summary>

**{1, 2, 7, 4, 5}** — 2 + 5 = 7 replaces the third element.
</details>

<details>
<summary><code>float data[8]; … data[5] = 2.34; int x = data[1] + data[5];</code> — what prints?</summary>

**2.** `data[1]` was never set, so it is 0; 0 + 2.34 = 2.34, and an `int` drops the decimals.
</details>

<details>
<summary><code>for (int i = 1; i &lt; 10; i = i+2) Serial.print(i);</code></summary>

**13579** — 1, 3, 5, 7, 9 on one line; the loop stops at 11.
</details>

<details>
<summary><code>int database[3] = {1,2,3}; for (i = 1; i &lt; 3; i++) database[0] += database[i];</code> — value of a?</summary>

**6.** i = 1: 1 + 2 = 3. i = 2: 3 + 3 = 6.
</details>

## Classwork — handling data

Refer to note page 8. You will need an array to store the data and a for loop to go through it.

## Recap

1. An array holds many values under one name; the index counts from 0.
2. A for loop has a start, an end condition and a step: `for (int i = 0; i < 5; i++)`.
3. Together, `data[i]` inside a for loop reads every element — to print, total or find the largest.

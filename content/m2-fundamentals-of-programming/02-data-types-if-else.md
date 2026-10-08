---
title: More about programming
lesson: Lesson 2
type: slides
summary: Input-process-output, comments and the compiler, comparison operators, and making decisions with if, else if, else and && || !.
source: raw/LMS/M2 Fundamentals of Programming/Lesson 2 Data Type If-else.pptx
---
## Lesson overview

**From input to decisions.**

1. Quick review of Lesson 1
2. Input-Process-Output
3. Comments & the compiler
4. Operators: compare & assign
5. If-then-else
6. AND, OR & NOT

## Quick review — six data types

| Type | Meaning | Example |
| --- | --- | --- |
| Integer | Positive, 0 or negative whole numbers | `1`, `102` |
| Float | Up to 7 decimal places | `1.234` |
| Double | Up to 15 decimal places | `1.234567890123` |
| Char | A single character | `A` |
| String | Several characters | `ABC`, `Hello` |
| Boolean | Either true or false | `true`, `false` |

## Input-Process-Output

Every program takes in, works on, and gives out.

1. **Input** — data we enter, or the computer gets from the environment via sensors.
2. **Process** — our code (orders) for the computer to run.
3. **Output** — the response after processing.

| Without a library (typed by the user) | With the INCIPE library (read from sensors) |
| --- | --- |
| `Serial.parseInt()` | `incipe.getTemperature()` |
| `Serial.parseFloat()` | `incipe.getLightIntensity()` |
| `while (Serial.available() == 0){}` | `incipe.getDistance()` |

```cpp
// From the user
Serial.println("Please enter your height.");   // ask
while (Serial.available() == 0) {}             // wait when there's no input
int a = Serial.parseInt();                     // read it and store it in a

// From a sensor
incipe.main();                                           // activate the sensors
incipe.onscreen("temp1", incipe.getTemperature());       // show the temperature
```

## Comments & the compiler

Comments are notes the compiler ignores — `//` for one line, `/* … */` for several.

```cpp
String s = "Hello, ";          // declare a string
void setup() {
  Serial.begin(9600);          // activate Serial Monitor
  Serial.println("What is your name?");
  while (Serial.available() == 0) {}
  String input = Serial.readString();
  Serial.print(s + input);
}
void loop() {
  /* put your main code here,
     to run repeatedly */
}
```

**The compiler is like Google Translate**: it translates what you write into something the computer can execute — and checks it for mistakes on the way.

## Operators

| Symbol | Meaning |
| --- | --- |
| `==` | Equals to |
| `!=` | Not equals to |
| `<=` | Smaller than or equal to |
| `>=` | Larger than or equal to |
| `<` | Smaller than |
| `>` | Larger than |

> **One equal sign assigns. Two compare.** `a = 1` lets `a` equal 1 — the right side is evaluated first, then stored on the left. `a == 1` asks whether `a` is 1.

## If-then-else

```cpp
float temperature = 27.98;
void setup() {
  Serial.begin(9600);
  if (temperature > 25) {
    Serial.print("turn on");
  } else {
    Serial.print("turn off");
  }
}
```

- `if` runs code when the condition is true — **only** as the first statement.
- `else if` adds more conditions — as many as you need.
- `else` runs when everything above was false — **only** last, with no condition.

## AND, OR & NOT

| Symbol | Name | True when |
| --- | --- | --- |
| `&&` | AND | Both sides are true |
| `\|\|` | OR | Any one side is true |
| `!` | NOT | Flips true and false |

| Condition | Result |
| --- | --- |
| `(10 > 7) \|\| (90 < 80)` | true |
| `(10 > 7) && (90 < 80)` | false |
| `(10 > 7) && !(90 < 80)` | true |
| `!(10 > 7) && (90 < 80)` | false |

Work out each bracket first, then apply the symbol.

## Checkpoints

<details>
<summary>1 · <code>int a=10; if(a&lt;5){a=a+4;} else{a=a-5;}</code> — what prints?</summary>

**5.** `a<5` is false, so `else` runs: 10 − 5 = 5.
</details>

<details>
<summary>2 · <code>x=10, y=20; if (x&gt;y) "Hi" else "Bye"</code></summary>

**Bye.** 10 is not larger than 20.
</details>

<details>
<summary>3 · <code>x=5, y=7, z=2</code> — A if <code>x&lt;y &amp;&amp; y&lt;z</code>, B if <code>x&lt;y || y&lt;z</code>, else C</summary>

**B.** `y<z` is false so `&&` fails; `||` needs only one true side.
</details>

<details>
<summary>4 · Which x, y, z make <code>!(x&lt;=y) &amp;&amp; (y&gt;z)</code> true?</summary>

Any **x > y > z**, for example **3, 2, 1**.
</details>

## Recap

1. Every program is input, process and output.
2. `=` assigns a value; `==` compares two values.
3. `if`, `else if` and `else` choose what runs; `&&`, `||` and `!` combine conditions.

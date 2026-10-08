---
title: Course overview & programming basics
lesson: Lesson 1
type: slides
summary: Find your way around the INCIPE Workspace, write your first sketch, meet the data types and the three kinds of error, then install the INCIPE library.
source: raw/LMS/M2 Fundamentals of Programming/Lesson 1 Coding Basics.pptx
---
## Lesson overview

**From the IDE to your first library.**

1. Course overview & class setup
2. Getting started in the INCIPE Workspace
3. Writing codes: `setup()`, `loop()` & Serial
4. Data types
5. Errors & the error-free classwork
6. Libraries & the INCIPE Board

## Getting started in the INCIPE Workspace

| # | Area | What it does |
| --- | --- | --- |
| 1 | **AI chat** | Ask Incipe AI to write or change your code |
| 2 | **Sketchbook & code** | Your project files and the code editor |
| 3 | **Verify** | Checks the code compiles |
| 4 | **Upload** | Sends the code to the INCIPE Board |
| 5 | **Board menu** | The board connected by USB, and its status |
| 6 | **Serial monitor & plotter** | The terminal icon — see results or plot graphs |

### The serial monitor

A virtual screen inside the Workspace for the result of your code. Open the Console from the terminal icon, pick the **Serial** tab (the **Plotter** draws graphs), set the baud rate to match `Serial.begin()` — **9600** in this lesson — and press **Start**.

> Connect first: select the board's port in the Board menu.

## Writing codes

Every sketch has two functions.

| Function | Runs | Used for |
| --- | --- | --- |
| `void setup() { }` | **Once**, after each power-up or reset | Setting up the board |
| `void loop() { }` | **Continuously** | Most of your code — what the board should do and what data to give you |

### Five functions for your first sketches

| Function | What it does |
| --- | --- |
| `Serial.begin(9600)` | Activates the serial monitor |
| `Serial.print()` | Prints numbers or words on the same line. Words need `""` |
| `Serial.println()` | Prints, then moves to a new line |
| `delay()` | Waits before the next order, in milliseconds (1 s = 1000 ms) |
| `Serial.parseInt()` | Reads an integer typed by the user |

### Example — printing "Hello world"

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("Hello world");
  delay(1000);
}
```

`setup()` activates the serial monitor once. `loop()` prints *Hello world* on a new line, waits 1000 ms, then repeats.

## Data types

### Three ways to store a number

| Type | Meaning | Example |
| --- | --- | --- |
| `int` | Integer — positive, 0 or negative | `1`, `102` |
| `float` | Up to 7 decimal places | `1.234`, `2.345` |
| `double` | Up to 15 decimal places | `1.234567890123` |

How precise does the number need to be? `1+1` and `001.000000000 + 001.000000000` give the same sum; `22°C`, `22.3°C` and `22.3278453624°C` describe the same room.

```cpp
int a = 10;
const int a_const = 10;
float b = 10.123456;
double c = 10.123456789123456;

void setup() {
  Serial.begin(9600);
  Serial.print("a = ");
  Serial.println(a);
  Serial.print("b = ");
  Serial.println(b, 6);   // 6 decimal places
}
```

### Characters & words

`char` holds a single character (`'A'`); `String` holds several (`"Hello"`). **Boolean** — true or false — comes next lesson.

```cpp
String text = "I am William";
char character = 'A';

void setup() {
  Serial.begin(9600);
  Serial.println(text);
  Serial.println(character);
}
```

## Errors

| Error | What it is | Example |
| --- | --- | --- |
| **Syntax error** | Written mistakes | A missing bracket or `;`, mixing up `=` and `==` |
| **Run-time error** | The computer cannot do what you asked | `1/0` |
| **Logical error** | It runs, but the outcome is not what you expected | See below |

**Spot the syntax errors** — press Verify; the IDE stops at the first one.

```cpp
int SensorValue = 10          // missing ;
void setup() {
  Serial.begin(9600);
  Serial.print (SenserValue);  // misspelled variable
}
```

**A logical error** — nothing happens when the values are equal:

```cpp
if (sensorValue > threshold) { Print("true"); }
else if (sensorValue < threshold) { Print("false"); }
// fixed: use >= so sensorValue == threshold prints "true"
```

## Classwork — the error-free exercise

Refer to note pages 7–8 and fix every sketch so it runs. Suggested answers:

<details>
<summary>Answer 2 — calculate BMI</summary>

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("Please enter your height in m");
  while (Serial.available() == 0) {}
  float height = Serial.parseFloat();
  Serial.println("Please enter your weight in kg");
  while (Serial.available() == 0) {}
  float weight = Serial.parseFloat();
  float BMI = weight / height / height;
  Serial.print("Your BMI is:");
  Serial.println(BMI);
}
```
</details>

## Libraries

A collection of pre-written code for specific tasks. Libraries reduce the code you write by providing reusable functions. **Install the INCIPE library now.**

```cpp
#include "incipe.h"          // 1. gain access to the INCIPE library
Incipe incipe(true);         // 2. activate the library
incipe.onscreen("place", "data/word");  // 3. print on that place on the screen
```

## Checkpoints

- *How do you activate the serial monitor?* — `Serial.begin(9600);`
- *Which can print 1?* `Serial.print(1);`, `Serial.print("1");` and `Serial.print(0+1);` all do. `Serial.print("0+1");` prints the text `0+1`.
- *What does `incipe.onscreen("light1", a);` do with `int a = 10;`?* — shows `10` at the `light1` place on the board's screen.

## Hands-on

1. Install the INCIPE library and add `#include "incipe.h"`.
2. Pick a place on the screen and show a value with `incipe.onscreen()`.
3. Verify, then upload to the INCIPE Board.

**Next — Lesson 2:** operators, comments, input & output, and Boolean, the true-or-false data type.

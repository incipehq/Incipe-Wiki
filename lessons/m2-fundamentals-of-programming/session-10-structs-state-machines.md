# Session 4: Structs & State Machines

> **M2 Fundamentals of Programming** · Weeks 5–8
> **Modules used:** [Temperature & humidity sensor](/wiki/temperature-humidity), [Light sensor](/wiki/light)

## Lesson overview

**Keep related values together, and give your program a clear set of moods.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | `struct`: one card for related values | 8 min |
| 02 | State machines: one state at a time | 8 min |
| 03 | Practice: a traffic light | 9 min |
| 04 | AI integration: review your state machine | 5 min |

Builds on: functions and `switch` from [Session 2](/academy/m2-fundamentals-of-programming/08-control-structures-functions), and the sensor readings from [Lesson 3](/academy/m2-fundamentals-of-programming/03-sensors).

### Key words

| Word | Plain meaning |
| --- | --- |
| **`struct`** | A new type you design yourself, that groups several values under one name. |
| **Member** | One value inside a struct, reached with a dot: `d.temperature`. |
| **State** | What the program is doing right now — like "red" for a traffic light. |
| **Transition** | Moving from one state to the next. |
| **State machine (FSM)** | A program that is always in exactly one state and moves between states by clear rules. FSM = finite state machine. |
| **`enum`** | A list of named values, like `RED`, `YELLOW`, `GREEN`, so your code says names instead of numbers. |

## 1. `struct`: one card for related values

**Analogy: a student ID card.** Name, class and student number belong together, so they are printed on one card — not on three loose slips of paper. A `struct` is that card for your data.

Three sensor readings that belong together:

### Meet the sensors

#### One line of code

```cpp
float temperature = incipe.getTemperature();
float humidity = incipe.getHumidity();
float light = incipe.getLightIntensity();
```

#### What you get

| Call | Value | Not detected | Read it every |
| --- | --- | --- | --- |
| `incipe.getTemperature()` | A `float` in degrees Celsius (°C) | `-1` | 2000 ms |
| `incipe.getHumidity()` | A `float`, % relative humidity, 0–100 | `-1` | 2000 ms |
| `incipe.getLightIntensity()` | A `float` from 0 (dark) to 1023 (bright) | `-1` | 20–500 ms |

Full details: [Temperature & humidity sensor](/wiki/temperature-humidity), [Light sensor](/wiki/light).

### Design the card, then fill it in

```walkthrough
struct SensorData {
  float temperature;   // °C
  float humidity;      // %
  float light;         // 0–1023
};

SensorData readAll() {
  SensorData d;
  d.temperature = incipe.getTemperature();
  d.humidity = incipe.getHumidity();
  d.light = incipe.getLightIntensity();
  return d;
}
---
1 | Design a new type called `SensorData` — the blank card.
2 | It has three members. Each is a `float`.
5 | The `;` after `}` ends the design. Nothing is stored yet.
7 | A function that hands back a whole `SensorData`.
8 | Make one empty card, `d`.
9 | The dot reaches inside: fill in the temperature. Say it is 23.4. | d.temperature = 23.4
10 | Fill in the humidity: 51. | d.humidity = 51.0
11 | Fill in the light: 700. | d.light = 700.0
12 | Hand back the whole card in one go.
```

| Line | What it does |
| --- | --- |
| 1 | `struct SensorData` starts the design of a new type. |
| 2–4 | Its three members, each with a comment saying the unit. |
| 5 | `};` ends the design — note the semicolon. |
| 7 | `readAll()` returns a `SensorData`: three values from one function. |
| 8 | `SensorData d;` makes one variable of the new type. |
| 9–11 | `d.` + member name reads or writes one value on the card. |
| 12 | Returns the full card. |

Using it:

```cpp
SensorData now = readAll();
Serial.print(now.temperature);
Serial.print(" ");
Serial.println(now.light);   // prints 23.40 700.00 with the values above
```

> Each member can still be **−1** if its sensor is not detected — check `now.temperature >= 0` before you use it, as always.

**Why bother?** One name carries everything that belongs together. A function can return one `SensorData` instead of three separate numbers, and an array of `SensorData` keeps a whole log of readings in order. [M3 Session 1](/academy/m3-incipe-board-sensors-modules/11-analog-sensors-adc) builds its sensor dashboard on this idea.

On the INCIPE Board this card takes **12 bytes**: three `float`s of 4 bytes each.

## 2. State machines: one state at a time

**Analogy: a traffic light.** At any moment it shows exactly one colour — never two, never none. After a set time it moves to the next colour, always in the same order. That is a **state machine**: a fixed list of **states**, and clear rules for each **transition**.

Write the states as an `enum`, so the code reads `RED` instead of a mystery number:

```cpp
enum Light { RED, YELLOW, GREEN };
Light state = RED;
```

| Line | What it does |
| --- | --- |
| 1 | A new type `Light` that can only be `RED`, `YELLOW` or `GREEN`. |
| 2 | The light starts in the `RED` state. |

Plan the machine as a table **before** you code it. The curriculum order is Red → Yellow → Green → Red:

| State | Shows | Lasts | Next state |
| --- | --- | --- | --- |
| `RED` | Red | 3000 ms | `YELLOW` |
| `YELLOW` | Yellow | 1000 ms | `GREEN` |
| `GREEN` | Green | 3000 ms | `RED` |

> Real traffic lights differ from country to country. Change the table, and the code follows.

## 3. Practice: a traffic light

The curriculum task: *design an FSM for a traffic light (Red → Yellow → Green → Red).* Each row of the table becomes one `case`:

```walkthrough
enum Light { RED, YELLOW, GREEN };
Light state = RED;

void loop() {
  switch (state) {
    case RED:    Serial.println("RED");    delay(3000); state = YELLOW; break;
    case YELLOW: Serial.println("YELLOW"); delay(1000); state = GREEN;  break;
    case GREEN:  Serial.println("GREEN");  delay(3000); state = RED;    break;
  }
}
---
1 | Three named states.
2 | Start in `RED`. | state = RED
5 | First pass of `loop()`: which state are we in? `RED`.
6 | Show red, wait 3 s, then move to `YELLOW`. `break` leaves the switch. | state = YELLOW | println: RED
5 | Next pass: `state` is `YELLOW`.
7 | Show yellow for 1 s, then move to `GREEN`. | state = GREEN | println: YELLOW
5 | Next pass: `GREEN`.
8 | Show green for 3 s, then back to `RED` — the cycle repeats. | state = RED | println: GREEN
```

| Line | What it does |
| --- | --- |
| 1–2 | The states, and where the machine starts. |
| 5 | Every pass of `loop()` asks one question: *which state am I in?* |
| 6–8 | One `case` per row of the table: show, wait, choose the next state. |

Add `setup()` with `Serial.begin(9600);`, Upload, and watch `RED`, `YELLOW`, `GREEN` repeat. One full cycle takes 3 + 1 + 3 = 7 seconds.

> **On the LED strip.** The curriculum lights the real colours on the [LED strip](/wiki/led-strip). That version will be added once the Wiki page lists what `incipe.setLEDcolour(...)` and `incipe.showLED()` take. Each `Serial.println` is where the LED call will go.

### Your task

| Step | Do this |
| --- | --- |
| 1 | Run the traffic light and time one full cycle. |
| 2 | Add a fourth state, `RED_YELLOW`, between `RED` and `GREEN` (shown as "RED + YELLOW" for 1 s), as many countries use. Update the table first, then the code. |
| 3 | Keep a count of how many full cycles have run, and print it every time the light turns red. |

## 4. AI integration: review your state machine

The curriculum task: *have AI review your FSM logic and suggest improvements.* Paste your traffic-light code into the Workspace AI chat with:

> Review this traffic-light state machine. Check that every state has exactly one next state and that no state can be skipped or reached by mistake. Suggest up to three improvements and explain each in one sentence for a beginner. Do not rewrite the whole program.

Check what comes back like a reviewer:

| Ask yourself | Why |
| --- | --- |
| Does every suggested change still match my state table? | The table is the plan. Change the table first, then the code. |
| Did it add a `default:` case? | A good idea: if `state` ever holds something unexpected, go back to a safe state like `RED`. |
| Did it suggest `millis()` instead of `delay()`? | Useful later: with `delay()` the board cannot read a button *during* a light. [M3 Session 4](/academy/m3-incipe-board-sensors-modules) covers non-blocking timing. |
| Did it rename my `incipe.*` calls or invent new ones? | Never accept that — compare with the [Wiki](/wiki). |

## Checkpoints

<details>
<summary><code>SensorData</code> has three <code>float</code> members. How many bytes does one <code>SensorData</code> take on the INCIPE Board?</summary>

**12.** Three `float`s of 4 bytes each.
</details>

<details>
<summary><code>SensorData x; x.temperature = 21.5; Serial.println(x.temperature);</code> — what prints?</summary>

**21.50.** The dot reaches the `temperature` member; Arduino prints a `float` with two decimal places.
</details>

<details>
<summary>The traffic light starts in <code>RED</code>. What are the first four lines the Serial monitor shows?</summary>

**RED, YELLOW, GREEN, RED.** Each pass of `loop()` shows the current state, then moves to the next; after `GREEN` it goes back to `RED`.
</details>

<details>
<summary>Which state comes straight after <code>YELLOW</code>?</summary>

**GREEN.** The `YELLOW` case sets `state = GREEN`.
</details>

<details>
<summary>How long does one full Red → Yellow → Green cycle take?</summary>

**7 seconds.** 3000 + 1000 + 3000 = 7000 ms.
</details>

## Recap

1. A `struct` groups related values under one name; reach each member with a dot, and return the whole card from a function.
2. A state machine is always in exactly one state; plan the states and transitions as a table, then write one `case` per row.
3. An `enum` gives states readable names — and the AI's review should improve your table, not replace it.

**Next — M3 Session 1: Analog sensors & ADC.** How the board turns a voltage into a number, and a live Serial Monitor dashboard.

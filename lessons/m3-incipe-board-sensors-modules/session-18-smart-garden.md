# Session 8: Integration — Building the Smart Garden System

> **M3 INCIPE Board, Sensors & Modules** · Weeks 9–13
> **Modules used:** [Soil moisture sensor](/wiki/soil-moisture), [Temperature & humidity sensor](/wiki/temperature-humidity), [Light sensor](/wiki/light) · actuators: [Water pump](/wiki/pump), [Servo](/wiki/servo), [LED strip](/wiki/led-strip)

## Lesson overview

**Teach the board to look after a plant: read the soil, decide, and act — without flicking on and off.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | The garden's senses: three sensors at once | 6 min |
| 02 | From a raw number to "% wet" | 7 min |
| 03 | Practice: automatic watering with a gap | 10 min |
| 04 | AI integration: design the logic, choose the thresholds | 7 min |

Builds on: calibrating the soil probe in [Session 1](/academy/m3-incipe-board-sensors-modules/11-analog-sensors-adc), states from [M2 Session 4](/academy/m2-fundamentals-of-programming/10-structs-state-machines), and `if` from [Lesson 2](/academy/m2-fundamentals-of-programming/02-data-types-if-else).

### Key words

| Word | Plain meaning |
| --- | --- |
| **Calibrate** | Measure your own sensor at two known points (bone dry, in water) so its numbers mean something. |
| **Threshold** | A number where the program changes what it does — "below 30 % wet, start watering". |
| **Hysteresis** | Using **two** thresholds, one to switch on and a higher one to switch off, so the output doesn't flicker. |
| **`bool`** | A variable that is only ever `true` or `false`. |
| **Fail-safe** | When something goes wrong, the system falls back to the harmless choice — here, *not* watering. |
| **Stand-in** | A `Serial.println` in the spot where an actuator call will go. |

## 1. The garden's senses: three sensors at once

**Analogy: a gardener's morning round.** Feel the soil — dry? Water it. Look at the sky — dark? Switch on the lamp. Check the greenhouse — too hot? Open a window. Each sensor answers one question; your program asks them all, every round.

### Meet the sensors

#### One line of code

```cpp
float moisture = incipe.getSoilMoisture();
float temperature = incipe.getTemperature();
float light = incipe.getLightIntensity();
```

#### What you get

| Call | Value | Not detected | Read it every |
| --- | --- | --- | --- |
| `incipe.getSoilMoisture()` | A `float`, a **raw** reading — no fixed unit | `-1` | 500 ms — soil changes slowly |
| `incipe.getTemperature()` | A `float` in degrees Celsius (°C) | `-1` | 2000 ms |
| `incipe.getLightIntensity()` | A `float` from 0 (dark) to 1023 (bright) | `-1` | 20–500 ms |

Don't assume "high = wet": calibrate your own soil probe. Full details: [Soil moisture](/wiki/soil-moisture), [Temperature & humidity](/wiki/temperature-humidity), [Light](/wiki/light).

> **The actuators.** The Smart Garden waters with the [water pump](/wiki/pump), opens a window with the [servo](/wiki/servo) and lights the plant with the [LED strip](/wiki/led-strip). Their Wiki pages name the functions but don't yet say what values they take, so this lesson prints **stand-ins** — `PUMP ON`, `PUMP OFF` — exactly where each actuator call will go. The logic is the hard part, and it's all here.

## 2. From a raw number to "% wet"

In [Session 1](/academy/m3-incipe-board-sensors-modules/11-analog-sensors-adc) you wrote down two numbers: the probe in the air (`DRY_VALUE`) and the probe in water (`WET_VALUE`). With those two, any reading becomes a percentage: 0 % is bone dry, 100 % is in water.

**Analogy: a progress bar.** If a download goes from 0 MB to 60 MB and you are at 30 MB, you are half-way: 30 ÷ 60. Here, "how far from dry" ÷ "the whole way from dry to wet".

> The code below uses **100** (dry) and **40** (wet) as stand-in calibration values, so the examples are easy to follow — and so you can see that on some probes "wet" is the *smaller* number. Replace them with yours.

```walkthrough
const float DRY_VALUE = 100;   // probe in air: change to yours
const float WET_VALUE = 40;    // probe in water: change to yours

float wetPercent(float raw) {
  return (raw - DRY_VALUE) / (WET_VALUE - DRY_VALUE) * 100;
}
---
1 | Your reading with the probe in the air: bone dry. | DRY_VALUE = 100
2 | Your reading with the probe in water: fully wet. | WET_VALUE = 40
4 | Call `wetPercent(70)`: a reading between the two. | raw = 70
5 | How far from dry? 70 − 100 = −30.
5 | The whole way from dry to wet: 40 − 100 = −60.
5 | −30 ÷ −60 = 0.5, then × 100 = 50. Half-way to wet. | result = 50
```

| Line | What it does |
| --- | --- |
| 1–2 | Your two calibration readings, as constants. |
| 4 | `wetPercent` takes a raw reading and returns a `float` from 0 to 100. |
| 5 | (how far from dry) ÷ (whole way from dry to wet) × 100. |

It works whichever way your probe goes: if wet is the smaller number, both the top and the bottom are negative, and the minus signs cancel. A reading drier than your "dry" or wetter than your "wet" gives a little under 0 or over 100 — that's fine.

**Try it.** Put your own `DRY_VALUE` and `WET_VALUE` in, print `wetPercent(incipe.getSoilMoisture())` every 500 ms, and water a plant pot. Watch the percentage climb.

## 3. Practice: automatic watering with a gap

The curriculum task: *automate watering based on moisture levels.*

**The flicker problem.** "Water when below 30 %" sounds right. But the moment the soil reaches 30.1 %, the pump stops; a minute later it dries to 29.9 % and starts again — on, off, on, off.

**Analogy: running a bath.** You turn the tap on when the water is low, and you don't turn it off at the first drop — you wait until it's high enough. Two levels: one to start, a higher one to stop. That gap is **hysteresis**.

| State | Switch when | Next state | Stand-in |
| --- | --- | --- | --- |
| Not watering | % wet **below 30** | Watering | `PUMP ON` |
| Watering | % wet **above 60** | Not watering | `PUMP OFF` |

That's a two-state machine, like the traffic light in [M2 Session 4](/academy/m2-fundamentals-of-programming/10-structs-state-machines). A `bool` remembers which state you're in.

```walkthrough
const float START = 30;   // % wet: start watering below this
const float STOP = 60;    // % wet: stop watering above this
bool watering = false;

void loop() {
  float raw = incipe.getSoilMoisture();
  float wet = 100;                         // no reading: act as if wet
  if (raw != -1) wet = wetPercent(raw);
  if (!watering && wet < START) { watering = true;  Serial.println("PUMP ON"); }
  if (watering && wet > STOP)   { watering = false; Serial.println("PUMP OFF"); }
  delay(2000);
}
---
1 | Start watering below 30 % wet. | START = 30
2 | Stop only above 60 % wet. | STOP = 60
3 | The pump starts off. | watering = false
6 | Round 1: the reading is 70. | raw = 70
8 | Not −1, so convert: 50 % wet. | wet = 50
9 | `!watering` means "not watering" — true. Is 50 below 30? No. Nothing to do.
10 | Not watering, so this line does nothing either. Wait 2 s.
8 | Round 2: the reading is 85 — 25 % wet. The soil is drying. | raw = 85; wet = 25
9 | Not watering, and 25 is below 30: switch on. | watering = true | println: PUMP ON
10 | Is 25 above 60? No — keep going.
8 | Round 3: the reading is 73 — 45 % wet. | raw = 73; wet = 45
10 | 45 is above 30 now, but not above 60: the pump **keeps running**. That's the gap at work.
8 | Round 4: the reading is 61 — 65 % wet. | raw = 61; wet = 65
10 | Watering, and 65 is above 60: switch off. | watering = false | println: PUMP OFF
```

| Line | What it does |
| --- | --- |
| 1–2 | The two thresholds. The gap between them stops the flicker. |
| 3 | `bool watering` remembers the state: `true` or `false`. |
| 6 | Read the soil. |
| 7–8 | Fail-safe: a −1 reading stays at "100 % wet", so a missing probe never starts the pump. |
| 9 | `!` means "not". Start only if not already watering **and** too dry. |
| 10 | Stop only if watering **and** wet enough. |
| 11 | The DHT11 next to it is read every 2 s, so one round every 2 s suits the whole garden. |

Put `wetPercent()` above `loop()`, add `setup()` with `Serial.begin(9600);`, and Upload. Water the pot slowly and watch `PUMP ON`, then `PUMP OFF` once — not a stream of them.

> **Where the pump call goes.** Each `Serial.println("PUMP …")` is where `incipe.setPumpSpeed(speed)` will go, once the [Water pump](/wiki/pump) page says what `speed` takes.

### Your task

| Step | Do this |
| --- | --- |
| 1 | Put in your own calibration values. Pick `START` and `STOP` for a real plant: how dry should it get before you water, and how wet is enough? |
| 2 | Add the grow light: print `GROW LIGHT ON` when `incipe.getLightIntensity()` falls below a threshold you choose (0 is dark, 1023 bright), and `GROW LIGHT OFF` when it rises above a higher one. Use a second `bool`. Skip −1 readings. |
| 3 | Add the window: print `OPEN WINDOW` when `incipe.getTemperature()` goes above 30 °C, and `CLOSE WINDOW` when it drops below 27 °C. |
| 4 | Pull the soil probe out while it runs. What does the Serial Monitor show, and why is that the safe choice? |

## 4. AI integration: design the logic, choose the thresholds

The curriculum task: *use AI to design the automation logic and suggest optimal thresholds.* Paste your sketch and your calibration numbers into the Workspace AI chat:

> I'm building a Smart Garden on an ESP32 board. My soil probe reads [DRY] in air and [WET] in water; I convert it to "% wet" with the function below. Suggest START and STOP thresholds for watering a [type of plant], and a light threshold for a grow lamp on a 0 (dark) to 1023 (bright) scale. Explain each number in one sentence for a beginner. Keep my hysteresis and my −1 fail-safe. Do not change any `incipe.*` call.

Check what comes back like a reviewer:

| Ask yourself | Why |
| --- | --- |
| Are its thresholds in **% wet**, not raw numbers? | The AI can't know your probe's raw range — only your calibration does. |
| Is STOP still higher than START? | Without the gap, the pump flickers again. |
| Is the −1 check still there? | A missing probe must never start the pump. |
| Did it invent pump, servo or LED code, or change an `incipe.*` call? | Never accept that — compare with the [Wiki](/wiki). Keep your stand-ins until the pages are published. |
| Does the plant advice make sense? | Ask it *why* — then check one fact yourself, e.g. how often that plant needs water. |

## Checkpoints

<details>
<summary>With <code>DRY_VALUE</code> 100 and <code>WET_VALUE</code> 40, what does <code>wetPercent(100)</code> return?</summary>

**0** — the reading equals "dry": (100 − 100) ÷ (40 − 100) × 100 = 0.
</details>

<details>
<summary>And <code>wetPercent(40)</code>?</summary>

**100** — the reading equals "wet": (40 − 100) ÷ (40 − 100) × 100 = 100.
</details>

<details>
<summary><code>watering</code> is <code>false</code> and the soil is 45 % wet. Does the pump start?</summary>

**No.** 45 is not below `START` (30), so line 9 does nothing.
</details>

<details>
<summary><code>watering</code> is <code>true</code> and the soil is 45 % wet. What happens?</summary>

**The pump keeps running.** 45 is not above `STOP` (60), so line 10 does nothing. Same reading, different state, different result — that's hysteresis.
</details>

<details>
<summary>If line 8 converted a −1 reading anyway, what would <code>wetPercent(-1)</code> print?</summary>

**168.33.** (−1 − 100) ÷ (40 − 100) × 100 = 168.33 — a nonsense "very wet". With a probe that goes the other way it would be a nonsense "very dry" and start the pump. That's why line 8 skips −1.
</details>

## Recap

1. Calibrate, then convert: two readings (dry, wet) turn any raw number into "% wet", whichever way your probe goes.
2. Use two thresholds — start low, stop high — and a `bool` for the state, so the pump switches once instead of flickering.
3. Fail safe: a −1 reading must never switch anything on. The AI can suggest thresholds, but only your calibration knows your sensor.

**Next — Session 9: Building the Game Console.** Joystick, button and LED strip together.

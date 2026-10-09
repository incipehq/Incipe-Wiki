---
title: Smart plant plot
lesson: Project 1
type: project
summary: A plant pot that watches its own temperature, humidity and light, shows them on the IA Kit screen and sounds an alarm until someone looks after it.
---
*The basil on the classroom windowsill keeps dying over the holidays. Nobody notices it is too cold, too dry or too dark until it is too late. Your first build gives the plant a voice: four sample projects, one smarter room.*

> **Hardware:** the **IA Kit** (the board with the built-in screen) with the temperature & humidity sensor and the light sensor. Screen functions are on the [IA Screen API](https://site.incipeacademy.com/doc/screen-library); sensor functions on the [IA SensorSync API](https://site.incipeacademy.com/doc/get-sensor-data). Original starter: [Smart Plant Plot](https://site.incipeacademy.com/doc/smart-plant-plot).

## What you will build

- The screen shows the temperature, the humidity and the light: **dark**, **moderate** or **bright**.
- When the plant is too cold, too hot, too dry or in the dark, the kit beeps.
- A **Done** button on the screen stops the alarm once someone has fixed it.

## How it works

1. Read three sensors every time `loop()` runs.
2. Turn the light reading into a word.
3. Show everything on the screen.
4. If anything is wrong and nobody has pressed **Done**, play the alarm.

Before you start, design one screen page with four places: `temp1`, `humid1`, `light1` and a button whose value is `done.val`. The names are yours; use the same ones in the code.

## Starter code

```cpp
// Fill in the place with /* */

/* include Incipe library*/
bool force_stop = 0;

void setup()
{
  // put your setup code here, to run once:
  incipe.init();
}

void loop()
{
  // put your main code here, to run repeatedly:
  incipe.main();
  /* get temperature from sensor*/
  /* print the temperature on IA Kit screen*/
  /* get relative humidity from sensor*/
  /* print the relative humidity on IA Kit screen*/
  /* get light intensity from sensor*/
  /* classify "dark", "moderate" and "bright" using light sensor data*/
  /* print "dark", "moderate" or "bright" on IA Kit screen*/
  if (/* press a button to indicate changes have been made, force the sound to stop*/)
  {
    force_stop = 1;
  }
  while (force_stop == 0)
  {
    if (/* temperature is too low OR temperature is too high OR relative humidity is too low OR light is dark */)
    {
      incipe.PlaySound();
    }
  }
  incipe.screenWriteValue(/* "name of your button" */ , -1);
}
```

## Fill in the blanks

### 1. Include the library

The first line gives your sketch the `incipe` functions.

<details>
<summary>Show the answer</summary>

```cpp
#include "incipe.h"
```
</details>

### 2. Temperature and humidity on screen

Store each reading in a variable, then show it with `incipe.onscreen(place, value)`.

<details>
<summary>Show the answer</summary>

```cpp
float temperature = incipe.getTemperature();
incipe.onscreen("temp1", temperature);
float humidity = incipe.getHumidity();
incipe.onscreen("humid1", humidity);
```
</details>

### 3. Light as a word

`incipe.getLightIntensity()` returns a raw number: higher is brighter. Print it with `Serial.println()` first, cover the sensor with your hand, then shine a torch on it. Pick two limits from what you see.

<details>
<summary>Show one answer</summary>

```cpp
const int DARK = 200;    // below this is dark (your number)
const int BRIGHT = 700;  // above this is bright (your number)

int light = incipe.getLightIntensity();
String lightWord;
if (light < DARK)         { lightWord = "dark"; }
else if (light > BRIGHT)  { lightWord = "bright"; }
else                      { lightWord = "moderate"; }
incipe.onscreen("light1", lightWord);
```
</details>

### 4. The Done button

A screen button's value becomes true when it is pressed. Read it with `incipe.screenReadValue()`. The starter's last line writes to the same value afterwards: put your button's name there too.

<details>
<summary>Show the answer</summary>

```cpp
if (incipe.screenReadValue("done.val") == true)
{
  force_stop = 1;
}
// …and at the end of loop():
incipe.screenWriteValue("done.val", -1);
```
</details>

### 5. When should it complain?

Combine the four problems with `||` (OR). Pick limits that suit your plant; most houseplants like 15–30 °C and at least 40 % humidity.

<details>
<summary>Show one answer</summary>

```cpp
if (temperature < 15 || temperature > 30 || humidity < 40 || lightWord == "dark")
```
</details>

## Spot the bug

Upload the finished sketch and make the plant unhappy: cover the light sensor. The alarm starts, but the screen stops updating and **Done** does nothing. Why?

<details>
<summary>Show the answer</summary>

`while (force_stop == 0)` never ends: nothing inside it changes `force_stop`, so `loop()` never runs again and the button is never read. Use `if` instead of `while`, so the sketch checks once per loop and keeps reading the sensors and the button. Clear `force_stop` when the plant is happy again, so the next problem sounds the alarm.

```cpp
bool problem = temperature < 15 || temperature > 30 || humidity < 40 || lightWord == "dark";
if (problem && force_stop == 0)
{
  incipe.PlaySound();
}
if (!problem)
{
  force_stop = 0;   // all good again: arm the alarm for next time
}
```
</details>

## Test it

| Do this | Expect |
| --- | --- |
| Leave it on a desk | Three live readings, no alarm |
| Cover the light sensor | **dark** on screen, alarm sounds |
| Press **Done** | Alarm stops; readings keep updating |
| Uncover the sensor, cover it again | Alarm sounds again |
| Hold the temperature sensor | Temperature rises on screen |

## Make it better

- Show *why* it is complaining: `incipe.onscreen("why1", "too dry")`.
- Hide an image of a sad plant until there is a problem: `incipe.vis("sad", 1)`.
- Dim the screen at night: `incipe.controlBrightness(incipe.getLightIntensity())`.

## You can now

- Read several sensors and turn raw numbers into words.
- Show values on the IA Kit screen and read a screen button.
- Spot a loop that never ends, and fix it.

**Next:** the plant is looked after. The next annoyance in the room is a drawer full of remote controls.

---
title: Programming sensors
lesson: Lesson 3
type: slides
summary: Build a mini calculator and a grade classifier, then read every sensor on the kit, clean its data with if-else, and count button presses correctly.
source: raw/LMS/Taster Workshop/Lesson 3 Sensors.pptx
pdf: raw/LMS/Taster Workshop/Lesson 3 Sensors.pdf
---
## Lesson overview

**Input, decisions, then real sensor data.**

1. Quick review of Lesson 2
2. Example: mini calculator
3. Classwork: larger number & grades
4. Sensors: reading & cleaning data
5. Counting button presses

## Example — mini calculator

Three questions before you code:

1. How do you ask the user for two numbers, and where do you store them?
2. How do you add them, and where does the result go?
3. How do you show the answer?

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("Please type your first number.");
  while (Serial.available() == 0) {}
  int a = Serial.parseInt();
  Serial.println(a);

  Serial.println("Please type your second number.");
  while (Serial.available() == 0) {}
  int b = Serial.parseInt();
  Serial.println(b);

  int sum = a + b;                 // process
  Serial.print("The answer is:");  // output
  Serial.println(sum);
}
```

## Classwork

### 1 · Which number is larger?

```cpp
if (a > b) {
  Serial.print(a);
  Serial.println(" is the larger number");
} else {
  Serial.print(b);
  Serial.println(" is the larger number");
}
```

*Think about it:* what prints when both numbers are the same?

### 2 · Turn a score into a grade

| Grade | Score |
| --- | --- |
| A | 85 – 100 |
| B | 75 – 84 |
| C | 60 – 74 |
| D | Below 60 |

```cpp
if (score >= 85 && score <= 100) {
  Serial.println("Your grade is A");
} else if (score >= 75 && score <= 84) {
  Serial.println("Your grade is B");
} else if (score >= 60 && score <= 74) {
  Serial.println("Your grade is C");
} else if (score < 60) {
  Serial.println("Your grade is D");
} else {
  Serial.println("The full mark should be 100, please enter again.");
}
```

Anything above 100 falls through to `else`.

## Sensors

A sensor detects and measures changes in the environment and converts them into electrical signals — to provide information, control outputs, or trigger an action.

| Sensor | Function | Returns |
| --- | --- | --- |
| Ultrasonic | `incipe.getDistance()` | Distance in cm |
| Temperature | `incipe.getTemperature()` | °C |
| Humidity | `incipe.getHumidity()` | Relative humidity |
| Light | `incipe.getLightIntensity()` | Raw intensity — needs cleaning |
| Air quality | `incipe.getPPM()` | ppm — needs cleaning |
| Alcohol | `incipe.getAlcoholPPM()` | ppm — needs cleaning |
| CO gas | `incipe.getCOPPM()` | ppm — needs cleaning |
| Flame | `incipe.getFlameIntensity()` | Resistance — drops when there is fire |
| Button | `incipe.getButtonResponse()` | `1` pressed, `0` not |

## Data cleaning

Fixing or removing incorrect or incomplete raw data — here, interpreting a raw reading so it means something. *What does an air quality of 1000 mean? No one knows. "Good" is clear.*

```text
if AQvalue < xxxx                  print Good
else if AQvalue > xxxx and < xxxx  print Moderate
else                               print Poor
```

Students choose the `xxxx` boundaries. Some readings, like temperature, can be shown as they are.

## Counting button presses

`loop()` runs many times while you hold the button, so a naive counter keeps climbing. Remember the press, and count on release:

```cpp
int a = 0;
bool detect = false;            // false at the beginning

void loop() {
  if (incipe.getButtonResponse() == 1) {        // pressed
    detect = true;
  }
  if (incipe.getButtonResponse() == 0 && detect == true) {  // released
    a = a + 1;
    Serial.println(a);
    detect = false;
  }
}
```

## Checkpoints

<details>
<summary>At 30°C, what is shown at "temp1"?</summary>

```cpp
float temp = incipe.getTemperature();
if (temp > 30)      { incipe.onscreen("temp1", "hot"); }
else if (temp < 10) { incipe.onscreen("temp1", "cold"); }
else                { incipe.onscreen("temp1", temp); }
```

**30.** 30 is not larger than 30 and not smaller than 10, so `else` shows the value itself.
</details>

<details>
<summary>The light reading jumps from 100 to 1000. What shows at "light1"?</summary>

**bright** — 1000 ≥ 700 makes the first condition true.
</details>

<details>
<summary>Which sensor haven't we introduced yet?</summary>

**The sound sensor** — it comes next.
</details>

## Preview — the sound sensor

`incipe.getSoundIntensity()` samples sound for a short time, stores the counts and averages them into Loud, Normal or Quiet. It needs four new ideas:

| Idea | Looks like |
| --- | --- |
| Timer | `PreviousTime = millis();` |
| While loop | `while (millis() - PreviousTime < SAMPLE_TIME) { … }` |
| Array | `float database[100];` |
| For loop | `for (int i = 1; i < 100; i++) { … }` |

## Recap

1. Wait, read, store: `while(Serial.available()==0){}` then `Serial.parseInt()`.
2. `if`, `else if` and `else` with `&&` turn a number into a decision, like a grade.
3. Sensor readings are just numbers: the same if-else turns them into labels.

---
title: Air quality sensor
kind: sensor
order: 10
model: aq
reads: Air quality in ppm
keywords: aq mq135 mq-135 gas ppm pollution smoke co2 air
summary: An MQ-135 gas sensor. incipe.getPPM() returns the air-quality reading in ppm, or -1 until a sensor is detected.
---
## One line of code

```cpp
float ppm = incipe.getPPM();
```

## What you get

| Item | Detail |
| --- | --- |
| Value | The air-quality reading in **ppm** (parts per million) |
| Not detected | `-1` |

A raw ppm number means little on its own — *is 1000 good or bad?* Clean it into a label with `if` / `else if`, choosing your own boundaries:

```cpp
if (ppm < 400)       { Serial.println("Good"); }
else if (ppm < 1000) { Serial.println("Moderate"); }
else                 { Serial.println("Poor"); }
```

The boundaries above are an example — test your sensor in clean and stuffy air and pick your own.

---
title: Light sensor
kind: sensor
order: 12
model: light
reads: Brightness from 0 (dark) to 1023 (bright)
keywords: gl5528 ldr photoresistor light brightness lux intensity
summary: A GL5528 light-dependent resistor. incipe.getLightIntensity() returns 0 (darker) to 1023 (brighter).
---
## One line of code

```cpp
float light = incipe.getLightIntensity();
```

## What you get

| Item | Detail |
| --- | --- |
| Value | A `float` from **0** (dark) to **1023** (bright) |
| Not detected | `-1` |
| Read it every | 20–500 ms — light changes quickly |

Cover the sensor and the number falls; shine a torch on it and it rises. For a percentage: `light / 1023.0 * 100`.

---
title: Soil moisture sensor
kind: sensor
order: 16
reads: Raw soil moisture reading
keywords: soil moisture plant garden water wet dry
summary: A soil moisture probe for the Smart Garden. incipe.getSoilMoisture() returns a raw value — find the wet and dry ends by experiment.
---
## One line of code

```cpp
float moisture = incipe.getSoilMoisture();
```

## What you get

| Item | Detail |
| --- | --- |
| Value | A `float`, a **raw** reading — no fixed unit |
| Not detected | `-1` |
| Read it every | 500 ms — soil changes slowly |

Don't assume "high = wet". Calibrate your own sensor: hold the probe in the air and note the reading (dry), put it in a cup of water and note it again (wet). Now you know which way your sensor goes.

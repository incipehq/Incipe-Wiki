---
title: Temperature & humidity sensor
kind: sensor
order: 11
model: temp
reads: Temperature in °C and relative humidity 0–100 %
keywords: dht11 dht-11 temperature humidity weather climate thermometer celsius
summary: A DHT11. incipe.getTemperature() returns degrees Celsius and incipe.getHumidity() returns percent humidity, 0 to 100.
---
## One line of code

One line for each value:

```cpp
float temperature = incipe.getTemperature();
float humidity = incipe.getHumidity();
```

## What you get

| | `incipe.getTemperature()` | `incipe.getHumidity()` |
| --- | --- | --- |
| Value | A `float` in degrees **Celsius (°C)** | A `float`, **% relative humidity**, 0–100 |
| Not detected | `-1` | `-1` |
| Read it every | 2000 ms | 2000 ms |

The DHT11 is a slow sensor: reading it more often than every 1–2 seconds does not give fresher data.

---
title: Ultrasonic distance sensor
kind: sensor
order: 13
model: ultrasonic
reads: Distance in cm
keywords: hc-sr04 hcsr04 ultrasonic distance range sonar obstacle cm
summary: An HC-SR04. incipe.getDistance() returns the distance to the nearest object, printed in cm.
---
## One line of code

```cpp
float distance = incipe.getDistance();
```

## What you get

| Item | Detail |
| --- | --- |
| Value | The distance to the nearest object in front of the sensor, in **cm** |

The sensor sends out a sound pulse you cannot hear and times its echo, so it works best on flat, solid objects facing it.

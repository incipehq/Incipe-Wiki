---
title: Flame sensor
kind: sensor
order: 17
reads: Flame (infrared) intensity
keywords: flame fire mh1 infrared ir flame detector
summary: An MH1 flame sensor. incipe.getFlameIntensity() returns the flame reading, or -1 until a sensor is detected.
---
## One line of code

```cpp
float flame = incipe.getFlameIntensity();
```

## What you get

| Item | Detail |
| --- | --- |
| Value | The flame (infrared) reading — it **drops** when there is fire nearby |
| Not detected | `-1` |

Watch the number with and without a flame (a lighter at a safe distance, with a teacher) and choose the value below which you call it "fire".

---
title: Button
kind: module
order: 30
model: button
reads: Button state
keywords: button push press switch click input
summary: A push button. incipe.getButtonResponse() returns the button reading, or -1 until one is detected.
---
## One line of code

```cpp
float pressed = incipe.getButtonResponse();
```

## What you get

| Button | You get |
| --- | --- |
| Pressed | `1` |
| Not pressed | `0` |
| Not detected | `-1` |

The button needs no data cleaning — it already answers yes or no. To count presses, count when the button is *released*, or one long press counts many times. [Programming sensors](/academy/taster-workshop/03-sensors) shows how.

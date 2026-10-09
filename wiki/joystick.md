---
title: Joystick
kind: module
order: 31
model: joystick
reads: Raw X and Y position and the stick button
keywords: joystick thumbstick analog stick game x y axis controller
summary: A two-axis joystick with a press button. Read X, Y and the button separately; each returns a raw value or -1.
---
## One line of code

One line for each value:

```cpp
float x = incipe.getJoystickXMovement();
float y = incipe.getJoystickYMovement();
float button = incipe.getJoystickButtonResponse();
```

## What you get

| Call | Value | Not detected |
| --- | --- | --- |
| `incipe.getJoystickXMovement()` | A `float`, raw left–right position | `-1` |
| `incipe.getJoystickYMovement()` | A `float`, raw up–down position | `-1` |
| `incipe.getJoystickButtonResponse()` | A `float`, raw stick-button reading | `-1` |

The range, the centre value and which button value means "pressed" are not fixed — find them by plotting all three in the Serial Plotter and moving the stick.

> Plug the joystick into one INCIPE connection and leave the **next** connection free — the joystick uses it for Y and the button.

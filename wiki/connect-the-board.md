---
title: Connect the board
kind: guide
order: 2
reads: USB connection, the Board menu and the serial monitor
keywords: connect usb usb-c cable board menu port serial monitor upload verify flash workspace plotter baud
summary: Plug the INCIPE Board into your Mac over USB-C, pick it in the INCIPE Workspace Board menu, upload your first sketch and watch its output in the serial monitor.
---
## What you need

- An INCIPE Board and a USB-C cable.
- A Mac with the **INCIPE Workspace** desktop app, signed in.
- Any modules you want to use. They are plug-and-play: snap them onto the board and the runtime detects them — no pins to choose and no libraries to install.

## 1. Plug in the board

Connect the board to the Mac with the USB-C cable. The board's runtime starts on power-up and begins looking for modules straight away.

## 2. Select it in the Board menu

Open the **Board menu** in the Workspace top bar. Your board appears under the USB connections; select it. The menu shows the board's connection and status from then on.

> If the board does not appear, try another cable or port — some USB-C cables carry power only.

## 3. Verify and upload

| Control | What it does |
| --- | --- |
| **Verify** | Compiles your code and reports the first mistake it finds |
| **Upload** | Compiles and sends the code to the selected board |

Compilation happens on Incipe's build service, which also adds the INCIPE runtime to your sketch — your code only calls the `incipe.*` helpers. See [INCIPE Board](/wiki/board) for what the runtime takes care of.

## 4. Watch the output

Click the **terminal icon** to open the Console:

- **Serial** shows what your code prints with `Serial.println()`.
- **Plotter** draws numeric output as live graphs — useful for sensor readings.

Set the baud rate to match `Serial.begin()` in your code, then press **Start**.

## 5. Read a sensor

Plug in a module — the light sensor is a good first one — and print its reading from a user thread:

```cpp
void lightThread(void *parameter) {
  for (;;) {
    const float light = incipe.getLightIntensity();
    if (light >= 0) {            // -1 means "not detected yet"
      Serial.println(light);
    }
    vTaskDelay(pdMS_TO_TICKS(100));
  }
}
```

Start it with `xTaskCreatePinnedToCore(...)` — [User threads](/wiki/user-threads) has the full pattern — and watch the numbers change as you cover the sensor.

## Next

- [Set up wireless](/wiki/wireless-setup) to upload without the cable.
- Browse the sensors and modules in the [Wiki](/wiki) — each page lists the exact functions and what they return.

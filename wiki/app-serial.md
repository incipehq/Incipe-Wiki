---
title: Watch it run
kind: app
step: 7
order: 207
reads: The serial monitor (Serial tab) and the Plotter in the Console
keywords: serial monitor console serial tab start stop baud 115200 line ending time auto hex clear send to board plotter graph chart live data
summary: Open the serial monitor to read what the board prints, and the Plotter to graph it live. This is how you check a sketch is doing what you asked.
---
*The board is on and running. It is printing a reading every two seconds. Time to listen.*

## Read it in the serial monitor

1. Open **Console** (top bar, far right) and choose the **Serial** tab.
2. Check the baud rate reads **115200**. It must match the speed in the sketch, or the text comes out garbled.
3. Click **START**.

```text
temp:24.1,hum:52
temp:24.2,hum:52
temp:24.2,hum:53
```

Hold the module between your fingers: the temperature climbs. Breathe on it: humidity jumps.

| Control | Does |
| --- | --- |
| **START** / **STOP** | Open or close the connection to the board |
| Baud (**115200**) | Speed. Match the sketch's `Serial.begin(…)` |
| **NL** | What is added to lines you send: none, NL, CR or NL+CR |
| **TIME** | Show when each line arrived |
| **AUTO** | Keep scrolling to the newest line |
| **HEX** | Show raw bytes |
| **CLEAR** | Empty the log |
| **Send to board…** | Type a line and press Enter to send it to the board |

**Select the board's port in the header port menu to start the Serial Monitor** means no port is chosen. Pick one in **Board Connection**.

## See it as a graph

Choose the **Plotter** tab. Each `name:value` pair becomes a line: one for `temp`, one for `hum`.

- Click a series chip to hide or show its line.
- **PAUSE** freezes the graph; **CLEAR** starts it again.

The Plotter reads `name:value` pairs (`temp:24.1,hum:52`), `name=value`, or plain numbers separated by commas or spaces. That is why the prompt in step 4 asked for that format.

## You can now

- Read what the board prints, and send it a line.
- Graph readings live and spot a change at a glance.

**Next:** the monitor shows numbers but does not warn anyone. Teach it when to speak up, using Plan mode.

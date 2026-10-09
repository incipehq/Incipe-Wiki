---
title: Ask for your first sketch
kind: app
step: 4
order: 204
reads: Write a prompt, read the reply and the working log, and handle edit cards
keywords: prompt chat composer send ask ai agent reply working log edit applied review diff accept reject sketch code firmware first program
summary: Describe what the board should do, send it, and read what Incipe did: the working log, the code it wrote and the edit card that lists every changed file.
---
*The room needs numbers. Your first job for Incipe: a sketch that reads the temperature and humidity module and prints both every two seconds.*

## Write the prompt

Good prompts say what to read, how often, and what to do with it. Type this into the composer:

> Read the temperature and humidity module every 2 seconds and print each reading to the serial monitor as `temp:<°C>,hum:<%>`.

The `temp:…,hum:…` format is on purpose: in step 7 the Plotter graphs it with no extra work.

Press **Enter** to send (**Shift+Enter** adds a new line).

## Read the reply

While Incipe works, its name shows **Working**.

1. **Working log · N steps** lists what it did: files read and edited, builds, commands. Open it to follow along; close it when you only want the answer.
2. The answer explains the sketch. Code blocks have a **Copy** button.
3. An **edit card** lists every file it changed, with lines added and removed.

| Edit card says | What to do |
| --- | --- |
| **Edit applied · applied** | Nothing; the change is in your files. **View diff** shows it |
| **Proposed edit · awaiting acceptance** | **Review diff**, then **Accept** or **Reject** |

The sketch uses two calls from the [Temperature & humidity sensor](/wiki/temperature-humidity) page: `incipe.getTemperature()` and `incipe.getHumidity()`.

If Incipe asks a question, a card offers choices; one is marked **Recommended**. If it shows **Flash permission required**, choose **Cancel** for now. You will flash it yourself in step 6.

## Change your mind

- **Reuse this prompt** (under your message) copies it back into the composer.
- Right-click your message › **Edit and rewind to here** to rewrite it and run again from that point.
- **Stop** (■, where Send was) ends a reply early.

## You can now

- Ask Incipe for code and send it.
- Read the working log and check exactly which files changed.

**Next:** the code is written but it is still on your Mac. Connect the board.

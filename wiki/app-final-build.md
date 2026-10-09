---
title: Build the classroom climate monitor
kind: app
step: 15
order: 215
reads: The final build, end to end: plan, review, verify, flash over Wi-Fi, test, document
keywords: final project build classroom climate monitor temperature humidity comfort warning capstone end to end plan verify ota plotter readme
summary: Use everything from the guide to finish the classroom climate monitor: a comfort range for temperature and humidity, clear warnings, wireless updates and a manual.
---
*Fourteen steps ago Room 204 was just stuffy. Now you have every tool you need. Build the finished monitor, start to finish, in one chat.*

## What you are building

- Reads temperature and humidity every 2 seconds.
- Prints `temp:<°C>,hum:<%>` so the Plotter graphs both.
- Knows the comfortable range, **20–26 °C** and **40–60 %** humidity, and says clearly what is wrong and what to do.
- Takes updates over Wi-Fi from your desk.
- Comes with a one-page manual.

## 1. Plan it

Start a new chat in `climate-reader` ([step 3](/wiki/app-projects)). Set the mode to **Plan** ([step 8](/wiki/app-steer)) and send:

> Turn climate-reader into the finished classroom climate monitor.
> - Read temperature and humidity every 2 seconds and print `temp:<°C>,hum:<%>` on every reading.
> - Comfortable is 20–26 °C and 40–60 % humidity. When a reading leaves that range, print one line `WARN: <what is wrong>, <what to do>` (for example `WARN: too warm, open a window`). Print `OK: comfortable again` when it returns.
> - Do not repeat a warning until the reading has been comfortable again.
> - Put the four limits as named constants at the top of the sketch.

Read the plan. **Revise** until it matches, then **Approve**.

## 2. Review it

Open **Code editor** › **Show diff** ([step 9](/wiki/app-editor)). Check the four constants are at the top and easy to find.

## 3. Build and upload

1. **Verify**. If an **ERR** line appears, ask Incipe to fix it ([step 6](/wiki/app-verify-flash)).
2. Select the board under **Wireless Connection** and click the blue **OTA update** ([step 10](/wiki/app-wireless)). On a cable instead? Use **Flash**.

## 4. Test it

Open **Console** › **Serial** › **START**, then the **Plotter** ([step 7](/wiki/app-serial)).

| Do this | Expect |
| --- | --- |
| Leave it alone for a minute | `temp:…,hum:…` lines, two flat lines on the graph |
| Hold the module in your hand | Temperature climbs; above 26 °C, `WARN: too warm, open a window` once |
| Let go | `OK: comfortable again` once it cools |
| Breathe on the module | Humidity spikes; above 60 %, a humidity warning |

No warning? Check the limits in the code. Repeating warnings? Tell Incipe what you saw and ask it to fix the repeat rule.

## 5. Document it

Ask for the manual and keep it in **Artifacts** ([step 11](/wiki/app-artifacts)):

> Update the README: the comfortable range, every message the monitor prints and what to do about it, and how to change the four limits.

**Download** it and print it for the shelf.

## Done

The monitor sits on the shelf on a USB charger. It graphs the room, warns before heads drop, and you update it without leaving your desk.

## You can now

- Take a hardware idea from a sentence to a working, documented device with INCIPE Workspace.

**Where next:** add a sensor. The [air quality sensor](/wiki/air-quality) tells you when the air is stale, not just warm. Every module's functions are in the [Wiki](/wiki). For courses, open the [Academy](/academy).

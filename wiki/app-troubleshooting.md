---
title: When something goes wrong
kind: app
step: 14
order: 214
reads: Common problems and fixes, and the keyboard shortcuts
keywords: troubleshooting problems fix error not working greyed out no port board not found compile failed garbled serial baud plotter empty offline rate limited deleted chat folder not found shortcuts keyboard
summary: The fixes for the problems students hit most, from a greyed-out Flash button to garbled serial text, plus every keyboard shortcut.
---
*Before you build the final version, know the fixes. Most problems are a cable, a port or a setting.*

## Board and upload

| You see | Fix |
| --- | --- |
| **Verify** and **Flash** are greyed out | Sign in: bottom of the project pane › **Sign in** |
| **Pick a CDC port to flash.** | **Board Connection** › choose your port under **USB Serial** |
| **No board connected** | Check the cable and the Mac's port, then **RESCAN PORTS**. Try another cable: some only charge |
| **Board disconnected.** | Plug it back in, or **Reconnect** |
| An **ERR** line in Compile | Ask Incipe: *"Verify failed. Fix the compile error."* |
| **RAM** or **FLASH** meter is red | The program barely fits. Ask Incipe to make it smaller |
| **Offline. OTA needs a network.** | Connect your Mac to the network |
| Wireless board greyed out | The board is off or on another network. See [Set up wireless](/wiki/wireless-setup) |

## Serial monitor and Plotter

| You see | Fix |
| --- | --- |
| **Select the board's port in the header port menu…** | Choose a port in **Board Connection** |
| **No serial data** | Click **START** |
| Garbled characters | Set the baud rate to the sketch's `Serial.begin(…)` speed |
| **Nothing to plot yet** | Print `name:value` pairs, for example `temp:24.1,hum:52` |

## Chat and projects

| You see | Fix |
| --- | --- |
| *… can't read images* under an attachment | Click the **Switch to …** button beside it |
| A model says **Rate limited** | Pick another model |
| The AI forgets earlier details | The chat is full: check **Session usage** and start a new chat |
| A chat disappeared | Project **⋯** › **Show deleted chats** › click it |
| **Folder not found** | You moved the folder. **Relocate folder** and pick its new place |

Still stuck? **?** (Help) › **Contact us**.

## Keyboard shortcuts

| Keys | Where | Does |
| --- | --- | --- |
| ⌘N / ⌘O | Landing page | New project / Open project |
| Enter | Composer | Send |
| Shift+Enter | Composer | New line |
| / | Composer | Modes and skills |
| @ | Composer | Add to context |
| ⌘S | Code editor | Save |
| Enter | Serial **Send to board…** | Send the line |
| ← / → | A focused panel edge | Resize |
| Esc | Menus, dialogs, search | Close or clear |

## You can now

- Fix the common board, serial and chat problems yourself.
- Work faster with the shortcuts.

**Next:** put it all together and build the finished monitor.

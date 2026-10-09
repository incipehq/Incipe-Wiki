---
title: Verify and flash
kind: app
step: 6
order: 206
reads: Compile with Verify, read the compile console, then upload with Flash
keywords: verify compile build flash upload green arrow compile console ram flash meter err ok error cancel firmware release
summary: Verify compiles the sketch and reports problems; Flash compiles it and copies it onto the board over USB. Read the result in the Compile console.
---
*Code on your Mac does nothing for Room 204. Check it builds, then put it on the board.*

## The two buttons

```screen
image: /app-guide/top-bar.jpg
alt: The right end of the INCIPE Workspace top bar
---
13.1, 50 | Verify | Compiles only. Use it to check the code builds.
22.8, 50 | Flash | Compiles and copies the program onto the board over USB.
42.8, 50 | Board | Must show your port before Flash works.
93.8, 50 | Console | The Compile tab shows each build's result.
```

## Verify

1. Click **Verify** (the magnifier). The Console opens on **Compile**.
2. While it builds, the button becomes **Cancel compile · NN%**. Click it to stop.
3. A good build ends with `Compile OK · RAM N% · Flash N%`, and the button shows **Verified**.

```screen
image: /app-guide/console-compile.jpg
alt: The Console's Compile tab listing past builds
caption: Your app may look slightly different.
---
6.6, 6.1 | Compile | Build results, newest last.
17.2, 6.1 | Serial | The serial monitor, step 7.
26.9, 6.1 | Plotter | Live graphs, step 7.
4.5, 10.3 | ERR | A failed build. The lines after it say why.
29.7, 17.2 | Compile OK | A good build, with how much of the board's memory it uses.
```

The **RAM** and **FLASH** meters turn amber above 60 % and red above 85 %. Red means the program barely fits.

**When it fails:** ask Incipe in the chat, *"Verify failed. Fix the compile error."* It reads the build output, edits the code and verifies again.

## Flash

1. Click **Flash** (the green arrow). It compiles, then uploads: **Cancel flash · NN%**.
2. When it shows **Flash complete**, the board restarts and runs your sketch.

Greyed out? Hover it. **Pick a CDC port to flash.** means no port is selected: go back to [Connect your board](/wiki/app-connect). If you are signed out, both buttons stay off.

If the folder holds more than one sketch, the app asks **Flash which project?** Pick the one to upload.

When Incipe releases new board firmware, a **New firmware ready** notice appears. Nothing to do: your next Verify or Flash uses it.

## You can now

- Check that code builds, and read why it did not.
- Put a program on the board over USB.

**Next:** the board is running, but you cannot see what it is saying yet. Open the serial monitor.

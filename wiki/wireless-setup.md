---
title: Set up wireless
kind: guide
order: 3
reads: Wi-Fi and wireless (OTA) uploads over the local network
keywords: wireless wifi wi-fi ota over the air bluetooth setup network password bonjour upload without cable
summary: Give the board your Wi-Fi network once over Bluetooth, then upload over the air from INCIPE Workspace — no cable needed. Every project on the board shares that one connection.
---
## How it works

Wi-Fi is a setting of the **board**, not of a project — like a phone that has one Wi-Fi setting every app uses. You set the network once in Workspace; the board stores it and joins it on every boot. After that, the Board menu can upload to the board over the network (OTA) using the same Verify / Upload controls as USB.

## Before you start

- A personal, password-protected Wi-Fi network that supports **2.4 GHz**.
- The Mac on the **same network** as the board.
- macOS **Bluetooth** and **Local Network** access allowed for INCIPE Workspace.

> Captive-portal (hotel / café sign-in pages), enterprise, open and client-isolated networks are not supported. Setup sends the network details over Bluetooth, so do it somewhere you trust.

## Set it up

Wireless setup has two screens:

1. **Find one board.** Workspace checks Bluetooth and Wi-Fi and finds the board nearby. Keep only **one** board powered during setup — boards have no visible name, so Workspace will not guess between two.
2. **Connect it to Wi-Fi.** Enter the network name and password. Workspace sends them to the board and confirms when it is ready.

Workspace does not keep your Wi-Fi password; it is used only for the setup attempt.

## Upload over the air

The board now appears in the Board menu even while it is offline. When it is found on the network, select it and use **Upload** as usual — the build is sent wirelessly. If the board cannot be found (wrong network, powered off) and a board is connected over USB, Workspace switches to USB on its own.

## New network or new place

You do not change code to change networks. Power the board near the Mac: if it cannot reach its saved network it switches back to Bluetooth setup after about **20 seconds**. Run the same two-screen setup with the new network.

## Rules for your code

Because the runtime owns the connection, your sketches must not manage Wi-Fi themselves:

- No Wi-Fi names, passwords or `WiFi.begin(...)` in a project.
- To use the network, wait for `WiFi.status() == WL_CONNECTED`, then use `WiFi.localIP()`.
- Never turn the radio off or set up OTA yourself — doing so can break wireless uploads until the board is re-flashed over USB.

The full list is on the [INCIPE Board](/wiki/board) page under *Board-wide Wi-Fi and Workspace OTA*.

## If something goes wrong

USB is the recovery route. If an uploaded sketch removed the runtime, the board will not boot, or wireless uploads stop working, connect it with the cable and upload a corrected sketch — see [Connect the board](/wiki/connect-the-board).

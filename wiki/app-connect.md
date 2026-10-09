---
title: Connect your board
kind: app
step: 5
order: 205
reads: USB connection, Board Connection, choosing the port and seeing modules on the 3D board
keywords: connect board usb usb-c cable port board connection rescan ports usb serial module socket l1 sensor connected offline syncing 3d
summary: Plug the INCIPE Board in over USB-C, pick its port in Board Connection, snap the temperature and humidity module onto socket L1 and watch the app see it.
---
*The sketch is ready. Now the hardware: the board, a USB-C cable and the temperature and humidity module.*

## Plug in

1. Snap the **Temperature & humidity** module onto socket **L1**.
2. Connect the board to your Mac with a USB-C cable.

The **Board** button in the top bar changes from **BOARD · OFFLINE** to **BOARD · SYNCING**, then **BOARD · USB**. The first time, a short animation shows **Board connected · USB**; click to skip it.

## Choose the port

Flashing goes to the port you choose. Click **Board** to open **Board Connection**.

```screen
image: /app-guide/panel-board.jpg
alt: The Board Connection panel with the port list on the left and the 3D board on the right
caption: Shown with no board plugged in. Your app may look slightly different.
---
11.8, 7.3 | RESCAN PORTS | Look for boards again after you plug one in.
8.3, 12 | USB Serial | Boards on a cable. Click yours to select it.
12.6, 15.6 | Wireless Connection | Boards on your Wi-Fi. Step 10 sets this up.
13.1, 31.8 | ADD ANOTHER BOARD | Starts wireless setup.
7.5, 37.3 | Wireless | The selected board's Wi-Fi status.
69.4, 52.8 | 3D board | Drag to tilt, scroll to zoom. Modules appear in their sockets.
69.4, 91.7 | Cable | Drawn unplugged while the board is offline.
```

1. Under **USB Serial**, click your board's port (it starts `/dev/cu.usbmodem`).
2. On the 3D board, the module shows on its socket as **L1 · Temp**.

Plugging a module in while the board is connected plays **Sensor connected · L1 · Temp**. Sockets run **L1–L4** down the left and **R1–R4** down the right.

> No port listed? Click **RESCAN PORTS**, then try another cable. Some USB-C cables only carry power. More on the hardware side in [Connect the board](/wiki/connect-the-board).

If the cable comes out, a **Board disconnected.** notice appears. Plug it back in, or press **Reconnect**.

## You can now

- Connect the board and select its port.
- Check which module sits in which socket.

**Next:** build the sketch and send it to the board.

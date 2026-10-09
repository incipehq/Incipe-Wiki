---
title: Go wireless
kind: app
step: 10
order: 210
reads: Wireless (OTA) setup, choosing a wireless board and uploading over Wi-Fi
keywords: wireless wifi wi-fi ota over the air set up ota add another board bluetooth network name password wireless connection blue arrow ota update hostname forget network
summary: Give the board your Wi-Fi once, then upload over the air. The Flash arrow turns blue and the cable stays in the drawer.
---
*The monitor works. It just should not live on your desk. Teach the board your Wi-Fi once, put it on the shelf on a USB charger, and keep uploading from where you sit.*

## Set up once

Setup runs over Bluetooth. Keep the board powered and next to your Mac, with your Mac's Bluetooth and Wi-Fi on.

1. Open **Board Connection** (the **Board** button) and click **SET UP OTA**.
2. **Set up wireless updates.** Check **BLUETOOTH** and **WI-FI** both read **On**, then **FIND MY BOARD**.
3. **Connect your board to Wi-Fi.** Enter the **NETWORK NAME** and **PASSWORD**, then **CONNECT BOARD**.
4. **Your board is ready.** shows its **HOSTNAME** and **IP**. Click **DONE**.

The network must be personal, password-protected and support 2.4 GHz. Requirements and fixes are on [Set up wireless](/wiki/wireless-setup).

## Upload over the air

1. Move the board to its shelf and power it from any USB charger.
2. In **Board Connection**, under **Wireless Connection**, click the board.
3. The top bar's **Board** shows **BOARD · OTA** and the Flash arrow turns blue: **OTA update**.
4. Click it. It builds and uploads over Wi-Fi: **Cancel wireless update · NN%**, then **OTA complete**.

**Offline. OTA needs a network.** means your Mac has no network. A greyed-out board, **Board is not currently advertising on this network**, is off or on another network.

## Check or reset it

With the board on USB, the **Wireless** block in Board Connection shows its status:

- **Set up and on your network.** with its **HOSTNAME**.
- **Check stored credentials** compares what the board runs with what it saved.
- **Forget this network** clears its Wi-Fi so you can set it up again (**FORGET NETWORK**).

## You can now

- Connect the board to Wi-Fi once.
- Upload over the air, with no cable.

**Next:** the next class to use the monitor will ask how it works. Have Incipe write the manual.

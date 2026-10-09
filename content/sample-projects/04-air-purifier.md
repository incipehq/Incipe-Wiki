---
title: Air purifier
lesson: Project 4
type: project
summary: Two boards over Wi-Fi. A sensor station rates the air and carbon monoxide on its screen and tells a second board, wired to a purifier, when to switch on and off.
---
*The room is smarter, but every build so far does everything on one board. A real smart home splits the work: a sensor where the air is worst, a switch where the purifier is plugged in. Your last build makes two boards talk.*

> **Hardware:** two boards on the same Wi-Fi network. The **host** is an **IA Kit** with its screen, the air quality sensor and the CO gas sensor. The **guest** drives the purifier's switch from **pin 4**. Sensor functions are on the [IA SensorSync API](https://site.incipeacademy.com/doc/get-sensor-data). Original starter: [Air Purifier](https://site.incipeacademy.com/doc/air-purifier).

> **Safety:** switch a low-voltage device, such as a USB fan, from pin 4 through a relay module. Do not wire mains (wall-socket) power. Never make carbon monoxide to test the sensor; lower the limit in code instead.

## What you will build

- The host shows the air as **good**, **moderate** or **poor**, and carbon monoxide as **low** or **high**.
- Bad air, or the screen's **On** button, sends `1` to the guest; good air, or **Off**, sends `2`.
- The guest switches the purifier on for `1` and off for `2`.

## How it works

1. **The host starts a server.** It joins Wi-Fi and listens on port 8090: a numbered door other boards can knock on.
2. **The guest connects** to the host's IP address and port.
3. **The host decides** from its sensors and buttons, then sends one character.
4. **The guest acts** on that character with pin 4.

The host's IP address is printed in its serial monitor (`IP: …`) when it joins Wi-Fi. The guest needs it.

## Host starter code

Replace the Wi-Fi name and password with your network's.

```cpp
// Fill in the place with /* */

/* include Incipe library*/
#define SSID "YOUR_WIFI_NAME"
#define PASSWORD "YOUR_WIFI_PASSWORD"

void setup(void)
{
  Serial.begin(9600);
  incipe.init();
  if (incipe.wifi.joinAP(SSID, PASSWORD))//join wifi
  {
    Serial.print("Join AP success");
    Serial.print("IP: ");
    Serial.println(incipe.wifi.getLocalIP().c_str());
  }
  else
  {
    Serial.print("Join AP failure");
  }
  incipe.wifi.enableMUX();
  if (incipe.wifi.startTCPServer(8090))//create a channel for guest
  {
    Serial.print("start tcp server ok");
  }
  else
  {
    Serial.print("start tcp server err");
  }
  incipe.wifi.setTCPServerTimeout(10);
}

void loop(void)
{
  /* get air quality from sensor*/
  /* classify "poor", "moderate" and "good" using air quality sensor data*/
  /* print "poor", "moderate" or "good" on IA Kit screen*/
  /* repeat the above steps for CO gas sensor */

  /* create an array to store the message from guest */
  uint8_t mux_id;//create a value to record the guest number

  if(/* air quality is poor OR CO gas level is high OR the button indicate manually on is pressed */)
  {
    char *command = "1";
    incipe.wifi.send(mux_id, (const uint8_t*)command, strlen(command)); //send 1 to air purifier (indicate on)
  }
  else if (/* air quality is good OR CO gas level is low OR the button indicate manually off is pressed */)
  {
    char *command = "2";
    incipe.wifi.send(mux_id, (const uint8_t*)command, strlen(command)); //send 2 to air purifier (indicate off)
  }

  /* receive the message from guest */
  /* print the message */
  incipe.screenWriteValue("xxx.val", -1);
}
```

## Fill in the host's blanks

### 1. Include the library, and wake the sensors

The host reads sensors, so `loop()` should start with `incipe.main();`, as in the [Getting Started](https://site.incipeacademy.com/doc/getting-started) sketch and Project 1.

<details>
<summary>Show the answer</summary>

```cpp
#include "incipe.h"
// …first line inside loop():
incipe.main();
```
</details>

### 2. Rate the air

`incipe.getPPM()` returns a reading where higher means worse air. Print it in fresh air, then next to an open marker pen or hand sanitiser, and choose two limits from what you see.

<details>
<summary>Show one answer</summary>

```cpp
const float AIR_MODERATE = 200;  // your numbers
const float AIR_POOR = 400;

float air = incipe.getPPM();
String airWord;
if (air >= AIR_POOR)          { airWord = "poor"; }
else if (air >= AIR_MODERATE) { airWord = "moderate"; }
else                          { airWord = "good"; }
incipe.onscreen("air1", airWord);
```
</details>

### 3. Rate the carbon monoxide

Same pattern with `incipe.getCOPPM()`, but two words: **low** and **high**. To test, lower `CO_HIGH` below the reading you get in fresh air.

<details>
<summary>Show one answer</summary>

```cpp
const float CO_HIGH = 100;  // your number

float co = incipe.getCOPPM();
String coWord = (co >= CO_HIGH) ? "high" : "low";
incipe.onscreen("co1", coWord);
```
</details>

### 4. Which guest?

The server numbers each guest that connects. With one guest, it is connection `0`.

<details>
<summary>Show the answer</summary>

```cpp
uint8_t mux_id = 0;
```
</details>

### 5. On or off?

Join the sensor words and the two screen buttons with `||`. The first `if` already catches the dangerous cases, so the `else if` only runs when the air is not poor and CO is not high.

<details>
<summary>Show the answer</summary>

```cpp
if (airWord == "poor" || coWord == "high" || incipe.screenReadValue("on.val") == true)
{ /* send "1" */ }
else if (airWord == "good" || coWord == "low" || incipe.screenReadValue("off.val") == true)
{ /* send "2" */ }

// …and at the end of loop(), instead of "xxx.val":
incipe.screenWriteValue("on.val", -1);
incipe.screenWriteValue("off.val", -1);
```
</details>

### 6. Messages from the guest (optional)

The guest in this sample never replies, so you can leave this blank for now. Come back to it in *Make it better*.

## Spot the bug

Watch the host's serial monitor or the guest's: the command is sent hundreds of times a second.

<details>
<summary>Show the answer</summary>

`loop()` sends on every pass, even when nothing changed. Remember the last command and send only when it changes.

```cpp
int lastCommand = 0;   // above setup()

// in loop(), when you decide to switch on:
if (lastCommand != 1)
{
  char *command = "1";
  incipe.wifi.send(mux_id, (const uint8_t*)command, strlen(command));
  lastCommand = 1;
}
// …and the same with 2 for off
```
</details>

## The guest

The original guest sketch stops partway through `loop()`. Here it is as far as it goes:

```cpp
// Fill in the place with /* */

/* include Incipe library*/

#define SSID        "YOUR_WIFI_NAME"
#define PASSWORD    "YOUR_WIFI_PASSWORD"
#define HOST_NAME   /* join the IP of host */
#define HOST_PORT   (8090)

const int controlPin = 4; //used to control on off

void setup(void)
{
  Serial.begin(9600);
  incipe.wifi.setOprToStationSoftAP();
  if (incipe.wifi.joinAP(SSID, PASSWORD))//join wifi
  {
    Serial.print("Join AP success");
    Serial.print("IP: ");
    Serial.println(incipe.wifi.getLocalIP().c_str());
  } else
  {
    Serial.print("Join AP failure");
  }
  incipe.wifi.enableMUX();
  pinMode(controlPin, OUTPUT); //used to control on off
}

void loop(void)
{
  /* create an array to store the message from host */
  static uint8_t mux_id = 0;

  if (incipe.wifi.createTCP(mux_id, HOST_NAME, HOST_PORT))
  //join the TCP created by host
  {
    /* … the original stops here … */
```

To finish it:

1. Include the library and call `incipe.init();` first in `setup()`, as the host does.
2. Set `HOST_NAME` to the host's IP address in quotes, for example `"192.168.1.23"`.
3. Once connected, receive the host's message into the array.
4. If it is `1`, `digitalWrite(controlPin, HIGH);`. If it is `2`, `digitalWrite(controlPin, LOW);`.
5. If the connection fails, wait a second and try again on the next `loop()`.

The host's `setTCPServerTimeout(10)` closes a connection that stays silent for 10 seconds, so the guest should be ready to connect again.

## Test it

| Do this | Expect |
| --- | --- |
| Power the host | `Join AP success`, its IP, `start tcp server ok` |
| Power the guest | It joins Wi-Fi and connects to the host |
| Fresh air | **good** and **low** on screen; the fan is off |
| Marker pen near the sensor | **poor**; the fan switches on |
| Press **Off** on the screen | The fan switches off |

## Make it better

- Have the guest reply `ok` after switching, and show it on the host's screen (blank 6).
- Add a second guest, a desk fan at the other end of the room, and switch both.
- Log the air rating every minute and show the worst hour of the day.

## You can now

- Make two boards talk over Wi-Fi: one server, one client.
- Turn sensor readings into decisions and decisions into commands.
- Keep a network quiet by sending only what changed.

**You have finished the sample projects.** The room now looks after its plant, answers to names, gets you up and cleans its own air. Next, build your own: the [Wiki](/wiki) lists every sensor and module, and [Incipe 101](/academy) turns an idea like these into a full project.

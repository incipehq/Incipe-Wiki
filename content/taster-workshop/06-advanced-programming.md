---
title: Advanced programming
lesson: Lesson 6
type: slides
summary: Keep track of where a program is with a finite-state machine, name its states with an enum, act on them with switch case — then put the board on Wi-Fi and read its signal strength.
source: raw/LMS/Taster Workshop/Lesson 6 Advanced Programming.pptx
pdf: raw/LMS/Taster Workshop/Lesson 6 Advanced Programming.pdf
---
## Lesson overview

**From states in code to the board on Wi-Fi.**

1. Revisit: timer
2. Finite-state machine
3. `enum` & `switch case`
4. Wi-Fi & signal strength

## Revisit: timer

`millis()` is the time in milliseconds since the board started. Saving it marks a moment on the timeline, so you can later ask *how long since then?*

```cpp
long last_tick = millis();   // the moment this line runs
```

## Finite-state machine

A **finite-state machine** is always in exactly **one state**, and moves to another state when something happens — an *event*.

**Traffic light** — three states, one at a time: **RED → GREEN → YELLOW**, then back to RED. It moves to the next state when its time is up.

**Vending machine** — four states:

| From | Event | To |
| --- | --- | --- |
| Idle | Press the insert coin button | Accepting coin |
| Accepting coin | Insert coins | Accepting coin (stays) |
| Accepting coin | Cancel request | Idle |
| Accepting coin | Press the select product button | Product selection |
| Product selection | Cancel request | Idle |
| Product selection | Select product (gives change) | Dispensing |
| Dispensing | Collect product | Idle |

## enum

Numbers can stand for names: Monday → 1 … Sunday → 7, or RED, YELLOW, GREEN for a traffic light. An **enum** gives friendly names to a set of related integer constants, so the code reads like the idea — and takes less debugging.

### Define your own

```cpp
enum TrafficLight {
  RED,          // 0
  YELLOW,       // 1
  GREEN,        // 2
  NUM_OF_STATES // 3 — how many states there are
};
```

Numbers **start at 0** and count up.

### Use it

```cpp
TrafficLight light = RED;
```

The enum's name becomes a **type**, like `int` — and `light` can only hold one of its values.

## switch case

`switch` checks one value and runs the code for the case that matches.

```cpp
switch (light) {
  case RED:
    // turn on the RED light
    break;
  case GREEN:
    // turn on the GREEN light
    break;
  case YELLOW:
    // turn on the YELLOW light
    break;
}
```

| Part | Meaning |
| --- | --- |
| `switch (light)` | Checks the value of `light` |
| `case RED:` | Runs when `light` is `RED` |
| `break;` | Leaves the switch. Without it, the next case runs too |

### All together — a traffic light on the serial monitor

Define the states, declare the variable, then switch on it — here the timer from the start of the lesson moves the light on every 2 seconds.

```cpp
enum TrafficLight { RED, GREEN, YELLOW };
TrafficLight light = RED;
long last_tick = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  if (millis() - last_tick >= 2000) {   // 2 s since the last change?
    last_tick = millis();                // mark this moment
    switch (light) {
      case RED:    light = GREEN;  Serial.println("GREEN");  break;
      case GREEN:  light = YELLOW; Serial.println("YELLOW"); break;
      case YELLOW: light = RED;    Serial.println("RED");    break;
    }
  }
}
```

The serial monitor shows `GREEN`, `YELLOW`, `RED`, `GREEN` … one line every 2 seconds.

## Wi-Fi

| Term | Means |
| --- | --- |
| **SSID** | The network's name |
| **Password** | Its security key |
| **IP address** | The number that identifies a device on the network |
| **Client vs server** | Who asks and who answers: a client (laptop, phone, the board) sends a *request* over the internet; the server sends back a *response* |

### Step by step

| Step | Function | What it does |
| --- | --- | --- |
| 1 | `WiFi.begin()` | Connects to Wi-Fi |
| 2 | `WiFi.status()` | Checks the connection — `WL_CONNECTED` once it is up |
| 3 | `WiFi.localIP()` | If it worked, gives the IP address the board was assigned |

> **On the INCIPE Board, Workspace does step 1 for you.** Wi-Fi is a setting of the board, not of a sketch: you give the board your network once in INCIPE Workspace — see [Set up wireless](/wiki/wireless-setup). So a sketch for the board never contains the network name, the password or `WiFi.begin()`; doing so can break wireless uploads. It only waits for the connection, then uses it.

```cpp
#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  Serial.print("Waiting for WiFi");
  while (WiFi.status() != WL_CONNECTED) {   // step 2: not connected yet?
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected! IP Address: ");
  Serial.println(WiFi.localIP());           // step 3
}

void loop() {
}
```

Set the serial monitor's baud rate to **115200** to match `Serial.begin()`.

## Signal strength

**RSSI** — the received signal strength — is measured in **dBm**, a negative number. Closer to 0 means a stronger signal.

| Signal | RSSI (dBm) | Meaning |
| --- | --- | --- |
| Excellent | −30 to −70 | Strong — you shouldn’t have any issues |
| Good | −71 to −80 | Good enough for most activities |
| Fair | −81 to −90 | Fine for most tasks, but you may see some issues |
| Weak | Below −90 | Not strong enough for most activities |

### Read the RSSI every two seconds

```cpp
void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    long rssi = WiFi.RSSI();          // signal strength in dBm
    Serial.print("Signal strength (RSSI): ");
    Serial.print(rssi);
    Serial.println(" dBm");
  } else {
    Serial.println("WiFi disconnected");
  }
  delay(2000);                        // wait 2 s before the next reading
}
```

**Try it:** put this `loop()` into the Wi-Fi sketch above, then compare your reading with the table. Walk away from the router and watch the number fall.

## Checkpoints

<details>
<summary>In <code>enum TrafficLight { RED, YELLOW, GREEN, NUM_OF_STATES };</code>, what number is <code>NUM_OF_STATES</code>?</summary>

**3.** Numbers start at 0: RED = 0, YELLOW = 1, GREEN = 2, NUM_OF_STATES = 3 — which is also how many states there are.
</details>

<details>
<summary><code>light</code> is <code>RED</code> and the <code>case RED:</code> block has no <code>break;</code>. What happens?</summary>

**The RED code runs, then the next case's code runs too** — without `break`, the switch carries on into the case below.
</details>

<details>
<summary>The vending machine is in <em>Accepting coin</em> and you insert another coin. Which state is it in now?</summary>

**Still *Accepting coin*.** Inserting coins is an event that keeps the machine in the same state.
</details>

<details>
<summary>Your board reads <code>-84 dBm</code>. How strong is that?</summary>

**Fair** — it is between −81 and −90 dBm: fine for most tasks, with some issues possible.
</details>

## Recap

1. A **finite-state machine** is always in one state, and moves between states on events.
2. An **enum** gives friendly names to related integer constants, counting from 0; **switch case** runs the code for the current value, and `break` ends each case.
3. `WiFi.status()` and `WiFi.localIP()` tell you the board is connected and where; `WiFi.RSSI()` reads the signal strength.

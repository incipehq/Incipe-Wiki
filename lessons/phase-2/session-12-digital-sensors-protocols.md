# Session 12: Digital Sensors & Protocols (I2C, UART)

> **Phase 2:** INCIPE Board, Sensors, and Modules Introduction · Weeks 9-13
> **Modules used:** Joystick module, Temperature & humidity sensor (DHT11)
> **Concepts:** Digital communication, UART, I2C, accelerometer & gyroscope, Serial Plotter

## Learning objectives

By the end of this session you will be able to:

1. Explain why many sensors send **digital messages** instead of voltages.
2. Describe how **UART** sends data, and read a UART frame by hand.
3. Describe how **I2C** lets many sensors share two wires using **addresses**.
4. Explain what an **accelerometer** and a **gyroscope** measure, and interpret X, Y, Z data.
5. Stream multi-axis data to the **Serial Plotter** and read the graph.

## Before you start

- You finished Session 11 (ADC, the `-1` rule, sensor threads).
- You know binary and hexadecimal numbers (Session 9, bitwise operations).

## Key vocabulary

| Word | Meaning |
| --- | --- |
| **Protocol** | A set of rules two devices agree on so they can talk. |
| **Bit** | One 0 or 1. Eight bits make a **byte**. |
| **Serial** | Sending bits one after another on a single wire. |
| **Baud rate** | How many bits per second a UART link sends, e.g. 115200. |
| **Bus** | A shared set of wires that many devices connect to. |
| **Address** | A unique number that tells I2C devices apart on the same bus. |
| **Controller / Target** | In I2C, the device that starts every conversation (controller, e.g. the board) and the devices that answer (targets, e.g. sensors). |
| **Axis** | A direction of measurement: X (left/right), Y (forward/back), Z (up/down). |

---

## 1. Why go digital?

In Session 11 the light sensor sent a **voltage**, and the board's ADC turned it into a number. That works, but voltages have problems:

- **Noise.** Long wires and nearby motors add small random wiggles to the voltage.
- **One value per wire.** An analog wire can carry only one measurement.
- **The board does the converting.** Its ADC's precision limits the result.

A **digital sensor** measures and converts *inside itself*, then sends the finished number as a message of 1s and 0s. A 1 is "high voltage" and a 0 is "low voltage", so small noise doesn't change the message.

You've already met one: the **DHT11** has its own internal ADC and sends temperature and humidity as a digital message over a single data wire.

For two devices to understand each other, they must agree on the rules: who talks first, how fast, and what each bit means. Those rules are called a **protocol**. Today you'll meet two of the most common ones: **UART** and **I2C**.

## 2. UART: two devices, two wires

**UART** (Universal Asynchronous Receiver-Transmitter) is the simplest way for two devices to talk.

```
   Board                    Other device
  ┌──────┐                  ┌──────┐
  │  TX ─┼──────────────────┼─ RX  │
  │  RX ─┼──────────────────┼─ TX  │
  │ GND ─┼──────────────────┼─ GND │
  └──────┘                  └──────┘
```

- **TX** (transmit) of one device connects to **RX** (receive) of the other, so the wires cross over.
- The devices share **GND** so they agree on what "0 volts" means.
- There is **no clock wire**. That's why it's *asynchronous*. Both sides must agree on the **baud rate** in advance.

### A UART frame

Each byte is wrapped in a **frame**. The most common setting is called **8N1**: 8 data bits, No parity, 1 stop bit.

```
idle  start  b0  b1  b2  b3  b4  b5  b6  b7  stop  idle
 1      0    ── data bits, least significant first ──   1     1
```

1. The line rests **high** (1) when idle.
2. A **start bit** (0) says "a byte is coming".
3. **8 data bits** follow, *least significant bit first*.
4. A **stop bit** (1) ends the frame.

### You already use UART!

`Serial.print()` sends text over a **UART**. On the ESP32 board, the USB cable carries that UART data to your computer, where the Serial Monitor shows it. That's why the Serial Monitor's baud rate must match your program. If it doesn't, the two sides time the bits differently and you see garbage characters.

### Try it yourself: decode a frame

The letter `'A'` is `65` in decimal = `0x41` = `0100 0001` in binary.

1. Write out the 10 bits of the UART frame for `'A'` (start bit, data bits LSB first, stop bit).
2. At 115200 baud, roughly how long does one frame take?

<details>
<summary>Answers</summary>

1. `0  1 0 0 0 0 0 1 0  1`: start `0`, then the bits of `0100 0001` read from right to left (`1,0,0,0,0,0,1,0`), then stop `1`.
2. 10 bits ÷ 115200 bits/s ≈ **0.087 ms** (87 µs). That's about 11,500 characters per second.

</details>

## 3. I2C: many sensors, two wires

UART is great for **two** devices. But a robot might have five sensors. Giving each its own pair of wires would quickly use up the board's pins. **I2C** (Inter-Integrated Circuit, said "I-squared-C") solves this with a **shared bus**.

```
          SDA (data)  ─────┬──────────┬──────────┬────
          SCL (clock) ───┬─┼────────┬─┼────────┬─┼────
                         │ │        │ │        │ │
  ┌────────────┐      ┌──┴─┴──┐  ┌──┴─┴──┐  ┌──┴─┴──┐
  │ Controller │      │Sensor │  │Sensor │  │Sensor │
  │  (board)   │      │ 0x68  │  │ 0x76  │  │ 0x3C  │
  └────────────┘      └───────┘  └───────┘  └───────┘
```

- **SDA** carries the data bits. **SCL** carries a clock, a steady tick that tells everyone *when* to read each bit. So I2C is **synchronous**, unlike UART.
- Every target has a **7-bit address** (e.g. `0x68`). In theory that gives 128 addresses, and around 112 are usable in practice.
- The **controller** (the board) always starts the conversation. Targets only answer when called by their address.

### An I2C conversation

```
START → [address 0x68 + "write"] → ACK → [register number] → ACK →
START → [address 0x68 + "read"]  → ACK → [data byte] → [data byte] → STOP
```

In plain words:

1. **"Hey 0x68!"** The controller sends the address. Only the sensor at `0x68` pays attention.
2. **"I heard you" (ACK).** The sensor pulls a bit low to acknowledge.
3. **"Give me register X."** The controller says which value it wants.
4. **The sensor replies** with the data bytes, and the controller ends with STOP.

If no device has that address, nobody sends the ACK. That's how a program can **scan** the bus to find which sensors are plugged in.

### On INCIPE

With INCIPE, the runtime's **auto-detection** handles this kind of work for you. You **don't** call `Wire.begin()`, choose SDA/SCL pins, or install a sensor library. You call the module's helper function. Knowing how I2C works still matters: it explains why sensors need unique addresses, why plugging in a module "just works", and how you'd debug a sensor on a non-INCIPE board.

### UART vs. I2C at a glance

| | UART | I2C |
| --- | --- | --- |
| Wires (plus GND) | 2 (TX, RX) | 2 (SDA, SCL) |
| Devices | 2 (one-to-one) | Many on one bus |
| Clock wire? | No, both agree on baud rate | Yes, SCL |
| How devices are picked | Each link is its own pair of wires | By **address** |
| Typical use | Serial Monitor, GPS, Bluetooth modules | Accelerometers, gyros, displays, many digital sensors |

> 📝 There are others too. **SPI** is a fast bus with a separate "select" wire per device; it's common for SD cards and displays (Session 16). The DHT11 uses its own **single-wire** protocol.

---

## 4. The accelerometer & gyroscope (IMU)

An **IMU** (Inertial Measurement Unit) usually combines two sensors in one chip, and is a classic I2C device.

### Accelerometer: "Which way is down, and am I speeding up?"

An accelerometer measures **acceleration** on three axes (X, Y, Z), usually in **g**. 1 g is the pull of Earth's gravity, ≈ 9.81 m/s².

Even when it's sitting still, the accelerometer feels **gravity**. That lets you work out **tilt**:

| Board position | X | Y | Z |
| --- | --- | --- | --- |
| Flat on the table, face up | 0 g | 0 g | **+1 g** |
| Upside down | 0 g | 0 g | **−1 g** |
| Tilted onto its right edge | **+1 g** | 0 g | 0 g |
| Nose pointing up | 0 g | **+1 g** | 0 g |
| Being shaken | jumps around | jumps around | jumps around |

*(The exact signs depend on how the chip is mounted. Always test with your own board.)*

### Gyroscope: "How fast am I turning?"

A gyroscope measures **rotation speed** around each axis, in **degrees per second (°/s)**.

- Sitting still → all three axes ≈ 0 °/s.
- Spinning the board on the table like a top → the **Z** value rises.
- A gyroscope says how *fast* you are turning, not which way you are *facing*.

### Interpreting X, Y, Z: try it yourself

Here are some readings. What is the board doing in each one?

| Reading | Accel X | Accel Y | Accel Z | Gyro Z |
| --- | --- | --- | --- | --- |
| A | 0.02 | −0.01 | 0.99 | 0.3 |
| B | 0.71 | 0.00 | 0.70 | 0.1 |
| C | 0.01 | 0.02 | 1.00 | 180.0 |
| D | 1.80 | −1.20 | 0.40 | 95.0 |

<details>
<summary>Answers</summary>

- **A:** Lying flat and still. Gravity is all on Z, and there's no rotation.
- **B:** Still, but tilted about 45° towards X. Gravity is split equally between X and Z.
- **C:** Flat, but spinning on the table at about half a turn per second (180 °/s).
- **D:** Being shaken or moved quickly. The values are bigger than 1 g and it's rotating.

</details>

> 🚧 **INCIPE IMU module: code coming soon.** The INCIPE firmware reference doesn't yet publish a helper function for the accelerometer & gyroscope. This lesson will get IMU code once it does. Until then, the practice below uses the **joystick**, which also gives you multi-axis X/Y data to plot and interpret.

---

## 5. The Serial Plotter

The Serial Monitor shows text. The **Serial Plotter** (in Arduino IDE 2 and similar tools) turns numbers into a **live graph**. It's the best way to see multi-axis data.

To plot several lines at once, print one line per sample with **`label:value`** pairs separated by commas:

```
X:2048,Y:1980,Button:0
X:2100,Y:1975,Button:0
```

Rules:

- **One line per sample**, so use `println` at the end.
- **No extra text**, like `[user] Reading:`, or the plotter can't parse the line.
- Labels have **no spaces**.

---

## 6. Practice: Plot and interpret multi-axis data

**Goal:** Stream the joystick's X, Y, and button values to the Serial Plotter, then work out the joystick's **range**, **centre**, and **button values** by experiment.

> Plug the joystick module into an INCIPE connection. The firmware also reserves the **next** connection for the joystick's Y-axis and button signals, so leave that one free.

### What the firmware tells us (and what it doesn't)

| Function | Returns | Not available |
| --- | --- | --- |
| `incipe.getJoystickXMovement()` | `float`, raw X reading | `-1` |
| `incipe.getJoystickYMovement()` | `float`, raw Y reading | `-1` |
| `incipe.getJoystickButtonResponse()` | `float`, raw button reading | `-1` |

The firmware does **not** define the numeric range, the centre value, or which button value means "pressed". **Your job is to find them out from the graph.** That's what "interpreting data" means.

### Code

```cpp
constexpr uint32_t PLOT_INTERVAL_MS = 20;   // 50 samples per second

void joystickPlotterThread(void *parameter)
{
  (void)parameter;

  for (;;)
  {
    const float x = incipe.getJoystickXMovement();
    const float y = incipe.getJoystickYMovement();
    const float button = incipe.getJoystickButtonResponse();

    // Only plot when all three readings are available
    if (x >= 0 && y >= 0 && button >= 0)
    {
      Serial.print("X:");
      Serial.print(x);
      Serial.print(",Y:");
      Serial.print(y);
      Serial.print(",Button:");
      Serial.println(button);
    }

    vTaskDelay(pdMS_TO_TICKS(PLOT_INTERVAL_MS));
  }
}

void startUserThreads()
{
  xTaskCreatePinnedToCore(
      joystickPlotterThread,
      "joystickPlotter",
      4096,
      nullptr,
      1,
      nullptr,
      1);
}
```

### Experiment worksheet

Open the Serial Plotter and fill in this table with *your* numbers:

| Action | X | Y | Button |
| --- | --- | --- | --- |
| Let go (resting in the middle) | | | |
| Push fully **left** | | | |
| Push fully **right** | | | |
| Push fully **up** | | | |
| Push fully **down** | | | |
| Press the stick **down** (click) | | | |

Then answer:

1. What are the **minimum** and **maximum** X values? What resolution of ADC could produce that range? (Hint: Session 11's resolution table.)
2. Is the **resting value** exactly the same every time you let go? How much does it wobble?
3. Which button value means **pressed**: the higher or the lower one?
4. Does pushing **up** make Y go up or down?

### Interpreting the graph

- **Two flat lines in the middle** → the stick is at rest. Note this as your centre.
- **One line jumps to its maximum or minimum** → the stick is pushed fully along that axis.
- **The button line steps between two levels** → it's a digital on/off signal.
- **The button line hugs the bottom and is hard to see** → its value is tiny next to X/Y. Try printing `button * 1000` so it shows up.

### Extension challenges

1. **Dead zone:** The resting value wobbles a little. Write a function that returns `0` when the stick is within ±100 of your measured centre, so tiny wobbles are ignored.
2. **Direction words:** Using your measured centre and range, print `LEFT`, `RIGHT`, `UP`, `DOWN`, or `CENTRE` to the Serial Monitor. You'll need this for the menu system in Session 15.
3. **Plot two sensors together:** Add `Light:` from `incipe.getLightIntensity()` to the same plot line. Wave your hand over the light sensor while moving the joystick.
4. **Digital vs. analog:** Add `Temp:` from `incipe.getTemperature()`. Why does its line move in small, sudden **steps** instead of smoothly? (Hint: the DHT11 sends finished digital values, and only refreshes every 1-2 s.)
5. **AI helper:** Ask the INCIPE Workspace AI how an I2C "bus scan" works. Compare its explanation with section 3 of this lesson. Did it mention ACK?

---

## Common mistakes

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Plotter shows nothing or "no data" | Extra text in the printed line | Print only `label:value` pairs |
| Plotter lines are mixed up | Missing `println` at the end of a sample | End every sample with `Serial.println(...)` |
| Garbage characters in the Serial Monitor | Baud rate mismatch (UART!) | Match the monitor's baud rate to your program |
| Nothing prints at all | One of the joystick readings is `-1` | Check the module is seated, and the connection after it is free |
| Y or button always `-1` | Something plugged into the next connection | The joystick reserves the next connection. Move the other module |
| Plotter is too fast to read | Printing every few ms | Increase `PLOT_INTERVAL_MS` to 50-100 ms |

## Quick quiz

1. In UART, which pin of the board connects to the **RX** pin of the other device?
2. Why must both sides of a UART link use the same baud rate?
3. What are the two I2C wires called, and what does each carry?
4. How does a sensor on an I2C bus know a message is meant for it?
5. An accelerometer lying flat and still reads `Z ≈ 1 g`. Why isn't it 0?
6. A gyroscope reads `0 °/s` on all axes. Does that mean the board is level?
7. What format does the Serial Plotter need to draw three labelled lines?

<details>
<summary>Answers</summary>

1. The board's **TX**. Transmit goes to receive, so the wires cross over.
2. There's **no clock wire**. Both sides time the bits on their own, so they must agree on the speed.
3. **SDA** carries the data, and **SCL** carries the clock.
4. Every message starts with the target's **address**. Only the device with that address answers (ACK).
5. It feels **gravity**, which is an acceleration of 1 g pointing down.
6. **No.** It only means the board isn't *rotating*. It could be still at any angle. Use the accelerometer to measure tilt.
7. One line per sample: `X:value,Y:value,Z:value`, ending with `println`.

</details>

## Key takeaways

- **Digital sensors** measure and convert inside themselves, then send a message. That's more robust than a raw voltage.
- **UART:** two devices, TX↔RX crossover, no clock, and both must agree on the **baud rate**. `Serial` is a UART.
- **I2C:** many devices share **SDA + SCL**, each picked by a unique **address**, with the board as controller.
- **Accelerometer** = acceleration and gravity (tilt), in g. **Gyroscope** = rotation speed, in °/s.
- The **Serial Plotter** needs clean `label:value` lines. Plotting is the fastest way to *interpret* sensor data.
- When the firmware doesn't document a range or meaning, **measure it yourself** and write it down.

## Next session

**Session 13: Actuators - PWM & Motor Control**. You'll switch from *reading* the world to *moving* it, with the servo and DC motor.

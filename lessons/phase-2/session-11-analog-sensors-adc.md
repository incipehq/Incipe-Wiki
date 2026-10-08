# Session 11: Analog Sensors & ADC

> **Phase 2:** INCIPE Board, Sensors, and Modules Introduction · Weeks 9-13
> **Modules used:** Light sensor (GL5528), Soil moisture sensor, Temperature & humidity sensor (DHT11)

## Learning objectives

By the end of this session you will be able to:

1. Explain the difference between an **analog** signal and a **digital** signal.
2. Describe what an **Analog-to-Digital Converter (ADC)** does and calculate what an ADC reading means.
3. Read the Light, Soil Moisture, and Temperature & Humidity sensors with the INCIPE helper functions.
4. Handle "sensor not ready" values safely.
5. Build a real-time sensor dashboard in the Serial Monitor.

## Before you start

- You can write `if` statements, loops, and functions (Sessions 7-8).
- You know what a `struct` is (Session 10). The dashboard uses one.
- Your INCIPE board is connected to INCIPE Workspace.

## Key vocabulary

| Word | Meaning |
| --- | --- |
| **Analog signal** | A signal that can take *any* value in a range, like a dimmer switch. |
| **Digital signal** | A signal with a fixed set of values. The simplest kind has only two: ON/OFF or 1/0. |
| **ADC** | Analog-to-Digital Converter. It turns a voltage into a number. |
| **Resolution** | How many steps the ADC can tell apart, measured in bits. |
| **Reference voltage** | The highest voltage the ADC can measure. |
| **Polling** | Reading a sensor again and again on a regular interval. |

---

## 1. Analog vs. digital

The real world is **analog**. Brightness, temperature, and wetness all change smoothly. There are no "steps" between a dark room and a bright room.

A microcontroller is **digital**. It only understands numbers made of 1s and 0s.

```
Analog (smooth)                   Digital (steps)
   ___                               _┌┐_
  /   \                             _┘  └_
 /     \___/                       ┘      └─┐_┌
```

So we need a translator between the two. That translator is the **ADC**.

## 2. How an ADC works

Many sensors turn what they measure into a **voltage**. For example, more light could mean a higher voltage. The ADC **samples** that voltage and gives back a whole number.

### Resolution

An ADC with **n bits** can output **2ⁿ** different values:

| Resolution | Number of steps | Output range |
| --- | --- | --- |
| 8-bit | 256 | 0 – 255 |
| 10-bit | 1024 | 0 – 1023 |
| 12-bit | 4096 | 0 – 4095 |

More bits give you smaller steps, so the measurement is more precise.

### Turning a reading back into a voltage

```
voltage = (reading / maxReading) × referenceVoltage
```

**Worked example:** a 10-bit ADC with a 3.3 V reference reads `512`.

```
voltage = (512 / 1023) × 3.3 V ≈ 1.65 V   → about halfway
```

Each step is worth `3.3 V / 1023 ≈ 3.2 mV`. A change smaller than that cannot be seen by the ADC.

### Try it yourself

1. A 10-bit ADC (3.3 V reference) reads `256`. Roughly what voltage is that?
2. Why can a 12-bit ADC notice smaller changes than a 10-bit ADC?

<details>
<summary>Answers</summary>

1. `256 / 1023 × 3.3 ≈ 0.83 V`, about one quarter of 3.3 V.
2. It divides the same voltage range into 4096 steps instead of 1024, so each step is smaller.

</details>

## 3. How INCIPE reads sensors for you

On a plain Arduino you would need to choose pins, set them up, call `analogRead()`, and convert the result yourself. INCIPE modules are **plug-and-play**:

- **Auto-detection.** The INCIPE runtime finds the module you plugged in. You don't assign pins or install sensor libraries.
- **Sensor sync.** The runtime keeps reading the sensors in the background. You just ask for the latest value.
- **Helper functions.** Each sensor has one exact function name, such as `incipe.getLightIntensity()`. Names are case-sensitive, so `getLight()` or `readLight()` will **not** work.

You **don't** write `incipe.begin()`, `Wire.begin()`, or pin setup code. INCIPE Workspace adds the runtime for you.

### The "-1 rule"

Every sensor helper in this session returns a `float`. When the sensor is **not detected** (or the runtime is not ready), it returns **`-1`**. Always check before you use a value:

```cpp
const float value = incipe.getLightIntensity();
if (value >= 0) {
  // safe to use
} else {
  // not ready / not plugged in
}
```

### Reading sensors inside a thread

INCIPE programs use **FreeRTOS threads (tasks)** instead of putting everything inside Arduino's `loop()`. A thread is a function that runs forever in its own loop:

```cpp
void myListenerThread(void *parameter)
{
  (void)parameter;                         // we don't use the parameter

  for (;;)                                 // loop forever
  {
    // 1. read the sensor
    // 2. check it is >= 0
    // 3. use / print it

    vTaskDelay(pdMS_TO_TICKS(500));        // wait 500 ms, let other tasks run
  }
}
```

Then you start it once:

```cpp
xTaskCreatePinnedToCore(
    myListenerThread,   // the function to run
    "myListener",       // a short name
    4096,               // stack size
    nullptr,            // parameter (none)
    1,                  // priority
    nullptr,            // task handle (not needed)
    1);                 // ESP32 core 1
```

> **Why `vTaskDelay` and not `delay`?** `vTaskDelay` pauses *only this thread*. Other threads, and INCIPE's background sensor sync, keep running.

---

## 4. Meet the sensors

### 4.1 Light sensor (GL5528)

**How it works.** The GL5528 is a **photoresistor** (also called an LDR, Light Dependent Resistor). Its resistance **drops** when more light hits it. The module turns that change into a voltage, and the ADC turns the voltage into a number.

```
dark  → high resistance → low reading
bright → low resistance  → high reading
```

| Item | Detail |
| --- | --- |
| Function | `incipe.getLightIntensity()` |
| Returns | `float` from **0** (darker) to **1023** (brighter) |
| Not detected | `-1` |
| Example polling interval | 20 ms (light changes quickly) |

```cpp
void lightListenerThread(void *parameter)
{
  (void)parameter;

  for (;;)
  {
    const float light = incipe.getLightIntensity();

    if (light >= 0)
    {
      Serial.print("[user] Light: ");
      Serial.println(light);
    }

    vTaskDelay(pdMS_TO_TICKS(20));
  }
}
```

**Try it:** Cover the sensor with your hand, then shine a phone torch on it. Write down the lowest and highest numbers you see.

**Convert to a percentage.** The range is 0-1023, so you can scale it:

```cpp
const float lightPercent = light / 1023.0f * 100.0f;
```

### 4.2 Soil moisture sensor

**How it works.** You push the probe into the soil. Water changes how electricity behaves between the probe's two legs, and the module turns that into a voltage for the ADC to read. Wetter soil and drier soil give different readings.

| Item | Detail |
| --- | --- |
| Function | `incipe.getSoilMoisture()` |
| Returns | `float`, a **raw** reading |
| Not detected | `-1` |
| Example polling interval | 500 ms (soil changes slowly) |

> ⚠️ **The raw range and the wet/dry direction are not fixed by the firmware.** Don't assume "high = wet". Find out by experiment (see below).

```cpp
void soilMoistureListenerThread(void *parameter)
{
  (void)parameter;

  for (;;)
  {
    const float moisture = incipe.getSoilMoisture();

    if (moisture >= 0)
    {
      Serial.print("[user] Soil moisture raw value: ");
      Serial.println(moisture);
    }

    vTaskDelay(pdMS_TO_TICKS(500));
  }
}
```

**Try it: calibrate your own sensor**

1. Hold the probe in the air (bone dry). Record the reading → `DRY_VALUE`.
2. Put the probe in a cup of water (only up to the line on the probe). Record the reading → `WET_VALUE`.
3. Did the number go **up** or **down** when wet? Now you know your sensor's direction.
4. Put it in a plant pot. Is the reading closer to `DRY_VALUE` or `WET_VALUE`?

You'll use these calibration values in Session 18 (Smart Garden) to decide when to water.

### 4.3 Temperature & humidity sensor (DHT11)

**How it works.** The DHT11 has two sensing parts:

- A **thermistor**, whose resistance changes with temperature.
- A **humidity-sensing layer**, whose electrical property changes with how much water vapour is in the air.

> 💡 **Surprise: the DHT11 is not an analog output sensor!** It has its **own tiny chip with a built-in ADC**. The chip measures internally, then sends the result to the board as a **digital message** over a single data wire. That's why it's on this session's list: there's still an ADC inside, it's just inside the sensor. Session 12 covers digital protocols in more detail.

| Item | `incipe.getTemperature()` | `incipe.getHumidity()` |
| --- | --- | --- |
| Returns | `float`, degrees **Celsius (°C)** | `float`, **% relative humidity** (0-100) |
| Not detected | `-1` | `-1` |
| Example polling interval | 2000 ms | 2000 ms |

Typical DHT11 datasheet specs: about 0-50 °C (±2 °C) and 20-90 % RH (±5 %). It is a slow sensor, so reading it more often than every 1-2 seconds won't give you fresher data.

```cpp
void dht11ListenerThread(void *parameter)
{
  (void)parameter;

  for (;;)
  {
    const float temperature = incipe.getTemperature();
    const float humidity = incipe.getHumidity();

    if (temperature >= 0 && humidity >= 0)
    {
      Serial.print("[user] Temperature: ");
      Serial.print(temperature);
      Serial.print(" C, humidity: ");
      Serial.print(humidity);
      Serial.println(" %");
    }

    vTaskDelay(pdMS_TO_TICKS(2000));
  }
}
```

**Try it:** Breathe gently on the sensor. Which value changes faster, temperature or humidity?

### Sensor summary

| Sensor | Helper function | Unit / range | Suggested interval |
| --- | --- | --- | --- |
| Light (GL5528) | `incipe.getLightIntensity()` | 0 (dark) – 1023 (bright) | 20 – 500 ms |
| Soil moisture | `incipe.getSoilMoisture()` | raw value, calibrate yourself | 500 ms |
| Temperature (DHT11) | `incipe.getTemperature()` | °C | 2000 ms |
| Humidity (DHT11) | `incipe.getHumidity()` | % RH, 0 – 100 | 2000 ms |

All four return `-1` when the sensor isn't available.

---

## 5. Practice: Real-time Serial Monitor dashboard

**Goal:** Show all four sensor values in one neat, updating table in the Serial Monitor.

### Plan

1. Make a `struct` to hold one "snapshot" of all readings.
2. In one thread, refresh the light and soil values every **500 ms**.
3. Refresh the DHT11 values only every **2000 ms** (every 4th loop), because it's a slow sensor.
4. Print one row per update. Show `--` for any sensor that isn't plugged in.
5. Re-print the table header every 20 rows so it stays readable.

### Code

```cpp
constexpr uint32_t DASHBOARD_INTERVAL_MS = 500;
constexpr uint32_t DHT11_EVERY_N_TICKS = 4;      // 4 × 500 ms = 2000 ms
constexpr uint32_t HEADER_EVERY_N_ROWS = 20;

struct SensorSnapshot
{
  float light;
  float soil;
  float temperature;
  float humidity;
};

// Print a value, or "--" if the sensor is not detected (-1).
void printCell(float value, int decimals)
{
  if (value >= 0)
  {
    Serial.print(value, decimals);
  }
  else
  {
    Serial.print("--");
  }
  Serial.print("\t\t");
}

void printHeader()
{
  Serial.println();
  Serial.println("Light(0-1023)\tSoil(raw)\tTemp(C)\t\tHumidity(%)");
  Serial.println("-------------\t---------\t-------\t\t-----------");
}

void dashboardThread(void *parameter)
{
  (void)parameter;

  SensorSnapshot data = {-1, -1, -1, -1};
  uint32_t tick = 0;
  uint32_t rows = 0;

  for (;;)
  {
    // Fast sensors: every loop
    data.light = incipe.getLightIntensity();
    data.soil = incipe.getSoilMoisture();

    // Slow sensor: every 4th loop
    if (tick % DHT11_EVERY_N_TICKS == 0)
    {
      data.temperature = incipe.getTemperature();
      data.humidity = incipe.getHumidity();
    }

    if (rows % HEADER_EVERY_N_ROWS == 0)
    {
      printHeader();
    }

    printCell(data.light, 0);
    printCell(data.soil, 0);
    printCell(data.temperature, 1);
    printCell(data.humidity, 1);
    Serial.println();

    tick++;
    rows++;
    vTaskDelay(pdMS_TO_TICKS(DASHBOARD_INTERVAL_MS));
  }
}

void startUserThreads()
{
  xTaskCreatePinnedToCore(
      dashboardThread,
      "dashboard",
      4096,
      nullptr,
      1,
      nullptr,
      1);
}
```

### Expected output

```
Light(0-1023)	Soil(raw)	Temp(C)		Humidity(%)
-------------	---------	-------		-----------
612		1834		24.0		61.0
608		1834		24.0		61.0
95		1835		24.0		61.0		← hand over the light sensor
97		--		24.0		61.0		← soil sensor unplugged
```

*(Your numbers will be different.)*

### Check your work

- [ ] All four columns show numbers when every sensor is plugged in.
- [ ] Unplugging a sensor shows `--` instead of `-1` or a crash.
- [ ] Covering the light sensor makes the Light column drop.
- [ ] Temperature/Humidity update about every 2 seconds, not every 0.5 seconds.

### Extension challenges

1. **Percent light:** Add a column that shows light as 0-100 %.
2. **Soil status:** Use your `DRY_VALUE` and `WET_VALUE` from section 4.2 to print `DRY`, `OK`, or `WET`.
3. **Comfort index:** Print `HOT & HUMID` when temperature > 30 °C *and* humidity > 70 %.
4. **Min/Max tracker:** Keep the lowest and highest light reading seen since start-up and print them.
5. **AI helper:** Ask the INCIPE Workspace AI to add a `--- ALERT ---` line when any value crosses a threshold. Read its code and explain each line before you run it.

---

## Common mistakes

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Always prints `-1` or `--` | Sensor not plugged in or not detected yet | Re-seat the module and wait a moment after power-up |
| `'getLight' was not declared` | Wrong function name | Use the exact names: `getLightIntensity()`, `getSoilMoisture()`, `getTemperature()`, `getHumidity()` |
| Board feels "stuck" | Using `delay()` or a loop with no delay | End each thread loop with `vTaskDelay(pdMS_TO_TICKS(...))` |
| Serial Monitor shows garbage | Baud rate mismatch | Set the Serial Monitor to the baud rate used by your project |
| Temperature never changes | Reading DHT11 too fast and expecting instant change | It's a slow sensor. Read every 2 s and be patient |

## Quick quiz

1. How many different values can a 12-bit ADC output?
2. A light sensor reads `1023`. Is the room dark or bright?
3. What does a helper like `incipe.getSoilMoisture()` return when the sensor isn't detected?
4. Why do we read the DHT11 less often than the light sensor?
5. Why use `vTaskDelay()` instead of `delay()` inside a thread?
6. True or false: the DHT11 sends an analog voltage straight to the board's ADC.

<details>
<summary>Answers</summary>

1. 2¹² = **4096** values (0-4095).
2. **Bright.** 0 is darker, 1023 is brighter.
3. **`-1`**.
4. The DHT11 is slow and only produces a fresh reading about every 1-2 seconds.
5. `vTaskDelay()` pauses only the current thread, so other threads and INCIPE's background sensor sync keep running.
6. **False.** The DHT11 has its own internal ADC and sends a *digital* message.

</details>

## Key takeaways

- The real world is analog; microcontrollers are digital. The **ADC** translates between them.
- **Resolution** (bits) sets how many steps the ADC has: 10-bit = 1024 steps.
- INCIPE modules are **plug-and-play**. Call the exact helper function, with no pin setup.
- Always check for **`-1`** before using a reading.
- Run sensor code in **threads** with `vTaskDelay()`, and pick an interval that fits how fast each sensor changes.

## Next session

**Session 12: Digital Sensors & Protocols (I2C, UART)**. You'll see how sensors send data as digital messages instead of voltages.

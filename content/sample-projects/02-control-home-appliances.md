---
title: Control home appliances
lesson: Project 2
type: project
summary: A universal remote. Teach it up to ten buttons from any infrared remote, give each a name, then fire them by typing the name. It remembers them after power-off.
---
*The plant is safe. Now the drawer: one remote for the projector, one for the fan, one for the air conditioner, and never the one you need. Your second build learns them all and answers to names.*

> **Hardware:** an infrared receiver on **pin 2** and an infrared transmitter (IR LED) on **pin 3** of an Arduino-compatible board, plus any appliance with an infrared remote. This sample is plain Arduino code: it uses the **IRremote** library (version 3 or later) and **EEPROM**, not the `incipe` library. The INCIPE Board's own [IR receiver](/wiki/ir-receiver) and [IR sender](/wiki/ir-sender) modules have their own functions. Original code: [Control Home Appliances](https://site.incipeacademy.com/doc/control-home-appliances).

## What you will build

- Type `1` to `10` to pick a memory slot, press a remote button, then name it, for example `fan`.
- Type `fan` (or `S1`) and the board sends that button's signal.
- Type `C` to list the slots, `D1` to clear one, `D all` to clear everything.
- Slots survive power-off.

## How it works

1. **Learn:** the receiver records a button as a list of pulse lengths (raw data).
2. **Store:** the list and its name go into one of ten slots, saved to EEPROM.
3. **Replay:** the IR LED flashes the same pulses at 38 kHz, the carrier most remotes use. The appliance cannot tell it from the real remote.
4. **Commands** arrive as lines from the serial monitor.

## The code

This one is complete. Read it in four parts below, then run it.

```cpp
#include <IRremote.hpp>
#include <EEPROM.h>

// Constants
#define IR_RECEIVE_PIN 2
#define IR_SEND_PIN 3
#define SLOT_COUNT 10
#define SLOT_NAME_LENGTH 20
#define RAW_DATA_MAX_LENGTH 200
#define SCALING_FACTOR 50

// Structure to store signal data
struct Signal {
    uint16_t rawData[RAW_DATA_MAX_LENGTH]; // Raw data
    uint16_t rawDataLength;                // Length of raw data
    char name[SLOT_NAME_LENGTH];           // Name of the slot
};

// Global Variables
Signal signals[SLOT_COUNT]; // Array to hold up to 10 signals
int currentSlot = -1;       // Currently selected slot (-1 means no slot selected)
bool receiving = false;     // Flag for receiving process

void setup() {
    // Initialize Serial Monitor
    Serial.begin(9600);
    while (!Serial)
        ; // Wait for Serial Monitor to connect

    // Initialize IR modules
    IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);
    IrSender.begin(IR_SEND_PIN);

    // Load signals from EEPROM
    loadSignalsFromEEPROM();

    // Instructions
    Serial.println(F("IR Remote Controller"));
    Serial.println(F("Commands:"));
    Serial.println(F("1-10: Start receiving process for the selected slot"));
    Serial.println(F("C: Check all stored signals"));
    Serial.println(F("S<number>: Send signal from the selected slot"));
    Serial.println(F("<name>: Send signal by slot name"));
    Serial.println(F("D<number>: Delete signal in the selected slot"));
    Serial.println(F("D all: Delete all stored signals"));
}

void loop() {
    if (Serial.available() > 0) {
        String command = Serial.readStringUntil('\n');
        command.trim();
        handleCommand(command);
    }

    // If in receiving mode, listen for IR signals
    if (receiving && IrReceiver.decode()) {
        storeSignal();
    }
}

/**
 * Handle user commands from the Serial Monitor
 */
void handleCommand(String command) {
    if (command.equalsIgnoreCase("C")) {
        checkSignals();
    } else if (command.startsWith("S")) {
        int slot = command.substring(1).toInt() - 1;
        if (slot >= 0 && slot < SLOT_COUNT) {
            sendSignal(slot);
        } else {
            Serial.println(F("Invalid slot number."));
        }
    } else if (command.equalsIgnoreCase("D all")) {
        deleteAllSignals();
    } else if (command.startsWith("D")) {
        int slot = command.substring(1).toInt() - 1;
        if (slot >= 0 && slot < SLOT_COUNT) {
            deleteSignal(slot);
        } else {
            Serial.println(F("Invalid slot number."));
        }
    } else if (command.toInt() >= 1 && command.toInt() <= SLOT_COUNT) {
        currentSlot = command.toInt() - 1;
        startReceiving();
    } else {
        sendSignalByName(command);
    }
}

/**
 * Start receiving process for the current slot
 */
void startReceiving() {
    receiving = true;
    Serial.print(F("Listening for signals on slot "));
    Serial.println(currentSlot + 1);
    Serial.println(F("Press a button on your remote or wait 10 seconds."));

    unsigned long startTime = millis();
    bool signalReceived = false;

    // Listen for a signal or timeout after 10 seconds
    while (millis() - startTime < 10000) {
        if (IrReceiver.decode()) {
            signalReceived = true;
            break;
        }
    }

    if (signalReceived) {
        storeSignal();
    } else {
        Serial.println(F("No signal received. Process ended."));
    }

    receiving = false;
    currentSlot = -1; // Reset current slot
    IrReceiver.resume(); // Clear receiver for next process
}

/**
 * Store received signal in the selected slot
 */
void storeSignal() {
    if (currentSlot < 0 || currentSlot >= SLOT_COUNT) return;

    // Store raw data
    Signal &signal = signals[currentSlot];
    signal.rawDataLength = min(IrReceiver.decodedIRData.rawDataPtr->rawlen - 1, RAW_DATA_MAX_LENGTH); // Prevent overflow
    for (int i = 1; i <= signal.rawDataLength; i++) {
        signal.rawData[i - 1] = IrReceiver.decodedIRData.rawDataPtr->rawbuf[i];
    }

    // Display received raw data
    Serial.print(F("Raw Data (Length: "));
    Serial.print(signal.rawDataLength);
    Serial.println(F("):"));
    for (int i = 0; i < signal.rawDataLength; i++) {
        Serial.print(signal.rawData[i]);
        if (i < signal.rawDataLength - 1) {
            Serial.print(", ");
        }
    }
    Serial.println();

    // Prompt for name
    Serial.println(F("Signal received. Enter a name (max 20 characters):"));
    while (!Serial.available())
        ;
    String name = Serial.readStringUntil('\n');
    name.trim();
    strncpy(signal.name, name.c_str(), SLOT_NAME_LENGTH - 1);
    signal.name[SLOT_NAME_LENGTH - 1] = '\0';

    // Save to EEPROM
    saveSignalsToEEPROM();
    Serial.println(F("Signal stored successfully."));

    // Clear receiver for next process
    IrReceiver.resume();
}

/**
 * Send signal from the specified slot
 */
void sendSignal(int slot) {
    if (signals[slot].rawDataLength == 0) {
        Serial.println(F("Slot is empty."));
        return;
    }

    // Scale and send raw data
    uint16_t scaledData[RAW_DATA_MAX_LENGTH];
    for (int i = 0; i < signals[slot].rawDataLength; i++) {
        scaledData[i] = signals[slot].rawData[i] * SCALING_FACTOR;
    }

    Serial.println(F("Sending raw IR signal..."));
    Serial.print(F("Raw Data: "));
    for (int i = 0; i < signals[slot].rawDataLength; i++) {
        Serial.print(scaledData[i]);
        if (i < signals[slot].rawDataLength - 1) {
            Serial.print(", ");
        }
    }
    Serial.println();

    IrSender.sendRaw(scaledData, signals[slot].rawDataLength, 38);
    Serial.println(F("Signal sent."));
}

/**
 * Send signal by slot name
 */
void sendSignalByName(String name) {
    for (int i = 0; i < SLOT_COUNT; i++) {
        if (String(signals[i].name).equalsIgnoreCase(name)) {
            sendSignal(i);
            return;
        }
    }
    Serial.println(F("No matching signal found."));
}

/**
 * Check all stored signals
 */
void checkSignals() {
    Serial.println(F("Stored Signals:"));
    for (int i = 0; i < SLOT_COUNT; i++) {
        Serial.print(F("Slot "));
        Serial.print(i + 1);
        if (signals[i].rawDataLength > 0) {
            Serial.print(F(": Name: "));
            Serial.println(signals[i].name);
            Serial.print(F("Raw Data (Length: "));
            Serial.print(signals[i].rawDataLength);
            Serial.println(F("):"));
            for (int j = 0; j < signals[i].rawDataLength; j++) {
                Serial.print(signals[i].rawData[j]);
                if (j < signals[i].rawDataLength - 1) {
                    Serial.print(", ");
                }
            }
            Serial.println();
        } else {
            Serial.println(F(": Empty"));
        }
    }
}

/**
 * Delete signal in the specified slot
 */
void deleteSignal(int slot) {
    memset(&signals[slot], 0, sizeof(Signal));
    saveSignalsToEEPROM();
    Serial.print(F("Deleted signal in slot "));
    Serial.println(slot + 1);
}

/**
 * Delete all stored signals
 */
void deleteAllSignals() {
    memset(signals, 0, sizeof(signals));
    saveSignalsToEEPROM();
    Serial.println(F("All signals deleted."));
}

/**
 * Save signals to EEPROM
 */
void saveSignalsToEEPROM() {
    EEPROM.put(0, signals);
    Serial.println(F("Signals saved to EEPROM."));
    Serial.println(F("Saved Signals Overview:"));
    for (int i = 0; i < SLOT_COUNT; i++) {
        Serial.print(F("Slot "));
        Serial.print(i + 1);
        if (signals[i].rawDataLength > 0) {
            Serial.print(F(": Name: "));
            Serial.print(signals[i].name);
            Serial.print(F(", Raw Data Length: "));
            Serial.println(signals[i].rawDataLength);
        } else {
            Serial.println(F(": Empty"));
        }
    }
}

/**
 * Load signals from EEPROM
 */
void loadSignalsFromEEPROM() {
    EEPROM.get(0, signals);

    // Sanity check for each slot
    for (int i = 0; i < SLOT_COUNT; i++) {
        Signal &signal = signals[i];

        // Check if the rawDataLength is valid
        if (signal.rawDataLength > RAW_DATA_MAX_LENGTH) {
            Serial.print(F("Invalid data in slot "));
            Serial.println(i + 1);
            memset(&signals[i], 0, sizeof(Signal)); // Clear the corrupted slot
        }
    }

    Serial.println(F("Signals loaded from EEPROM:"));
    for (int i = 0; i < SLOT_COUNT; i++) {
        Serial.print(F("Slot "));
        Serial.print(i + 1);
        if (signals[i].rawDataLength > 0) {
            Serial.print(F(": Name: "));
            Serial.print(signals[i].name);
            Serial.print(F(", Raw Data Length: "));
            Serial.println(signals[i].rawDataLength);
        } else {
            Serial.println(F(": Empty"));
        }
    }
}
```

## Read it in four parts

### 1. One slot is a `struct`

`Signal` bundles three things under one name: up to 200 pulse lengths, how many there are, and a 20-character name. `signals[SLOT_COUNT]` is ten of them.

<details>
<summary>How much memory do the ten slots take?</summary>

Each slot is 200 × 2 bytes + 2 bytes + 20 bytes = **422 bytes**, so ten slots are **4,220 bytes**. That matters when they are saved: see *Before you run it*.
</details>

### 2. `handleCommand()` decides what a line means

It checks the line in order and stops at the first match: `C`, then `S…`, then `D all`, then `D…`, then a number from 1 to 10. Anything else is treated as a name.

<details>
<summary>Why must <code>D all</code> be checked before <code>D…</code>?</summary>

`"D all".startsWith("D")` is true too. Checked the other way round, `D all` would be read as slot `"all".toInt()`, which is 0, and rejected as an invalid slot.
</details>

### 3. `startReceiving()` waits up to 10 seconds

`millis()` counts milliseconds since power-on. The `while` loop keeps checking `IrReceiver.decode()` until a signal arrives or 10,000 ms pass.

### 4. `sendSignal()` scales, then sends

The receiver stores each pulse length in ticks of 50 microseconds. `SCALING_FACTOR 50` turns ticks back into microseconds, and `sendRaw(…, 38)` flashes them at 38 kHz.

## Before you run it

- Install the **IRremote** library (version 3 or later) in your IDE.
- **EEPROM size.** Ten slots need 4,220 bytes. An Arduino Uno has 1 KB of EEPROM and a Mega 4 KB, so on those lower `SLOT_COUNT` (or `RAW_DATA_MAX_LENGTH`) until `SLOT_COUNT × (2 × RAW_DATA_MAX_LENGTH + 22)` fits. On ESP32 boards EEPROM also needs `EEPROM.begin(size)` in `setup()` and `EEPROM.commit()` after `EEPROM.put()`.
- Set the serial monitor to **9600** baud with a **newline** line ending. Commands are read up to the newline.

## Run it

| Type | The board |
| --- | --- |
| `1` | Listens on slot 1 for 10 seconds. Point the remote at the receiver and press a button |
| `fan` | (After it asks for a name) saves the button as `fan` |
| `C` | Lists all ten slots |
| `fan` or `S1` | Sends the signal. Point the IR LED at the appliance |
| `D1` | Clears slot 1 |
| `D all` | Clears every slot |

Unplug the board, plug it back in and type `C`: your slots are still there.

## Test it

| Problem | Try |
| --- | --- |
| `No signal received. Process ended.` | Press the remote button within 10 seconds, closer to the receiver |
| `No matching signal found.` | Type `C` to check the exact name |
| `Signal sent.` but nothing happens | Aim the IR LED at the appliance's sensor, from closer. Learn the button again |
| `Invalid data in slot …` on start | The saved data did not fit or was never saved: see *EEPROM size* |

## Make it better

- Add a command `T fan 30` that sends `fan` after 30 seconds, using `millis()`.
- Combine with Project 1: send `fan` automatically when the temperature passes 30 °C.
- Add a command `R2 projector` to rename slot 2.

## You can now

- Record, store and replay infrared signals.
- Group data with a `struct` and save it so it survives power-off.
- Build a command interface over the serial monitor.

**Next:** the room listens to you now. Make it wake you up, and refuse to stop until you have answered three questions.

# Session 2: AI-Powered Firmware Development

> **M1 AI Literacy** · Weeks 1–2
> **Module used:** [Temperature & humidity sensor (DHT11)](/wiki/temperature-humidity)

## Lesson overview

**Let the AI write the first draft. You review it, check it and make it smaller.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | From a sentence to firmware in INCIPE Workspace | 6 min |
| 02 | Reviewing what the AI wrote | 8 min |
| 03 | Making it smaller: memory | 8 min |
| 04 | When to trust AI, and when to write it yourself | 4 min |
| 05 | Practice: the climate reader | 4 min + homework |

### Key words

| Word | Plain meaning |
| --- | --- |
| **Firmware** | The program that runs on the board itself, not on your computer. |
| **Compile** | Translate the code you can read into instructions the board can run. |
| **Function** | A named block of code that does one job. You *call* it by its name. |
| **Variable** | A labelled box that holds one value, like `temperature`. |
| **Memory (RAM)** | The board's short-term workspace, where variables live while the program runs. It is small. |
| **Byte** | The unit memory is counted in. One letter of text takes about one byte. |
| **Code review** | Reading code line by line to find mistakes before it runs. |

## 1. From a sentence to firmware

Think of the Workspace AI as a **new lab partner who types very fast**. You say what you want; they write it down. They have never seen your board before today, so you still check their work.

In INCIPE Workspace the loop has four steps:

| Step | Where | What happens |
| --- | --- | --- |
| **Describe** | The AI chat ("Describe it.") | Say what the board should do, in one or two sentences. |
| **Draft** | The code editor | The AI writes the firmware into your project. |
| **Verify** | The **Verify** button in the top bar | Compiles your code and reports the first mistake it finds. |
| **Upload** | The arrow button next to Verify | Compiles and sends the code to the selected board. Then open the **Console** (the last icon on the right) to read what it prints. |

![The Workspace AI chat with a prompt typed in](/screens/m1-ai-literacy/s02-ai-chat-prompt.jpg)

![The Workspace top bar: Verify, Upload, the Board menu and the panel toggles](/screens/m1-ai-literacy/s02-topbar.jpg)

**Compiles is not the same as correct.** The Workspace AI builds with Incipe's own toolchain, so its code either compiles or it does not — that catches spelling and grammar mistakes in the code. It cannot tell whether the code does what *you* meant. That part is your job, and it is the rest of this lesson.

> Connecting the board, the Board menu and the Console are covered step by step in [Connect the board](/wiki/connect-the-board).

## 2. Meet the sensor

The practice today uses the temperature & humidity sensor, a DHT11.

### One line of code

One line for each value:

```cpp
float temperature = incipe.getTemperature();
float humidity = incipe.getHumidity();
```

### What you get

| | `incipe.getTemperature()` | `incipe.getHumidity()` |
| --- | --- | --- |
| Value | A `float` in degrees **Celsius (°C)** | A `float`, **% relative humidity**, 0–100 |
| Not detected | `-1` | `-1` |
| Read it every | 2000 ms | 2000 ms |

A `float` is a number with a decimal point, like `23.4`. Full details: [Temperature & humidity sensor](/wiki/temperature-humidity).

## 3. Reviewing what the AI wrote

Here is the kind of first draft an AI often gives for *"write a function that reads the temperature and humidity"*:

```cpp
String readClimate() {
  double temperature = incipe.getTemperature();
  double humidity = incipe.getHumidity();
  String report = "Temperature: " + String(temperature) + " C, Humidity: " + String(humidity) + " %";
  return report;
}
```

| Line | What it does |
| --- | --- |
| 1 | Starts a function called `readClimate` that hands back a `String` (a piece of text). |
| 2 | Asks the sensor for the temperature and keeps it in a `double` box. |
| 3 | Asks for the humidity and keeps it in another `double` box. |
| 4 | Glues words and both numbers into one long piece of text called `report`. |
| 5 | Hands that text back to whoever called the function. |
| 6 | Ends the function. |

It compiles. It even works — when the sensor is plugged in. Now review it with these five questions:

| # | Ask | This draft |
| --- | --- | --- |
| 1 | Does every `incipe.*` name match the [Wiki](/wiki) exactly? | Yes — `getTemperature()`, `getHumidity()` |
| 2 | Does it handle **−1** (sensor not detected)? | **No.** It would print `Temperature: -1.00 C` as if it were real. |
| 3 | Do the types match what the function returns? | **No.** The Wiki says `float`; the draft uses `double`. |
| 4 | Does it read at the right speed? | Not decided here — we will run it every 2000 ms. |
| 5 | Does it keep anything it does not need? | **Yes** — the whole sentence is stored as text before it is printed. |

> **Tip:** a wrong name is the easiest mistake to catch. If the AI wrote `incipe.readTemperature()`, **Verify** stops at that line, because no such function exists. The −1 mistake and the memory waste both compile without a complaint — only a human review finds them.

## 4. Making it smaller: memory

**Analogy: lockers.** The board's memory is a short row of lockers. A `float` takes a **4-byte** locker. A `double` takes an **8-byte** locker — twice the space — to hold extra decimal places. But the sensor only ever hands us a `float`, so the extra space holds nothing.

A `String` is a **stretchy bag**: every time you glue more words on, it asks for a new, bigger space and copies everything across. On a small board, doing that every two seconds wastes memory and can leave it in scattered pieces.

| Item | AI draft | Optimised |
| --- | --- | --- |
| Temperature | `double` — 8 bytes | `float` — 4 bytes |
| Humidity | `double` — 8 bytes | `float` — 4 bytes |
| The sentence | Built as one `String` every call | Not stored — printed piece by piece |

The optimised version — same output, less memory, and it handles −1:

```walkthrough
void printClimate() {
  float temperature = incipe.getTemperature();
  float humidity = incipe.getHumidity();
  if (temperature == -1 || humidity == -1) {
    Serial.println("DHT11 not detected yet");
    return;
  }
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" C, Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");
}
---
1 | `void` means the function hands nothing back — it prints instead of returning text.
2 | Ask the sensor for the temperature. Say it is 23.4 °C. A `float` is all we need. | temperature = 23.4
3 | Ask for the humidity: 51 %. | humidity = 51.0
4 | `||` means "or". Is either value −1? Neither is, so we skip the next two lines.
8 | Print the label. `print` stays on the same line. | | prints: "Temperature: "
9 | Print the number. Arduino prints a `float` with two decimal places. | | prints: 23.40
10 | More label text, still on the same line. | | prints: " C, Humidity: "
11 | Print the humidity, also with two decimals. | | prints: 51.00
12 | `println` adds the last piece and then starts a new line. | | println: " %"
13 | The function ends. Next call, it reads fresh values.
```

| Line | What it does |
| --- | --- |
| 1 | Starts `printClimate`; `void` = gives nothing back. |
| 2–3 | Reads both values into 4-byte `float` boxes. |
| 4 | Checks the −1 rule for both values. |
| 5 | If either is −1, prints a short message… |
| 6 | …and `return` leaves the function early, so no fake numbers are printed. |
| 7 | Ends the `if` block. |
| 8–12 | Prints the sentence one piece at a time — nothing is stored. |
| 13 | Ends the function. |

To run it every 2 seconds, ask the AI to call `printClimate()` from a **user thread** paced at 2000 ms — the speed the Wiki gives for the DHT11. [M3 Session 1](/academy/m3-incipe-board-sensors-modules/11-analog-sensors-adc) explains threads in full.

> These snippets were compiled for the ESP32 with Arduino; sizes are for the INCIPE Board's ESP32 (`float` 4 bytes, `double` 8 bytes).

## 5. When to trust AI, and when to write it yourself

**Analogy: a calculator.** You trust it to multiply; you still check that you typed the right numbers in.

| Trust the AI to… | Check it yourself when… | Write it yourself when… |
| --- | --- | --- |
| Write a first draft fast | It uses an `incipe.*` name — compare it with the Wiki | You cannot explain what a line does yet |
| Explain an error message | It reads a sensor — is −1 handled? | The fix is one or two lines — faster than a prompt |
| Suggest a review checklist | It picks a type or a timing — does it match the Wiki? | You are learning that idea for the first time |
| Draft comments and a README | It builds text or keeps lists of values — memory | Safety matters: motors, pumps, anything that moves or gets hot |

Good review prompts to reuse:

> Review this function line by line. List anything that wastes memory and anything that breaks if the sensor returns −1. Do not rewrite it.

> Explain what each line of this function does, in one short sentence per line, for a beginner.

## Try it

1. Open a new project in INCIPE Workspace and send the prompt from the screenshot above.
2. Click **Verify**. If it fails, ask the AI: *"Explain this error in one sentence. Do not rewrite the code."*
3. Review the draft with the five questions in Part 3. Write down every "No".
4. Fix them **by hand**: change `double` to `float`, add the −1 check, print instead of building a `String`.
5. **Verify** again, then **Upload** and watch the Console. Unplug the sensor: you should see `DHT11 not detected yet`.

## Practice: the climate reader

The curriculum task — *use AI to generate a function that reads from the Temperature & Humidity Sensor, then manually optimise the memory usage*:

| Step | Do this | Hand in |
| --- | --- | --- |
| 1 | Prompt the Workspace AI for a temperature & humidity read function (use Role, Goal, Context from [Lesson 1](/academy/m1-ai-literacy/01-ai-development-workflows)). | Your prompt |
| 2 | Copy the AI's first draft, unchanged. | Draft A |
| 3 | Mark every line that uses more memory than it needs, and say why in one sentence. | Your notes |
| 4 | Rewrite it by hand so it uses `float`, stores no `String`, and handles −1. | Draft B |
| 5 | Fill in the table: bytes used by the variables in Draft A vs Draft B. | The table |

## Checkpoints

<details>
<summary>In <code>printClimate()</code>, the sensor gives temperature 23.4 and humidity −1. What prints?</summary>

**`DHT11 not detected yet`** — 23.4 is fine, but humidity is −1, so `temperature == -1 || humidity == -1` is true. The function prints the message and `return`s before any numbers.
</details>

<details>
<summary>The sensor gives temperature 18 and humidity 60. What does <code>printClimate()</code> print?</summary>

**`Temperature: 18.00 C, Humidity: 60.00 %`** — neither value is −1, and Arduino prints each `float` with two decimal places.
</details>

<details>
<summary>The AI draft keeps temperature and humidity in two <code>double</code>s. The optimised version uses two <code>float</code>s. How many bytes are saved?</summary>

**8 bytes.** Two `double`s = 2 × 8 = 16 bytes. Two `float`s = 2 × 4 = 8 bytes. 16 − 8 = 8.
</details>

<details>
<summary>The AI wrote <code>float t = incipe.readTemperature();</code>. What happens when you click Verify?</summary>

**Verify stops with an error at that line.** There is no `readTemperature()`; the Wiki's name is `incipe.getTemperature()`. Names must match exactly.
</details>

<details>
<summary>Your classmate calls <code>printClimate()</code> every 500 ms "to get fresher data". Is that right?</summary>

**No.** The Wiki says to read the DHT11 every 2000 ms — reading it more often than every 1–2 seconds does not give fresher data. It only prints the same values more often.
</details>

## Recap

1. The Workspace AI turns a sentence into firmware that compiles — **compiling is not the same as correct**.
2. Review every draft: exact `incipe.*` names, the −1 rule, types and timing from the Wiki, and nothing stored that is not needed.
3. Match the type to the data (`float`, not `double`) and print instead of building `String`s — same output, less memory.

**Next — Session 3: Terminal commands & environment setup.** `ls`, `cd`, `mkdir` and friends, and your first look at Git.

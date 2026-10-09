# Session 3: Technical Presentation Skills

> **M5 Presentation Training** · Weeks 14–15
> **You'll need:** your project, its block diagram and flowchart, your code, and the peer feedback from [Session 2](/academy/m5-presentation-portfolio/02-presentation-techniques)

## Lesson overview

**Explain how your product works so that a parent understands it and an engineer respects it.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | Explaining technical ideas to non-technical people | 8 min |
| 02 | Presenting your architecture: system, data flow, code | 10 min |
| 03 | Being honest about AI, and handling questions | 4 min |
| 04 | Mock presentation: your product architecture | 8 min |

### Key words

| Word | Plain meaning |
| --- | --- |
| **Jargon** | Words only specialists understand, like "hysteresis" or "ADC". |
| **Architecture** | How a system is organised: its parts and how they connect. |
| **System design** | The big-picture plan: which parts, doing what, talking to whom. |
| **Data flow** | The path information takes — from a sensor reading to a decision to an action. |
| **Code map** | A short table of the main parts of your code and what each does. |
| **Level of detail** | How far you zoom in: what it does, how the parts connect, or the actual code. |

## 1. Explaining technical ideas to non-technical people

**Analogy: a map app.** Zoomed out, you see the whole city; zoom in and you see streets; zoom in further and you see buildings. A good explanation starts zoomed out and only zooms in when the listener needs it.

| Level | What you show | Who needs it |
| --- | --- | --- |
| 1. What it does | "It waters your plant only when the soil is dry." | Everyone |
| 2. How the parts connect | Probe → board → pump: the block diagram | Curious listeners, teachers |
| 3. How the code decides | Two thresholds, a `bool`, a few lines of code | Engineers, judges, interviewers |

**Start at level 1, every time.** Go to level 2 for everyone, and to level 3 when the audience is technical or someone asks.

**Swap jargon for pictures people already know:**

| Jargon | Plain words or an analogy |
| --- | --- |
| Soil moisture sensor | "A probe that feels how wet the soil is — like your finger, but it never forgets." |
| Threshold | "The line where it changes its mind: below 30 % wet, it waters." |
| Hysteresis | "Like running a bath: tap on when the water's low, off only when it's high enough — so it doesn't keep flicking on and off." |
| State machine | "It's always in one mood — watering or waiting — and clear rules say when it switches." |
| −1 fail-safe | "If a sensor is unplugged, it plays safe and does nothing." |

**Try it (3 min).** Pick the hardest idea in your project. Explain it to a partner in two sentences, with no jargon. They repeat it back. If they can't, try a different analogy.

## 2. Presenting your architecture: system, data flow, code

Show your design in three views, from far to near.

### View 1 — the system

Your block diagram from [Session 2](/academy/m5-presentation-portfolio/02-presentation-techniques): inputs on the left, the INCIPE Board in the middle, outputs on the right. Add anything else your system touches — the Serial Monitor, an SD card, a phone.

### View 2 — the data flow

Follow one piece of information all the way through, like a parcel being delivered:

| Step | Smart Garden |
| --- | --- |
| Sense | Every 2 seconds, the probe gives a raw reading. |
| Clean | A −1 ("not detected") becomes "act as if wet"; any other reading becomes % wet using your calibration. |
| Decide | Two thresholds and the current state choose: switch on, switch off, or keep going. |
| Act | The pump (today: the `PUMP ON` / `PUMP OFF` stand-in) — and the Serial Monitor shows what happened. |

Your flowchart from [M4 Session 2](/academy/m4-ideation/02-product-market-fit-validation) is this view as a picture.

### View 3 — the code

Never put a whole program on a slide. Give a **code map**, then show the few lines that make the key decision.

| Part of the code | What it does |
| --- | --- |
| `DRY_VALUE`, `WET_VALUE` | Your calibration readings |
| `wetPercent()` | Turns a raw reading into % wet |
| `START`, `STOP` | The two thresholds |
| `watering` | Remembers the state: on or off |
| `loop()` | Reads, decides and acts, every 2 seconds |

Then the heart of it — two lines from [M3 Session 8](/academy/m3-incipe-board-sensors-modules/18-smart-garden). Practise narrating each line in plain words, as you would on stage:

```walkthrough
if (!watering && wet < START) { watering = true;  Serial.println("PUMP ON"); }
if (watering && wet > STOP)   { watering = false; Serial.println("PUMP OFF"); }
---
1 | The pump is off and the soil is 25 % wet. | wet = 25; watering = false
1 | Say: "If the pump is off and the soil is drier than 30 %, switch it on." It is — so it switches on. | watering = true | println: PUMP ON
2 | Say: "If it's on and the soil is wetter than 60 %, switch it off." Still 25 %, so it keeps watering.
1 | Later the soil is 65 % wet. "The pump is already on, so this line does nothing…" | wet = 65
2 | "…but it's wetter than 60 %, so the pump switches off." | watering = false | println: PUMP OFF
```

| Line | What it does |
| --- | --- |
| 1 | Switch on: only if off **and** too dry. |
| 2 | Switch off: only if on **and** wet enough. The gap between 30 and 60 is the hysteresis. |

On a slide, show just these lines, large, and point at each while you say its sentence.

## 3. Being honest about AI, and handling questions

**Say how you used AI.** Judges and interviewers will ask — and an honest answer is a strength. Show:

| Say | Example |
| --- | --- |
| What the AI did | "The Workspace AI drafted my first `wetPercent()` and suggested a `default:` case." |
| What you checked | "I compared every `incipe.*` call with the Wiki, compiled it, and tested it with dry soil and a cup of water." |
| What you changed | "Its first draft treated −1 as a real reading. I added the fail-safe." |

**Handling questions:**

| Situation | What to do |
| --- | --- |
| A question you understand | Repeat it briefly so everyone hears it, then answer at the right level. |
| A question you don't understand | "Could you say a bit more about what you mean?" |
| A question you can't answer | "I don't know yet — here's how I'd find out…" Never invent an answer. |
| A question about a weakness | Admit it, then say what you'd do next: "It can't water two pots yet; a second pump would fix that." |

## 4. Mock presentation: your product architecture

The curriculum task: *present your product architecture (sensors, actuators, firmware, AI usage) to the class.* Here "firmware" means **your code** running on the board. About 5 minutes each.

| Slide | Show | Level |
| --- | --- | --- |
| 1. What it does | One sentence and a photo of your build | 1 |
| 2. System | Your block diagram: sensors, board, actuators | 2 |
| 3. Data flow | Sense → clean → decide → act, or your flowchart | 2 |
| 4. Code | Your code map and the 2–5 lines that make the key decision | 3 |
| 5. AI usage | What it did, what you checked, what you changed | — |
| 6. Next | One weakness and how you'd fix it | — |

**The audience plays roles.** One listener is a **parent** (asks "what does it do for me?"), one is an **engineer** (asks "why two thresholds?"), one is an **interviewer** (asks "what did the AI do, and what did you do?"). After each talk, each role asks one question.

> Keep "firmware" to your own code and the `incipe.*` calls from the [Wiki](/wiki). The board's own runtime — how it talks to the modules — is not part of your architecture talk; the Wiki says it detects modules on its own, and that's all you need.

## Checkpoints

<details>
<summary>Explain "hysteresis" to a grandparent in one sentence.</summary>

**"Like running a bath: you turn the tap on when the water's low and off only when it's high enough, so it doesn't keep flicking on and off."**
</details>

<details>
<summary>For a non-technical audience, what do you show first: the code or what the product does?</summary>

**What the product does** (level 1). Code is level 3 — only for a technical audience or when someone asks.
</details>

<details>
<summary>Your slide shows 60 lines of code. How do you fix it?</summary>

**Show a code map and only the 2–5 lines that make the key decision**, large, and narrate each one.
</details>

<details>
<summary>A judge asks something you don't know. What do you say?</summary>

**"I don't know yet — here's how I'd find out."** Never invent an answer.
</details>

<details>
<summary>What goes on your "AI usage" slide?</summary>

**What the AI did, what you checked** (Wiki names, compiling, testing) **and what you changed.**
</details>

## Recap

1. Start zoomed out — what it does — and zoom in only as far as your audience needs; swap jargon for analogies.
2. Present architecture in three views: the system, the data flow, and a code map with the few lines that decide.
3. Be honest about AI — what it did, what you checked, what you changed — and answer "I don't know yet" rather than invent.

**Next — Session 4: Final pitch & career preparation.** Polishing the deck and docs, a demo video for your portfolio, and the final showcase.

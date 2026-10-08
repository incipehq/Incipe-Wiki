---
title: Introduction to AI development workflows
lesson: Lesson 1
type: slides
duration: 30 min
summary: Where AI fits in the hardware workflow, the three agents and what each can see, and a six-part prompt you can check.
source: raw/LMS/M1 AI Literacy/Lesson 1_ Introduction to AI Development Workflows.pptx
---
## Lesson overview

Four parts, thirty minutes.

| Part | Topic | Time |
| --- | --- | --- |
| 01 | Where AI fits in the workflow | 6 min |
| 02 | The three agents and their roles | 6 min |
| 03 | Prompting, and how to check the answer | 13 min |
| 04 | Live demo & questions | 5 min |

## Where AI fits in the workflow

**AI shortens every stage. It removes none of them.**

1. **Ideate** — describe the device in plain language. AI turns the description into a spec you can argue with.
2. **Plug** — snap on the sensors. The board reports what is connected, so the AI starts with facts.
3. **Build** — prompt for the firmware. Workspace AI compiles it in our own toolchain, so it either builds or it does not.
4. **Debug** — read the logs, describe the symptom, ask for causes to test. Do not ask for a rewrite.
5. **Hand off** — pin maps, README, known issues. The cheapest and most reliable use of AI in the whole list.

## The three agents

Each agent sees a different amount of your project.

| Agent | Role | Best for | Sees |
| --- | --- | --- | --- |
| **Copilot** | Writes alongside you | Finishing the line or function you are typing; setup code and test scaffolds | Your open files |
| **ChatGPT** | Explains and reasons | Datasheets, error messages and trade-offs — understanding before you commit | Only what you paste |
| **INCIPE Workspace AI** | Builds the project | Firmware that compiles in our own toolchain — buildable, not merely plausible | The whole project |

### Picking the right agent

| Task | Reach for | Why |
| --- | --- | --- |
| Finish a function you already started | Copilot | It already has the surrounding code |
| Generate firmware for a connected board | Workspace AI | Only it runs our compilation toolchain |
| Make sense of a compiler error | ChatGPT | The explanation matters more than the code |
| Compare two temperature sensors | ChatGPT | Open question, no project context needed |
| Draft the README for a project | Workspace AI | It can read the real pin map and part list |

## Anatomy of a prompt

**Role, Goal, Context. Then the details.**

- **Role** — who the AI should act as, and who it is writing for.
- **Goal** — one outcome, stated as a verb. Not two.
- **Context** — the board, the chip, the language, what you already tried.
- **Constraints** — limits it must respect: memory, no libraries, no rewrite.
- **Format** — code only, a table, three bullet points.
- **Check** — how you will know the answer is right.

> You are an embedded firmware engineer writing for a beginner. Write one C function that reads temperature and humidity from the DHT module on the INCIPE ― 1 board. Use only the standard board library and no dynamic allocation. Return the code and a one-line comment per step, nothing else. Then tell me what a valid reading looks like so I can check it on the serial monitor.

Three sentences — every one of the six parts is in there.

## Vague vs specific

### Prompting for coding — name the board, the pin and the limit

| Too vague | Specific enough to use |
| --- | --- |
| *Write code to read a temperature sensor.* | *In C for the INCIPE ― 1 board, write a function that reads temperature and humidity from the DHT module. No dynamic allocation. Return a struct and handle a read timeout. Code only.* |
| Code for some sensor on some chip — it may not compile, and you cannot tell whether it is wrong or just different. | Code you can compile, flash and test in one pass. |

### Prompting for debugging — ask for causes to test, not for a rewrite

| Too vague | Specific enough to use |
| --- | --- |
| *My sensor code does not work. Fix it.* | *This read returns −999 on every third call. Here is the function and the serial log. I have already checked the wiring and the module seating. List the three most likely causes, most likely first, and how to test each. Do not rewrite the function.* |
| A guess — usually a full rewrite that hides the real fault. | Causes you can test one at a time, and you keep your own code. |

### Prompting for documentation — name the reader, the sections and the length

*Write a README for this project aimed at a classmate who has never seen it. Sections: what it does, how to flash it, the pin map as a table, known issues. Under 400 words. Use only facts from the project files, and list anything you could not find.* You get a draft that needs editing rather than rewriting.

## Watching for hallucination

Give it a marker, then watch for the marker.

```text
Starting from this prompt, answer me in this format,
with a divider between each section.
1. Say the word ON.
2. Answer the question.
3. List what you assumed.
```

The word **ON** costs nothing and proves the model is still reading your instructions. When it disappears, or the dividers drift, your context is gone. Two more checks:

- **Ask it to cite** — which line of the file did you take that from?
- **Ask it to separate** — which part did you read, and which part did you infer?

When the marker stops appearing, start a new chat and paste the prompt again. Do not argue with a model that has lost the thread.

## Grill me

Make it ask you the questions first:

> Before you write any code, grill me. Ask up to five questions about anything you need to know about the board, the sensors or what I am trying to build. Do not guess, and do not start until I have answered.

Cap the number, or it will keep asking. A model that cannot ask will assume — its questions show which parts of your brief are missing (usually the pin, the units, or the update rate). Once the thing works, reverse it: *Grill me on this design. What have I not thought about that will break during the demo?*

## Recycling a prompt

A prompt that worked is worth keeping. Blank out the specifics:

```text
In C for the [BOARD], write a function that reads [VALUE]
from the [MODULE]. No dynamic allocation. Return a struct
and handle a read timeout. Code only.
```

Keep one prompts file per project, next to the code. Worth recycling: the driver prompt, the debug prompt, the README prompt and the grill-me prompt.

## Recap

1. AI shortens the drafting inside every stage. It does not remove a stage, and it does not remove you.
2. Pick the agent by how much of your project the answer depends on.
3. Role, Goal, Context — then set a marker so you can tell when the model has lost them.

**Next — Lesson 2: AI-powered firmware development.** Using the Workspace AI agent for compilation, AI-assisted review, and when to trust it. *Practice: generate a Temperature & Humidity read function, then optimise its memory use by hand.*

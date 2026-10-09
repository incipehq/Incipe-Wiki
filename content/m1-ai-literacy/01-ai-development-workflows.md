---
title: Introduction to AI development workflows
lesson: Session 1
type: slides
duration: 30 min
summary: Where AI fits in embedded development, the AI models and agents you will use and what each one can see, and how to prompt for coding, debugging and documentation — then check the answer.
source: raw/LMS/Incipe 101/M1 AI Literacy/Session 1 · Introduction to AI Development Workflows.pdf
---
> **M1 AI Literacy** · Weeks 1–2

## Lesson overview

Four parts, thirty minutes. Each part is one point of the curriculum for this session.

| Part | Topic | In the curriculum | Time |
| --- | --- | --- | --- |
| 01 | Where AI fits in the workflow | Overview of AI in embedded systems development | 5 min |
| 02 | Models, coding agents and MCP | The role of AI agents, and MCP | 8 min |
| 03 | Prompting, and how to check the answer | Prompting AI for coding, debugging and documentation | 12 min |
| 04 | Live demo & questions | | 5 min |

## 1 · AI in embedded systems development

**AI shortens every stage. It removes none of them.**

| Stage | What you do | What AI adds |
| --- | --- | --- |
| **Ideate** | Describe the device in plain language | Turns the description into a spec you can argue with |
| **Plug** | Snap on the sensors | The board reports what is connected, so the AI starts with facts |
| **Build** | Prompt for the firmware | Workspace AI compiles it in our own toolchain, so it either builds or it does not |
| **Debug** | Read the logs, describe the symptom | Gives you causes to test — do not ask it for a rewrite |
| **Hand off** | Pin maps, README, known issues | The cheapest and most reliable use of AI in the whole list |

The drafting gets shorter at every stage. The decisions stay with you.

## 2 · The role of AI agents

**Different models for different jobs.** Each agent has its own strength — and each one sees a different amount of your project.

| Job | Model | Its strength | Sees |
| --- | --- | --- | --- |
| Daily tasks | **Google Gemini** | Explains and drafts: datasheets, error messages, trade-offs, first drafts. The one to keep open all day | Only what you paste |
| Coding agents | **Claude Code**, **Codex** | Work in your project: run in the terminal, read the whole repository, edit files and run the build themselves | Every file you allow |
| Video | **Seedance** | Generates short clips from a text or image prompt, for demo reels and project write-ups | Your prompt only |
| Hardware context | **INCIPE Workspace** | Knows your board: it talks to the board, so its AI already knows what is connected and what it is doing | The board and the project |

**Only the Workspace sees the hardware.** The other three answer from what you tell them — so pick the agent by how much of your project the answer depends on.

### MCP — letting the agent use your other tools

**Model Context Protocol (MCP)** is a common plug for connecting an AI agent to a program that already exists. Without MCP the agent can only give you the steps. With MCP it takes them — opens the file, changes the object, runs the build — and your job moves from typing to reviewing.

| Piece | What it is |
| --- | --- |
| **The agent** | Claude Code, in your terminal |
| **The server** | A small program that exposes one tool's commands as things the agent may call |
| **The tool** | Blender, a database, a browser, a version control host, our Workspace |

**In practice — retexturing the board without touching Blender.** One prompt in Claude Code:

> Using the Blender MCP, open board.blend, select the top shell of the INCIPE ― 1 and give it a matte black anodised finish. Keep the silkscreen legible. Render one frame from the current camera and save it next to the file.

1. Claude Code calls the Blender MCP server.
2. Blender assigns the material and sets the roughness.
3. The render comes back as an image you can look at.
4. You judge it and prompt the next change.

The checks still apply: ask which object it changed and which property it set, and look at the render before you accept it.

## 3 · Prompting for coding, debugging and documentation

### Anatomy of a prompt

**Role, Goal, Context. Then the details.**

| Part | What to give |
| --- | --- |
| **Role** | Who the AI should act as, and who it is writing for |
| **Goal** | One outcome, stated as a verb. Not two |
| **Context** | The board, the chip, the language, what you already tried |
| **Constraints** | Limits it must respect: memory, no libraries, no rewrite |
| **Format** | Code only, a table, three bullet points |
| **Check** | How you will know the answer is right |

All six, in one prompt:

> You are an embedded firmware engineer writing for a beginner. Write one C function that reads temperature and humidity from the DHT module on the INCIPE ― 1 board. Use only the standard board library and no dynamic allocation. Return the code and a one-line comment per step, nothing else. Then tell me what a valid reading looks like so I can check it on the serial monitor.

Three sentences — every one of the six parts is in there.

### For coding — name the board, the pin and the limit

| Too vague | Specific enough to use |
| --- | --- |
| *Write code to read a temperature sensor.* | *In C for the INCIPE ― 1 board, write a function that reads temperature and humidity from the DHT module. No dynamic allocation. Return a struct and handle a read timeout. Code only.* |
| Code for some sensor on some chip. It may not compile, and you cannot tell whether it is wrong or just different. | Code you can compile, flash and test in one pass. |

### For debugging — ask for causes to test, not for a rewrite

| Too vague | Specific enough to use |
| --- | --- |
| *My sensor code does not work. Fix it.* | *This read returns −999 on every third call. Here is the function and the serial log. I have already checked the wiring and the module seating. List the three most likely causes, most likely first, and how to test each. Do not rewrite the function.* |
| A guess — usually a full rewrite that quietly replaces your working code and hides the real fault. | Causes you can test one at a time, and you keep your own code. |

### For documentation — name the reader, the sections and the length

| Too vague | Specific enough to use |
| --- | --- |
| *Document this project.* | *Write a README for this project aimed at a classmate who has never seen it. Sections: what it does, how to flash it, the pin map as a table, known issues. Under 400 words. Use only facts from the project files, and list anything you could not find.* |
| Filler at the wrong length for the wrong reader — and some of it will be invented. | A draft that needs editing rather than rewriting. |

### Watching for hallucination

Give it a marker, then watch for the marker.

```text
Starting from this prompt, answer me in this format,
with a divider between each section.
1. Say the word ON.
2. Answer the question.
3. List what you assumed.
```

The word **ON** costs nothing and proves the model is still reading your instructions. When it disappears, or the dividers drift, your context is gone — anything after that point is worth less than it looks. Two more checks:

- **Ask it to cite** — which line of the file did you take that from?
- **Ask it to separate** — which part of this did you read, and which part did you infer?

When the marker stops appearing, start a new chat and paste the prompt again. Do not argue with a model that has lost the thread.

### Grill me

Make it ask you the questions first:

> Before you write any code, grill me. Ask up to five questions about anything you need to know about the board, the sensors or what I am trying to build. Do not guess, and do not start until I have answered.

Cap the number, or it will keep asking. A model that cannot ask will assume — its questions show which parts of your brief are missing, usually the pin, the units or the update rate. Once the thing works and you are about to show it, turn it around: *Grill me on this design. What have I not thought about that will break during the demo?*

### Recycling a prompt

A prompt that worked is worth keeping. Blank out the specifics:

```text
In C for the [BOARD], write a function that reads [VALUE]
from the [MODULE]. No dynamic allocation. Return a struct
and handle a read timeout. Code only.
```

The same skeleton covers the next sensor, and the one after that. Keep one prompts file per project, next to the code — three or four you trust beat a folder of fifty you have never re-read. Worth recycling: the driver prompt, the debug prompt, the README prompt and the grill-me prompt. Note what you changed and why, in one line, at the top of the file.

## Checkpoints

<details>
<summary>You want firmware for the board you have plugged in. Which tool knows what is connected without being told?</summary>

**INCIPE Workspace.** It is the only one that sees the board; Gemini, Claude Code, Codex and Seedance answer from what you give them.
</details>

<details>
<summary>Which of the six parts is missing from <em>“Write a C function that reads the DHT module on the INCIPE ― 1 board. Code only.”</em>?</summary>

**Role, Constraints and Check.** It has a Goal (write one function), Context (C, the DHT module, the board) and a Format (code only), but no one to act as, no limits, and no way to know the answer is right.
</details>

<details>
<summary>Halfway through a long chat the model stops writing the word ON. What should you do?</summary>

**Start a new chat and paste the prompt again.** The marker is gone, so the model has dropped your instructions — do not argue with it.
</details>

## Recap

1. AI shortens the drafting inside every stage. It does not remove a stage, and it does not remove you.
2. Pick the agent by how much of your project the answer depends on — only the Workspace sees the hardware.
3. Role, Goal, Context — then set a marker so you can tell when the model has lost them.

**Next — Session 2: AI-powered firmware development.** Using the INCIPE Workspace AI agent for firmware compilation, AI-assisted code review and optimisation, and when to trust AI and when to write your own code. *Practice: use AI to generate a function that reads from the Temperature & Humidity sensor, then optimise its memory use by hand.*

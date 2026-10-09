---
title: Steer the AI
kind: app
step: 8
order: 208
reads: Plan, Ask and Auto modes, plans, models, thinking effort, attachments and session usage
keywords: plan mode ask auto permission approve plan revise reject model picker thinking effort attach file image mention context skills session usage context window new chat questions
summary: Choose how much Incipe does on its own, review a plan before any code changes, pick the model, add files to the conversation, and keep an eye on how full a chat is.
---
*Numbers alone will not open a window. The monitor should say **open a window** when the room gets too warm. That is a bigger change, so plan it first.*

## Choose a mode

The mode button sits left of the composer and shows the current mode.

| Mode | What Incipe may do on its own |
| --- | --- |
| **Plan** | Nothing yet. It writes a plan first and waits for your approval |
| **Ask** *(default)* | Edit files. Running commands and flashing still ask you |
| **Auto** | Approve for you. Deleting, flashing and shell commands still ask |

## Plan the warning

1. Start a new chat in `climate-reader` and switch the mode to **Plan**.
2. Send:

   > When the temperature goes above 28 °C, print `WARN: too warm, open a window` once. Print `OK: comfortable again` when it drops below 27 °C.

3. A **plan card** appears. Read it.
   - Not right? Type what to change in **What should the plan change?** and press **Revise**.
   - Right? Press **Approve**. Incipe makes the edits.
4. **Verify**, **Flash**, and warm the module in your hand. Watch for `WARN:` in the serial monitor.

The gap between 28 and 27 °C stops the warning flickering on and off at the edge.

## The composer's controls

```screen
image: /app-guide/composer.jpg
alt: The composer and its controls
caption: Your app may look slightly different.
---
19, 29.7 | Describe a change to board… | Type here. Enter sends, Shift+Enter adds a line.
3.3, 79.7 | Add context | Attach file/image…, @ Mention…, Clear input.
8.2, 79.7 | Mode | Plan, Ask or Auto.
84.6, 79.7 | Model | Which AI model answers.
91.4, 79.7 | Thinking effort | How hard the model thinks. Auto uses the provider default.
96.2, 79.7 | Send | Becomes Stop while Incipe is working.
```

- **Attach** a photo of your wiring or a datasheet PDF with **Add context › Attach file/image…**, or drag files onto the composer. Up to 10 files, 10 MB each.
- If the model cannot read an attachment, the composer says so and offers **Switch to** a model that can.
- Type **/** to pick a mode or a skill; type **@** to add context.
- A model marked **Rate limited** is busy: pick another.

## Approve what it asks

When Incipe needs to run a command or flash, an approval card shows exactly what and where: **Command approval required** or **Flash permission required**. Read it, then **Approve & run** / **Confirm & flash**, or **Cancel**. Tick **Auto-approve flashing to this port for this session** to stop being asked about the same port.

## Keep chats light

The ring in the chat header is **Session usage**: how full this chat's context is. When it gets close to full, start a new chat. Incipe still reads your project's files there.

```screen
image: /app-guide/session-usage.jpg
alt: The Session usage popover under the ring in the chat header
caption: Plan usage and Credits show only when your account has a plan.
---
94, 9.2 | Session usage | Click the ring to open this.
39.3, 38.5 | Context | How much of the chat's memory is used. Click to see what fills it.
```

## You can now

- Pick the right mode for the job and approve a plan before code changes.
- Attach files, change the model and approve commands safely.

**Next:** 28 °C is a guess. Open the code and set the number yourself.

# Session 1: Design Thinking & Problem Statement

> **M4 Ideation** · Weeks 3–4
> **You'll need:** paper or sticky notes, a pen, your group, and the [Wiki](/wiki) open to look up modules

## Lesson overview

**Before you build something, make sure it's worth building — for a real person, with a real problem.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | Empathy: find a real pain point | 7 min |
| 02 | Define: a problem statement and a "How might we" question | 8 min |
| 03 | Ideate: brainstorm with the INCIPE building blocks | 5 min |
| 04 | Workshop: five IoT product ideas | 10 min |

### Key words

| Word | Plain meaning |
| --- | --- |
| **Design thinking** | A way to invent things by starting from people's problems, not from the technology. |
| **User** | The person who will use what you make — not you, unless you're designing for yourself. |
| **Pain point** | Something that annoys, worries or slows down a user. |
| **Empathy** | Understanding how someone else feels and what their day is really like. |
| **Problem statement** | One sentence that says who has the problem, what they need, and why. |
| **How might we (HMW)** | A question that turns a problem into an invitation to find many solutions. |
| **IoT** | "Internet of Things": everyday objects with sensors, a small computer and often a network connection. |

## 1. Empathy: find a real pain point

**Analogy: a doctor again.** In M3 you debugged like a doctor. Design thinking starts the same way — you don't prescribe before you've listened. A great product that solves nobody's problem is like a cure for an illness nobody has.

Design thinking has five stages. Today covers the first three; [Session 2](/academy/m4-ideation) covers prototyping and testing ideas.

| Stage | Question | Today? |
| --- | --- | --- |
| 1. Empathize | Who is the user, and what bothers them? | ✓ |
| 2. Define | What exactly is the problem? | ✓ |
| 3. Ideate | What could solve it? (Many ideas!) | ✓ |
| 4. Prototype | What's the quickest way to try one? | Session 2 |
| 5. Test | Does it actually help the user? | Session 2 |

**How to find pain points:**

| Method | What you do | Example |
| --- | --- | --- |
| Observe | Watch someone do the task, without helping. | Your aunt waters her plants — she checks the soil with her finger every day. |
| Ask "tell me about the last time…" | Ask about a real moment, not opinions. | "Tell me about the last time a plant died." → "I was away for a week." |
| Ask "why?" | Keep asking why, up to five times. | Why did it die? No water. Why? Nobody was home. Why does that matter? … |
| Walk through their day | List what they do from morning to night. | Where in the day do they forget, worry or wait? |

> **Pain points, not solutions.** "I want an automatic watering robot" is a *solution*. The pain point underneath is "my plants die when I'm away". Keep asking until you reach the pain.

**Try it (3 min).** Pick one of the curriculum's areas — **plant care**, **home security** or **gaming** — and write three pain points, each from a different imaginary user. For example: a student who travels for competitions, a grandparent living alone, a younger brother who gets bored.

## 2. Define: a problem statement and a "How might we" question

A pain point becomes useful when you write it down precisely.

**Problem statement:** *[User] needs a way to [need] because [insight].*

> **Example:** A student who travels for weekend competitions needs a way to keep their desk plant watered because nobody checks it while they're away.

Then flip it into a **How might we** question — it invites many answers instead of one:

> **How might we** help a student keep a plant alive while they're away for a few days?

A good HMW is not too broad and not too narrow:

| HMW | Verdict | Why |
| --- | --- | --- |
| How might we fix gardening? | Too broad | No user, no clear need — you can't start. |
| How might we add a pump to a plant pot? | Too narrow | The solution is already inside the question. |
| How might we help a student keep a plant alive while they're away for a few days? | Just right | A clear user and need, and many possible answers: a timer, a reservoir, a phone alert, a neighbour… |

**Analogy: a good exam question.** "Write about history" is too broad; "Write the year 1066" is too narrow; "Explain why the castle was built on a hill" gives room to think.

## 3. Ideate: brainstorm with the INCIPE building blocks

Now — and only now — think about technology. **Brainstorming rules:**

1. **Quantity first.** Aim for many ideas; judge them later.
2. **No "but".** Build on others' ideas with "yes, and…".
3. **Wild ideas welcome.** A silly idea often leads to a good one.
4. **Stay on the HMW.** Every idea should answer your question.

Your building blocks are the INCIPE modules. This is what each one senses or does, as the [Wiki](/wiki) lists it:

| Senses (inputs) | What it gives you |
| --- | --- |
| [Temperature & humidity](/wiki/temperature-humidity) | Temperature in °C and relative humidity 0–100 % |
| [Light](/wiki/light) | Brightness from 0 (dark) to 1023 (bright) |
| [Soil moisture](/wiki/soil-moisture) | A raw soil-moisture reading |
| [Ultrasonic distance](/wiki/ultrasonic) | Distance in cm |
| [Air quality](/wiki/air-quality) | Air quality in ppm |
| [Flame](/wiki/flame) | Flame (infrared) intensity |
| [Button](/wiki/button) | Pressed or not |
| [Joystick](/wiki/joystick) | X and Y position and the stick button |
| [IR receiver](/wiki/ir-receiver) | Signals from a remote control |

| Does (outputs) | What it does |
| --- | --- |
| [LED strip](/wiki/led-strip) | Lights each pixel in a colour |
| [Buzzer](/wiki/buzzer) | Beeps or plays a tone |
| [Servo](/wiki/servo) | Turns to a position |
| [Motor](/wiki/motor) | Spins at a speed |
| [Water pump](/wiki/pump) | Pumps water |
| [IR sender](/wiki/ir-sender) | Sends a remote-control signal |
| [SD card](/wiki/sd-card) | Saves data to files |

> The [IMU](/wiki/imu) (tilt and motion) is coming soon, and the [colour sensor](/wiki/color-sensor) has no published functions yet — fine for an idea, but not for this term's build.

**Turn an HMW into ideas** by asking: *which input notices the problem? Which output does something about it?*

| HMW | Input notices… | Output does… | Idea |
| --- | --- | --- | --- |
| …keep a plant alive while away? | Soil moisture: "the soil is dry" | Water pump: waters it | Self-watering pot (you built its logic in M3 Session 8) |
| …help a grandparent know someone is at the door? | Ultrasonic distance: "someone is close" | Buzzer + LED strip: chime and light | Visitor alert |
| …make waiting for the bus less boring for a younger brother? | Joystick + button | LED strip: a one-row screen | Pocket game (M3 Session 9) |

## 4. Workshop: five IoT product ideas

The curriculum task: *group brainstorming session to ideate 5 potential IoT product ideas using the INCIPE ecosystem.* Groups of 3–4, about 10 minutes:

| Step | Time | Do this |
| --- | --- | --- |
| 1 | 2 min | Everyone reads out their three pain points from the Try it. |
| 2 | 2 min | As a group, pick the two pain points you care most about. Write a problem statement and an HMW for each. |
| 3 | 4 min | Brainstorm silently on sticky notes, one idea per note, then share. Aim for 10+ ideas. |
| 4 | 2 min | Pick your best **five** and fill in the table below. |

| # | Idea name | User | HMW it answers | Inputs (sensors) | Outputs (actuators) |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

**Check each idea:** Does it name a real user? Does every module in it appear in the tables above? Could you explain it to a classmate in one sentence? Keep the table — Session 2 picks one of these ideas and tests whether people actually want it.

> **AI as a brainstorming partner.** After your own brainstorm, you can paste your HMW into the Workspace AI chat and ask for ten more ideas using only the modules in the tables above. Treat its answers like a teammate's sticky notes: some will be great, some will name parts the kit doesn't have — cross those out.

## Checkpoints

<details>
<summary>"I want an app that reminds me to water my plants." Is that a pain point or a solution?</summary>

**A solution.** The pain point underneath is something like "I forget to water my plants and they die". Starting from the pain leaves room for better solutions than an app.
</details>

<details>
<summary>What's wrong with "How might we improve home security?"</summary>

**Too broad** — no user and no specific need. Better: "How might we help a grandparent living alone know when someone is at the door?"
</details>

<details>
<summary>What's wrong with "How might we put an ultrasonic sensor on the front door?"</summary>

**Too narrow** — the solution (an ultrasonic sensor) is already in the question, so the brainstorm has nowhere to go.
</details>

<details>
<summary>Your HMW is about knowing when a room is too hot. Which INCIPE input notices that?</summary>

**The temperature & humidity sensor** — it gives the temperature in °C.
</details>

<details>
<summary>Put the five design-thinking stages in order.</summary>

**Empathize → Define → Ideate → Prototype → Test.** Today covered the first three.
</details>

## Recap

1. Start from people, not technology: observe, ask about real moments, and keep asking "why?" until you reach the pain point.
2. Write it as a problem statement, then a "How might we" question — not too broad, not too narrow, no solution inside.
3. Brainstorm many ideas first, then match each to the INCIPE inputs that notice the problem and the outputs that act on it.

**Next — Session 2: Product-market fit & solution validation.** Who exactly wants your idea, a Lean Canvas, and a 3-minute problem-statement pitch.

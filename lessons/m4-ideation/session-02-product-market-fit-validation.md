# Session 2: Product-Market Fit & Solution Validation

> **M4 Ideation** · Weeks 3–4
> **You'll need:** your five ideas from [Session 1](/academy/m4-ideation/01-design-thinking-problem-statement), paper, a pen, and five people you can ask questions this week

## Lesson overview

**Find out who really wants your idea — before you spend weeks building it.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | Product-market fit: why it matters | 5 min |
| 02 | Your target audience, and how to check you're right | 8 min |
| 03 | Prototype on paper: sketches and flowcharts | 6 min |
| 04 | Practice: a Lean Canvas, and your 3-minute pitch | 11 min |

### Key words

| Word | Plain meaning |
| --- | --- |
| **Market** | All the people who might want your product. |
| **Product-market fit** | When a clear group of people wants your product enough to use it, keep using it and tell others. |
| **Target audience** | The specific group you build for first. |
| **Validation** | Checking with real people that the problem is real and your idea helps — before building it. |
| **Prototype** | A quick, cheap version of an idea, made to learn something — a sketch, a flowchart, a cardboard model. |
| **Lean Canvas** | A one-page plan with nine boxes that describes a product idea. |
| **Pitch** | A short talk that convinces listeners your problem matters and your idea is worth trying. |

## 1. Product-market fit: why it matters

**Analogy: a key and a lock.** A beautifully made key is useless if it fits no lock. Your product is the key; a group of people with a real problem is the lock. **Product-market fit** is when the key turns.

You can tell you're close when people:

| Signal | Example |
| --- | --- |
| Use it without being reminded | Your classmate checks the plant app every morning on their own. |
| Would be disappointed if it disappeared | "Wait — you're taking the pot back? I need that!" |
| Tell others about it | "My sister wants one too." |

**Why it matters for you.** In an internship interview or a portfolio review, "I built a self-watering pot" is fine. "I built it for students who travel for competitions; I interviewed five of them, and three said their plants die every term" shows you think like an engineer *and* a product maker. That's what this module trains.

## 2. Your target audience, and how to check you're right

**Start narrow.** "Everyone who has plants" is too many people with too many different needs. Pick a group small enough to picture one real person:

| Too broad | Narrow enough to build for |
| --- | --- |
| People with plants | Urban gardeners with a balcony and no time on weekdays |
| Old people | Grandparents who live alone and can't hear the doorbell from the back room |
| Kids | Kids aged 10–12 learning to code who get bored with screens-only lessons |

Describe one imaginary person from your group — a **user profile**: name, age, where they live, a typical day, and the pain point from Session 1. Give them a face; you'll design for them.

**Then check with real people.** Talk to **five** people from your target audience this week. The trick is to ask about what they *did*, not what they *would* do — people are polite, and almost everyone says "yes, I'd buy that".

| Weak question | Better question | Why |
| --- | --- | --- |
| Would you buy a self-watering pot? | Tell me about the last time one of your plants died. | Real past events, not polite guesses. |
| Do you like my idea? | How do you deal with this today? | If they already have a fix they're happy with, your idea must beat it. |
| Would you use this every day? | When did this last cause you a problem? | If it was a year ago, the pain is small. |

Write down what they say, in their words. If most of the five don't recognise the problem, that's not failure — it's a cheap lesson. Go back to your other Session 1 ideas.

## 3. Prototype on paper: sketches and flowcharts

**Analogy: a film storyboard.** Directors draw the film as comic panels before filming anything — changing a drawing costs nothing; reshooting costs a lot.

Two quick prototypes:

| Prototype | What it shows | Time |
| --- | --- | --- |
| **Sketch** | What it looks like and where the parts go: the pot, the probe in the soil, the pump, the LED strip. Label each INCIPE module. | 5 min |
| **Flowchart** | How it behaves: what it checks, what it decides, what it does. | 5 min |

A **flowchart** uses a few standard shapes:

| Shape | Means |
| --- | --- |
| Oval | Start or end |
| Rectangle | Do something (read a sensor, switch something on) |
| Diamond | A yes/no question — two arrows leave it |
| Arrow | What happens next |

The Smart Garden's watering logic from [M3 Session 8](/academy/m3-incipe-board-sensors-modules/18-smart-garden), as a flowchart:

```text
              ( Start )
                  |
   +--> [ Read the soil probe ]
   |              |
   |    < Is the reading -1? > --yes--> [ Treat it as 100 % wet ]
   |              | no                               |
   |    [ Convert it to % wet ]                      |
   |              |<---------------------------------+
   |    < Pump off and below 30 %? > --yes--> [ Pump on ]
   |              |                                  |
   |    < Pump on and above 60 %? > --yes--> [ Pump off ]
   |              |                                  |
   |              |<---------------------------------+
   +--- [ Wait 2 seconds ]
```

A flowchart is also the best thing to show an AI chat when you ask for code later: it says exactly what the program should do.

**Try it (5 min).** Sketch your chosen idea and draw its flowchart. Can a classmate follow the flowchart without your help?

## 4. Practice: a Lean Canvas, and your 3-minute pitch

The curriculum task: *create a Lean Canvas for your chosen product idea (Smart Garden or Game Console).*

A **Lean Canvas** fits a whole product plan on one page, in nine boxes. Fill it in roughly this order:

| # | Box | Question it answers |
| --- | --- | --- |
| 1 | Customer segments | Who is it for? (Your target audience.) |
| 2 | Problem | What are their top 1–3 problems? |
| 3 | Unique value proposition | One sentence: why is yours different and worth it? |
| 4 | Solution | What does your product do about each problem? |
| 5 | Channels | How will people hear about it and get it? |
| 6 | Revenue streams | How could it earn money (or be funded)? |
| 7 | Cost structure | What does it cost to make and run? |
| 8 | Key metrics | Which numbers show it's working? |
| 9 | Unfair advantage | What do you have that others can't easily copy? |

A worked example — the Smart Garden. The prices are left blank on purpose: find real ones for your own canvas.

| Box | Smart Garden |
| --- | --- |
| Customer segments | Students and young workers in flats who keep 1–5 indoor plants and travel often |
| Problem | Plants die during trips; they can't tell when to water; asking a neighbour is awkward |
| Unique value proposition | "Your plants water themselves — and only when the soil is actually dry." |
| Solution | Soil probe + pump with two thresholds, so it waters on its own and never floods (M3 Session 8) |
| Channels | School maker fair, a demo video, plant-shop noticeboards |
| Revenue streams | Sell kits at [price]; or a club buys a set for its members |
| Cost structure | Board and modules [cost], pot and tubing [cost], your time |
| Key metrics | Plants still alive after a week away; number of users who keep using it after a month |
| Unfair advantage | You interviewed real users and tuned the thresholds on real plants |

### Your task

| Step | Do this |
| --- | --- |
| 1 | Choose your final concept: the Smart Garden, the Game Console, or your best idea from Session 1. |
| 2 | Fill in all nine boxes of a Lean Canvas for it. Leave `[ ]` placeholders for any number you don't know yet — never invent one. |
| 3 | Interview at least three people from your target audience with the better questions above. Update the Problem box with what they said. |
| 4 | Prepare the assignment below. |

### Assignment: a 3-minute problem-statement pitch

The curriculum assignment: *select your final project concept and prepare a 3-minute problem-statement pitch.* Most of the time goes on the **problem**, not the features:

| Part | Time | Say |
| --- | --- | --- |
| Hook | 20 s | A real moment: "Last term, Mei came back from a competition to three dead plants." |
| Problem and who | 60 s | Your target audience and their pain point, in your problem statement and HMW. |
| Evidence | 40 s | What your interviews found, in their words. |
| Idea | 40 s | Your solution in one sentence, your sketch, and the INCIPE modules it uses. |
| Ask | 20 s | What you need next: testers, feedback, a plant to try it on. |

Practise it out loud with a timer. If you run over, cut features, not the problem.

> **AI as a rehearsal partner.** Paste your pitch script into the Workspace AI chat and ask: "Time this pitch at a normal speaking pace, and point out any sentence a 14-year-old wouldn't understand." Check its timing with a real stopwatch.

## Checkpoints

<details>
<summary>"My target audience is everyone who likes plants." Good enough?</summary>

**No — too broad.** Narrow it until you can picture one person, e.g. "students in flats with a few indoor plants who travel for competitions".
</details>

<details>
<summary>Which interview question gives you better evidence: "Would you buy a self-watering pot?" or "Tell me about the last time one of your plants died"?</summary>

**The second.** It asks about something that really happened; the first invites a polite "yes".
</details>

<details>
<summary>In a flowchart, which shape asks a yes/no question?</summary>

**A diamond** — and two arrows leave it, one for yes and one for no.
</details>

<details>
<summary>Which Lean Canvas box says, in one sentence, why your product is different and worth it?</summary>

**Unique value proposition.**
</details>

<details>
<summary>A classmate's 3-minute pitch spends two minutes listing features. What's missing?</summary>

**The problem and the evidence.** A problem-statement pitch spends most of its time on who has the problem and what the interviews found; features get about 40 seconds.
</details>

## Recap

1. Product-market fit is when a clear group of people wants your product enough to keep using it — find that group before you build.
2. Narrow your target audience until you can picture one person, then check with five real people by asking what they *did*, not what they *would* do.
3. Prototype on paper — a sketch and a flowchart — then put the whole plan on one Lean Canvas and pitch the problem in three minutes.

**Next — M5 Session 1: Storytelling & product pitching.** Turning your pitch into a story people remember.

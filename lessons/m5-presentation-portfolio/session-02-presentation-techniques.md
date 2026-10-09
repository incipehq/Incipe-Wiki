# Session 2: Presentation Techniques

> **M5 Presentation Training** · Weeks 14–15
> **You'll need:** your 5-minute pitch script from [Session 1](/academy/m5-presentation-portfolio/01-storytelling-product-pitching), your project, and a phone to record a backup video

## Lesson overview

**Slides that help you, a voice and body that carry the story, and a demo that survives anything.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | Slides: diagrams and demos, not paragraphs | 7 min |
| 02 | Body language, voice and nerves | 8 min |
| 03 | Live demos — always have a backup plan | 6 min |
| 04 | Practice: present to a small group for peer feedback | 9 min |

### Key words

| Word | Plain meaning |
| --- | --- |
| **Visual aid** | Anything the audience looks at while you talk: slides, a diagram, the product itself. |
| **Block diagram** | Boxes joined by arrows that show how the parts of a system connect. |
| **Body language** | What your posture, face, eyes and hands say without words. |
| **Voice modulation** | Changing your speed, volume and tone so you never sound flat. |
| **Filler words** | "Um", "like", "so, yeah" — sounds that fill a pause. |
| **Backup plan** | What you'll do if the live demo fails. |
| **Peer feedback** | Comments from classmates, given to help you improve. |

## 1. Slides: diagrams and demos, not paragraphs

**Analogy: a road sign.** A driver reads it in a second: one symbol, a few words. Your audience is "driving" too — they're listening to you. If a slide is a paragraph, they read instead of listening, and lose both.

| Rule | Instead of… | Do this |
| --- | --- | --- |
| One idea per slide | Five points on one slide | Five slides, one point each |
| Few words — you do the talking | A paragraph | A short phrase or a single number |
| Show, don't list | "Uses a soil probe, a board and a pump" | A block diagram: probe → board → pump |
| Big and readable | 14-point text | Text the back row can read |
| Real pictures | Clip art of a plant | A photo of *your* build |

A **block diagram** of the Smart Garden explains the technology in one glance:

```text
        INPUTS                       DECIDES                     OUTPUTS
[ Soil moisture probe ] ──┐                              ┌──> [ Water pump ]
[ Light sensor        ] ──┼──> [ INCIPE Board ] ─────────┼──> [ LED strip  ]
[ Temperature sensor  ] ──┘    (thresholds, logic)       └──> [ Servo      ]
```

Inputs on the left, the board in the middle, outputs on the right — the same "notice → decide → act" idea from M4.

**Plan a demo slide.** Put a slide that just says "Live demo" where you'll switch to the real product — and a copy right after it with a photo or video of the demo, in case you need it (Part 3).

## 2. Body language, voice and nerves

### Body language

| Do | Why |
| --- | --- |
| Stand still with your weight on both feet | Swaying or pacing looks nervous and distracts. |
| Look at real faces — pick three people in different parts of the room and rotate | Eye contact makes each listener feel spoken to. |
| Keep your hands visible; use them to point at the slide or the product | Hidden hands look unsure; open hands look confident. |
| Face the audience, not the screen | Read nothing from the slide — you already know it. |

### Voice

**Analogy: a song.** One note for five minutes is a lullaby. A good speaker changes speed, volume and tone like a melody.

| Tool | How to use it |
| --- | --- |
| **Pace** | Slow down for the important parts — the problem and the impact. |
| **Pause** | Stop for two seconds after a key sentence. Silence makes people listen. |
| **Volume** | Speak to the back row. A little louder than feels natural is usually right. |
| **Variety** | Let your voice rise with a question and fall at the end of a statement. |
| **Fillers** | Replace "um" with a pause. Nobody notices a pause; everybody notices "um". |

**Try it (2 min).** Read the first 30 seconds of your script to a partner twice: once flat and fast, once with pace, pauses and volume. Ask which one they'd remember.

### Handling nerves

Nerves are your body getting ready — a faster heart and more energy. Almost every speaker feels them. You can't switch them off, but you can make them work for you:

| Before | During |
| --- | --- |
| Rehearse out loud at least three times — once standing up, once in front of someone. | Know your first 30 seconds by heart; after that the nerves usually settle. |
| Breathe slowly, with a longer breath out than in, for a minute before you start. | If you lose your place, pause, look at your notes, and carry on — the audience rarely notices. |
| Check the room and the equipment early. | Speak to a friendly face first. |
| Call it excitement: "I'm excited to show this", not "I'm scared". | Slow down — nerves make everyone speed up. |

## 3. Live demos — always have a backup plan

**Analogy: a magician's rehearsal.** A magician never performs a trick for the first time on stage. They've practised it a hundred times — and they always have another trick ready.

What can go wrong in an INCIPE demo — and how to prevent it:

| What can go wrong | Prevent it |
| --- | --- |
| A sensor reads −1 ("not detected" — [Wiki](/wiki)) | Plug everything in and check the Serial Monitor before you start. |
| The board isn't connected, or the Wi-Fi is different in the room | Test on the same setup, in the same room, beforehand. Bring a USB cable. |
| The code on the board is an old version | Upload the final, tested sketch the day before, and don't change it on the day. |
| The demo needs exact conditions (dry soil, darkness) | Prepare them: a pot of dry soil and a cup of water; a cloth to cover the light sensor. |
| Something just breaks | Have a backup. |

**The demo checklist:**

| # | Before you present |
| --- | --- |
| 1 | Record a 30–60 second video of the demo working. That's your backup. |
| 2 | Put the backup video (or photos) on the slide right after "Live demo". |
| 3 | Plan the **main path only**: the one thing that proves your idea — e.g. dry soil → `PUMP ON`. |
| 4 | Start from a known state: board powered, Serial Monitor open, soil dry. |
| 5 | Practise the demo out loud, including what you say while it runs. |

**If it fails live:** stay calm, say what *should* happen ("When the soil is dry, the pump switches on"), then switch to the backup: "Here's a video from yesterday's test." Audiences remember how you handled it, not that it failed.

## 4. Practice: present to a small group for peer feedback

The curriculum task: *present your product to a small group for peer feedback.* Groups of 3–4.

| Role | Job |
| --- | --- |
| Presenter | Gives the 5-minute pitch from Session 1, with slides and a demo (or its backup). |
| Timekeeper | Shows a sign at 4 minutes and stops the presenter at 5:30. |
| Listeners | Fill in the feedback form below while listening. |

Rotate until everyone has presented. Feedback uses **"glow and grow"**: one thing that worked (glow) and one specific thing to improve (grow). "It was good" helps nobody; "Your pause after the dead-plant story made me care — glow" does.

| Area | Glow (what worked) | Grow (one thing to improve) |
| --- | --- | --- |
| Story: was the user the hero? | | |
| Slides: one idea each, readable? | | |
| Voice: pace, pauses, volume? | | |
| Body: eye contact, stance, hands? | | |
| Demo: did it prove the idea? Was there a backup? | | |

Collect your forms. Pick the **two** most common "grows" and fix them before Session 3.

## Checkpoints

<details>
<summary>A slide has 80 words describing how the Smart Garden works. How do you fix it?</summary>

**Replace the paragraph with a block diagram** (probe → board → pump) and a short title, and *say* the explanation instead of writing it.
</details>

<details>
<summary>Before a demo, what do you check so a −1 reading doesn't surprise you?</summary>

**That every sensor is plugged in and gives a real value** — open the Serial Monitor and look before you start. On the Wiki, −1 means "not detected".
</details>

<details>
<summary>The demo fails in front of the class. What do you do first?</summary>

**Stay calm and say what should have happened**, then switch to your backup video or photos.
</details>

<details>
<summary>You speak too fast when you're nervous. Name one technique.</summary>

**Pause deliberately** — for example, mark pauses in your script after key sentences, and breathe out slowly before you start.
</details>

<details>
<summary>A classmate's feedback says only "It was good." How would you make it useful?</summary>

**Use glow and grow:** one specific thing that worked and one specific thing to improve, e.g. "Your block diagram made the tech clear (glow); look at the audience, not the screen (grow)."
</details>

## Recap

1. Slides support you: one idea each, few words, diagrams instead of paragraphs, and a planned demo slide with a backup right after it.
2. Your body and voice carry the story: steady stance, eye contact, pauses, variety — and nerves become energy when you've rehearsed.
3. Rehearse the demo on the real setup, show only the main path, and always have a backup video; then improve with specific glow-and-grow feedback.

**Next — Session 3: Technical presentation skills.** Explaining your sensors, code and system design to people who've never seen a circuit.

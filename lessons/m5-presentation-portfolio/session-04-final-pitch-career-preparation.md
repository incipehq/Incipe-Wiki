# Session 4: Final Pitch & Career Preparation

> **M5 Presentation Training** · Weeks 14–15
> **You'll need:** your pitch deck and script from [Sessions 1–3](/academy/m5-presentation-portfolio), your project and its code, your test plan from [M3 Session 10](/academy/m3-incipe-board-sensors-modules/20-system-integration-debugging), and a phone

## Lesson overview

**Get everything showcase-ready — the deck, the documentation, a demo video — and give the final pitch.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | Polish the pitch deck | 6 min |
| 02 | Document your project so anyone could rebuild it | 8 min |
| 03 | Make a 60–90 second demo video for your portfolio | 8 min |
| 04 | The final showcase: run of show and what panels look for | 8 min |

### Key words

| Word | Plain meaning |
| --- | --- |
| **Documentation** | Writing that explains what your project is, how it works and how to use or rebuild it. |
| **README** | The first document someone reads about a project — usually the front page of its folder. |
| **Storyboard** | A plan of a video, shot by shot, before you film. |
| **Screen recording** | A video of your computer screen, e.g. the Serial Monitor while the demo runs. |
| **Showcase** | The final event: your live pitch and demo for a panel. |
| **Panel** | The group of judges — here, instructors and industry guests. |
| **Code freeze** | Deciding that the tested version is final and not changing it again before the event. |

## 1. Polish the pitch deck

**Analogy: a car before a road trip.** You check the tyres, the fuel and the lights *before* you leave — not on the motorway. Polish now, while there's time to fix things.

| Check | Question |
| --- | --- |
| Story | Does it still follow Problem → Solution → Technology → Impact, with your user as the hero? |
| One idea each | Can you say each slide's point in one sentence? |
| Readable | Can the back row read every word? No paragraphs? |
| Real numbers | Is every number one you measured or collected? Any `[ ]` placeholder left? |
| Consistent | Same fonts, colours and title style on every slide? |
| Demo slide | Is there a "Live demo" slide, and a backup video or photos right after it? |
| Spelling | Has someone else read every slide? |
| Timing | Does a full run-through, out loud, fit in 5 minutes? |

Fix the two "grows" from your [Session 2](/academy/m5-presentation-portfolio/02-presentation-techniques) peer feedback if you haven't already.

## 2. Document your project so anyone could rebuild it

**Analogy: a recipe.** A dish you can't write down is a dish only you can cook. A good README is a recipe: what it makes, the ingredients, the steps, and how to tell it worked.

**A README for an INCIPE project:**

| Section | What to write |
| --- | --- |
| Title and one sentence | "Smart Garden — a pot that waters itself only when the soil is dry." |
| Photo | Your real build, with the modules labelled. |
| The problem | Your problem statement and HMW, and who it's for. |
| Parts list | The INCIPE modules used, linked to their [Wiki](/wiki) pages. |
| How it works | Your block diagram and flowchart, and a few sentences in plain words. |
| How to run it | Plug in the modules, open the project in INCIPE Workspace and upload it ([Connect the board](/wiki/connect-the-board)); what to expect on the Serial Monitor. |
| Calibration | Your values (e.g. `DRY_VALUE`, `WET_VALUE`, `START`, `STOP`) and how to find new ones. |
| Test results | Your test plan from M3 Session 10, with the Actual and Pass columns filled in. |
| AI usage | What the AI did, what you checked, what you changed. |
| What's next | Known limits and how you'd improve them. |

**And the code itself:** a comment at the top saying what the program does, a comment on every constant you might change, and names that explain themselves (`wetPercent`, not `wp`).

**Try it (3 min).** Swap READMEs with a partner. Could they rebuild your project from it alone? Ask them to circle the first step where they'd get stuck.

## 3. Make a 60–90 second demo video for your portfolio

The curriculum task: *create a demo video for your portfolio.* It's also your backup for the live demo.

**Analogy: a film trailer.** A trailer doesn't show the whole film — it shows the best moments, so people want to see more. Your video does the same for your project.

**Storyboard first:**

| Shot | Time | Show |
| --- | --- | --- |
| 1. Hook | 5 s | The problem in one picture — a dry, drooping plant. |
| 2. Problem | 10 s | A caption or voice-over: who has the problem and why it matters. |
| 3. Demo | 30–45 s | The main path working: dry soil → `PUMP ON` on the Serial Monitor → water flows (or the stand-in line appears). |
| 4. How it works | 15 s | Your block diagram on screen while you explain in one or two sentences. |
| 5. Close | 5 s | Project name, your name, and where to find the code. |

**Filming tips:**

| Do | Why |
| --- | --- |
| Film in landscape, with the phone propped up | Steady, wide shots look professional. |
| Light from the front, not behind | Otherwise your build is a dark shape. |
| Record the Serial Monitor as a screen recording | Viewers can read the output; phone shots of screens blur. |
| Film in a quiet room, or add captions | Many people watch without sound. |
| Cut every pause and every mistake | Short is strong — 60–90 seconds, no more. |

> **Before you publish, check every frame.** No full file paths with your name, no email addresses, no passwords or keys in a screen recording; crop or blur them. Ask before you film classmates, and don't show anyone who hasn't agreed.

Upload it where your portfolio can link to it — Session 5 builds the portfolio page.

## 4. The final showcase: run of show and what panels look for

The curriculum's final event: *live product pitch and demo to a panel of instructors and industry guests.*

**Run of show:**

| When | Do |
| --- | --- |
| The day before | Code freeze: upload the final, tested sketch. Charge everything. Rehearse the full pitch and demo twice. |
| The day before | Put the backup video and photos on the slide after "Live demo". Check the deck opens on the showcase computer. |
| On the day, early | Set up, plug in, open the Serial Monitor and check every sensor gives a real value — not −1. |
| Just before | Prepare the demo's start state (dry soil, cup of water, cloth for the light sensor). Breathe out slowly. |
| During | Pitch, demo the main path, then take questions — answer at the right level, and say "I don't know yet" rather than invent. |
| After | Write down every question the panel asked. They're your interview practice for Session 6. |

**What a panel often looks for** — your instructors may give you their own rubric; use theirs if they do:

| Area | A strong project shows… |
| --- | --- |
| Problem | A real user and a clear, evidenced problem |
| Solution | A working demo of the main path, with a backup |
| Technology | That you understand your own system — and can explain it simply |
| Testing | A test plan with real results, including edge cases like an unplugged sensor |
| Presentation | A clear story, readable slides, confident delivery |
| Honesty | What the AI did and what you did, said plainly |

**Career preparation starts here.** Everything you made for the showcase — the README, the demo video, the deck, the panel's questions — goes straight into your portfolio (Session 5), your interview prep (Session 6) and your CV (Session 7).

## Checkpoints

<details>
<summary>Your deck still has "[3] of [5] students" with the brackets in it. What do you do before the showcase?</summary>

**Replace it with your real interview numbers — or remove the claim.** Never present a placeholder or an invented number.
</details>

<details>
<summary>Your README has no "How to run it" section. Who is stuck?</summary>

**Anyone who tries to rebuild or test your project** — including a panel judge or a future employer. Add the steps: plug in the modules, open the project in INCIPE Workspace, upload, and what to expect on the Serial Monitor.
</details>

<details>
<summary>Name two things that must not be visible in a screen recording you publish.</summary>

Any two of: **a full file path with your name, an email address, a password, or a key/token.** Crop or blur them before publishing.
</details>

<details>
<summary>The morning of the showcase you think of a small code improvement. Should you upload it?</summary>

**No — code freeze.** Present the version you tested. Mention the improvement as "what's next" instead.
</details>

<details>
<summary>A judge unplugs your soil probe during the Smart Garden demo while the pump is off. What should happen?</summary>

**Nothing switches on.** A −1 reading counts as 100 % wet, so the pump stays off — that's your fail-safe from M3 Session 8, and a great moment to explain it.
</details>

## Recap

1. Polish like a pre-trip car check: story, one idea per slide, real numbers only, a demo slide with a backup, and a full timed run-through.
2. Document it like a recipe — a README that lets anyone rebuild it — and cut a 60–90 second demo video, checking every frame for private details.
3. Freeze the code the day before, check every sensor on the day, and treat the panel's questions as the start of your career prep.

**Next — Session 5: Portfolio & project showcase.** Turning your projects into a portfolio: schematics, code, UI, demo videos and project descriptions.

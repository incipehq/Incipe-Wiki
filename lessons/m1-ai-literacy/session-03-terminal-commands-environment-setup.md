# Session 3: Terminal Commands & Environment Setup

> **M1 AI Literacy** · Weeks 1–2
> **You need:** a Mac with the Terminal app. No board today.

## Lesson overview

**Talk to your computer in words, keep your projects tidy, and save every working version.**

| Part | Topic | Time |
| --- | --- | --- |
| 01 | What the terminal is | 4 min |
| 02 | Moving around: `pwd`, `ls`, `cd` | 7 min |
| 03 | Making and changing things: `mkdir`, `cp`, `mv`, `rm` | 7 min |
| 04 | A tidy project folder | 3 min |
| 05 | Git and GitHub: save points for your code | 9 min |

### Key words

| Word | Plain meaning |
| --- | --- |
| **Terminal** | An app where you type commands instead of clicking. |
| **Command** | One instruction, like `ls`. Press Return to run it. |
| **Folder (directory)** | A box that holds files and other folders. Same thing, two names. |
| **Path** | The directions to a file or folder, like `/Users/alex/incipe-projects`. |
| **Home folder** | Your own folder on the Mac. Written `~` for short. |
| **Current folder** | The folder the terminal is "standing in" right now. |
| **Git** | A tool that saves versions of your project so you can go back. |
| **Repository (repo)** | A project folder that Git is looking after. |
| **Commit** | One saved version, with a short message saying what changed. |
| **GitHub** | A website that keeps a copy of your repository online. |

## 1. What the terminal is

**Analogy: texting instead of tapping.** Finder is like tapping icons on your phone. The terminal is like sending the computer a text message: you type exactly what you want, press Return, and it answers.

Open it: press **⌘ Space**, type **Terminal**, press **Return**. You see a line like this:

```text
alex@MacBook ~ %
```

| Part | Meaning |
| --- | --- |
| `alex` | Who is signed in |
| `MacBook` | The computer's name |
| `~` | The current folder — `~` means your home folder |
| `%` | "Ready. Type a command." |

You type after the `%`. In these notes, commands are shown **without** the prompt, so you can copy them.

## 2. Moving around: `pwd`, `ls`, `cd`

**Analogy: a building.** Folders are rooms, and rooms can have rooms inside them. A **path** is the directions: `/Users/alex/incipe-projects` means "start at the front door, go into *Users*, then *alex*, then *incipe-projects*".

| Command | Say it as | What it does |
| --- | --- | --- |
| `pwd` | "print working directory" | Shows the full path of the room you are in |
| `ls` | "list" | Shows what is in this room |
| `cd name` | "change directory" | Walks into the room called `name` |
| `cd ..` | "go up" | Walks back out to the room around this one |
| `cd ~` or `cd` | "go home" | Jumps straight back to your home folder |

Follow Alex making a folder for all their INCIPE projects. Step through it:

```walkthrough
pwd
mkdir incipe-projects
cd incipe-projects
mkdir climate-reader
ls
cd climate-reader
pwd
cd ..
---
output: Terminal
1 | Where am I? A new Terminal window starts in your home folder. | you are in = /Users/alex | println: /Users/alex
2 | `mkdir` ("make directory") makes a new, empty folder here. It prints nothing when it works.
3 | Walk into the new folder. | you are in = /Users/alex/incipe-projects
4 | Make a folder for one project, inside this one.
5 | List what is here: just the folder we made. | | println: climate-reader
6 | Walk into the project folder. | you are in = /Users/alex/incipe-projects/climate-reader
7 | Check where we are. | | println: /Users/alex/incipe-projects/climate-reader
8 | `..` means "the folder around this one" — one level up. | you are in = /Users/alex/incipe-projects
```

> Your name will be different from `alex`, so your paths will be too. Everything after your name is the same.

## 3. Making and changing things

| Command | What it does | Example |
| --- | --- | --- |
| `mkdir name` | Makes a new folder | `mkdir sketches` |
| `touch name` | Makes a new, empty file | `touch notes.txt` |
| `cp from to` | **Copies** a file — the original stays | `cp notes.txt backup.txt` |
| `mv from to` | **Moves** or **renames** — the original is gone | `mv backup.txt old-notes.txt` |
| `rm name` | **Removes** (deletes) a file | `rm old-notes.txt` |

```walkthrough
touch notes.txt
cp notes.txt backup.txt
ls
mv backup.txt old-notes.txt
ls
rm old-notes.txt
ls
---
output: Terminal
1 | Make an empty file called `notes.txt` in the project folder. | files = notes.txt
2 | Copy it. Now there are two files with the same contents. | files = backup.txt, notes.txt
3 | `ls` lists them in alphabetical order. | | println: backup.txt  notes.txt
4 | `mv` with a new name **renames** the file. No copy is left behind. | files = notes.txt, old-notes.txt
5 | List again: `backup.txt` is gone, `old-notes.txt` is new. | | println: notes.txt  old-notes.txt
6 | `rm` deletes `old-notes.txt`. | files = notes.txt
7 | Only `notes.txt` is left. | | println: notes.txt
```

> **`rm` does not use the Bin.** A file you `rm` is gone for good — there is no undo. Check the name twice before you press Return. To delete a folder you need `rm -r name` ("recursive": the folder and everything in it), so be even more careful with that one.

### When it goes wrong

The terminal tells you what went wrong in one line. Read it — it is usually exact:

| You typed | It said | Why |
| --- | --- | --- |
| `cd blink` | `cd: no such file or directory: blink` | There is no folder called `blink` here. Check with `ls`. |
| `mkdir climate-reader` | `mkdir: climate-reader: File exists` | That folder is already there. |
| `rm climate-reader` | `rm: climate-reader: is a directory` | It is a folder, so plain `rm` refuses. Nothing was deleted. |

## 4. A tidy project folder

One folder for all your INCIPE work, and one folder inside it per project:

```text
incipe-projects/
  climate-reader/
    climate-reader.ino
    notes.md
    prompts.md
```

| Rule | Why |
| --- | --- |
| Lowercase words joined with `-` | A name with spaces needs quotes in the terminal: `cd "climate reader"` |
| One project per folder | Git looks after one folder at a time (Part 5) |
| Keep a `prompts.md` beside the code | The prompts that worked are worth reusing — see [Lesson 1](/academy/m1-ai-literacy/01-ai-development-workflows) |

## 5. Git and GitHub: save points for your code

**Analogy: save points in a video game.** Before the hard level you save. If it goes wrong, you load the save and try again. Git does that for your project: each **commit** is a save point with a label.

### Once per computer: tell Git who you are

Git writes your name on every save point, so set it once:

```bash
git config --global user.name "Alex Chan"
git config --global user.email "alex@example.com"
```

| Line | What it does |
| --- | --- |
| 1 | Sets the name shown on your commits. Use your own. |
| 2 | Sets the email shown on your commits. Use the one you will use for GitHub. |

### Your first save point

From inside `climate-reader`, with your sketch file saved there:

```walkthrough
git init
git status
git add climate-reader.ino
git commit -m "First version of the climate reader"
git log --oneline
---
output: Terminal
1 | Turn this folder into a repository. Git makes a hidden `.git` folder to keep its save points in. | repository = yes | println: Initialized empty Git repository in /Users/alex/incipe-projects/climate-reader/.git/
2 | Ask Git what it sees. Both files are *untracked*: Git is not saving them yet. The full answer is shown below; this is its last line. | | println: nothing added to commit but untracked files present (use "git add" to track)
3 | Choose what goes in the next save point — just the sketch. | ready to save = climate-reader.ino
4 | Make the save point, with a message saying what it is. | commits = 1; ready to save = (nothing) | println: [main (root-commit) 68f8b60] First version of the climate reader
5 | List the save points, newest first. | | println: 68f8b60 First version of the climate reader
```

| Command | What it does |
| --- | --- |
| `git init` | Starts Git in this folder. Once per project. |
| `git status` | Shows what changed and what is ready to save. Run it often. |
| `git add file` | Puts a file into the next save point. |
| `git commit -m "message"` | Makes the save point. The message says *what* changed. |
| `git log --oneline` | Lists save points, one per line. |

> The code at the start of each commit (`68f8b60`) is made from its contents, so yours will be different. Your first branch may also be called `master` instead of `main` — both are fine.

`git status` at step 2, in full:

```text
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	climate-reader.ino
	notes.txt

nothing added to commit but untracked files present (use "git add" to track)
```

### Every time after that

Change your code → `git add` the files → `git commit -m "what changed"`. Small, frequent save points beat one big one.

### GitHub: a copy online

Git keeps your save points **on your computer**. **GitHub** keeps a copy **online**, so you can work from another computer, share with your team, and show your projects in your portfolio (M5).

| Step | Do this |
| --- | --- |
| 1 | Make a GitHub account at github.com. Accounts are for ages 13 and up — check with your teacher first. |
| 2 | On GitHub, create a new, empty repository called `climate-reader`. |
| 3 | Connect your folder to it, once: `git remote add origin https://github.com/your-name/climate-reader.git` |
| 4 | Send your save points up: `git push -u origin main` (use `master` if that is your branch). |

The first push asks you to sign in to GitHub — your teacher will show you how your school does it. After that, `git push` on its own sends your new commits.

## 6. AI and the terminal

AI is good at explaining commands. It can also suggest commands that delete things. Two rules:

1. **Never run a command you cannot explain.** Ask first: *"Explain each part of this command in one line, for a beginner. Do not suggest anything else."*
2. **Be extra careful with `rm`.** If an AI suggests `rm -r` or `rm -rf`, stop and ask your teacher.

## Try it

1. Open Terminal. Run `pwd` and write down your home folder's path.
2. Make `incipe-projects`, and `climate-reader` inside it, with `mkdir` and `cd`.
3. Inside `climate-reader`, make `notes.md` and `prompts.md` with `touch`. Check with `ls`.
4. Copy `notes.md` to `notes-backup.md`, rename the copy to `old-notes.md`, then delete it. Run `ls` after each step.
5. Set your Git name and email, then `git init`, `git add notes.md prompts.md` and make your first commit. Check it with `git log --oneline`.

## Practice: set up your project home

Hand in a screenshot of your Terminal showing:

| # | Show | It proves |
| --- | --- | --- |
| 1 | `pwd` inside `climate-reader` | You can find where you are |
| 2 | `ls` with `notes.md` and `prompts.md` | You can make files and folders |
| 3 | `git log --oneline` with at least two commits | You can save versions |
| 4 | Your `prompts.md` holding one prompt from Lesson 1 or Session 2 | You keep what works |

## Checkpoints

<details>
<summary>You are in <code>/Users/alex/incipe-projects</code>. You run <code>cd climate-reader</code>, then <code>pwd</code>. What prints?</summary>

**`/Users/alex/incipe-projects/climate-reader`** — `cd` walked one folder deeper, and `pwd` prints the full path.
</details>

<details>
<summary>From <code>/Users/alex/incipe-projects/climate-reader</code> you run <code>cd ..</code> and then <code>pwd</code>. What prints?</summary>

**`/Users/alex/incipe-projects`** — `..` is one level up.
</details>

<details>
<summary>A folder holds only <code>notes.txt</code>. You run <code>cp notes.txt backup.txt</code>, then <code>mv backup.txt old-notes.txt</code>, then <code>ls</code>. What prints?</summary>

**`notes.txt  old-notes.txt`** — `cp` made `backup.txt`, then `mv` renamed it. `ls` lists in alphabetical order.
</details>

<details>
<summary>You run <code>rm climate-reader</code>, and <code>climate-reader</code> is a folder. What happens?</summary>

**It prints `rm: climate-reader: is a directory` and deletes nothing.** Plain `rm` only removes files; a folder needs `rm -r`.
</details>

<details>
<summary>You change <code>climate-reader.ino</code> and run <code>git commit -m "Add loop"</code> without <code>git add</code>. Is a save point made?</summary>

**No.** Git prints `no changes added to commit (use "git add" and/or "git commit -a")`. Nothing goes into a commit until you `git add` it.
</details>

## Recap

1. `pwd` says where you are, `ls` what is here, `cd` moves you; `..` is one level up and `~` is home.
2. `mkdir`, `cp`, `mv` and `rm` make, copy, move and delete — and `rm` has no undo.
3. Git saves versions: `git init` once, then `add` and `commit` every time; GitHub keeps a copy online.

**Next — Session 4: Command line for embedded development.** Using the terminal to compile and upload firmware.

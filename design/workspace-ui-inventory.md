# Incipe Workspace — UI inventory

Phase 1 of the Workspace app guide. Every surface a student or teacher sees in the
desktop app, with its exact on-screen labels, so the guide pages (Phase 3) and the
annotated screenshots (Phase 4) quote the app rather than paraphrase it.

**Sources.** The app's renderer source (labels resolved from the English string
catalogue) cross-checked against screenshots of a running build, 2026-10-09. Only
what the user sees is recorded here — no source paths, no firmware or protocol detail.
CSS class names are kept where a later phase may reuse the look.

**Which build this documents.** The release build (the signed `Incipe.app`). Some
features are switched on or off when the app is built; anything a student cannot
reach in the release build is left out. Guide screenshots are taken on the release
build (see the last section).

Legend for the **Gate** column: `—` always shown · `signed in` · `billing` = only
when the account has a plan.

---

## 1. Window and layout

- One window, 1440×900 by default (minimum 1060×620). On macOS the traffic lights sit
  inside the top bar.
- Every launch opens on the **landing page** (§2). Choosing a project enters the
  **workspace**: top bar (§3), notices (§4), then three columns —
  **project pane** (left, hidden until opened, §5) · **chat** (centre, §6) ·
  **one side panel** (right, optional, §7–§11).
- Only one side panel is open at a time. Every panel head has the panel title, an
  ⓘ hint, **Expand panel** / **Restore panel width** and **Close panel** (×). Expanding
  hides the chat without losing it. Panels and the project pane resize by dragging the
  divider (or ←/→ when it has focus); dragging past the minimum closes them.

| Panel | Title | ⓘ hint |
| --- | --- | --- |
| Code editor | `Editor` | Your project files and firmware code |
| Artifacts | `Artifacts` | Documents & designs the agent produced |
| Skills | `Skills` | Instruction packs the agent can load |
| Console | `Console` | Serial monitor and terminals |
| Board | `Board Connection` | Pick a port, connect and flash |

## 2. Landing page

First screen of every launch; no top bar.

| Control | Label | Shortcut | Does |
| --- | --- | --- | --- |
| Row | `New project` | ⌘N / Ctrl+N | Folder picker "Choose a folder for the new project, or create one." → **Start here** |
| Row | `Open project` | ⌘O / Ctrl+O | Folder picker "Choose the project folder." → **Open** |
| List | `Recent projects` | | Up to 6 rows (name, meta, chevron); click to open |

Empty: *Nothing yet. Open a folder to start a project. Firmware, board and chat all live in it.*
Cancelling the picker stays on the landing page.

## 3. Top bar

Left to right:

| Control | Label (tooltip) | Gate | Does |
| --- | --- | --- | --- |
| Pane icon | **Switch project** | — | Hover peeks the project pane; click docks / hides it. A dot appears when notices are waiting |
| Project name | *(active project)* | — | Where you are. In Settings: ← **Back to workspace** + `Settings` |
| Verify (magnifier) | **Verify (compile only)** · busy *Cancel compile · NN%* · *Verified* · *Verify failed* | signed in | Compiles without uploading. While busy it becomes a stop button |
| Flash (green arrow) | **Flash firmware** · *Pick a CDC port to flash.* · *Cancel flash · NN%* · *Flash complete* | signed in, USB port | Compiles and uploads over USB |
| OTA (blue arrow, replaces Flash) | **OTA update** · *Offline. OTA needs a network.* · *Cancel wireless update · NN%* · *OTA complete* | signed in, wireless port | Compiles and uploads over Wi-Fi |
| Board button | `BOARD · USB` / `BOARD · OTA` / `BOARD · SYNCING` / `BOARD · OFFLINE` | — | Opens the Board Connection panel (§10) |
| Panel toggles | **Code editor** · **Artifacts** · **Skills** · **Console** | — | Open/close that panel. Console shows a dot (*Console · agent active*) while the agent uses a terminal |

When the folder holds several sketches and none is implied, Verify/Flash/OTA first ask
**Verify which project?** / **Flash which project?** / **Update which project?** — one
row per sketch; Escape cancels.

There is no app-specific menu bar (macOS shows Electron's standard menus) and no
shortcut for Verify, Flash, Settings or the panel toggles.

## 4. Notices

A card stack under the top bar, newest in front (max 3; hover fans them out). Each card
has an action button and **Done**. Done hides the card; it stays listed in the Help
menu (§5.4) where clicking it brings it back.

| Notice | Body | Action |
| --- | --- | --- |
| `Board disconnected.` | Sensor syncing is paused; flashing and the serial monitor still work. | **Reconnect** |
| `Board found.` | Syncing sensors… | — |
| `Update available · v<n>` | | **Update now** |
| `Downloading update · NN%` | progress bar | — |
| `Restart to update` | | **Restart** |
| `Retry update` | the error | **Retry** |

Separate toast: **New firmware ready** — *It will be used automatically from your next
Verify or Flash.* Auto-dismisses after 10 s.

## 5. Project pane

### 5.1 Projects
- Heading `Projects`, with **Search projects** (magnifier; searches project names *and*
  chat titles; Escape clears, Escape again closes; no match → *No matches*) and
  **New project** (+; opens the folder picker, then the New project dialog §5.5).
- **Project row:** folder icon (expand/collapse; tinted by folder colour) · name
  (opens the project) · **New chat in &lt;project&gt;** (+, active project only) · ⋯
  menu (also right-click). Drop a chat on a row to move it there.
- **Project menu:** `Edit…` · `Open` · `New chat` · `Show deleted chats` /
  `Hide deleted chats` · folder colour swatches (No colour, copper, blue, purple, pink,
  orange, yellow, green, neutral) · `Delete`.

### 5.2 Chats (under an expanded project)
- Newest first; the open chat is highlighted. Drag to another project.
- **Chat menu (⋯ or right-click):** `Rename` (inline; Enter saves, Escape cancels) ·
  `Open` · `Delete` (moves to deleted chats).
- **Deleted chats** view: caption *Deleted chats*; menu `Restore` · `Delete permanently`
  (confirms *This cannot be undone.*). Empty: *Trash is empty*.
- Empty project: *No sessions yet*.

### 5.3 Unfiled
Chats that belong to no project, heading `Unfiled` + count. Menu: `Move to` › each
project · `Delete`. Sending a message from an unfiled chat files it into the active project.

### 5.4 Bottom block
- **Learn** — opens the Incipe YouTube channel in your browser.
- **Help** (?) — `Notices` (each waiting notice; *Show* restores it) · `What's new` *(does nothing yet)* · `Contact us` (email).
- **Account row** — avatar initials + name, `Dev` / `Admin` badge for staff accounts.
  - Signed out: **Sign in** → dialog *Use the Incipe account created for you by an
    administrator.* Fields `Email`, `Password`; **Cancel** / **Sign in**. There is no
    sign-up — accounts are created by an administrator.
  - Signed in: **Account menu** → `Settings` · `Log out`.

### 5.5 Edit project / New project dialog
Title `New project` or `Edit project`. Field **Project name**; **Source folder** button
(path, or *Add the folder Incipe can read and edit*). Buttons **Remove project**
(edit only; *The folder stays on disk*) · **Cancel** · **Create** / **Save**.
Notes: folder missing → *That folder is not where it was. Choose where it lives now…*;
folder changed → *Saving moves this project to &lt;path&gt;. Its chats come with it.*

## 6. Chat

### 6.1 Chat header
- Chat title.
- **Follow along** (eye; default on) — the app mirrors the agent: opens the compile
  console / serial monitor when it verifies, keeps the working log open, shows a live
  `+N −N` diff counter.
- **Session usage** (ring) — popover `Session usage`: `Context  <used> of <window> · NN%`
  (expands to Messages / Workspace files / Skills / Tool schemas / System prompt /
  Free space); *billing:* `Plan usage · <plan>` › and `Credits`.

### 6.2 Messages
- **Empty chat:** the mascot, **Describe it.** — *Tell Incipe what your hardware should
  do. It plans the board, writes the firmware, and asks first when something matters.*
- **Your message:** bubble + attachment chips; **Reuse this prompt** (copy icon) puts it
  back in the composer; right-click → **Edit and rewind to here** (edit, then
  **Send**; original attachments are not resent).
- **Incipe AI message:** state *Working* / *Stopped*, live diff `+N −N · N files`;
  collapsible **Working log · N steps** (read, edit, compile, flash, tool, terminal,
  think rows; reasoning under *Thinking*); the answer (Markdown, code with **Copy**,
  tables, maths, checklists); **Copy** and time under the turn.
- **Latest** button appears when you scroll up.

### 6.3 Cards the agent asks you to act on

| Card | Head | Buttons |
| --- | --- | --- |
| Edit | *Proposed edit · awaiting acceptance* / *Edit applied · applied* | **Review diff** · **Reject** · **Accept**; afterwards **View diff** |
| Approval | *Command approval required* / *Flash permission required* | Action / Target / Via / Port / Board badge (*ESP32-S3 detected* or *May not be your Incipe board*); ☐ *Auto-approve flashing to this port for this session*; **Cancel** · **Approve & run** / **Confirm & flash** |
| Plan | *&lt;title&gt; · &lt;status&gt;* | revision box *What should the plan change?* · **Revise** · **Reject** · **Approve** |
| Question | the question | option buttons (one tagged *Recommended*) or *Or describe it yourself…* |
| Several questions | *n/N* + question | **Back** · **Next** / **Skip** · **Send answers** |
| Phase gate | *Phase gate · from → to* | **Approve & continue** |
| Artifact chip | icon · title · id | opens it in Artifacts |
| Error | the error | **Retry** when retryable |

### 6.4 Composer
- Box: *Describe a change to board…* Enter sends, Shift+Enter new line. Paste or drop
  files to attach. `@` opens **Add to context**, `/` opens **Commands & skills**
  (modes + installed skills; a picked skill shows a chip *Skill · &lt;name&gt;*).
- Attachments: images, PDF, text/code/data files (`.ino .h .cpp .json .csv .md …`); up
  to 10, 10 MB each. If the chosen model can't read one: *&lt;Model&gt; can't read images…*
  + **Switch to &lt;Model&gt;**.

| Control | Label | Options |
| --- | --- | --- |
| + | **Add context** | `Attach file/image…` · `@ Mention…` · `Clear input` |
| Mode | `PLAN` / `ASK` / `AUTO` | **Plan** — Plan first, execute after approval · **Ask** — Edits apply on their own. Commands and flashing still ask. *(default)* · **Auto** — Approves for you. Deleting, flashing and shell commands still ask. |
| Model | e.g. `GLM 5.2` | Kimi K3 · Claude Opus 4.8 · Claude Sonnet 5 · GPT-5.6 Sol · GPT-5.6 Luna · GLM 5.2 *(default)* · DeepSeek V4 Pro — each shows context size and inputs; *Rate limited · …* when cooling down |
| Effort | e.g. `HIGH` | heading *Thinking effort · &lt;model&gt;*: Auto (provider default) · the model's levels (Max … Minimal) · Off |
| ↑ / ■ | **Send** / **Stop** | |

*billing:* when credits run out the composer is replaced by **AI credits need
attention** + **Top up** / **Upgrade to Max** / **View plan** / **Choose a plan**.

### 6.5 Mascot and guided tips
- The mascot sits in the empty chat, then docks beside the composer. It follows the
  pointer; tapping it changes its expression. Decorative only.
- **Guided tips** appear only when the agent decides to walk you through something:
  a highlight ring on the control plus a bubble — *Step n of N*, title, text, optional
  command with **Copy**, **What's this?** glossary, **Done**, × to dismiss. Steps tick
  themselves when the app sees them done (prompt sent, port picked, console opened,
  serial started, compiled, flashed). Anchors: Send, Board button, Flash, Console,
  Serial tab, Start.
- Glossary: **Flashing** — Copying your program onto the board's memory so it runs
  there on its own. **Serial monitor** — A live readout of the messages your board
  prints while it runs. **Port** — The USB connection your computer uses to talk to one
  specific board. **Compiling** — Translating your code into instructions the board can
  actually run.

## 7. Code editor panel

- **Top bar:** ☰ **Show/Hide explorer** · file tabs (dirty dot, problem count, × close;
  a secrets file shows a lock — *Hidden from AI*) · *Render Markdown* (Markdown files) ·
  **Show diff** / **Show code** (*No diffs to view* when the chat made none).
- **Explorer:** project folder name, **New file**, **New folder**, *Search*. Right-click:
  `New File…` · `New Folder…` · `Rename…` · `Delete`. Drag to move. Missing folder →
  **Folder not found** + **Relocate folder**.
- **Editor:** autosaves; ⌘S / Ctrl+S saves. Empty: **No file open** — *Pick one from
  the explorer.*
- **Wi-Fi secrets bar** (on `arduino_secrets.h` / `.env`): title *Wi-Fi password*,
  one field per value, show/hide eye, **Save values** — *It stays on this machine so
  the board can join your network. Incipe and the AI never see it.*
- **Diff view:** *Changes · N files · N extracts*, collapsible per file. Empty: **No
  file changes in this chat**.
- **Status bar:** `Ln X, Col Y · UTF-8 · <language> · ● N problems`.

## 8. Console panel

Tabs: **Compile** · **Serial** · **Plotter** · **Terminal**.

- **Compile** — tagged lines (`OK`, `ERR`, `WARN`, `AUTH`…), success
  `Compile OK · RAM N% · Flash N%`, RAM / FLASH meters (green < 60 %, amber 60–85 %,
  red > 85 %). Empty: **No compile output** — *Run Verify to build the sketch.*
  Signed out: *Sign in with an invited developer account before verifying.*
- **Serial** — baud (9600 · 57600 · **115200** · 921600), line ending (none · **NL** ·
  CR · NL+CR), display `TIME` `AUTO` `HEX`, **START** / **STOP**, **CLEAR**, and a send
  row *Send to board…* + **SEND**. No port: *Select the board's port in the header port
  menu to start the Serial Monitor.* Empty: **No serial data** — *Press Start to open
  the monitor.*
- **Plotter** — graphs numbers printed over serial; series chips toggle lines;
  **PAUSE** / **RESUME**, **CLEAR**. Empty: **Nothing to plot yet** — *Print numbers
  over serial and they graph here.*
- **Terminal** — one chip per terminal; **+** → `New Terminal` · `Agent shell`. Empty:
  **No terminals open** — *Start one with +.* The agent shell shows commands you
  approved.

## 9. Artifacts panel

Tabs **Library** · **Preview**.
- **Library:** *Search artifacts*, filter chips `All` `Code` `Doc` `Table` `Diagram`,
  card grid. Empty: **No artifacts yet** — *Ask for a plan or a document and it lands
  here.*
- **Preview:** ← **Back to library**, title, version menu `vN`, **Copy to clipboard**,
  **Download**. Empty: **No artifact selected**.

## 10. Board Connection panel

- **Left column:**
  - **RESCAN PORTS**.
  - `USB Serial` — one row per port; click to select (the serial monitor follows).
  - `Wireless Connection` — one row per board on your network (offline boards greyed:
    *Board is not currently advertising on this network*). Picking one turns Flash into OTA.
  - No ports: **No board connected** — *Plug the board in over USB, or scan again.*
  - Wireless card: *No wireless boards yet. Pair Incipe 01 over Bluetooth to flash it
    over Wi-Fi.* + **SET UP OTA** (or *Pair another…* + **ADD ANOTHER BOARD**) → §11.
  - `Wireless` status block (§11.2).
- **Right column:** the 3D INCIPE board — drag to tilt, scroll to zoom. Sockets `L1–L4`,
  `R1–R4`; a seated module shows `<socket> · <name>`. Offline: the board shrinks and an
  unplugged USB-C cable is drawn.
- **Module names:** IMU (Motion) · Temp (Temperature) · Joystick · SD Card (Storage) ·
  Grayscale · Colour · Servo · LED · Buzzer · Light · Air Quality · Ultrasonic (Distance) ·
  Motor · Button. Unknown → *Sensor*.
- **Connect moments:** plugging the board in plays a full-window animation —
  **Board connected · USB** — *Ports, transport and sensors live under Board in the
  header* — then it shrinks onto the Board button. Plugging a module in plays
  **Sensor connected · &lt;socket&gt; · &lt;name&gt;** with a sound. Click or Escape skips.

## 11. Wireless updates (OTA)

Public setup text is already on the Wiki (`wiki/wireless-setup.md`); the guide links
there rather than repeating it. UI labels only:

### 11.1 Setup dialog (2 steps)
1. **Set up wireless updates.** — *Keep one INCIPE-1 powered nearby…* Checks
   `BLUETOOTH` and `WI-FI` (*On* / *Off* + **Open settings**). **FIND MY BOARD** →
   *Looking for one setup board…* → **SEARCH AGAIN** on failure.
2. **Connect your board to Wi-Fi.** — `NETWORK NAME`, `PASSWORD` (show/hide).
   **CONNECT BOARD** → progress lines → **Your board is ready.** with `HOSTNAME`, `IP`,
   **DONE**. Requirements note: personal, password-protected, 2.4 GHz network; captive
   portal, enterprise, open and client-isolated networks are not supported.

### 11.2 Wireless status block
Title `Wireless` + **Refresh wireless status**. States: *Connect the board over USB to
read this.* · *Not set up for wireless updates yet.* · *Set up and on your network.* /
*Set up, but not connected to Wi-Fi.* + `HOSTNAME`. Icons **Check stored credentials**
and **Forget this network** (confirm **FORGET NETWORK** / **CANCEL**).

## 12. Skills panel

- **Library** list with **Refresh skills** and **New skill** (+); groups `Project`,
  `User`, `Built-in` (lock icon, read-only), each with `vN`.
- Main area: file select (`SKILL.md`, …), *Render Markdown*, **Add file**,
  **Audit quality** (writes an audit prompt into the composer in Plan mode),
  **Duplicate to edit** (built-in) or tier select + **Delete skill** + **Save** (yours).
  Empty: **No skill selected** — *Pick one from the list to read or edit its SKILL.md,
  or create a new one.*

## 13. Settings

Opened from Account menu › **Settings**. Left rail:

| Group | Section | Contents |
| --- | --- | --- |
| Account | **Profile** | `Email` — Your signed-in Incipe identity. · `Danger zone` — Remove this account session from this computer. **LOG OUT** |
| | **Plan & usage** | *billing:* credits left + meter, plan cards Free / Pro ($20) / Max ($50) with **INCLUDED** · **MANAGE** · **CHOOSE PRO** / **UPGRADE TO MAX**, `Usage by run` (**OPEN**, disabled), `Invoices and payment method` (**OPEN** — Stripe in browser). Billing off: *Billing is not enabled in this build.* |
| | **Invoices** | *billing:* number · date · Paid · amount |
| Application | **Appearance** | see below |
| | **Agent** | placeholder, no controls |
| | **Skills** | `Installed skills` + **REFRESH**; same list as the Skills panel |
| | **Hardware** | placeholder, no controls |
| Advanced | **Developer** | placeholder, no controls |

**Appearance**

| Row | Description | Control · default |
| --- | --- | --- |
| Interface font | The face the app is set in. Code, the serial monitor and buttons stay in JetBrains Mono. | Archivo · Inter · Outfit · Helvetica Neue — **Archivo** |
| Accent colour | One accent at a time, everywhere. Status colours never change: connected, warning, error. | Copper · Blue · Purple · Pink · Orange · Yellow · Green · Neutral — **Copper** |
| Language | The language the app speaks. Code, logs and the board's own output are never translated. | English · 繁體中文 · 简体中文 · 日本語 — **English** |
| Theme | Day is the lighter, higher-contrast appearance… | Day mode · Night mode — **Night**; disabled in the release build |
| Chrome | How much edge the app draws… | Comfy · Outline — **Comfy** |
| Reduced motion `System` | Mirrors the macOS setting | read-only switch |
| Danger zone | Return appearance to its default. Your projects are untouched. | **RESET** |

Translation covers the app chrome only; panel interiors and everything the agent writes stay English.

## 14. Keyboard shortcuts

| Keys | Where | Does |
| --- | --- | --- |
| ⌘N / ⌘O | Landing page | New / Open project |
| Enter · Shift+Enter | Composer | Send · new line |
| `@` · `/` | Composer | Add to context · Commands & skills (↑/↓, Enter or Tab, Escape) |
| ⌘S | Code editor | Save |
| ←/→ | Focused divider | Resize pane |
| Escape | Menus, dialogs, search, connect animations | Close / clear / skip |

---

## Screenshots

Reference shots of the development build were taken for this inventory (27 surfaces:
shell, each panel, console tabs, Board Connection, every menu and popover, each
Settings section, Edit project, collapsed pane). They show a personal account,
invoices and real chat titles, so **none are committed**. Guide screenshots will be
retaken in Phase 3/4 on the **release build** with a clean demo account and a demo
project (suggested: `climate-reader` with a temperature module on L1), in Night mode.

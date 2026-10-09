---
title: Read and change the code
kind: app
step: 9
order: 209
reads: The Code editor panel, explorer, tabs, saving, the diff view and the Wi-Fi secrets bar
keywords: code editor explorer file tree tabs save autosave diff show diff changes new file new folder rename secrets wifi password arduino_secrets status bar problems markdown
summary: Open the sketch in the Code editor, change a value yourself, save, and use the diff view to see everything Incipe changed in this chat.
---
*Your class agrees 28 °C is too warm to wait for. You want the warning at 26 °C. A one-number change: do it yourself.*

## Open the sketch

Click **Code editor** in the top bar.

```screen
image: /app-guide/panel-editor.jpg
alt: The Code editor panel with the explorer on the left
caption: Your app may look slightly different.
---
35, 5.9 | Show / Hide explorer | Toggle the file tree.
26.7, 6.3 | New file | Create a file in the project.
31.1, 6.3 | New folder | Create a folder.
17.2, 10.5 | Search | Filter files by name.
12.6, 15.2 | Project folder | Your files. Click one to open it in a tab.
97.4, 5.9 | Show diff | Switch to the changes Incipe made in this chat.
67.1, 53.2 | Editor | The open file. Edits save as you type.
54.8, 97.8 | Status bar | Line and column, encoding, language and problem count.
```

1. In the explorer, open the sketch (the `.ino` file).
2. Find the warning threshold, `28`, and change it to `26`. Change `27` to `25`.
3. It saves by itself. **⌘S** saves at once.
4. **Verify**, then **Flash**.

## See what changed

Click **Show diff**. Every file Incipe touched in this chat is listed with lines added and removed. Click a file to fold it. **Show code** goes back to the file. With no edits yet, it reads **No file changes in this chat**.

Right-click in the explorer for **New File…**, **New Folder…**, **Rename…** and **Delete**. Drag files to move them.

## Wi-Fi passwords stay out of the AI

A sketch that joins Wi-Fi by itself keeps the password in a secrets file such as `arduino_secrets.h`. Open it and a **Wi-Fi password** bar appears: type the value and **Save values**. The tab shows a lock: **Hidden from AI. The agent never sees these values.**

The classroom monitor does not need this: wireless uploads (next step) are set up once for the board, not in your code.

## You can now

- Find and change a value in the code yourself.
- Review every change the AI made before you trust it.

**Next:** the monitor belongs on a shelf, not on your desk on a cable. Set up wireless updates.

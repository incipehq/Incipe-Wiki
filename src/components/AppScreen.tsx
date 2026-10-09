/**
 * An annotated screenshot of the Incipe Workspace app, written in a Wiki page as a
 * fenced block:
 *
 *   ```screen
 *   image: /app-guide/top-bar.png
 *   alt: The Incipe Workspace top bar
 *   ---
 *   7.3, 50 | Switch project | Shows or hides the project pane.
 *   74.7, 50 | Verify | Compiles your code without uploading it.
 *   ```
 *
 * Above `---`: `image`, `alt` and an optional `caption`. Below it, one pin per
 * line: `x, y | Label | What it does`, where x and y are percent of the image's
 * width and height at the centre of the control. Pins are numbered in order.
 *
 * The pin is the app's own guided-tip ring (the one place the app points at its
 * UI): a hollow ring centred on the control, so the control stays visible, with
 * its number on a badge at the ring's corner. The key under the image is
 * `inc-row` / `inc-row--on`. A missing image keeps
 * the key and shows a neutral frame, so a page never breaks on an absent file.
 * See design.md §4.1.
 */
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { marked } from 'marked';

interface Pin {
  x: number;
  y: number;
  label: string;
  text: string;
}

export interface ScreenSource {
  image: string;
  alt: string;
  caption: string;
  pins: Pin[];
}

export function parseScreen(source: string): ScreenSource {
  const [head, body = ''] = source.split(/^---[ \t]*$/m);
  const meta: Record<string, string> = {};
  for (const line of head.split(/\r?\n/)) {
    const m = /^([a-z]+):\s*(.*)$/i.exec(line.trim());
    if (m) meta[m[1].toLowerCase()] = m[2].trim();
  }
  const pins: Pin[] = [];
  for (const line of body.split(/\r?\n/)) {
    const fields = line.split(' | ').map((f) => f.trim());
    const at = /^(-?[\d.]+)\s*,\s*(-?[\d.]+)$/.exec(fields[0] ?? '');
    if (!at || !fields[1]) continue;
    pins.push({ x: Number(at[1]), y: Number(at[2]), label: fields[1], text: fields.slice(2).join(' | ') });
  }
  return { image: meta.image ?? '', alt: meta.alt ?? '', caption: meta.caption ?? '', pins };
}

const inline = (text: string) => marked.parseInline(text, { async: false }) as string;

export function AppScreen({ source }: { source: string }) {
  const { image, alt, caption, pins } = parseScreen(source);
  const [on, setOn] = useState<number | null>(null);
  const [missing, setMissing] = useState(!image);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  const pick = (i: number) => {
    setOn(i);
    rows.current[i]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  // ←/→ step through the pins from anywhere inside the figure.
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.metaKey || e.ctrlKey || e.altKey || !pins.length) return;
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    pick(((on ?? (step > 0 ? -1 : 0)) + step + pins.length) % pins.length);
  };

  return (
    <figure className="wk-screen" onKeyDown={onKeyDown} aria-label={alt}>
      <div className="wk-screen-frame" data-missing={missing || undefined}>
        {missing ? (
          <div className="wk-screen-missing">
            <span className="wk-label">Screenshot coming soon</span>
            <span>{alt}</span>
          </div>
        ) : (
          <>
            <img src={image} alt={alt} loading="lazy" onError={() => setMissing(true)} />
            {pins.map((pin, i) => (
              <button
                key={i}
                type="button"
                className="wk-screen-pin"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                data-on={on === i || undefined}
                aria-label={`${i + 1}. ${pin.label}`}
                onMouseEnter={() => setOn(i)}
                onFocus={() => setOn(i)}
                onClick={() => pick(i)}
              >
                <span className="wk-screen-badge" aria-hidden="true">
                  {i + 1}
                </span>
              </button>
            ))}
          </>
        )}
      </div>

      {pins.length > 0 && (
        <ol className="wk-screen-key">
          {pins.map((pin, i) => (
            <li
              key={i}
              ref={(el) => {
                rows.current[i] = el;
              }}
              className={`wk-screen-item inc-row${on === i ? ' inc-row--on' : ''}`}
              onMouseEnter={() => setOn(i)}
            >
              <span className="wk-screen-num" aria-hidden="true">
                {i + 1}
              </span>
              <span className="wk-screen-text">
                <strong>{pin.label}</strong>
                {pin.text && <span dangerouslySetInnerHTML={{ __html: inline(pin.text) }} />}
              </span>
            </li>
          ))}
        </ol>
      )}

      {caption && <figcaption className="wk-screen-cap">{caption}</figcaption>}
    </figure>
  );
}

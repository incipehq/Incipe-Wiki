/**
 * A line-by-line code walkthrough, written in lesson Markdown as a fenced block:
 *
 *   ```walkthrough
 *   int total = 0;
 *   for (int i = 0; i < 3; i++) {
 *     total = total + i;
 *   }
 *   ---
 *   1 | `total` starts at 0. | total = 0
 *   2 | `i` starts at 0, and 0 < 3, so we go in. | i = 0
 *   3 | Add `i` to `total`. | total = 0 | prints: 0
 *   ```
 *
 * Above `---` is the code; below it, one step per line:
 * `line | one sentence | name = value; name = value | prints: text`.
 * Only the line number and the sentence are required. A variable keeps its value
 * until a step changes it, and the panel shows every value it has had
 * (`i = 0 → 1 → 2`). The last field writes to the Serial monitor pane the way
 * Arduino does: `prints:` continues the current line (`Serial.print`),
 * `println:` continues it and then ends it (`Serial.println`). Wrap the text in
 * double quotes when its leading or trailing spaces matter: `prints: "x = "`.
 * Fields are split on ` | ` — a pipe with a space either side — so `||` in a
 * sentence is safe. A line `output: Terminal` among the steps renames that pane
 * (default `Serial monitor`), for walkthroughs of shell commands.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { marked } from 'marked';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from './ui';

interface Step {
  line: number;
  text: string;
  vars: [string, string][];
  /** Text sent to the Serial monitor, and whether it ends the line. */
  prints: { text: string; newline: boolean } | null;
}

export interface WalkthroughSource {
  code: string[];
  steps: Step[];
  /** The output pane's name. */
  output: string;
}

const PLAY_MS = 1800;

export function parseWalkthrough(source: string): WalkthroughSource {
  const lines = source.replace(/\s+$/, '').split(/\r?\n/);
  const cut = lines.findIndex((line) => line.trim() === '---');
  const code = cut < 0 ? lines : lines.slice(0, cut);
  const rest = cut < 0 ? [] : lines.slice(cut + 1);
  const named = rest.find((line) => /^output:/.test(line.trim()));
  const output = named ? named.trim().replace(/^output:\s*/, '') : 'Serial monitor';
  const steps = rest
    .filter((line) => line.trim() && line !== named)
    .map((line): Step => {
      const [num, text = '', vars = '', prints = ''] = line.split(/(?<=\s)\|(?=\s)/).map((part) => part.trim());
      return {
        line: Number.parseInt(num, 10),
        text,
        vars: vars
          .split(';')
          .map((pair) => pair.trim())
          .filter(Boolean)
          .map((pair) => {
            const at = pair.indexOf('=');
            return at < 0 ? [pair, ''] : [pair.slice(0, at).trim(), pair.slice(at + 1).trim()];
          }),
        prints: parsePrints(prints),
      };
    })
    .filter((step) => Number.isFinite(step.line));
  return { code, steps, output };
}

function parsePrints(field: string): Step['prints'] {
  const m = /^(prints|println):\s?(.*)$/.exec(field);
  if (!m) return null;
  const quoted = /^"(.*)"$/.exec(m[2]);
  return { text: quoted ? quoted[1] : m[2], newline: m[1] === 'println' };
}

/** Every variable's history up to and including step `upTo`. */
function history(steps: Step[], upTo: number) {
  const trail = new Map<string, string[]>();
  const changed = new Set<string>();
  let output = '';
  steps.slice(0, upTo + 1).forEach((step, index) => {
    for (const [name, value] of step.vars) {
      const values = trail.get(name) ?? [];
      if (values[values.length - 1] !== value) values.push(value);
      trail.set(name, values);
      if (index === upTo) changed.add(name);
    }
    if (step.prints) output += step.prints.text + (step.prints.newline ? '\n' : '');
  });
  return { trail: [...trail.entries()], changed, output };
}

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export function Walkthrough({ source }: { source: string }) {
  const { code, steps, output: outputName } = useMemo(() => parseWalkthrough(source), [source]);
  const [at, setAt] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number>();
  const last = steps.length - 1;

  // Takes a step or an updater, so key repeats faster than a render still count.
  const go = useCallback(
    (to: number | ((n: number) => number)) => setAt((n) => Math.max(0, Math.min(last, typeof to === 'function' ? to(n) : to))),
    [last],
  );

  useEffect(() => {
    if (!playing) return;
    if (at >= last) {
      setPlaying(false);
      return;
    }
    timer.current = window.setTimeout(() => setAt((n) => n + 1), reduceMotion() ? PLAY_MS * 1.5 : PLAY_MS);
    return () => window.clearTimeout(timer.current);
  }, [playing, at, last]);

  if (steps.length === 0) {
    return (
      <pre>
        <code>{code.join('\n')}</code>
      </pre>
    );
  }

  const step = steps[at];
  const { trail, changed, output } = history(steps, at);
  const atEnd = at === last;

  const togglePlay = () => {
    if (playing) return setPlaying(false);
    if (atEnd) setAt(0);
    setPlaying(true);
  };

  // Arrow keys step, Home / End jump, P plays — anywhere inside the block.
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const moves: Record<string, number | ((n: number) => number)> = {
      ArrowRight: (n) => n + 1,
      ArrowLeft: (n) => n - 1,
      Home: 0,
      End: last,
    };
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'p') {
      e.preventDefault();
      togglePlay();
    } else if (e.key in moves) {
      e.preventDefault();
      setPlaying(false);
      go(moves[e.key]);
    }
  };

  return (
    <figure
      className="wk-walk"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-roledescription="code walkthrough"
      aria-label="Code walkthrough. Left and right arrow keys step through it."
    >
      <pre className="wk-walk-code">
        <code>
          {code.map((text, i) => (
            <span key={i} className="wk-walk-line" data-on={i + 1 === step.line ? 'true' : undefined}>
              <span className="wk-walk-num" aria-hidden="true">
                {i + 1}
              </span>
              <span className="wk-walk-text">{text || ' '}</span>
            </span>
          ))}
        </code>
      </pre>

      <div className="wk-walk-side">
        <p className="wk-walk-say" aria-live="polite">
          <span className="wk-label wk-label--accent">
            Line {step.line} · step {at + 1} of {steps.length}
          </span>
          <span dangerouslySetInnerHTML={{ __html: marked.parseInline(step.text, { async: false }) as string }} />
        </p>

        {trail.length > 0 && (
          <dl className="wk-walk-vars" aria-label="Variables">
            {trail.map(([name, values]) => (
              <div key={name} className="wk-walk-var" data-changed={changed.has(name) ? 'true' : undefined}>
                <dt>{name}</dt>
                <dd>
                  {values.map((value, i) => (
                    <span key={i} data-now={i === values.length - 1 ? 'true' : undefined}>
                      {i > 0 && <span className="wk-walk-arrow" aria-label="then"> → </span>}
                      {value}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {steps.some((s) => s.prints != null) && (
          <div className="wk-walk-out" aria-label={outputName}>
            <span className="wk-label">{outputName}</span>
            <pre>{output || ' '}</pre>
          </div>
        )}

        <div className="wk-walk-controls">
          <Button size="sm" variant="secondary" onClick={() => (setPlaying(false), go((n) => n - 1))} disabled={at === 0} aria-label="Previous step">
            <ChevronLeft size={13} strokeWidth={1.75} aria-hidden="true" />
            Prev
          </Button>
          <Button size="sm" variant="secondary" onClick={togglePlay} aria-pressed={playing} aria-label={playing ? 'Pause' : atEnd ? 'Replay from the start' : 'Play'}>
            {playing ? (
              <Pause size={13} strokeWidth={1.75} aria-hidden="true" />
            ) : atEnd ? (
              <RotateCcw size={13} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Play size={13} strokeWidth={1.75} aria-hidden="true" />
            )}
            {playing ? 'Pause' : atEnd ? 'Replay' : 'Play'}
          </Button>
          <Button size="sm" variant="accent" onClick={() => (setPlaying(false), go((n) => n + 1))} disabled={atEnd} aria-label="Next step">
            Next
            <ChevronRight size={13} strokeWidth={1.75} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </figure>
  );
}

import { useMemo } from 'react';
import type { MouseEvent } from 'react';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';
import { headingId } from '../wikiContent';
import { Walkthrough } from './Walkthrough';
import { AppScreen } from './AppScreen';

/** A fenced ```walkthrough or ```screen block; the captures are its kind and body. */
const BLOCK = /^```(walkthrough|screen)[ \t]*\r?\n([\s\S]*?)^```[ \t]*$/m;

// Headings get ids (`headingId`) so a page's tables can link to its sections.
function render(source: string): string {
  return marked
    .parse(source, { async: false, gfm: true })
    .replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level: string, inner: string) => `<h${level} id="${headingId(inner)}">${inner}</h${level}>`);
}

/**
 * Rendered lesson notes, on the workspace's `.md-preview__content` surface
 * (styles/markdown.css). The source is this repo's own Markdown — authored, not
 * user-submitted — so it is rendered as written, `<details>` blocks included.
 * Links to other wiki pages stay inside the app instead of reloading it.
 *
 * ```walkthrough blocks become <Walkthrough>s and ```screen blocks <AppScreen>s;
 * the Markdown between them is rendered as usual. A page without one stays a
 * single block of HTML.
 */
export function Markdown({ source }: { source: string }) {
  const parts = useMemo(() => {
    // split() with two capture groups yields [html, kind, body, html, kind, body, …].
    const split = source.split(new RegExp(BLOCK.source, 'gm'));
    if (split.length === 1) return null;
    const out: { kind: 'html' | 'walkthrough' | 'screen'; text: string }[] = [];
    for (let i = 0; i < split.length; i += 3) {
      if (split[i].trim()) out.push({ kind: 'html', text: render(split[i]) });
      if (i + 2 < split.length) out.push({ kind: split[i + 1] as 'walkthrough' | 'screen', text: split[i + 2] });
    }
    return out;
  }, [source]);
  const html = useMemo(() => (parts ? '' : render(source)), [parts, source]);
  const navigate = useNavigate();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest('a');
    const href = a?.getAttribute('href');
    if (!a || !href) return;
    if (href.startsWith('#')) {
      e.preventDefault();
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (!href.startsWith('/') || a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  if (!parts) {
    return <div className="md-preview__content wk-prose inc-selectable" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return (
    <div className="md-preview__content wk-prose inc-selectable" onClick={onClick}>
      {parts.map((part, i) =>
        part.kind === 'walkthrough' ? (
          <Walkthrough key={i} source={part.text} />
        ) : part.kind === 'screen' ? (
          <AppScreen key={i} source={part.text} />
        ) : (
          <div key={i} className="wk-md-run" dangerouslySetInnerHTML={{ __html: part.text }} />
        ),
      )}
    </div>
  );
}

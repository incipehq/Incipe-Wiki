import { useMemo } from 'react';
import type { MouseEvent } from 'react';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';
import { headingId } from '../wikiContent';
import { Walkthrough } from './Walkthrough';

/** A fenced ```walkthrough block; the capture is its body. */
const WALKTHROUGH = /^```walkthrough[ \t]*\r?\n([\s\S]*?)^```[ \t]*$/m;

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
 * ```walkthrough blocks become <Walkthrough>s; the Markdown between them is
 * rendered as usual. A page without one stays a single block of HTML.
 */
export function Markdown({ source }: { source: string }) {
  const parts = useMemo(() => {
    const split = source.split(new RegExp(WALKTHROUGH.source, 'gm'));
    return split.length === 1
      ? null
      : split.map((part, i) => (i % 2 ? { kind: 'walkthrough' as const, text: part } : { kind: 'html' as const, text: render(part) }));
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
        ) : (
          <div key={i} className="wk-md-run" dangerouslySetInnerHTML={{ __html: part.text }} />
        ),
      )}
    </div>
  );
}

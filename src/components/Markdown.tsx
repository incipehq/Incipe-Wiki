import { useMemo } from 'react';
import type { MouseEvent } from 'react';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';
import { headingId } from '../wikiContent';

/**
 * Rendered lesson notes, on the workspace's `.md-preview__content` surface
 * (styles/markdown.css). The source is this repo's own Markdown — authored, not
 * user-submitted — so it is rendered as written, `<details>` blocks included.
 * Links to other wiki pages stay inside the app instead of reloading it.
 */
export function Markdown({ source }: { source: string }) {
  // Headings get ids (`headingId`) so a page's tables can link to its sections.
  const html = useMemo(
    () =>
      marked
        .parse(source, { async: false, gfm: true })
        .replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level: string, inner: string) => `<h${level} id="${headingId(inner)}">${inner}</h${level}>`),
    [source],
  );
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

  return <div className="md-preview__content wk-prose inc-selectable" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** A Wiki page as a card: its 3D render (or glyph) on top, then what it reads. */
import { Link } from 'react-router-dom';
import { KIND_LABEL } from '../wikiContent';
import type { WikiPage } from '../wikiContent';
import { WIKI_GLYPH } from '../components/glyphs';

export function WikiCard({ page }: { page: WikiPage }) {
  const Glyph = WIKI_GLYPH[page.kind];
  return (
    <Link to={page.path} className="wk-card wk-card--wiki">
      <span className="wk-card-thumb wk-card-thumb--model">
        {page.thumbnail ? <img src={page.thumbnail} alt="" loading="lazy" /> : <Glyph size={26} strokeWidth={1.25} aria-hidden="true" />}
      </span>
      <span className="wk-card-body">
        <span className="wk-card-top">
          <span className="wk-label">{KIND_LABEL[page.kind]}</span>
          {page.identifier && <code className="wk-card-id">{page.identifier}</code>}
        </span>
        <span className="wk-card-title">{page.title}</span>
        <span className="wk-card-summary">{page.reads}</span>
      </span>
    </Link>
  );
}

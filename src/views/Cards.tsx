/** A page as a card: cover on top, then what it is. The whole card is the link. */
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { pageUnit, thumbnailOf } from '../content';
import type { Page } from '../content';
import { PAGE_GLYPH } from '../components/glyphs';

const KIND = { slides: 'Slides', video: 'Video', document: 'Document', notes: 'Notes', project: 'Project' } as const;

export function PageCard({ page }: { page: Page }) {
  const thumb = thumbnailOf(page);
  const Glyph = PAGE_GLYPH[page.type];
  return (
    <Link to={page.path} className="wk-card">
      <span className="wk-card-thumb" data-portrait={page.asset?.format === 'PDF' || page.asset?.format === 'DOCX' || undefined}>
        {thumb ? <img src={thumb} alt="" loading="lazy" /> : <Glyph size={20} strokeWidth={1.5} />}
        {page.video && (
          <span className="wk-card-play" aria-hidden="true">
            <Play size={12} strokeWidth={2} />
          </span>
        )}
      </span>
      <span className="wk-card-body">
        <span className="wk-card-top">
          <span className="wk-label">{page.lesson}</span>
          <span className="wk-card-kind">
            <Glyph size={12} strokeWidth={1.75} aria-hidden="true" />
            {page.asset?.pages != null ? `${page.asset.pages} ${pageUnit(page)}` : KIND[page.type]}
          </span>
        </span>
        <span className="wk-card-title">{page.title}</span>
        <span className="wk-card-summary">{page.summary}</span>
      </span>
    </Link>
  );
}

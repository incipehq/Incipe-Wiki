/** One page: thumbnail, download, then the rich-text notes. */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock3, Download, ExternalLink, Layers } from 'lucide-react';
import { findCourse, formatBytes, neighbours, pageUnit, thumbnailOf } from '../content';
import type { Page } from '../content';
import { Media } from '../components/Media';
import { Markdown } from '../components/Markdown';
import { ButtonAnchor, ButtonLink } from '../components/ui';

export function PageView({ page }: { page: Page }) {
  const course = findCourse(page.courseId);
  const { prev, next } = neighbours(page);
  const asset = page.asset;

  useEffect(() => {
    document.title = `${page.title} · ${course?.kind === 'module' ? course.title : 'Academy'} · Incipe Wiki`;
  }, [page, course]);

  return (
    <article className="wk-page wk-enter">
      <header className="wk-page-head">
        {/* The curriculum belongs to the Academy as a whole, so it leads back
            there — not to the bare `program` course behind it. */}
        <Link to={course && course.kind === 'module' ? course.path : '/academy'} className="wk-crumb">
          <ArrowLeft size={12} strokeWidth={1.75} aria-hidden="true" />
          {course && course.kind === 'module' ? `${course.label ? `${course.label} · ` : ''}${course.title}` : 'Academy'}
        </Link>
        <span className="wk-label wk-label--accent">{page.lesson || typeLabel(page)}</span>
        <h1>{page.title}</h1>
        {page.summary && <p>{page.summary}</p>}
        <div className="wk-facts">
          <span>{typeLabel(page)}</span>
          {asset?.pages != null && (
            <span>
              <Layers size={12} strokeWidth={1.75} aria-hidden="true" />
              {asset.pages} {pageUnit(page)}
            </span>
          )}
          {page.duration && (
            <span>
              <Clock3 size={12} strokeWidth={1.75} aria-hidden="true" />
              {page.duration}
            </span>
          )}
        </div>
      </header>

      {(asset || page.video) && (
      <div className="wk-feature">
        {(thumbnailOf(page) || page.video) && <Media page={page} />}
        {asset && (
          <div className="wk-download">
            <div className="wk-download-text">
              <strong>{asset.downloadName}</strong>
              <small>
                {asset.format} · {formatBytes(asset.bytes)}
                {asset.pages != null ? ` · ${asset.pages} ${pageUnit(page)}` : ''}
              </small>
            </div>
            {asset.format === 'PDF' && (
              <ButtonAnchor variant="secondary" href={asset.file} target="_blank" rel="noopener">
                <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                Open
              </ButtonAnchor>
            )}
            <ButtonAnchor variant="accent" href={asset.file} download={asset.downloadName}>
              <Download size={13} strokeWidth={1.75} aria-hidden="true" />
              Download {page.type === 'slides' ? 'slides' : asset.format}
            </ButtonAnchor>
          </div>
        )}
      </div>
      )}

      {page.body && (
        <section className="wk-body-text" aria-label="Notes">
          <Markdown source={page.body} />
        </section>
      )}

      <footer className="wk-page-foot">
        {prev ? (
          <ButtonLink variant="secondary" to={prev.path} className="wk-step">
            <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
            <span className="wk-step-text">Previous</span>
          </ButtonLink>
        ) : (
          <span />
        )}
        <span className="wk-spacer" />
        {next && (
          <ButtonLink variant="accent" to={next.path} className="wk-step">
            <span className="wk-step-text">Next · {next.title}</span>
            <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </ButtonLink>
        )}
      </footer>
    </article>
  );
}

function typeLabel(page: Page): string {
  return { video: 'Video', document: 'Document', notes: 'Lesson notes', slides: 'Slides' }[page.type];
}

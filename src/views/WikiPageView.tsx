/** One Wiki page: the 3D model, what it reads (the function table), then the notes. */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { marked } from 'marked';
import { APP_STEPS, KIND_LABEL, wikiNeighbours } from '../wikiContent';
import type { WikiPage } from '../wikiContent';
import { Markdown } from '../components/Markdown';
import { ModelViewer } from '../components/ModelViewer';
import { ButtonLink } from '../components/ui';

/** Inline Markdown (a `Returns:` line) to HTML. */
const inline = (text: string) => marked.parseInline(text, { async: false });

export function WikiPageView({ page }: { page: WikiPage }) {
  const { prev, next } = wikiNeighbours(page);

  useEffect(() => {
    document.title = `${page.title} · Wiki · Incipe Wiki`;
  }, [page]);

  return (
    <article className="wk-page wk-enter" data-kind={page.kind}>
      <header className="wk-page-head">
        <Link to="/wiki" className="wk-crumb">
          <ArrowLeft size={12} strokeWidth={1.75} aria-hidden="true" />
          Wiki
        </Link>
        <span className="wk-label wk-label--accent">{KIND_LABEL[page.kind]}</span>
        <h1>{page.title}</h1>
        {page.summary && <p>{page.summary}</p>}
        <div className="wk-facts">
          {page.step != null && (
            <span>
              Step {page.step} of {APP_STEPS}
            </span>
          )}
          {page.identifier && (
            <span>
              Firmware ID <code className="wk-card-id">{page.identifier}</code>
            </span>
          )}
          {page.functions.length > 0 && (
            <span>
              {page.functions.length} {page.functions.length === 1 ? 'function' : 'functions'}
            </span>
          )}
        </div>
      </header>

      {page.model && (
        <div className="wk-feature">
          <ModelViewer src={page.model} poster={page.thumbnail} label={page.title} />
        </div>
      )}

      {page.functions.length > 0 && (
        <section className="wk-section" aria-labelledby="reads">
          <h2 id="reads" className="wk-section-title">
            {page.kind === 'sensor' ? 'What it reads' : 'Functions'}
          </h2>
          <div className="wk-fn-table" role="table">
            <div className="wk-fn-row wk-fn-row--head" role="row">
              <span role="columnheader">Call</span>
              <span role="columnheader">Returns</span>
            </div>
            {page.functions.map((fn) => (
              <div key={fn.signature} className="wk-fn-row" role="row">
                <span role="cell">
                  <a className="wk-fn-name" href={`#${fn.anchor}`} onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(fn.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}>
                    <code>{fn.signature}</code>
                  </a>
                </span>
                <span role="cell" className="wk-fn-returns" dangerouslySetInnerHTML={{ __html: inline(fn.returns || '—') }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {page.body && (
        <section className="wk-body-text" aria-label="Reference">
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

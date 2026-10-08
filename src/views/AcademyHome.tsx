import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { allPages, modules, programPages, thumbnailOf } from '../content';
import { ButtonLink } from '../components/ui';

export function AcademyHome() {
  useEffect(() => {
    document.title = 'Academy · Incipe Wiki';
  }, []);
  const slides = allPages.reduce((sum, p) => sum + (p.asset?.pages ?? 0), 0);
  const start = modules[0]?.pages[0];
  const curriculum = programPages[0];

  return (
    <div className="wk-catalog wk-enter">
      <header className="wk-catalog-head">
        <span className="wk-label wk-label--accent">Incipe Academy</span>
        <h1>Academy</h1>
        <p>
          The learning curriculum for schools, module by module — M1 to M5. Open a lesson for its
          slides, a download of the original deck, and the notes, with the code ready to copy into the
          INCIPE Workspace.
        </p>
        <div className="wk-stats">
          <div className="wk-stat">
            <span className="wk-label">Modules</span>
            <strong>{modules.length}</strong>
          </div>
          <div className="wk-stat">
            <span className="wk-label">Lessons & notes</span>
            <strong>{modules.reduce((n, m) => n + m.pages.length, 0)}</strong>
          </div>
          <div className="wk-stat">
            <span className="wk-label">Slides</span>
            <strong>{slides}</strong>
          </div>
        </div>
        <div className="wk-actions">
          {start && (
            <ButtonLink variant="accent" to={start.path}>
              Start with {start.title}
              <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </ButtonLink>
          )}
          {curriculum && (
            <ButtonLink variant="secondary" to={curriculum.path}>
              <FileText size={13} strokeWidth={1.75} aria-hidden="true" />
              Read the curriculum
            </ButtonLink>
          )}
        </div>
      </header>

      <div className="wk-cards wk-cards--courses">
        {modules.map((module) => {
          const cover = module.pages.map(thumbnailOf).find(Boolean);
          return (
            <Link key={module.id} to={module.path} className="wk-card">
              <span className="wk-card-thumb">
                {cover ? <img src={cover} alt="" loading="lazy" /> : <span className="wk-card-mark">{module.label}</span>}
              </span>
              <span className="wk-card-body">
                <span className="wk-card-top">
                  <span className="wk-label">{module.label}</span>
                  <span className="wk-card-kind">
                    {module.pages.length ? `${module.pages.length} ${module.pages.length === 1 ? 'page' : 'pages'}` : 'Coming soon'}
                  </span>
                </span>
                <span className="wk-card-title">{module.title}</span>
                <span className="wk-card-summary">{module.summary}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

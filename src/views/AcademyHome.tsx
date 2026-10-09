import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { allPages, courses, modules, thumbnailOf, tracks } from '../content';
import type { Course, Track } from '../content';
import { ButtonLink } from '../components/ui';
import { PageCard } from './Cards';

/** What each course is, in a sentence. A course with no line here shows none. */
const ABOUT: Record<string, string> = {
  'Incipe 101':
    'The full program for schools, module by module — AI literacy, programming, the INCIPE Board’s sensors and modules, ideation, and presenting the project.',
  'Taster Workshop':
    'A short introduction to C++ on the INCIPE Board — from your first sketch to sensors, arrays, states and Wi-Fi.',
  'Sample Projects':
    'Four complete builds for the IA Kit, easiest first — a plant that asks for help, a universal remote, a quiz alarm and a two-board air purifier. Starter code, hints for every blank, tests and challenges.',
};

export function AcademyHome() {
  useEffect(() => {
    document.title = 'Academy · Incipe Wiki';
  }, []);
  const slides = allPages.reduce((sum, p) => sum + (p.asset?.pages ?? 0), 0);

  return (
    <div className="wk-catalog wk-enter">
      <header className="wk-catalog-head">
        <span className="wk-label wk-label--accent">Incipe Academy</span>
        <h1>Academy</h1>
        <p>
          The courses schools run on the INCIPE Board. Open a lesson for its slides, a download of the
          original deck, and the notes, with the code ready to copy into the INCIPE Workspace.
        </p>
        <div className="wk-stats">
          <div className="wk-stat">
            <span className="wk-label">Courses</span>
            <strong>{tracks.length}</strong>
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
      </header>

      {tracks.map((track) => (
        <TrackSection key={track.name} track={track} />
      ))}
    </div>
  );
}

/**
 * One course. A course of several modules shows a card per module; a course that
 * is a single module (the Taster Workshop) shows its lessons straight away.
 */
function TrackSection({ track }: { track: Track }) {
  const id = `track-${track.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const single = track.modules.length === 1 ? track.modules[0] : null;
  const start = track.modules.flatMap((m) => m.pages)[0];
  const curriculum = courses.find((c) => c.kind === 'program' && c.track === track.name)?.pages[0];
  const lessons = track.modules.reduce((n, m) => n + m.pages.length, 0);
  const unit = track.modules.every((m) => m.pages.every((p) => p.type === 'project')) ? 'project' : 'lesson';

  return (
    <section className="wk-section" aria-labelledby={id}>
      <h2 id={id} className="wk-section-title">
        {track.name}
        <span className="wk-section-sub">
          {' '}
          · {single ? `${lessons} ${unit}${lessons === 1 ? '' : 's'}` : `${track.modules.length} modules`}
        </span>
      </h2>
      {ABOUT[track.name] && <p className="wk-section-lede">{ABOUT[track.name]}</p>}
      <div className="wk-actions">
        {start && (
          <ButtonLink variant="accent" to={start.path}>
            Start with {start.lesson || start.title}
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
      {single ? (
        <div className="wk-cards">
          {single.pages.map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      ) : (
        <div className="wk-cards wk-cards--courses">
          {track.modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      )}
    </section>
  );
}

function ModuleCard({ module }: { module: Course }) {
  const cover = module.pages.map(thumbnailOf).find(Boolean);
  return (
    <Link to={module.path} className="wk-card">
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
}

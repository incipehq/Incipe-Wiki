/**
 * A module: what is in it now (its pages, as cards), then what it covers — its
 * own section of the curriculum, with each session that already has material
 * linked to it.
 */
import { useEffect, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Course } from '../content';
import { Markdown } from '../components/Markdown';
import { ButtonLink } from '../components/ui';
import { PageCard } from './Cards';

export function CourseView({ course }: { course: Course }) {
  useEffect(() => {
    document.title = `${course.label ? `${course.label} · ` : ''}${course.title} · Incipe Wiki`;
  }, [course]);
  const first = course.pages[0];
  const slides = course.pages.reduce((sum, p) => sum + (p.asset?.pages ?? 0), 0);
  const sessions = (course.curriculum.match(/\*\*Session \d+/g) ?? []).length;

  /** `**Session 11: Analog Sensors & ADC**` → a link, when Session 11 has a page. */
  const curriculum = useMemo(
    () =>
      course.curriculum.replace(/\*\*Session (\d+): ([^*]+)\*\*/g, (whole, n: string, title: string) => {
        const page = course.pages.find((p) => p.lesson.toLowerCase() === `session ${n}`);
        return page ? `**[Session ${n}: ${title.trim()}](${page.path})**` : whole;
      }),
    [course],
  );

  return (
    <div className="wk-catalog wk-enter">
      <header className="wk-catalog-head">
        <span className="wk-label wk-label--accent">
          {course.label}
          {course.meta ? ` · ${course.meta}` : ''}
        </span>
        <h1>{course.title}</h1>
        <p>{course.summary}</p>
        <div className="wk-stats">
          {sessions > 0 && (
            <div className="wk-stat">
              <span className="wk-label">Sessions</span>
              <strong>{sessions}</strong>
            </div>
          )}
          <div className="wk-stat">
            <span className="wk-label">Pages in the wiki</span>
            <strong>{course.pages.length}</strong>
          </div>
          {slides > 0 && (
            <div className="wk-stat">
              <span className="wk-label">Slides</span>
              <strong>{slides}</strong>
            </div>
          )}
        </div>
        {first && (
          <ButtonLink variant="accent" to={first.path}>
            Start with {first.lesson || first.title}
            <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </ButtonLink>
        )}
      </header>

      <section className="wk-section" aria-labelledby="materials">
        <h2 id="materials" className="wk-section-title">
          Materials
        </h2>
        {course.pages.length > 0 ? (
          <div className="wk-cards">
            {course.pages.map((page) => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>
        ) : (
          <div className="wk-placeholder">No slides or notes for this module yet. They appear here as each session is added.</div>
        )}
      </section>

      {curriculum && (
        <section className="wk-section" aria-labelledby="curriculum">
          <h2 id="curriculum" className="wk-section-title">
            Curriculum
          </h2>
          <div className="wk-curriculum">
            <Markdown source={curriculum} />
          </div>
        </section>
      )}
    </div>
  );
}

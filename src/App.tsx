/**
 * The wiki shell — the workspace's frame, two panes under one 48px bar:
 *
 *   left   the nav rail (`.wk-pane`, after `.nav-pane` / `.lms-pane`)
 *   right  the stage (`.wk-stage`, after `.sh-panel-inner`): the card surface,
 *          one hairline down the side it divides, the `inc-panel-in` entrance.
 *
 * Under 820px the rail leaves the row and becomes the workspace's PEEKED rail:
 * laid over the stage with the pop shadow, fading in and leaning out.
 */
import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { findCourse, findPage, findPageByPath } from './content';
import { findWikiPage } from './wikiContent';
import { Sidebar } from './components/Sidebar';
import { Logo } from './components/Logo';
import { Button, GrainOverlay, Tooltip } from './components/ui';
import { Landing } from './views/Landing';
import { AcademyHome } from './views/AcademyHome';
import { WikiHome } from './views/WikiHome';
import { WikiPageView } from './views/WikiPageView';
import { CourseView } from './views/CourseView';
import { PageView } from './views/PageView';

const THEME_KEY = 'incipe-wiki-theme';

function useTheme() {
  const [light, setLight] = useState(() => document.documentElement.getAttribute('data-theme') === 'beginner');
  useEffect(() => {
    const root = document.documentElement;
    if (light) root.setAttribute('data-theme', 'beginner');
    else root.removeAttribute('data-theme');
    try {
      localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
    } catch {
      /* Private windows: the choice just does not persist. */
    }
  }, [light]);
  return [light, () => setLight((v) => !v)] as const;
}

export function App() {
  const [light, toggleTheme] = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const stage = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  // A new page starts at its top, like any other document.
  useEffect(() => {
    stage.current?.scrollTo({ top: 0 });
  }, [pathname]);

  const closeNav = () => {
    if (!navOpen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setNavOpen(false);
    setClosing(true);
    window.setTimeout(() => {
      setNavOpen(false);
      setClosing(false);
    }, 200);
  };

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeNav();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="wk-root">
      <header className="wk-topbar">
        <Button
          icon
          variant="ghost"
          size="sm"
          className="wk-menu"
          aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={navOpen}
          aria-pressed={navOpen}
          onClick={() => (navOpen ? closeNav() : setNavOpen(true))}
        >
          {navOpen ? <X size={15} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={15} strokeWidth={1.75} aria-hidden="true" />}
        </Button>
        {/* The logo names the section you are in, so the crumb beside it starts
            one level below — it never repeats "Wiki" or "Academy". */}
        <Link to="/" className="wk-brand" aria-label="Incipe Wiki home">
          <Logo className="wk-logo" variant={pathname.startsWith('/academy') ? 'academy' : 'wiki'} />
        </Link>
        <span className="wk-vdiv" aria-hidden="true" />
        <Crumb />
        <span className="wk-spacer" />
        <Tooltip label={light ? 'Dark theme' : 'Light theme'} below>
          <Button icon variant="ghost" size="sm" aria-label={light ? 'Switch to the dark theme' : 'Switch to the light theme'} onClick={toggleTheme}>
            {light ? <Moon size={14} strokeWidth={1.75} aria-hidden="true" /> : <Sun size={14} strokeWidth={1.75} aria-hidden="true" />}
          </Button>
        </Tooltip>
      </header>

      <div className="wk-body">
        <div className="wk-nav" data-open={navOpen || undefined} data-closing={closing || undefined}>
          <Sidebar onNavigate={closeNav} />
        </div>
        {navOpen && <div className="wk-scrim" onClick={closeNav} aria-hidden="true" />}

        <main ref={stage} className="wk-stage">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/wiki" element={<WikiHome />} />
            <Route path="/wiki/:pageId" element={<WikiRoute />} />
            <Route path="/academy" element={<AcademyHome />} />
            <Route path="/academy/:courseId" element={<CourseRoute />} />
            <Route path="/academy/:courseId/:pageId" element={<PageRoute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <GrainOverlay />
    </div>
  );
}

function WikiRoute() {
  const { pageId } = useParams();
  const page = findWikiPage(pageId);
  return page ? <WikiPageView key={page.id} page={page} /> : <NotFound />;
}

/** `/academy/<module>`, or a program page that sits at the Academy's top level (`/academy/curriculum`). */
function CourseRoute() {
  const { courseId } = useParams();
  const course = findCourse(courseId);
  if (course?.kind === 'module') return <CourseView key={course.id} course={course} />;
  const page = findPageByPath(`/academy/${courseId}`);
  return page ? <PageView key={page.id} page={page} /> : <NotFound />;
}

function PageRoute() {
  const { courseId, pageId } = useParams();
  const page = findPage(courseId, pageId);
  return page ? <PageView key={page.id} page={page} /> : <NotFound />;
}

/**
 * Where you are, in the bar — the workspace header's `.sh-crumb`. The section
 * itself is the logo's job, so the crumb starts below it, and a section's home
 * shows none.
 */
function Crumb() {
  const { pathname } = useLocation();
  const [section, first, second] = pathname.split('/').filter(Boolean);
  if (section === 'wiki') {
    const page = findWikiPage(first);
    return page ? (
      <span className="wk-crumbbar">
        <b>{page.title}</b>
      </span>
    ) : null;
  }
  if (section === 'academy') {
    const course = findCourse(first);
    if (course?.kind === 'module') {
      const page = findPage(first, second);
      const moduleLabel = `${course.label} · ${course.title}`;
      return (
        <span className="wk-crumbbar">
          {page ? <Link to={course.path}>{moduleLabel}</Link> : <b>{moduleLabel}</b>}
          {page && (
            <>
              <span aria-hidden="true">/</span>
              <b>{page.lesson || page.title}</b>
            </>
          )}
        </span>
      );
    }
    const page = findPageByPath(pathname);
    return page ? (
      <span className="wk-crumbbar">
        <b>{page.title}</b>
      </span>
    ) : null;
  }
  return null;
}

function NotFound() {
  useEffect(() => {
    document.title = 'Not found · Incipe Wiki';
  }, []);
  return (
    <div className="inc-empty">
      <span className="inc-empty-title">This page is not in the wiki</span>
      <span className="inc-empty-hint">It may have been moved or renamed. Start again from the Wiki or the Academy.</span>
      <Link to="/" className="inc-btn inc-btn--secondary inc-empty-action">
        Back to the start
      </Link>
    </div>
  );
}

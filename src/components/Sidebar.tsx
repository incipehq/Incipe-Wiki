/**
 * The left rail — the workspace NavPane's frame (`nav-pane` recipe: opaque
 * ground, one hairline on the side it divides, the `inc-nav-in` entrance) and
 * its one row recipe, `inc-row` / `inc-row--on`.
 *
 * Two tabs head it, one per half of the site:
 *   Wiki     — the board, the guides, the Workspace app guide, every sensor and module
 *   Academy  — the courses: a module switcher (grouped by course — Incipe 101,
 *              Taster Workshop), then that module's pages
 * Under them is the section you are in. On the landing page, which belongs to
 * neither, the rail keeps the section you were last in. The search box searches
 * the section it sits in.
 *
 * Each tab remembers the last page you read in its section, so switching Wiki →
 * Academy → Wiki lands where you left off. Pressing the tab you are already in
 * goes to that section's home.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Check, ChevronsUpDown, GraduationCap, LayoutList, Library, Search, X } from 'lucide-react';
import { modules, tracks } from '../content';
import type { Course, Page } from '../content';
import { WIKI_GROUPS, searchWiki, wikiPages } from '../wikiContent';
import type { WikiPage } from '../wikiContent';
import { PAGE_GLYPH, WIKI_GLYPH } from './glyphs';
import { ClipText } from './ui';

type Section = 'wiki' | 'academy';

const LAST_MODULE_KEY = 'incipe-wiki-module';
const LAST_SECTION_KEY = 'incipe-wiki-section';
const LAST_PATH_KEY: Record<Section, string> = { wiki: 'incipe-wiki-path-wiki', academy: 'incipe-wiki-path-academy' };
const SECTION_ROOT: Record<Section, string> = { wiki: '/wiki', academy: '/academy' };
/** Matches `.inc-pop[data-closing]`'s fade (`--dur-1`). */
const EXIT_MS = 90;

function readStore(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStore(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Not persisting is fine. */
  }
}

function matches(page: Page, query: string): boolean {
  const haystack = `${page.title} ${page.lesson} ${page.summary} ${page.body}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

function sectionOf(pathname: string): Section | null {
  return pathname.startsWith('/wiki') ? 'wiki' : pathname.startsWith('/academy') ? 'academy' : null;
}

/** A stored path, if it still belongs to its section; else the section's home. */
function readPath(section: Section): string {
  const stored = readStore(LAST_PATH_KEY[section]);
  return stored && sectionOf(stored) === section ? stored : SECTION_ROOT[section];
}

/** The last page read in each section (path + query, so a Wiki search comes back too). */
function useLastPaths(): Record<Section, string> {
  const { pathname, search } = useLocation();
  const [paths, setPaths] = useState<Record<Section, string>>(() => ({ wiki: readPath('wiki'), academy: readPath('academy') }));
  useEffect(() => {
    const section = sectionOf(pathname);
    if (!section) return;
    const path = pathname + search;
    setPaths((current) => (current[section] === path ? current : { ...current, [section]: path }));
    writeStore(LAST_PATH_KEY[section], path);
  }, [pathname, search]);
  return paths;
}

function useSection(): Section {
  const { pathname } = useLocation();
  const routed = sectionOf(pathname);
  const [last, setLast] = useState<Section>(() => (readStore(LAST_SECTION_KEY) === 'academy' ? 'academy' : 'wiki'));
  useEffect(() => {
    if (routed && routed !== last) {
      setLast(routed);
      writeStore(LAST_SECTION_KEY, routed);
    }
  }, [routed, last]);
  return routed ?? last;
}

function useCurrentModule(): Course {
  const { pathname } = useLocation();
  const id = pathname.startsWith('/academy/') ? pathname.split('/')[2] : undefined;
  const routed = modules.find((m) => m.id === id);
  const [last, setLast] = useState<string | null>(() => readStore(LAST_MODULE_KEY));
  useEffect(() => {
    if (!routed || routed.id === last) return;
    setLast(routed.id);
    writeStore(LAST_MODULE_KEY, routed.id);
  }, [routed, last]);
  return routed ?? modules.find((m) => m.id === last) ?? modules[0];
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const section = useSection();
  const lastPaths = useLastPaths();
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const q = query.trim();

  // A query belongs to the section it was typed in.
  useEffect(() => setQuery(''), [section]);

  /** Empty the box and keep the caret in it, so the next query can be typed straight away. */
  const clear = () => {
    setQuery('');
    input.current?.focus();
  };

  return (
    <nav className="wk-pane" aria-label="Wiki">
      <div className="wk-pane-inner">
        <div className="wk-tabs" role="tablist" aria-label="Section">
          <SectionTab
            to={section === 'wiki' ? SECTION_ROOT.wiki : lastPaths.wiki}
            active={section === 'wiki'}
            icon={Library}
            label="Wiki"
            onNavigate={onNavigate}
          />
          <SectionTab
            to={section === 'academy' ? SECTION_ROOT.academy : lastPaths.academy}
            active={section === 'academy'}
            icon={GraduationCap}
            label="Academy"
            onNavigate={onNavigate}
          />
        </div>

        <div className="wk-search">
          <div className="inc-search" data-filled={query !== '' || undefined}>
            {query === '' && (
              <span className="inc-search-glyph" aria-hidden="true">
                <Search size={13} strokeWidth={1.75} />
              </span>
            )}
            <input
              ref={input}
              className="inc-input inc-input--sm inc-search-input"
              type="text"
              enterKeyHint="search"
              autoComplete="off"
              spellCheck={false}
              placeholder={section === 'wiki' ? 'Search sensors' : 'Search lessons'}
              aria-label={section === 'wiki' ? 'Search sensors and modules' : 'Search all modules'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && clear()}
            />
            {query !== '' && (
              <button type="button" className="inc-row-action inc-search-clear" aria-label="Clear search" onClick={clear}>
                <X size={12} strokeWidth={1.75} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {section === 'wiki' ? <WikiRail query={q} onNavigate={onNavigate} /> : <AcademyRail query={q} onNavigate={onNavigate} />}
      </div>
    </nav>
  );
}

function SectionTab({
  to,
  active,
  icon: Icon,
  label,
  onNavigate,
}: {
  to: string;
  active: boolean;
  icon: typeof Library;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end
      role="tab"
      aria-selected={active}
      onClick={onNavigate}
      className={() => `wk-row wk-tab inc-row${active ? ' inc-row--on' : ''}`}
    >
      <span className="wk-row-glyph" aria-hidden="true">
        <Icon size={14} strokeWidth={1.75} />
      </span>
      <span className="wk-row-title">{label}</span>
    </NavLink>
  );
}

/* ── Wiki ── */

function WikiRail({ query, onNavigate }: { query: string; onNavigate?: () => void }) {
  const results = useMemo(() => (query ? searchWiki(query) : null), [query]);
  return (
    <div className="wk-list" role="list" aria-label="Wiki pages">
      {results ? (
        <>
          {results.length === 0 && <div className="wk-empty">Nothing matches “{query}”.</div>}
          {results.map((page) => (
            <WikiRow key={page.id} page={page} onNavigate={onNavigate} />
          ))}
        </>
      ) : (
        WIKI_GROUPS.map((group) => (
          <section key={group.title} className="wk-group" aria-label={group.title}>
            <span className="wk-group-head">
              <span className="wk-group-title">{group.title}</span>
            </span>
            {wikiPages
              .filter((p) => group.kinds.includes(p.kind))
              .map((page) => (
                <WikiRow key={page.id} page={page} onNavigate={onNavigate} />
              ))}
          </section>
        ))
      )}
    </div>
  );
}

function WikiRow({ page, onNavigate }: { page: WikiPage; onNavigate?: () => void }) {
  const Glyph = WIKI_GLYPH[page.kind];
  return (
    <NavLink to={page.path} end onClick={onNavigate} className={({ isActive }) => `wk-row inc-row${isActive ? ' inc-row--on' : ''}`}>
      <span className="wk-row-glyph" aria-hidden="true">
        <Glyph size={13} strokeWidth={1.75} />
      </span>
      <ClipText className="wk-row-title">{page.title}</ClipText>
      {page.step != null && <span className="wk-row-meta">{page.step}</span>}
      {page.identifier && page.identifier.length <= 14 && <span className="wk-row-meta">{page.identifier}</span>}
    </NavLink>
  );
}

/* ── Academy ── */

function AcademyRail({ query, onNavigate }: { query: string; onNavigate?: () => void }) {
  const current = useCurrentModule();
  const results = useMemo(() => {
    if (!query) return [];
    return modules
      .map((m) => ({ title: m.title, label: m.label, pages: m.pages.filter((p) => matches(p, query)) }))
      .filter((group) => group.pages.length);
  }, [query]);

  if (query) {
    return (
      <div className="wk-list">
        {results.length === 0 && <div className="wk-empty">Nothing matches “{query}”.</div>}
        {results.map((group) => (
          <section key={group.title} className="wk-group" aria-label={group.title}>
            <span className="wk-group-head">
              <span className="wk-tag">{group.label}</span>
              <ClipText className="wk-group-title">{group.title}</ClipText>
            </span>
            {group.pages.map((page) => (
              <PageRow key={page.id} page={page} onNavigate={onNavigate} />
            ))}
          </section>
        ))}
      </div>
    );
  }

  return (
    <>
      <ModuleSwitcher current={current} onNavigate={onNavigate} />
      <div className="wk-list" role="list" aria-label={`${current.label} ${current.title}`}>
        <NavLink to={current.path} end onClick={onNavigate} className={({ isActive }) => `wk-row inc-row${isActive ? ' inc-row--on' : ''}`}>
          <span className="wk-row-glyph" aria-hidden="true">
            <LayoutList size={13} strokeWidth={1.75} />
          </span>
          <span className="wk-row-title">Overview</span>
        </NavLink>
        {current.pages.map((page) => (
          <PageRow key={page.id} page={page} onNavigate={onNavigate} />
        ))}
        {current.pages.length === 0 && <div className="wk-empty">No slides or notes yet. The overview lists this module’s sessions.</div>}
      </div>
    </>
  );
}

function PageRow({ page, onNavigate }: { page: Page; onNavigate?: () => void }) {
  const Glyph = PAGE_GLYPH[page.type];
  return (
    <NavLink to={page.path} end onClick={onNavigate} className={({ isActive }) => `wk-row inc-row${isActive ? ' inc-row--on' : ''}`}>
      <span className="wk-row-glyph" aria-hidden="true">
        <Glyph size={13} strokeWidth={1.75} />
      </span>
      <ClipText className="wk-row-title">{page.title}</ClipText>
      {page.lesson && <span className="wk-row-meta">{shortLesson(page.lesson)}</span>}
    </NavLink>
  );
}

/**
 * The current module, and the way to the others. The workspace's menu grammar:
 * it opens on press, picks on release, and fades out rather than cutting.
 */
function ModuleSwitcher({ current, onNavigate }: { current: Course; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const close = () => {
    if (!open) return;
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, EXIT_MS);
  };
  const toggle = () => (open ? close() : setOpen(true));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  });

  const choose = (module: Course) => {
    close();
    navigate(module.path);
    onNavigate?.();
  };

  const weeks = current.meta.split(' · ').find((s) => s.startsWith('Week'));

  return (
    <div ref={wrap} className="wk-switch-wrap">
      <span className="wk-label wk-switch-label">{current.track || 'Module'}</span>
      <button
        type="button"
        className="wk-switch"
        aria-haspopup="menu"
        aria-expanded={open}
        onPointerDown={(e) => e.button === 0 && toggle()}
        onClick={(e) => e.detail === 0 && toggle()}
      >
        <span className="wk-tag">{current.label}</span>
        <span className="wk-switch-text">
          <ClipText className="wk-switch-title">{current.title}</ClipText>
          <span className="wk-switch-meta">
            {current.pages.length} {current.pages.length === 1 ? 'page' : 'pages'}
            {weeks ? ` · ${weeks}` : ''}
          </span>
        </span>
        <ChevronsUpDown size={14} strokeWidth={1.75} className="wk-switch-caret" aria-hidden="true" />
      </button>

      {open && (
        <div className="inc-pop wk-switch-menu" role="menu" aria-label="Modules" data-closing={closing || undefined}>
          {tracks.map((track) => (
            <div key={track.name} role="group" aria-label={track.name}>
              {tracks.length > 1 && (
                <span className="wk-group-head" aria-hidden="true">
                  <span className="wk-group-title">{track.name}</span>
                </span>
              )}
              {track.modules.map((module) => (
                <button key={module.id} type="button" role="menuitem" className="inc-mi wk-switch-item" onClick={() => choose(module)}>
                  <span className="wk-tag">{module.label}</span>
                  <span className="wk-switch-item-title">{module.title}</span>
                  <span className="wk-switch-item-count">{module.pages.length || ''}</span>
                  {module.id === current.id ? (
                    <Check className="inc-mi-check" size={13} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <span className="wk-switch-item-gap" />
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** `Lesson 3` → `L3`, `Session 11` → `S11`, `Project 2` → `P2`; anything else is kept as written. */
function shortLesson(lesson: string): string {
  const m = /^(Lesson|Session|Project)\s+(\d+)$/i.exec(lesson);
  return m ? `${m[1][0].toUpperCase()}${m[2]}` : lesson;
}

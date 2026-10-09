/**
 * The Wiki home: getting the board running, the Workspace app guide, then every
 * sensor and module —
 * searchable by name, firmware identifier, function or what it measures.
 * The query and the filter live in the URL, so a search can be shared.
 */
import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { WIKI_GROUPS, searchWiki, wikiPages } from '../wikiContent';
import type { WikiKind } from '../wikiContent';
import { WikiCard } from './WikiCards';

const FILTERS: { value: string; label: string; kinds: WikiKind[] | null }[] = [
  { value: 'all', label: 'All', kinds: null },
  { value: 'sensor', label: 'Sensors', kinds: ['sensor'] },
  { value: 'module', label: 'Modules', kinds: ['module'] },
  { value: 'guide', label: 'Guides', kinds: ['board', 'guide'] },
  { value: 'app', label: 'App', kinds: ['app'] },
];

const SUGGESTIONS = ['temperature', 'distance', 'DHT11', 'getPPM', 'motor', 'infrared'];

export function WikiHome() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const filter = FILTERS.find((f) => f.value === params.get('kind')) ?? FILTERS[0];
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Wiki · Incipe Wiki';
  }, []);

  // `/` focuses the search from anywhere on the page, like most docs sites.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest('input, textarea, [contenteditable]');
      if (e.key === '/' && !typing) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const set = (next: { q?: string; kind?: string }) => {
    const p = new URLSearchParams(params);
    for (const [key, value] of Object.entries(next)) {
      if (!value || value === 'all') p.delete(key);
      else p.set(key, value);
    }
    setParams(p, { replace: true });
  };

  const scope = useMemo(() => (filter.kinds ? wikiPages.filter((p) => filter.kinds!.includes(p.kind)) : wikiPages), [filter]);
  const results = useMemo(() => searchWiki(query, scope), [query, scope]);
  const searching = query.trim() !== '' || filter.value !== 'all';

  return (
    <div className="wk-catalog wk-enter">
      <header className="wk-catalog-head">
        <span className="wk-label wk-label--accent">INCIPE Board & modules</span>
        <h1>Wiki</h1>
        <p>
          How to connect and set up the INCIPE Board, how to use the INCIPE Workspace app, and every
          sensor and module the board takes — the exact firmware functions to call and the data each
          one returns.
        </p>

        <div className="wk-finder">
          <div className="inc-search wk-finder-field" data-filled={query !== '' || undefined}>
            {query === '' && (
              <span className="inc-search-glyph" aria-hidden="true">
                <Search size={15} strokeWidth={1.75} />
              </span>
            )}
            <input
              ref={input}
              className="inc-input inc-search-input"
              type="text"
              enterKeyHint="search"
              autoComplete="off"
              spellCheck={false}
              placeholder="Search sensors — name, DHT11, getDistance, temperature…"
              aria-label="Search sensors and modules"
              value={query}
              onChange={(e) => set({ q: e.target.value })}
              onKeyDown={(e) => e.key === 'Escape' && set({ q: '' })}
            />
            {query !== '' && (
              <button
                type="button"
                className="inc-row-action inc-search-clear"
                aria-label="Clear search"
                onClick={() => {
                  set({ q: '' });
                  input.current?.focus();
                }}
              >
                <X size={13} strokeWidth={1.75} aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="inc-seg wk-finder-filter" role="radiogroup" aria-label="Show">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                role="radio"
                aria-checked={f === filter}
                className="inc-seg-item"
                data-on={f === filter}
                onClick={() => f !== filter && set({ kind: f.value })}
              >
                {f.label}
              </button>
            ))}
          </div>
          {!query && (
            <div className="wk-finder-suggest">
              <span className="wk-label">Try</span>
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" className="wk-chip" onClick={() => set({ q: s })}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {searching ? (
        <section className="wk-section" aria-live="polite" aria-labelledby="results">
          <h2 id="results" className="wk-section-title">
            {results.length} {results.length === 1 ? 'result' : 'results'}
            {query.trim() && <span className="wk-section-sub"> for “{query.trim()}”</span>}
          </h2>
          {results.length ? (
            <div className="wk-cards">
              {results.map((page) => (
                <WikiCard key={page.id} page={page} />
              ))}
            </div>
          ) : (
            <div className="wk-placeholder">
              Nothing matches “{query.trim()}”. Try what it measures — <em>distance</em>, <em>gas</em>,{' '}
              <em>colour</em> — or a firmware function such as <code>getTemperature</code>.
            </div>
          )}
        </section>
      ) : (
        WIKI_GROUPS.map((group) => {
          const pages = wikiPages.filter((p) => group.kinds.includes(p.kind));
          return (
            <section key={group.title} className="wk-section" aria-labelledby={`g-${group.title}`}>
              <h2 id={`g-${group.title}`} className="wk-section-title">
                {group.title}
                <span className="wk-section-sub"> · {pages.length}</span>
              </h2>
              <div className="wk-cards">
                {pages.map((page) => (
                  <WikiCard key={page.id} page={page} />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}

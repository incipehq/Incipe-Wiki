/**
 * The front door. Two halves of one product: the Wiki (how to work with the
 * INCIPE Board and its sensors) and the Academy (the curriculum schools run on
 * it).
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Library } from 'lucide-react';
import { allPages, modules, tracks } from '../content';
import { wikiPages } from '../wikiContent';

export function Landing() {
  useEffect(() => {
    document.title = 'Incipe Wiki';
  }, []);
  const sensors = wikiPages.filter((p) => p.kind === 'sensor').length;
  const others = wikiPages.filter((p) => p.kind === 'actuator' || p.kind === 'module').length;
  const lessons = modules.reduce((n, m) => n + m.pages.length, 0);
  const board = wikiPages.find((p) => p.kind === 'board');

  return (
    <div className="wk-catalog wk-enter">
      <header className="wk-catalog-head">
        <span className="wk-label wk-label--accent">Incipe</span>
        <h1>Incipe Wiki</h1>
        <p>
          Everything for building with the INCIPE Board: how to connect and set it up, what every
          sensor and module does in code, and the Academy curriculum schools teach with it.
        </p>
      </header>

      <div className="wk-doors">
        <Link to="/wiki" className="wk-door">
          <span className="wk-door-art">
            {board?.thumbnail ? <img src={board.thumbnail} alt="" /> : <Library size={28} strokeWidth={1.25} />}
          </span>
          <span className="wk-door-body">
            <span className="wk-door-head">
              <Library size={15} strokeWidth={1.75} aria-hidden="true" />
              <span className="wk-door-title">Wiki</span>
            </span>
            <span className="wk-door-text">
              Connect the board, set up Wi-Fi, and look up any sensor — the exact firmware functions and
              the data each one returns.
            </span>
            <span className="wk-door-meta">
              {sensors} sensors · {others} actuators & modules
              <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </span>
        </Link>

        <Link to="/academy" className="wk-door">
          <span className="wk-door-art">
            {allPages.find((p) => p.asset?.thumbnail)?.asset?.thumbnail ? (
              <img src={allPages.find((p) => p.asset?.thumbnail)!.asset!.thumbnail!} alt="" />
            ) : (
              <GraduationCap size={28} strokeWidth={1.25} />
            )}
          </span>
          <span className="wk-door-body">
            <span className="wk-door-head">
              <GraduationCap size={15} strokeWidth={1.75} aria-hidden="true" />
              <span className="wk-door-title">Academy</span>
            </span>
            <span className="wk-door-text">
              Two courses for schools — Incipe 101, the full curriculum from M1 to M5, and the Taster
              Workshop — with slides to download, lesson notes and the real-life projects.
            </span>
            <span className="wk-door-meta">
              {tracks.length} courses · {lessons} lessons & notes
              <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}

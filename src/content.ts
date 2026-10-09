/**
 * The wiki's content model, read at build time from content/.
 *
 *   content/<module>/index.md      — a module: title, label (M1…), track (the
 *                                    Academy course it belongs to — Incipe 101,
 *                                    Taster Workshop), order, meta, summary,
 *                                    curriculum (which section of
 *                                    curriculum/learning-curriculum.md it is)
 *   content/<module>/<page>.md     — a page: title, lesson, type (slides, video,
 *                                    document, notes, project), summary,
 *                                    source (a deck under raw/), pdf (the same deck
 *                                    as PDF, read in the page), video (YouTube id),
 *                                    body (a Markdown file elsewhere in the repo —
 *                                    lessons/…, curriculum/… — used as the notes)
 *
 * `content/program/` is not a module: its page (the full curriculum) is reached
 * from the Academy home's "Read the curriculum", at `/academy/curriculum`.
 *
 * Files sort by name, so a numeric prefix (`01-…`) sets the order. Everything a
 * page's `source:` produces — the download, its cover thumbnail, its size and
 * slide count — comes from src/generated/assets.json, written by `npm run ingest`.
 */
import assetIndex from './generated/assets.json';

export type PageType = 'slides' | 'video' | 'document' | 'notes' | 'project';

export interface Asset {
  file: string;
  /** A PDF of the deck to read in the page, when there is one. */
  viewer?: string | null;
  downloadName: string;
  format: string;
  bytes: number;
  pages: number | null;
  thumbnail: string | null;
}

export interface Page {
  id: string;
  courseId: string;
  path: string;
  title: string;
  lesson: string;
  type: PageType;
  summary: string;
  duration: string | null;
  video: string | null;
  body: string;
  asset: Asset | null;
}

export interface Course {
  id: string;
  kind: 'module' | 'program';
  path: string;
  title: string;
  label: string;
  /** The Academy course this module belongs to: `Incipe 101`, `Taster Workshop`. */
  track: string;
  meta: string;
  summary: string;
  order: number;
  body: string;
  /** This module's own section of the curriculum, cut from the curriculum file. */
  curriculum: string;
  pages: Page[];
}

const assets = assetIndex as Record<string, Asset>;

const files = import.meta.glob('/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/** Markdown kept outside content/ that a page can name as its `body:`. */
const included = import.meta.glob(['/lessons/**/*.md', '/curriculum/**/*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const CURRICULUM = '/curriculum/learning-curriculum.md';

/** A leading `# Title` is the page's title, not part of its notes. */
function splitTitle(markdown: string): { title: string | null; body: string } {
  const m = /^#\s+(.+)\r?\n/.exec(markdown.trimStart());
  if (!m) return { title: null, body: markdown.trim() };
  return { title: m[1].trim(), body: markdown.trimStart().slice(m[0].length).trim() };
}

/** A heading that opens a module or a part — the only thing that ends a section. */
const SECTION_START = /^(M\d|Part\s)/i;

/**
 * One section of the curriculum: from the first heading whose text contains
 * `needle` to the next MODULE or PART heading (`M5: …`, `Part D …`) at the same
 * level or any heading above it. A same-level heading that is neither — M4's
 * `#### Option 1: Robotics` — belongs to the section, one level down. Headings
 * move up so the section reads as a document of its own.
 */
export function curriculumSection(needle: string): string {
  const source = included[CURRICULUM];
  if (!source || !needle) return '';
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex((line) => /^#{1,6}\s/.test(line) && line.toLowerCase().includes(needle.toLowerCase()));
  if (start < 0) return '';
  const level = /^(#+)/.exec(lines[start])![1].length;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    const h = /^(#+)\s+(.*)$/.exec(lines[i]);
    if (!h) continue;
    if (h[1].length < level || (h[1].length === level && SECTION_START.test(h[2].trim()))) {
      end = i;
      break;
    }
  }
  const shift = Math.max(0, level - 2);
  return lines
    .slice(start + 1, end)
    .map((line) =>
      line.replace(/^(#{1,6})(\s)/, (_, hashes: string, space: string) => {
        const depth = hashes.length === level ? level + 1 : hashes.length;
        return '#'.repeat(Math.max(2, depth - shift)) + space;
      }),
    )
    .join('\n')
    .trim();
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * The curriculum's real-life projects, drawn as projects rather than sessions.
 *
 *   **Project 1: Robotics**        →  a card: `Project 1` tag, the title, the
 *   - Build a line-following …        bullets, and the `- Deliverable:` bullet
 *   - Deliverable: Fully …            lifted out into the card's footer
 *
 * A run of consecutive projects shares one grid. The card markup is HTML with
 * blank lines around it, so Markdown still renders the bullets inside it.
 */
export function decorateProjects(markdown: string): string {
  const project = /\*\*Project (\d+): ([^*]+)\*\*\r?\n\r?\n((?:[-*] .*(?:\r?\n|$))+)/g;
  const run = /(?:\*\*Project \d+: [^*]+\*\*\r?\n\r?\n(?:[-*] .*(?:\r?\n|$))+\s*)+/g;
  return markdown.replace(run, (block) => {
    const cards = block.replace(project, (_, n: string, title: string, list: string) => {
      const items = list.trimEnd().split(/\r?\n/);
      const deliverable = items.find((item) => /^[-*]\s+Deliverable:/i.test(item));
      const rest = items.filter((item) => item !== deliverable).join('\n');
      const foot = deliverable
        ? `<p class="wk-project-deliverable"><span class="wk-project-deliverable-label">Deliverable</span><span>${escapeHtml(
            deliverable.replace(/^[-*]\s+Deliverable:\s*/i, ''),
          )}</span></p>\n\n`
        : '';
      return (
        `<div class="wk-project">\n\n` +
        `<p class="wk-project-head"><span class="wk-project-tag">Project ${n}</span><span class="wk-project-title">${escapeHtml(title.trim())}</span></p>\n\n` +
        `${rest}\n\n${foot}</div>\n\n`
      );
    });
    return `<div class="wk-projects">\n\n${cards}</div>\n\n`;
  });
}

/** `key: value` frontmatter — all this content needs, and no Node `Buffer`. */
function parse(text: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return { data: {}, body: text };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (m) data[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
  return { data, body: text.slice(match[0].length).trim() };
}

function build(): Course[] {
  const courses = new Map<string, Course>();
  const pages: Page[] = [];

  for (const [file, raw] of Object.entries(files).sort(([a], [b]) => a.localeCompare(b))) {
    const rel = file.replace(/^\/content\//, '').replace(/\.md$/, '');
    const [courseId, name] = rel.split('/');
    const { data, body } = parse(raw);

    if (name === 'index') {
      courses.set(courseId, {
        id: courseId,
        kind: data.kind === 'program' ? 'program' : 'module',
        path: `/academy/${courseId}`,
        title: data.title ?? courseId,
        label: data.label ?? '',
        track: data.track ?? '',
        meta: data.meta ?? '',
        summary: data.summary ?? '',
        order: Number(data.order ?? 99),
        body,
        curriculum: decorateProjects(curriculumSection(data.curriculum ?? '')),
        pages: [],
      });
      continue;
    }

    const asset = assets[rel] ?? null;
    const type = (data.type as PageType) ?? (data.video ? 'video' : 'slides');
    const bodySource = data.body ? included[`/${data.body}`] ?? '' : '';
    const external = data.body ? splitTitle(data.body.startsWith('curriculum/') ? decorateProjects(bodySource) : bodySource) : null;
    if (data.body && !included[`/${data.body}`]) console.warn(`[content] ${rel}: body file not found — ${data.body}`);
    // `Session 11: Analog Sensors & ADC` → `Analog Sensors & ADC`; the lesson label carries the number.
    const externalTitle = external?.title?.replace(/^(session|lesson)\s+\d+\s*[:·—-]\s*/i, '') ?? null;
    pages.push({
      id: rel,
      courseId,
      path: `/academy/${rel}`,
      title: data.title ?? externalTitle ?? name,
      lesson: data.lesson ?? '',
      type,
      summary: data.summary ?? '',
      duration: data.duration || null,
      video: data.video || null,
      body: external ? [body, external.body].filter(Boolean).join('\n\n') : body,
      asset,
    });
  }

  for (const page of pages) {
    const course = courses.get(page.courseId);
    if (!course) continue;
    // The program's page sits at the Academy's top level (`/academy/curriculum`);
    // a module's pages under the module. Set here, not in the loop above:
    // `curriculum.md` sorts before the `index.md` that says it is the program.
    if (course.kind === 'program') page.path = `/academy/${page.id.split('/')[1]}`;
    course.pages.push(page);
  }
  return [...courses.values()].sort((a, b) => a.order - b.order);
}

export const courses = build();
export const modules = courses.filter((course) => course.kind === 'module');
export const programPages = courses.filter((course) => course.kind === 'program').flatMap((c) => c.pages);
export const allPages = courses.flatMap((course) => course.pages);

/** The Academy's courses, each with its modules, in module order. */
export interface Track {
  name: string;
  modules: Course[];
}
export const tracks: Track[] = modules.reduce<Track[]>((list, module) => {
  const track = list.find((t) => t.name === module.track);
  if (track) track.modules.push(module);
  else list.push({ name: module.track, modules: [module] });
  return list;
}, []);

export function findCourse(id: string | undefined): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function findPage(courseId: string | undefined, pageId: string | undefined): Page | undefined {
  return allPages.find((page) => page.id === `${courseId}/${pageId}`);
}

export function findPageByPath(path: string): Page | undefined {
  return allPages.find((page) => page.path === path);
}

/** The page before and after, in reading order across the modules of its course. */
export function neighbours(page: Page): { prev: Page | null; next: Page | null } {
  const track = findCourse(page.courseId)?.track;
  const order = modules.filter((m) => m.track === track).flatMap((m) => m.pages);
  const index = order.indexOf(page);
  if (index < 0) return { prev: null, next: order[0] ?? null };
  return {
    prev: index > 0 ? order[index - 1] : null,
    next: index < order.length - 1 ? order[index + 1] : null,
  };
}

/** The thumbnail a page shows: its deck's cover, else its video's poster frame. */
export function thumbnailOf(page: Page): string | null {
  if (page.video) return `https://i.ytimg.com/vi/${encodeURIComponent(page.video)}/hqdefault.jpg`;
  return page.asset?.thumbnail ?? null;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function pageUnit(page: Page): string {
  return page.asset?.format === 'PPTX' ? 'slides' : 'pages';
}

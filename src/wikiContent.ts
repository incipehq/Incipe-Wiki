/**
 * The Wiki — how to connect and set up the INCIPE Board, and every sensor and
 * module — read at build time from wiki/*.md (frontmatter + Markdown body).
 *
 * PRIVATE FIRMWARE STAYS OUT. The Incipe firmware references (the Workspace's
 * `incipe-firmware` skill) are private, and this repository and site are public.
 * Nothing here reads them: a page carries only what its own file says. Do not
 * add a glob over a references folder — `import.meta.glob` bundles every file it
 * matches, whether or not a page uses it. See CLAUDE.md.
 */
export type WikiKind = 'board' | 'guide' | 'sensor' | 'actuator' | 'module';

export interface WikiFunction {
  /** As written in the reference heading: `incipe.setBuzzer(frequency, duration_ms)`. */
  signature: string;
  /** Heading anchor on the page (see `headingId`). */
  anchor: string;
  /** The reference's `Returns:` text, Markdown. */
  returns: string;
  /** The C++ type at the start of `returns`, when it states one. */
  type: string | null;
}

export interface WikiPage {
  id: string;
  path: string;
  title: string;
  kind: WikiKind;
  order: number;
  reads: string;
  keywords: string;
  summary: string;
  identifier: string | null;
  functions: WikiFunction[];
  model: string | null;
  thumbnail: string | null;
  body: string;
}

const pageFiles = import.meta.glob('/wiki/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const KIND_LABEL: Record<WikiKind, string> = {
  board: 'Board',
  guide: 'Guide',
  sensor: 'Sensor',
  actuator: 'Actuator',
  module: 'Module',
};

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

/** The id a rendered heading gets (components/Markdown.tsx), so tables can link to it. */
export function headingId(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function build(): WikiPage[] {
  return Object.entries(pageFiles)
    .map(([file, raw]) => {
      const id = file.replace(/^\/wiki\//, '').replace(/\.md$/, '');
      const { data, body } = parse(raw);
      return {
        id,
        path: `/wiki/${id}`,
        title: data.title ?? id,
        kind: (data.kind as WikiKind) ?? 'module',
        order: Number(data.order ?? 99),
        reads: data.reads ?? '',
        keywords: data.keywords ?? '',
        summary: data.summary ?? '',
        identifier: data.identifier || null,
        // Published function tables need an approved public source; none yet.
        functions: [],
        model: data.model ? `/models/${id}.glb` : null,
        thumbnail: data.model ? `/thumbs/wiki/${id}.png` : null,
        body,
      } satisfies WikiPage;
    })
    .sort((a, b) => a.order - b.order);
}

export const wikiPages = build();

/** The rail's and the Wiki home's grouping, in reading order. */
export const WIKI_GROUPS: { title: string; kinds: WikiKind[] }[] = [
  { title: 'Get started', kinds: ['board', 'guide'] },
  { title: 'Sensors', kinds: ['sensor'] },
  { title: 'Actuators', kinds: ['actuator'] },
  { title: 'Modules', kinds: ['module'] },
];

export function findWikiPage(id: string | undefined): WikiPage | undefined {
  return wikiPages.find((page) => page.id === id);
}

export function wikiNeighbours(page: WikiPage): { prev: WikiPage | null; next: WikiPage | null } {
  const i = wikiPages.indexOf(page);
  return { prev: wikiPages[i - 1] ?? null, next: wikiPages[i + 1] ?? null };
}

/**
 * Sensor search. Every word must match somewhere; where it matches sets the
 * rank — a name or firmware identifier beats a keyword, which beats a word in
 * the notes. So `dht11`, `temperature`, `getDistance` and `gas` all find the
 * module you meant first.
 */
export function searchWiki(query: string, pages: WikiPage[] = wikiPages): WikiPage[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return pages;
  const scored = pages.map((page) => {
    const fields: [string, number][] = [
      [`${page.title} ${page.identifier ?? ''}`.toLowerCase(), 8],
      [page.keywords.toLowerCase(), 5],
      [page.functions.map((f) => f.signature).join(' ').toLowerCase(), 4],
      [`${page.reads} ${page.summary}`.toLowerCase(), 3],
      [page.body.toLowerCase(), 1],
    ];
    let score = 0;
    for (const word of words) {
      const best = Math.max(0, ...fields.map(([text, weight]) => (text.includes(word) ? weight : 0)));
      if (!best) return { page, score: 0 };
      score += best;
    }
    return { page, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.page.order - b.page.order)
    .map((s) => s.page);
}

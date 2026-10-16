/**
 * What's new — the update posts, read at build time from whats-new/*.md
 * (frontmatter + Markdown body), newest first. The same posts as
 * site.incipeacademy.com/whats-new.
 *
 *   whats-new/<yyyy-mm-dd>-<slug>.md   — a post at /whats-new/<slug>:
 *     title, label (the line above it), date (yyyy-mm-dd), summary (the feed's
 *     short description), image (+ alt, in public/whats-new/), video (YouTube
 *     id, played at the top of the post), tags (comma list), and an optional
 *     call to action: action (its label) + link.
 */
export interface Post {
  id: string;
  path: string;
  title: string;
  label: string;
  /** yyyy-mm-dd. */
  date: string;
  summary: string;
  image: string | null;
  alt: string;
  video: string | null;
  tags: string[];
  action: { label: string; href: string } | null;
  body: string;
}

const postFiles = import.meta.glob('/whats-new/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

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

function build(): Post[] {
  return Object.entries(postFiles)
    .map(([file, raw]) => {
      const name = file.replace(/^\/whats-new\//, '').replace(/\.md$/, '');
      const id = name.replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const { data, body } = parse(raw);
      return {
        id,
        path: `/whats-new/${id}`,
        title: data.title ?? id,
        label: data.label ?? '',
        date: data.date ?? name.slice(0, 10),
        summary: data.summary ?? '',
        image: data.image || null,
        alt: data.alt ?? '',
        video: data.video || null,
        tags: (data.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
        action: data.action && data.link ? { label: data.action, href: data.link } : null,
        body,
      } satisfies Post;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const posts = build();

export function findPost(id: string | undefined): Post | undefined {
  return posts.find((post) => post.id === id);
}

/** `2026-09-06` → `Sep 6, 2026`, as the original site writes it. */
export function formatDate(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return date;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

/** `Sep 6` — the rail's short date. */
export function shortDate(date: string): string {
  return formatDate(date).replace(/,\s*\d{4}$/, '');
}

/** Newer is previous, older is next — the feed's reading order. */
export function postNeighbours(post: Post): { newer: Post | null; older: Post | null } {
  const i = posts.indexOf(post);
  return { newer: posts[i - 1] ?? null, older: posts[i + 1] ?? null };
}

export function searchPosts(query: string): Post[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return posts.filter((post) => {
    const haystack = `${post.title} ${post.label} ${post.summary} ${post.tags.join(' ')} ${post.body}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

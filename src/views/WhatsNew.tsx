/**
 * What's new — the feed of update posts (whats-new/*.md, newest first) and one
 * post. The feed reads like the original site's: one column of posts, each its
 * date, heading, short description, picture and tags. A post opens with its
 * video (or its picture), then the full notes.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { formatDate, postNeighbours, posts } from '../whatsNew';
import type { Post } from '../whatsNew';
import { Markdown } from '../components/Markdown';
import { Video } from '../components/Media';
import { ButtonAnchor, ButtonLink } from '../components/ui';

export function WhatsNewHome() {
  useEffect(() => {
    document.title = "What's new · Incipe Wiki";
  }, []);

  return (
    <div className="wk-catalog wk-feed wk-enter">
      <header className="wk-catalog-head">
        <span className="wk-label wk-label--accent">Updates</span>
        <h1>What's new</h1>
        <p>New releases of the INCIPE Workspace app and news about the INCIPE―1 board, newest first.</p>
      </header>

      <div className="wk-posts">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {posts.length === 0 && <div className="wk-empty">No updates yet.</div>}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link to={post.path} className="wk-card wk-post">
      <span className="wk-card-body wk-post-head">
        <span className="wk-card-top">
          <time className="wk-card-kind" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <ArrowUpRight size={14} strokeWidth={1.75} className="wk-post-go" aria-hidden="true" />
        </span>
        <span className="wk-post-title">{post.title}</span>
        <span className="wk-post-summary">{post.summary}</span>
      </span>
      {post.image && (
        <span className="wk-post-thumb">
          <img src={post.image} alt={post.alt} loading="lazy" />
        </span>
      )}
      {post.tags.length > 0 && <Tags tags={post.tags} />}
    </Link>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <span className="wk-post-tags">
      {tags.map((tag) => (
        <span key={tag}>#{tag}</span>
      ))}
    </span>
  );
}

export function PostView({ post }: { post: Post }) {
  const { newer, older } = postNeighbours(post);

  useEffect(() => {
    document.title = `${post.title} · What's new · Incipe Wiki`;
  }, [post]);

  return (
    <article className="wk-page wk-enter">
      <header className="wk-page-head">
        <Link to="/whats-new" className="wk-crumb">
          <ArrowLeft size={12} strokeWidth={1.75} aria-hidden="true" />
          What's new
        </Link>
        <span className="wk-label wk-label--accent">{post.label || formatDate(post.date)}</span>
        <h1>{post.title}</h1>
        {post.summary && <p>{post.summary}</p>}
        <div className="wk-facts">
          <span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          {post.tags.length > 0 && <span>{post.tags.map((t) => `#${t}`).join('  ')}</span>}
        </div>
      </header>

      {(post.video || post.image) && (
        <div className="wk-feature">
          {post.video ? (
            <Video id={post.video} poster={`https://i.ytimg.com/vi/${encodeURIComponent(post.video)}/maxresdefault.jpg`} title={post.title} />
          ) : (
            <figure className="wk-media wk-media--natural">
              <img src={post.image!} alt={post.alt} />
            </figure>
          )}
        </div>
      )}

      {post.body && (
        <section className="wk-body-text" aria-label="Update">
          <Markdown source={post.body} />
        </section>
      )}

      {post.action && (
        <div className="wk-actions">
          <ButtonAnchor variant="accent" href={post.action.href} target="_blank" rel="noreferrer">
            {post.action.label}
            <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
          </ButtonAnchor>
        </div>
      )}

      <footer className="wk-page-foot">
        {newer ? (
          <ButtonLink variant="secondary" to={newer.path} className="wk-step">
            <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
            <span className="wk-step-text">Newer · {newer.title}</span>
          </ButtonLink>
        ) : (
          <span />
        )}
        <span className="wk-spacer" />
        {older && (
          <ButtonLink variant="accent" to={older.path} className="wk-step">
            <span className="wk-step-text">Older · {older.title}</span>
            <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </ButtonLink>
        )}
      </footer>
    </article>
  );
}

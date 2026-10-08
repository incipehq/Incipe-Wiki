/**
 * The top of a detail page: the deck's cover, or the lesson video.
 *
 * A deck with a PDF (`asset.viewer`, from a page's `pdf:`) starts as its cover and
 * opens in the browser's own PDF viewer in place, so it can be read without
 * downloading anything — the same poster-first pattern as the video.
 *
 * Video follows the workspace's LessonVideo: the privacy-enhanced
 * `youtube-nocookie.com` host, `rel=0`. It starts as the poster frame and only
 * loads the player when asked, so a page of notes does not pull a YouTube embed
 * (and its requests) for a video nobody pressed.
 */
import { useState } from 'react';
import { BookOpen, Play } from 'lucide-react';
import type { Page } from '../content';
import { thumbnailOf } from '../content';

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&modestbranding=1&autoplay=1`;
}

export function Media({ page }: { page: Page }) {
  const [playing, setPlaying] = useState(false);
  const thumb = thumbnailOf(page);

  if (page.video) {
    if (playing) {
      return (
        <div className="wk-media">
          <iframe
            className="wk-media-frame"
            src={youtubeEmbedUrl(page.video)}
            title={`${page.title} · video`}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      );
    }
    return (
      <button type="button" className="wk-media wk-media--poster" onClick={() => setPlaying(true)} aria-label={`Play ${page.title}`}>
        {thumb && <img src={thumb} alt="" />}
        <span className="wk-media-play inc-btn inc-btn--accent" aria-hidden="true">
          <Play size={14} strokeWidth={1.75} />
          Play video
        </span>
      </button>
    );
  }

  if (!thumb) {
    return (
      <div className="wk-media wk-media--none">
        <span>No preview for this page.</span>
      </div>
    );
  }

  const viewer = page.asset?.viewer;
  if (viewer) {
    if (playing) {
      return (
        <div className="wk-media">
          <iframe className="wk-media-frame" src={`${viewer}#navpanes=0&view=FitH`} title={`${page.title} · slides`} />
        </div>
      );
    }
    return (
      <button type="button" className="wk-media wk-media--poster" onClick={() => setPlaying(true)} aria-label={`View the slides for ${page.title}`}>
        {thumb && <img src={thumb} alt="" />}
        <span className="wk-media-play inc-btn inc-btn--accent" aria-hidden="true">
          <BookOpen size={14} strokeWidth={1.75} />
          View slides
        </span>
      </button>
    );
  }

  const portrait = page.asset?.format === 'PDF' || page.asset?.format === 'DOCX';
  return (
    <figure className="wk-media" data-portrait={portrait || undefined}>
      <img src={thumb} alt={`${page.title} — cover`} />
    </figure>
  );
}

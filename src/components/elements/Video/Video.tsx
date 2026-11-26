import React, { useState } from 'react';
import Head from '@docusaurus/Head';
import styles from './Video.module.css';

export interface VideoProps {
  /** YouTube video ID (the `v=` value from a youtube.com/watch URL), e.g. "EwweiH2rd7M". */
  videoId: string;
  /** Used as the iframe's accessible title and the play button's aria-label. */
  title: string;
  /** Escape hatch for a one-off exception to the standard width. */
  maxWidth?: string;
  /**
   * Set on a video that is visible without scrolling on a phone, where its
   * thumbnail is likely the page's Largest Contentful Paint element. Loads the
   * thumbnail eagerly at high fetch priority instead of lazily. Leave unset
   * for videos further down the page.
   */
  priority?: boolean;
}

/**
 * Embeds a YouTube video behind a click-to-play facade: only the thumbnail
 * loads on page view, and the real (youtube-nocookie.com) iframe mounts only
 * after the user clicks, so no third-party tracking script or cookie loads
 * until then.
 */
export default function Video({ videoId, title, maxWidth, priority = false }: VideoProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={styles.container}
      style={maxWidth ? ({ '--video-max-width': maxWidth } as React.CSSProperties) : undefined}
    >
      {priority && (
        <Head>
          <link rel="preconnect" href="https://i.ytimg.com" />
        </Head>
      )}
      <div className={styles.aspectBox}>
        {isPlaying ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.facade}
            aria-label={`Play video: ${title}`}
            onClick={() => setIsPlaying(true)}
          >
            {/* hqdefault.jpg is always 480x360. The width and height only set the
                intrinsic aspect ratio; .aspectBox sizes the rendered image. */}
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              width={480}
              height={360}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : undefined}
              className={styles.thumbnail}
            />
            <span className={styles.playButton} aria-hidden="true">
              <svg className={styles.playIcon} viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

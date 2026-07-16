import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import { useNoZoom } from './NoZoom';
import styles from './ZoomableImage.module.css';

type ZoomableImageProps = React.ComponentProps<'img'> & {
  /** Optional dark-mode source; used in place of `src` when the dark theme is active. */
  srcDark?: string;
};

/**
 * Renders an image that behaves like Stripe's docs images: it sits inside the
 * normal content column, but when the image's natural width is larger than the
 * space available to it, the cursor becomes a zoom-in cursor and clicking opens
 * a full-width modal view. Images that already fit are left completely alone.
 */
export default function ZoomableImage({
  src,
  srcDark,
  alt,
  className,
  style,
  onClick,
  onLoad,
  ...rest
}: ZoomableImageProps): JSX.Element {
  const { colorMode } = useColorMode();
  const noZoom = useNoZoom();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isZoomable, setIsZoomable] = useState(false);
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const resolvedSrc = colorMode === 'dark' && srcDark ? srcDark : src;

  // An image is zoomable only when it is being displayed smaller than its
  // native resolution, i.e. it overflows the available width.
  const measure = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) {
      return;
    }
    setNaturalWidth(img.naturalWidth);
    setIsZoomable(!noZoom && img.naturalWidth > img.clientWidth + 1);
  }, [noZoom]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) {
      return;
    }
    if (img.complete) {
      measure();
    }
    // Recompute when the column is resized (responsive layout, sidebar toggle).
    const observer = new ResizeObserver(measure);
    observer.observe(img);
    return () => observer.disconnect();
  }, [measure, resolvedSrc]);

  // While the modal is open, lock body scroll and close on Escape.
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  return (
    <>
      <img
        ref={imgRef}
        src={resolvedSrc}
        alt={alt}
        decoding="async"
        loading="lazy"
        className={clsx(styles.image, className, isZoomable && styles.zoomable)}
        style={style}
        onLoad={(event) => {
          measure();
          onLoad?.(event);
        }}
        onClick={(event) => {
          if (isZoomable) {
            setIsOpen(true);
          }
          onClick?.(event);
        }}
        {...rest}
      />
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label={alt || 'Expanded image'}
            onClick={() => setIsOpen(false)}
          >
            <button
              type="button"
              className={styles.close}
              aria-label="Close expanded image"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <img
              src={resolvedSrc}
              alt={alt}
              className={styles.modalImage}
              style={{
                maxWidth: naturalWidth ? `min(95vw, ${naturalWidth}px)` : '95vw',
              }}
            />
          </div>,
          document.body
        )}
    </>
  );
}

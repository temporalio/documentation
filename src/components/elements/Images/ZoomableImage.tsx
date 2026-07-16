import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import { useNoZoom } from './NoZoom';
import ZoomModal from './ZoomModal';
import { wouldEnlargeInModal } from './zoomSizing';
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

  // An image is zoomable only when opening the modal would actually show it
  // larger than it already appears on the page. That's usually just "is it
  // being displayed smaller than its native resolution", but a tall image
  // can overflow its column width-wise while still rendering *smaller* in
  // the modal once the height cap clamps it (see zoomSizing.ts).
  const measure = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) {
      return;
    }
    setNaturalWidth(img.naturalWidth);
    setIsZoomable(
      !noZoom &&
        wouldEnlargeInModal({
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          pageWidth: img.clientWidth,
          capToNaturalWidth: true,
        })
    );
  }, [noZoom]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) {
      return;
    }
    if (img.complete) {
      measure();
    }
    // Recompute when the column is resized (responsive layout, sidebar
    // toggle) or the viewport height changes (affects the modal's 90vh cap
    // without necessarily changing the image's own rendered width).
    const observer = new ResizeObserver(measure);
    observer.observe(img);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, resolvedSrc]);

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
      <ZoomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        label={alt || 'Expanded image'}
        src={resolvedSrc}
        alt={alt}
        naturalWidth={naturalWidth}
      />
    </>
  );
}

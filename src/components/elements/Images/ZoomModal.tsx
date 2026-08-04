import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ZoomableImage.module.css';

type ZoomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  label?: string;
} & (
  | { src: string; alt?: string; naturalWidth?: number; html?: undefined }
  | { html: string; naturalWidth?: number; src?: undefined; alt?: undefined }
);

/**
 * Shared full-width "expanded view" modal used by both raster/vector images
 * (`ZoomableImage`) and Mermaid diagrams (`MermaidZoomWrapper`). Renders
 * either an `<img src>` or a raw HTML string (e.g. a serialized, id-rewritten
 * clone of a live Mermaid `<svg>`) inside the same overlay/backdrop/close
 * button chrome.
 *
 * Clicking the backdrop, the content itself, the close button, or pressing
 * Escape all close the modal (no `stopPropagation`, matching the previous
 * inline-modal behavior in `ZoomableImage`).
 */
export default function ZoomModal(props: ZoomModalProps): JSX.Element | null {
  const { isOpen, onClose, label } = props;

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  // Raster/vector images are capped at their natural pixel width — scaling a
  // screenshot beyond its native resolution would just blur it. Mermaid's
  // cloned <svg> (the `html` case) has no such ceiling: a viewBox is a
  // coordinate system, not a pixel raster, so it stays crisp at any size and
  // should fill the available space instead of being capped to its
  // "natural" (i.e. as-authored) viewBox size.
  const maxWidthStyle = {
    maxWidth:
      props.html !== undefined ? '95vw' : props.naturalWidth ? `min(95vw, ${props.naturalWidth}px)` : '95vw',
  };

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={label || 'Expanded view'}
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.close}
        aria-label="Close expanded view"
        onClick={onClose}
      >
        &times;
      </button>
      {props.html !== undefined ? (
        // Keep `docusaurus-mermaid-container` so page-level Mermaid theme
        // overrides in custom.css (e.g. Design Patterns semantic node colors
        // scoped to that class) still apply after the SVG is portaled out of
        // the original Mermaid theme component.
        <div
          className={`docusaurus-mermaid-container ${styles.modalSvgWrapper}`}
          style={maxWidthStyle}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: props.html }}
        />
      ) : (
        <img src={props.src} alt={props.alt} className={styles.modalImage} style={maxWidthStyle} />
      )}
    </div>,
    document.body
  );
}

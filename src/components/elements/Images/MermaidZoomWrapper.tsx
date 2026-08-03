import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNoZoom } from './NoZoom';
import ZoomModal from './ZoomModal';
import { wouldEnlargeInModal } from './zoomSizing';
import styles from './ZoomableImage.module.css';

// Stable class Docusaurus's Mermaid theme puts on the div it injects the
// rendered SVG into (see `@docusaurus/theme-mermaid/client`'s
// `MermaidContainerClassName`).
const MERMAID_CONTAINER_SELECTOR = '.docusaurus-mermaid-container';

/** Mermaid always sets a `viewBox` on the root svg reflecting the diagram's
 * natural pixel size — this is the SVG equivalent of `naturalWidth`/
 * `naturalHeight` for a raster image. `getBBox()` is a last-resort fallback
 * for hand-authored SVGs that might lack a viewBox. */
function getIntrinsicSize(svg: SVGSVGElement): { width: number; height: number } {
  const viewBox = svg.viewBox?.baseVal;
  if (viewBox && viewBox.width > 0 && viewBox.height > 0) {
    return { width: viewBox.width, height: viewBox.height };
  }
  const attr = svg.getAttribute('viewBox');
  if (attr) {
    const parts = attr.trim().split(/\s+/).map(Number);
    if (parts.length === 4 && Number.isFinite(parts[2]) && parts[2] > 0 && Number.isFinite(parts[3]) && parts[3] > 0) {
      return { width: parts[2], height: parts[3] };
    }
  }
  try {
    const bbox = svg.getBBox();
    if (bbox.width > 0 && bbox.height > 0) {
      return { width: bbox.width, height: bbox.height };
    }
  } catch {
    // getBBox() can throw for detached/hidden elements; ignore and fall through.
  }
  return { width: 0, height: 0 };
}

let cloneIdSeq = 0;

/**
 * Serializes a clone of `svg` to an HTML string, rewriting every `id` (and
 * any same-document reference to it, e.g. the marker `<defs>` mermaid uses
 * for flowchart arrowheads) to a unique value. Without this, showing the
 * clone in the modal while the original diagram stays mounted in the page
 * would leave two elements sharing the same id, which makes `url(#id)`
 * references resolve ambiguously across browsers.
 */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cloneSvgMarkupWithUniqueIds(svg: SVGSVGElement): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  // Mermaid sets an inline `max-width: <intrinsic-width>px` on the svg it
  // renders (so it never grows past its "natural" size in-page). That's a
  // hard ceiling baked into the markup itself, so it would otherwise still
  // apply inside the modal even though `ZoomModal`/`.modalSvgWrapper` no
  // longer cap the wrapper — strip it so the vector diagram can actually
  // fill the available modal space.
  clone.style.removeProperty('max-width');
  const prefix = `zoom-modal-${cloneIdSeq++}-`;
  const idMap = new Map<string, string>();
  // Include the root <svg> itself — querySelectorAll only matches descendants,
  // and Mermaid's entire theme stylesheet is scoped to the root svg's id
  // (e.g. `#mermaid-svg-123 .node rect { fill: ... }`).
  const elementsWithId = [clone, ...Array.from(clone.querySelectorAll('[id]'))];
  elementsWithId.forEach((el) => {
    const oldId = el.getAttribute('id');
    if (oldId && !idMap.has(oldId)) {
      const newId = `${prefix}${oldId}`;
      idMap.set(oldId, newId);
      el.setAttribute('id', newId);
    }
  });
  if (idMap.size > 0) {
    const referencingAttrs = [
      'fill',
      'stroke',
      'filter',
      'clip-path',
      'marker-start',
      'marker-mid',
      'marker-end',
      'href',
      'xlink:href',
    ];
    clone.querySelectorAll('*').forEach((el) => {
      referencingAttrs.forEach((attrName) => {
        const value = el.getAttribute(attrName);
        if (!value) {
          return;
        }
        idMap.forEach((newId, oldId) => {
          if (value === `#${oldId}` || value === `url(#${oldId})`) {
            el.setAttribute(attrName, value.replace(oldId, newId));
          }
        });
      });
    });
    // Mermaid inlines its theme as a <style> block whose selectors are all
    // prefixed with the root svg's id. Rewriting element ids without also
    // rewriting those selectors leaves the clone unstyled (browser-default
    // fills/strokes), which is what made zoomed diagrams change color.
    clone.querySelectorAll('style').forEach((styleEl) => {
      let css = styleEl.textContent ?? '';
      idMap.forEach((newId, oldId) => {
        css = css.replace(new RegExp(`#${escapeRegExp(oldId)}\\b`, 'g'), `#${newId}`);
      });
      styleEl.textContent = css;
    });
  }
  return clone.outerHTML;
}

type ModalState = { html: string; width: number };

/**
 * Wraps Docusaurus's Mermaid theme component (via a wrap-swizzle in
 * `src/theme/Mermaid`) to add the same Stripe-style click-to-expand zoom
 * behavior as `ZoomableImage`, without forking Mermaid's own render logic.
 *
 * Mermaid renders its SVG client-side and injects it with
 * `dangerouslySetInnerHTML`, so there's no render callback to hook into —
 * instead a `MutationObserver` watches this wrapper's subtree for the
 * injected `<svg>`, and a `ResizeObserver` re-checks it whenever the column
 * width changes (matching `ZoomableImage`'s pattern for raster images).
 */
export default function MermaidZoomWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const noZoom = useNoZoom();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isZoomableRef = useRef(false);
  const intrinsicWidthRef = useRef(0);
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const handleSvgClick = useCallback(() => {
    if (!isZoomableRef.current || !svgRef.current) {
      return;
    }
    setModalState({
      html: cloneSvgMarkupWithUniqueIds(svgRef.current),
      width: intrinsicWidthRef.current,
    });
  }, []);

  const measure = useCallback((svg: SVGSVGElement) => {
    const { width: intrinsicWidth, height: intrinsicHeight } = getIntrinsicSize(svg);
    const renderedWidth = svg.getBoundingClientRect().width;
    intrinsicWidthRef.current = intrinsicWidth;
    // A diagram can overflow its column width-wise yet still render
    // *smaller* in the modal once the ~90vh height cap clamps it (tall
    // sequence diagrams in a short window are the common case) — only offer
    // zoom when it would genuinely end up bigger.
    const zoomable =
      intrinsicWidth > 0 &&
      intrinsicHeight > 0 &&
      renderedWidth > 0 &&
      wouldEnlargeInModal({
        naturalWidth: intrinsicWidth,
        naturalHeight: intrinsicHeight,
        pageWidth: renderedWidth,
        capToNaturalWidth: false,
      });
    isZoomableRef.current = zoomable;
    svg.classList.toggle(styles.zoomable, zoomable);
  }, []);

  useEffect(() => {
    if (noZoom) {
      return;
    }
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let resizeObserver: ResizeObserver | null = null;

    const attachToSvg = (svg: SVGSVGElement) => {
      if (svgRef.current === svg) {
        measure(svg);
        return;
      }
      resizeObserver?.disconnect();
      svgRef.current?.removeEventListener('click', handleSvgClick);
      svgRef.current = svg;
      svg.addEventListener('click', handleSvgClick);
      measure(svg);
      resizeObserver = new ResizeObserver(() => measure(svg));
      resizeObserver.observe(svg);
    };

    const checkForSvg = () => {
      const svg = container.querySelector<SVGSVGElement>(`${MERMAID_CONTAINER_SELECTOR} svg`);
      if (svg) {
        attachToSvg(svg);
      }
    };

    // Mermaid renders asynchronously (it lazy-loads the `mermaid` module),
    // so the svg usually isn't present on mount; the observer catches it
    // whenever it (or a re-render on color-mode change) is injected.
    checkForSvg();
    const mutationObserver = new MutationObserver(checkForSvg);
    mutationObserver.observe(container, { childList: true, subtree: true });

    // The svg's own ResizeObserver only fires when *its* box changes (e.g.
    // the column width changes), but the modal's 90vh cap depends on
    // viewport height, which can change independently (resizing the window
    // vertically without affecting the diagram's rendered width at all).
    const handleWindowResize = () => {
      if (svgRef.current) {
        measure(svgRef.current);
      }
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      svgRef.current?.removeEventListener('click', handleSvgClick);
      svgRef.current = null;
    };
  }, [noZoom, measure, handleSvgClick]);

  if (noZoom) {
    return <>{children}</>;
  }

  return (
    <>
      <div ref={containerRef}>{children}</div>
      <ZoomModal
        isOpen={modalState !== null}
        onClose={() => setModalState(null)}
        label="Expanded diagram"
        html={modalState?.html ?? ''}
        naturalWidth={modalState?.width}
      />
    </>
  );
}

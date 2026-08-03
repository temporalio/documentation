// Mirrors the modal's CSS constraints (.overlay's `padding: 4vh 4vw` plus
// `.modalImage` / `.modalSvgWrapper`'s `max-height: 90vh`):
//   - available width  = viewport − 8vw of horizontal padding = 92vw
//     (the content's own `max-width: 95vw` is looser than this, so 92vw wins)
//   - available height = 90vh (tighter than the 92vh leftover after vertical
//     padding, so 90vh wins)
const MODAL_WIDTH_VIEWPORT_RATIO = 0.92;
const MODAL_HEIGHT_VIEWPORT_RATIO = 0.9;

/**
 * Computes how wide an item would actually render inside the zoom modal for
 * the current viewport, given its intrinsic size. The modal uniformly scales
 * content to fit within whichever of its width/height caps is more
 * restrictive (`object-fit: contain` semantics), so a tall item can end up
 * width-constrained by the *height* cap rather than the width cap.
 *
 * `capToNaturalWidth` matches raster images, which should never be scaled
 * past their native pixel resolution (that would just blur them). Vector
 * Mermaid diagrams have no such ceiling — a viewBox is a coordinate system,
 * not a pixel raster — so they should be allowed to fill the available
 * space.
 */
export function computeModalRenderWidth({
  naturalWidth,
  naturalHeight,
  capToNaturalWidth,
}: {
  naturalWidth: number;
  naturalHeight: number;
  capToNaturalWidth: boolean;
}): number {
  if (typeof window === 'undefined' || !naturalWidth || !naturalHeight) {
    return 0;
  }
  const maxWidth = capToNaturalWidth
    ? Math.min(window.innerWidth * MODAL_WIDTH_VIEWPORT_RATIO, naturalWidth)
    : window.innerWidth * MODAL_WIDTH_VIEWPORT_RATIO;
  const maxHeight = window.innerHeight * MODAL_HEIGHT_VIEWPORT_RATIO;
  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
  return naturalWidth * scale;
}

/**
 * Whether opening the zoom modal would actually display this item larger
 * than it already appears on the page. An item can overflow its column
 * (the naive "it's being downscaled" check) yet still render *smaller* in
 * the modal once the ~90vh height cap clamps it — tall diagrams/screenshots
 * in a short browser window are the common case. When that happens the zoom
 * affordance would be actively misleading, so callers should suppress it.
 */
export function wouldEnlargeInModal({
  naturalWidth,
  naturalHeight,
  pageWidth,
  capToNaturalWidth,
}: {
  naturalWidth: number;
  naturalHeight: number;
  pageWidth: number;
  capToNaturalWidth: boolean;
}): boolean {
  const modalWidth = computeModalRenderWidth({ naturalWidth, naturalHeight, capToNaturalWidth });
  return modalWidth > pageWidth + 1;
}

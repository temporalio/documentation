import React from 'react';
import ZoomableImage from './ZoomableImage';

// Legacy component, retained for backwards compatibility. Zoom is now handled
// by ZoomableImage: the thumbnail is shown at `initialWidth` and, because its
// natural width is larger, clicking it opens the full-width modal.
const ZoomingImage = ({ src, alt, ariaLabel, initialWidth = '200px' }) => {
  return (
    <ZoomableImage
      src={src}
      alt={alt}
      aria-label={ariaLabel || alt}
      style={{ width: initialWidth, maxWidth: '100%', height: 'auto' }}
    />
  );
};

export default ZoomingImage;

import React from 'react';
import ZoomableImage from './ZoomableImage';

// Legacy component, retained for backwards compatibility. Previously opened the
// image in a new tab; now defers to ZoomableImage's click-to-expand modal.
const EnlargeImage = ({ src, alt, ariaLabel }) => {
  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <ZoomableImage src={src} alt={ariaLabel || alt} style={{ maxWidth: '100%' }} />
    </div>
  );
};

export default EnlargeImage;

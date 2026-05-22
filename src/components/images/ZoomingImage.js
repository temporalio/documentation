import React, { useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';

function ZoomingImageContent({ src, alt, ariaLabel, initialWidth = '200px' }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const { colorMode } = useColorMode();

  const label = ariaLabel || alt;

  const handleClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            cursor: 'default',
            fontSize: '24px',
            color: colorMode === 'dark' ? 'lightblue' : 'blue',
            marginBottom: '5px',
          }}
        >
          🔍
        </span>
        <span style={{ fontSize: '12px', color: colorMode === 'dark' ? 'lightgray' : 'gray' }}>
          Click image to expand
        </span>
      </div>
      <img
        src={src}
        alt={alt}
        aria-label={label}
        style={{
          width: isZoomed ? '100%' : initialWidth,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: `1px solid ${colorMode === 'dark' ? '#333' : '#ddd'}`,
          borderRadius: '4px',
          marginLeft: '20px',
        }}
        onClick={handleClick}
      />
    </div>
  );
}

const ZoomingImage = (props) => (
  <BrowserOnly fallback={<img src={props.src} alt={props.alt} style={{ width: props.initialWidth || '200px' }} />}>
    {() => <ZoomingImageContent {...props} />}
  </BrowserOnly>
);

export default ZoomingImage;

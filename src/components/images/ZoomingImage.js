import React, { useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const ZoomingImage = ({ src, alt, ariaLabel }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const { colorMode } = useColorMode();

  // Use ariaLabel if provided, otherwise fall back to alt
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
        aria-label={label}  // Use the resolved label
        style={{
          width: isZoomed ? '100%' : '20%',
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
};

export default ZoomingImage;

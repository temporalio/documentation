import React, { useState, useRef } from 'react';

// This component can be controlled by passing an isDarkMode prop
// Or it will default to light mode if no prop is provided
const PhotoCarousel = ({ 
  images = [], 
  captions = [],
  isDarkMode = false // External control prop with default to light mode
}) => {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const imageRef = useRef(null);
  const captionRef = useRef(null);

  const goToPrevious = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const goToNext = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  // Helper to check if a caption is valid
  const isValidCaption = (caption) =>
    caption && caption.trim().toUpperCase() !== 'NA';

  // Format caption text with code blocks
  const renderCaption = (text) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={index}
            style={{
              backgroundColor: isDarkMode ? '#2d2d2d' : '#f5f5f5',
              color: isDarkMode ? '#f0f0f0' : '#333333',
              padding: '2px 4px',
              borderRadius: '4px',
              fontFamily: 'monospace',
            }}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Light/dark mode styles
  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    overflow: 'hidden',
    borderRadius: '16px',
    boxShadow: isDarkMode 
      ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
      : '0 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    color: isDarkMode ? '#e0e0e0' : '#222222',
  };

  const indexStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#ffffff',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
    zIndex: 2,
  };

  const imageContainerStyle = {
    position: 'relative',
    height: 'clamp(200px, 50vw, 400px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };

  const captionStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: 'clamp(14px, 2vw, 16px)',
    fontWeight: 'bold',
    color: isDarkMode ? '#e0e0e0' : '#222222',
    textAlign: 'left',
    padding: '0 16px',
    wordWrap: 'break-word',
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: isDarkMode 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    width: 'clamp(30px, 8vw, 60px)',
    height: 'clamp(30px, 8vw, 60px)',
    cursor: 'pointer',
    fontSize: 'clamp(1.2rem, 3vw, 2.5rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    zIndex: 1,
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      maxWidth: '100%',
      padding: '0 10px',
      boxSizing: 'border-box'
    }}>
      <div ref={carouselRef} style={containerStyle}>
        <div style={indexStyle}>
          Image {current + 1} out of {images.length}
        </div>
        
        <div ref={imageRef} style={imageContainerStyle}>
          <img 
            src={images[current]} 
            alt={`Slide ${current + 1}`}
            style={imageStyle}
          />
          
          {/* Navigation buttons inside the image container */}
          <button 
            onClick={goToPrevious}
            style={{...arrowStyle, left: '10px'}}
            aria-label="Previous image"
          >
            ❮
          </button>
          
          <button 
            onClick={goToNext}
            style={{...arrowStyle, right: '10px'}}
            aria-label="Next image"
          >
            ❯
          </button>
        </div>
        
        {isValidCaption(captions[current]) && (
          <div ref={captionRef} style={captionStyle}>
            {renderCaption(captions[current])}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCarousel;
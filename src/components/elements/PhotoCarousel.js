import React, { useState, useRef } from 'react';

const PhotoCarousel = ({ images = [], captions = [] }) => {
  const [current, setCurrent] = useState(0);
  const imageHeight = '400px';
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
              backgroundColor: '#f5f5f5',
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

  return (
    <>
      <style>
        {`
          .carousel {
            position: relative;
            width: 800px;
            margin: 0 auto;
            overflow: hidden;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }

          .carousel-index {
            position: absolute;
            top: 16px;
            right: 16px;
            background-color: rgba(0, 0, 0, 0.6);
            color: #fff;
            padding: 8px 14px;
            border-radius: 8px;
            font-size: 1.2rem;
            z-index: 2;
          }

          .carousel-image-container {
            height: ${imageHeight};
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .carousel img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .carousel-caption {
            margin-top: 20px;
            margin-bottom: 20px;
            font-size: 16px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            color: #222;
            text-align: left;
            padding: 0 16px;
            word-wrap: break-word;
          }

          .carousel-arrow {
            position: absolute;
            top: 200px;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            font-size: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            z-index: 1;
            transition: background-color 0.3s ease;
          }

          .carousel-arrow:hover {
            background-color: rgba(0, 0, 0, 0.85);
          }

          .carousel-arrow.left {
            left: 20px;
          }

          .carousel-arrow.right {
            right: 20px;
          }
        `}
      </style>
      <div className="carousel" ref={carouselRef}>
        <div className="carousel-index">
          Image {current + 1} out of {images.length}
        </div>
        <button className="carousel-arrow left" onClick={goToPrevious}>
          ❮
        </button>
        <div className="carousel-image-container" ref={imageRef}>
          <img src={images[current]} alt={`Slide ${current + 1}`} />
        </div>
        {isValidCaption(captions[current]) && (
          <div className="carousel-caption" ref={captionRef}>
            {renderCaption(captions[current])}
          </div>
        )}
        <button className="carousel-arrow right" onClick={goToNext}>
          ❯
        </button>
      </div>
    </>
  );
};

export default PhotoCarousel;
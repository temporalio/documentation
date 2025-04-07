import React, { useState, useEffect, useRef } from 'react';

const PhotoCarousel = ({ images = [], captions = [] }) => {
  const [current, setCurrent] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [imageHeight, setImageHeight] = useState('auto');
  const carouselRef = useRef(null);
  const imageRef = useRef(null);
  const captionRef = useRef(null);

  // Prefetch images
  useEffect(() => {
    const imageObjects = {};
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [index]: true }));
      };
      imageObjects[index] = img;
    });
    return () => {
      Object.values(imageObjects).forEach(img => {
        img.onload = null;
      });
    };
  }, [images]);

  // Update image height on mount and resize
  useEffect(() => {
    const updateImageHeight = () => {
      if (carouselRef.current && images[current]) {
        const img = new Image();
        img.src = images[current];
        img.onload = () => {
          const carouselWidth = carouselRef.current.offsetWidth;
          const aspectRatio = img.height / img.width;
          const calculatedHeight = Math.min(carouselWidth * aspectRatio, 600);
          setImageHeight(`${calculatedHeight}px`);
        };
      }
    };

    updateImageHeight();
    window.addEventListener('resize', updateImageHeight);
    return () => window.removeEventListener('resize', updateImageHeight);
  }, [current, images]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current]);

  const goToPrevious = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const goToNext = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const isValidCaption = (caption) =>
    caption && caption.trim().toUpperCase() !== 'NA';

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
            max-width: 1000px;
            margin: 0 auto;
            overflow: visible;
            border: 2px solid #ccc;
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
            overflow: hidden;
          }
          .carousel img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            display: block;
            border-radius: 10px;
          }
          .carousel-caption {
            margin-top: 20px;
            margin-bottom: 20px;
            font-size: 16px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            color: #222;
            text-align: left;
            width: 100%;
            padding: 0 16px;
            word-wrap: break-word;
          }
          .carousel-arrow {
            position: absolute;
            top: calc(${imageHeight} / 2);
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
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0,0,0,0);
            white-space: nowrap;
            border: 0;
          }
          .image-preloader {
            position: absolute;
            width: 0;
            height: 0;
            overflow: hidden;
            z-index: -1;
          }
        `}
      </style>
      <div
        className="carousel"
        ref={carouselRef}
        role="region"
        aria-label="Photo carousel"
      >
        <div className="carousel-index">
          Image {current + 1} out of {images.length}
          <span className="sr-only">
            Showing image {current + 1} of {images.length}
          </span>
        </div>
        <button
          className="carousel-arrow left"
          onClick={goToPrevious}
          aria-label="Previous image"
          tabIndex={0}
        >
          ❮
        </button>
        <div className="carousel-image-container" ref={imageRef}>
          <img
            src={images[current]}
            alt={captions[current] || `Slide ${current + 1}`}
            role="img"
          />
        </div>
        {isValidCaption(captions[current]) && (
          <div
            className="carousel-caption"
            ref={captionRef}
            aria-live="polite"
          >
            {renderCaption(captions[current])}
          </div>
        )}
        <button
          className="carousel-arrow right"
          onClick={goToNext}
          aria-label="Next image"
          tabIndex={0}
        >
          ❯
        </button>
      </div>
      <div className="image-preloader" aria-hidden="true">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Preload ${index}`} />
        ))}
      </div>
    </>
  );
};

export default PhotoCarousel;
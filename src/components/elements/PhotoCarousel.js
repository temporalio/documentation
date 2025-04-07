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
        setImagesLoaded(prev => ({
          ...prev,
          [index]: true
        }));
      };
      imageObjects[index] = img;
    });
    
    return () => {
      // Clean up image objects if needed
      Object.values(imageObjects).forEach(img => {
        img.onload = null;
      });
    };
  }, [images]);

  // Set fixed height for the image area only, not the entire carousel
  useEffect(() => {
    if (imageRef.current && carouselRef.current) {
      const img = new Image();
      img.src = images[current];
      img.onload = () => {
        const carouselWidth = carouselRef.current.offsetWidth;
        // Calculate aspect ratio and set height
        const aspectRatio = img.height / img.width;
        const calculatedHeight = Math.min(carouselWidth * aspectRatio, 600); // Cap height at 600px
        setImageHeight(`${calculatedHeight}px`);
      };
    }
  }, [current, images]);

  const goToPrevious = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const goToNext = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  // Helper to check if a caption is valid (i.e., not "NA")
  const isValidCaption = (caption) =>
    caption && caption.trim().toUpperCase() !== 'NA';

  // Don't provide a caption if "NA" is passed in as the caption
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
          
          /* Hide images div for prefetching */
          .image-preloader {
            position: absolute; 
            width: 0; 
            height: 0; 
            overflow: hidden; 
            z-index: -1;
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
      {/* Hidden div for preloading images */}
      <div className="image-preloader">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Preload ${index}`} />
        ))}
      </div>
    </>
  );
};

export default PhotoCarousel;
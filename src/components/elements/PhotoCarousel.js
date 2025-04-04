import React, { useState } from 'react';

const PhotoCarousel = ({ images = [], captions = [] }) => {
  const [current, setCurrent] = useState(0);

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
            overflow: hidden;
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

          .carousel-content {
            display: flex;
          }

          .carousel-item {
            flex: 0 0 100%;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .carousel-item.active {
            display: flex;
          }

          .carousel img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 10px;
          }

          .carousel-caption {
            margin-top: 16px;
            font-size: 16px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            color: #222;
            text-align: left;
            width: 100%;
            padding: 0 16px;
          }

          .carousel-arrow {
            position: absolute;
            top: 50%;
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
      <div className="carousel">
        <div className="carousel-index">
          Image {current + 1} out of {images.length}
        </div>
        <button className="carousel-arrow left" onClick={goToPrevious}>
          ❮
        </button>
        <div className="carousel-content">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === current ? 'active' : ''}`}
            >
              {index === current && (
                <>
                  <img src={image} alt={`Slide ${index + 1}`} />
                  {isValidCaption(captions[index]) && (
                    <div className="carousel-caption">
                      {renderCaption(captions[index])}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        <button className="carousel-arrow right" onClick={goToNext}>
          ❯
        </button>
      </div>
    </>
  );
};

export default PhotoCarousel;  
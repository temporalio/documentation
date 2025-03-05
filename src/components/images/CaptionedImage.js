// src/components/captioned-image/CaptionedImage.js
import React, { useState } from "react";
import styles from "./CaptionedImage.module.css";

const CaptionedImage = ({ src, alt, title, width, inset = "0%", zoom = false }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const isSVG = src.endsWith(".svg");

  const toggleZoom = () => {
    if (zoom) { // Only toggle zoom if zoom prop is true
      setIsZoomed(!isZoomed);
    }
  };

  return (
    <div
      className={styles.imageContainer}
      style={{
        width: width || "auto",
        paddingLeft: inset,
        paddingRight: inset,
        cursor: zoom ? "pointer" : "default", // Change cursor if zoom is enabled
        position: "relative", // Keep the container in its normal position
        display: "inline-block", // Keep image in line with text
      }}
      onClick={toggleZoom} // Toggle zoom on image container click if zoom is true
    >
      <img
        src={src}
        alt={alt || title}
        className={styles.image}
        style={{
          width: isZoomed && zoom ? "auto" : "100%", // Zoomed image behavior (only if zoom is true)
          height: isZoomed && zoom ? "auto" : "auto", // Keep height as auto to preserve aspect ratio
          maxWidth: isZoomed && zoom ? "none" : "100%", // Allow the image to exceed its container when zoomed (only if zoom is true)
          maxHeight: isZoomed && zoom ? "none" : "auto", // Allow the image to exceed its container when zoomed (only if zoom is true)
          objectFit: "contain", // Preserve aspect ratio for zoomed image
          transition: "transform 0.3s ease-in-out", // Smooth zoom transition
        }}
      />
      {title && <p className={styles.title}>{title}</p>}
    </div>
  );
};

export default CaptionedImage;

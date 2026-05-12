// src/components/captioned-image/CaptionedImage.js
import React, { useState } from "react";
import styles from "./CaptionedImage.module.css";

const CaptionedImage = ({ src, srcDark, alt, title, width, inset = "0%", zoom = false }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    if (zoom) {
      setIsZoomed(!isZoomed);
    }
  };

  const imgStyle = {
    width: isZoomed && zoom ? "auto" : "100%",
    height: "auto",
    maxWidth: isZoomed && zoom ? "none" : "100%",
    maxHeight: isZoomed && zoom ? "none" : "auto",
    objectFit: "contain",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <div
      className={styles.imageContainer}
      style={{
        width: width || "auto",
        paddingLeft: inset,
        paddingRight: inset,
        cursor: zoom ? "pointer" : "default",
        position: "relative",
        display: "inline-block",
      }}
      onClick={toggleZoom}
    >
      {srcDark ? (
        <>
          <img
            src={src}
            alt={alt || title}
            className={`${styles.image} ${styles.lightOnly}`}
            style={imgStyle}
          />
          <img
            src={srcDark}
            alt={alt || title}
            className={`${styles.image} ${styles.darkOnly}`}
            style={imgStyle}
          />
        </>
      ) : (
        <img
          src={src}
          alt={alt || title}
          className={styles.image}
          style={imgStyle}
        />
      )}
      {title && <p className={styles.title}>{title}</p>}
    </div>
  );
};

export default CaptionedImage;

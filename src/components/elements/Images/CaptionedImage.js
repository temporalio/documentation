// src/components/captioned-image/CaptionedImage.js
import React from "react";
import ZoomableImage from "./ZoomableImage";
import styles from "./CaptionedImage.module.css";

const CaptionedImage = ({ src, srcDark, alt, title, width, inset = "0%" }) => {
  return (
    <div
      className={styles.imageContainer}
      style={{
        width: width || "auto",
        paddingLeft: inset,
        paddingRight: inset,
        position: "relative",
        display: "inline-block",
      }}
    >
      <ZoomableImage
        src={src}
        srcDark={srcDark}
        alt={alt || title}
        className={styles.image}
      />
      {title && <p className={styles.title}>{title}</p>}
    </div>
  );
};

export default CaptionedImage;

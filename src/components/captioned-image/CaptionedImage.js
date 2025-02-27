// src/components/captioned-image/CaptionedImage.js
import React from "react";
import styles from "./CaptionedImage.module.css";

const CaptionedImage = ({ src, title }) => {
  return (
    <div className={styles.imageContainer}>
      <img src={src} alt={title} className={styles.image} />
      {title && <p className={styles.title}>{title}</p>}
    </div>
  );
};

export default CaptionedImage;

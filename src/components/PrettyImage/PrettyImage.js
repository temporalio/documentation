// src/components/pretty-image/PrettyImage.js
import React from "react";
import styles from "./PrettyImage.module.css";

const PrettyImage = ({ src, title }) => {
  return (
    <div className={styles.imageContainer}>
      {title && <p className={styles.title}>{title}</p>}
      <img src={src} alt={title} className={styles.image} />
    </div>
  );
};

export default PrettyImage;

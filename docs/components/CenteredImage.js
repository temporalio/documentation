import React from "react";

export default function CenteredImage({imagePath, imageSize, title}) {
  let imageClass = "";
  switch (imageSize) {
    case "50":
      imageClass = "docs-centered-image-size-50";
      break;
    case "75":
      imageClass = "docs-centered-image-size-75";
      break;
    default:
      imageClass = "docs-centered-image-size-100";
  }
  return (
    <div className={"docs-image-wrapper"}>
      <div className={"docs-image-title-wrapper"}>
        <p>{title}</p>
      </div>
      <div className={"docs-centered-image-wrapper"}>
        <img className={imageClass} src={imagePath} alt={title} />
      </div>
    </div>
  );
}

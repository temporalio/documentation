import React from "react";

export default function CenteredImage({imagePath, imageSize}) {
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
    <div className={"docs-centered-image-wrapper"}>
      <img className={imageClass} src={imagePath} />
    </div>
  );
}

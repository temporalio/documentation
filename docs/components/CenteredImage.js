import React from "react";

export default function CenteredImage({
  imagePath,
  imageSize,
  title,
  legendstring,
}) {
  const legendList = [];
  if (legendstring != undefined) {
    const items = legendstring.split("|");
    for (const item of items) {
      const parts = item.split("?");
      legendList.push({
        symbol: parts[0],
        description: parts[1],
      });
    }
  }
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
      {legendList.length > 0 && (
        <div className={"docs-image-legend-wrapper"}>
          <ul className={"docs-image-legend-list"}>
            {legendList.map(({symbol, description}) => (
              <li>
                <span className={"docs-image-legend-symbol"}>{symbol}</span> ={" "}
                {description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

export default function RelatedRead({
  text,
  goTo,
  tagChar,
}) {
  var tagClass;
  var tag;
  switch(tagChar) {
    case "g":
      tagClass="archetype-tag-guide";
      tag="guide";
      break;
    case "t":
      tagClass="archetype-tag-tutorial";
      tag="tutorial";
      break;
    case "e":
      tagClass="archetype-tag-tutorial";
      tag="explanation";
      break;
    default:
      tagClass="archetype-tag-reference";
      tag="reference";
  }
  return (
    <div
      className={"related-read-div"}
    >
      <b>Related:</b>
      <Link
        className={"related-read-link"}
        to={goTo}
      >
        {text}
      </Link>
      <span
        className={clsx(
          "archetype-tag",
          tagClass
        )}
      >
        {tag}
      </span>
    </div>
  );
}

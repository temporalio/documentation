import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

export default function RelatedRead({readliststring}) {
  const items = readliststring.split("|");
  let readingList = [];
  for (const item of items) {
    const parts = item.split("?");
    const tagStuff = tagInfo(parts[2])
    readingList.push({"text": parts[0], "goTo": parts[1], "tag": tagStuff.tag, "tagClass": tagStuff.tagClass});
  }

  return (
    <div className={"related-read-div"}>
      <span className={"related-read-label"}>Related 📚 </span>
      <ul className="related-read-list">
        {readingList.map(({text, goTo, tag, tagClass}) => (
          <li>
            <span className={clsx("related-read-archetype-tag", tagClass)}>{tag}</span>
            <Link className={"related-read-link"} to={goTo}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function tagInfo (tagChar) {
  var tagClass;
  var tag;
  switch (tagChar) {
    case "g":
      tagClass = "archetype-tag-guide";
      tag = "guide";
      break;
    case "t":
      tagClass = "archetype-tag-tutorial";
      tag = "tutorial";
      break;
    case "e":
      tagClass = "archetype-tag-explanation";
      tag = "explanation";
      break;
    default:
      tagClass = "archetype-tag-reference";
      tag = "reference";
  }
  return {"tag": tag, "tagClass": tagClass};
}

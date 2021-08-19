import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {v4 as uuidv4} from "uuid";

export default function RelatedReadList({readlist}) {
  let readingList = [];
  for (const item of readlist) {
    const tagStuff = tagInfo(item[2]);
    readingList.push({
      id: uuidv4(),
      text: item[0],
      goTo: item[1],
      tag: tagStuff.tag,
      tagClass: tagStuff.tagClass,
    });
  }
  if (readingList.length == 1) {
    return (
      <div className={"related-read-div"}>
        <span className={"related-read-label"}>Related 📚 </span>
        {readingList.map(({id, text, goTo, tag, tagClass}) => (
          <span key={id}>
            <Link className={"related-read-link"} to={goTo}>
              {text}
            </Link>
            <span className={clsx("related-read-archetype-tag", tagClass)}>
              {tag}
            </span>
          </span>
        ))}
      </div>
    );
  } else {
    return (
      <div className={"related-read-div"}>
        <span className={"related-read-label"}>Related 📚 </span>
        <ul className="related-read-list">
          {readingList.map(({id, text, goTo, tag, tagClass}) => (
            <li key={id}>
              <Link className={"related-read-link"} to={goTo}>
                {text}
              </Link>
              <span className={clsx("related-read-archetype-tag", tagClass)}>
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function tagInfo(tagChar) {
  var tagClass;
  var tag;
  switch (tagChar) {
    case "dg":
      tagClass = "archetype-tag-guide";
      tag = "developer guide";
      break;
    case "og":
      tagClass = "archetype-tag-guide";
      tag = "operations guide";
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
  return {tag: tag, tagClass: tagClass};
}

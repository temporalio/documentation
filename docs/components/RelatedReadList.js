import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {v4 as uuidv4} from "uuid";

export default function RelatedReadList({readlist}) {
  let readingList = [];
  for (const item of readlist) {
    // validate
    const text = item[0];
    if (text.startsWith("/") || text.startsWith("#"))
      throw new Error(
        `readlist item "${text}" looks like a URL, did you forget the sequence?`
      );
    const goTo = item[1];
    if (!goTo.startsWith("/") || !goTo.startsWith("#"))
      throw new Error(
        `goTo parameter ${goTo} doesnt start with / or #: was there a mistake?`
      );
    const tagStuff = tagInfo(item[2]);
    if (tagStuff instanceof Error) throw tagStuff;
    // form data structure
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
    case "r":
      tagClass = "archetype-tag-reference";
      tag = "reference";
      break;
    default:
      return new Error("unrecognized tag class " + tagChar);
  }
  return {tag: tag, tagClass: tagClass};
}

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {v4 as uuidv4} from "uuid";

export default function RelatedReadList({readlist}) {
  let readingList = [];
  for (const item of readlist) {
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

function tagInfo(tag) {
  var tagClass;
  switch (tag) {
    case "developer guide":
      tagClass = "archetype-tag-developer-guide";
      break;
    case "operation guide":
      tagClass = "archetype-tag-operation-guide";
      break;
    case "tutorial":
      tagClass = "archetype-tag-tutorial";
      break;
    case "explanation":
      tagClass = "archetype-tag-explanation";
      break;
    case "reference":
      tagClass = "archetype-tag-reference";
      break;
    default:
      return new Error("unrecognized tag: " + tag);
  }
  return {tag: tag, tagClass: tagClass};
}

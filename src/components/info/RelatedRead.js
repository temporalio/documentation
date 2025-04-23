import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./RelatedRead.module.css";

const archetypeClasses = {
  encyclopedia: "archetype-tag-encyclopedia-article",
  "feature-guide": "archetype-tag-feature-guide",
  "feature-summary": "archetype-tag-feature-summary",
};

const languageIcons = {
  Go: "/img/sdks/svgs/golang.svg",
  Java: "/img/sdks/svgs/java.svg",
  PHP: "/img/sdks/svgs/php.svg",
  Python: "/img/sdks/svgs/python.svg",
  TypeScript: "/img/sdks/svgs/typescript.svg",
  ".NET": "/img/sdks/svgs/dotnet.svg",
  "Temporal CLI": "/img/assets/terminal.svg",
};

const encyclopediaIcon = "/img/assets/link-preview-icon.svg";

function getTagClass(tag) {
  return archetypeClasses[tag] || null;
}

function getLanguageIcon(text) {
  for (const lang in languageIcons) {
    if (text.includes(lang)) {
      return languageIcons[lang];
    }
  }
  return null;
}

export function RelatedReadContainer({ children }) {
  return (
    <div className={styles.relatedReadDiv}>
      <span className={styles.relatedReadLabel}>Related 📚</span>
      {React.Children.count(children) > 1 ? (
        <ul className={styles.relatedReadList}>
          {React.Children.map(children, (child) => (
            <li key={self.crypto.randomUUID()}>{child}</li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  );
}

export function RelatedReadItem({ path, text, archetype }) {
  const tagClass = getTagClass(archetype);
  const languageIcon = getLanguageIcon(text);
  const isEncyclopedia = archetype === "encyclopedia";
  return (
    <div>
      <Link className={styles.relatedReadLink} to={path}>
        {isEncyclopedia && <img src={encyclopediaIcon} alt="" className={styles.encyclopediaIcon} />}
        {languageIcon && <img src={languageIcon} alt="" className={styles.languageIcon} />}
        {text}
      </Link>
      {tagClass && <span className={clsx(styles.archetypeTag, styles[tagClass])}>{archetype}</span>}
    </div>
  );
}

// InfoIcon component remains the same
function InfoIcon() {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <svg xmlns="http://www.w3.org/2000/svg" height="0.75rem" width="0.75rem" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

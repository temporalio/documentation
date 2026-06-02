// src/components/info/ReleaseNoteHeader/index.js

import React from "react";
import clsx from "clsx";
import { LANGUAGE_ICONS } from "../constants";
import SdkSvg from '../../elements/SdkSvgs/SdkSvg';
import styles from "./ReleaseNoteHeader.module.css";

export const RELEASE_TYPES = {
  prerelease: {
    label: "Pre-release",
    descriptionLink: "/evaluate/development-production-features/release-stages#pre-release",
    backgroundColor: "var(--release-prerelease-bg)",
    borderColor: "var(--release-prerelease-border)",
    textColor: "var(--release-prerelease-text)",
  },
  publicPreview: {
    label: "Public Preview",
    descriptionLink: "/evaluate/development-production-features/release-stages#public-preview",
    backgroundColor: "var(--release-public-preview-bg)",
    borderColor: "var(--release-public-preview-border)",
    textColor: "var(--release-public-preview-text)",
  },
  generalAvailability: {
    label: "General Availability",
    descriptionLink: "/evaluate/development-production-features/release-stages#general-availability",
    backgroundColor: "var(--release-ga-bg)",
    borderColor: "var(--release-ga-border)",
    textColor: "var(--release-ga-text)",
  },
};

const LANGUAGE_TO_SDK_SVG = {
  ".NET": "dotnetBlock",
  "Go": "goLangBlock",
  "Java": "javaBlock",
  "PHP": "phpBlock",
  "Python": "pythonBlock",
  "Ruby": "rubyBlock",
  "Rust": "rustBlock",
  "TypeScript": "typeScriptBlock",
}

function getTheme(type, overrides = {}) {
  return {
    ...(RELEASE_TYPES[type] || RELEASE_TYPES.generalAvailability),
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, value]) => value !== undefined)
    ),
  };
}

export default function ReleaseNoteHeader({
  // type can be "prerelease", "publicPreview", or "generalAvailability"
  type = "generalAvailability",
  // If there is anything specific to say about the release, it can be passed here. It can also be a link if href is provided.
  text,
  // If text is a link, this is where the link can be passed.
  href,
  // These are the supported languages for the release. If provided, icons for these languages will be shown.
  languages = [],
  // If you want to override the default label for the release type, you can pass it here. This is useful for cases like "generalAvailability" where you might want to just say "Stable".
  label,
}) {
  const theme = getTheme(type);

  const releaseLabel = label || theme.label;

  const style = {
    "--release-note-background": theme.backgroundColor,
    "--release-note-border": theme.borderColor,
    "--release-note-text": theme.textColor,
  };

  return (
    <aside
      className={styles.releaseNoteHeader}
      style={style}
      role="note"
      aria-label={releaseLabel}
      data-release-type={type}
    >
      <div className={styles.accent} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.pill}>
            <a href={theme.descriptionLink} className={styles.link}>
              Currently in: {releaseLabel}
            </a>
          </span>
        </div>
        <div className={styles.supportedLanguages}>
          <p className={styles.text}>Supported languages:</p>
          {languages.length > 0 && (
              <ul className={styles.languages} aria-label="Supported languages">
                {languages.map((language) => (
                    <li key={language} className={styles.language}>
                      <SdkSvg name={LANGUAGE_TO_SDK_SVG[language]} />
                    </li>
                  )
                )}
              </ul>
            )}
        </div>
        <p className={styles.text}>
          {href ? (
            <a href={href} className={styles.link}>
              {text}
            </a>
          ) : (
            text
          )}
        </p>
      </div>
    </aside>
  );
}
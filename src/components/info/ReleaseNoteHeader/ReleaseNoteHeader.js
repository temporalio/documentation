// src/components/info/ReleaseNoteHeader/index.js

import React from "react";
import Link from "@docusaurus/Link";
import SdkSvg from '../../elements/SdkSvgs/SdkSvg';
import styles from "./ReleaseNoteHeader.module.css";
import { FEATURE_RELEASE_TYPES } from "../../../constants/featureReleaseTypes";

export const BASE_RELEASE_STAGES = {
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

const LANGUAGE_TO_SDK_SLUG = {
  ".NET": "dotnet",
  "Go": "go",
  "Java": "java",
  "PHP": "php",
  "Python": "python",
  "Ruby": "ruby",
  "Rust": "rust",
  "TypeScript": "typescript",
}

function getResolvedType({ featureName, type }) {
  return FEATURE_RELEASE_TYPES[featureName] || type || "publicPreview";
}

function getTheme(type, overrides = {}) {
  return {
    ...(BASE_RELEASE_STAGES[type] || BASE_RELEASE_STAGES.publicPreview),
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, value]) => value !== undefined)
    ),
  };
}

export default function ReleaseNoteHeader({
  // type can be "prerelease" or "publicPreview"
  type = "publicPreview",
  // name of the feature being released
  featureName,
  // If there is anything specific to say about the release, it can be passed as a child to the component. It can also be a link if href is provided.
  children = "APIs and configuration may change before the stable release.",
  // If child is a link, this is where the link can be passed.
  href,
  // These are the supported languages for the release. If provided, icons for these languages will be shown.
  languages = [],
  // Path segment after /develop/<sdk>/ for linked language icons).
  guidePath,
  // If you want to override the default label for the release type, you can pass it here. This is useful for cases like "generalAvailability" where you might want to just say "Stable".
  label,
}) {
  const resolvedType = getResolvedType({ featureName, type });
  const theme = getTheme(resolvedType);

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
        {languages.length > 0 && (
          <div className={styles.supportedLanguages}>
            <p className={styles.text}>Supported languages:</p>
                <ul className={styles.languages} aria-label="Supported languages">
                  {languages.map((language) => {
                    const icon = (
                      <SdkSvg name={LANGUAGE_TO_SDK_SVG[language]} />
                    );
                    const sdkSlug = LANGUAGE_TO_SDK_SLUG[language];
                    return (
                      <li key={language} className={styles.language}>
                        {guidePath && sdkSlug ? (
                          <Link
                            to={`/develop/${sdkSlug}/${guidePath}`}
                            className={styles.languageLink}
                            aria-label={`${language} getting started guide`}
                          >
                            {icon}
                          </Link>
                        ) : (
                          icon
                        )}
                      </li>
                    );
                  })}
                </ul>
          </div>
        )}
        <p className={styles.text}>
          {href ? (
            <a href={href} className={styles.link}>
              {children}
            </a>
          ) : (
            children
          )}
        </p>
      </div>
    </aside>
  );
}
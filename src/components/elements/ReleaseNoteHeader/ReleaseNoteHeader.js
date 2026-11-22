import React from 'react';
import Link from '@docusaurus/Link';
import styles from './ReleaseNoteHeader.module.css';
import { BASE_RELEASE_STAGES, resolveReleaseStage, sdkChips } from './releaseStage';

export default function ReleaseNoteHeader({
  // type can be "prerelease" or "publicPreview"
  type = 'publicPreview',
  // name of the feature being released; its stage comes from src/constants/featureReleaseTypes.js
  featureName,
  // If there is anything specific to say about the release, it can be passed as a child to the component. It can also be a link if href is provided.
  children = 'APIs and configuration may change before the stable release.',
  // If child is a link, this is where the link can be passed.
  href,
  // The SDKs the release supports. Each one shows as a chip below the text.
  languages = [],
  // Path segment after /develop/<sdk>/. When set, each SDK chip links to that SDK's page.
  guidePath,
  // Overrides the stage name shown in the tag, for example "Stable".
  label,
}) {
  const stage = resolveReleaseStage({ featureName, type });
  const { label: stageLabel, descriptionLink } = BASE_RELEASE_STAGES[stage];
  const releaseLabel = label || stageLabel;
  const chips = sdkChips(languages, guidePath);

  return (
    <aside className={styles.releaseNoteHeader} role="note" aria-label={releaseLabel} data-release-type={stage}>
      <a href={descriptionLink} className={styles.stage}>
        {releaseLabel}
      </a>
      <div className={styles.text}>
        {href ? (
          <a href={href} className={styles.link}>
            {children}
          </a>
        ) : (
          children
        )}
      </div>
      {chips.length > 0 && (
        <div className={styles.sdks}>
          <span className={styles.sdksLabel}>SDKs</span>
          <ul className={styles.sdkList} aria-label="Supported SDKs">
            {chips.map(({ language, href: guideHref }) => (
              <li key={language} className={styles.sdkItem}>
                {guideHref ? (
                  <Link to={guideHref} className={styles.sdk} aria-label={`${language} guide`}>
                    {language}
                    <span className={styles.sdkArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                ) : (
                  <span className={styles.sdk}>{language}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

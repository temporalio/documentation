// ⚠️  LLM MARKDOWN PIPELINE: the homepage COPY now lives in docs/index.mdx,
// authored as MDX and composed from the presentational components below. These
// components carry only layout/styling — no hardcoded copy. The Markdown mirror
// is produced by the transformer's hero handlers (scripts/mdx-to-md.mjs +
// scripts/component-handlers/hero.mjs), which read the props/children straight
// out of docs/index.mdx. See MARKDOWN_PIPELINE.md.
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { SdkLogosAsBlocks } from './Sdk';
import '../../css/homepage-hero.css';

// Light/dark icon pair. `name` maps to /img/icons/<name>-24x24.svg (light) and
// /img/icons/<name>-dark-mode-24x24.svg (dark); the CSS toggles which is shown.
export const HeroIcon = ({ name, alt }) => (
  <>
    <img
      src={useBaseUrl(`/img/icons/${name}-dark-mode-24x24.svg`)}
      alt={alt}
      className="icon-dark-mode"
      width={24}
      height={24}
    />
    <img
      src={useBaseUrl(`/img/icons/${name}-24x24.svg`)}
      alt={alt}
      className="icon-light-mode"
      width={24}
      height={24}
    />
  </>
);

export const HeroWrapper = ({ children }) => <div className="homepage-hero-wrapper">{children}</div>;

export const HeroHeader = ({ children }) => (
  <div className="hero-main-title-container">
    <header className="hero-main-title">{children}</header>
    <div className="quickstart-links">
      <SdkLogosAsBlocks />
    </div>
  </div>
);

export const HeroSection = ({ children }) => <div className="hero-section">{children}</div>;

export const HeroContent = ({ children }) => <div className="hero-content">{children}</div>;

// Rendered as a real <h1> by React (not authored as a Markdown `#`) so it does
// NOT pass through the theme's MDX `h1` override, which would attach the on-page
// LLM actions row. Keeps the .hero-content h1 styling; copy still lives in the MDX.
export const HeroHeadline = ({ children }) => <h1>{children}</h1>;

export const HeroActions = ({ children }) => <div className="hero-actions">{children}</div>;

export const HeroCta = ({ href, children }) => (
  <a href={href} className="hero-cta">
    {children}
    <svg fill="none" height="18" viewBox="0 0 21 18" width="21" xmlns="http://www.w3.org/2000/svg">
      <path d="m20.1094 9.5625-7.1719 7.2187-.7969.7969-1.5937-1.5937.7969-.7969 5.25-5.29688h-15.4688-1.125v-2.25h1.125 15.4688l-5.25-5.25-.7969-.79687 1.5937-1.59375.7969.796875 7.1719 7.171875.7968.79687z" />
    </svg>
  </a>
);

export const ActionCard = ({ href, icon, iconAlt, title, children }) => (
  <a href={href} className="action-card">
    <div className="action-card-inner">
      <div className="action-icon">
        <HeroIcon name={icon} alt={iconAlt || `${title} icon`} />
      </div>
      <div className="action-content">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  </a>
);

export const CommunityCards = ({ children }) => <div className="community-cards">{children}</div>;

// `href` is consumed only by the Markdown pipeline (the rendered card is not a
// link — its description carries the inline link, matching the original design).
export const CommunityCard = ({ icon, iconAlt, title, children }) => (
  <div className="community-card">
    <div className="community-icon">
      <HeroIcon name={icon} alt={iconAlt || title} />
    </div>
    <h3>{title}</h3>
    <p>{children}</p>
  </div>
);

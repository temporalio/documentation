import React from 'react';
import Navbar from '@theme-original/Navbar';
import Head from '@docusaurus/Head';
import navigation from '@site/src/data/navigation.json';
import './styles.css';

const tokenStyles = ['light', 'dark'].map((mode) => {
  const tokens = navigation.tokens[mode];
  return `
  html[data-theme='${mode}'] .navbar {
    --ifm-navbar-background-color: ${tokens.background};
    --ifm-navbar-link-color: ${tokens.text};
    --ifm-navbar-link-hover-color: ${tokens.textHover};
    --universal-nav-icon: ${tokens.icon};
    --universal-nav-icon-hover: ${tokens.iconHover};
  }
`;
}).join('\n');

export default function NavbarWrapper(props) {
  return (
    <>
      <Head><style>{tokenStyles}</style></Head>
      <Navbar {...props} />
    </>
  );
} 
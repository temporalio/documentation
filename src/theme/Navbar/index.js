import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import Head from '@docusaurus/Head';
import navigation from '@site/src/data/navigation.json';
import NavbarContent from './Content';
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

export default function Navbar() {
  return (
    <>
      <Head><style>{tokenStyles}</style></Head>
      <NavbarLayout>
        <NavbarContent />
      </NavbarLayout>
    </>
  );
} 
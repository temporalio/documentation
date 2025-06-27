import React from 'react';
import Navbar from '@theme-original/Navbar';
import { useLocation } from '@docusaurus/router';
import './SecondaryNav.css';

const SecondaryNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define navigation sections and their corresponding nav items
  const navSections = {
    platform: {
      label: 'Platform Docs',
      items: [
        { label: 'Introduction', path: '/evaluate', active: currentPath.startsWith('/evaluate') },
        { label: 'Encyclopedia', path: '/encyclopedia', active: currentPath.startsWith('/encyclopedia') },
        { label: 'References', path: '/references', active: currentPath.startsWith('/references') },
        { label: 'Troubleshooting', path: '/troubleshooting', active: currentPath.startsWith('/troubleshooting') },
        { label: 'Security', path: '/security', active: currentPath === '/security' },
        { label: 'Glossary', path: '/glossary', active: currentPath === '/glossary' },
      ]
    },
    development: {
      label: 'Development',
      items: [
        { label: 'Go SDK', path: '/develop/go', active: currentPath.startsWith('/develop/go') },
        { label: 'Java SDK', path: '/develop/java', active: currentPath.startsWith('/develop/java') },
        { label: 'TypeScript SDK', path: '/develop/typescript', active: currentPath.startsWith('/develop/typescript') },
        { label: 'Python SDK', path: '/develop/python', active: currentPath.startsWith('/develop/python') },
        { label: '.NET SDK', path: '/develop/dotnet', active: currentPath.startsWith('/develop/dotnet') },
        { label: 'PHP SDK', path: '/develop/php', active: currentPath.startsWith('/develop/php') },
        { label: 'CLI', path: '/cli', active: currentPath.startsWith('/cli') },
      ]
    },
    cloud: {
      label: 'Temporal Cloud',
      items: [
        { label: 'Get Started', path: '/cloud/get-started', active: currentPath.startsWith('/cloud/get-started') },
        { label: 'Features', path: '/cloud', active: currentPath === '/cloud' || currentPath === '/cloud/' },
        { label: 'Metrics', path: '/cloud/metrics', active: currentPath.startsWith('/cloud/metrics') },
        { label: 'High Availability', path: '/cloud/high-availability', active: currentPath.startsWith('/cloud/high-availability') },
        { label: 'CLI (tcld)', path: '/cloud/tcld', active: currentPath.startsWith('/cloud/tcld') },
        { label: 'Operations API', path: '/ops', active: currentPath.startsWith('/ops') },
      ]
    },
    deployment: {
      label: 'Production Deployment',
      items: [
        { label: 'Overview', path: '/production-deployment', active: currentPath === '/production-deployment' },
        { label: 'Temporal Cloud', path: '/cloud', active: currentPath.startsWith('/cloud') },
        { label: 'Self-hosted', path: '/self-hosted-guide', active: currentPath.startsWith('/self-hosted-guide') },
        { label: 'Data Encryption', path: '/production-deployment/data-encryption', active: currentPath.includes('/data-encryption') },
        { label: 'Migration', path: '/production-deployment/migration', active: currentPath.includes('/migration') },
      ]
    }
  };

  // Determine which section we're in based on current path
  let currentSection = 'platform'; // default
  if (currentPath.startsWith('/develop') || currentPath.startsWith('/cli')) {
    currentSection = 'development';
  } else if (currentPath.startsWith('/cloud') || currentPath.startsWith('/ops')) {
    currentSection = 'cloud';
  } else if (currentPath.startsWith('/production-deployment') || currentPath.startsWith('/self-hosted-guide')) {
    currentSection = 'deployment';
  }

  const currentNav = navSections[currentSection];

  // Don't show secondary nav on homepage
  if (currentPath === '/' || currentPath === '/index') {
    return null;
  }

  return (
    <div className="secondary-navbar">
      <div className="secondary-navbar__container">
        <div className="secondary-navbar__section-title">
          {currentNav.label}
        </div>
        <nav className="secondary-navbar__nav">
          {currentNav.items.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={`secondary-navbar__item ${item.active ? 'secondary-navbar__item--active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default function NavbarWrapper(props) {
  return (
    <>
      <Navbar {...props} />
      <SecondaryNavbar />
    </>
  );
} 
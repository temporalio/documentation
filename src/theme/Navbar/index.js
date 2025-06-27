import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@theme-original/Navbar';
import { useLocation } from '@docusaurus/router';
import './SecondaryNav.css';

const SecondaryNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Main navigation that appears by default
  const mainNavigation = {
    label: 'Documentation',
    items: [
      { 
        label: 'Getting Started', 
        path: 'https://learn.temporal.io/getting_started/', 
        active: false,
        external: true 
      },
      { 
        label: 'SDKs', 
        path: '/develop', 
        active: currentPath.startsWith('/develop') || currentPath.startsWith('/cli')
      },
      { 
        label: 'Temporal Cloud', 
        path: '/cloud', 
        active: currentPath.startsWith('/cloud') || currentPath.startsWith('/ops') 
      },
      { 
        label: 'References', 
        path: '/references', 
        active: currentPath.startsWith('/references') 
      },
      { 
        label: 'Concepts', 
        path: '/encyclopedia', 
        active: currentPath.startsWith('/encyclopedia') || 
                currentPath.startsWith('/troubleshooting') ||
                currentPath === '/security' ||
                currentPath === '/glossary' ||
                currentPath.startsWith('/evaluate')
      },
    ]
  };

  // Detailed section navigations
  const sectionNavigations = {
    development: {
      label: 'SDKs',
      showBackToMain: true,
      items: [
        { label: 'Overview', path: '/develop', active: currentPath === '/develop' },
        { label: 'Go SDK', path: '/develop/go', active: currentPath.startsWith('/develop/go') },
        { label: 'Java SDK', path: '/develop/java', active: currentPath.startsWith('/develop/java') },
        { label: 'TypeScript SDK', path: '/develop/typescript', active: currentPath.startsWith('/develop/typescript') },
        { label: 'Python SDK', path: '/develop/python', active: currentPath.startsWith('/develop/python') },
        { label: '.NET SDK', path: '/develop/dotnet', active: currentPath.startsWith('/develop/dotnet') },
        { label: 'PHP SDK', path: '/develop/php', active: currentPath.startsWith('/develop/php') },
        { label: 'CLI (temporal)', path: '/cli', active: currentPath.startsWith('/cli') },
      ]
    },
    cloud: {
      label: 'Temporal Cloud',
      showBackToMain: true,
      items: [
        { label: 'Overview', path: '/cloud', active: currentPath === '/cloud' || currentPath === '/cloud/' },
        { label: 'Get Started', path: '/cloud/get-started', active: currentPath.startsWith('/cloud/get-started') },
        { label: 'Metrics', path: '/cloud/metrics', active: currentPath.startsWith('/cloud/metrics') },
        { label: 'High Availability', path: '/cloud/high-availability', active: currentPath.startsWith('/cloud/high-availability') },
        { label: 'CLI (tcld)', path: '/cloud/tcld', active: currentPath.startsWith('/cloud/tcld') },
        { label: 'Operations API', path: '/ops', active: currentPath.startsWith('/ops') },
      ]
    },
    concepts: {
      label: 'Concepts',
      showBackToMain: true,
      items: [
        { label: 'Introduction', path: '/evaluate', active: currentPath.startsWith('/evaluate') },
        { label: 'Encyclopedia', path: '/encyclopedia', active: currentPath.startsWith('/encyclopedia') },
        { label: 'References', path: '/references', active: currentPath.startsWith('/references') },
        { label: 'Troubleshooting', path: '/troubleshooting', active: currentPath.startsWith('/troubleshooting') },
        { label: 'Security', path: '/security', active: currentPath === '/security' },
        { label: 'Glossary', path: '/glossary', active: currentPath === '/glossary' },
      ]
    },
    deployment: {
      label: 'Production Deployment',
      showBackToMain: true,
      items: [
        { label: 'Overview', path: '/production-deployment', active: currentPath === '/production-deployment' },
        { label: 'Temporal Cloud', path: '/cloud', active: currentPath.startsWith('/cloud') },
        { label: 'Self-hosted', path: '/self-hosted-guide', active: currentPath.startsWith('/self-hosted-guide') },
        { label: 'Data Encryption', path: '/production-deployment/data-encryption', active: currentPath.includes('/data-encryption') },
        { label: 'Migration', path: '/production-deployment/migration', active: currentPath.includes('/migration') },
      ]
    }
  };

  // Helper functions defined before they're used
  const renderNavItem = (item, index) => {
    return (
      <a
        key={index}
        href={item.path}
        className={`secondary-navbar__item ${item.active ? 'secondary-navbar__item--active' : ''}`}
        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.label}
        {item.external && (
          <svg 
            className="secondary-navbar__external-icon" 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            fill="none"
          >
            <path d="M3.5 3.5H8.5V8.5M8.5 3.5L3.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </a>
    );
  };

  const renderBackToMainButton = () => {
    if (!showDetailedNav || !currentNav.showBackToMain) return null;
    
    return (
      <a
        href="/"
        className="secondary-navbar__back-button"
        title="Go to homepage"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Documentation
      </a>
    );
  };

  // Determine which navigation to show
  let currentNav = mainNavigation;
  let showDetailedNav = false;

  // Show detailed navigation ONLY for SDKs/Developer Guides section
  if (currentPath.startsWith('/develop/') || currentPath.startsWith('/cli/')) {
    currentNav = sectionNavigations.development;
    showDetailedNav = true;
  }
  // For all other sections (Cloud, References, Concepts), keep showing main navigation

  // Show secondary nav on all pages except homepage
  if (currentPath === '/') {
    return (
      <div className="secondary-navbar">
        <div className="secondary-navbar__container">
          <div className="secondary-navbar__section-title">
            {mainNavigation.label}
          </div>
          <nav className="secondary-navbar__nav">
            {mainNavigation.items.map((item, index) => renderNavItem(item, index))}
          </nav>
        </div>
      </div>
    );
  }

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="secondary-navbar">
      <div className="secondary-navbar__container">
        {renderBackToMainButton()}
        <a 
          href="/"
          className="secondary-navbar__section-title"
          title="Go to homepage"
        >
          {currentNav.label}
        </a>
        <nav className="secondary-navbar__nav">
          {currentNav.items.map((item, index) => renderNavItem(item, index))}
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
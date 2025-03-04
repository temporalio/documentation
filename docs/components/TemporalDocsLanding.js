import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import "/src/css/landing.css";

const TemporalDocsLanding = () => {
  const { colorMode } = useColorMode();
  const logoSrc =
    colorMode === "dark"
      ? "/homepage/Temporal_Symbol_light.png"
      : "/homepage/Temporal_Symbol_dark.png";

  const sdks = ["Go", "Java", "TypeScript", "PHP", "Python", ".NET"];

  const certifications = [
    { name: "Temporal 101", icon: logoSrc },
    { name: "Temporal 102", icon: logoSrc }
  ];

  const helpOptions = [
    {
      title: "Support",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
        </svg>
      ),
      link: "Contact Us"
    },
    {
      title: "Forum",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
        </svg>
      ),
      link: "Ask a Question"
    },
    {
      title: "Join Our Community",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path>
        </svg>
      ),
      link: "Connect on Slack"
    }
  ];

  return (
    <div className="docs-landing">
      <div className="container">
        {/* SDK Navigation */}
        <div className="section">
          <h2>Explore by SDK</h2>
          <p>Dive into the Temporal platform, SDKs, and best practices.</p>
          <div className="product-grid">
            {sdks.map((sdk) => (
              <div key={sdk} className="product-card">
                <img src={logoSrc} alt="Temporal Logo" className="product-icon" />
                <span>{sdk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Banners Side by Side with Correct Order */}
        <div className="banner-grid">
          <a href="#" className="banner-item">
            <img src="/homepage/search-banner.png" alt="Find what you need with search" className="full-width-banner" />
          </a>
          <a href="https://temporal.io/code-exchange" className="banner-item">
            <img src="/homepage/code-exchange.png" alt="Explore Code Exchange" className="full-width-banner" />
          </a>
        </div>

        {/* Help Section */}
        <div className="help-section">
          <h2>Get unstuck</h2>
          <p>Find answers, get help, and connect with the Temporal community.</p>
          <div className="help-grid">
            {helpOptions.map((option) => (
              <div key={option.title} className="help-card">
                <div className="help-icon">{option.icon}</div>
                <h3>{option.title}</h3>
                <a href="#" className="cta-link">
                  {option.link} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporalDocsLanding;

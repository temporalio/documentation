import React, { useEffect } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import "/src/css/landing.css";

const Icon = ({ children }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="section-icon"
  >
    {children}
  </svg>
);

const TemporalDocsLanding = () => {
  const { setColorMode } = useColorMode();

  // Set dark mode as default
  useEffect(() => {
    setColorMode('dark');
  }, []);

  const sections = [
    {
      title: "Getting started",
      icon: (
        <Icon>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </Icon>
      ),
      items: [
        { title: "Setup your Local Dev Env", link: "https://learn.temporal.io/getting_started/" },
        { title: "Run your First Temporal App", link: "https://learn.temporal.io/getting_started/" },
        { title: "Build a Temporal App from Scratch", link: "https://learn.temporal.io/getting_started/" },
        { title: "Take a free course", link: "https://learn.temporal.io/courses/" }
      ]
    },
    {
      title: "Develop",
      icon: (
        <Icon>
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </Icon>
      ),
      items: [
        { title: "Go SDK Developer Guide", link: "/develop/go" },
        { title: "Java SDK Developer Guide", link: "/develop/java" },
        { title: "PHP SDK Developer Guide", link: "/develop/php" },
        { title: "Python SDK Developer Guide", link: "/develop/python" },
        { title: "TypeScript SDK Developer Guide", link: "/develop/typescript" },
        { title: ".NET SDK Developer Guide", link: "/develop/dotnet" },
        { title: "Ruby SDK README", link: "https://github.com/temporalio/sdk-ruby#readme" }
      ]
    },
    {
      title: "Deploy",
      icon: (
        <Icon>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </Icon>
      ),
      items: [
        { title: "Self-Host", link: "https://docs.temporal.io/develop/" },
        { title: "Worker Performance", link: "https://docs.temporal.io/develop/worker-performance" },
        { title: "Production Checklist", link: "https://docs.temporal.io/self-hosted-guide/production-checklist" },
        { title: "Migrate to Temporal Cloud", link: "https://docs.temporal.io/production-deployments/migration" }
      ]
    },
    {
      title: "Temporal Cloud",
      icon: (
        <Icon>
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 0 9H4" />
        </Icon>
      ),
      items: [
        { title: "Account setup", link: "/cloud/account-setup" },
        { title: "User management", link: "/cloud/users" },
        { title: "Billing and cost", link: "/cloud/billing-and-cost" },
        { title: "Namespace management", link: "/cloud/namespaces" },
        { title: "Pricing", link: "/cloud/pricing" },
        { title: "API keys", link: "/cloud/api-keys" },
        { title: "Audit Logging", link: "/cloud/audit-logging" },
        { title: "Cloud Ops API", link: "/ops" },
        { title: "Temporal Nexus", link: "/cloud/nexus" },
        { title: "Export", link: "/cloud/export" }
      ]
    }
  ];

  const getUnstuckSection = {
    title: "Get unstuck",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </Icon>
    ),
    items: [
      { title: "Resource Library", link: "https://temporal.io/resources" },
      { title: "Ask in Stack", link: "https://t.mp/slack" },
      { title: "Post in Community Forum", link: "https://community.temporal.io" }
    ]
  };

  const observabilitySection = {
    title: "Monitor",
    icon: (
      <Icon>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </Icon>
    ),
    items: [
      { title: "Platform Metrics", link: "/references/cluster-metrics" },
      { title: "SDK Metrics", link: "/references/sdk-metrics" },
      { title: "Cloud Metrics", link: "/cloud/metrics" },
      { title: "Setup with Datadog", link: "/cloud/metrics/datadog" },
      { title: "Setup with Prometheus", link: "/cloud/metrics/prometheus-grafana" },
      { title: "Worker Health", link: "/production-deployment/cloud/worker-health" },
      { title: "Service Health", link: "/production-deployment/cloud/service-health" }
    ]
  };

  const securitySection = {
    title: "Secure",
    icon: (
      <Icon>
        <rect width="18" height="16" x="3" y="4" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <path d="M7 16h10" />
      </Icon>
    ),
    items: [
      { title: "Trust", link: "https://trust.temporal.io/" },
      { title: "Cloud Security", link: "/cloud/security" },
      { title: "Self-hosted Security", link: "/self-hosted-guide/security" }
    ]
  };

  const tutorialsSection = {
    title: "Tutorials",
    icon: (
      <Icon>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path d="M12 14l-6.16-3.422a12.083 12.083 0 00-.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 016.824-2.998 12.078 12.078 0 00-.665-6.479L12 14z" />
      </Icon>
    ),
    items: [
      { title: "Getting Started", link: "https://learn.temporal.io/getting_started/" },
      { title: "Infrastructure Tutorials", link: "https://learn.temporal.io/tutorials/infrastructure/" },
      { title: "One-Click Order App in TypeScript and Next.js", link: "https://learn.temporal.io/tutorials/typescript/build-one-click-order-app-nextjs/" },
      { title: "Trip Booking App in Python", link: "https://learn.temporal.io/tutorials/python/trip-booking-app/" }
    ]
  };

  const coursesSection = {
    title: "Courses",
    icon: (
      <Icon>
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </Icon>
    ),
    items: [
      { title: "Temporal 101: Introducing the Temporal Platform", link: "https://learn.temporal.io/courses/temporal_101/" },
      { title: "Temporal 102: Exploring Durable Execution", link: "https://learn.temporal.io/courses/temporal_102/" },
      { title: "Crafting an Error Handling Strategy", link: "https://learn.temporal.io/courses/errstrat/" },
      { title: "Introduction to Temporal Cloud", link: "https://learn.temporal.io/courses/intro_to_temporal_cloud/" }
    ]
  };

  const examplesSection = {
    title: "Examples",
    icon: (
      <Icon>
        <path d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </Icon>
    ),
    items: [
        { title: "Code Exchange", link: "https://temporal.io/code-exchange" },
        { title: "Project Based Tutorials", link: "https://learn.temporal.io/tutorials/" },
        { title: "Example Applications", link: "https://learn.temporal.io/examples/" }
    ]
  };

  return (
    <div className="docs-landing">
      <div className="container">
        <div className="main-grid">
          {sections.map((section, index) => (
            <div key={index} className="section-card">
              <div className="section-header">
                <span className="section-icon-wrapper">{section.icon}</span>
                <h2>{section.title}</h2>
              </div>
              <div className="section-links">
                {section.items.map((item, itemIndex) => (
                  <a 
                    key={itemIndex} 
                    href={item.link} 
                    className="section-link"
                    onClick={item.onClick}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
              {section.title === "Temporal Cloud" && (
                <a href="/cloud/get-started" className="get-started-button">
                  Get Started for Free
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="secondary-grid">
          <div className="section-row">
            <div className="section-card">
              <div className="section-header">
                <span className="section-icon-wrapper">{observabilitySection.icon}</span>
                <h2>{observabilitySection.title}</h2>
              </div>
              <div className="section-links">
                {observabilitySection.items.map((item, index) => (
                  <a key={index} href={item.link} className="section-link">
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="section-card">
              <div className="section-header">
                <span className="section-icon-wrapper">{securitySection.icon}</span>
                <h2>{securitySection.title}</h2>
              </div>
              <div className="section-links">
                {securitySection.items.map((item, index) => (
                  <a key={index} href={item.link} className="section-link">
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="section-card">
              <div className="section-header">
                <span className="section-icon-wrapper">{getUnstuckSection.icon}</span>
                <h2>{getUnstuckSection.title}</h2>
              </div>
              <div className="section-links">
                {getUnstuckSection.items.map((item, index) => (
                  <a key={index} href={item.link} className="section-link">
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="learning-section">
          <h1>More ways to learn</h1>
          <div className="learning-grid">
            {[tutorialsSection, coursesSection, examplesSection].map((section, index) => (
              <div key={index} className="section-card">
                <div className="section-header">
                  <span className="section-icon-wrapper">{section.icon}</span>
                  <h2>{section.title}</h2>
                </div>
                <div className="section-links">
                  {section.items.map((item, itemIndex) => (
                    <a 
                      key={itemIndex} 
                      href={item.link} 
                      className="section-link"
                      onClick={item.onClick}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporalDocsLanding;

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
        { title: "Setup your Local Dev Env", link: "/dev-guide/setup-local-dev-env" },
        { title: "Run your First Temporal App", link: "/dev-guide/run-first-temporal-app" },
        { title: "Build a Temporal App from Scratch", link: "/dev-guide/build-a-temporal-app-from-scratch" },
        { title: "Examples", link: "/dev-guide/examples" },
        { title: "Course", link: "/dev-guide/course" },
        { title: "Intro to Temporal Cloud", link: "/dev-guide/intro-to-temporal-cloud" }
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
        { title: "Temporal Client", link: "/dev-guide/temporal-client" },
        { title: "Workflows", link: "/dev-guide/workflows" },
        { title: "Activities", link: "/dev-guide/activities" },
        { title: "Workers", link: "/dev-guide/workers" },
        { title: "Testing", link: "/dev-guide/testing" },
        { title: "Failure Detection", link: "/dev-guide/failure-detection" },
        { title: "Interactive Workflows", link: "/dev-guide/interactive-workflows" },
        { title: "Namespaces", link: "/dev-guide/namespaces" },
        { title: "Cancellations", link: "/dev-guide/cancellations" },
        { title: "Schedules", link: "/dev-guide/schedules" },
        { title: "Nexus", link: "/dev-guide/nexus" },
        { title: "Versioning", link: "/dev-guide/versioning" }
      ]
    },
    {
      title: "Deploy",
      icon: (
        <Icon>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </Icon>
      ),
      items: [
        { title: "Self-Host", link: "/deploy/self-host" },
        { title: "Workers", link: "/deploy/workers" },
        { title: "Migrate to Temporal Cloud", link: "/deploy/migrate-to-temporal-cloud" },
        { title: "Production Readiness", link: "/deploy/production-readiness" }
      ]
    },
    {
      title: "Temporal Cloud",
      icon: (
        <Icon>
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M12 12v9" />
          <path d="m8 17 4 4 4-4" />
        </Icon>
      ),
      items: [
        { title: "Account Management", link: "/cloud/account-management" },
        { title: "Identity Management", link: "/cloud/identity-management" },
        { title: "Usage", link: "/cloud/usage" },
        { title: "Namespace Management", link: "/cloud/namespace-management" },
        { title: "Billing & Costs", link: "/cloud/billing-and-costs" },
        { title: "Automation", link: "/cloud/automation" },
        { title: "Audit Logging", link: "/cloud/audit-logging" },
        { title: "Temporal Cloud Limits", link: "/cloud/temporal-cloud-limits" },
        { title: "Temporal Cloud SLA", link: "/cloud/temporal-cloud-sla" },
        { title: "Support", link: "/cloud/support" }
      ]
    }
  ];

  const enhanceSection = {
    title: "Enhance",
    icon: (
      <Icon>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </Icon>
    ),
    items: [
      { title: "Optimize", link: "/enhance/optimize" },
      { title: "Fix", link: "/enhance/fix" },
      { title: "Fix", link: "/enhance/fix-2" },
      { title: "Fix", link: "/enhance/fix-3" }
    ]
  };

  const expandSection = {
    title: "Expand",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </Icon>
    ),
    items: [
      { title: "Next Use Case", link: "/expand/next-use-case" },
      { title: "Fix", link: "/expand/fix" },
      { title: "Fix", link: "/expand/fix-2" },
      { title: "Fix", link: "/expand/fix-3" }
    ]
  };

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
      { title: "Next Use Case", link: "/help/next-use-case" },
      { title: "Ask in Stack", link: "/help/ask-in-stack" },
      { title: "Post in Community Forum", link: "/help/post-in-community-forum" }
    ]
  };

  const observabilitySection = {
    title: "Observability",
    icon: (
      <Icon>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </Icon>
    ),
    items: [
      { title: "OSS Self-Hosted", link: "/observability/oss-self-hosted" },
      { title: "Tracing", link: "/observability/tracing" },
      { title: "Log from a Workflow", link: "/observability/log-from-workflow" },
      { title: "Visibility APIs", link: "/observability/visibility-apis" },
      { title: "Interceptors", link: "/observability/interceptors" },
      { title: "Temporal Cloud Available Metrics", link: "/observability/temporal-cloud-metrics" },
      { title: "Setup using Datadog", link: "/observability/setup-datadog" },
      { title: "Setup using Prometheus Grafana", link: "/observability/setup-prometheus-grafana" },
      { title: "Worker Health", link: "/observability/worker-health" },
      { title: "Service Health", link: "/observability/service-health" }
    ]
  };

  const securitySection = {
    title: "Security",
    icon: (
      <Icon>
        <rect width="18" height="16" x="3" y="4" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <path d="M7 16h10" />
      </Icon>
    ),
    items: [
      { title: "Temporal Security Model", link: "/security/temporal-security-model" },
      { title: "Temporal Cloud Security Model", link: "/security/temporal-cloud-security-model" },
      { title: "Trust", link: "/security/trust" }
    ]
  };

  const tutorialsSection = {
    title: "Tutorials",
    icon: (
      <Icon>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </Icon>
    ),
    items: [
      { title: "Tutorial 1", link: "/tutorials/tutorial-1" },
      { title: "Tutorial 1", link: "/tutorials/tutorial-2" },
      { title: "Tutorial 1", link: "/tutorials/tutorial-3" },
      { title: "Tutorial 1", link: "/tutorials/tutorial-4" }
    ]
  };

  const coursesSection = {
    title: "Courses",
    icon: (
      <Icon>
        <path d="M12 14c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z" />
        <path d="M12 14v7" />
        <path d="M9 18h6" />
      </Icon>
    ),
    items: [
      { title: "Course", link: "/courses/course-1" },
      { title: "Course", link: "/courses/course-2" },
      { title: "Course", link: "/courses/course-3" },
      { title: "Course", link: "/courses/course-4" }
    ]
  };

  const examplesSection = {
    title: "Examples",
    icon: (
      <Icon>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.29 7 12 12l8.71-5" />
        <path d="M12 22V12" />
      </Icon>
    ),
    items: [
      { title: "fix", link: "/examples/fix" },
      { title: "fix", link: "/examples/fix-2" },
      { title: "fix", link: "/examples/fix-3" },
      { title: "fix", link: "/examples/fix-4" }
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
                  <a key={itemIndex} href={item.link} className="section-link">
                    {item.title}
                  </a>
                ))}
              </div>
              {section.title === "Temporal Cloud" && (
                <a href="/cloud/get-started" className="get-started-button">
                  Get started for free
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="secondary-grid">
          <div className="section-row">
            <div className="section-card">
              <div className="section-header">
                <span className="section-icon-wrapper">{enhanceSection.icon}</span>
                <h2>{enhanceSection.title}</h2>
              </div>
              <div className="section-links">
                {enhanceSection.items.map((item, index) => (
                  <a key={index} href={item.link} className="section-link">
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="section-card">
              <div className="section-header">
                <span className="section-icon-wrapper">{expandSection.icon}</span>
                <h2>{expandSection.title}</h2>
              </div>
              <div className="section-links">
                {expandSection.items.map((item, index) => (
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
          </div>
        </div>

        <div className="learning-section">
          <h2>More ways to learn</h2>
          <div className="learning-grid">
            <div className="section-card">
              <div className="section-header">
                <span className="section-icon-wrapper">{tutorialsSection.icon}</span>
                <h2>{tutorialsSection.title}</h2>
              </div>
              <div className="section-links">
                {tutorialsSection.items.map((item, index) => (
                  <a key={index} href={item.link} className="section-link">
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="section-card">
              <div className="section-header">
                <span className="section-icon-wrapper">{coursesSection.icon}</span>
                <h2>{coursesSection.title}</h2>
              </div>
              <div className="section-links">
                {coursesSection.items.map((item, index) => (
                  <a key={index} href={item.link} className="section-link">
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="section-card">
              <div className="section-header">
                <span className="section-icon-wrapper">{examplesSection.icon}</span>
                <h2>{examplesSection.title}</h2>
              </div>
              <div className="section-links">
                {examplesSection.items.map((item, index) => (
                  <a key={index} href={item.link} className="section-link">
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporalDocsLanding;

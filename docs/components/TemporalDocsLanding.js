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
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 0 9H4" />
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
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path d="M12 14l-6.16-3.422a12.083 12.083 0 00-.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 016.824-2.998 12.078 12.078 0 00-.665-6.479L12 14z" />
      </Icon>
    ),
    items: [
      { title: "Build your first Temporal application", link: "/tutorials/first-app" },
      { title: "Learn Temporal step by step", link: "/tutorials/step-by-step" },
      { title: "Advanced patterns and practices", link: "/tutorials/advanced" },
      { title: "Language-specific tutorials", link: "/tutorials/languages" }
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
      { title: "Temporal fundamentals", link: "/courses/fundamentals" },
      { title: "Building resilient workflows", link: "/courses/resilient-workflows" },
      { title: "Advanced Temporal patterns", link: "/courses/advanced-patterns" },
      { title: "Best practices and architecture", link: "/courses/best-practices" }
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
      { title: "Sample applications", link: "/examples/sample-apps" },
      { title: "Code patterns library", link: "/examples/patterns" },
      { title: "Integration examples", link: "/examples/integrations" },
      { title: "Community showcase", link: "/examples/showcase" }
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
                    <a key={itemIndex} href={item.link} className="section-link">
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

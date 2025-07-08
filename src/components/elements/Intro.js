import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import { SdkLogos } from "./SdkLogos";

const coreConcepts = [
  {
    path: "https://learn.temporal.io/getting_started#set-up-your-development-environment",
    name: translate({
      id: "intro.coreConcepts.setupDev",
      message: "Set up your development environment",
    }),
  },
  {
    path: "https://learn.temporal.io/getting_started/#run-your-first-program",
    name: translate({
      id: "intro.coreConcepts.runFirstProgram",
      message: "Run your first program",
    }),
  },
  {
    path: "https://learn.temporal.io/getting_started/#run-your-first-program",
    name: translate({
      id: "intro.coreConcepts.buildApp",
      message: "Build an application from scratch",
    }),
  },
  {
    path: "https://learn.temporal.io/courses/",
    name: translate({
      id: "intro.coreConcepts.enrollCourse",
      message: "Enroll in a free course",
    }),
  },
];

const appDevGuideLinks = [
  {
    path: "/develop/go",
    name: translate({
      id: "intro.appDevGuide.go",
      message: "Go SDK developer guide",
    }),
  },
  {
    path: "/develop/java",
    name: translate({
      id: "intro.appDevGuide.java",
      message: "Java SDK developer guide",
    }),
  },
  {
    path: "/develop/python",
    name: translate({
      id: "intro.appDevGuide.python",
      message: "Python SDK developer guide",
    }),
  },
  {
    path: "/develop/typescript",
    name: translate({
      id: "intro.appDevGuide.typescript",
      message: "TypeScript SDK developer guide",
    }),
  },
  {
    path: "/develop/dotnet",
    name: translate({
      id: "intro.appDevGuide.dotnet",
      message: ".NET SDK developer guide",
    }),
  },
  {
    path: "/develop/php",
    name: translate({
      id: "intro.appDevGuide.php",
      message: "PHP SDK developer guide",
    }),
  },
  {
    path: "https://github.com/temporalio/sdk-ruby",
    name: translate({
      id: "intro.appDevGuide.ruby",
      message: "Ruby SDK README",
    }),
  },
];

const troubleshooting = [
  {
    path: "/troubleshooting/deadline-exceeded-error",
    name: translate({
      id: "intro.troubleshooting.deadlineExceeded",
      message: "Deadline exceeded",
    }),
  },
  {
    path: "/troubleshooting/last-connection-error",
    name: translate({
      id: "intro.troubleshooting.lastConnection",
      message: "Last connection",
    }),
  },
];

const prodDeployLinks = [
  {
    path: "/production-deployment",
    name: translate({
      id: "intro.prodDeploy.getStarted",
      message: "Get started deploying to production",
    }),
  },
];

const devTools = [
  {
    path: "/cli",
    name: translate({
      id: "intro.devTools.cli",
      message: "Temporal CLI",
    }),
  },
  {
    path: "/web-ui",
    name: translate({
      id: "intro.devTools.webUI",
      message: "Web UI",
    }),
  },
];

const references = [
  {
    path: "/references/commands",
    name: translate({
      id: "intro.references.commands",
      message: "Commands",
    }),
  },
  {
    path: "/references/events",
    name: translate({
      id: "intro.references.events",
      message: "Events",
    }),
  },
  {
    path: "/references/sdk-metrics",
    name: translate({
      id: "intro.references.sdkMetrics",
      message: "SDK metrics",
    }),
  },
  {
    path: "/references/cluster-metrics",
    name: translate({
      id: "intro.references.clusterMetrics",
      message: "Temporal Service metrics",
    }),
  },
  {
    path: "/references/errors",
    name: translate({
      id: "intro.references.errors",
      message: "Workflow Task errors",
    }),
  },
];

const selfHostedDeploymentGuide = [
  {
    path: "/self-hosted-guide/introduction",
    name: translate({
      id: "intro.selfHosted.introduction",
      message: "Introduction",
    }),
  },
  {
    path: "/self-hosted-guide/defaults",
    name: translate({
      id: "intro.selfHosted.defaults",
      message: "Defaults",
    }),
  },
  {
    path: "/self-hosted-guide/security",
    name: translate({
      id: "intro.selfHosted.security",
      message: "Security",
    }),
  },
  {
    path: "/self-hosted-guide/production-checklist",
    name: translate({
      id: "intro.selfHosted.productionChecklist",
      message: "Production checklist",
    }),
  },
  {
    path: "/self-hosted-guide/monitoring",
    name: translate({
      id: "intro.selfHosted.monitoring",
      message: "Monitoring",
    }),
  },
  {
    path: "/self-hosted-guide#visibility",
    name: translate({
      id: "intro.selfHosted.visibility",
      message: "Visibility",
    }),
  },
  {
    path: "/self-hosted-guide/upgrade-server",
    name: translate({
      id: "intro.selfHosted.upgradeServer",
      message: "Upgrade server",
    }),
  },
  {
    path: "/self-hosted-guide/multi-cluster-replication",
    name: translate({
      id: "intro.selfHosted.multiClusterReplication",
      message: "Multi-Cluster Replication",
    }),
  },
];

const displayLinks = (links) => {
  return links.map((link, i) => {
    return (
      <li className="" key={`${link.name} ${i}`}>
        <div className="landing-card-list-item">
          <Link to={useBaseUrl(link.path)} className="hover:underline font-normal">
            {link.name}
          </Link>
        </div>
      </li>
    );
  });
};

function Card({ title, content, links = [] }) {
  return (
    <div className="main-card">
      <h1>{title}</h1>
      <p>{content}</p>
      <ul className="landing-card-list">{displayLinks(links)}</ul>
    </div>
  );
}

function SimpleCard({ title, content, links = [] }) {
  return (
    <div className="main-card">
      <h1>{title}</h1>
      <p>{content}</p>
      <ul className="single-column-list">{displayLinks(links)}</ul>
    </div>
  );
}

function CloudCard({ links }) {
  return (
    <div className="main-card">
      <div>
        <div>
          <h1>{translate({
            id: "intro.cloudCard.title",
            message: "Deploy your application to production",
          })}</h1>
          <p>{translate({
            id: "intro.cloudCard.description",
            message: "Choose a production deployment environment that suits your needs.",
          })}</p>
          <ul className="single-column-list">{displayLinks(links)}</ul>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title, author, role, link, img }) {
  return (
    <div className="main-card resource-card">
      <div>
        <a href={link}>
          <h3>{title}</h3>
        </a>
      </div>
      <div className="flex items-center gap-2">
        <img className="resource-img" src={img} alt={author} />
        <div className="author">
          <p>
            <strong>{author}</strong>
          </p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
}

function CommunityCard({ title, content, link }) {
  return (
    <div className="main-card community-card">
      <h3>{title}</h3>
      <Link to={useBaseUrl(link.path)} className="hover:underline font-normal">
        {link.name}
      </Link>
    </div>
  );
}

const slides = [
  {
    title: translate({
      id: "intro.slides.temporalService.title",
      message: "Temporal Service",
    }),
    description: translate({
      id: "intro.slides.temporalService.description",
      message: "Provides reliable and scalable workflow orchestration.",
    }),
    content1: translate({
      id: "intro.slides.temporalService.content1",
      message: "A Temporal Service ensures that Workflows are resilient by saving each step the Workflow code takes. It also schedules retries whenever there are errors in your application's code.",
    }),
    content2: translate({
      id: "intro.slides.temporalService.content2",
      message: "You can run it wherever you'd like and scale from a single laptop to thousands of machines, adding resources when and where you need them. And although you've just set up a lightweight Temporal Service for development, switching your code to point at a production Temporal Service only requires changing your connection parameters.",
    }),
    giphy: "eePSFNBFv2W9owZ4Sh",
  },
  {
    title: translate({
      id: "intro.slides.sdks.title",
      message: "SDKs",
    }),
    description: translate({
      id: "intro.slides.sdks.description",
      message: "Write code in your programming language of choice.",
    }),
    content1: translate({
      id: "intro.slides.sdks.content1",
      message: "A Temporal SDK is a library you use in your code. Each SDK has two parts to its API: the Client and the Worker. The Worker is the long-running process that has your Workflow code. The Client is used to communicate with the Temporal Service—for instance, to start and interact with Workflows.",
    }),
    giphy: "6UFgdU9hirj1pAOJyN",
  },
  {
    title: translate({
      id: "intro.slides.workflows.title",
      message: "Workflows",
    }),
    description: translate({
      id: "intro.slides.workflows.description",
      message: "Write your business logic as code in a Temporal Workflow.",
    }),
    content1: translate({
      id: "intro.slides.workflows.content1",
      message: "Temporal applications are built using an abstraction called Workflows. Workflows are functions or methods written in a general-purpose programming language such as Go, Java, TypeScript, or Python.",
    }),
    content2: translate({
      id: "intro.slides.workflows.content2",
      message: "Temporal ensures that your Workflows execute reliably. They can run—and keep running—for years, even if the underlying infrastructure fails. If the application crashes, Temporal will automatically recreate its pre-failure state so that it can continue right where it left off.",
    }),
    giphy: "l0IylOPCNkiqOgMyA ",
  },
  {
    title: translate({
      id: "intro.slides.determinism.title",
      message: "Determinism",
    }),
    description: translate({
      id: "intro.slides.determinism.description",
      message: "Writing deterministic Workflows guarantees durability in the case of failure.",
    }),
    content1: translate({
      id: "intro.slides.determinism.content1",
      message: "Temporal's guarantee that your Workflow code can't fail to continue running requires that the code in your Workflow must be deterministic. Simply put, this means that each execution of a Workflow, given the same input, must follow the same path through the code and produce the same output.",
    }),
    content2: translate({
      id: "intro.slides.determinism.content2",
      message: "This means that you can't generate a random number or interact with the outside world, as these actions are inherently non-deterministic. Generating a random number twice will likely produce different results, and if you access files, databases, or network services, you might get a failure or different results at different times.",
    }),
    giphy: "5FSanfKqd3rS8",
  },
  {
    title: translate({
      id: "intro.slides.activities.title",
      message: "Activities",
    }),
    description: translate({
      id: "intro.slides.activities.description",
      message: "Activities have the failure-prone parts of your code and are automatically retried upon failure.",
    }),
    content1: translate({
      id: "intro.slides.activities.content1",
      message: "Activities are functions or methods that you can use to run code that is non-deterministic or prone to failure, such as accessing a database, network service, or file system. Activities are called from Workflow code, and they are automatically retried if they fail. Once the Activity succeeds, the Workflow code will continue executing.",
    }),
    giphy: "kaDAIEecq0YuI",
  },
  {
    title: translate({
      id: "intro.slides.workers.title",
      message: "Workers",
    }),
    description: translate({
      id: "intro.slides.workers.description",
      message: "Workers run Workflow and Activity code reliably and consistently. You can increase the scalability and availability of your application by running additional Workers.",
    }),
    content1: translate({
      id: "intro.slides.workers.content1",
      message: "One thing that people new to Temporal find surprising is that the Temporal Service does not execute your code.",
    }),
    content2: translate({
      id: "intro.slides.workers.content2",
      message: "You deploy your code to containers or machines that are separate from the Temporal Service. Using the Worker API provided by the Temporal SDK, you will run one or more Worker processes that will execute your Workflow and Activity code based on tasks managed by the Temporal Service.",
    }),
    content3: translate({
      id: "intro.slides.workers.content3",
      message: "The Temporal Service gives the Workers tasks like \"Start running Workflow A,\" and the Workers run the corresponding Workflow function or method.",
    }),
    giphy: "DhstvI3zZ598Nb1rFf",
  },
  {
    title: translate({
      id: "intro.slides.temporalCli.title",
      message: "Temporal CLI",
    }),
    description: translate({
      id: "intro.slides.temporalCli.description",
      message: "Communicate directly with the Temporal Service by entering commands in the terminal.",
    }),
    content1: translate({
      id: "intro.slides.temporalCli.content1",
      message: "The Temporal CLI runs a development version of the Temporal Service. Interact with the Temporal Service - start Workflows, list them, get their status, and more.",
    }),
    content2: translate({
      id: "intro.slides.temporalCli.content2",
      message: "From the command line using the temporal command. From code, using an SDK Client. From your browser, using the Web UI.",
    }),
    giphy: "GA2dwDU7owOS4",
  },
];

function SlideDots({ activeSlide, handleClick }) {
  return slides.map((link, index) => {
    return (
      <div
        key={index}
        className={`slide-dot ${activeSlide === index ? "slide-dot-active" : ""}`}
        onClick={() => handleClick(index)}
      />
    );
  });
}

function SlideInfo({ activeSlide, handleClick }) {
  const slide = slides[activeSlide];

  const renderTextWithHighlight = (text) => {
    const wordToCheck = "temporal";
    const highlightClass = "highlight";
    const parts = text.split(new RegExp(`(${wordToCheck})`, "gi"));
    return parts.map((part, index) =>
      part === wordToCheck ? (
        <span key={index} className={highlightClass}>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const onPrevious = () => {
    if (activeSlide > 0) {
      handleClick(activeSlide - 1);
    } else {
      handleClick(slides.length - 1);
    }
  };

  const onNext = () => {
    if (activeSlide < slides.length - 1) {
      handleClick(activeSlide + 1);
    } else {
      handleClick(0);
    }
  };

  return (
    <div className="core-concepts-info">
      <button onClick={onPrevious} className="arrow left-arrow">
        <img src="/img/assets/left-chevron.png" alt="previous" />
      </button>
      <div>
        <h3 className="core-concepts-title">{translate({
          id: "intro.slideInfo.title",
          message: "Introducing our core concepts",
        })}</h3>
        <h1>{slide.title}</h1>
        <h3 className="core-concepts-description">
          <img src="/img/assets/info.svg" />
          {slide.description}
        </h3>
        <p>{renderTextWithHighlight(slide.content1 || "")}</p>
        <p>{renderTextWithHighlight(slide?.content2 || "")}</p>
        <p>{renderTextWithHighlight(slide?.content3 || "")}</p>
        <div className="slide-dots">
          <SlideDots activeSlide={activeSlide} handleClick={handleClick} />
        </div>
      </div>
      <button onClick={onNext} className="arrow right-arrow">
        <img src="/img/assets/right-chevron.png" alt="next" />
      </button>
    </div>
  );
}

function Explained() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <div>
      <p className="main-subhead">{translate({
        id: "intro.explained.subtitle",
        message: "Temporal Platform explanation and usage information.",
      })}</p>
      <div className="mb-8">{SdkLogos()}</div>
      <div className="grid md:grid-cols-2">
        <SimpleCard
          title={translate({
            id: "intro.explained.getStarted.title",
            message: "Get started with Temporal",
          })}
          content={translate({
            id: "intro.explained.getStarted.content",
            message: "New to Temporal? Follow our introductory tutorials and courses to get a feel for the developer experience and the value of the Temporal Platform.",
          })}
          links={coreConcepts}
        />
        <SimpleCard
          title={translate({
            id: "intro.explained.startBuilding.title",
            message: "Start building your next app",
          })}
          content={translate({
            id: "intro.explained.startBuilding.content",
            message: "Have a use case? Jump into the developer guides to start building your next backend application with Temporal.",
          })}
          links={appDevGuideLinks}
        />
      </div>
      <CloudCard links={prodDeployLinks} />

      <div className="deployment">
        <div className="dev-tools-container">
          <SimpleCard
            title={translate({
              id: "intro.explained.devTools.title",
              message: "Dev tools",
            })}
            content={translate({
              id: "intro.explained.devTools.content",
              message: "Use the Temporal CLI and Web UI to manage and monitor your Workflows.",
            })}
            links={devTools}
          />
        </div>
        <SimpleCard 
          title={translate({
            id: "intro.explained.references.title",
            message: "References",
          })}
          content={translate({
            id: "intro.explained.references.content",
            message: "Referable Platform information",
          })}
          links={references} 
        />
      </div>

      <div className="my-20 text-center">
        <h1>{translate({
          id: "intro.explained.helpfulResources.title",
          message: "Helpful resources",
        })}</h1>
        <div className="grid md:grid-cols-3">
          <ResourceCard
            title="Introduction to Temporal Workflows"
            author="Dominik Tornow"
            role="Principal Engineer"
            link="https://temporal.io/blog/dominik-workflow-part-1"
            img="https://images.ctfassets.net/0uuz8ydxyd9p/bSjHrfjo6yDNCRUHw46gU/ab4899b711ecf09bf165ea7a1615b0a8/dominik-tornow.png?w=80&h=80"
          />
          <ResourceCard
            title="Failure Handling in Practice"
            author="Fitz"
            role="Developer Advocate"
            link="https://temporal.io/blog/failure-handling-in-practice"
            img="https://images.ctfassets.net/0uuz8ydxyd9p/5rtdEzcJFPLV5Ce29uPyFb/951227c4a68cb13b1bd03c8856b1f740/fitzface_shadowed_blue-2.jpg?w=80&h=80"
          />
          <ResourceCard
            title="Time-Travel Debugging Production Code"
            author="Loren Sands-Ramshaw"
            role="Developer Relations Engineer"
            link="https://temporal.io/blog/time-travel-debugging-production-code"
            img="https://images.ctfassets.net/0uuz8ydxyd9p/3koq3MoNG4lPucMRTSkEUW/40ba102fafaba8524b8826b345ee55cd/loren-ivy-512-square.png?w=80&h=80"
          />
        </div>
      </div>

      <div className="my-20 text-center">
        <h1>{translate({
          id: "intro.explained.joinCommunity.title",
          message: "Join our Community",
        })}</h1>
        <div className="grid md:grid-cols-3">
          <CommunityCard
            title={translate({
              id: "intro.explained.joinCommunity.slack.title",
              message: "Join us in Slack and say hi!",
            })}
            link={{
              path: "https://temporal.io/slack",
              name: translate({
                id: "intro.explained.joinCommunity.slack.link",
                message: "Launch Slack",
              }),
            }}
          />
          <CommunityCard
            title={translate({
              id: "intro.explained.joinCommunity.forum.title",
              message: "Got a Question? Check out the forum",
            })}
            link={{
              path: "https://community.temporal.io/",
              name: translate({
                id: "intro.explained.joinCommunity.forum.link",
                message: "Go to the community forum",
              }),
            }}
          />
          <CommunityCard
            title={translate({
              id: "intro.explained.joinCommunity.events.title",
              message: "Find an upcoming event near you",
            })}
            link={{
              path: "https://temporal.io/community",
              name: translate({
                id: "intro.explained.joinCommunity.events.link",
                message: "Check out upcoming events",
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export const Intro = () => {
  return (
    <section className="mt-1 mb-14 tailwindcss temporal-documentation-landing">
      <div className="main-grid grid grid-cols-1 gap-6 lg:gap-8">
        <Explained />
      </div>
    </section>
  );
};

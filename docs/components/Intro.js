import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { SdkLogos } from "./SdkLogos";
import { Globe, Book, Terminal, Clock, Users, Rocket, Info, ArrowRight, DivideIcon as LucideIcon } from 'lucide-react';

const coreConcepts = [
  {
    path: "https://learn.temporal.io/getting_started#set-up-your-development-environment",
    name: "Set up your development environment",
  },
  {
    path: "https://learn.temporal.io/getting_started/#run-your-first-program",
    name: "Run your first program",
  },
  {
    path: "https://learn.temporal.io/getting_started/#run-your-first-program",
    name: "Build an application from scratch",
  },
  {
    path: "https://learn.temporal.io/courses/",
    name: "Enroll in a free course",
  },
];

const appDevGuideLinks = [
  {
    path: "/develop/go",
    name: "Go SDK developer guide",
  },
  {
    path: "/develop/java",
    name: "Java SDK developer guide",
  },
  {
    path: "/develop/python",
    name: "Python SDK developer guide",
  },
  {
    path: "/develop/typescript",
    name: "TypeScript SDK developer guide",
  },
  {
    path: "/develop/dotnet",
    name: ".NET SDK developer guide",
  },
  {
    path: "/develop/php",
    name: "PHP SDK developer guide",
  },
];

const troubleshooting = [
  {
    path: "/troubleshooting/deadline-exceeded-error",
    name: "Deadline exceeded",
  },
  {
    path: "/troubleshooting/last-connection-error",
    name: "Last connection",
  },
];

const prodDeployLinks = [
  {
    path: "/production-deployment",
    name: "Get started deploying to production",
  },
];

const devTools = [
  {
    path: "/cli",
    name: `Temporal CLI`,
  },
  {
    path: "/web-ui",
    name: `Web UI`,
  },
];

const references = [
  {
    path: "/references/commands",
    name: `Commands`,
  },
  {
    path: "/references/events",
    name: "Events",
  },
  {
    path: "/references/sdk-metrics",
    name: "SDK metrics",
  },
  {
    path: "/references/cluster-metrics",
    name: "Temporal Service metrics",
  },
  {
    path: "/references/errors",
    name: `Workflow Task errors`,
  },
];

const selfHostedDeploymentGuide = [
  {
    path: "/self-hosted-guide/introduction",
    name: "Introduction",
  },
  {
    path: "/self-hosted-guide/defaults",
    name: "Defaults",
  },
  {
    path: "/self-hosted-guide/security",
    name: "Security",
  },
  {
    path: "/self-hosted-guide/production-checklist",
    name: "Production checklist",
  },
  {
    path: "/self-hosted-guide/monitoring",
    name: "Monitoring",
  },
  {
    path: "/self-hosted-guide#visibility",
    name: "Visibility",
  },
  {
    path: "/self-hosted-guide/upgrade-server",
    name: "Upgrade server",
  },
  {
    path: "/self-hosted-guide/multi-cluster-replication",
    name: "Multi-Cluster Replication",
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
          <h1>Deploy your application to production</h1>
          <p>Choose a production deployment environment that suits your needs.</p>
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
    title: "Temporal Service",
    description: "Provides reliable and scalable workflow orchestration.",
    content1: `A Temporal Service ensures that Workflows are resilient by saving each step the Workflow code takes. It also schedules retries whenever there are errors in your application’s code.`,
    content2: `You can run it wherever you’d like and scale from a single laptop to thousands of machines, adding resources when and where you need them. And although you've just set up a lightweight Temporal Service for development, switching your code to point at a production Temporal Service only requires changing your connection parameters.`,
    giphy: "eePSFNBFv2W9owZ4Sh",
  },
  {
    title: "SDKs",
    description: "Write code in your programming language of choice.",
    content1:
      "A Temporal SDK is a library you use in your code. Each SDK has two parts to its API: the Client and the Worker. The Worker is the long-running process that has your Workflow code. The Client is used to communicate with the Temporal Service—for instance, to start and interact with Workflows.",
    giphy: "6UFgdU9hirj1pAOJyN",
  },
  {
    title: "Workflows",
    description: "Write your business logic as code in a Temporal Workflow.",
    content1: `Temporal applications are built using an abstraction called Workflows. Workflows are functions or methods written in a general-purpose programming language such as Go, Java, TypeScript, or Python.`,
    content2: `Temporal ensures that your Workflows execute reliably. They can run—and keep running—for years, even if the underlying infrastructure fails. If the application crashes, Temporal will automatically recreate its pre-failure state so that it can continue right where it left off.`,
    giphy: "l0IylOPCNkiqOgMyA ",
  },
  {
    title: "Determinism",
    description: "Writing deterministic Workflows guarantees durability in the case of failure.",
    content1: `Temporal's guarantee that your Workflow code can’t fail to continue running requires that the code in your Workflow must be deterministic. Simply put, this means that each execution of a Workflow, given the same input, must follow the same path through the code and produce the same output.`,
    content2: `This means that you can’t generate a random number or interact with the outside world, as these actions are inherently non-deterministic. Generating a random number twice will likely produce different results, and if you access files, databases, or network services, you might get a failure or different results at different times.`,
    giphy: "5FSanfKqd3rS8",
  },
  {
    title: "Activities",
    description: "Activities have the failure-prone parts of your code and are automatically retried upon failure.",
    content1:
      "Activities are functions or methods that you can use to run code that is non-deterministic or prone to failure, such as accessing a database, network service, or file system. Activities are called from Workflow code, and they are automatically retried if they fail. Once the Activity succeeds, the Workflow code will continue executing.",
    giphy: "kaDAIEecq0YuI",
  },
  {
    title: "Workers",
    description:
      "Workers run Workflow and Activity code reliably and consistently. You can increase the scalability and availability of your application by running additional Workers. ",
    content1: `One thing that people new to Temporal find surprising is that the Temporal Service does not execute your code.`,
    content2: `You deploy your code to containers or machines that are separate from the Temporal Service. Using the Worker API provided by the Temporal SDK, you will run one or more Worker processes that will execute your Workflow and Activity code based on tasks managed by the Temporal Service.`,
    content3: `The Temporal Service gives the Workers tasks like “Start running Workflow A,” and the Workers run the corresponding Workflow function or method.`,
    giphy: "DhstvI3zZ598Nb1rFf",
  },
  {
    title: "Temporal CLI",
    description: "Communicate directly with the Temporal Service by entering commands in the terminal.",
    content1: `The Temporal CLI runs a development version of the Temporal Service. Interact with the Temporal Service - start Workflows, list them, get their status, and more.`,
    content2: `  From the command line using the temporal command. From code, using an SDK Client. From your browser, using the Web UI.`,
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
        <img src="/img/left-chevron.png" alt="previous" />
      </button>
      <div>
        <h3 className="core-concepts-title">Introducing our core concepts</h3>
        <h1>{slide.title}</h1>
        <h3 className="core-concepts-description">
          <img src="/img/info.svg" />
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
        <img src="/img/right-chevron.png" alt="next" />
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
      <p className="main-subhead"></p>
      <div className="mb-8">{SdkLogos()}</div>
      <div className="grid md:grid-cols-2">
        <SimpleCard
          title="Get started with Temporal"
          content="New to Temporal? Follow our introductory tutorials and courses to get a feel for the developer experience and the value of the Temporal Platform."
          links={coreConcepts}
        />
        <SimpleCard
          title="Start building your next app"
          content="Have a use case? Jump into the developer guides to start building your next backend application with Temporal."
          links={appDevGuideLinks}
        />
      </div>
      <CloudCard links={prodDeployLinks} />

      <div className="deployment">
        <div className="dev-tools-container">
          <SimpleCard
            title="Dev tools"
            content="Use the Temporal CLI and Web UI to manage and monitor your Workflows."
            links={devTools}
          />
        </div>
        <SimpleCard title="References" content="Referable Platform information" links={references} />
      </div>

      <div className="my-20 text-center">
        <h1>Join our Community</h1>
        <div className="grid md:grid-cols-3">
          <CommunityCard
            title="Join us in Slack and say hi!"
            link={{
              path: "https://temporal.io/slack",
              name: "Launch Slack",
            }}
          />
          <CommunityCard
            title="Got a Question? Check out the forum"
            link={{
              path: "https://community.temporal.io/",
              name: "Go to the community forum",
            }}
          />
          <CommunityCard
            title="Find an upcoming event near you"
            link={{
              path: "https://temporal.io/community",
              name: "Check out upcoming events",
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

       {/* CTA Section - Take a Course */}
       <div className="my-16 text-center">
        <h1 className="text-2xl font-bold">Take a Temporal Course</h1>
        <p className="text-lg mt-2">Learn Temporal by enrolling in our free introductory courses.</p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <Link to="https://learn.temporal.io/courses/temporal_101/">
              <img src={"homepage/background-101-courses.png"} alt="Temporal 101 Course" className="rounded-lg shadow-lg" />
            </Link>
          </div>
          <div>
            <Link to="https://learn.temporal.io/courses/temporal_102/">
              <img src={"/homepage/background-102-courses.png"} alt="Temporal 102 Course" className="rounded-lg shadow-lg" />
            </Link>
          </div>
        </div>
      </div>


    </section>

    
  );
};

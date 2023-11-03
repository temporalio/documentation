import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { SdkLogos } from "./SdkLogos";

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
  }
];

const appDevGuideLinks = [
  {
    path: "/dev-guide/go",
    name: "Go dev guide",
  },
  {
    path: "/dev-guide/java",
    name: "Java dev guide",
  },
  {
    path: "/dev-guide/python",
    name: "Python dev guide",
  },
  {
    path: "/dev-guide/typescript",
    name: "TypeScript dev guide",
  },
  {
    path: "https://github.com/temporalio/sdk-dotnet#readme",
    name: ".NET SDK readme",
  },
  {
    path: "/dev-guide/php",
    name: "PHP dev guide",
  },
]

const clusterGuide = [
  {
    path: "/cluster-deployment-guide/#advanced-visibility",
    name: "Visibility",
  },
  {
    path: "/cluster-deployment-guide/#archival",
    name: "Archival",
  },
  {
    path: "/cluster-deployment-guide/#multi-cluster-replication",
    name: "Multi-Cluster Replication",
  },
];

const cloudInfo = [
  {
    path: "/cloud/introduction",
    name: "Introduction",
  },
  {
    path: "/cloud/get-started",
    name: "Get started",
  },
  {
    path: "/cloud/account-setup",
    name: "Account setup",
  },
  {
    path: "/cloud/saml",
    name: "SAML",
  },
  {
    path: "/cloud/metrics",
    name: "Metrics",
  },
  {
    path: "/cloud/audit-logging",
    name: "Audit Logging",
  },
  {
    path: "/cloud/tcld",
    name: "CLI (tcld)",
  },
  {
    path: "https://temporal.io/change-log/product-area/cloud",
    name: "Release notes",
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
  {
    path: "/tctl-v1",
    name: "tctl v1.17",
  }
]

const references = [
  {
    path: "/references/events",
    name: "Events reference",
  },
  {
    path: "/references/commands",
    name: `Commands`,
  },
  {
    path: "/references/sdk-metrics",
    name: "SDK Metrics",
  },
  {
    path: "/references/configuration",
    name: `Cluster configuration reference`,
  },
  {
    path: "/references/errors",
    name: `Errors`,
  },
];

const selfHostedDeploymentGuide = [
  {
    path: "/kb/temporal-platform-limits-sheet",
    name: "Temporal Platform limits sheet",
  },
  {
    path: "/references/commands",
    name: `How to explain Temporal`,
  },
  {
    path: "/troubleshooting/last-connection-error",
    name: 'Troubleshoot the "failed reaching server" error',
  },
  {
    path: "/troubleshooting/deadline-exceeded-error",
    name: `Troubleshoot deadline-exceeded error`,
  },
  {
    path: "/kb/legacy-oss-prod-deploy",
    name: "Legacy OSS Temporal Server self-hosted production deployment guide",
  },
  {
    path: "/kb/how-to-productionize-workflows",
    name: "An opinionated guide to productionizing Workflows",
  },
  {
    path: "/",
    name: "All the ways to run a Temporal Cluster",
  },
  {
    path: "/kb/python-sandbox-environment",
    name: "Python sandbox environment",
  },
  {
    path: "/references/failures",
    name: "Temporal Failures",
  },
  {
    path: "/kb/prometheus-grafana-setup",
    name: "Set up Prometheus and Grafana to view metrics",
  },
  {
    path: "/kb/migrate-visibility-data-from-es6",
    name: "Migrate visibility data from ES6",
  },
  {
    path: "/kb/cadence-to-temporal",
    name: "Cadence to Temporal migration highlights",
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
  )
}

function SimpleCard({ title, content, links = [] }) {
  return (
    <div className="main-card">
      <h1>{title}</h1>
      <p>{content}</p>
      <ul className="single-column-list">{displayLinks(links)}</ul>
    </div>
  )
}


function CloudCard({ links }) {
  return (
    <div className="main-card">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h1>Temporal Cloud</h1>
          <p>Temporal Cloud tools and how-to guides.</p>
          <ul className="landing-card-list">{displayLinks(links)}</ul>
        </div>
        <div>
          <h1>Get started with Cloud</h1>
          <p>Run Temporal today, without hassle, and with peace of mind.</p>
          <p>
            <Link to="https://temporal.io/cloud"><button className="cloud-button">Learn more about Temporal Cloud</button></Link>
          </p>
          <p>Existing users can <Link to="https://cloud.temporal.io">log in here
          </Link>
            .</p>
        </div>
      </div>
    </div>
  )
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
          <p><strong>{author}</strong></p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  )
}

function CommunityCard({ title, content, link }) {
  return (
    <div className="main-card community-card">
      <h3>{title}</h3>
      <p>{content}</p>
      <Link to={useBaseUrl(link.path)} className="hover:underline font-normal">
        {link.name}
      </Link>
    </div>
  )
}

const slides = [
  { title: 'Temporal Cluster', description: 'Provides reliable and scalable workflow orchestration.', content1: `A Temporal Cluster ensures that Workflows are resilient by saving each step the Workflow code takes. It also schedules retries whenever there are errors in your application’s code.`, content2: `You can run it wherever you’d like and scale from a single laptop to thousands of machines, adding resources when and where you need them. And although you've just set up a lightweight Cluster for development, switching your code to point at a production Cluster only requires changing your connection parameters.`, giphy: 'eePSFNBFv2W9owZ4Sh' },
  { title: 'SDKs', description: 'Write code in your programming language of choice.', content1: 'A Temporal SDK is a library you use in your code. Each SDK has two parts to its API: the Client and the Worker. The Worker is the long-running process that has your Workflow code. The Client is used to communicate with the Cluster—for instance, to start and interact with Workflows.', giphy: '6UFgdU9hirj1pAOJyN' },
  { title: 'Workflows', description: 'Write your business logic as code in a Temporal Workflow.', content1: `Temporal applications are built using an abstraction called Workflows. Workflows are functions or methods written in a general-purpose programming language such as Go, Java, TypeScript, or Python.`, content2: `Temporal ensures that your Workflows execute reliably. They can run—and keep running—for years, even if the underlying infrastructure fails. If the application crashes, Temporal will automatically recreate its pre-failure state so that it can continue right where it left off.`, giphy: 'l0IylOPCNkiqOgMyA ' },
  { title: 'Determinism', description: 'Writing deterministic Workflows guarantees durability in the case of failure.', content1: `Temporal's guarantee that your Workflow code can’t fail to continue running requires that the code in your Workflow must be deterministic. Simply put, this means that each execution of a Workflow, given the same input, must follow the same path through the code and produce the same output.`, content2: `This means that you can’t generate a random number or interact with the outside world, as these actions are inherently non-deterministic. Generating a random number twice will likely produce different results, and if you access files, databases, or network services, you might get a failure or different results at different times.`, giphy: '5FSanfKqd3rS8' },
  { title: 'Activities', description: 'Activities have the failure-prone parts of your code and are automatically retried upon failure.', content1: 'Activities are functions or methods that you can use to run code that is non-deterministic or prone to failure, such as accessing a database, network service, or file system. Activities are called from Workflow code, and they are automatically retried if they fail. Once the Activity succeeds, the Workflow code will continue executing.', giphy: 'kaDAIEecq0YuI' },
  { title: 'Workers', description: 'Workers run Workflow and Activity code reliably and consistently. You can increase the scalability and availability of your application by running additional Workers. ', content1: `One thing that people new to Temporal find surprising is that the Temporal Cluster does not execute your code.`, content2: `You deploy your code to containers or machines that are separate from the Temporal Cluster. Using the Worker API provided by the Temporal SDK, you will run one or more Worker processes that will execute your Workflow and Activity code based on tasks managed by the Temporal Cluster.`, content3: `The Cluster gives the Workers tasks like “Start running Workflow A,” and the Workers run the corresponding Workflow function or method.`, giphy: 'DhstvI3zZ598Nb1rFf' },
  {
    title: 'Temporal CLI', description: 'Communicate directly with the Temporal Cluster by entering commands in the terminal.', content1: `The Temporal CLI runs a development version of the Cluster. Interact with the Cluster - start Workflows, list them, get their status, and more.`, content2: `  From the command line using the temporal command. From code, using an SDK Client. From your browser, using the Web UI.`, giphy: 'GA2dwDU7owOS4'
  },
]

function SlideDots({ activeSlide, handleClick }) {
  return slides.map((link, index) => {
    return (<div key={index} className={`slide-dot ${activeSlide === index ? 'slide-dot-active' : ''}`} onClick={() => handleClick(index)} />)
  })
}

function SlideInfo({ activeSlide, handleClick }) {
  const slide = slides[activeSlide]

  const renderTextWithHighlight = (text) => {
    const wordToCheck = 'temporal';
    const highlightClass = 'highlight';
    const parts = text.split(new RegExp(`(${wordToCheck})`, 'gi'));
    return parts.map((part, index) =>
      part === wordToCheck ? (
        <span key={index} className={highlightClass}>{part}</span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const onPrevious = () => {
    if (activeSlide > 0) {
      handleClick(activeSlide - 1)
    } else {
      handleClick(slides.length - 1)
    }
  }

  const onNext = () => {
    if (activeSlide < slides.length - 1) {
      handleClick(activeSlide + 1)
    } else {
      handleClick(0)
    }
  }

  return (
    <div className="core-concepts-info">
      <button onClick={onPrevious} className="arrow left-arrow"><p>{`<`}</p></button>
      <div>
        <h3 className="core-concepts-title">Introducing our core concepts</h3>
        <h1>{slide.title}</h1>
        <h3 className="core-concepts-description"><img src="/img/info.svg" />{slide.description}</h3>
        <p>{renderTextWithHighlight(slide.content1 || '')}</p>
        <p>{renderTextWithHighlight(slide?.content2 || '')}</p>
        <p>{renderTextWithHighlight(slide?.content3 || '')}</p>
        <div className="slide-dots">
          <SlideDots activeSlide={activeSlide} handleClick={handleClick} />
        </div>
      </div>
      <button onClick={onNext} className="arrow right-arrow"><p>{`>`}</p></button>
    </div>
  )
}


function Explained() {
  const [activeSlide, setActiveSlide] = useState(0)

  const handleSlideChange = (index) => {
    setActiveSlide(index)
  }

  return (
    <div>
      <p className="main-subhead">Temporal Platform explanation and usage information.</p>
      <div className="mb-8">{SdkLogos()}</div>
      <div className="grid md:grid-cols-2">
        <SimpleCard title="Get Started with Temporal" content="New to Temporal? Start your journey here by setting up your development environment, running an existing Temporal app, and then building your first app from scratch using our SDKs." links={coreConcepts} />
        <SimpleCard title="Start building your next app" links={appDevGuideLinks} />
      </div>
      <CloudCard links={cloudInfo} />
      <div className="grid md:grid-cols-2">
        <SimpleCard title="Production readiness" content="Temporal Cluster deployment information and how-to guides." links={clusterGuide} />
        <SimpleCard title="Dev tools" content="Use Temporal’s CLI or Web UI to manage and monitor your Workflows." links={devTools} />
      </div>


      <div className="core-concepts">
        <SlideInfo activeSlide={activeSlide} handleClick={handleSlideChange} />
      </div>

      <div className="deployment">
        <div className="references">
          <SimpleCard title="References" links={references} />
        </div>
        <Card title="Self-hosted deployment guide" links={selfHostedDeploymentGuide} />
      </div>

      <div className="my-20 text-center">
        <h1>Helpful resources</h1>
        <div className="grid md:grid-cols-3">
          <ResourceCard title="Introduction to Temporal Workflows" author="Dominik Tornow" role="Principle Engineer" link="https://temporal.io/blog/dominik-workflow-part-1" img="https://images.ctfassets.net/0uuz8ydxyd9p/bSjHrfjo6yDNCRUHw46gU/ab4899b711ecf09bf165ea7a1615b0a8/dominik-tornow.png" />
          <ResourceCard title="Failure Handling in Practice" author="Fitz" role="Developer Advocate" link="https://temporal.io/blog/failure-handling-in-practice" img="https://images.ctfassets.net/0uuz8ydxyd9p/5rtdEzcJFPLV5Ce29uPyFb/951227c4a68cb13b1bd03c8856b1f740/fitzface_shadowed_blue-2.jpg" />
          <ResourceCard title="Time-Travel Debugging Production Code" author="Loren Sands-Ramshaw" role="Developer Relations Engineer" link="https://temporal.io/blog/time-travel-debugging-production-code" img="https://images.ctfassets.net/0uuz8ydxyd9p/3koq3MoNG4lPucMRTSkEUW/40ba102fafaba8524b8826b345ee55cd/loren-ivy-512-square.png" />
        </div>
      </div>

      <div className="my-20 text-center">
        <h1>Join our Community</h1>
        <div className="grid md:grid-cols-3">
          <CommunityCard title="Join us in Slack and say hi!" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut quam id nisl malesuada scelerisque. " link={{
            path: "https://temporal.io/slack",
            name: "Launch Slack",
          }} />
          <CommunityCard title="Got a Question? Check out the forum" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut quam id nisl malesuada scelerisque." link={{
            path: "https://community.temporal.io/",
            name: "Go to the community forum",
          }} />
          <CommunityCard title="Find an upcoming event near you" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut quam id nisl malesuada scelerisque." link={{
            path: "https://temporal.io/community",
            name: "Check out upcoming events",
          }} />
        </div>
      </div>

    </div>
  );
}

export const Intro = () => {
  return (
    <section className="mt-1 mb-14 tailwindcss">
      <div className="main-grid grid grid-cols-1 gap-6 lg:gap-8">
        <Explained />
      </div>
    </section>
  );
};

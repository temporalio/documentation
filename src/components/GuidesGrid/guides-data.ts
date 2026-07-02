export type SDK = "Java" | "Python" | "TypeScript" | "Ruby" | "Go";

export type Guide = {
  name: string;
  description: string;
  tags: string[];
  sdk?: SDK;
  href: string;
};

const guides: Guide[] = [
  {
    name: "Customer loyalty program",
    description:
      "How to run a customer loyalty program with the entity pattern and durable workflows.",
    tags: ["Entity Pattern"],
    sdk: "Python",
    href: "/guides/entity-pattern-loyalty-points",
  },

  {
    name: "Recover without restart",
    description:
      "Build business processes that pause on errors and recover without restarting.",
    tags: ["Saga Pattern"],
    sdk: "TypeScript",
    href: "/guides/saga-pattern",
  },

  {
    name: "Route specialized workloads",
    description:
      "Direct resource-intensive workloads to appropriate Task Queues to optimize resources.",
    tags: ["Task Queues"],
    sdk: "Python",
    href: "/guides/route-specialized-workloads",
  },

  {
    name: "Worker execution affinity",
    description:
      "Direct multiple Activities to execute on the same Worker to maintain data locality.",
    tags: ["Worker management"],
    sdk: "Python",
    href: "/guides/worker-execution-affinity",
  },

  {
    name: "Temporary rate limit increases",
    description:
      "Handle temporary spikes in usage by dynamically provisioning extra capacity.",
    tags: ["Namespace management"],
    sdk: "Go",
    href: "/guides/temporary-rate-limit-increases",
  },

  {
    name: "Reliable document approvals",
    description:
      "Build durable human-in-the-loop Workflows.",
    tags: ["Human-in-the-loop"],
    sdk: "Python",
    href: "/guides/reliable-document-approvals",
  },

  {
    name: "Rate-limit downstream APIs",
    description:
      "Protect limited resources and avoid Workflow failures with separate Task Queues.",
    tags: ["Workflow Management"],
    sdk: "Python",
    href: "/guides/rate-limit-downstream-apis",
  },

  {
    name: "Durable gaming sessions",
    description:
      "Protect player sessions from backend failures by using the Actor pattern.",
    tags: ["Actor Pattern"],
    sdk: "Python",
    href: "/guides/durable-gaming-sessions",
  },

  {
    name: "Distributed locking",
    description:
      "Coordinate access to shared resources with a distributed lock.",
    tags: ["Workflow Management"],
    sdk: "Python",
    href: "/guides/lock-shared-resources",
  },


];

export default guides;

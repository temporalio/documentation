export type SDK = "Java" | "Python" | "TypeScript" | "Ruby";

export type Integration = {
  name: string;
  description: string;
  category: string;
  sdks: SDK[];
  href: string;
};

const integrations: Integration[] = [
  {
    name: "AI SDK by Vercel",
    description:
      "Build AI-powered applications with durable execution using the Vercel AI SDK.",
    category: "Agent framework",
    sdks: ["TypeScript"],
    href: "/develop/typescript/integrations/ai-sdk",
  },
  {
    name: "Braintrust",
    description:
      "Monitor and evaluate AI application performance with Braintrust observability.",
    category: "Observability",
    sdks: ["Python"],
    href: "/develop/python/integrations/braintrust",
  },
  {
    name: "Braintrust",
    description:
      "Monitor and evaluate AI application performance with Braintrust observability.",
    category: "Observability",
    sdks: ["TypeScript"],
    href: "https://www.braintrust.dev/docs/integrations/sdk-integrations/temporal#typescript",
  },
  {
    name: "Google ADK",
    description:
      "Orchestrate Google ADK agents with durable Temporal Workflows.",
    category: "Agent framework",
    sdks: ["Python"],
    href: "https://adk.dev/integrations/temporal/",
  },
  {
    name: "LangGraph",
    description:
      "Run LangGraph agent graphs as durable, resumable Temporal Workflows.",
    category: "Agent framework",
    sdks: ["Python"],
    href: "/develop/python/integrations/langgraph",
  },
  {
    name: "LangSmith",
    description:
      "Trace and debug LLM calls in Temporal Workflows with LangSmith.",
    category: "Observability",
    sdks: ["Python"],
    href: "/develop/python/integrations/langsmith",
  },
  {
    name: "Mastra",
    description:
      "Build durable AI agents and workflows with the Mastra TypeScript framework.",
    category: "Agent framework",
    sdks: ["TypeScript"],
    href: "https://mastra.ai/guides/deployment/temporal",
  },
  {
    name: "OpenAI Agents SDK",
    description:
      "Run OpenAI Agents with crash-proof execution using Temporal.",
    category: "Agent framework",
    sdks: ["Python"],
    href: "https://github.com/temporalio/sdk-python/blob/main/temporalio/contrib/openai_agents/README.md",
  },
  {
    name: "Pydantic AI",
    description:
      "Build type-safe AI agents with durable execution through Pydantic AI.",
    category: "Agent framework",
    sdks: ["Python"],
    href: "https://ai.pydantic.dev/durable_execution/temporal/",
  },
  {
    name: "Rails",
    description:
      "Integrate Temporal durable workflows into Ruby on Rails applications.",
    category: "Framework",
    sdks: ["Ruby"],
    href: "/develop/ruby/integrations/rails-integration",
  },
  {
    name: "Spring AI",
    description:
      "Build AI-powered Java applications with durable Spring AI tool calls.",
    category: "Agent framework",
    sdks: ["Java"],
    href: "/develop/java/integrations/spring-ai",
  },
  {
    name: "Spring Boot",
    description:
      "Use Temporal natively in Spring Boot with auto-configuration and dependency injection.",
    category: "Framework",
    sdks: ["Java"],
    href: "/develop/java/integrations/spring-boot-integration",
  },
  {
    name: "Strands Agents",
    description:
      "Orchestrate AWS Strands Agents with durable Temporal Workflows.",
    category: "Agent framework",
    sdks: ["Python"],
    href: "/develop/python/integrations/strands-agents",
  },
  {
    name: "Tenuo",
    description:
      "Add governance and compliance guardrails to AI-powered Temporal Workflows.",
    category: "Governance",
    sdks: ["Python"],
    href: "https://tenuo.ai/temporal",
  },
];

export default integrations;

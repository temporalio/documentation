export type SDK = "Java" | "Python" | "TypeScript" | "Ruby";

export type Integration = {
  name: string;
  description: string;
  category: string;
  sdk?: SDK;
  href: string;
};

const integrations: Integration[] = [
  {
    name: "AI SDK by Vercel",
    description:
      "Build AI-powered applications with durable execution using the Vercel AI SDK.",
    category: "Agent framework",
    sdk: "TypeScript",
    href: "/develop/typescript/integrations/ai-sdk",
  },
  {
    name: "Braintrust",
    description:
      "Monitor and evaluate AI application performance with Braintrust observability.",
    category: "Observability",
    sdk: "Python",
    href: "/develop/python/integrations/braintrust",
  },
  {
    name: "Braintrust",
    description:
      "Monitor and evaluate AI application performance with Braintrust observability.",
    category: "Observability",
    sdk: "TypeScript",
    href: "https://www.braintrust.dev/docs/integrations/sdk-integrations/temporal#typescript",
  },
  {
    name: "ClickStack",
    description:
      "Ingest Temporal Cloud metrics into ClickHouse via an OpenTelemetry collector with HyperDX dashboards.",
    category: "Observability",
    href: "https://clickhouse.com/docs/use-cases/observability/clickstack/integrations/temporal-metrics",
  },
  {
    name: "Datadog",
    description:
      "Export Temporal Cloud metrics to Datadog with a serverless integration and pre-built dashboard.",
    category: "Observability",
    href: "https://docs.datadoghq.com/integrations/temporal-cloud-openmetrics/",
  },
  {
    name: "Google ADK",
    description:
      "Orchestrate Google ADK agents with durable Temporal Workflows.",
    category: "Agent framework",
    sdk: "Python",
    href: "https://adk.dev/integrations/temporal/",
  },
  {
    name: "Grafana Cloud",
    description:
      "Export Temporal Cloud metrics to Grafana Cloud with a serverless integration and pre-built dashboard.",
    category: "Observability",
    href: "https://grafana.com/docs/grafana-cloud/monitor-infrastructure/integrations/integration-reference/integration-temporal/",
  },
  {
    name: "LangGraph",
    description:
      "Run LangGraph agent graphs as durable, resumable Temporal Workflows.",
    category: "Agent framework",
    sdk: "Python",
    href: "/develop/python/integrations/langgraph",
  },
  {
    name: "LangSmith",
    description:
      "Trace and debug LLM calls in Temporal Workflows with LangSmith.",
    category: "Observability",
    sdk: "Python",
    href: "/develop/python/integrations/langsmith",
  },
  {
    name: "Mastra",
    description:
      "Build durable AI agents and workflows with the Mastra TypeScript framework.",
    category: "Agent framework",
    sdk: "TypeScript",
    href: "https://mastra.ai/guides/deployment/temporal",
  },
  {
    name: "New Relic",
    description:
      "Export Temporal Cloud metrics to New Relic via the nri-flex infrastructure agent integration.",
    category: "Observability",
    href: "https://docs.newrelic.com/docs/infrastructure/host-integrations/host-integrations-list/temporal-cloud-integration/",
  },
  {
    name: "OpenAI Agents SDK",
    description:
      "Run OpenAI Agents with crash-proof execution using Temporal.",
    category: "Agent framework",
    sdk: "Python",
    href: "https://github.com/temporalio/sdk-python/blob/main/temporalio/contrib/openai_agents/README.md",
  },
  {
    name: "Prometheus + Grafana",
    description:
      "Scrape Temporal Cloud metrics with self-hosted Prometheus and visualize with Grafana dashboards.",
    category: "Observability",
    href: "/cloud/metrics/openmetrics/metrics-integrations#prometheus-grafana",
  },
  {
    name: "Pydantic AI",
    description:
      "Build type-safe AI agents with durable execution through Pydantic AI.",
    category: "Agent framework",
    sdk: "Python",
    href: "https://ai.pydantic.dev/durable_execution/temporal/",
  },
  {
    name: "Rails",
    description:
      "Integrate Temporal durable workflows into Ruby on Rails applications.",
    category: "Framework",
    sdk: "Ruby",
    href: "/develop/ruby/integrations/rails-integration",
  },
  {
    name: "Spring AI",
    description:
      "Build AI-powered Java applications with durable Spring AI tool calls.",
    category: "Agent framework",
    sdk: "Java",
    href: "/develop/java/integrations/spring-ai",
  },
  {
    name: "Spring Boot",
    description:
      "Use Temporal natively in Spring Boot with auto-configuration and dependency injection.",
    category: "Framework",
    sdk: "Java",
    href: "/develop/java/integrations/spring-boot-integration",
  },
  {
    name: "Strands Agents",
    description:
      "Orchestrate AWS Strands Agents with durable Temporal Workflows.",
    category: "Agent framework",
    sdk: "Python",
    href: "/develop/python/integrations/strands-agents",
  },
  {
    name: "Tenuo",
    description:
      "Add governance and compliance guardrails to AI-powered Temporal Workflows.",
    category: "Governance",
    sdk: "Python",
    href: "https://tenuo.ai/temporal",
  },
];

export default integrations;

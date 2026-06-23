// Integration data lives in integrations-data.json so it can be consumed both
// by this React component and by the LLM markdown pipeline
// (scripts/component-handlers/integrations.mjs) without duplication.
import integrationsData from "./integrations-data.json";

export type SDK = "Java" | "Python" | "TypeScript" | "Ruby";

export type Integration = {
  name: string;
  description: string;
  tags: string[];
  sdk?: SDK;
  href: string;
};

const integrations = integrationsData as Integration[];

export default integrations;

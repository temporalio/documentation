import integrationsData from "./integrations-data.json";

export type SDK = "Go" | "Java" | "Python" | "TypeScript" | "Ruby";

export type Integration = {
  name: string;
  description: string;
  tags: string[];
  sdk?: SDK;
  href: string;
};

const integrations: Integration[] = integrationsData as Integration[];

export default integrations;

import guidesData from "./guides-data.json";

export type SDK = "Java" | "Python" | "TypeScript" | "Ruby" | "Go";

export type Guide = {
  name: string;
  description: string;
  tags: string[];
  sdk?: SDK;
  href: string;
};

const guides: Guide[] = guidesData as Guide[];

export default guides;


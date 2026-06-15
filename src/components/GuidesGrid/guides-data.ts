export type SDK = "Java" | "Python" | "TypeScript" | "Ruby";

export type Guide = {
  name: string;
  description: string;
  tags: string[];
  sdk?: SDK;
  href: string;
};

const guides: Guide[] = [
  {
    name: "Entity Workflow",
    description:
      "How to run a customer loyalty program with the entity pattern and durable workflows.",
    tags: ["Entity Pattern"],
    sdk: "Python",
    href: "/guides/entity-pattern-loyalty-points",
  },

  {
    name: "Saga Pattern",
    description:
      "How to recover business processes without restarting.",
    tags: ["Saga Pattern"],
    sdk: "TypeScript",
    href: "/guides/saga-pattern",
  },


];

export default guides;

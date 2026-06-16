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


];

export default guides;

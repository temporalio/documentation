/**
 * component-handlers/home-page-hero.mjs
 *
 * Handler for <HomePageHero /> (the docs homepage, docs/index.mdx).
 *
 * Unlike JsonTable/IntegrationsGrid, the hero's content is NOT data-driven —
 * it is hardcoded JSX inside the React component. There is no shared data file
 * to read, so this handler keeps its own faithful copy of the hero's text
 * (headline, intro paragraphs, action links, community links).
 *
 * ⚠️  KEEP IN SYNC: this content is duplicated from
 *     src/components/elements/HomePageHero.js
 *     When the hero's copy or cards change there, update this handler too.
 *     (That component carries a matching comment pointing back here.)
 */

const HEADLINE = "Build applications that never fail";

const INTRO = [
  "Temporal is an open-source platform for building reliable applications. Temporal delivers crash-proof execution by guaranteeing that applications resume exactly where they left off after crashes, network failures, or infrastructure outages, whether that happens seconds, days, or even years later.",
  "Temporal enables developers to focus on building features that drive the business while ensuring that mission-critical processes such as order fulfillment, customer onboarding, and payment processing never fail or disappear, regardless of what goes wrong.",
];

const ACTION_LINKS = [
  { title: "Quickstart", href: "/quickstarts", description: "Setup your local and run a Hello World workflow." },
  { title: "Developer Guide", href: "/develop", description: "Dive into everything you need to know about building Temporal workflows." },
  { title: "Deploy your Workflows", href: "/production-deployment", description: "Deploy your Temporal Application to your environment. Self-Host the Temporal Service or use Temporal Cloud." },
  { title: "Get started for free with $1000 in credits", href: "https://temporal.io/cloud", description: "Sign up for Temporal Cloud and let us host the Temporal Service for you." },
];

const COMMUNITY_LINKS = [
  { title: "Slack Community", href: "https://temporal.io/slack", description: "Join us on temporal.io/slack and say hi or ask us a question." },
  { title: "Developer Forum", href: "https://community.temporal.io", description: "Find out if your question has already been asked." },
  { title: "Learn it all", href: "https://learn.temporal.io/courses/", description: "Master Temporal with our courses and tutorials." },
];

function renderList(links) {
  return links
    .map((l) => `- [${l.title}](${l.href}): ${l.description}`)
    .join("\n");
}

/**
 * Resolve <HomePageHero /> to Markdown.
 * @returns {string}
 */
export function homePageHeroToMarkdown() {
  return [
    `## ${HEADLINE}`,
    "",
    INTRO.join("\n\n"),
    "",
    "**Get started:**",
    "",
    renderList(ACTION_LINKS),
    "",
    "**Community:**",
    "",
    renderList(COMMUNITY_LINKS),
  ].join("\n");
}

/**
 * component-handlers/event-history-walkthrough.mjs
 *
 * Handler for the Event History walkthrough demos (`<WalkthroughDemo>`): a
 * fenced code sample followed by one `<WalkthroughStep>` per step, each
 * optionally carrying `<WalkthroughCommand>`/`<WalkthroughEvent>` ledger
 * entries.
 * Components: src/components/Demos/EventHistoryWalkthrough/
 *
 * The code fence is a plain pass-through (it's already Markdown); this module
 * only renders the `<WalkthroughStep>`/`<WalkthroughCommand>`/
 * `<WalkthroughEvent>` structured props into readable Markdown.
 */

// Mirrors WorkflowWalkthrough.js's KIND_LABEL — keep in sync if that changes.
const KIND_LABEL = {
  internal: "Internal step",
  command: "Sends a Command",
  service: "Temporal Service",
  crash: "Worker crash",
  replay: "Replay",
};

/**
 * Extract a JSX attribute value, tracking the *specific* opening quote
 * character so a value can safely contain the other one — our data routinely
 * does (e.g. `details='("pizza-tasks", GetDistance, { Line1: "123 Oak St." })'`).
 * extractProp()'s `[^"']` character class would truncate at the embedded `"`;
 * this mirrors the same-quote-tracking technique already used by
 * component-handlers/cards.mjs's parseCardItems for the same reason.
 */
export function extractQuotedProp(tagStr, propName) {
  const m = tagStr.match(new RegExp(`${propName}=(["'])((?:(?!\\1).)*)\\1`));
  return m ? m[2] : null;
}

function renderEntry(entry) {
  if (entry.divider) return `*— ${entry.divider} —*`;
  let s = `\`${entry.label}\``;
  if (entry.details) s += ` ${entry.details}`;
  if (entry.expected) s += ` (expected: ${entry.expected})`;
  if (entry.status === "matched") s = `✓ ${s}`;
  if (entry.status === "mismatch") s = `✗ ${s}`;
  return s;
}

function renderEntryGroup(label, entries) {
  if (entries.length === 1 && !entries[0].divider) {
    return `**${label}:** ${renderEntry(entries[0])}`;
  }
  return [`**${label}:**`, ...entries.map((e) => `- ${renderEntry(e)}`)].join("\n");
}

/**
 * Render one parsed `<WalkthroughStep>` (see the transformer's WALKTHROUGH_STEP
 * state) to Markdown. `labels` mirrors the `commandsLabel`/`eventsLabel` props
 * read off the enclosing `<WalkthroughDemo>` tag — `eventsLabel` absent means
 * that demo has no Events column. `ctx.previousPhase` is mutated so a
 * `### Phase` heading is only emitted once per phase, not once per step.
 */
export function renderWalkthroughStep(step, labels, ctx) {
  const out = [];
  if (step.phase && step.phase !== ctx.previousPhase) {
    out.push(`### ${step.phase}`, "");
    ctx.previousPhase = step.phase;
  }
  out.push(`#### Step ${step.number}: ${step.title}`, "");
  if (step.kind && KIND_LABEL[step.kind]) out.push(`*${KIND_LABEL[step.kind]}*`, "");
  if (step.body) out.push(step.body, "");
  if (step.commands.length) {
    out.push(renderEntryGroup(labels.commandsLabel ?? "Commands", step.commands), "");
  }
  if (step.events.length && labels.eventsLabel) {
    out.push(renderEntryGroup(labels.eventsLabel, step.events), "");
  }
  return out.join("\n").trimEnd();
}

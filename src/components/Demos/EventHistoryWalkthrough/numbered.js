/**
 * Assigns step numbers from array order, so a walkthrough can add or drop a
 * step (see `extraInternal` in steps-code-to-commands.js) without renumbering
 * the ones after it by hand.
 */
export function numbered(steps) {
  return steps.filter(Boolean).map((step, i) => ({ ...step, number: i + 1 }));
}

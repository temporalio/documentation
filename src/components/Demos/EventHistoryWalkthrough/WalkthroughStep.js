/**
 * Declarative marker — never mounted. Authored as a child of a
 * `*Demo` component (e.g. `<CodeToCommandsDemo>`); `parseWalkthroughChildren`
 * reads its props/children directly off the unrendered React element to build
 * the step data `WorkflowWalkthrough` renders. Do not add rendering logic here.
 */
export default function WalkthroughStep() {
  return null;
}

import React from 'react';
import WorkflowWalkthrough from './WorkflowWalkthrough';
import { parseWalkthroughChildren } from './parseWalkthroughChildren';
import WalkthroughStep from './WalkthroughStep';
import WalkthroughCommand from './WalkthroughCommand';
import WalkthroughEvent from './WalkthroughEvent';

export { WalkthroughStep, WalkthroughCommand, WalkthroughEvent };

/**
 * Step-by-step Workflow code walkthrough. Content is authored directly in MDX
 * as a code fence followed by `<WalkthroughStep>` children — see
 * docs/encyclopedia/event-history/*.mdx.
 *
 * @param {object} props
 * @param {string} props.ariaLabel - Label for the demo region.
 * @param {string} [props.commandsLabel='Commands'] - Column title for the Commands ledger.
 * @param {string} [props.eventsLabel] - Column title for the Events ledger. Omit for a
 *   Commands-only demo (no Events column).
 */
export const WalkthroughDemo = ({ ariaLabel, commandsLabel = 'Commands', eventsLabel, children }) => {
  const { code, language, steps } = parseWalkthroughChildren(children);
  const columns = [{ key: 'commands', title: commandsLabel }];
  if (eventsLabel) columns.push({ key: 'events', title: eventsLabel });
  return (
    <WorkflowWalkthrough
      ariaLabel={ariaLabel}
      code={code}
      language={language}
      steps={steps}
      columns={columns}
    />
  );
};

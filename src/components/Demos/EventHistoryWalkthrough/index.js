import React from 'react';
import WorkflowWalkthrough from './WorkflowWalkthrough';
import { PIZZA_WORKFLOW_CODE } from './pizza-workflow';
import { CODE_TO_COMMANDS_COLUMNS, CODE_TO_COMMANDS_STEPS } from './steps-code-to-commands';
import { COMMANDS_TO_EVENTS_COLUMNS, COMMANDS_TO_EVENTS_STEPS } from './steps-commands-to-events';
import { HISTORY_REPLAY_COLUMNS, HISTORY_REPLAY_STEPS } from './steps-history-replay';
import { NON_DETERMINISM_CODE, NON_DETERMINISM_COLUMNS, NON_DETERMINISM_STEPS } from './steps-non-determinism';

export const CodeToCommandsDemo = () => (
  <WorkflowWalkthrough
    ariaLabel="How Workflow code maps to Commands"
    code={PIZZA_WORKFLOW_CODE}
    steps={CODE_TO_COMMANDS_STEPS}
    columns={CODE_TO_COMMANDS_COLUMNS}
  />
);

export const CommandsToEventsDemo = () => (
  <WorkflowWalkthrough
    ariaLabel="How Workflow Commands map to Events"
    code={PIZZA_WORKFLOW_CODE}
    steps={COMMANDS_TO_EVENTS_STEPS}
    columns={COMMANDS_TO_EVENTS_COLUMNS}
  />
);

export const HistoryReplayDemo = () => (
  <WorkflowWalkthrough
    ariaLabel="How History Replay provides Durable Execution"
    code={PIZZA_WORKFLOW_CODE}
    steps={HISTORY_REPLAY_STEPS}
    columns={HISTORY_REPLAY_COLUMNS}
  />
);

export const NonDeterminismDemo = () => (
  <WorkflowWalkthrough
    ariaLabel="Example of a non-deterministic Workflow"
    code={NON_DETERMINISM_CODE}
    steps={NON_DETERMINISM_STEPS}
    columns={NON_DETERMINISM_COLUMNS}
  />
);

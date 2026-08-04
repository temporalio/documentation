import React from 'react';
import WorkflowWalkthrough from './WorkflowWalkthrough';
import { GO } from './languages/go';
import { DOTNET } from './languages/dotnet';
import { JAVA } from './languages/java';
import { PYTHON } from './languages/python';
import { CODE_TO_COMMANDS_COLUMNS, makeCodeToCommandsSteps } from './steps-code-to-commands';
import { COMMANDS_TO_EVENTS_COLUMNS, makeCommandsToEventsSteps } from './steps-commands-to-events';
import { HISTORY_REPLAY_COLUMNS, makeHistoryReplaySteps } from './steps-history-replay';
import { NON_DETERMINISM_COLUMNS, makeNonDeterminismSteps } from './steps-non-determinism';

const SDKS = { go: GO, dotnet: DOTNET, java: JAVA, python: PYTHON };

/** Same walkthrough narrative for every SDK; `sdk` picks the code sample. */
function resolveSdk(sdk) {
  const config = SDKS[sdk];
  if (!config) {
    throw new Error(`Unknown sdk "${sdk}" for an Event History walkthrough. Add it to languages/.`);
  }
  return config;
}

export const CodeToCommandsDemo = ({ sdk = 'go' }) => {
  const config = resolveSdk(sdk);
  return (
    <WorkflowWalkthrough
      ariaLabel="How Workflow code maps to Commands"
      code={config.pizzaWorkflow.code}
      language={config.language}
      steps={makeCodeToCommandsSteps(config.pizzaWorkflow)}
      columns={CODE_TO_COMMANDS_COLUMNS}
    />
  );
};

export const CommandsToEventsDemo = ({ sdk = 'go' }) => {
  const config = resolveSdk(sdk);
  return (
    <WorkflowWalkthrough
      ariaLabel="How Workflow Commands map to Events"
      code={config.pizzaWorkflow.code}
      language={config.language}
      steps={makeCommandsToEventsSteps(config.pizzaWorkflow)}
      columns={COMMANDS_TO_EVENTS_COLUMNS}
    />
  );
};

export const HistoryReplayDemo = ({ sdk = 'go' }) => {
  const config = resolveSdk(sdk);
  return (
    <WorkflowWalkthrough
      ariaLabel="How History Replay provides Durable Execution"
      code={config.pizzaWorkflow.code}
      language={config.language}
      steps={makeHistoryReplaySteps(config.pizzaWorkflow)}
      columns={HISTORY_REPLAY_COLUMNS}
    />
  );
};

export const NonDeterminismDemo = ({ sdk = 'go' }) => {
  const config = resolveSdk(sdk);
  return (
    <WorkflowWalkthrough
      ariaLabel="Example of a non-deterministic Workflow"
      code={config.nonDeterminism.code}
      language={config.language}
      steps={makeNonDeterminismSteps(config.nonDeterminism)}
      columns={NON_DETERMINISM_COLUMNS}
    />
  );
};

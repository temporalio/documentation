---
id: replays
title: How to Replay a Workflow Execution
description: Replay recreates the exact state of a Workflow Execution.
sidebar_label: Replay
tags:
  - guide-context
---

Replay recreates the exact state of a Workflow Execution.
You can replay a Workflow from the beginning of its Event History.

Replay succeeds only if the [Workflow Definition](/concepts/what-is-a-workflow-definition) is compatible with the provided history from a deterministic point of view.

When you test changes to your Workflow Definitions, we recommend doing the following as part of your CI checks:

1. Determine which Workflow Types or Task Queues (or both) will be targeted by the Worker code under test.
2. Download the Event Histories of a representative set of recent open and closed Workflows from each Task Queue, either programmatically using the SDK client or via `tctl`.
3. Run the Event Histories through replay.
4. Fail CI if any error is encountered during replay.

The following are examples of fetching and replaying Event Histories:

To replay Workflow Executions, use the `\Temporal\Testing\Replay\WorkflowReplayer` class.

In the following example, Event Histories are fetching from the Temporal, and then replayed.
If the Workflow is non-deterministic, a `NonDeterministicWorkflowException` will be thrown.
Note that this requires [Advanced Visibility](/concepts/what-is-advanced-visibility) to be enabled.

```php
/**
 * We assume you already have a WorkflowClient and WorkflowReplayer in scope.
 * @var \Temporal\Client\WorkflowClientInterface $workflowClient
 * @var \Temporal\Testing\Replay\WorkflowReplayer $replayer
 */

// Find all workflow executions of type "MyWorkflow" and task queue "MyTaskQueue".
$executions = $workflowClient->listWorkflowExecutions(
    "WorkflowType='MyWorkflow' AND TaskQueue='MyTaskQueue'"
);

// Replay each workflow execution.
foreach ($executions as $executionInfo) {
    try {
        $replayer->replayFromServer(
            workflowType: $executionInfo->type->name,
            execution: $executionInfo->execution,
        );
    } catch (\Temporal\Testing\Replay\Exception\ReplayerException $e) {
        // Handle a replay error.
    }
}
```

In the next example, an Event History is loaded from a JSON file, and the maximum number of replayed Events is limited to 42.

```php
$replayer->replayFromJSON(
    workflowType: 'MyWorkflow',
    path: 'history.json',
    lastEventId: 42,  // optional
);
```

You can download a Workflow History using PHP, and then replay it from a memorized History object:

```php
$history = $this->workflowClient->getWorkflowHistory(
    execution: $run->getExecution(),
)->getHistory();

(new WorkflowReplayer())->replayHistory($history);
```

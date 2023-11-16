---
id: how-to-replay-a-workflow-execution-in-typescript
title: How to replay a Workflow Execution in TypeScript
sidebar_label: WorkflowReplayer
description: Use the `runReplayHistory` API to replay an existing Workflow Execution from an Event History to replicate errors.
tags:
  - typescript sdk
  - how-to-doc-type
  - testing
  - workflow execution
  - event history
  - replay
---

Use the [worker.runReplayHistory](https://typescript.temporal.io/api/classes/worker.Worker#runreplayhistory) to replay an existing Workflow Execution from its Event History to replicate errors.

For example, the following code retrieves the Event History of a Workflow:

```go
const connection = await Connection.connect({ address });
const client = new Client({ connection, namespace: 'backgroundcheck_namespace' });
const handle = client.workflow.getHandle('backgroundcheck_workflow');
const history = await handle.fetchHistory();
await Worker.runReplayHistory(
  {
    workflowsPath: require.resolve('./backgroundcheck_workflow_event_history.json'),
  },
  history,
);
```

This Event History can then be used to _replay_.

The code above will cause the Worker to re-execute the Workflow's Workflow Function using the original Event History.
If a noticeably different code path was followed or some code caused a deadlock, it will be returned in the error code.
Replaying a Workflow Execution locally is a good way to see exactly what code path was taken for given input and events.

You can replay many Event Histories by registering all the needed Workflow implementation and then calling `ReplayWorkflowHistory` repeatedly.

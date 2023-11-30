---
id: how-to-replay-a-workflow-execution-in-typescript
title: How to replay a Workflow Execution in TypeScript
sidebar_label: Replay a Workflow Execution
description: Replay a Workflow Execution
tags:
  - developer-guide
  - sdk
  - typescript
---

To replay a single Event History, use [worker.runReplayHistory](https://typescript.temporal.io/api/classes/worker.Worker#runreplayhistory).

When an Event History is replayed and non-determinism is detected (that is, the Workflow code is incompatible with the History), [DeterminismViolationError](https://typescript.temporal.io/api/classes/workflow.DeterminismViolationError) is thrown.
If replay fails for any other reason, [ReplayError](https://typescript.temporal.io/api/classes/worker.ReplayError) is thrown.

In the following example, a single Event History is loaded from a JSON file on disk (as obtained from the [Web UI](/web-ui) or the [Temporal CLI](/cli/workflow#show)):

```ts
const filePath = "./history_file.json";
const history = await JSON.parse(fs.promises.readFile(filePath, "utf8"));
await Worker.runReplayHistory(
  {
    workflowsPath: require.resolve("./your/workflows"),
  },
  history
);
```

Alternatively, we can download the Event History programmatically using a Client:

```ts
const connection = await Connection.connect({ address });
const client = new Client({ connection, namespace: "your-namespace" });
const handle = client.workflow.getHandle("your-workflow-id");
const history = await handle.fetchHistory();
await Worker.runReplayHistory(
  {
    workflowsPath: require.resolve("./your/workflows"),
  },
  history
);
```

To gain confidence that changes to a Workflow are safe to deploy, we recommend that you obtain Event Histories from the relevant Task Queue and replay them in bulk.
You can do so by combining the [workflow.list](https://typescript.temporal.io/api/classes/client.WorkflowClient#list) and [worker.runReplayHistories](https://typescript.temporal.io/api/classes/worker.Worker#runreplayhistories) APIs.

In the following example (which, as of server 1.18, requires [Advanced Visibility](/concepts/what-is-advanced-visibility) to be enabled), Event Histories are downloaded from the server and then replayed by passing in a client and a set of Workflows Executions.
The [results](https://typescript.temporal.io/api/interfaces/worker.ReplayResult) returned by the async iterator contain information about the Workflow Execution and whether an error occurred during replay.

```ts
const executions = client.workflow.list({
  query: 'TaskQueue=foo and StartTime > "2022-01-01T12:00:00"',
});
const histories = executions.intoHistories();
const results = Worker.runReplayHistories(
  {
    workflowsPath: require.resolve("./your/workflows"),
  },
  histories
);
for await (const result of results) {
  if (result.error) {
    console.error("Replay failed", result);
  }
}
```

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

If non-determinism is caught while replaying the history, meaning that the Workflow code is incompatible with the
History, a [`DeterminismViolationError`](https://typescript.temporal.io/api/classes/workflow.DeterminismViolationError)
will be thrown.
If replay fails for any other reason a [`ReplayError`](https://typescript.temporal.io/api/classes/worker.ReplayError)
will be thrown.

In the next example, a single history is loaded from a JSON file on disk (as obtained from the [Web
UI](https://docs.temporal.io/web-ui) or the [Temporal CLI](https://docs.temporal.io/cli/workflow#show)):

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

Alternatively, we can download the history programatically using a Client:

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

In order to gain confidence that a Workflow changes are safe to deploy, it is recommended to obtain Histories from the
relevant task queue and replay them in bulk.
This can be achieved by combining the
[workflow.list](https://typescript.temporal.io/api/classes/client.WorkflowClient#list) and
[worker.runReplayHistories](https://typescript.temporal.io/api/classes/worker.Worker#runreplayhistories) APIs.

In the following example (which, as of server 1.18, requires advanced visibility to be enabled),
histories are downloaded from the server and then replayed by passing in a client and a set of
Executions.
The [results](https://typescript.temporal.io/api/interfaces/worker.ReplayResult) returned by the async iterator below
contain information about the Workflow Execution and whether or not an error occured during replay.

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

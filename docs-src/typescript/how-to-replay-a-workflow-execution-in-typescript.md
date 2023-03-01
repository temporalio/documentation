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

To replay one or more Event Histories, use [worker.runReplayHistories](https://typescript.temporal.io/api/classes/worker.Worker#runreplayhistories) or [worker.runReplayHistory](https://typescript.temporal.io/api/classes/worker.Worker#runreplayhistory).

In all examples if Workflow History is non-deterministic, a
[`DeterminismViolationError`](https://typescript.temporal.io/api/classes/workflow.determinismviolationerror/)
will be thrown.

In the following example (which, as of server 1.18, requires advanced visibility to be enabled),
histories are downloaded from the server and then replayed by passing in a client and a set of
executions. The code will throw an exception if any replay fails.

```ts
const executions = client.workflow.list({
  query: 'TaskQueue=foo and StartTime > "2022-01-01T12:00:00"',
});
const histories = executions.intoHistories();
await Worker.runReplayHistories(
  {
    workflowsPath: require.resolve('./your/workflows'),
  },
  histories,
);
```

In the next example, a single history is loaded from a JSON file on disk:

```ts
const filePath = './history_file.json';
const hist = await JSON.parse(fs.promises.readFile(filePath, 'utf8'));
await Worker.runReplayHistory(
  {
    workflowsPath: require.resolve('./your/workflows'),
  },
  hist,
);
```

Here, we show downloading a history and replaying it separately:

<!--SNIPSTART typescript-history-get-workflowhistory-->
[replay-history/src/replayer.ts](https://github.com/temporalio/samples-typescript/blob/master/replay-history/src/replayer.ts)
```ts
  const conn = await Connection.connect(/* { address: 'temporal.prod.company.com' } */);
  const { history } = await conn.workflowService.getWorkflowExecutionHistory({
    namespace: 'default',
    execution: {
      workflowId: 'calc',
    },
  });
```
<!--SNIPEND-->

Then call [`Worker.runReplayHistory`](https://typescript.temporal.io/api/classes/worker.worker/#runreplayhistory).

<!--SNIPSTART typescript-history-replay-->
[replay-history/src/replayer.ts](https://github.com/temporalio/samples-typescript/blob/master/replay-history/src/replayer.ts)
```ts
  await Worker.runReplayHistory(
    {
      workflowsPath: require.resolve('./workflows'),
      replayName: 'calc',
    },
    history
  );
```
<!--SNIPEND-->

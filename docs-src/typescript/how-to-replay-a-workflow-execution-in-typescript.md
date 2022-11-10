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

Use [worker.runReplayHistories](https://typescript.temporal.io/api/classes/worker.Worker#runreplayhistories)
or [worker.runReplayHistory](https://typescript.temporal.io/api/classes/worker.Worker#runreplayhistory)
to replay multiple or one Workflow Histories.

In the following example (which, as of server 1.18, requires advanced visibility to be enabled),
histories are downloaded from the server and then replayed by passing in a client and a set of
executions. The code will throw an exception if any replay fails.
```ts
const executions = 
  client.workflow.list({ query: 'TaskQueue=foo and StartTime > "2022-01-01T12:00:00"' });
await Worker.runReplayHistories(
  {
    workflowsPath: require.resolve('./your/workflows'),
  },
  { client, executions }
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

<!--SNIPSTART typescript-history-get-workflowhistory-->

[replay-history/src/replayer.ts](https://github.com/temporalio/samples-typescript/blob/master/replay-history/src/replayer.ts)

```ts
const conn = await Connection.connect(
  /* { address: 'temporal.prod.company.com' } */
);
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
  history,
);
```

<!--SNIPEND-->

If the Workflow code isn’t compatible with the Event History, `runReplayHistory` throws a [`DeterminismViolationError`](https://typescript.temporal.io/api/classes/workflow.determinismviolationerror/).

In both examples if Workflow History is non-deterministic, an error will be thrown. You can choose
to wait until all histories have been replayed with `runReplayHistories` by setting the `failFast`
option to `false`.

See a video on how to replay in [here](https://www.youtube.com/watch?v=fN5bIL7wc5M).

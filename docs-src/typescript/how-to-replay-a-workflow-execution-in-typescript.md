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

Retrieve Event History with [`WorkflowService.getWorkflowExecutionHistory`](https://typescript.temporal.io/api/classes/proto.temporal.api.workflowservice.v1.workflowservice-1/#getworkflowexecutionhistory).

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

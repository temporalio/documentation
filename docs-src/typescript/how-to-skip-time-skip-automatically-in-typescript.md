---
id: how-to-skip-time-skip-automatically-in-typescript
title: How to skip time automatically in TypeScript
sidebar_label: Skip time automatically
description: Use `TestWorkflowEnvironment.workflowClient.execute()` or `.result()` to switch the test server to "skipped" time mode until the Workflow completes.
tags:
  - developer-guide
  - sdk
  - typescript
---

The test server starts in "normal" time.
When you use `TestWorkflowEnvironment.workflowClient.execute()` or `.result()`, the test server switches to "skipped" time mode until the Workflow completes.
In "skipped" mode, timers (`sleep()` calls and `condition()` timeouts) are fast-forwarded except when Activities are running.

`workflows.ts`

```ts
import { sleep } from '@temporalio/workflow';

export async function sleeperWorkflow() {
  await sleep('1 day');
}
```

`test.ts`

```ts
import { sleeperWorkflow } from './workflows';

test('sleep completes almost immediately', async () => {
  const worker = await Worker.create({
    connection: testEnv.nativeConnection,
    taskQueue: 'test',
    workflowsPath: require.resolve('./workflows'),
  });
  // Does not wait an entire day
  await worker.runUntil(
    testEnv.workflowClient.execute(sleeperWorkflow, {
      workflowId: uuid(),
      taskQueue: 'test',
    }),
  );
});
```

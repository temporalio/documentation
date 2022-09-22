---
id: how-to-skip-time-skip-automatically-in-typescript
title: How to Skip Time automatically in TypeScript
sidebar_label: Skip Time automatically
description: Skip Time automatically
tags:
  - developer-guide
  - sdk
  - typescript
---

The Test Server starts in "normal" time. When you use `TestWorkflowEnvironment.workflowClient.execute()` or `.result()`, the Test Server is switched to "skipped" time mode until the Workflow completes. In "skipped" mode, timers (`sleep()`s and `condition()` timeouts) are fast-forwarded except when Activities are running.

`workflows.ts`

```ts
import { sleep } from '@temporalio/workflow';

export async function sleeperWorkflow() {
  await sleep('1 day');
}
```

`test.ts`

```ts
import { sleeperWorkflow } from './workflows'

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
    })
  );
});
```

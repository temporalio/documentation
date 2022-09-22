---
id: how-to-skip-time-skip-manually-in-typescript
title: How to Skip Time manually in TypeScript
sidebar_label: Skip Time manually
description: Skip Time manually
tags:
  - developer-guide
  - sdk
  - typescript
---

You can also call `testEnv.sleep()` from your test code to advance the Test Server's time.
This is useful for testing intermediate state, or for testing indefinitely long-running Workflows.
However, to use `testEnv.sleep()`, you need to avoid automatic time skipping by starting the Workflow with `.start()` instead of `.execute()` (and not calling `.result()`).

`workflow.ts`

```ts
import { sleep } from '@temporalio/workflow';
import { defineQuery, setHandler } from '@temporalio/workflow';

export const daysQuery = defineQuery('days');

export async function sleeperWorkflow() {
  let numDays = 0;

  setHandler(daysQuery, () => numDays);

  for (let i = 0; i < 100; i++) {
    await sleep('1 day');
    numDays++;
  }
}
```

`test.ts`

```ts
test('sleeperWorkflow counts days correctly', async () => {
  // `start()` starts the test server in "normal" mode, not skipped time mode.
  // If you don't advance time using `testEnv.sleep()`, then `sleeperWorkflow()` 
  // will run for days.
  handle = await testEnv.workflowClient.start(sleeperWorkflow, {
    workflowId: uuid4(),
    taskQueue,
  });

  let numDays = await handle.query(daysQuery);
  assert.equal(numDays, 0);

  // Advance the test server's time by 25 hours
  await testEnv.sleep('25 hours');  
  numDays = await handle.query(daysQuery);
  assert.equal(numDays, 1);

  await testEnv.sleep('25 hours');
  numDays = await handle.query(daysQuery);
  assert.equal(numDays, 2);
});
```

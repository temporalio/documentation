---
id: how-to-continue-as-new-in-typescript
title: How to Continue-As-New in TypeScript
sidebar_label: Continue-As-New
description: To Continue-As-New, use `continueAsNew`.
tags:
  - developer-guide
  - sdk
  - typescript
---

To cause a Workflow Execution to [Continue-As-New](/concepts/what-is-continue-as-new), the Workflow function should return the result of the [`continueAsNew`](https://typescript.temporal.io/api/namespaces/workflow#continueasnew).

<!--SNIPSTART typescript-continue-as-new-workflow -->
[continue-as-new/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/continue-as-new/src/workflows.ts)
```ts
import { continueAsNew, sleep } from '@temporalio/workflow';

export async function loopingWorkflow(iteration = 0): Promise<void> {
  if (iteration === 10) {
    return;
  }
  console.log('Running Workflow iteration:', iteration);
  await sleep(1000);
  // Must match the arguments expected by `loopingWorkflow`
  await continueAsNew<typeof loopingWorkflow>(iteration + 1);
  // Unreachable code, continueAsNew is like `process.exit` and will stop execution once called.
}
```
<!--SNIPEND-->

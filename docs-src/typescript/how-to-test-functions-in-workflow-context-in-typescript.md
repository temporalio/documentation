---
id: how-to-test-functions-in-workflow-context-in-typescript
title: How to test functions in the Workflow context in TypeScript
sidebar_label: Test functions in Workflow context
description: To test a function in your Workflow code that isn’t a Workflow, put the file it’s exported from in `WorkerOptions.workflowsPath`.
tags:
  - developer-guide
  - sdk
  - typescript
---

To test a function in your Workflow code that isn’t a Workflow, put the file it’s exported from in [WorkerOptions.workflowsPath](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions#workflowspath).
Then execute the function as if it were a Workflow:

`workflows/file-with-workflow-function-to-test.ts`

```ts
import { sleep } from '@temporalio/workflow';

export async function functionToTest(): Promise<number> {
  await sleep('1 day');
  return 42;
}
```

`test.ts`

```ts
const worker = await Worker.create({
  connection: testEnv.nativeConnection,
  workflowsPath: require.resolve(
    './workflows/file-with-workflow-function-to-test',
  ),
});

const result = await worker.runUntil(
  testEnv.workflowClient.execute(functionToTest, workflowOptions),
);

assert.equal(result, 42);
```

If `functionToTest` starts a Child Workflow, that Workflow must be exported from the same file (so that the Worker knows about it):

```ts
import { sleep } from '@temporalio/workflow';
import { someWorkflowToRunAsChild } from './some-workflow';

export { someWorkflowToRunAsChild };

export async function functionToTest(): Promise<number> {
  const result = await wf.executeChild(someWorkflowToRunAsChild);
  return result + 42;
}
```

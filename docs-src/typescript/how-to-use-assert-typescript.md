---
id: how-to-use-assert-typescript
title: How to assert a Workflow in TypeScript
sidebar_label: Assert a Workflow
tags:
  - developer-guide
  - typescript
---

The Node.js [`assert`](https://nodejs.org/api/assert.html) module is included in Workflow bundles.

By default, a failed `assert` statement throws `AssertionError`, which causes a [Workflow Task](/concepts/what-is-a-workflow-task) to fail and be indefinitely retried.

To prevent this behavior, use [`workflowInterceptorModules`](https://typescript.temporal.io/api/namespaces/testing/#workflowinterceptormodules) from `@temporalio/testing`.
These interceptors catch an `AssertionError` and turn it into an `ApplicationFailure` that fails the entire Workflow Execution (not just the Workflow Task).

`workflows/file-with-workflow-function-to-test.ts`

```ts
import assert from 'assert';

export async function functionToTest() {
  assert.ok(false);
}
```

`test.ts`

```ts
import {
  TestWorkflowEnvironment,
  workflowInterceptorModules,
} from '@temporalio/testing';

const worker = await Worker.create({
  connection: testEnv.nativeConnection,
  interceptors: {
    workflowModules: workflowInterceptorModules,
  },
  workflowsPath: require.resolve(
    './workflows/file-with-workflow-function-to-test',
  ),
});

await worker.runUntil(
  testEnv.workflowClient.execute(functionToTest, workflowOptions), // throws WorkflowFailedError
);
```

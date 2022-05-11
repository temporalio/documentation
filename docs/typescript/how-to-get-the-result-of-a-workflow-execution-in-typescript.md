---
id: how-to-get-the-result-of-a-workflow-execution-in-typescript
title: How to get the result of a Workflow execution in Typescript
sidebar_label: Workflow result
description: Get the result of a Workflow execution
tags:
  - developer-guide
  - sdk
  - typescript
---

To return the results of a Workflow Execution:

```typescript
return (
  'Completed ' +
  wf.workflowInfo().workflowId +
  ', Total Charged: ' +
  totalCharged
);
```

`totalCharged` is just a function declared in your code. For a full example, see [subscription-workflow-project-template-typescript/src/workflows.ts](https://github.com/temporalio/subscription-workflow-project-template-typescript/blob/main/src/workflows.ts).

A Workflow function may return a result. If it doesn’t (in which case the return type is `Promise<void>`), the result will be `undefined`.

If you started a Workflow with `handle.start()`, you can choose to wait for the result anytime with handle.result().

```typescript
const handle = client.getHandle(workflowId);
const result = await handle.result();
```

Using a Workflow Handle isn't necessary with `client.execute()`.

Workflows that prematurely end will throw a `WorkflowFailedError` if you call `result()`.

If you call `result()` on a Workflow that prematurely ended for some reason, it throws a [`WorkflowFailedError` error](https://typescript.temporal.io/api/classes/client.workflowfailederror/) that reflects the reason. For that reason, it is recommended to catch that error.

```typescript
const handle = client.getHandle(workflowId);
try {
  const result = await handle.result();
} catch (err) {
  if (err instanceof WorkflowFailedError) {
    throw new Error('Temporal workflow failed: ' + workflowId, {
      cause: err,
    });
  } else {
    throw new Error('error from Temporal workflow ' + workflowId, {
      cause: err,
    });
  }
}
```

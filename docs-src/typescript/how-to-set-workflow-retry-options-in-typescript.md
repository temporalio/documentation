---
id: how-to-set-workflow-retry-options-in-typescript
title: How to set Workflow Retry Options in TypeScript
sidebar_label: Set Workflow Retry Options
description: Set Workflow Retry Options
tags:
  - developer-guide
  - sdk
  - typescript
---

Create an instance of the Retry Policy, known as [`retry`](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions/#retry) in TypeScript, from the [`WorkflowOptions`](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions) of the Client interface.

<!--SNIPSTART typescript-retry-workflow -->
[snippets/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/snippets/src/client.ts)
```ts
  const handle = await client.workflow.start(example, {
    taskQueue,
    workflowId,
    retry: {
      maximumAttempts: 3,
    },
  });
```
<!--SNIPEND-->

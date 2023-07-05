---
id: how-to-set-workflow-timeouts-in-typescript
title: How to set Workflow Timeouts in TypeScript
sidebar_label: Set Workflow Timeouts
description: Set Workflow Timeouts
tags:
  - developer-guide
  - sdk
  - typescript
---

Create an instance of `WorkflowOptions` from the Client and set your Workflow Timeout.

Available timeouts are:

- [`workflowExecutionTimeout​`](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions/#workflowexecutiontimeout)
- [`workflowRunTimeout`](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions/#workflowruntimeout)
- [`workflowTaskTimeout`](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions/#workflowtasktimeout)

<!--SNIPSTART typescript-execution-timeout -->
[snippets/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/snippets/src/client.ts)
```ts
  await client.workflow.start(example, {
    taskQueue,
    workflowId,
    workflowExecutionTimeout: '1 day',
  });
```
<!--SNIPEND-->

<!--SNIPSTART typescript-run-timeout -->
[snippets/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/snippets/src/client.ts)
```ts
  await client.workflow.start(example, {
    taskQueue,
    workflowId,
    workflowRunTimeout: '1 minute',
  });
```
<!--SNIPEND-->

<!--SNIPSTART typescript-task-timeout -->
[snippets/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/snippets/src/client.ts)
```ts
  await client.workflow.start(example, {
    taskQueue,
    workflowId,
    workflowTaskTimeout: '1 minute',
  });
```
<!--SNIPEND-->

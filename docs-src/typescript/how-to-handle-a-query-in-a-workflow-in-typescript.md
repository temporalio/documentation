---
id: how-to-handle-a-query-in-a-workflow-in-typescript
title: How to handle a Query in a Workflow in TypeScript
sidebar_label: Handle Query
description: To handle a Query in a Workflow, define a Query handler method using the `handle.query(query, ...args)` annotation in the Workflow interface.
tags:
  - typescript
  - developer-guide
---

Use [`handleQuery`](https://typescript.temporal.io/api/interfaces/workflow.WorkflowInboundCallsInterceptor/#handlequery) to handle Queries inside a Workflow.

You make a Query with `handle.query(query, ...args)`. A Query needs a return value, but can also take arguments.

<!--SNIPSTART typescript-handle-query -->

[state/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/state/src/workflows.ts)

```ts
export async function trackState(): Promise<void> {
  const state = new Map<string, number>();
  setHandler(setValueSignal, (key, value) => void state.set(key, value));
  setHandler(getValueQuery, (key) => state.get(key));
  await CancellationScope.current().cancelRequested;
}
```

<!--SNIPEND-->

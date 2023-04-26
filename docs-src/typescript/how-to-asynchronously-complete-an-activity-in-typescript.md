---
id: how-to-asynchronously-complete-an-activity-in-typescript
title: How to asynchronously complete an Activity in TypeScript
sidebar_label: Asynchronously complete an Activity
description: To asynchronously complete an Activity in TypeScript, set `AsyncCompletionClient` to `complete`.
tags:
  - typescript
  - how-to
---

To asynchronously complete an Activity, call [`AsyncCompletionClient.complete`](https://typescript.temporal.io/api/classes/client.AsyncCompletionClient#complete).

<!--SNIPSTART typescript-activity-complete-async -->
[activities-examples/src/activities/async-completion.ts](https://github.com/temporalio/samples-typescript/blob/master/activities-examples/src/activities/async-completion.ts)
```ts
import { CompleteAsyncError, Context } from '@temporalio/activity';
import { AsyncCompletionClient } from '@temporalio/client';

export async function doSomethingAsync(): Promise<string> {
  const taskToken = Context.current().info.taskToken;
  setTimeout(() => doSomeWork(taskToken), 1000);
  throw new CompleteAsyncError();
}

// this work could be done in a different process or on a different machine
async function doSomeWork(taskToken: Uint8Array): Promise<void> {
  const client = new AsyncCompletionClient();
  // does some work...
  await client.complete(taskToken, "Job's done!");
}
```
<!--SNIPEND-->

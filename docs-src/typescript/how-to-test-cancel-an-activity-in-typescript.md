---
id: how-to-test-cancel-an-activity-in-typescript
title: How to test whether an Activity reacts to a Cancellation in TypeScript
sidebar_label: Configure tracing
description: Call `MockActivityEnvironment.cancel()` to cancel an Activity Context.
tags:
  - developer-guide
  - sdk
  - typescript
---

[`MockActivityEnvironment`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment) exposes a [`.cancel()`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment#cancel) method that cancels the Activity Context.

```ts
import { CancelledFailure, Context } from '@temporalio/activity';
import { MockActivityEnvironment } from '@temporalio/testing';
import assert from 'assert';

async function activityFoo(): Promise<void> {
  Context.current().heartbeat(6);
  // .sleep() is Cancellation-aware, which means that on Cancellation,
  // CancelledFailure will be thrown from it.
  await Context.current().sleep(100);
}

const env = new MockActivityEnvironment();

env.on('heartbeat', (d: unknown) => {
  assert(d === 6);
});

await assert.rejects(env.run(activityFoo), (err) => {
  assert.ok(err instanceof CancelledFailure);
});
```

---
id: how-to-run-an-activity-in-typescript
title: How to Run an Activity when testing in isolation in TypeScript
sidebar_label: Run an Activity when testing in isolation
description: Use `MockActivityEnvironment.run()` to run a function in an Activity Context.
tags:
  - developer-guide
  - sdk
  - typescript
---

First, create a [`MockActivityEnvironment`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment).
The constructor accepts an optional partial Activity [`Info`](https://typescript.temporal.io/api/classes/activity.Info) object in case any info fields are needed for the test.

Then use [`MockActivityEnvironment.run()`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment#run) to run a function in an Activity [Context](https://typescript.temporal.io/api/classes/activity.Context).

```ts
import { Context } from '@temporalio/activity';
import { MockActivityEnvironment } from '@temporalio/testing';
import assert from 'assert';

// A function that takes two numbers and returns a promise that resolves to the sum of the two numbers
// and the current attempt.
async function activityFoo(a: number, b: number): Promise<number> {
  return a + b + Context.current().info.attempt;
}

// Create a MockActivityEnvironment with attempt set to 2. Run the activityFoo
// function with parameters 5 and 35. Assert that the result is 42.
const env = new MockActivityEnvironment({ attempt: 2 });
const result = await env.run(activityFoo, 5, 35);
assert.equal(result, 42);
```

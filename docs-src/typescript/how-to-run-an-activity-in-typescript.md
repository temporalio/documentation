---
id: how-to-run-an-activity-in-typescript
title: How to Run an Activity when testing in isolation in TypeScript
sidebar_label: Run an Activity when testing in isolation
description: Run an Activity when testing in isolation
tags:
  - developer-guide
  - sdk
  - typescript
---

First, create a [`MockActivityEnvironment`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment). The constructor accepts an optional partial Activity [`Info`](https://typescript.temporal.io/api/classes/activity.Info) object in case any info fields are needed for the test.

Then use [`MockActivityEnvironment.run()`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment#run) to run a function in an Activity [Context](https://typescript.temporal.io/api/classes/activity.context).

```ts
import {MockActivityEnvironment} from "@temporalio/testing";
import {Context} from "@temporalio/activity";
import assert from "assert";

// A function that takes two numbers and returns a promise that resolves to the sum of the two numbers
// and the current attempt.
async function activityFoo(a: number, b: number): Promise<number> {
  return a + b + Context.current().info.attempt;
}

// Creating a new MockActivityEnvironment with the attempt set to 2. Then it is running the activityFoo
// function with the parameters 5 and 35. Then it is asserting that the result is 42.
const env = new MockActivityEnvironment({attempt: 2});
const result = await env.run(activityFoo, 5, 35);
assert.equal(result, 42);
```

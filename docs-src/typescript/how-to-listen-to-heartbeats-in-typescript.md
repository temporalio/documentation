---
id: how-to-listen-to-heartbeats-in-typescript
title: How to listen to Heartbeats in TypeScript
sidebar_label: Listen to Heartbeats
description: Listen to Heartbeats
tags:
  - developer-guide
  - sdk
  - typescript
---

[`MockActivityEnvironment`](https://typescript.temporal.io/api/classes/testing.MockActivityEnvironment) is an [`EventEmitter`](https://nodejs.org/api/events.html#class-eventemitter) that emits a `heartbeat` event that you can use to listen for heartbeats emitted by the Activity.

When an Activity is run by a Worker, heartbeats are throttled to avoid overloading the server.
`MockActivityEnvironment`, on the other hand, does not throttle heartbeats.

```ts
import {MockActivityEnvironment} from "@temporalio/testing";
import {Context} from "@temporalio/activity";
import assert from "assert";

async function activityFoo(): Promise<void> {
  Context.current().heartbeat(6);
}

const env = new MockActivityEnvironment();

env.on("heartbeat", (d: unknown) => {
  assert(d === 6);
});

await env.run(activityFoo);
```

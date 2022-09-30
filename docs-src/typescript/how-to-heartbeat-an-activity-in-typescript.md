---
id: how-to-heartbeat-an-activity-in-typescript
title: How to Heartbeat an Activity in TypeScript
sidebar_label: Activity Heartbeat
description: Heartbeat Activities to track their progress and get details of the Activity Execution.
tags:
  - developer-guide
  - sdk
  - typescript
---

Long-running Activities should Heartbeat their progress back to the Workflow for earlier detection of stalled Activities (with [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout)) and resuming stalled Activities from checkpoints (with Heartbeat details).

To set Activity Heartbeat, use `Context.current().heartbeat()` in your Activity implementation, and set `heartbeatTimeout` in your Workflow.

```ts
// activity implementation
export async function example(sleepIntervalMs = 1000): Promise<void> {
  for (let progress = 1; progress <= 1000; ++progress) {
    await Context.current().sleep(sleepIntervalMs);
    // record activity heartbeat
    Context.current().heartbeat();
  }
}

// ...

// workflow code calling activity
const { example } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 hour',
  heartbeatTimeout: '10s',
});
```

In the previous example, setting the Heartbeat informs the Temporal Server of the Activity's progress at regular intervals.
If the Activity stalls or the Activity Worker becomes unavailable, the absence of Heartbeats prompts the Temporal Server to retry the Activity immediately, without waiting for `startToCloseTimeout` to complete.

You can also add `heartbeatDetails` as a checkpoint to collect data about failures during the execution, and use it to resume the Activity from that point.

The following example extends the previous sample to include a `heartbeatDetails` checkpoint.

```ts
export async function example(sleepIntervalMs = 1000): Promise<void> {
  const startingPoint = Context.current().info.heartbeatDetails || 1; // allow for resuming from heartbeat
  for (let progress = startingPoint; progress <= 100; ++progress) {
    await Context.current().sleep(sleepIntervalMs);
    Context.current().heartbeat(progress);
  }
}
```

In this example, when the `heartbeatTimeout` is reached and the Activity is retried, the Activity Worker picks up the execution from where the previous attempt left off.

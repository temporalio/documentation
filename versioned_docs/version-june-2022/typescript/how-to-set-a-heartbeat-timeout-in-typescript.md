---
id: how-to-set-a-heartbeat-timeout-in-typescript
title: How to set a Heartbeat Timeout in TypeScript
sidebar_label: Set a Heartbeat Timeout
description: Set a Heartbeat Timeout
tags:
  - developer-guide
  - sdk
  - typescript
---

To set a Heartbeat Timeout, use [`ActivityOptions.heartbeatTimeout`](https://typescript.temporal.io/api/interfaces/common.ActivityOptions#heartbeattimeout). If the Activity takes longer than that between heartbeats, the Activity is failed.

```typescript
// Creating a proxy for the activity.
const {longRunningActivity} = proxyActivities<typeof activities>({
  scheduleToCloseTimeout: "5m", // translates to 300000 ms
  startToCloseTimeout: "30s", // translates to 30000 ms
  heartbeatTimeout: 10000, // equivalent to '10 seconds'
});
```

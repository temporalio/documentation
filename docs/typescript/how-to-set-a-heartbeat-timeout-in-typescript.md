---
id: how-to-set-a-heartbeat-timeout-in-typescript
title: How to set a Heartbeat Timeout in Typescript
sidebar_label: Set a Heartbeat Timeout
description: Set a Heartbeat Timeout
tags:
  - developer-guide
  - sdk
  - typescript
---

To set a Heartbeat Timeout, create an instance of `longRunningActivity` and set the `heartbeatTimeout` to a time that the Activity can take to complete. If it takes longer than that, the Activity fails.

```typescript
// Creating a proxy for the activity.
const { longRunningActivity } = proxyActivities<typeof activities>({
  scheduleToCloseTimeout: '5m', // translates to 300000 ms
  startToCloseTimeout: '30s', // translates to 30000 ms
  heartbeatTimeout: 10000, // equivalent to '10 seconds'
});
```

---
id: how-to-set-activity-timeouts-in-typescript
title: How to set Activity Timeouts in TypeScript
sidebar_label: Set Activity Timeouts
description: Set Activity Timeouts
tags:
  - developer-guide
  - sdk
  - typescript
---

When you call `proxyActivities` in a Workflow Function, you can set a range of `ActivityOptions`.

Available timeouts are:

- [`scheduleToCloseTimeout`](https://typescript.temporal.io/api/interfaces/common.ActivityOptions/#scheduletoclosetimeout)
- [`startToCloseTimeout`](https://typescript.temporal.io/api/interfaces/common.ActivityOptions/#starttoclosetimeout)
- [`scheduleToStartTimeout`](https://typescript.temporal.io/api/interfaces/common.ActivityOptions/#scheduletostarttimeout)

```typescript
// Sample of typical options you can set
const { greet } = proxyActivities<typeof activities>({
  scheduleToCloseTimeout: '5m',
  // startToCloseTimeout: "30s", // recommended
  // scheduleToStartTimeout: "60s",

  retry: {
    // default retry policy if not specified
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumAttempts: Infinity,
    maximumInterval: 100 * initialInterval,
    nonRetryableErrorTypes: [],
  },
});
```

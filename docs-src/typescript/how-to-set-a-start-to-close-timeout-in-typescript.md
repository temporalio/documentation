---
id: how-to-set-a-start-to-close-timeout-in-typescript
title: How to set a Start to Close Timeout in TypeScript
sidebar_label: Set a Start to Close Timeout
description: Set a Start to Close Timeout
tags:
  - developer-guide
  - sdk
  - typescript
---

When you call `proxyActivities` in a Workflow Function, you can set a range of `ActivityOptions`.

Either `scheduleToCloseTimeout` or `scheduleToStartTimeout` must be set.

Type: time.Duration
Default: ∞ (infinity – no limit)

In this example, you can set the `startToCloseTimeout` to 30 seconds.

```typescript
// Sample of typical options you can set
const {greet} = proxyActivities<typeof activities>({
  startToCloseTimeout: "30s", // recommended
  retry: {
    // default retry policy if not specified
    initialInterval: "1s",
    backoffCoefficient: 2,
    maximumAttempts: Infinity,
    maximumInterval: 100 * initialInterval,
    nonRetryableErrorTypes: [],
  },
});
```

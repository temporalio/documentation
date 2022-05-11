---
id: how-to-set-an-activity-retry-policy-in-typescript
title: How to set an Activity Retry Policy in TypeScript
sidebar_label: Set an Activity Retry Policy
description: Set an Activity Retry Policy
---

To set Activity Retry Policies in TypeScript, specify the `proxyActivities`, then add your configurable [Retry Policy](https://typescript.temporal.io/api/interfaces/proto.coresdk.common.iretrypolicy).

```typescript
// Sample of typical options you can set
const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30s', // recommended
  scheduleToCloseTimeout: '5m', // useful
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

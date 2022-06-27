---
id: how-to-set-an-activity-retry-policy-in-typescript
title: How to set an Activity Retry Policy in TypeScript
sidebar_label: Set an Activity Retry Policy
description: Set an Activity Retry Policy
---

To set Activity Retry Policies in TypeScript, pass [`ActivityOptions.retry`](https://typescript.temporal.io/api/interfaces/common.ActivityOptions#retry) to [`proxyActivities`](https://typescript.temporal.io/api/namespaces/workflow/#proxyactivities).

```typescript
// Sample of typical options you can set
const {yourActivity} = proxyActivities<typeof activities>({
  // ...
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

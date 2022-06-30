---
id: how-to-get-the-result-of-an-activity-execution-in-typescript
title: How to get the result of an Activity Execution in TypeScript
sidebar_label: Get the result of an Activity Execution
description: Get the result of an Activity Execution
tags:
  - developer-guide
  - sdk
  - typescript
---

Since Activities are referenced by their string name, you can reference them dynamically to get the result of an Activity Execution.

```typescript
export async function DynamicWorkflow(activityName, ...args) {
  const acts = proxyActivities(/* activityOptions */);

  // these are equivalent
  await acts.activity1();
  await acts["activity1"]();

  let result = await acts[activityName](...args);
  return result;
}
```

The `proxyActivities()` returns an object that calls the Activities in the function. `acts[activityName]()` references the Activity using the Activity name, then it returns the results.

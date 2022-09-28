---
id: how-to-spawn-an-activity-execution-in-typescript
title: How to spawn an Activity Execution in TypeScript
sidebar_label: Spawn an Activity Execution
description: Spawn an Activity Execution
tags:
  - developer-guide
  - sdk
  - typescript
---

To spawn an Activity Execution, you must retrieve the _Activity handle_ in your Workflow.

```typescript
import {proxyActivities} from "@temporalio/workflow";
// Only import the activity types
import type * as activities from "./activities";

const {greet} = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

// A workflow that calls an activity
export async function example(name: string): Promise<string> {
  return await greet(name);
}
```

This imports the individual Activities and declares the type alias for each Activity.

---
id: how-to-define-activity-return-values-in-typescript
title: How to define Activity Return Values in TypeScript
sidebar_label: Define Activity Return Values
description: Define Activity Return Values
tags:
  - developer-guide
  - sdk
  - typescript
---

To import the types of the Activities defined in `./activities`, you must first retrieve an Activity from an _Activity Handle_ before you can call it, then define Return Types in your Activity.

```typescript
import type * as activities from "./activities";
const {greet} = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

// A workflow that simply calls an activity
export async function example(name: string): Promise<string> {
  return await greet(name);
}
```

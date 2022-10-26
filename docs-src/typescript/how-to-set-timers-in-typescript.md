---
id: how-to-set-timers-in-typescript
title: How to set Timers in TypeScript
sidebar_label: Timers
description: To set a Timer in TypeScript, use the `sleep()` function.
tags:
  - timers
  - sleep
---

To set a Timer in TypeScript, use the [`sleep()`](https://typescript.temporal.io/api/namespaces/workflow/#sleep) function and pass how long you want to wait before continuing (using an [ms-formatted string](https://www.npmjs.com/package/ms) or number of milliseconds).

```typescript
import { sleep } from '@temporalio/workflow';

export async function sleepWorkflow(): Promise<void> {
  await sleep('2 months');
  console.log('done sleeping');
}
```

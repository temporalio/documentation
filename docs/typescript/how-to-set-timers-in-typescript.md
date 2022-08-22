---
id: how-to-set-timers-in-typescript
title: How to set Timers in TypeScript
sidebar_label: Timers
tags:
  - timers
  - sleep
---

To set a timer in TypeScript, use the [`sleep()`](https://typescript.temporal.io/api/namespaces/workflow/#sleep) function and pass how many milliseconds you want to wait before continuing.

```typescript
import { sleep } from '@temporalio/workflow';

export async function sleeper(ms = 100): Promise<void> {
  await sleep(ms);
  console.log('slept');
}
```

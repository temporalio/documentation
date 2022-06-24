---
id: how-to-handle-a-signal-in-typescript
title: How to handle a Signal in TypeScript
sidebar_label: Handle Signal
description: Handle Signal
tags:
  - developer-guide
  - sdk
  - typescript
---

[`setHandler`](https://typescript.temporal.io/api/namespaces/workflow/#sethandler)

```ts
import {setHandler} from "@temporalio/workflow";

export async function myWorkflow() {
  const groups = new Map<string, Set<string>>();

  setHandler(joinSignal, ({userId, groupId}: JoinInput) => {
    const group = groups.get(groupId);
    if (group) {
      group.add(userId);
    } else {
      groups.set(groupId, new Set([userId]));
    }
  });
}
```

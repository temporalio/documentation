---
id: how-to-handle-a-query-in-a-workflow-in-typescript
title: How to handle a Query in a Workflow in TypeScript
sidebar_label: Handle Query
description: To handle a Query in a Workflow, define a Query handler method using the `handle.query(query, ...args)` annotation in the Workflow interface.
tags:
  - typescript
  - developer-guide
---

Query Handlers can return values inside a Workflow in TypeScript.

You make a Query with `handle.query(query, ...args)`. A Query needs a return value, but can also take arguments.

```typescript
import * as wf from "@temporalio/workflow";

export const unblockSignal = wf.defineSignal("unblock");
export const isBlockedQuery = wf.defineQuery<boolean>("isBlocked");

export async function unblockOrCancel(): Promise<void> {
  let isBlocked = true;
  wf.setHandler(unblockSignal, () => void (isBlocked = false));
  wf.setHandler(isBlockedQuery, () => isBlocked);
  console.log("Blocked");
  try {
    await wf.condition(() => !isBlocked);
    console.log("Unblocked");
  } catch (err) {
    if (err instanceof wf.CancelledFailure) {
      console.log("Cancelled");
    }
    throw err;
  }
}
```

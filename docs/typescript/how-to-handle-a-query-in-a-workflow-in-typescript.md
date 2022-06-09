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
import * as wf from '@temporalio/workflow';

function useState<T = any>(name: string, initialValue: T) {
  const query = wf.defineQuery<T>(name);
  let state: T = initialValue;
  return {
    query,
    get value() {
      return state;
    },
    set value(newVal: T) {
      state = newVal;
    },
  };
}
```

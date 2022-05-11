---
id: how-to-define-workflow-return-values-in-typescript
title: How to define Workflow return values in Typescript
sidebar_label: Define Workflow return values
description: Define Workflow return values
tags:
  - developer-guide
  - sdk
  - typescript
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

---
id: how-to-define-workflow-return-values-in-typescript
title: How to define Workflow return values in TypeScript
sidebar_label: Define Workflow return values
description: Define Workflow return values
tags:
  - developer-guide
  - sdk
  - typescript
---

To return a value of the Workflow function, use `Promise<something>`. The `Promise` is used to make asynchronous calls and comes with guarantees.

The following example uses a `Promise<string>` to eventually return a `name` and `born` parameter.

```typescript
interface ExampleParam {
  name: string;
  born: number;
}
export async function example({name, born}: ExampleParam): Promise<string> {
  return `Hello ${name}, you were born in ${born}.`;
}
```

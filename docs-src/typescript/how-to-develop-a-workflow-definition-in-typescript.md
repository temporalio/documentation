---
id: how-to-develop-a-workflow-definition-in-typescript
title: How to develop a Workflow Definition in TypeScript
sidebar_label: Develop a Workflow Definition
description: Develop a Workflow Definition
tags:
  - developer-guide
  - sdk
  - typescript
---

In the Temporal TypeScript SDK programming model, Workflow Definitions are _just functions_, which can store state and orchestrate Activity Functions.
The following code snippet uses `proxyActivities` to schedule a `greet` Activity in the system to say hello.

A Workflow Definition can have multiple parameters; however, we recommend using a single object parameter.

```typescript
type ExampleArgs = {
  name: string;
};

export async function example(
  args: ExampleArgs,
): Promise<{ greeting: string }> {
  const greeting = await greet(args.name);
  return { greeting };
}
```

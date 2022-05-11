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

A Workflow Function has two parts:

- The function name is the [Workflow Type](/docs/concepts/what-is-a-workflow-type/).
- The function implementation is the [Workflow Definition](/docs/concepts/what-is-a-workflow-definition).

Workflow Functions are bundled with their dependencies and registered by name in a Worker. A Workflow Function becomes a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) when it's started from a Workflow Client.

Workflow Functions are _just functions_, which can store state, and orchestrate Activity Functions.
The following code snippet uses `proxyActivities` to schedule a `greet` Activity in the system to say hello.

A Workflow Function can have multiple parameters; however, we recommend using a single object parameter.

```typescript
type ExampleArgs = {
  name: string;
};

export async function example(
  args: ExampleArgs
): Promise<{ greeting: string }> {
  const greeting = await greet(args.name);
  return { greeting };
}
```

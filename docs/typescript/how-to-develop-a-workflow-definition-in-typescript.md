---
id: how-to-develop-a-workflow-definition-in-typescript
title: How to develop a Workflow definition in Typescript
sidebar_label: Develop a Workflow definition
description: Develop a Workflow definition
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

A Workflow Function can have multiple parameters, however, Temporal encourages you to use a single object parameter.

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

This Workflow Function takes the name of the parameters and assigns it to the variable name. Then it calls the function and pass the name of the variable as the argument. The function returns a promise with the value of `greeting`.

---
id: how-to-define-workflow-parameters-in-typescript
title: How to define Workflow parameters in TypeScript
sidebar_label: Define Workflow parameters
description: Define Workflow parameters
tags:
  - developer-guide
  - sdk
  - typescript
---

You can define and pass parameters in your Workflow. In this example, you define your arguments in your `client.ts` file and pass those parameters to `workflow.ts` through your Workflow function.

Start a Workflow with the parameters that are in the `client.ts` file. In this example we set the `name` parameter to `Temporal` and `born` to `2019`. Then set the Task Queue and Workflow Id.

`client.ts`

```typescript
import { example } from './workflows';

...
await client.start(example, {
  args: [{ name: 'Temporal', born: 2019 }],
  taskQueue: 'your-queue',
  workflowId: 'business-meaningful-id',
});
```

In `workflows.ts` define the type of the parameter that the Workflow function takes in. The interface `ExampleParam` is a name we can now use to describe the requirement in the previous example. It still represents having the two properties called `name` and `born` that is of the type `string`. Then define a function that takes in a parameter of the type `ExampleParam` and return a `Promise<string>`. The `Promise` object represents the eventual completion, or failure, of `await client.start()` and its resulting value.

```ts
interface ExampleParam {
  name: string;
  born: number;
}
export async function example({ name, born }: ExampleParam): Promise<string> {
  return `Hello ${name}, you were born in ${born}.`;
}
```

---
id: workflows
title: Workflows in Node.js
sidebar_label: Workflows
description: In the Temporal Node SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
image: /img/workflow.png
---

[API reference](https://nodejs.temporal.io/api/modules/workflow)

Workflows are the core of the Temporal system. They abstract away the complexities of writing distributed programs.

In the Node.js SDK, each Workflow runs in a separate V8 isolate to provide a [deterministic runtime](/docs/node/determinism).

## How to write Workflow code

### Workflow Interface

A Workflow's interface is used for validating the implementation and generating a type safe [WorkflowStub](https://nodejs.temporal.io/api/interfaces/client.workflowstub) and [child workflows](https://nodejs.temporal.io/api/classes/workflow.contextimpl#child).

Workflow interface declarations are optional but recommended. They're only required for generating type-safe clients.

`src/interfaces/workflows.ts`

<!--SNIPSTART nodejs-hello-workflow-interface {"enable_source_link": false}-->
<!--SNIPEND-->

### Workflow Implementation

A Workflow implementation may export a `workflow` object, which can be type-checked using a pre-defined interface or `main` (and optionally [signals](/docs/node/signals) and [queries](/docs/node/queries)) directly.

In a Workflow, Activities can be imported and called as regular functions. At runtime, the imported Activities (prefixed with `@activities`) are replaced with stubs that schedule Activities to be run.

`@activities` is a TypeScript [path alias](https://www.typescriptlang.org/tsconfig#paths) set to `src/activities`.

`src/workflows/example.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

## How to start a Workflow

[API reference](https://nodejs.temporal.io/api/modules/client)

The `WorkflowClient` class is used to instantiate clients that schedule Workflows and send other requests to the Temporal Service.
It can be used in any Node.js process (for example, an [Express](https://expressjs.com/) web server) and is separate from the Worker.

`src/worker/schedule-workflow.ts`

<!--SNIPSTART nodejs-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

Workflows can be started with a range of [`BaseWorkflowOptions`](https://nodejs.temporal.io/api/interfaces/client.baseworkflowoptions/) (all optional):

- `taskQueue: string` (most common): Task queue to use for workflow tasks. It should match a task queue specified when creating a Worker that hosts the workflow code.
- `workflowId: string`: Workflow id to use when starting. If not specified a UUID is generated.
- `workflowIdReusePolicy: WorkflowIdReusePolicy`: Specifies server behavior if a completed workflow with the same id exists. [More details](https://nodejs.temporal.io/api/interfaces/client.baseworkflowoptions/#workflowidreusepolicy)
- `cronSchedule: string`: see "Scheduling Cron Workflows"
- `memo: Record<string, any>`: Specifies additional non-indexed information in result of list workflow
- `retryPolicy: IRetryPolicy`: the overall [RetryPolicy](https://nodejs.temporal.io/api/interfaces/proto.temporal.api.common.v1.iretrypolicy/) at the Workflow level
- `searchAttributes: Record<string, string | number | boolean>`: Specifies additional indexed information in result of list workflow.

## How to cancel a Workflow

To cancel a Workflow execution, call the `cancel()` method on a WorkflowStub.

```tsx
// Create a typed client using the Example Workflow interface,
const example = client.stub<Example>("example", {taskQueue: "tutorial"});
const result = await example.execute("Temporal");
// ... later on, cancel the workflow
await example.cancel();
```

Temporal gives you fine grained control over what happens when you cancel a workflow. See our docs on [Cancellation Scopes](/docs/node/cancellation-scopes) for detailes and examples.

## Scheduling Cron Workflows

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://nodejs.temporal.io/api/interfaces/client.baseworkflowoptions/#cronschedule">

You can set each workflow to repeat on a schedule with the `cronSchedule` option:

```ts
const workflow = client.stub<WFInterface>("scheduled-workflow", {
  taskQueue: "test",
  cronSchedule: "* * * * *", // start every minute
});
```

</DistributedCron>

## Executing External Workflows (stub)

There is no official support for External Workflows in Node.js yet.

## Child Workflows (stub)

Besides Activities, a Workflow can also start other Workflows.
There is no official support for Child Workflows in Node.js yet.

import WhenToUse from '../content/when-to-use-child-workflows.md'

<WhenToUse
signalsLink="/docs/go/signals"
/>

## Large Event Histories

### Why `ContinueAsNew` is needed

import SharedContinueAsNew from '../shared/continue-as-new.md'

<SharedContinueAsNew />

### The `ContinueAsNew` API

Use the `Context.continueAsNew` API to instruct the Node SDK to restart `main` with a new starting value and a new event history.

```ts
import {Context, sleep} from "@temporalio/workflow";

async function main(iteration = 0): Promise<void> {
  if (iteration === 10) return;
  console.log("Running Workflow iteration:", iteration);
  await sleep(1000);
  await Context.continueAsNew<typeof main>(iteration + 1); // must match the arguments expected by `main`
  // Unreachable code, continueAsNew is like `process.exit` and will stop execution once called.
}
```

You can also call `continueAsNew` from a signal handler or `continueAsNew` to a different Workflow using [`makeContinueAsNewFunc`](https://nodejs.temporal.io/api/classes/workflow.contextimpl#makecontinueasnewfunc).

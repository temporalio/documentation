---
id: workflows
title: Workflows in Node.js
sidebar_label: Workflows
description: In the Temporal Node SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
image: /img/workflow.png
---

import RelatedReadList from '../components/RelatedReadList.js'

[API reference](https://nodejs.temporal.io/api/namespaces/workflow)

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

Use `Context.setupActivities` to create functions that schedule Activities in the system.

`src/workflows/example.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

## How to start a Workflow

[API reference](https://nodejs.temporal.io/api/namespaces/client)

The `WorkflowClient` class is used to instantiate clients that schedule Workflows and send other requests to the Temporal Service.
It can be used in any Node.js process (for example, an [Express](https://expressjs.com/) web server) and is separate from the Worker.

`src/worker/schedule-workflow.ts`

<!--SNIPSTART nodejs-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

Workflows can be started with a range of [`WorkflowOptions`](https://nodejs.temporal.io/api/interfaces/client.workflowoptions/), commons options listed here:

- `taskQueue` (required): Task queue to use for workflow tasks. It should match a task queue specified when creating a Worker that hosts the workflow code.
- `workflowId`: Workflow id to use when starting. If not specified a UUID is generated.
- `workflowIdReusePolicy`: Specifies server behavior if a completed workflow with the same id exists. [More details](https://nodejs.temporal.io/api/interfaces/client.workflowoptions/#workflowidreusepolicy)
- `cronSchedule`: see ["Scheduling Cron Workflows"](#scheduling-cron-workflows)
- `retryPolicy`: the overall [RetryPolicy](https://nodejs.temporal.io/api/interfaces/proto.temporal.api.common.v1.iretrypolicy/) at the Workflow level
- `searchAttributes`: Specifies additional indexed information in result of list workflow.

## How to cancel a Workflow

To cancel a Workflow execution, call the [`cancel()`](https://nodejs.temporal.io/api/interfaces/client.WorkflowStub#cancel) method on a WorkflowStub.

```ts
// Create a typed client using the Example Workflow interface,
const example = client.stub<Example>('example', { taskQueue: 'tutorial' });
await example.start('Temporal');
// ... Later on, cancel the workflow
await example.cancel();
// Optionally wait for the Workflow's result
// (should throw WorkflowExecutionCancelledError)
await example.result();
```

Temporal gives you fine grained control over what happens when you cancel a workflow. See our docs on [Cancellation Scopes](/docs/node/cancellation-scopes) for detailes and examples.

## Scheduling Cron Workflows

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://nodejs.temporal.io/api/interfaces/client.workflowoptions/#cronschedule" typeName="WorkflowOptions">

You can set each workflow to repeat on a schedule with the `cronSchedule` option:

```ts
const workflow = client.stub<WFInterface>('scheduled-workflow', {
  taskQueue: 'test',
  cronSchedule: '* * * * *', // start every minute
});
```

</DistributedCron>

## External Workflows

From Workflow code you may signal or cancel an external Workflow.

```ts
const workflow = Context.external<WFInterface>(workflowId, optionalRunId);
await workflow.signal.someSignal(arg1, arg2);
await workflow.cancel();
```

## Child Workflows

Besides Activities, a Workflow can also start other Workflows.

Execute a child workflow and await its completion:

```ts
const workflow = Context.child<WFInterface>(workflowId, optionalRunId);
await workflow.execute(arg1, arg2);
```

[`Context.child`](https://nodejs.temporal.io/api/classes/workflow.ContextImpl#child) returns a [`ChildWorkflowStub`](https://nodejs.temporal.io/api/interfaces/workflow.ChildWorkflowStub) that can be used to signal the created child.

Child Workflow executions are [`CancellationScope`](/docs/node/cancellation-scopes) aware and will automatically be cancelled when their containing scope is cancelled.

<RelatedReadList
readlist={[
["What is a Child Workflow Execution?","/docs/content/what-is-a-child-workflow-execution","explanation"],  
]}
/>

## Large Event Histories

### Why `ContinueAsNew` is needed

import SharedContinueAsNew from '../shared/continue-as-new.md'

<SharedContinueAsNew />

### The `ContinueAsNew` API

Use the `Context.continueAsNew` API to instruct the Node SDK to restart `main` with a new starting value and a new event history.

```ts
import { Context, sleep } from '@temporalio/workflow';

async function main(iteration = 0): Promise<void> {
  if (iteration === 10) {
    return;
  }
  console.log('Running Workflow iteration:', iteration);
  await sleep(1000);
  // must match the arguments expected by `main`
  await Context.continueAsNew<typeof main>(iteration + 1);
  // Unreachable code, continueAsNew is like `process.exit` and will stop execution once called.
}
```

You can also call `continueAsNew` from a signal handler or `continueAsNew` to a different Workflow using [`makeContinueAsNewFunc`](https://nodejs.temporal.io/api/classes/workflow.contextimpl#makecontinueasnewfunc).

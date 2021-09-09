---
id: workflows
title: Workflows in Node.js
sidebar_label: Workflows
description: In the Temporal Node SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
image: /img/workflow.png
---

import RelatedReadList from '../components/RelatedReadList.js'

[API reference](https://nodejs.temporal.io/api/namespaces/workflow)

In the Node.js SDK, each Workflow runs in a separate V8 isolate context to provide a [deterministic runtime](/docs/node/determinism).

## How to write Workflow code

### Workflow Implementation

Workflow are implemented using a factory function that returns a handlers object for `execute` and optionally [signals](signals) and [queries](queries).

The snippet below uses `configureActivities` to create functions that, when called, schedule Activities in the system.

`src/workflows/index.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

### Workflow Interface

#### Type definitions

Workflow type definitions are optional, they provide type safety in situations where the implementation cannot directly be referenced by a client such as cross service or cross language calls.

`src/interfaces.ts`

<!--SNIPSTART nodejs-hello-workflow-interface {"enable_source_link": false}-->
<!--SNIPEND-->

## How to start a Workflow

The [`WorkflowClient`](https://nodejs.temporal.io/api/classes/client.workflowclient) class is used to interact with Workflows.

It can be used in any Node.js process (for example, an [Express](https://expressjs.com/) web server) and is separate from the Worker.

`src/exec-workflow.ts`

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
// Create a typed client based on the example Workflow's type
const example = client.stub(example, { taskQueue: 'tutorial' });
// Start the Workflow without waiting its completion
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
const workflow = client.stub(scheduledWorkflow, {
  taskQueue: 'test',
  cronSchedule: '* * * * *', // start every minute
});
```

</DistributedCron>

## External Workflows

From Workflow code you may signal or cancel an external Workflow.

```ts
const workflow = externalWorkflow<WFInterface>(workflowId, optionalRunId);
await workflow.signal.someSignal(arg1, arg2);
await workflow.cancel();
```

[`externalWorkflow`](https://nodejs.temporal.io/api/api/namespaces/workflow#externalworkflow) returns an [`ExternalWorkflowStub`](https://nodejs.temporal.io/api/interfaces/workflow.ExternalWorkflowStub) that can be used to interact with existing Workflows.

## Child Workflows

Besides Activities, a Workflow can also start other Workflows.

Execute a child workflow and await its completion:

<!--SNIPSTART nodejs-child-workflow-->
<!--SNIPEND-->

[`childWorkflow`](https://nodejs.temporal.io/api/api/namespaces/workflow#childworkflow) returns a [`ChildWorkflowStub`](https://nodejs.temporal.io/api/interfaces/workflow.ChildWorkflowStub) that can be used to start a new child Workflow, signal it and await its completion.

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

Use the [`continueAsNew`](https://nodejs.temporal.io/api/namespaces/workflow#continueasnew) API to instruct the Node SDK to restart `main` with a new starting value and a new event history.

```ts
import { continueAsNew, sleep } from '@temporalio/workflow';

export async function loopingWorkflow(iteration = 0) {
  return {
    async execute() {
      if (iteration === 10) {
        return;
      }
      console.log('Running Workflow iteration:', iteration);
      await sleep(1000);
      // Must match the arguments expected by `loopingWorkflow`
      await continueAsNew<typeof loopingWorkflow>(iteration + 1);
      // Unreachable code, continueAsNew is like `process.exit` and will stop execution once called.
    },
  };
}
```

You can also call `continueAsNew` from a signal handler or `continueAsNew` to a different Workflow using [`makeContinueAsNewFunc`](https://nodejs.temporal.io/api/classes/workflow.contextimpl#makecontinueasnewfunc).

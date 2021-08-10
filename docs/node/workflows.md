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

A Workflow's interface is used for validating the implementation and generating a type safe [WorkflowClient](https://nodejs.temporal.io/api/interfaces/client.workflowclient) and `ChildWorkflow` (not yet implemented).

Workflow interfaces are directly referenced by their implementation and may be written in sync or async form meaning a method could return `number` or it could return `Promise<number>`.

Workflow interface declarations are optional but recommended. They're only required for generating type-safe clients.

`src/interfaces/workflows.ts`

<!--SNIPSTART nodejs-hello-workflow-interface {"enable_source_link": false}-->
<!--SNIPEND-->

### Workflow Implementation

A Workflow implementation may export a `workflow` object, which can be type-checked using a pre-defined interface or `main` (and optionally [signals](signals) and [queries](queries)) directly.

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

Workflows can be started with a range of `[BaseWorkflowOptions](https://nodejs.temporal.io/api/interfaces/client.baseworkflowoptions/)` (all optional):

- `taskQueue: string` (most common): Task queue to use for workflow tasks. It should match a task queue specified when creating a Worker that hosts the workflow code.
- `workflowId: string`: Workflow id to use when starting. If not specified a UUID is generated.
- `workflowIdReusePolicy: WorkflowIdReusePolicy`: Specifies server behavior if a completed workflow with the same id exists. [More details](https://nodejs.temporal.io/api/interfaces/client.baseworkflowoptions/#workflowidreusepolicy)
- `cronSchedule: string`: see "Scheduling Cron Workflows"
- `memo: Record<string, any>`: Specifies additional non-indexed information in result of list workflow
- `retryPolicy: IRetryPolicy`: the overall [RetryPolicy](https://nodejs.temporal.io/api/interfaces/proto.temporal.api.common.v1.iretrypolicy/) at the Workflow level
- `searchAttributes: Record<string, string | number | boolean>`: Specifies additional indexed information in result of list workflow.

## How to query Workflow State

If you `await` a workflow with `execute()`, you will get the result back after it completes.
There is no official support for querying the state of asynchronously started Workflows in Node.js yet.

## How Workflow operations are canceled

In the Node SDK, Workflows are represented internally by a tree of **Cancellation Scopes**, each with cancellation behaviors you can specify.
Everything runs in the "root" scope by default.

Scopes are created using the [`CancellationScope`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope) constructor, or one of 3 static helpers:

- [`cancellable(fn)`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope#cancellable-1): children are automatically cancelled when their containing scope is cancelled.
  - Equivalent to `new CancellationScope().run(fn)`.
- [`nonCancellable(fn)`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope#noncancellable): prevents cancellation from propagating to children.
  - Equivalent to `new CancellationScope({ cancellable: false }).run(fn)`.
- [`withTimeout(timeoutMs, fn)`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope#withtimeout): if timeout triggers before `fn` resolves the scope will be cancelled, triggering cancellation of enclosed operations, such as activities and timers.
  - Equivalent to `new CancellationScope({ cancellable: true, timeout: timeoutMs }).run(fn)`.

Cancellations are applied to _cancellation scopes_, which can encompass an entire workflow or just part of one. Scopes can be nested, and cancellation propagates from outer scopes to inner ones. A Workflow's `main` function runs in the outermost scope. Cancellations are handled by catching `CancelledError`s
thrown by _cancellable operations_ (see below).

`CancellationScope.run()` and the static helpers mentioned above all return native JS Promises, so you can use the familiar Promise APIs like `Promise.all` and `Promise.race` to model your async logic.
Other APIs you can use:

- `CancellationScope.current()`: get the current scope
- `scope.cancel()`: cancel all operations inside a `scope`
- `scope.run(fn)`: run an async function within a `scope`, returns the result of `fn`
- `scope.cancelRequested`: a promise that resolves when a scope cancellation is requested, e.g when Workflow code calls `cancel()` or the entire Workflow is cancelled by an external client.

When a `CancellationScope` is cancelled, it propagates cancellation in any child scopes and of any _cancellable operations_ created within it, such as:

- Activities
- Timers (created with the [`sleep`](https://nodejs.temporal.io/api/modules/workflow#sleep) function)
- [`Trigger`](https://nodejs.temporal.io/api/classes/workflow.trigger)s

### Internal cancellation example

<!--SNIPSTART nodejs-cancel-a-timer-from-workflow-->
<!--SNIPEND-->

Alternatively, the preceding can be written as:

<!--SNIPSTART nodejs-cancel-a-timer-from-workflow-alternative-impl-->
<!--SNIPEND-->

### External cancellation example

Handle Workflow cancellation by an external client while an Activity is running:

<!-- TODO: add a sample here of how this Workflow could be cancelled using a WorkflowStub -->

<!--SNIPSTART nodejs-handle-external-workflow-cancellation-while-activity-running-->
<!--SNIPEND-->

### `nonCancellable` example

`CancellationScope.nonCancellable` prevents cancellation from propagating to children:

<!--SNIPSTART nodejs-non-cancellable-shields-children-->
<!--SNIPEND-->

### `withTimeout` example

A very common operation is to cancel one or more activities if a deadline elapses, `withTimeout` creates a `CancellationScope` that is automatically cancelled after a given timeout.

<!--SNIPSTART nodejs-multiple-activities-single-timeout-workflow-->
<!--SNIPEND-->

### `scope.cancelRequested`

You can await `cancelRequested` to make Workflow aware of cancellation while waiting on `nonCancellable` scopes:

<!--SNIPSTART nodejs-cancel-requested-with-non-cancellable-->
<!--SNIPEND-->

### CancellationScopes and callbacks

Callbacks are not particularly useful in Workflows because all meaningful asynchronous operations return Promises.
In the rare case that user code utilizes callbacks and needs to handle cancellation, a callback can be used to consume the `CancellationScope.cancelRequested` `Promise`.

<!--SNIPSTART nodejs-cancellation-scopes-with-callbacks-->
<!--SNIPEND-->

### Nesting Cancellation Scopes

Complex flows may be achieved by nesting cancellation scopes:

<!--SNIPSTART nodejs-nested-cancellation-scopes-->
<!--SNIPEND-->

### Sharing promises between scopes

Operations like timers and Activities are cancelled by the cancellation scope they were created in. Promises returned by these operations can be awaited in different scopes.

<!--SNIPSTART nodejs-shared-promise-scopes-->
<!--SNIPEND-->

<!--SNIPSTART nodejs-shield-awaited-in-root-scope-->
<!--SNIPEND-->

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

You can also call `continueAsNew` from a signal and or `continueAsNew` to a different Workflow.

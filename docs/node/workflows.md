---
id: workflows
title: Workflows in Node.js
sidebar_label: Workflows
description: In the Temporal Node SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
image: /img/workflow.png
---

[API reference](https://nodejs.temporal.io/api/modules/workflow)

Workflows are the core of the Temporal system, they abstract away the complexities of writing distributed programs.

In the NodeJS SDK, each Workflow runs in a separate V8 isolate to provide a [deterministic runtime](/docs/node/determinism).

## How to write Workflow code

### Workflow Interface

A Workflow's interface is used for validating the implementation and generating a type safe [WorkflowClient](https://nodejs.temporal.io/api/interfaces/client.workflowclient) and `ChildWorkflow` (not yet implemented).

Workflow interfaces are directly referenced by their implementation and may be written in sync or async form meaning a method could return `number` or it could return `Promise<number>`.

Workflow interface declarations are optional, they're only required for generating type safe clients. It is considered good practice to declare an interface for each Workflow.

`src/interfaces/workflows.ts`

<!--SNIPSTART nodejs-hello-workflow-interface {"enable_source_link": false}-->
<!--SNIPEND-->

### Workflow Implementation

A Workflow implmentation module may export a `workflow` object which can be type checked using a pre-defined interface or `main` - and optionally `signals` and `queries` - directly.

In a Workflow, Activities can be imported and called as regular functions. At runtime, the imported Activities (prefixed with `@activities`) are replaced with stubs which schedule Activities in the system.

`@activities` is a [typescript path alias](https://www.typescriptlang.org/tsconfig#paths) set to `src/activities`.

`src/workflows/example.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

## How to start a Workflow

[API reference](https://nodejs.temporal.io/api/modules/client)

The `WorkflowClient` class is used to instantiate clients that schedule Workflows and send other requests to the Temporal Service.
It can be used in any NodeJS process e.g an express app and does not depend on the Worker.

`src/worker/schedule-workflow.ts`

<!--SNIPSTART nodejs-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

## How to query Workflow State

If you `await` a workflow with `execute()`, you will get the result back after it completes.
There is no official support for querying the state of asynchronously started Workflows in Node.js yet.

## How to get data in or out of a running Workflow

[Signals](/docs/go/signals) are the mechanism by which you can get data into an already running Workflow. There is no official support for Signals in Node.js yet.

[Queries](/docs/go/queries) are the mechanism by which you can get data out of a currently running Workflow.There is no official support for Queries in Node.js yet.

## How to cancel a Workflow Execution

In the Node SDK, Workflows are represented internally by a tree of scopes. The main function runs in the root scope.
Cancellation propagates from outer scopes to inner ones and is handled by catching `CancelledError`s
thrown by cancellable operations (see below).

Scopes are created using the [`CancellationScope`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope) constructor or the static helper methods
[`cancellable`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope#cancellable-1),
[`nonCancellable`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope#noncancellable),
and [`withTimeout`](https://nodejs.temporal.io/api/classes/workflow.cancellationscope#withtimeout).

When a `CancellationScope` is cancelled, it propagates cancellation in any child scopes and of any cancellable operations created within it, such as:

- Activities
- Timers (created with the [`sleep`](https://nodejs.temporal.io/api/modules/workflow#sleep) function)
- [`Trigger`](https://nodejs.temporal.io/api/classes/workflow.trigger)s

## Examples

### Cancel a timer from Workflow code

<!--SNIPSTART nodejs-cancel-a-timer-from-workflow-->
<!--SNIPEND-->

### Alternatively, the preceding can be written as

<!--SNIPSTART nodejs-cancel-a-timer-from-workflow-alternative-impl-->
<!--SNIPEND-->

### Run multiple activities with a single deadline

<!--SNIPSTART nodejs-multiple-activities-single-timeout-workflow-->
<!--SNIPEND-->

### `nonCancellable` prevents cancellation from propagating to children

<!--SNIPSTART nodejs-non-cancellable-shields-children-->
<!--SNIPEND-->

### `cancelRequested` may be awaited upon to make Workflow aware of cancellation while waiting on `nonCancellable` scopes

<!--SNIPSTART nodejs-cancel-requested-with-non-cancellable-->
<!--SNIPEND-->

### Handle Workflow cancellation by an external client while an Activity is running

<!--SNIPSTART nodejs-handle-external-workflow-cancellation-while-activity-running-->
<!--SNIPEND-->

### Complex flows may be achieved by nesting cancellation scopes

<!--SNIPSTART nodejs-nested-cancellation-scopes-->
<!--SNIPEND-->

### Sharing promises between scopes

Operations like timers and Activites are cancelled by the cancellation scope they were created in. Promises returned by these operations can be awaited in different scopes.

<!--SNIPSTART nodejs-shared-promise-scopes-->
<!--SNIPEND-->

<!--SNIPSTART nodejs-shield-awaited-in-root-scope-->
<!--SNIPEND-->

### Callbacks and cancellation scopes

Callbacks are not particularly useful in Workflows because all meaningful asynchronous operations return Promises.

In the odd case that user code utilizes callbacks, CancellationScope.cancelRequested can be used to subscribe to cancellation.

<!--SNIPSTART nodejs-cancellation-scopes-with-callbacks-->
<!--SNIPEND-->

## Scheduling Cron Workflows

There is no official support for Cron Workflows in Node.js yet.

## Executing External Workflows

There is no official support for External Workflows in Node.js yet.

## Child Workflows

Besides Activities, a Workflow can also start other Workflows.

import WhenToUse from '../content/when-to-use-child-workflows.md'

<WhenToUse
signalsLink="/docs/go/signals"
/>

## Large Event Histories

import SharedContinueAsNew from '../shared/continue-as-new.md'

<SharedContinueAsNew />

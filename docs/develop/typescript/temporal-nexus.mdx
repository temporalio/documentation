---
id: nexus
title: Temporal Nexus - TypeScript SDK feature guide
sidebar_label: Temporal Nexus
description: Use Temporal Nexus within the TypeScript SDK to connect Durable Executions within and across Namespaces using a Nexus Endpoint, a Nexus Service contract, and Nexus Operations.
toc_max_heading_level: 4
keywords:
  - temporal
  - nexus
  - typescript
  - sdk
tags:
  - Nexus
  - TypeScript SDK
---

import { CaptionedImage } from "@site/src/components";

:::tip SUPPORT, STABILITY, and DEPENDENCY INFO

Temporal TypeScript SDK support for Nexus is at [Pre-release](/evaluate/development-production-features/release-stages#pre-release).

All APIs are experimental and may be subject to backwards-incompatible changes.

:::

Use [Temporal Nexus](/evaluate/nexus) to connect Temporal Applications within and across Namespaces using a Nexus Endpoint, a Nexus Service contract, and Nexus Operations.

This page shows how to do the following:

- [Run a development Temporal Service with Nexus enabled](#run-the-temporal-nexus-development-server)
- [Create caller and handler Namespaces](#create-caller-handler-namespaces)
- [Create a Nexus Endpoint to route requests from caller to handler](#create-nexus-endpoint)
- [Define the Nexus Service contract](#define-nexus-service-contract)
- [Develop a Nexus Service and Operation handlers](#develop-nexus-service-operation-handlers)
- [Develop a caller Workflow that uses a Nexus Service](#develop-caller-workflow-nexus-service)
- [Understand exceptions in Nexus Operations](#exceptions-in-nexus-operations)
- [Cancel a Nexus Operation](#canceling-a-nexus-operation)
- [Make Nexus calls across Namespaces in Temporal Cloud](#nexus-calls-across-namespaces-temporal-cloud)

<br />

:::note

This documentation uses source code derived from the [TypeScript Nexus sample](https://github.com/temporalio/samples-typescript/tree/main/nexus-hello).

:::

## Run the Temporal Development Server with Nexus enabled {#run-the-temporal-nexus-development-server}

Prerequisites:

- [Install the latest Temporal CLI](https://learn.temporal.io/getting_started/typescript/dev_environment/#set-up-a-local-temporal-service-for-development-with-temporal-cli) (`v1.3.0` or higher recommended)
- [Install the latest Temporal TypeScript SDK](https://learn.temporal.io/getting_started/typescript/dev_environment/#add-temporal-typescript-sdk-dependencies) (`v1.12.3` or higher)

The first step in working with Temporal Nexus involves starting a Temporal Server with Nexus enabled.

```
temporal server start-dev
```

This command automatically starts the Temporal development server with the Web UI, and creates the `default` Namespace. It uses an in-memory database, so do not use it for real use cases.

The Temporal Web UI should now be accessible at [http://localhost:8233](http://localhost:8233), and the Temporal Server should now be available for client connections on `localhost:7233`.

## Create caller and handler Namespaces {#create-caller-handler-namespaces}

Before setting up Nexus endpoints, create separate Namespaces for the caller and handler.

```
temporal operator namespace create --namespace my-target-namespace
temporal operator namespace create --namespace my-caller-namespace
```

For this example, `my-target-namespace` will contain the Nexus Operation handler, and you will use a Workflow in `my-caller-namespace` to call that Operation handler.
We use different namespaces to demonstrate cross-Namespace Nexus calls.

## Create a Nexus Endpoint to route requests from caller to handler {#create-nexus-endpoint}

After establishing caller and handler Namespaces, the next step is to create a Nexus Endpoint to route requests.

```
temporal operator nexus endpoint create \
  --name my-nexus-endpoint-name \
  --target-namespace my-target-namespace \
  --target-task-queue my-handler-task-queue
```

You can also use the Web UI to create the Namespaces and Nexus endpoint.

## Define the Nexus Service contract {#define-nexus-service-contract}

Defining a clear contract for the Nexus Service is crucial for smooth communication.

In this example, there is a service package that describes the Service and Operation names along with input/output types for caller Workflows to use the Nexus Endpoint.

Each [Temporal SDK includes and uses a default Data Converter](https://docs.temporal.io/dataconversion).
The default data converter encodes payloads in the following order: Null, Byte array, and JSON.
In a polyglot environment, that is where more than one language and SDK is being used to develop a Temporal solution, JSON is a common choice.
This example uses plain TypeScript objects, serialized into JSON.

Note: By default, the TypeScript SDK [does not support Protobuf JSON encoding](https://typescript.temporal.io/api/interfaces/common.PayloadConverter). If passing Protobuf payloads use the [ProtobufJsonPayloadConverter](https://typescript.temporal.io/api/classes/protobufs.ProtobufJsonPayloadConverter) instead.

<!--SNIPSTART typescript-nexus-hello-service-->
[nexus-hello/src/api.ts](https://github.com/temporalio/samples-typescript/blob/main/nexus-hello/src/api.ts)
```ts
import * as nexus from 'nexus-rpc';

export const helloService = nexus.service('hello', {
  /**
   * Return the input message, unmodified. In the present sample, this Operation
   * will be implemented using the Synchronous Nexus Operation handler syntax.
   */
  echo: nexus.operation<EchoInput, EchoOutput>(),

  /**
   * Return a salutation message, in the requested language. In the present sample,
   * this Operation will be implemented by starting the `helloWorkflow` Workflow.
   */
  hello: nexus.operation<HelloInput, HelloOutput>(),
});

export interface EchoInput {
  message: string;
}

export interface EchoOutput {
  message: string;
}

export interface HelloInput {
  name: string;
  language: LanguageCode;
}

export interface HelloOutput {
  message: string;
}

export type LanguageCode = 'en' | 'fr' | 'de' | 'es' | 'tr';
```
<!--SNIPEND-->

## Develop a Nexus Service handler and Operation handlers {#develop-nexus-service-operation-handlers}

A Nexus Service handler is defined using the `nexus-rpc`'s [`serviceHandler`](https://nexus-rpc.github.io/sdk-typescript/functions/serviceHandler.html) function. {/* Added */}
Nexus Service handlers are typically defined in the same Worker as the underlying Temporal primitives they abstract.
A Service handler must provide Operation handlers for each Operation declared by the Service. {/* Added */}
Operation handlers can decide if a given Nexus Operation will be synchronous or asynchronous.
They can execute arbitrary code, and invoke underlying Temporal primitives such as a Workflow, Query, Signal, or Update.

The `@temporalio/nexus` package provides utilities to help create Nexus Operations that interracts with a Temporal namespace: {/* Extended */}

- `WorkflowRunOperationHandler` - Create an asynchronous operation handler that starts a Workflow.
- `getClient()` - Get a Temporal Client connected using the same `NativeConnection` as the present Temporal Worker.
  It can be used to implement synchronous handlers backed by Temporal primitives such as Signals and Queries.

### Develop a Synchronous Nexus Operation handler

Simple RPC handlers can be implemented as synchronous Nexus Operation handlers, which is defined in TypeScript as a simple async function. {/* sync operation vs async func is very confusing in this context */}
The handler function can obtain a Temporal Client, using `getClient()`, which can be used for signaling, querying, and listing Workflows.
However, implementations are free to make arbitrary calls to other services or databases, or perform computations such as this one:

<!--SNIPSTART typescript-nexus-hello-service-handler {"selectedLines": ["2","4","6-17","37"]}-->
[nexus-hello/src/service/handler.ts](https://github.com/temporalio/samples-typescript/blob/main/nexus-hello/src/service/handler.ts)
```ts
// ...
import * as nexus from 'nexus-rpc';
// ...
import { helloService, EchoInput, EchoOutput, HelloInput, HelloOutput } from '../api';
// ...

export const helloServiceHandler = nexus.serviceHandler(helloService, {
  echo: async (ctx, input: EchoInput): Promise<EchoOutput> => {
    // A simple async function can be used to defined a Synchronous Nexus Operation.
    // This is often sufficient for Operations that simply make arbitrary short calls to
    // other services or databases, or that perform simple computations such as this one.
    //
    // You may also access a Temporal Client by calling `temporalNexus.getClient()`.
    // That Client can be used to make arbitrary calls, such as signaling, querying,
    // or listing workflows.
    return input;
  },
// ...
});
```
<!--SNIPEND-->

### Develop an Asynchronous Nexus Operation handler to start a Workflow

Use `@temporalio/nexus`'s `WorkflowRunOperationHandler` helper class to easily expose a Temporal Workflow as a Nexus Operation.
Note that even though a Nexus operation can only take one input parameter, if you need to pass
multiple arguments through to the workflow, you can do so by using multiple properties of the input object, and placing them in
the array provided to the `args` option when calling `startWorkflow`.

<!--SNIPSTART typescript-nexus-hello-service-handler {"selectedLines": ["1-7","18-37"]}-->
[nexus-hello/src/service/handler.ts](https://github.com/temporalio/samples-typescript/blob/main/nexus-hello/src/service/handler.ts)
```ts
import { randomUUID } from 'crypto';
import * as nexus from 'nexus-rpc';
import * as temporalNexus from '@temporalio/nexus';
import { helloService, EchoInput, EchoOutput, HelloInput, HelloOutput } from '../api';
import { helloWorkflow } from './workflows';

export const helloServiceHandler = nexus.serviceHandler(helloService, {
// ...
  hello: new temporalNexus.WorkflowRunOperationHandler<HelloInput, HelloOutput>(
    // WorkflowRunOperationHandler takes a function that receives the Operation's context and input.
    // That function can be used to validate and/or transform the input before passing it to
    // the Workflow, as well as to customize various Workflow start options as appropriate.
    // Call temporalNexus.startWorkflow() to actually start the Workflow from inside the
    // WorkflowRunOperationHandler's delegate function.
    async (ctx, input: HelloInput) => {
      return await temporalNexus.startWorkflow(ctx, helloWorkflow, {
        args: [input],

        // Workflow IDs should typically be business-meaningful IDs and are used to dedupe workflow starts.
        // For this example, we're using the request ID allocated by Temporal when the caller workflow schedules
        // the operation, this ID is guaranteed to be stable across retries of this operation.
        workflowId: ctx.requestId ?? randomUUID(),

        // Task queue defaults to the task queue this Operation is handled on.
      });
    },
  ),
});
```
<!--SNIPEND-->

Workflow IDs should typically be business-meaningful IDs and are used to dedupe Workflow starts.
In general, the ID should be passed in the Operation input as part of the Nexus Service contract.

:::tip RESOURCES

[Attach multiple Nexus callers to a handler Workflow](/nexus/operations#attaching-multiple-nexus-callers) with a Conflict-Policy of Use-Existing.

:::

### Register your Nexus Service handler in a Worker

After developing an asynchronous Nexus Operation handler to start a Workflow, the next step is to register your Nexus Service handler in a Worker.

<!--SNIPSTART typescript-nexus-hello-service-worker {"selectedLines": ["1-3","9-17"]}-->
[nexus-hello/src/service/worker.ts](https://github.com/temporalio/samples-typescript/blob/main/nexus-hello/src/service/worker.ts)
```ts
import { Worker, NativeConnection } from '@temporalio/worker';
import { helloServiceHandler } from './handler';

// ...
    const namespace = 'my-target-namespace';
    const serviceTaskQueue = 'my-handler-task-queue';
    const worker = await Worker.create({
      connection,
      namespace,
      taskQueue: serviceTaskQueue,
      workflowsPath: require.resolve('./workflows'),
      nexusServices: [helloServiceHandler],
    });
```
<!--SNIPEND-->

## Develop a caller Workflow that uses the Nexus Service {#develop-caller-workflow-nexus-service}

To execute a Nexus Operation from a Workflow, import the necessary service definition types, then use `@temporalio/workflow`'s `createNexusClient` to create a Nexus client for that service.
You will need to provide the Nexus Endpoint name, which you registered previously in [Create a Nexus Endpoint to route requests from caller to handler](#create-nexus-endpoint).

<!--SNIPSTART typescript-nexus-hello-service-caller-workflow {"selectedLines": ["1-5","21-34"]}-->

[nexus-hello/src/caller/workflows.ts](https://github.com/temporalio/samples-typescript/blob/main/nexus-hello/src/caller/workflows.ts)

```ts
import * as wf from "@temporalio/workflow";
import { helloService, LanguageCode } from "../service/api";

const HELLO_SERVICE_ENDPOINT = "hello-service-endpoint-name";

export async function helloCallerWorkflow(name: string, language: LanguageCode): Promise<string> {
  const nexusClient = wf.createNexusClient({
    service: helloService,
    endpoint: HELLO_SERVICE_ENDPOINT,
  });

  const helloResult = await nexusClient.executeOperation(
    "hello",
    { name, language },
    { scheduleToCloseTimeout: "10s" }
  );

  return helloResult.message;
}
```

<!--SNIPEND-->

### Register the caller Workflow in a Worker and start the caller Workflow

This Workflow can be registered with a Worker and started using `client.startWorkflow()` or `client.executeWorkflow()`, as usual.
Refer to the [complete TypeScript sample](https://github.com/temporalio/samples-typescript/blob/main/nexus-hello) for reference.

- [nexus-hello/src/caller/worker.ts](https://github.com/temporalio/samples-typescript/blob/main/nexus-hello/src/caller/worker.ts) shows how to register the caller Workflow in a Worker and run the Worker.
- [nexus-hello/src/starter.ts](https://github.com/temporalio/samples-typescript/blob/main/nexus-hello/src/starter.ts) shows how to use a Temporal Client to execute the sample caller Workflow.

## Exceptions in Nexus operations {#exceptions-in-nexus-operations}

Temporal provides general guidance on [Errors in Nexus operations](https://docs.temporal.io/references/failures#errors-in-nexus-operations).
In TypeScript, there are three Nexus-specific exception classes:

- `nexus-rpc`'s [`OperationError`](https://nexus-rpc.github.io/sdk-typescript/classes/OperationError.html): this is the exception type you should throw in a Nexus operation to indicate that it has failed according to its own application logic and should not be retried.
- `nexus-rpc`'s [`HandlerError`](https://nexus-rpc.github.io/sdk-typescript/classes/HandlerError.html): you can throw this exception type in a Nexus operation with a specific [HandlerErrorType](https://nexus-rpc.github.io/sdk-typescript/types/HandlerErrorType.html). The error will be marked as either retryable or non-retryable according to the type, following the [Nexus spec](https://github.com/nexus-rpc/api/blob/main/SPEC.md#predefined-handler-errors). The non-retryable handler error types are `BAD_REQUEST`, `UNAUTHENTICATED`, `UNAUTHORIZED`, `NOT_FOUND`, `NOT_IMPLEMENTED`; the retryable types are `RESOURCE_EXHAUSTED`, `INTERNAL`, `UNAVAILABLE`, `UPSTREAM_TIMEOUT`.
- `@temporalio/nexus`'s [`NexusOperationFailure`](https://typescript.temporal.io/api/classes/common.NexusOperationFailure): this is the error thrown inside a Workflow when a Nexus operation fails for any reason. Use the `cause` attribute on the exception to access the cause chain.

## Canceling a Nexus Operation {#canceling-a-nexus-operation}

Nexus Operations, just like other cancellable APIs provided by the `@temporalio/workflow` package, execute within Cancellation Scopes.
Requesting cancellation of a Cancellation Scope results in requesting cancellation for all cancellable operations owned by that scope.
The Workflow itself defines the root Cancellation Scope.
Requesting cancellation of the Workflow therefore propagates the cancellation request to all cancellable operations started by that workflow, including Nexus Operations.

To provide more granular control over cancellation of a specific Nexus Operation, you may explicitly create a new Cancellation Scope, and start the Nexus Operation from within that scope.
An example demonstrating this can be found at our [nexus cancellation sample](https://github.com/temporalio/samples-typescript/tree/main/nexus-cancellation).

Only asynchronous operations can be canceled in Nexus, since cancellation is sent using an operation token.
The Workflow or other resources backing the operation may choose to ignore the cancellation request.

Once the caller Workflow completes, the caller's Nexus Machinery will not make any further attempts to cancel operations that are still running.
It's okay to leave operations running in some use cases.
To ensure cancellations are delivered, wait for all pending operations to finish before exiting the Workflow.

## Make Nexus calls across Namespaces in Temporal Cloud {#nexus-calls-across-namespaces-temporal-cloud}

This section assumes you are already familiar with how to connect a Worker to Temporal Cloud.
The `tcld` CLI is used to create Namespaces and the Nexus Endpoint, and mTLS client certificates will be used to securely connect the caller and handler Workers to their respective Temporal Cloud Namespaces.

### Install the latest `tcld` CLI and generate certificates

To install the latest version of the `tcld` CLI, run the following command (on macOS):

```
brew install temporalio/brew/tcld
```

If you don't already have certificates, you can generate them for mTLS Worker authentication using the command below:

```
tcld gen ca --org $YOUR_ORG_NAME --validity-period 1y --ca-cert ca.pem --ca-key ca.key
```

These certificates will be valid for one year.

### Create caller and handler Namespaces

Before deploying to Temporal Cloud, ensure that the appropriate Namespaces are created for both the caller and handler.
If you already have these Namespaces, you don't need to do this.

```
tcld login

tcld namespace create \
	--namespace <your-caller-namespace> \
	--cloud-provider aws \
	--region us-west-2 \
	--ca-certificate-file 'path/to/your/ca.pem' \
	--retention-days 1

tcld namespace create \
	--namespace <your-target-namespace> \
	--cloud-provider aws \
	--region us-west-2 \
	--ca-certificate-file 'path/to/your/ca.pem' \
	--retention-days 1
```

Alternatively, you can create Namespaces through the UI: [https://cloud.temporal.io/namespaces](https://cloud.temporal.io/namespaces).

### Create a Nexus Endpoint to route requests from caller to handler

To create a Nexus Endpoint you must have a Developer account role or higher, and have NamespaceAdmin permission on the `--target-namespace`.

```
tcld nexus endpoint create \
  --name <my-nexus-endpoint-name> \
  --target-task-queue my-handler-task-queue \
  --target-namespace <my-target-namespace.account> \
  --allow-namespace <my-caller-namespace.account> \
  --description-file description.md
```

The `--allow-namespace` is used to build an Endpoint allowlist of caller Namespaces that can use the Nexus Endpoint, as described in Runtime Access Control.

Alternatively, you can create a Nexus Endpoint through the UI: [https://cloud.temporal.io/nexus](https://cloud.temporal.io/nexus).

## Observability

### Web UI

A synchronous Nexus Operation will surface in the caller Workflow as follows, with just `NexusOperationScheduled` and `NexusOperationCompleted` events in the caller's Workflow history:

<CaptionedImage src="/img/cloud/nexus/go-sdk-observability-sync.png" title="Observability Sync" />

An asynchronous Nexus Operation will surface in the caller Workflow as follows, with `NexusOperationScheduled`, `NexusOperationStarted`, and `NexusOperationCompleted`, in the caller's Workflow history:

<CaptionedImage src="/img/cloud/nexus/go-sdk-observability-async.png" title="Observability Async" />

### Temporal CLI

Use the `workflow describe` command to show pending Nexus Operations in the caller Workflow and any attached callbacks on the handler Workflow:

```
temporal workflow describe -w <ID>
```

Nexus events are included in the caller's Workflow history:

```
temporal workflow show -w <ID>
```

For **asynchronous Nexus Operations** the following are reported in the caller's history:

- `NexusOperationScheduled`
- `NexusOperationStarted`
- `NexusOperationCompleted`

For **synchronous Nexus Operations** the following are reported in the caller's history:

- `NexusOperationScheduled`
- `NexusOperationCompleted`

:::note

`NexusOperationStarted` isn't reported in the caller's history for synchronous operations.

:::

## Learn more

- Read the high-level description of the [Temporal Nexus feature](/evaluate/nexus) and watch the [Nexus keynote and demo](https://youtu.be/qqc2vsv1mrU?feature=shared&t=2082).
- Learn how Nexus works in the [Nexus deep dive talk](https://www.youtube.com/watch?v=izR9dQ_eIe4) and [Encyclopedia](/nexus).
- Deploy Nexus Endpoints in production with [Temporal Cloud](/cloud/nexus).

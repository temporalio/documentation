---
id: compare-sdks
title: Overview of Temporal SDK features
description: Review the features available in each SDK.
sidebar_label: SDK features
tags:
  - temporal sdks
---

This page provides a high-level overview of the features that are available in each SDK.

:::competency Recommend a Temporal SDK

The information on this page aids in promoting a developer's ability to recommend a Temporal SDK based on your project's needs.

:::

One of the goals of the Temporal Platform is to offer a unified development experience across the Temporal SDKs.
In other words, when developing with the Go SDK, for example, a developer should feel the sense that they're working within the same general development paradigm as when they're working with the TypeScript SDK.
However, due to the nature of each language, and how they're implemented, each SDK is slightly unique.

Additionally, it's not always the case that a feature and its accessory capability releases across all the SDKs at the same time.
For example, a feature or an API is released in one SDK, but through developer feedback, it is unnecessary to include in other SDKs.

The following table lists features of the Temporal SDKs.
This list is meant to provide context and clarification around the SDK feature sets.
We encourage you to reach out in Slack or our Community forum if further clarification is needed.

### Core development

All SDKs support the fundamental ability to define functions as either Workflows or Activities.

<!-- [Yes](/dev-guide/go/foundations#develop-workflows) -->

| Feature                                                 | Go  | Java | TypeScript | Python | .Net | PHP |
| ------------------------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Workflow Definitions](/workflows#workflow-definition)  | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Activity Definitions](/activities#activity-definition) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

A Workflow Definition is essentially Workflow code, which orchestrates the execution of Activities, persisting the results.
[Learn more](/workflows#workflow-definition) in the concepts.

An Activity Definition is a normal function or method that defines a single, well-defined action (either short or long running), such as calling another service, transcoding a media file, or sending an email message.
For more information, see [Activity Definition](/activities#activity-definition) in the concept page.

## Auth (SSL/mTLS)

| Feature                         | Go  | Java | TypeScript | Python | .Net | PHP |
| ------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Auth (SSL/mTLS)](#auth-ssltls) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

Temporal SDKs support authenticating and authorizing client API calls to the Temporal server using SSL and mTLS.
SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) allow encrypted communication between the SDK client and the Temporal server over a network.
mTLS (mutual TLS) is a variant where both client and server authenticate each other by verifying the provided certificates.
This ensures secure identification and access control for API calls made from the SDK clients.
Configuring SSL or mTLS authentication provides network encryption and protects against man-in-the-middle attacks when communicating with the Temporal server.

## Built-in handler list Query

| Feature                                                     | Go | Java | TypeScript | Python | .Net | PHP |
| ----------------------------------------------------------- | -- | ---- | ---------- | ------ | ---- | --- |
| [Built-in handler list query](#built-in-handler-list-query) | No | No   | No         | No     | No   | No  |

The built-in handler list Query in Temporal allows retrieving the list of registered Signal and Query handlers for a Workflow.

When this Query is sent to a Workflow, the response contains a JSON serialized list of the following information about each handler:

- Handler type: either Signal or Query
- Handler name
- Workflow function that handles the Signal or Query

This can be useful for debugging or introspecting which Signal or Query a Workflow currently supports.

## Built-in Temporal CLI dev server runner

| Feature                                                                             | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------------------------------------------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Built-in Temporal CLI dev server runner](#built-in-temporal-cli-dev-server-runner) | Yes | No   | Yes        | Yes    | Yes  | No  |

This allows starting the CLI dev server from code rather than manually from the terminal.
It handles starting and stopping the server automatically around your Workflows.

## Bulk replayer

| Feature                         | Go  | Java | TypeScript | Python | .Net | PHP |
| ------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Bulk replayer](#bulk-replayer) | Yes | Yes  | Yes        | Yes    | Yes  | No  |

The bulk replayer enables efficient parallel replay of many Workflow histories from a JSON file or an array of Workflow history event objects for testing and debugging Workflows in Temporal.

## Cancellation

| Feature                       | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Cancellation](#cancellation) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

Cancellation in Temporal SDKs refers to the ability to stop the execution of a Workflow, Activity, or other operation before it completes normally.

Each SDK provides APIs and abstractions to enable robust cancellation handling in Workflows and Activities.

## Child Workflows

All SDKs support the ability to spawn Child Workflows.

| Feature                                 | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Child Workflow APIs](#child-workflows) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow.

Child Workflows in Temporal SDKs refer to Workflows that are started from within another Workflow.

Each SDK provides APIs and abstractions to handle the complexity behind the scenes.

## Continue-As-New

| Feature                             | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Continue as New](#continue-as-new) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

Continue-As-New is the mechanism by which all relevant state is passed to a new Workflow Execution with a fresh Event History.

## Delay Start Workflow

| Feature                                        | Go  | Java | TypeScript | Python | .Net | PHP |
| ---------------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Delay Start Workflow](#delay-start-workflow)) | Yes | Yes  | No         | No     | No   | No  |

<!-- Track feature: https://github.com/temporalio/features/issues/338 -->

A Delay Start Workflow is a Workflow that waits a specified duration before spawn the first Workflow.
If the Workflow receives a Signal before the delay, the Workflow will be started immediately and the rest of the delay is ignored.

A Start with Signal won't trigger the Workflow to start immediately and follow the delay.

## Dynamic Entities

Temporal supports Dynamic Workflows, Activities, Signals, and Queries.

These are unnamed entities that are invoked if no other statically defined entity with the given name exists.

| Feature                                   | Go | Java | TypeScript | Python | .Net | PHP |
| ----------------------------------------- | -- | ---- | ---------- | ------ | ---- | --- |
| [Dynamic Activities](#dynamic-activities) | No | Yes  | No         | Yes    | Yes  | No  |
| [Dynamic Queries](#dynamic-queries)       | No | Yes  | No         | Yes    | Yes  | No  |
| [Dynamic Signals](#dynamic-signals)       | No | Yes  | Yes        | Yes    | Yes  | No  |
| [Dynamic Workflows](#dynamic-workflows)   | No | Yes  | Yes        | Yes    | Yes  | No  |

Dynamic Entities should be used judiciously as a fallback mechanism rather than the primary approach.
Overusing them can lead to maintainability and debugging issues down the line.

## Enhanced stack trace

| Feature                                       | Go | Java | TypeScript | Python | .Net | PHP |
| --------------------------------------------- | -- | ---- | ---------- | ------ | ---- | --- |
| [Enhanced stack trace](#enhanced-stack-trace) | No | No   | Yes        | No     | No   | No  |

Enhanced stack trace in Temporal is a feature that allows you to capture and view detailed information about the execution of a Workflow.
It provides a stack trace of all the threads owned by the Workflow Execution, which can be useful for troubleshooting issues in production.
The `__stack_trace` query is a predefined query available in many SDKs that returns the stack trace.
You can use the `tctl Workflow stack` command to query the stack trace of a Workflow Execution.
This feature is especially helpful for identifying errors and blocks in a Workflow Definition.

## gRPC interceptors

| Feature                                 | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [gRPC interceptors](#grpc-interceptors) | Yes | Yes  | Yes        | No     | No   | No  |

gRPC interceptors serve as a powerful tool provided by gRPC, enabling developers to intercept and modify both incoming RPC requests and outgoing RPC responses.
This mechanism can be instrumental in scenarios such as dynamic adjustments to target hosts or tweaking parameters like TLS configurations.
However, for those utilizing the Temporal SDKs powered by the Rust core, which includes the TypeScript, Python, and .Net SDKs.

Currently, features like gRPC interceptors aren't implemented directly in the Rust core.
This limitation extends to other scenarios like the rotation of client TLS certificates.
Although technically feasible, the current workaround involves recreating the client to reflect changes.

## Health service

| Feature                           | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Health service](#health-service) | Yes | Yes  | Yes        | Yes    | Yes  | No  |

A health service in the context of Temporal is a component responsible for checking the health of the Frontend Service.
It ensures the proper functioning of the Cluster by returning a list of cluster metrics.
The health checks for the Temporal Cluster can be set up using TCP or gRPC on port 7233.
The Matching Service is responsible for hosting user-facing Task Queues, while the History Service persists Workflow Execution state.
The Worker service performs background processing for replication queue and system Workflows [2].

## Heartbeats

| Feature                   | Go  | Java | TypeScript | Python | .Net | PHP |
| ------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Heartbeats](#heartbeats) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

A Heartbeat is a mechanism used in the Temporal Platform to ensure the progress and timely execution of Activities.
It involves periodic pings from the Activity Worker to the Temporal Cluster.
The Heartbeat Timeout specifies the maximum time between Activity Heartbeats.
Heartbeats can be used to store progress information or any other serializable object.
By Heartbeating within a specified interval lower than the Heartbeat Timeout, Activities can execute for a long time and fail fast.
Heartbeats help prevent Activity Timeouts and enable efficient retries.

## Interceptors

| Feature                       | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Interceptors](#interceptors) | Yes | Yes  | Yes        | Yes    | Yes  | No  |

Interceptors are a mechanism for modifying inbound and outbound SDK calls.
Interceptors are commonly used to add tracing and authorization to the scheduling and execution of Workflows and Activities.
You can compare these to "middleware" in other frameworks.

The TypeScript SDK comes with an optional interceptor package that adds tracing with [OpenTelemetry](https://www.npmjs.com/package/@temporalio/interceptors-opentelemetry).
See how to use it in the [interceptors-opentelemetry](https://github.com/temporalio/samples-typescript/tree/main/interceptors-opentelemetry) code sample.

The [Go SDK](https://github.com/temporalio/sdk-go) provides support for distributed tracing with **_Interceptors_**.
Interceptors uses Temporal headers to create a call graph of a [Workflow](/workflows#), along with its [Activities](/activities#) and [Child Workflows](/workflows#child-workflow).

There are several tracing implementations supported by the Temporal Go SDK.
For an [OpenTracing](https://pkg.go.dev/go.temporal.io/sdk/contrib/opentracing) Interceptor, use `opentracing.NewInterceptor(opentracing.TracerOptions{})` to create a `TracingInterceptor`.

## Message passing

All SDKs support the ability to send Signal and Query Workflows.

| Feature                     | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Signals](#signals)         | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Queries](#queries)         | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Updates](#workflow-update) | Yes | Yes  | No         | No     | No   | No  |

### Signals

A Signal is an asynchronous request to a [Workflow Execution](/workflows#workflow-execution).

### Queries

A Query is a synchronous operation that is used to get the state of a [Workflow Execution](/workflows#workflow-execution).
The state of a running Workflow Execution is constantly changing.
You can use Queries to expose the internal Workflow Execution state to the external world.
Queries are available for running or completed Workflows Executions only if the Worker is up and listening on the Task Queue.

### Workflow Update

An Workflow Update is a request to and a response from a Temporal Client to a Workflow Execution.

The Workflow must have a function to handle the Update.
Unlike a Signal handler, the Update handler function can mutate the state of the Workflow while also returning a value to the caller.
The Update handler listens for Updates by the Update's name.

When there is the potential for multiple Updates to cause a duplication problem, Temporal recommends adding idempotency logic to your Update handler that checks for duplicates.

For more information, see [What is an Update?](/workflows#update).

## Remote codec

| Feature                       | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Remote codec](#remote-codec) | Yes | Yes  | Yes        | Yes    | Yes  | No  |

The remote codec refers to exposing a Payload Codec through HTTP endpoints for remote encoding and decoding.
It can be configured using a remote codec server, where each developer can control the mapping locally through the hosts file.
However, distributing encryption keys for decoding payloads poses a security risk.
The authorization header can be set on requests to the codec server.

## Replayer

| Feature               | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Replayer](#replayer) | Yes | Yes  | Yes        | Yes    | Yes  | No  |

A Replay is the method by which a Workflow Execution resumes making progress.
During a Replay the Commands that are generated are checked against an existing Event History.
Replays are necessary and often happen to give the effect that Workflow Executions are resumable, reliable, and durable.

For more information, see [Deterministic constraints](#deterministic-constraints).

If a failure occurs, the Workflow Execution picks up where the last recorded event occurred in the Event History.

## Retries

| Feature             | Go  | Java | TypeScript | Python | .Net | PHP |
| ------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Retries](#retries) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

A Retry Policy is a collection of attributes that instructs the Temporal Server how to retry a failure of a Workflow Execution or an Activity Task Execution.

## SAGA

| Feature       | Go | Java | TypeScript | Python | .Net | PHP |
| ------------- | -- | ---- | ---------- | ------ | ---- | --- |
| [SAGA](#saga) | No | Yes  | No         | No     | No   | Yes |

The saga pattern is a design approach for distributed systems where a task extends across machine or microservice boundaries.
For these tasks, it's crucial to ensure the complete execution of all steps, as partial execution can lead to undesirable outcomes.

Compensating actions, often referred to as compensating transactions, simulate the atomic execution of operations that are distributed across multiple databases in distributed systems.
If any of these distributed operations fail, its effects are reversed using a compensating action.
These compensating actions are integral to the broader saga pattern.

Temporal provides a dedicated Saga library, making it easier to handle these distributed tasks.
You can register functions as compensations, and Temporal manages their execution:
[Java SDK Documentation](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.0.0/io/temporal/workflow/Saga.html)

For those using other SDKs, you can implement functions like `addCompensation` and `compensate` to achieve similar behavior.

## Sandbox

| Feature             | Go | Java | TypeScript | Python | .Net | PHP |
| ------------------- | -- | ---- | ---------- | ------ | ---- | --- |
| [Sandbox](#sandbox) | No | No   | Yes        | Yes    | No   | No  |

Some SDKs support running Workflows inside a sandbox environment.

The Temporal Python SDK, for example, enables you to run Workflow code in a sandbox environment to help prevent non-determinism errors in your application.
The Temporal Workflow Sandbox for Python is not completely isolated, and some libraries can internally mutate state, which can result in breaking determinism.

<!-- V8 Isolates TypeScript -->

By default, Workflows run in a sandbox environment.
If a Workflow Execution performs a non-deterministic event, an exception is thrown, which results in failing the Workflow Task.
The Workflow will not progress until the code is fixed.

## Scheduling

| Feature                 | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Cron](#cron)           | Yes | Yes  | Yes        | Yes    | No   | Yes |
| [Schedules](#schedules) | Yes | Yes  | Yes        | Yes    | Yes  | No  |

### Cron

Cron is a scheduling system that allows you to schedule Workflow Executions to run at specific times.
It is recommened to use [Schedules](#schedules) instead of Cron Jobs.

### Schedules

A Schedule contains instructions for starting a [Workflow Execution](/workflows#workflow-execution) at specific times.
Schedules provide a more flexible and user-friendly approach than [Temporal Cron Jobs](/workflows#temporal-cron-job).

## SDK Metrics

| Feature                     | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [SDK Metrics](#sdk-metrics) | Yes | Yes  | Yes        | Yes    | Yes  | No  |

SDK Metrics track various aspects of Worker performance, such as Task Queue, Namespace, poller type, Worker type, Activity type, Workflow type, and operation.

For more information on metrics see, [Temporal SDK metrics reference](/references/sdk-metrics#).

## Search Attributes

| Feature                                 | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Search Attributes](#search-attributes) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

A Search Attribute is an indexed field used in a [List Filter](/visibility#list-filter) to filter a list of [Workflow Executions](/workflows#workflow-execution) that have the Search Attribute in their metadata.

## Sessions

| Feature               | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Sessions](#sessions) | Yes | No   | No         | No     | No   | No  |

The Go SDK provides a support for [Worker Session](dev-guide/go/features#enable-sessions).
This makes task routing seamless by ensuring that Activity Tasks are dispatched to the same Worker without having to handle the intricacies of Task Queue naming.
This abstraction simplifies scenarios where consistency or state is pivotal.

While Go provides built-in support, other SDKs like TypeScript and Python don't have a native concept of Sessions.
Instead, they embrace a design pattern known as [Worker-Specific Task Queues](#worker-specific-task-queues) to achieve similar consistency guarantees.
Under this model, all computational tasks of a Workflow are designed to execute on a single Worker.
Although this might seem like a manual replica of the Session feature in Go, it is often the preferred way to ensure tasks are performed in a consistent environment.

For instance, in scenarios where there's a need to interact with file systems—like data processing tasks or engagements with legacy structures—a sticky execution ensures that all tasks are performed in the same file context.
In the provided example, text files are written to Worker-specific folders.
While this serves as a demonstration, real-world applications might involve dedicated machines in a Worker cluster, each corresponding to a 'sticky' Worker, or Worker-Specific Task Queue.

## Signal/Cancel External Workflow

Signal/Cancel External Workflow refers to the process of externally requesting the cancellation of a Workflow.

| Feature                                                            | Go  | Java | TypeScript | Python | .Net | PHP |
| ------------------------------------------------------------------ | --- | ---- | ---------- | ------ | ---- | --- |
| [Signal/Cancel External Workflow](#signalcancel-external-workflow) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

Cancellation is an external request to a Workflow from outside, typically through the Client.
In Temporal, canceling a workflow itself doesn't make sense as cancellation is an external action.
Instead of using self-cancellation, you should request cancellation through the Client.

Temporal Workflows can wait for external Signals or events before proceeding with execution.
External Signals can be used to trigger the rerun of a Workflow after a specified period, including the time spent waiting for the Signal.

<!-- https://temporaltechnologies.slack.com/archives/C01FG4BRQVB/p1697069944495119 -->

In Python, the Cancellation and Signalling is done on the [handle of a Workflow](https://github.com/temporalio/sdk-python#external-workflows).

## Static analyzer

Static analyzers are tools that perform static analysis of code to find potential bugs.
In the case of Temporal, static analyzers are used to find non-deterministic code in Workflow Definitions.

| Feature                                               | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Workflow check](#workflow-check)                     | Yes | No   | No         | No     | No   | No  |
| [VSCode extension support](#vscode-extension-support) | No  | No   | Yes        | No     | No   | No  |

### Workflow check

The [Temporal Workflow Check](https://github.com/temporalio/sdk-go/tree/master/contrib/tools/workflowcheck) is a tool that statically analyzes Temporal Workflow Definitions written in Go (for example, functions with `workflow.Context` as its first argument) to check for non-deterministic code either directly in the function or in a function called by the Workflow.

It is highly optimized to scan large codebases quickly.

:::note
This will not catch all cases of non-determinism such as global var mutation.
This is just a helper and developers should still scrutinize Workflow code for other non-determinisms.
:::

### VSCode extension support

If you're using VS Code, you can use the [Temporal VS Code extension](https://marketplace.visualstudio.com/items?itemName=temporal-technologies.temporalio) to easily load Event Histories and set breakpoints on Events.

For more information, see the [announcement post](https://temporal.io/blog/temporal-for-vs-code) or [demo video](https://www.youtube.com/watch?v=3IjQde9HMNY).

## Timers

| Feature           | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Timers](#timers) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

A Workflow can set a durable timer for a fixed time.
In some SDKs, the function is called `sleep()`, and in others, it's called `timer()`.

SDKs that use timer:

- Go (`NewTimer`)
- PHP
- Python

SDKs that use sleep:

- Go
- Java
- TypeScript

SDKs that use `Workflow.DelayAsync`:

- .Net

## Type safety

| Feature                     | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Type safety](#type-safety) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

Type safety refers to the ability to catch type errors at compile time.

## Unit testing

| Feature                       | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Unit testing](#unit-testing) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

In the context of Temporal, you can create these types of automated tests:

- **End-to-end**: Running a Temporal Server and Worker with all its Workflows and Activities; starting and interacting with Workflows from a Client.
- **Integration**: Anything between end-to-end and unit testing.
  - Running Activities with mocked Context and other SDK imports (and usually network requests).
  - Running Workers with mock Activities, and using a Client to start Workflows.
  - Running Workflows with mocked SDK imports.
- **Unit**: Running a piece of Workflow or Activity code (a function or method) and mocking any code it calls.

## Upsert memo

| Feature                     | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Upsert memo](#upsert-memo) | Yes | No   | No         | No     | Yes  | No  |

A Memo is a non-indexed set of Workflow Execution metadata that developers supply at start time or in Workflow code and that is returned when you describe or list Workflow Executions.
Upsert Memo allows you to update the Memo field for a running Workflow Execution, similar to upserting a Search Attribute.
This is useful if you want to record additional metadata about the execution as it runs.

<!-- https://temporaltechnologies.slack.com/archives/C01FG4BRQVB/p1696278696796029 -->

### Versioning features

Versioning refers to the ability to update a Workflow Definition without breaking existing Workflow Executions.

| Feature                                             | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Patching APIs](#versioning--patching)              | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Build ID based dispatch](#build-id-based-dispatch) | Yes | Yes  | No         | Yes    | Yes  | No  |

### Build ID based dispatch

Build ID dispatch is a feature in Temporal that allows running different versions of Workflow and Activity code on the same task queue.
It works by associating a build ID (typically a version number or git commit hash) with each deployment of Worker code.
When a Workflow task is dispatched, Temporal will look at the build ID of the Workflow and send the task to a Worker with a compatible build ID.
This allows seamless deployment of new code versions without Workflow tasks getting stuck.
Some key aspects of build ID dispatch:

- Workers advertise their build ID to Temporal when polling for tasks.
- Task Queues maintain sets of compatible build IDs.
  New IDs can be added to existing compatible sets.
- When dispatching a Workflow task, Temporal matches the Workflow's build ID to a compatible Worker build ID.
- Build IDs allow different versions of code to run side by side on the same task queue.
- Promoting a new build ID to the default set directs new Workflows to start on that code version.

So in summary, build ID dispatch provides a mechanism to deploy new Worker code without disrupting existing Workflows on a Task Queue.
It's a key feature for zero-downtime deployments in Temporal.

### Patching APIs

Patching APIs refers to the ability to update a Workflow Definition without breaking existing Workflow Executions.

<!--
Worker Versioning simplifies the process of deploying changes to [Workflow Definitions](/workflows/#workflow-definition).
It does this by letting you define sets of versions that are compatible with each other, and then assigning a Build ID to the code that defines a Worker.
The Temporal Server uses the Build ID to determine which versions of a Workflow Definition a Worker can process.
-->

## Worker-Specific Task Queues

| Feature                                                     | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------------------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Worker-Specific Task Queues](#worker-specific-task-queues) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |

A Worker-Specific Task Queue, also known as Sticky Execution, is when a Worker Entity caches the Workflow in memory and creates a dedicated Task Queue to listen on.

A Worker-Specific Task Queue occurs after a Worker Entity completes the first Workflow Task in the chain of Workflow Tasks for the Workflow Execution.

The Worker Entity caches the Workflow in memory and begins polling the dedicated Task Queue for Workflow Tasks that contain updates, rather than the entire Event History.

If the Worker Entity does not pick up a Workflow Task from the dedicated Task Queue in an appropriate amount of time, the Cluster will resume Scheduling Workflow Tasks on the original Task Queue.
Another Worker Entity can then resume the Workflow Execution, and can set up its own Worker-Specific Task Queue for future Workflow Tasks.

- [How to set a `StickyScheduleToStartTimeout` on a Worker Entity in Go](/dev-guide/go/foundations#stickyscheduletostarttimeout)

Worker-Specific Task Queues are the default behavior of the Temporal Platform.

## Workflow Execution mechanisms

A Side Effect and Local Activity are mechanisms to execute operations within the context of a Workflow, with each offering its own advantages and considerations.

| Feature                           | Go  | Java | TypeScript | Python | .Net | PHP |
| --------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Local Activity](#local-activity) | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Side Effects](#side-effects)     | Yes | Yes  | No         | No     | No   | Yes |

### Local Activity

A Local Activity is an Activity Execution that executes in the same process as the Workflow Execution that spawns it.
It offers a balance between the simplicity of a [Side Effect](#side-effects) and the robustness of a regular Activity.
Local Activities avoid network calls and are faster than regular Activities.
However, they provide less isolation than regular Activities since they share the same process as the Workflow Execution.

### Side Effect

A **Side Effect** is a unique operation that, once executed, does not re-execute upon replay.
Instead, it returns the recorded result from its initial execution.
This characteristic is crucial when designing Workflows to ensure determinism.

:::note 💡

Never implement a Side Effect that has a possibility of failing.
If a Side Effect fails, there's a risk it could execute more than once, leading to non-deterministic behavior.

:::

If there's any potential that the code you're considering for a Side Effect might fail or encounter errors, opt for an **Activity** instead.

For SDKs that don't support Side Effects, or if you're looking for a lightweight alternative, consider using a [Local Activity](/activities#local-activity).

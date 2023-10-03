---
id: compare-sdks
title: What are the differences in each SDK?
description: A comparison of the features available in each SDK.
sidebar_label: SDK Comparison
---

The SDKs for Temporal are constructed as follows:

- Go and PHP derive from the Go SDK.
- Java derives from the Java SDK.
- .Net, TypeScript, and Python derive from the Rust Core SDK.

The following table compares the features available in each SDK.

| Feature                                                                             | Go  | Java | TypeScript | Python | .Net | PHP |
| ----------------------------------------------------------------------------------- | --- | ---- | ---------- | ------ | ---- | --- |
| [Activities](#activities)                                                           | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Auth (SSL/mTLS)](#auth-ssltls)                                                     | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Build ID based dispatch](#build-id-based-dispatch)                                 | Yes | Yes  | No         | Yes    | Yes  | No  |
| [Built-in handler list query](#built-in-handler-list-query)                         | No  | No   | No         | No     | No   | No  |
| [Built-in Temporal CLI dev server runner](#built-in-temporal-cli-dev-server-runner) | Yes | No   | Yes        | Yes    | Yes  | No  |
| [Bulk replayer](#bulk-replayer)                                                     | Yes | Yes  | Yes        | Yes    | Yes  | No  |
| [Cancellation](#cancellation)                                                       | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Child Workflows](#child-workflows)                                                 | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Continue as New](#continue-as-new)                                                 | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Dynamic Activities](#dynamic-activities)                                           | No  | Yes  | No         | Yes    | Yes  | No  |
| [Dynamic Queries](#dynamic-queries)                                                 | No  | Yes  | No         | Yes    | Yes  | No  |
| [Dynamic Signals](#dynamic-signals)                                                 | No  | Yes  | Yes        | Yes    | Yes  | No  |
| [Dynamic Workflows](#dynamic-workflows)                                             | No  | Yes  | Yes        | Yes    | Yes  | No  |
| [Enhanced stack trace](#enhanced-stack-trace)                                       | No  | No   | Yes        | No     | No   | No  |
| [gRPC interceptors](#grpc-interceptors)                                             | Yes | Yes  | Yes        | No     | No   | No  |
| [Health service](#health-service)                                                   | Yes | Yes  | Yes        | Yes    | Yes  | No  |
| [Heartbeats](#heartbeats)                                                           | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Interceptors](#interceptors)                                                       | Yes | Yes  | Yes        | Yes    | Yes  | No  |
| [Local Activities](#local-activities)                                               | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Queries](#queries)                                                                 | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Remote codec](#remote-codec)                                                       | Yes | Yes  | Yes        | Yes    | Yes  | No  |
| [Replayer](#replayer)                                                               | Yes | Yes  | Yes        | Yes    | Yes  | No  |
| [Retries](#retries)                                                                 | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [SAGA](#saga)                                                                       | No  | Yes  | No         | No     | No   | Yes |
| [Sandbox](#sandbox)                                                                 | No  | No   | Yes        | Yes    | No   | No  |
| [Schedules](#schedules)                                                             | Yes | Yes  | Yes        | Yes    | Yes  | No  |
| [SDK Metrics](#sdk-metrics)                                                         | Yes | Yes  | Yes        | Yes    | Yes  | No  |
| [Search Attributes](#search-attributes)                                             | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Sessions](#sessions)                                                               | Yes | No   | No         | No     | No   | No  |
| [Side Effects](#side-effects)                                                       | Yes | Yes  | No         | No     | No   | Yes |
| [Signal/Cancel External Workflow](#signalcancel-external-workflow)                  | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Signals](#signals)                                                                 | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Static analyzer](#static-analyzer)                                                 | Yes | No   | No         | No     | No   | No  |
| [Timers](#timers)                                                                   | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Type safety](#type-safety)                                                         | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Unit testing](#unit-testing)                                                       | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Upsert memo](#upsert-memo)                                                         | Yes | No   | No         | No     | Yes  | No  |
| [Versioning / Patching](#versioning--patching)                                      | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [VSCode extension support](#vscode-extension-support)                               | No  | No   | Yes        | No     | No   | No  |
| [Worker-Specific Task Queues](#worker-specific-task-queues)                         | Yes | Yes  | Yes        | Yes    | Yes  | Yes |
| [Workflow Update](#workflow-update)                                                 | Yes | Yes  | No         | No     | No   | No  |

<!--
| [Failure encoding](#failure-encoding)     | Yes | Yes | Yes | Yes | Yes | No  |
| [Operator service](#operator-service)     | Yes | Yes  | Yes        | Yes    | Yes  | No  |
| [High level list Workflow API](#high-level-list-workflow-api)                       | No  | No   | Yes        | Yes    | Yes  | No  |
| [Separate codec concept](#separate-codec-concept)                                   | Yes | Yes  | Yes        | Yes    | Yes  | No  |
-->

## Activities

An Activity is a normal function or method that executes a single, well-defined action (either short or long running), such as calling another service, transcoding a media file, or sending an email message.
Activity code can be non-deterministic.
We recommend that it be [idempotent](/activities#idempotency).

Workflow code orchestrates the execution of Activities, persisting the results.
If an Activity Function Execution fails, any future execution starts from initial state (except [Heartbeats](#heartbeats).

Activity Functions are executed by Worker Processes.
When the Activity Function returns, the Worker sends the results back to the Temporal Cluster as part of the [ActivityTaskCompleted](/references/events#activitytaskcompleted) Event.
The Event is added to the Workflow Execution's Event History.
For other Activity-related Events, see [Activity Events](/workflows#activity-events).

## Auth (SSL/mTLS)

Temporal SDKs support authenticating and authorizing client API calls to the Temporal server using SSL and mTLS.
SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) allow encrypted communication between the SDK client and the Temporal server over a network. mTLS (mutual TLS) is a variant where both client and server authenticate each other by verifying the provided certificates.
This ensures secure identification and access control for API calls made from the SDK clients.
Configuring SSL or mTLS authentication provides network encryption and protects against man-in-the-middle attacks when communicating with the Temporal server.

## Build ID based dispatch

Build ID dispatch is a feature in Temporal that allows running different versions of Workflow and Activity code on the same task queue. It works by associating a build ID (typically a version number or git commit hash) with each deployment of Worker code.
When a Workflow task is dispatched, Temporal will look at the build ID of the Workflow and send the task to a Worker with a compatible build ID. This allows seamless deployment of new code versions without Workflow tasks getting stuck.
Some key aspects of build ID dispatch:

- Workers advertise their build ID to Temporal when polling for tasks.
- Task Queues maintain sets of compatible build IDs. New IDs can be added to existing compatible sets.
- When dispatching a Workflow task, Temporal matches the Workflow's build ID to a compatible Worker build ID.
- Build IDs allow different versions of code to run side by side on the same task queue.
- Promoting a new build ID to the default set directs new Workflows to start on that code version.

So in summary, build ID dispatch provides a mechanism to deploy new Worker code without disrupting existing Workflows on a task queue. It's a key feature for zero-downtime deployments in Temporal.

## Built-in handler list Query

The built-in handler list Query in Temporal allows retrieving the list of registered Signal and Query handlers for a Workflow.

When this Query is sent to a Workflow, the response contains a JSON serialized list of the following information about each handler:

- Handler type: either Signal or Query
- Handler name
- Workflow function that handles the Signal or Query

This can be useful for debugging or introspecting which Signal or Query a Workflow currently supports.

## Built-in Temporal CLI dev server runner

This allows starting the CLI dev server from code rather than manually from the terminal.
It handles starting and stopping the server automatically around your Workflows.

## Bulk replayer

The bulk replayer enables efficient parallel replay of many Workflow histories from a JSON file or an array of Workflow history event objects for testing and debugging Workflows in Temporal.

## Cancellation

Cancellation in Temporal SDKs refers to the ability to stop the execution of a Workflow, Activity, or other operation before it completes normally.

Each SDK provides APIs and abstractions to enable robust cancellation handling in Workflows and Activities.

## Child Workflows

A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow.

Child Workflows in Temporal SDKs refer to Workflows that are started from within another Workflow.

Each SDK provides APIs and abstractions to handle the complexity behind the scenes.

## Continue as New

Continue-As-New is the mechanism by which all relevant state is passed to a new Workflow Execution with a fresh Event History.

## Dynamic Activities

- Activities can be invoked dynamically without pre-declaring them.
- Useful when Activity types are not known upfront.

## Dynamic Queries

- Queries can be defined and handled dynamically at runtime.
- Useful when query names are not known upfront.

## Dynamic Signals

- Signals can be defined and handled dynamically at runtime.
- Useful when signal names are not known upfront.

## Dynamic Workflows

- Workflows can be defined dynamically at runtime by composing activities.
- Useful for ad-hoc Workflows without pre-defined steps.

## Enhanced stack trace

Enhanced stack trace in Temporal is a feature that allows you to capture and view detailed information about the execution of a Workflow [1].
It provides a stack trace of all the threads owned by the Workflow execution, which can be useful for troubleshooting issues in production [3].
The `__stack_trace` query is a predefined query available in many SDKs that returns the stack trace [3].
You can use the `tctl Workflow stack` command to query the stack trace of a Workflow execution [5]. This feature is especially helpful for identifying errors and blocks in a Workflow definition [5].

## gRPC interceptors

gRPC interceptors serve as a powerful tool provided by gRPC, enabling developers to intercept and modify both incoming RPC requests and outgoing RPC responses. This mechanism can be instrumental in scenarios such as dynamic adjustments to target hosts or tweaking parameters like TLS configurations. However, for those utilizing the Temporal SDKs powered by the Rust core, which includes the TypeScript, Python, and .Net SDKs.

Currently, features like gRPC interceptors aren't implemented directly in the Rust core. This limitation extends to other scenarios like the rotation of client TLS certificates. Although technically feasible, the current workaround involves recreating the client to reflect changes.

## Health service

A health service in the context of Temporal is a component responsible for checking the health of the frontend service [1]. It ensures the proper functioning of the cluster by returning a list of cluster metrics [1]. The health checks for the Temporal cluster can be set up using TCP or gRPC on port 7233 [5]. The matching service is responsible for hosting user-facing Task Queues [3], while the history service persists Workflow execution state [4]. The Worker service performs background processing for replication queue and system Workflows [2].

## Heartbeats

A Heartbeat is a mechanism used in the Temporal Platform to ensure the progress and timely execution of Activities.
It involves periodic pings from the Activity Worker to the Temporal Cluster.
The Heartbeat Timeout specifies the maximum time between Activity Heartbeats.
Heartbeats can be used to store progress information or any other serializable object.
By Heartbeating within a specified interval lower than the Heartbeat Timeout, Activities can execute for a long time and fail fast.
Heartbeats help prevent Activity Timeouts and enable efficient retries.

## Interceptors

Interceptors are a mechanism for modifying inbound and outbound SDK calls.
Interceptors are commonly used to add tracing and authorization to the scheduling and execution of Workflows and Activities.
You can compare these to "middleware" in other frameworks.

The TypeScript SDK comes with an optional interceptor package that adds tracing with [OpenTelemetry](https://www.npmjs.com/package/@temporalio/interceptors-opentelemetry).
See how to use it in the [interceptors-opentelemetry](https://github.com/temporalio/samples-typescript/tree/main/interceptors-opentelemetry) code sample.

The [Go SDK](https://github.com/temporalio/sdk-go) provides support for distributed tracing with **_Interceptors_**.
Interceptors uses Temporal headers to create a call graph of a [Workflow](/concepts/what-is-a-workflow), along with its [Activities](/concepts/what-is-an-activity) and [Child Workflows](/concepts/what-is-a-child-workflow-execution).

There are several tracing implementations supported by the Temporal Go SDK.
For an [OpenTracing](https://pkg.go.dev/go.temporal.io/sdk/contrib/opentracing) Interceptor, use `opentracing.NewInterceptor(opentracing.TracerOptions{})` to create a `TracingInterceptor`.

## Local Activities

A Local Activity is an Activity Execution that executes in the same process as the Workflow Execution that spawns it.
It offers a balance between the simplicity of a [Side Effect](#side-effects) and the robustness of a regular Activity.
Local Activities avoid network calls and are faster than regular Activities. However, they provide less isolation than regular Activities since they share the same process as the Workflow Execution.

## Queries

A Query is a synchronous operation that is used to get the state of a [Workflow Execution](/workflows#workflow-execution).
The state of a running Workflow Execution is constantly changing.
You can use Queries to expose the internal Workflow Execution state to the external world.
Queries are available for running or completed Workflows Executions only if the Worker is up and listening on the Task Queue.

## Remote codec

The remote codec refers to exposing a Payload Codec through HTTP endpoints for remote encoding and decoding.
It can be configured using a remote codec server, where each developer can control the mapping locally through the hosts file.
However, distributing encryption keys for decoding payloads poses a security risk.
The authorization header can be set on requests to the codec server.

## Replayer

A Replay is the method by which a Workflow Execution resumes making progress. During a Replay the Commands that are generated are checked against an existing Event History. Replays are necessary and often happen to give the effect that Workflow Executions are resumable, reliable, and durable.

For more information, see [Deterministic constraints](#deterministic-constraints).

If a failure occurs, the Workflow Execution picks up where the last recorded event occurred in the Event History.

## Retries

A Retry Policy is a collection of attributes that instructs the Temporal Server how to retry a failure of a Workflow Execution or an Activity Task Execution.

## SAGA

The saga pattern is a design approach for distributed systems where a task extends across machine or microservice boundaries.
For these tasks, it's crucial to ensure the complete execution of all steps, as partial execution can lead to undesirable outcomes.

Compensating actions, often referred to as compensating transactions, simulate the atomic execution of operations that are distributed across multiple databases in distributed systems. If any of these distributed operations fail, its effects are reversed using a compensating action. These compensating actions are integral to the broader saga pattern.

Temporal provides a dedicated Saga library, making it easier to handle these distributed tasks. You can register functions as compensations, and Temporal manages their execution:
[Java SDK Documentation](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.0.0/io/temporal/workflow/Saga.html)

For those using other SDKs, you can implement functions like `addCompensation` and `compensate` to achieve similar behavior.

## Sandbox

Some SDKs support running Workflows inside a sandbox environment.

The Temporal Python SDK, for example, enables you to run Workflow code in a sandbox environment to help prevent non-determinism errors in your application.
The Temporal Workflow Sandbox for Python is not completely isolated, and some libraries can internally mutate state, which can result in breaking determinism.

<!-- V8 Isolates TypeScript -->

By default, Workflows run in a sandbox environment. If a Workflow Execution performs a non-deterministic event, an exception is thrown, which results in failing the Workflow Task. The Workflow will not progress until the code is fixed.

## Schedules

A Schedule contains instructions for starting a [Workflow Execution](/workflows#workflow-execution) at specific times.
Schedules provide a more flexible and user-friendly approach than [Temporal Cron Jobs](/concepts/what-is-a-temporal-cron-job).

## SDK Metrics

SDK Metrics track various aspects of worker performance, such as task queue, namespace, poller type, worker type, activity type, workflow type, and operation.

For more information on metrics see, [Temporal SDK metrics reference](/references/sdk-metrics).

## Search Attributes

A Search Attribute is an indexed field used in a [List Filter](/concepts/what-is-a-list-filter) to filter a list of [Workflow Executions](/workflows#workflow-execution) that have the Search Attribute in their metadata.

## Sessions

The Go SDK provides a support for [Worker Session](dev-guide/go/features#enable-sessions). This makes task routing seamless by ensuring that Activity Tasks are dispatched to the same Worker without having to handle the intricacies of Task Queue naming.
This abstraction simplifies scenarios where consistency or state is pivotal.

While Go provides built-in support, other SDKs like TypeScript and Python don't have a native concept of Sessions.
Instead, they embrace a design pattern known as [Worker-Specific Task Queues](#worker-specific-task-queues) to achieve similar consistency guarantees.
Under this model, all computational tasks of a Workflow are designed to execute on a single Worker.
Although this might seem like a manual replica of the Session feature in Go, it is often the preferred way to ensure tasks are performed in a consistent environment.

For instance, in scenarios where there's a need to interact with file systems—like data processing tasks or engagements with legacy structures—a sticky execution ensures that all tasks are performed in the same file context.
In the provided example, text files are written to Worker-specific folders.
While this serves as a demonstration, real-world applications might involve dedicated machines in a Worker cluster, each corresponding to a 'sticky' Worker, or Worker-Specific Task Queue.

## Side Effects

A **Side Effect** is a unique operation that, once executed, does not re-execute upon replay. Instead, it returns the recorded result from its initial execution. This characteristic is crucial when designing Workflows to ensure determinism.

:::note 💡

Never implement a Side Effect that has a possibility of failing. If a Side Effect fails, there's a risk it could execute more than once, leading to non-deterministic behavior.

:::

If there's any potential that the code you're considering for a Side Effect might fail or encounter errors, opt for an **Activity** instead.

For SDKs that do not support Side Effects, or if you're looking for a lightweight alternative, consider using a [Local Activity](/activities#local-activity).

## Signal/Cancel External Workflow

Signal/Cancel External Workflow refers to the process of externally requesting the cancellation of a Workflow.
Cancellation is an external request to a Workflow from outside, typically through the Client.
In Temporal, canceling a workflow itself doesn't make sense as cancellation is an external action.
Instead of using self-cancellation, you should request cancellation through the Client.
Temporal Workflows can wait for external signals or events before proceeding with execution.
External Signals can be used to trigger the rerun of a Workflow after a specified period, including the time spent waiting for the Signal.

## Signals

A Signal is an asynchronous request to a [Workflow Execution](/workflows#workflow-execution).

## Static analyzer

The [Temporal Workflow Check](https://github.com/temporalio/sdk-go/tree/master/contrib/tools/workflowcheck) is a tool that statically analyzes Temporal Workflow Definitions written in Go (i.e. functions with `workflow.Context`` as first argument) to check for non-deterministic code either directly in the function or in a function called by the Workflow.
It is highly optimized to scan large codebases quickly.

:::note
This will not catch all cases of non-determinism such as global var mutation. This is just a helper and developers should still scrutinize Workflow code for other non-determinisms.
:::

TypeScript has support for a [VS Code extension](#vscode-extension-support).

## Timers

A Workflow can set a durable timer for a fixed time period.
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

Type safety refers to the ability to catch type errors at compile time.

## Unit testing

In the context of Temporal, you can create these types of automated tests:

- **End-to-end**: Running a Temporal Server and Worker with all its Workflows and Activities; starting and interacting with Workflows from a Client.
- **Integration**: Anything between end-to-end and unit testing.
  - Running Activities with mocked Context and other SDK imports (and usually network requests).
  - Running Workers with mock Activities, and using a Client to start Workflows.
  - Running Workflows with mocked SDK imports.
- **Unit**: Running a piece of Workflow or Activity code (a function or method) and mocking any code it calls.

## Upsert memo

A Memo is a non-indexed set of Workflow Execution metadata that developers supply at start time or in Workflow code and that is returned when you describe or list Workflow Executions.
Upsert Memo allows you to update the Memo field for a running Workflow Execution, similar to upserting a Search Attribute.
This is useful if you want to record additional metadata about the execution as it runs.

<!-- https://temporaltechnologies.slack.com/archives/C01FG4BRQVB/p1696278696796029 -->

## Versioning / Patching

Worker Versioning simplifies the process of deploying changes to [Workflow Definitions](/workflows/#workflow-definition).
It does this by letting you define sets of versions that are compatible with each other, and then assigning a Build ID to the code that defines a Worker.
The Temporal Server uses the Build ID to determine which versions of a Workflow Definition a Worker can process.

## VSCode extension support

If you're using VS Code, you can use the [Temporal VS Code extension](https://marketplace.visualstudio.com/items?itemName=temporal-technologies.temporalio) to easily load Event Histories and set breakpoints on Events.
For usage, see the [announcement post](https://temporal.io/blog/temporal-for-vs-code) or [demo video](https://www.youtube.com/watch?v=3IjQde9HMNY).

## Worker-Specific Task Queues

A Worker-Specific Task Queue, also known as Sticky Execution, is when a Worker Entity caches the Workflow in memory and creates a dedicated Task Queue to listen on.

A Worker-Specific Task Queue occurs after a Worker Entity completes the first Workflow Task in the chain of Workflow Tasks for the Workflow Execution.

The Worker Entity caches the Workflow in memory and begins polling the dedicated Task Queue for Workflow Tasks that contain updates, rather than the entire Event History.

If the Worker Entity does not pick up a Workflow Task from the dedicated Task Queue in an appropriate amount of time, the Cluster will resume Scheduling Workflow Tasks on the original Task Queue.
Another Worker Entity can then resume the Workflow Execution, and can set up its own Worker-Specific Task Queue for future Workflow Tasks.

- [How to set a `StickyScheduleToStartTimeout` on a Worker Entity in Go](/go/how-to-set-workeroptions-in-go#stickyscheduletostarttimeout)

Worker-Specific Task Queues are the default behavior of the Temporal Platform.

## Workflow Update

An Workflow Update is a request to and a response from a Temporal Client to a Workflow Execution.

The Workflow must have a function to handle the Update. Unlike a Signal handler, the Update handler function can mutate the state of the Workflow while also returning a value to the caller.
The Update handler listens for Updates by the Update's name.

When there is the potential for multiple Updates to cause a duplication problem, Temporal recommends adding idempotency logic to your Update handler that checks for duplicates.

For more information, see [What is an Update?](/concepts/what-is-an-update).

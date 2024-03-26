---
id: what-is-an-update
title: What is an Update?
sidebar_label: Update
description: An Update is a request to and a response from Workflow Execution.
ssdi:
  - In [Pre-release](/temporal/release-stages#pre-release) (API is subject to change)
  - Introduced in [Temporal Server version 1.21](https://github.com/temporalio/temporal/releases/tag/v1.21.0)
  - Available in [Go SDK](https://pkg.go.dev/go.temporal.io/sdk@v1.23.1/client#Client.UpdateWorkflowWithOptions) since [v1.23.0](https://github.com/temporalio/sdk-go/releases/tag/v1.23.0)
  - Available in [Java SDK](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowStub.html#startUpdate(io.temporal.client.UpdateOptions,java.lang.Object...)) since [v1.20.0](https://github.com/temporalio/sdk-java/releases/tag/v1.20.0)
  - Available in [Python SDK](https://docs.temporal.io/dev-guide/python/features#updates) since [v1.4.0](https://github.com/temporalio/sdk-python/releases/tag/1.4.0)
  - Available in [.NET SDK](https://dotnet.temporal.io/api/Temporalio.Client.WorkflowHandle.html#Temporalio_Client_WorkflowHandle_ExecuteUpdateAsync_System_String_System_Collections_Generic_IReadOnlyCollection_System_Object__Temporalio_Client_WorkflowUpdateOptions_) since [v0.1.0-beta2](https://github.com/temporalio/sdk-dotnet/releases/tag/0.1.0-beta2)
  - Available in [TypeScript SDK](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle#executeupdate) since [v1.9.0](https://github.com/temporalio/sdk-typescript/releases/tag/v1.9.0)
tags:
  - term
  - updates
  - explanation
---

An Update is a request and response from a Temporal Client to a [Workflow Execution](/concepts/what-is-a-workflow-execution).

- [How to develop, send, and handle Updates in Go](/go/updates)
- [How to develop, and send Updates in Python](/python/updates)
- [How to develop, send, and handle Updates in Java](/java/updates)

You can think of an Update as a synchronous, blocking call that could replace both a Signal and a Query. An update is:

- A Signal that can return a value, and has lower overhead and latency
- A Query that can mutate workflow state

The Workflow must have a function to handle the Update.
The Update handler can mutate workflow state (like a [Signal](/concepts/what-is-a-signal) but unlike a [Query](/concepts/what-is-a-query)) and return a value to the caller (like a Query but unlike a Signal).
Like every bit of code in a Workflow, Update handlers must be [deterministic](/concepts/what-is-a-workflow-definition#deterministic-constraints).
However, they may use all the available Workflow features, such as executing Activities and child Workflows, and waiting on timers/conditions.

To avoid losing Updates when using [Continue-As-New](/concepts/what-is-continue-as-new), ensure that all Update handlers have completed before calling Continue-As-New.

When there is the potential for multiple Updates to cause a duplication problem, Temporal recommends adding idempotency logic to your Update handler that checks for duplicates.

An Update has four phases.

1. **Admission.** The Temporal Cluster first validates Update submissions against the configured resource usage limits.
   For example, limits apply to concurrent requests and requests per second.
   For more details, see the [Temporal Platform defaults](/self-hosted/platform-defaults).
   When this phase is complete, the Platform changes the status of the Update to **Admitted**.
   At this stage, the Platform hasn't yet persisted the Update to the Workflow Execution's Event History or sent it to a Worker.
2. **Validation.** An optional developer-provided function that performs request validation.
   This validation code, similar to a [Query](/concepts/what-is-a-query) handler, can observe but not change the Workflow state.
   This means that the validation of an Update request may depend on the Workflow state at runtime.
   To indicate that the Update request doesn't pass validation, the validation code must throw/return a language-appropriate error.
   In this case, the system rejects the request, doesn't record anything in the Workflow Event History to indicate that the Update ever happened, and the Update processing doesn't proceed to later phases.
   If the Update completes the validation stage without error, the Platform changes its state to **Accepted** and a [WorkflowExecutionUpdateAcceptedEvent](/references/events#workflowexecutionupdateacceptedevent) Event is added to Workflow Execution [Event History](#event-history).
3. **Execution.** Accepted Update requests move to the execution phase.
   In this phase, the Worker delivers the request to the Update handler.
4. **Completion.** The Update handler can return a result or a language-appropriate error/exception to indicate its completion.
   The Platform sends the Update outcome back to the original invoking entity as an Update response.
   A [WorkflowExecutionUpdateCompletedEvent](/references/events#workflowexecutionupdatecompletedevent) Event in the Workflow Execution Event History denotes the completion of an Update.

:::note

Workflow Updates are currently disabled by default on Temporal Server.

To enable the `UpdateWorkflowExecution` API, set the [frontend.enableUpdateWorkflowExecution](https://github.com/temporalio/temporal/blob/main/common/dynamicconfig/constants.go) dynamic config value to `true`.

For example, to enable Workflow Updates with the Temporal CLI, pass the value when executing the `temporal` command:

```command
temporal server start-dev --dynamic-config-value frontend.enableUpdateWorkflowExecution=true
```

:::

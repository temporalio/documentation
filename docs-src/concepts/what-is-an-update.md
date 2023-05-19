---
id: what-is-an-update
title: What is an Update?
sidebar_label: Update
description: A Update is a request to a workflow that returns a response.
tags:
  - term
  - updates
  - explanation
---

An Update is a request and response from a Temporal Client to a [Workflow Execution](/concepts/what-is-a-workflow-execution).

- [How to develop, send, and handle Updates in Go](/go/updates)

An Update is the full request and response to and from a running Workflow Execution.
The Workflow must have a function to handle the Update.
Unlike a [Signal](/concepts/what-is-a-signal) handler, the Update handler function can mutate the state of the Workflow while also returning a value to the caller.
The Update handler listens for Updates by the Update's name.

When there is the potential for multiple Updates to cause a duplication problem, Temporal recommends adding idempotency logic to your Update handler that checks for duplicates.

An Update has four phases.

1. **_Admission_** - The Temporal Cluster first validates Update submissions against configured resource utilization limits.
   For example, there are limits against concurrent requests and requests per second limits.
   See the [Temporal Platform limits sheet](/kb/temporal-platform-limits-sheet) for more details.
   After this, the Platform changes the status of the Update to **_Admitted_**.
   At this stage, the Platform hasn't yet persisted the Update to the Workflow Execution's Event History or sent it to a Worker.
1. **_Validation_** - An optional request validation phase further validates Update requests.
   This Query handler performs the optional request validation.
   This validation code, similar to a Query handler, can observe but not modify the workflow state.
   This means that the validation of an Update request may depend on the Workflow state at runtime.
   If an Update request doesn't pass validation at this stage, the system rejects the request and doesn't record anything in the Workflow Event History to indicate that the Update ever happened.
   The Update processing doesn't proceed to subsequent phases.
   Once the Update passes the validation stage, the Platform changes its state to **_Accepted_**.
   A `WorkflowExecutionUpdateAcceptedEvent` in the Workflow Execution [Event History](#event-history) denotes the acceptance of an Update.
1. **_Execution_** - Accepted Update requests move to the execution phase.
   In this phase, the Worker delivers the request to the Update handler.
   The Platform subjects Update handlers to Replays and handlers thus must be [deterministic](/concepts/what-is-workflow-definition#deterministic-constraints).
   Moreover, they should execute quickly and not explicitly block; That is - if an Update handler needs to block it should use an Activity and wait for that Activity's result, just like any other piece of Workflow code.
1. **_Completion_** - The Update handler can return a result or a language-appropriate error/exception to indicate its completion.
   The Platform sends the Update outcome back to the original invoking entity as an Update response.
   A `WorkflowExecutionUpdateCompletedEvent` in the Workflow Execution [Event History](#event-history) denotes the completion of an update.

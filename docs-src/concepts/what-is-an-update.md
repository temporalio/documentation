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

An Update is a request to a [Workflow Execution](/workflows#workflow-execution)
that returns a response.

- [How to develop, send, and handle Updates in code](/application-development/features#updates)

An update delivers a request to a running Workflow Execution where that request is handled by a registered update handler, the return value of which is sent back to the caller in the form of a response.
Update handlers are Workflow functions that listen for Updates by Update name.
Update handlers can mutate Workflow state.
An Update is sent from a Temporal Client.
If multiple deliveries of an Update request would be a problem for your Workflow, add idempotency logic to your Update handler that checks for duplicates.

Updates proceed in four phases.

1. _Admission_ - Upon submission to an instance of the Temporal WorkflowService, an update is validated by the server against server-configured limits to resource utilization (e.g. concurrent request limits, RPS limits, etc).
   When the server decides that the update can continue (i.e. is within the limits established by server configuration and runtime state) we say that the update has been _admitted_ and it progresses to the next phase.
   Note that at this point the upate has not been written to the Workflow Execution [Event History](#event-history) nor has it been sent to a worker.
1. _Validation_ - Update requests undergo further validation through an optional request validation phase that can be associated with an update handler at registration time.
   This validation code can observe but not modify workflow state, much like a query handler, meaning that validation of an update request can be runtime dependent on workflow state.
   If an update request fails validation at this stage, the request is rejected and nothing is written to the Workflow History to indicate that the update ever happened.
   Subsequent phases in update processing do not occur. Workflow requeests that pass validation are said to have been _accepted_.
   The acceptance of an update is denoted with a `WorkflowExecutionUpdateAcceptedEvent` in the Workflow Execution [Event History](#event-history).
1. _Execution_ - Accepted Update requests proceed to the execution phase.
   In this phase, the request is delivered to the update handler which acts on the input.
   Update handlers work like workflow code in that they undergo replay and thus are required to be deterministic.
   Further, they are expected to execute quickly and not block - an Update handler that needs to do blocking work should use an Activity and wait on that Activity's result, just like any other piece of workflow code.
1. _Completion_ - The update handler can return a result value or some language-appropriate error/exception to indicate that it has completed.
   The Update outcome is sent all the way back to the original invoking entity in the form of an Update response.
   The completion of an update is denoted with a `WorkflowExecutionUpdateCompletedEvent` in the Workflow Execution [Event History](#event-history).

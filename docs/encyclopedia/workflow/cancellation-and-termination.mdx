---
id: cancellation-and-termination
title: Cancellation and Termination
sidebar_label: Cancellation and Termination
description:
  Cancellation asks a Workflow to stop and run cleanup. Termination stops it immediately without cleanup. Compare the two
  and what each records.
toc_max_heading_level: 4
tags:
  - Concepts
  - Workflows
  - Activities
---

Cancellation and Termination both stop a [Workflow Execution](/workflow-execution) before it finishes on its own. They
differ in whether your Workflow code gets a say.

Cancellation is cooperative. The Temporal Service delivers the request to the Workflow, and the Workflow decides what to
do with it, which means it can release resources, compensate for completed steps, and choose its own closing status.
Termination is forceful. The Workflow Execution is closed immediately and Workflow code never sees the request, so no
cleanup runs.

Prefer Cancellation. Reach for Termination when a Workflow can't process a Cancellation request, such as when it's
blocked on a non-deterministic error or has no Workers to run its Tasks.

## Operations summary

| Operation                       | What it does                                                        | CLI                                                                     |
| ------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Cancellation](#cancellation)   | Asks the Workflow to stop, letting it run cleanup first.            | [`temporal workflow cancel`](/cli/command-reference/workflow#cancel)     |
| [Termination](#termination)     | Closes the Workflow Execution immediately, with no cleanup.         | [`temporal workflow terminate`](/cli/command-reference/workflow#terminate) |

Both operations are also available through the Web UI, the SDK Clients, and the gRPC API. Both accept a
[List Filter](/list-filter) instead of a Workflow Id to act on matching Workflow Executions in bulk.

## Cancellation

### What happens when you cancel a Workflow

- A [WorkflowExecutionCancelRequested](/references/events#workflowexecutioncancelrequested) Event is recorded, carrying
  the requester's identity and the reason.
- The Temporal Service schedules a new [Workflow Task](/tasks#workflow-task), so the Workflow can react to the request.
- The SDK surfaces the request to Workflow code as a Cancelled Failure. See
  [How Temporal represents failures](/encyclopedia/application-failures#failure-representation).
- The Workflow runs whatever cleanup its implementation supports.
- The closing status depends on what the Workflow does next.

Because Cancellation is delivered as a failure, unhandled Cancellation closes the Workflow Execution as **Canceled**
rather than Failed, recording a [WorkflowExecutionCanceled](/references/events#workflowexecutioncanceled) Event. A
Workflow that handles the request and returns normally closes as **Completed**. Both are valid outcomes; which one you
want is a business decision, not a technical one.

Cleanup that calls Activities has to run outside the canceled scope, because a canceled scope can't schedule new work.
Each SDK provides a mechanism for this, such as `workflow.NewDisconnectedContext` in Go. See the SDK guides below.

### Cancellation and Activities

Activity Cancellations are delivered to the Activity when it [Heartbeats](/encyclopedia/detecting-activity-failures#activity-heartbeat).
This has two consequences worth planning around:

- An Activity that doesn't Heartbeat can't receive a Cancellation. It runs to completion, fails, or times out.
- Heartbeat throttling can delay delivery, so Cancellation may reach the Activity later than the request was made.

If you need a long-running Activity to stop when its Workflow is canceled, it has to Heartbeat.

### Cancellation across Workflow boundaries

A Workflow can request Cancellation of another Workflow Execution. This records a
[RequestCancelExternalWorkflowExecutionInitiated](/references/events#requestcancelexternalworkflowexecutioninitiated)
Event in the requesting Workflow, followed by
[ExternalWorkflowExecutionCancelRequested](/references/events#externalworkflowexecutioncancelrequested) once the Service
delivers it. When the target is a [Child Workflow](/child-workflows), the parent records
[ChildWorkflowExecutionCanceled](/references/events#childworkflowexecutioncanceled).

## Termination

### What happens when you terminate a Workflow

- A [WorkflowExecutionTerminated](/references/events#workflowexecutionterminated) Event is recorded with the reason and
  the requester's identity. This is the closing Event in the Workflow Execution's Event History.
- Workflow code can't see or respond to the termination, so no cleanup runs and no compensation happens.
- Pending Activities are not given a chance to stop cleanly.

The reason is optional and defaults to the current user's name. Provide one — it's the only record of why the Workflow
Execution was stopped.

Anything a terminated Workflow would have cleaned up is left as it was: reserved inventory stays reserved, held locks
stay held, partial writes stay written. If that matters for your use case, cancel instead, and terminate only if the
Cancellation doesn't take effect.

## Which one should you use?

|                              | Cancellation                                    | Termination                        |
| ---------------------------- | ----------------------------------------------- | ---------------------------------- |
| **Workflow code notified?**  | Yes, as a Cancelled Failure                     | No                                 |
| **Cleanup and compensation** | Runs, if the Workflow implements it             | Doesn't run                        |
| **Closing status**           | Canceled, or Completed if the Workflow handles it and returns normally | Terminated    |
| **Closing Event**            | WorkflowExecutionCanceled                       | WorkflowExecutionTerminated        |
| **Takes effect**             | On the next Workflow Task                       | Immediately                        |
| **Works on a stuck Workflow** | No, the Workflow has to process the request     | Yes                                |
| **Failure type**             | Cancelled Failure                               | Terminated Failure                 |

## Child Workflows

A [Parent Close Policy](/parent-close-policy) decides what happens to a Child Workflow Execution when its parent reaches
a Closed status. Two of the three values are these same operations:

- **Terminate** (the default): the child is forcefully Terminated.
- **Request Cancel**: a Cancellation request is sent to the child.
- **Abandon**: the child isn't affected.

Each child sets its own policy, so a parent can terminate some children, cancel others, and leave the rest running.

## Related controls

These operations also stop a Workflow Execution from progressing, but they aren't Cancellation or Termination:

- **[Workflow Pause](/encyclopedia/workflow/workflow-pause)** holds a Workflow Execution in place without closing it or
  losing state. A cancel request sent to a Paused Workflow is recorded and takes effect after the Workflow is Unpaused. A terminate request takes effect immediately.
- **[Reset](/cli/command-reference/workflow#reset)** terminates the current Run and starts a new Run from a point you
  choose in the Event History. Use it when a Workflow is blocked by a non-deterministic error you've since fixed.
- **Timeouts** close a Workflow Execution as Timed Out rather than Canceled or Terminated. See
  [Detecting Workflow failures](/encyclopedia/detecting-workflow-failures).

## Handle Cancellation in your SDK

Cancellation is the half of this that needs Workflow code. Termination needs none.

- [.NET SDK](/develop/dotnet/workflows/cancellation)
- [Go SDK](/develop/go/workflows/cancellation)
- [Java SDK](/develop/java/workflows/cancellation)
- [PHP SDK](/develop/php/workflows/cancellation)
- [Python SDK](/develop/python/workflows/cancellation)
- [Ruby SDK](/develop/ruby/workflows/cancellation)
- [Rust SDK](/develop/rust/workflows/cancellation)
- [TypeScript SDK](/develop/typescript/workflows/cancellation)

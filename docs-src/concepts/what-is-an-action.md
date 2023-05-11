---
id: what-is-an-action
title: What is an Action?
sidebar_label: Action
description: An Action is the fundamental pricing unit in Temporal Cloud.
tags:
  - term
  - explanation
---

An Action is the fundamental pricing unit in [Temporal Cloud](/concepts/what-is-temporal-cloud).

**Workflows**

- **Workflow started.** Occurs via client start, client Signal-With-Start, [Continue-As-New](/concepts/what-is-continue-as-new), or [Child Workflow](/concepts/what-is-a-child-workflow-execution) start.
  If a Workflow start fails, an Action is not recorded.
- **Workflow reset.** Occurs when a [Workflow](/concepts/what-is-a-workflow) resets.
  (Actions that occur before a [Reset](/concepts/what-is-a-reset) are counted even if they are no longer visible in [Event History](/concepts/what-is-an-event-history).)
- **Workflow cancellation requested.** Includes requests from within a Workflow to another Workflow.
- **Timer started.** Includes implicit Timers that are started by a Temporal SDK when timeouts are set, such as `AwaitWithTimeout` in Go or `condition` in TypeScript.
- **Search Attribute updated.** Occurs after a Workflow starts and invokes `UpsertSearchAttributes`.
- **Signal sent.** Includes sending a [Signal](/concepts/what-is-a-signal) from a client or from within a Workflow to another Workflow.
- **Query received.** [Queries](/concepts/what-is-a-query) aren't recorded in Event History.
  A step such as viewing the stack trace in the Temporal Cloud UI results in a Query.
- **Side Effect recorded.** For a mutable [Side Effect](/concepts/what-is-a-side-effect), an Action occurs only when the value changes.
  (Be aware that some SDKs don't support Side Effects.)

**Activities**

- **Activity attempted.** Occurs when an [Activity](/concepts/what-is-an-activity) is started, scheduled, or retried.
- **Local Activity started.** Occurs each time a [Local Activity](/concepts/what-is-a-local-activity) is started.
- **Activity Heartbeat recorded.** A Heartbeat call from Activity code counts as an Action only if it reaches the [Temporal Server](/concepts/what-is-the-temporal-server).
  Temporal SDKs throttle [Activity Heartbeats](/concepts/what-is-an-activity-heartbeat).
  The default throttle is 80% of the [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout).
  Heartbeats don't apply to Local Activities.

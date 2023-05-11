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

- **Workflow started:** Occurs via client start, client Signal-With-Start, [Continue-As-New](/concepts/what-is-continue-as-new), [Child Workflow](/concepts/what-is-a-child-workflow) start, or [Schedule](/concepts/what-is-a-schedule).
  If a Workflow fails to start, an Action is not recorded.
- **Workflow reset:** Actions that occurred before a [Reset](/concepts/what-is-a-reset) are counted even if they are no longer visible in [Event History](/concepts/what-is-an-event-history).
- **Workflow cancellation requested:** Includes requests from a client or from within a Workflow to another Workflow.
- **Timer started:** Includes implicit Timers that are started by a Temporal SDK when timeouts are set, such as `AwaitWithTimeout` in Go or `condition` in TypeScript.
- **Search Attribute updated:** Occurs after a Workflow has started.
- **Signal sent:** Includes sending a [Signal](/concepts/what-is-a-signal) from a client or from within a [Workflow](/concepts/what-is-a-workflow) to another Workflow.
- **Query received:** [Queries](/concepts/what-is-a-query/) aren't recorded in Event History.
  A step such as viewing the stack trace in the Temporal Cloud UI results in a Query.
- **Side Effect recorded:** For a mutable [Side Effect](/concepts/what-is-a-side-effect), an Action occurs only when the value changes.
  (Some SDKs don't support Side Effects.)

**Activities**

- **Activity attempted:** Each [Activity](/concepts/what-is-an-activity) retry is an attempt and thus an Action.
- **Activity Heartbeat recorded:** Not every SDK call [Activity Heartbeat](/concepts/what-is-an-activity-heartbeat) counts as an Action.
  Temporal SDKs throttle Heartbeats.
  The default throttle is 80% of the [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout).
  Heartbeats don't apply to [Local Activities](/concepts/what-is-a-local-activity).

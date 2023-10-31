---
id: what-is-an-action
title: What is an Action?
sidebar_label: Action
description: An Action is the fundamental pricing unit in Temporal Cloud.
tags:
  - term
  - pricing
  - temporal cloud
  - explanation
---

Actions are the fundamental consumption pricing unit in Temporal Cloud.
An Action in Temporal occurs as part of an execution of your Workflow.
Each time you execute a Temporal Workflow (a Workflow Execution), the associated Actions are collected and ultimately represent the state and progress of your Temporal Application.

Actions are collected and billed monthly for each Namespace. The base rate is $25 per one million Actions, and you are billed only for the prorated amount of Actions you use. If you use fewer than one million Actions per month, your bill for Actions will be less than $25 for that month.

| **Actions per month** | **Cost per 1M (USD)** |
| --------------------- | --------------------- |
| Any number            | $25.00 (prorated)     |

Alternatively, Temporal also offers a credit system. Credits provide an additional discount schedule for both billable Actions and storage. Credits do not expire. The following table outlines cost estimates and discount bands for the credits system. Please reach out to the team if you are interested in this option.

| **Actions per month (millions)** | **Cost per 1M (USD)** | **Cost band**       | **Actions per second** |
| -------------------------------- | --------------------- | ------------------- | ---------------------- |
| 0 to 299                         | $23.25                | $0–$7,500           | ~115                   |
| 300 to 1,499                     | $18.80                | $5,640–$28,200      | ~570                   |
| 1,500 to 7,499                   | $14.10                | $21,150–$105,750    | ~2,860                 |
| 7,500 to 29,999                  | $10.50                | $78,750–$315,000    | ~11,400                |
| 30,000 to 149,999                | $7.90                 | $237,000–$1,185,000 | ~57,000                |
| 150,000 or more                  | $5.90                 | Begins at $885,000  | n/a                    |

The following operations result in Actions.

**Workflows**

- **Workflow started.**
  Occurs via client start, client Signal-With-Start, [Continue-As-New](/concepts/what-is-continue-as-new), or [Child Workflow](/concepts/what-is-a-child-workflow-execution) start.
  If a Workflow start fails, an Action is not recorded.
- **Workflow reset.**
  Occurs when a [Workflow](/concepts/what-is-a-workflow) is reset.
  (Actions that occur before a [Reset](/concepts/what-is-a-reset) are counted even if they are no longer visible in [Event History](/concepts/what-is-an-event-history).)
- **Timer started.**
  Includes implicit Timers that are started by a Temporal SDK when timeouts are set, such as `AwaitWithTimeout` in Go or `condition` in TypeScript.
- **Search Attribute upsert requested.**
  Occurs after a Workflow starts and invokes `UpsertSearchAttributes`.
- **Signal sent.**
  Includes sending a [Signal](/concepts/what-is-a-signal) from a client or from within a Workflow to another Workflow.
- **Query received.** [Queries](/concepts/what-is-a-query) aren't recorded in Event History.
  An operation such as viewing the stack trace in the Temporal Cloud UI results in a Query.
- **Workflow Update.** [Workflow Updates](/concepts/what-is-an-update) count as one Action.
- **Version marker recorded.**
  Occurs when a Workflow calls `get-version` or `patch`.
- **Side Effect recorded.**
  For a mutable [Side Effect](/concepts/what-is-a-side-effect), an Action occurs only when the value changes.
  (Be aware that some SDKs don't support Side Effects.)

**Child Workflows**

- The parent Workflow spawning a Child Workflow results in one action and the execution of the Child Workflow results in one Action.

**Activities**

- **Activity started or retried.**
  Occurs each time an Activity is started or retried.
- **Local Activity started.**
  Occurs each time a [Local Activity](/concepts/what-is-a-local-activity) is started.
- **Activity Heartbeat recorded.**
  A Heartbeat call from Activity code counts as an Action only if it reaches the [Temporal Server](/concepts/what-is-the-temporal-server).
  Temporal SDKs throttle [Activity Heartbeats](/concepts/what-is-an-activity-heartbeat).
  The default throttle is 80% of the [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout).
  Heartbeats don't apply to Local Activities.

**Local Activities**

- Local Activities associated with one Workflow Task will count as one Action.
- Each additional Workflow Task heartbeat after counts as an additional Action.
- Local Activities retried following a Workflow Task heartbeat will count as one Action.

**Schedules**

- Each execution of a [Schedule](/concepts/what-is-a-schedule) will count as three Actions:
  - Start schedule
  - Start loop workflow
  - Workflow started

[Reach out to our team](https://pages.temporal.io/contact-us) to get more information or to help size your number of Actions.

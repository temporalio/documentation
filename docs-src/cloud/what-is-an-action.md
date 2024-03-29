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

Actions are collected and billed monthly for each Namespace. The base rate is $25 per one million Actions per month (across all Namespaces), and you are billed only for the prorated amount of Actions you use. If you use fewer than one million Actions per month, your bill for Actions will be less than $25 for that month.

| **Actions per month** | **Cost per 1M (USD)** |
| --------------------- | --------------------- |
| Any number            | $25.00 (prorated)     |

Alternatively, Temporal also offers a credit system. Credits provide an additional discount schedule for both billable Actions and [storage](/cloud/pricing-storage).
Credits do not expire.
The following table outlines cost estimates for the credits system.
Please [reach out to the team](https://pages.temporal.io/contact-us) if you are interested in this option.

| **Actions (Per Million Actions per Namespace)** | **Cost (USD)** |
| ----------------------------------------------- | -------------- |
| Up to 300M                                      | $23.25         |
| Over 300M up to 1.5B                            | $18.80         |
| Over 1.5B up to 7.5B                            | $14.10         |
| Over 7.5B up to 30B                             | $10.50         |
| Over 30B up to 150B                             | $7.90          |
| Over 150B                                       | $5.90          |

The following operations result in Actions:

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
- **Side Effect recorded.**
  For a mutable [Side Effect](/concepts/what-is-a-side-effect), an Action occurs only when the value changes.
  (Be aware that some SDKs don't support Side Effects.)
- **NEW: Workflow Update.** [[Workflow Updates](/concepts/what-is-an-update)] is a primitive that combines a Signal and Query together for a single Action.

**Child Workflows**

- The parent Workflow spawning a Child Workflow results in one Action.
- Execution of the Child Workflow results in one Action.

**Activities**

- **Activity started or retried.**
  Occurs each time an Activity is started or retried.
- **Local Activity started.** Each [Local Activity](/concepts/what-is-a-local-activity) associated with one Workflow Task will count as one Action. (Note: Each additional Workflow Task heartbeat after counts as an additional Action. Also, Local Activities retried following a Workflow Task heartbeat will count as one Action.
- **Activity Heartbeat recorded.**
  A Heartbeat call from Activity code counts as an Action only if it reaches the [Temporal Server](/concepts/what-is-the-temporal-server).
  Temporal SDKs throttle [Activity Heartbeats](/concepts/what-is-an-activity-heartbeat).
  The default throttle is 80% of the [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout).
  Heartbeats don't apply to Local Activities.

**Schedules**

[Schedules](/concepts/what-is-a-schedule) allows you to "schedule" a Workflow to start at a particular time. Each execution of a Schedule will accrue three actions:

- **Schedule Start**. Will account for two actions
- **Workflow started**. One action to start the target workflow

**Export**

[Workflow History Export](/cloud/what-is-workflow-history-export) allows you to export closed Workflow Histories to a cloud storage sink of your choice.

- **Workflow exported**. Each Workflow exported accrues a single action.

[Reach out to our team](https://pages.temporal.io/contact-us) to get more information or to help size your number of Actions.

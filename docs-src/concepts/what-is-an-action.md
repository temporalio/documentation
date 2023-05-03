---
id: what-is-an-action
title: What is an Action?
sidebar_label: Action
description: An Action is the fundamental pricing unit in Temporal Cloud. Each Action is an Event in the Event History of a Workflow Execution.
tags:
  - term
  - explanation
---

An Action is the fundamental pricing unit in [Temporal Cloud](/concepts/what-is-temporal-cloud).
Each Action is an [Event](/concepts/what-is-an-event) in the [Event History](/concepts/what-is-an-event-history) of a [Workflow Execution](/concepts/what-is-a-workflow-execution).
(Be aware that not all Events are Actions.)

**Workflow Actions**

- Start Workflow Execution.
- Reset Workflow Execution.
- Signal-With-Start Workflow Execution.
- Continue-As-New Workflow Execution.
- Start Child Workflow Execution.
- Upsert Workflow Search Attributes.

**Activity Actions**

- Schedule Activity Task.
- Activity Retry. Each retry is counted as a separate Action.
- Record Marker. A Workflow [Worker](/concepts/what-is-a-worker) executed a [Local Activity](/concepts/what-is-a-local-activity) or a [Side Effect](/concepts/what-is-a-side-effect) or is using [Workflow versioning](/workflows#workflow-versioning).

**Signal Actions**

- Signal Workflow Execution.
- Signal External Workflow Execution.

**Query Actions**

- Query Workflow.

**Timer Actions**

- Start Timer.

**Heartbeat Actions**

- Record Activity Task Heartbeat.
- Record Activity Task Heartbeat identifier.

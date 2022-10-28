---
id: what-is-a-run-id
title: What is a Run Id?
sidebar_label: Run Id
description: A Run Id is a globally unique, platform-level identifier for a Workflow Execution.
tags:
  - term
  - explanation
---

A Run Id is a globally unique, platform-level identifier for a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Temporal guarantees that only one Workflow Execution with a given [Workflow Id](/concepts/what-is-a-workflow-id) can be in an Open state at any given time.
But when a Workflow Execution reaches a Closed state, it is possible to have another Workflow Execution in an Open state with the same Workflow Id.
For example, a Temporal Cron Job is a chain of Workflow Executions that all have the same Workflow Id.
Each Workflow Execution within the chain is considered a _Run_.

A Run Id uniquely identifies a Workflow Execution even if it shares a Workflow Id with other Workflow Executions.

:::caution

Don't rely on storing the current Run Id or using it for any logical choices.
A Workflow Retry changes the Run Id.
Because the current Run Id is mutable, relying on it might produce non-determinism issues.

:::

**Learn more**

For more information, see the following links.

- [`message.proto`](https://github.com/temporalio/api/blob/master/temporal/api/history/v1/message.proto#L75-L82)
- [Non-determinism issues for Run Ids](/kb/non-determinism-issues-for-run-ids)

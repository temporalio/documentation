---
id: what-is-a-run-id
title: What is a Run Id?
sidebar_label: Run Id
description: A Run Id is a globally unique, platform-level identifier for a Workflow Execution.
tags:
  - term
  - explanation
---

A Run Id is a globally unique, platform-level identifier for a [Workflow Execution](/workflows#workflow-execution).

The current Run Id is mutable and can change during a [Workflow Retry](retry-policies). You shouldn't rely on storing the current Run Id, or using it for any logical choices, because a Workflow Retry changes the Run Id and can lead to non-determinism issues.

Temporal guarantees that only one Workflow Execution with a given [Workflow Id](/concepts/what-is-a-workflow-id) can be in an Open state at any given time.
But when a Workflow Execution reaches a Closed state, it is possible to have another Workflow Execution in an Open state with the same Workflow Id.
For example, a Temporal Cron Job is a chain of Workflow Executions that all have the same Workflow Id.
Each Workflow Execution within the chain is considered a _Run_.

A Run Id uniquely identifies a Workflow Execution even if it shares a Workflow Id with other Workflow Executions.

### Which operations lead to non-determinism issues?

An operation like `ContinueAsNew`, `Retry`, `Cron`, and `Reset` creates a [Workflow Execution Chain](/workflows#workflow-execution-chain) as identified by the [`first_execution_run_id`](https://github.com/temporalio/api/blob/master/temporal/api/history/v1/message.proto).

Each operation creates a new Workflow Execution inside a chain run and saves its information as `first_execution_run_id`.
Thus, the Run Id is updated during each operation on a Workflow Execution.

- The `first_execution_run_id` is the Run Id of the first Workflow Execution in a Chain run.
- The `original_execution_run_id` is the Run Id when the `WorkflowExecutionStarted` Event occurs.

A Workflow `Reset` changes the first execution Run Id, but preserves the original execution Run Id.
For example, when a new Workflow Execution in the chain starts, it stores its Run Id in `original_execution_run_id`.
A reset doesn't change that field, but the current Run Id is updated.

:::caution

Because of this behavior, you shouldn't rely on the current Run Id in your code to make logical choices.

:::

**Learn more**

For more information, see the following link.

- [`message.proto`](https://github.com/temporalio/api/blob/master/temporal/api/history/v1/message.proto#L75-L82)

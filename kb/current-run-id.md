---
slug: non-determinism-issues-for-run-ids
title: Non-determinism issues for Run Ids
tags:
  - kb-article
date: 2022-10-25T00:00:00Z
---

The current [Run Id](/workflows#run-id) is mutable and can change during a Workflow Retry.
You should not rely on storing the current Run Id, or using it for any logical choices, because a Workflow Retry changes the Run Id and can lead to non-determinism issues.

<!-- truncate -->

### Operations that lead to non-determinism issues

An operation like `ContinueAsNew`, `Retry`, `Cron`, and `Reset` creates a [Workflow Execution Chain](/workflows#workflow-execution-chain) as identified by the [`first_execution_run_id`](https://github.com/temporalio/api/blob/master/temporal/api/history/v1/message.proto).
Each operation creates a new Workflow Execution inside a Chain run and saves its information as `first_execution_run_id`.
Thus, the Run Id is updated during each operation on a Workflow Execution.

- The `first_execution_run_id` is the Run Id of the first Workflow Execution in a Chain run.
- The `original_execution_run_id` is the Run Id when the `WorkflowExecutionStarted` Event occurs.

A Workflow `Reset` changes the first execution Run Id, but preserves the original execution Run Id.
For example, when a new Workflow Execution in the chain starts, it stores its Run Id in `original_execution_run_id`.
A reset does not change that field, but the current Run Id is updated.

Because of that behavior, you should not rely on the current Run Id in your code to make logical choices.

## Learn more

For more information, see the following links.

- The [`message.proto`](https://github.com/temporalio/api/blob/master/temporal/api/history/v1/message.proto#L75-L82) file.
- The [Run Id](/workflows#run-id) section in the Workflow concept page.

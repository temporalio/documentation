---
slug: Non-determinism issues for Run Ids
title: Non-determinism issues for Run Ids
tags:
  - kb-article
date: 2022-10-25T00:00:00Z
---

## What is a Run Id

A Run Id is a globally unique, platform-level identifier for a [Workflow Execution](/concepts/what-is-a-workflow-execution).

## Overview

The current Run Id is mutable and can change during a Workflow Retry. Because of that, you should not rely on storing the current Run Id, or using it for any logical choices, as a Workflow Retry changes the Run Id and can lead to non-determinism issues.

### Operations leading to non-determisim issues

Operations like, `ContinueAsNew`, `Retry`, `Cron`, and `Reset` creates a chain as identified by the [`first_execution_run_id`](https://github.com/temporalio/api/blob/master/temporal/api/history/v1/message.proto). Each operation creates a new Workflow Execution inside of Chain run and save its information as `first_execution_run_id`. Meaning, that the Run Id is updated during each operation on a Workflow Execution.

- The `first_execution_run_id` stays the same and its Run Id is the first Workflow Execution that occurs in the Chain run.
- The `original_execution_run_id` is the Run Id when the `WorkflowExecutionStarted` event writes.

A Workflow `Reset` changes the execution Run Id, but preservers the Original Execution Run Id. For example, when a new Execution in the chain starts, it stores its Run Id in the `original_execution_run_id`. A reset does not change that field, but the current Run Id is updated.

Because of that, you should not rely on the current Run Id in your code to make logical choices.

## Learn more links

For more information, see the following links.

- The [`message.proto`](https://github.com/temporalio/api/blob/master/temporal/api/history/v1/message.proto#L75-L82) file.
- The [Run Id](/workflows#run-id) section in the Workflow concept page.

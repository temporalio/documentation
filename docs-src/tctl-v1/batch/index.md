---
id: index
title: tctl batch
sidebar_label: batch
description: A tctl batch command enables you to affect multiple existing Workflow Executions with a single command.
tags:
  - tctl
---

**How to run a tctl batch command.**

A `tctl batch` command enables you to affect multiple existing [Workflow Executions](/concepts/what-is-a-workflow-execution) with a single command.
A batch job runs in the background and affects Workflow Executions one at a time.

Use [tctl batch start](/tctl-v1/batch/start) to start a batch job.

:::note

`tctl-v1` can run `batch` and `batch-v2` commands.

:::

When starting a batch job, you must provide a [List Filter](/concepts/what-is-a-list-filter) and the type of batch job that should occur.
Batch jobs run in the background and affect Workflow Executions one at a time.

The List Filter identifies the set of Workflow Executions to be affected by the batch job.
The `tctl batch start` command shows you how many Workflow Executions will be affected by the batch job and asks you to confirm before proceeding.

The batch type determines what other parameters you must provide and what is being affected.
There are three types of batch jobs:

- Signal: Send a Signal to the set of Workflow Executions that the List Filter specifies.
- Cancel: Cancel the set of Workflow Executions that the List Filter specifies.
- Terminate: Terminate the set of Workflow Executions that the List Filter specifies.

A successfully started batch job returns a Job ID.
You can use this Job ID in the `tctl batch describe` command, which describes the progress of a specific batch job.

You can also use the Job ID to terminate the batch job itself.
Terminating a batch job does not roll back the operations already performed by the batch job.

### tctl batch commands

- [tctl batch describe](/tctl-v1/batch/describe)
- [tctl batch list](/tctl-v1/batch/list)
- [tctl batch start](/tctl-v1/batch/start)
- [tctl batch terminate](/tctl-v1/batch/terminate)

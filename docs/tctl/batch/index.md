---
id: index
title: tctl batch
description: A tctl batch command enables you to affect multiple existing Workflow Executions with a single command.
tags:
  - reference
  - tctl
---

**How to run a tctl batch command.**

A tctl batch command enables you to affect multiple existing [Workflow Executions](/docs/concepts/what-is-a-workflow-execution) with a single command.

Use [tctl batch start](/docs/tctl/batch/start) to start a batch job.

When starting a batch job, you must provide a [List Filter](/docs/concepts/what-is-a-list-filter) and the type of batch job that should occur.
Batch jobs run in the background and affect the Workflow Executions one at a time.

The List Filter is used to identify the set of Workflow Executions that will be affected by the batch job.
The batch command will show you how many Workflow Executions will be affect by the batch job and ask you to confirm to proceed.

The batch type determines what other parameters you must provide and what is being affected.
There are three types of batch jobs:

- Signal: Send a Signal to the set of Workflow Executions (set is determined by the List Filter).
- Cancel: Cancel a set of Workflow Executions (set is determined by the List Filter).
- Terminate: Terminate a set of Workflow Executions (set is determined by the List Filter).

A successfully started batch job will return a Job ID.
You can use this Job ID in the `batch describe` command, which describes the progress of a specific batch job.

You can also use the Job ID to terminate the batch job itself.
Terminating a batch job does not roll back the operations already performed by the batch job.

### batch commands

- [`tctl batch start`](/docs/tctl/batch/start)
- [`tctl batch list`](/docs/tctl/batch/list)
- [`tctl batch describe`](/docs/tctl/batch/describe)
- [`tctl batch terminate`](/docs/tctl/batch/terminate)

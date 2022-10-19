---
id: index
title: tctl batch
sidebar_label: batch
description: How to run a tctl batch command. A tctl batch command enables you to affect multiple existing Workflow Executions with a single command.
tags:
  - tctl
---

A "batch" command enables you to affect multiple existing [Workflow Executions](/concepts/what-is-a-workflow-execution) with a single command.
A batch job runs in the background and affects Workflow Executions one at a time.

In tctl version-next you can run the typical Signal Workflow, Terminate Workflow, and Cancel Workflow batch jobs using the `tctl workflow signal`, `tctl workflow terminate`, and `tctl workflow cancel` commands respectively.
The batch command is automatically started when the [`--query` modifier](/tctl-next/modifiers#--query) is provided with those commands.

In tctl version-next, the `tctl batch` commands are used solely to view the status of and terminate the batch jobs.

The `--query` modifier supports a [List Filter](/concepts/what-is-a-list-filter).
The List Filter identifies the set of Workflow Executions to be affected by the command.

A successfully started batch job returns a Job ID.
You can use this Job ID in the `tctl batch describe` command, which describes the progress of a specific batch job.

You can also use the Job ID to terminate the batch job itself.
Terminating a batch job does not roll back the operations already performed by the batch job.

### tctl batch commands

- [`tctl batch describe`](/tctl-next/batch#describe)
- [`tctl batch list`](/tctl-next/batch#list)
- [`tctl batch terminate`](/tctl-next/batch#terminate)
- [`tctl workflow signal --query ...`](/tctl-next/workflow/signal)
- [`tctl workflow terminate --query ...`](/tctl-next/workflow/terminate)
- [`tctl workflow cancel --query ...`](/tctl-next/workflow/cancel)

---
id: cancel
title: tctl workflow cancel
sidebar_label: cancel
description: How to cancel a Workflow Execution using tctl.
tags:
  - tctl
---

The `tctl workflow cancel` command cancels a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Canceling a running Workflow Execution records a `WorkflowExecutionCancelRequested` event in the History.
A new command task will be scheduled.
After cancellation, the Workflow Execution can perform cleanup work.

See also [`tctl workflow terminate`](/tctl-v2/workflow#terminate).

`tctl workflow cancel <modifiers>`

The following modifiers are supported and control the behavior of the command.
Always include required modifiers when executing this command.

- [--run-id](/tctl-v2/modifiers#--run-id)
- [--workflow-id](/tctl-v2/modifiers#--workflow-id)

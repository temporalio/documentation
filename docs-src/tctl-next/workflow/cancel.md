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

The use of the [`--query` modifier](/tctl-next/modifiers#--query) (`tctl workflow cancel --query`) automatically starts a [batch job](/tctl-next/batch) that cancels Workflow Executions according to the List Filter provided.

`tctl workflow cancel --query <value> <modifiers>`

The following modifiers are supported and control the behavior of the command.
Always include required modifiers when executing this command.

- [--namespace](/tctl-next/modifiers#--namespace)
- [--query](/tctl-next/modifiers#--query)
- [--reason](/tctl-next/modifiers#--reason)
- [--yes](/tctl-next/modifiers#--yes)

See also [`tctl workflow terminate`](/tctl-next/workflow#terminate).

---
id: terminate
title: tctl workflow terminate
sidebar_label: terminate
description: How to terminate a Workflow Execution using tctl.
tags:
  - tctl
---

The `tctl workflow terminate` command terminates a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Terminating a running Workflow Execution records a `WorkflowExecutionTerminated` event as the closing event in the History.
No more command tasks will be scheduled.

See also [`tctl workflow cancel`](/tctl-next/workflow#cancel).

The use of the [`--query` modifier](/tctl-next/modifiers#--query) (`tctl workflow terminate --query ...`) automatically starts a [batch job](/tctl-next/batch) that Terminates Workflow Executions according to the List Filter provided.

`tctl workflow terminate --query <value> <modifiers>`

The following modifiers are supported and control the behavior of the command.
Always include required modifiers when executing this command.

- [--namespace](/tctl-next/modifiers#--namespace)
- [--query](/tctl-next/modifiers#--query)
- [--reason](/tctl-next/modifiers#--reason)
- [--yes](/tctl-next/modifiers#--yes)

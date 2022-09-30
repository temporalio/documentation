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

See also [`tctl workflow cancel`](/tctl/workflow#cancel).

`tctl workflow terminate <modifiers>`

The following modifiers control the behavior of the command.

- [--reason](/tctl/modifiers#--reason)
- [--run-id](/tctl/modifiers#--run-id)
- [--workflow-id](/tctl/modifiers#--workflow-id)

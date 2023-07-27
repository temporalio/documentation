---
id: cancel
title: temporal workflow cancel
sidebar_label: cancel
description: Cancel a Workflow Execution.
tags:
  - cli-reference
---

The `temporal workflow cancel` command cancels a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Canceling a running Workflow Execution records a [`WorkflowExecutionCancelRequested` event](/references/events#workflow-execution-cancel-requested) in the [Event History](/concepts/what-is-an-event-history).
A new [Workflow Task](/concepts/what-is-a-workflow-task) will be scheduled, and the Workflow Execution performs cleanup work.

`temporal workflow cancel --workflow-id=meaningful-business-id`

In addition to Workflow IDs, Workflows can also be [Signaled](/concepts/what-is-a-signal) by a [Query](/concepts/what-is-a-query).
`temporal workflow cancel --query=MyQuery`

Use the options listed below to change the behavior of this command.

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--query](/cli/cmd-options/query)

- [--reason](/cli/cmd-options/reason)

- [--run-id](/cli/cmd-options/run-id)

- [--time-format](/cli/cmd-options/time-format)

- [--workflow-id](/cli/cmd-options/workflow-id)

- [--yes](/cli/cmd-options/yes)

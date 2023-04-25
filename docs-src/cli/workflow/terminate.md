---
id: terminate
title: temporal workflow terminate
sidebar_label: terminate
description: Terminate Workflow Execution by Id or List Filter.
tags:
    - cli
---

The `temporal workflow terminate` command terminates a [Workflow Execution](/concepts/what-is-a-workflow-execution)

Terminating a running Workflow Execution records a [`WorkflowExecutionTerminated` event](/references/events#workflowexecutionterminated) as the closing Event in the [Event History](/concepts/what-is-an-event-history).
Any further [Command](/concepts/what-is-a-command) Tasks cannot be scheduled after running this command.

Workflow terminations require a valid [Workflow ID](/concepts/what-is-a-workflow-id) to function.
`temporal workflow terminate --workflow-id=meaningful-business-id`

Use the options listed below to change termination behavior.

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

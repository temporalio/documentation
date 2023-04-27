---
id: reset
title: temporal workflow reset
sidebar_label: reset
description: Resets a Workflow Execution by Event Id or reset type.
tags:
    - cli
---

The `temporal workflow reset` command resets a [Workflow Execution](/concepts/what-is-a-workflow-execution).
A reset allows the Workflow to be resumed from a certain point without losing your parameters or [Event History](/concepts/what-is-an-event-history).

The Workflow Execution can be set to a given [Event Type](/concepts/what-is-an-event).
`temporal workflow reset --workflow-id=meaningful-business-id --type=LastContinuedAsNew`

Alternatively, the Workflow Execution can be reset to any Event after WorkflowTaskStarted.
`temporal workflow reset --workflow-id=meaningful-business-id --event-id=MyLastEvent`

Use the options listed below to change reset behavior.

- [--event-id](/cli/cmd-options/event-id)

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--reapply-type](/cli/cmd-options/reapply-type)

- [--reason](/cli/cmd-options/reason)

- [--run-id](/cli/cmd-options/run-id)

- [--time-format](/cli/cmd-options/time-format)

- [--type](/cli/cmd-options/type)

- [--workflow-id](/cli/cmd-options/workflow-id)

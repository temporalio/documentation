---
id: describe
title: temporal workflow describe
sidebar_label: describe
description: Show information about a Workflow Execution.
tags:
  - cli reference
---

The `temporal workflow describe` command shows information about a given [Workflow Execution](/concepts/what-is-a-workflow-execution).
This information can be used to locate Workflow Executions that weren't able to run successfully.

`temporal workflow describe --workflow-id=meaningful-business-id`

The output of this command can be changed to show as printed ('raw') or to only show the Workflow Execution's auto-reset points.

`temporal workflow describe --workflow-id=meaningful-business-id --raw=true --reset-points=true`

Use the command options listed below to change the information returned by this command.

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--raw](/cli/cmd-options/raw)

- [--reset-points](/cli/cmd-options/reset-points)

- [--run-id](/cli/cmd-options/run-id)

- [--time-format](/cli/cmd-options/time-format)

- [--workflow-id](/cli/cmd-options/workflow-id)

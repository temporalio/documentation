---
id: delete
title: temporal schedule delete
sidebar_label: delete
description: Deletes a Schedule.
tags:
    - cli
---

The `temporal schedule delete` command deletes a [Schedule](/concepts/what-is-a-schedule).
Deleting a Schedule does not affect any [Workflows](/concepts/what-is-a-workflow) started by the Schedule.

[Workflow Executions](/concepts/what-is-a-workflow-execution) started by Schedules can be cancelled or terminated like other Workflow Executions.
However, Workflow Executions started by a Schedule can be identified by their [Search Attributes](/concepts/what-is-a-search-attribute), making them targetable by batch command for termination.

`temporal schedule delete --schedule-id 'your-schedule-id' [command options]`

Use the options below to change the behavior of this command.

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--schedule-id](/cli/cmd-options/schedule-id)

- [--time-format](/cli/cmd-options/time-format)

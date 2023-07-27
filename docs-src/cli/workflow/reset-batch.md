---
id: reset-batch
title: temporal workflow reset-batch
sidebar_label: reset-batch
description: Reset a batch of Workflow Executions by reset type (FirstWorkflowTask), LastWorkflowTask), LastContinuedAsNew
tags:
  - cli-reference
  - temporal-cli
  - workflow
---

The `temporal workflow reset-batch` command resets a batch of [Workflow Executions](/concepts/what-is-a-workflow-execution) by `resetType`.
Resetting a [Workflow](/concepts/what-is-a-workflow) allows the process to resume from a certain point without losing your parameters or [Event History](/concepts/what-is-an-event-history).

The set of Workflow Executions to reset can be specified in an input file.
The input file must have a [Workflow ID](/concepts/what-is-a-workflow-id) on each line.

`temporal workflow reset-batch --input-file=MyInput --input-separator="\t"`

Workflow Executions can also be found by [Query](/concepts/what-is-a-query).
`temporal workflow reset-batch --query=MyQuery

Use the options listed below to change reset behavior.

- [--dry-run](/cli/cmd-options/dry-run)

- [--exclude-file](/cli/cmd-options/exclude-file)

- [--fields](/cli/cmd-options/fields)

- [--input-file](/cli/cmd-options/input-file)

- [--input-parallelism](/cli/cmd-options/input-parallelism)

- [--input-separator](/cli/cmd-options/input-separator)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--non-deterministic](/cli/cmd-options/non-deterministic)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--query](/cli/cmd-options/query)

- [--reason](/cli/cmd-options/reason)

- [--skip-base-is-not-current](/cli/cmd-options/skip-base-is-not-current)

- [--skip-current-open](/cli/cmd-options/skip-current-open)

- [--time-format](/cli/cmd-options/time-format)

- [--type](/cli/cmd-options/type)

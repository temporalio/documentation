---
id: execute
title: temporal workflow execute
sidebar_label: execute
description: Start a new Workflow Execution and prints its progress.
tags:
  - cli-reference
---

The `temporal workflow execute` command starts a new [Workflow Execution](/concepts/what-is-a-workflow-execution) and prints its progress.
The command doesn't finish until the Workflow Execution completes.

To execute a [Workflow](/concepts/what-is-a-workflow) from the CLI:
`temporal workflow execute --workflow-id=meaningful-business-id --type=MyWorkflow --task-queue=MyTaskQueue`

Single quotes('') are used to wrap input as JSON.

`temporal workflow execute --workflow-id=meaningful-business-id --type-MyWorkflow --task-queue-MyTaskQueue --input='{"JSON": "Input"}'`

Use the command options listed below to change how the Workflow Execution behaves during its run.

- [--cron](/cli/cmd-options/cron)

- [--execution-timeout](/cli/cmd-options/execution-timeout)

- [--fields](/cli/cmd-options/fields)

- [--id-reuse-policy](/cli/cmd-options/id-reuse-policy)

- [--input](/cli/cmd-options/input)

- [--input-file](/cli/cmd-options/input-file)

- [--limit](/cli/cmd-options/limit)

- [--max-field-length](/cli/cmd-options/max-field-length)

- [--memo](/cli/cmd-options/memo)

- [--memo-file](/cli/cmd-options/memo-file)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--run-timeout](/cli/cmd-options/run-timeout)

- [--search-attribute](/cli/cmd-options/search-attribute)

- [--task-queue](/cli/cmd-options/task-queue)

- [--task-timeout](/cli/cmd-options/task-timeout)

- [--time-format](/cli/cmd-options/time-format)

- [--type](/cli/cmd-options/type)

- [--workflow-id](/cli/cmd-options/workflow-id)

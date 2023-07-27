---
id: start
title: temporal workflow start
sidebar_label: start
description: Starts a new Workflow Execution.
tags:
  - cli-reference
  - temporal-cli
  - workflow
---

The `temporal workflow start` command starts a new [Workflow Execution](/concepts/what-is-a-workflow-execution).
When invoked successfully, the Workflow and Run ID are returned immediately after starting the [Workflow](/concepts/what-is-a-workflow).

`temporal workflow start --task-queue=MyTaskQueue --type=MyWorkflow`

Use the command options listed below to change how the Workflow Execution behaves upon starting.

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

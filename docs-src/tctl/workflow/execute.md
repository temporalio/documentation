---
id: execute
title: tctl workflow execute
sidebar_label: execute
description: How to start a new Workflow Execution and get Workflow progress using tctl.
tags:
  - tctl
---

The `tctl workflow execute` command starts a new [Workflow Execution](/concepts/what-is-a-workflow-execution) and shows its progress until completion.

The command is entered in the following format:

`tctl workflow execute [modifiers]`

Single quotes (`''`) are used to wrap input as JSON.

The following modifiers are supported and control the behavior of the command.
Always include required modifiers when executing this command.

- [--cron](/tctl/modifiers/cron)
- [--execution-timeout](/tctl/modifiers/execution-timeout)
- [--fields](/tctl/modifiers/fields)
- [--input](/tctl/modifiers/input)
- [--input-file](/tctl/modifiers/input-file)
- [--limit](tctl/modifiers/limit)
- [--max-field-length](/tctl/modifiers/max-field-length)
- [--memo-key](/tctl/modifiers/memo-key)
- [--memo](/tctl/modifiers/memo)
- [--memo-file](/tctl/modifiers/memo-file)
- [--no-pager](/tctl/modifiers/no-pager)
- [--output](/tctl/modifiers/output)
- [--pager](/tctl/modifiers/pager)
- [--search-attribute-key](/tctl/modifiers/search-attribute-key)
- [--search-attribute-value](/tctl/modifiers/search-attribute-value)
- [--task-queue](/tctl/modifiers/task-queue)
- [--task-timeout](/tctl/modifiers/task-queue-timeout)
- [--time-format](/tctl/modifiers/time-format)
- [--type](/tctl/modifiers/type)
- [--workflow-id](/tctl/modifiers/workflow-id)
- [--workflow-id-reuse-policy](/tctl/modifiers/workflow-id-reuse-policy)

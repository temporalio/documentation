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

- [--cron](/tctl-v2/modifiers#--cron)
- [--execution-timeout](/tctl-v2/modifiers#--execution-timeout)
- [--fields](/tctl-v2/modifiers#--fields)
- [--input](/tctl-v2/modifiers#--input)
- [--input-file](/tctl-v2/modifiers#--input-file)
- [--limit](/tctl-v2/modifiers#--limit)
- [--max-field-length](/tctl-v2/modifiers#--max-field-length)
- [--memo-key](/tctl-v2/modifiers#--memo-key)
- [--memo](/tctl-v2/modifiers#--memo)
- [--memo-file](/tctl-v2/modifiers#--memo-file)
- [--no-pager](/tctl-v2/modifiers#--no-pager)
- [--output](/tctl-v2/modifiers#--output)
- [--pager](/tctl-v2/modifiers#--pager)
- [--search-attribute-key](/tctl-v2/modifiers#--search-attribute-key)
- [--search-attribute-value](/tctl-v2/modifiers#--search-attribute-value)
- [--task-queue](/tctl-v2/modifiers#--task-queue)
- [--task-timeout](/tctl-v2/modifiers#--task-timeout)
- [--time-format](/tctl-v2/modifiers#--time-format)
- [--type](/tctl-v2/modifiers#--type)
- [--workflow-id](/tctl-v2/modifiers#--workflow-id)
- [--workflow-id-reuse-policy](/tctl-v2/modifiers#--workflow-id-reuse-policy)

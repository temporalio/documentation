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

- [--cron](/tctl-next/modifiers#--cron)
- [--execution-timeout](/tctl-next/modifiers#--execution-timeout)
- [--fields](/tctl-next/modifiers#--fields)
- [--input](/tctl-next/modifiers#--input)
- [--input-file](/tctl-next/modifiers#--input-file)
- [--limit](/tctl-next/modifiers#--limit)
- [--max-field-length](/tctl-next/modifiers#--max-field-length)
- [--memo-key](/tctl-next/modifiers#--memo-key)
- [--memo](/tctl-next/modifiers#--memo)
- [--memo-file](/tctl-next/modifiers#--memo-file)
- [--no-pager](/tctl-next/modifiers#--no-pager)
- [--output](/tctl-next/modifiers#--output)
- [--pager](/tctl-next/modifiers#--pager)
- [--search-attribute-key](/tctl-next/modifiers#--search-attribute-key)
- [--search-attribute-value](/tctl-next/modifiers#--search-attribute-value)
- [--task-queue](/tctl-next/modifiers#--task-queue)
- [--task-timeout](/tctl-next/modifiers#--task-timeout)
- [--time-format](/tctl-next/modifiers#--time-format)
- [--type](/tctl-next/modifiers#--type)
- [--workflow-id](/tctl-next/modifiers#--workflow-id)
- [--workflow-id-reuse-policy](/tctl-next/modifiers#--workflow-id-reuse-policy)

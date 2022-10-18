---
id: list
title: tctl workflow list
sidebar_label: list
description: How to list open or closed Workflow Executions using tctl.
tags:
  - tctl
---

The `tctl workflow list` command lists open or closed [Workflow Executions](/concepts/what-is-a-workflow-execution).

By default, this command lists a maximum of 10 closed Workflow Executions.

- To set the number of items printed, use the `--limit` option.
- To specify fields to print, use the `--fields` option.
- To enable or disable a pager, use `--pager <value>` or `--no-pager`.

`tctl workflow list <modifiers>`

The following modifiers are supported and control the behavior of the command.

- [--archived](/tctl-next/modifiers#--archived)
- [--fields](/tctl-next/modifiers#--fields)
- [--limit](/tctl-next/modifiers#--limit)
- [--no-pager](/tctl-next/modifiers#--no-pager)
- [--output](/tctl-next/modifiers#--output)
- [--pager](/tctl-next/modifiers#--pager)
- [--query](/tctl-next/modifiers#--query)
- [--time-format](/tctl-next/modifiers#--time-format)

**Examples**

List all Workflows with the given WorkflowId or RunId:

```bash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" and (WorkflowId = "1645a588-4772-4dab-b276-5f9db108b3a8" or RunId = "be66519b-5f09-40cd-b2e8-20e4106244dc")'
```

List all open Workflows that started at a given time:

```bash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" StartTime > "2019-06-07T16:46:34-08:00" and ExecutionStatus = "Running"'
```

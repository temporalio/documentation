---
id: scan
title: tctl workflow scan
sidebar_label: scan
description: How to quickly list Workflow Executions without sorting using tctl.
tags:
  - tctl
---

The `tctl workflow scan` command lists [Workflow Executions](/concepts/what-is-a-workflow-execution).

By default, this command lists a maximum of 2000 Workflow Executions.
To set the size of a page, use the `--pagesize` option.

See also [`tctl workflow list`](/tctl-next/workflow#list).

`tctl workflow scan <modifiers>`

The following modifiers control the behavior of the command.

- [--fields](/tctl-next/modifiers#--fields)
- [--limit](/tctl-next/modifiers#--limit)
- [--no-pager](/tctl-next/modifiers#--no-pager)
- [--output](/tctl-next/modifiers#--output)
- [--pager](/tctl-next/modifiers#--pager)
- [--query](/tctl-next/modifiers#--query)
- [--time-format](/tctl-next/modifiers#--time-format)

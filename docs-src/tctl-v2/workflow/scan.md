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

See also [`tctl workflow list`](/tctl-v2/workflow#list).

`tctl workflow scan <modifiers>`

The following modifiers control the behavior of the command.

- [--fields](/tctl-v2/modifiers#--fields)
- [--limit](/tctl-v2/modifiers#--limit)
- [--no-pager](/tctl-v2/modifiers#--no-pager)
- [--output](/tctl-v2/modifiers#--output)
- [--pager](/tctl-v2/modifiers#--pager)
- [--query](/tctl-v2/modifiers#--query)
- [--time-format](/tctl-v2/modifiers#--time-format)

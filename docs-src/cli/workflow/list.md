---
id: list
title: temporal workflow list
sidebar_label: list
description: List Workflow Executions based on a Query.
tags:
  - cli-reference
  - temporal-cli
  - workflow
---

The `temporal workflow list` command provides a list of [Workflow Executions](/concepts/what-is-a-workflow-execution) that meet the criteria of a given [Query](/concepts/what-is-a-query).
By default, this command returns a list of up to 10 closed Workflow Executions.

`temporal workflow list --query=MyQuery`

The command can also return a list of archived Workflow Executions.

`temporal workflow list --archived=true`

Use the command options listed below to change the information returned by this command.

- [--archived](/cli/cmd-options/archived)

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--query](/cli/cmd-options/query)

- [--time-format](/cli/cmd-options/time-format)

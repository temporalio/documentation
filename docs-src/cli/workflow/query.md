---
id: query
title: temporal workflow query
sidebar_label: query
description: Query a Workflow Execution.
tags:
  - cli reference
  - temporal cli
  - workflow
  - command-line-interface-cli
  - workflow query
  - query
---

The `temporal workflow query` command sends a [Query](/concepts/what-is-a-query) to a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Queries can retrieve all or part of the Workflow state within given parameters.
Queries can also be used on completed [Workflows](/concepts/what-is-a-workflow-execution).

`temporal workflow query --workflow-id=meaningful-business-id --type=MyQueryType`

Use the command options listed below to change the information returned by this command.

- [--fields](/cli/cmd-options/fields)

- [--input](/cli/cmd-options/input)

- [--input-file](/cli/cmd-options/input-file)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--reject-condition](/cli/cmd-options/reject-condition)

- [--run-id](/cli/cmd-options/run-id)

- [--time-format](/cli/cmd-options/time-format)

- [--type](/cli/cmd-options/type)

- [--workflow-id](/cli/cmd-options/workflow-id)

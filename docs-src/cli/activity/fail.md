---
id: fail
title: temporal activity fail
sidebar_label: fail
description: Fails an Activity.
tags: cli reference, temporal-cli, activity, activity execution, workflow, cli-feature, command-line-interface-cli
---

The `temporal activity fail` command fails an [Activity Execution](/concepts/what-is-an-activity-execution).
The Activity must already be running on a valid [Workflow](/concepts/what-is-a-workflow).
`temporal fail --workflow-id=meaningful-business-id --activity-id=MyActivity`

Use the options listed below to change the behavior of this command.

- [--activity-id](/cli/cmd-options/activity-id)

- [--detail](/cli/cmd-options/detail)

- [--fields](/cli/cmd-options/fields)

- [--identity](/cli/cmd-options/identity)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--reason](/cli/cmd-options/reason)

- [--run-id](/cli/cmd-options/run-id)

- [--time-format](/cli/cmd-options/time-format)

- [--workflow-id](/cli/cmd-options/workflow-id)

---
id: trigger
title: temporal schedule trigger
sidebar_label: trigger
description: Triggers an immediate action.
tags:
  - cli reference
  - temporal cli
  - schedule
  - command-line-interface-cli
  - schedule trigger
---

The `temporal schedule trigger` command triggers an immediate action with a given [Schedule](/concepts/what-is-a-schedule).
By default, this action is subject to the Overlap Policy of the Schedule.

Schedule triggers are passed in this format:
`temporal schedule trigger` can be used to start a Workflow Run immediately.
`temporal schedule trigger --schedule-id 'your-schedule-id'`

The Overlap Policy of the Schedule can be overridden as well.
`temporal schedule trigger --schedule-id 'your-schedule-id' --overlap-policy 'AllowAll'`

Use the options provided below to change this command's behavior.

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--overlap-policy](/cli/cmd-options/overlap-policy)

- [--pager](/cli/cmd-options/pager)

- [--schedule-id](/cli/cmd-options/schedule-id)

- [--time-format](/cli/cmd-options/time-format)

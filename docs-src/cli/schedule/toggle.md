---
id: toggle
title: temporal schedule toggle
sidebar_label: toggle
description: Pauses or unpauses a Schedule.
tags:
  - cli-reference
---

The `temporal schedule toggle` command can pause and unpause a [Schedule](/concepts/what-is-a-schedule).

Toggling a Schedule requires a reason to be entered on the command line.
Use `--reason` to note the issue leading to the pause or unpause.

Schedule toggles are passed in this format:
`temporal schedule toggle --schedule-id 'your-schedule-id' --pause --reason "paused because the database is down"`
`temporal schedule toggle --schedule-id 'your-schedule-id' --unpause --reason "the database is back up"`

Use the options provided below to change this command's behavior.

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--pause](/cli/cmd-options/pause)

- [--reason](/cli/cmd-options/reason)

- [--schedule-id](/cli/cmd-options/schedule-id)

- [--time-format](/cli/cmd-options/time-format)

- [--unpause](/cli/cmd-options/unpause)

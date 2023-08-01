---
id: update
title: temporal schedule update
sidebar_label: update
description: Updates a Schedule with a new definition (full replacement, not patch).
tags:
  - cli reference
---

The `temporal schedule update` command updates an existing [Schedule](/concepts/what-is-a-schedule).

Like `temporal schedule create`, updated Schedules need to follow a certain format:

```
temporal schedule update 			    \
    --schedule-id 'your-schedule-id' 	\
    --workflow-id 'your-workflow-id' 	\
    --task-queue 'your-task-queue' 		\
    --workflow-type 'YourWorkflowType'
```

Updating a Schedule takes the given options and replaces the entire configuration of the Schedule with what's provided.
If you only change one value of the Schedule, be sure to provide the other unchanged fields to prevent them from being overwritten.

Use the options provided below to change the command's behavior.

- [--calendar](/cli/cmd-options/calendar)

- [--catchup-window](/cli/cmd-options/catchup-window)

- [--cron](/cli/cmd-options/cron)

- [--end-time](/cli/cmd-options/end-time)

- [--execution-timeout](/cli/cmd-options/execution-timeout)

- [--fields](/cli/cmd-options/fields)

- [--input](/cli/cmd-options/input)

- [--input-file](/cli/cmd-options/input-file)

- [--interval](/cli/cmd-options/interval)

- [--jitter](/cli/cmd-options/jitter)

- [--limit](/cli/cmd-options/limit)

- [--max-field-length](/cli/cmd-options/max-field-length)

- [--memo](/cli/cmd-options/memo)

- [--memo-file](/cli/cmd-options/memo-file)

- [--no-pager](/cli/cmd-options/no-pager)

- [--notes](/cli/cmd-options/notes)

- [--output](/cli/cmd-options/output)

- [--overlap-policy](/cli/cmd-options/overlap-policy)

- [--pager](/cli/cmd-options/pager)

- [--pause](/cli/cmd-options/pause)

- [--pause-on-failure](/cli/cmd-options/pause-on-failure)

- [--remaining-actions](/cli/cmd-options/remaining-actions)

- [--run-timeout](/cli/cmd-options/run-timeout)

- [--schedule-id](/cli/cmd-options/schedule-id)

- [--search-attribute](/cli/cmd-options/search-attribute)

- [--start-time](/cli/cmd-options/start-time)

- [--task-queue](/cli/cmd-options/task-queue)

- [--task-timeout](/cli/cmd-options/task-timeout)

- [--time-format](/cli/cmd-options/time-format)

- [--time-zone](/cli/cmd-options/time-zone)

- [--workflow-id](/cli/cmd-options/workflow-id)

- [--workflow-type](/cli/cmd-options/workflow-type)

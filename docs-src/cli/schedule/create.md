---
id: create
title: temporal schedule create
sidebar_label: create
description: Create a new Schedule.
tags:
    - cli
---

The `temporal schedule create` command creates a new [Schedule](/concepts/what-is-a-schedule).
Newly created Schedules return a Schedule ID to be used in other Schedule commands.

Schedules need to follow a format like the example shown here:

```
temporal schedule create \
    --schedule-id 'your-schedule-id' \
    --workflow-id 'your-workflow-id' \
    --task-queue 'your-task-queue' \
    --workflow-type 'YourWorkflowType'
```

Any combination of `--calendar`, `--interval`, and `--cron` is supported.
Actions will be executed at any time specified in the Schedule.

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

---
id: create
title: temporal schedule create
sidebar_label: create
description: Create a new Schedule.
tags:
  - cli reference
  - temporal cli
  - schedule
  - command-line-interface-cli
  - schedule create
---

The `temporal schedule create` command creates a new [Schedule](/concepts/what-is-a-schedule).
Newly created Schedules return a Schedule ID to be used in other Schedule commands.

Schedules are set in the following format:

```
temporal schedule create \
    --schedule-id 'your-schedule-id' \
    --workflow-id 'your-workflow-id' \
    --task-queue 'your-task-queue' \
    --workflow-type 'YourWorkflowType'
```

Actions are executed at the times specified in the Schedule.
For example, the following Schedule starts a Workflow every 5 hours at 15 minutes past the hour.
A Workflow is also started at 11:03 on Fridays.

```
temporal schedule create \
    --schedule-id 'your-schedule-id' \
    --interval '5h/15m' \
    --calendar '{"dayOfWeek":"Fri","hour":"11","minute":"3"}' \
    --overlap-policy 'BufferAll' \
    --workflow-id 'your-workflow-id' \
    --task-queue 'your-task-queue' \
    --workflow-type 'YourWorkflowType'
```

Workflows don't run in parallel.
Setting the `--overlap-policy` to 'BufferAll' allows Workflows to run sequentially if they would overlap.

Any combination of `--calendar`, `--interval`, and `--cron` is supported.
Traditional cron strings, along with `CronSchedule` features, are also supported.

```
temporal schedule create \
    --schedule-id 'your-schedule-id' \
    --cron '3 11 * * Fri' \
    --workflow-id 'your-workflow-id' \
    --task-queue 'your-task-queue' \
    --workflow-type 'YourWorkflowType'
```

Use the following options to change this command's behavior.

- [--address](/cli/cmd-options/address)

- [--calendar](/cli/cmd-options/calendar)

- [--catchup-window](/cli/cmd-options/catchup-window)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--cron](/cli/cmd-options/cron)

- [--end-time](/cli/cmd-options/end-time)

- [--env](/cli/cmd-options/env)

- [--execution-timeout](/cli/cmd-options/execution-timeout)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--input](/cli/cmd-options/input)

- [--input-file](/cli/cmd-options/input-file)

- [--interval](/cli/cmd-options/interval)

- [--jitter](/cli/cmd-options/jitter)

- [--max-field-length](/cli/cmd-options/max-field-length)

- [--memo](/cli/cmd-options/memo)

- [--memo-file](/cli/cmd-options/memo-file)

- [--namespace](/cli/cmd-options/namespace)

- [--notes](/cli/cmd-options/notes)

- [--overlap-policy](/cli/cmd-options/overlap-policy)

- [--pause](/cli/cmd-options/pause)

- [--pause-on-failure](/cli/cmd-options/pause-on-failure)

- [--remaining-actions](/cli/cmd-options/remaining-actions)

- [--run-timeout](/cli/cmd-options/run-timeout)

- [--schedule-id](/cli/cmd-options/schedule-id)

- [--search-attribute](/cli/cmd-options/search-attribute)

- [--start-time](/cli/cmd-options/start-time)

- [--task-queue](/cli/cmd-options/task-queue)

- [--task-timeout](/cli/cmd-options/task-timeout)

- [--time-zone](/cli/cmd-options/time-zone)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--workflow-id](/cli/cmd-options/workflow-id)

- [--workflow-type](/cli/cmd-options/workflow-type)

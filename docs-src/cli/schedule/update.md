---
id: update
title: temporal schedule update
sidebar_label: update
description: Updates a Schedule with a new definition (full replacement, not patch).
tags:
  - cli reference
  - temporal cli
  - schedule
  - command-line-interface-cli
  - schedule update
  - updates
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
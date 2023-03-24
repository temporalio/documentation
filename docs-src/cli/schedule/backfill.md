---
id: backfill
title: temporal schedule backfill
sidebar_label: backfill
description: Backfills a past time range of actions.
tags:
    - cli
---

The `temporal schedule backfill` command executes Actions ahead of their specified time range.
Backfilling can be used to fill in [Workflow Runs](/concepts/what-is-a-run-id) from a time period when the Schedule was paused, or from before the Schedule was created.

```
temporal schedule backfill --sid 'your-schedule-id' \
--overlap-policy 'BufferAll' 				\
--start-time '2022-05-0101T00:00:00Z'		\
--end-time '2022-05-31T23:59:59Z'
```

Use the options provided below to change this command's behavior.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--end-time](/cli/cmd-options/end-time)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--overlap-policy](/cli/cmd-options/overlap-policy)

- [--schedule-id](/cli/cmd-options/schedule-id)

- [--start-time](/cli/cmd-options/start-time)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

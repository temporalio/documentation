---
id: describe
title: temporal task-queue describe
sidebar_label: describe
description: Describes the Workers that have recently polled on this Task Queue.
tags:
  - cli reference
  - temporal cli
  - task queue
  - command-line-interface-cli
  - task queue describe
---

The `temporal task-queue describe` command provides [poller](/dev-guide/worker-performance#poller-count) information for a given [Task Queue](/concepts/what-is-a-task-queue).

The [Server](/concepts/what-is-the-temporal-server) records the last time of each poll request.
A `LastAccessTime` value in excess of one minute can indicate the Worker is at capacity (all Workflow and Activity slots are full) or that the Worker has shut down.
[Workers](/concepts/what-is-a-worker) are removed if 5 minutes have passed since the last poll request.

Information about the Task Queue can be returned to troubleshoot server issues.

`temporal task-queue describe --task-queue=MyTaskQueue --task-queue-type="activity"`

Use the options listed below to modify what this command returns.

- [--fields](/cli/cmd-options/fields)
- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--fields](/cli/cmd-options/fields)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--output](/cli/cmd-options/output)

- [--task-queue](/cli/cmd-options/task-queue)

- [--task-queue-type](/cli/cmd-options/task-queue-type)

- [--time-format](/cli/cmd-options/time-format)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

---
id: reset-batch
title: temporal workflow reset-batch
sidebar_label: reset-batch
description: Reset a batch of Workflow Executions by reset type (LastContinuedAsNew, FirstWorkflowTask, LastWorkflowTask).
tags:
	- cli
---

The `temporal workflow reset-batch` command resets a batch of [Workflow Executions](/concepts/what-is-a-workflow-execution) by `resetType`.
Resetting a [Workflow](/concepts/what-is-a-workflow) allows the process to resume from a certain point without losing your parameters or [Event History](/concepts/what-is-an-event-history).

Use the options listed below to change reset behavior.
Make sure to write the command as follows:
`temporal workflow reset-batch [command options] [arguments]`

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--dry-run](/cli/cmd-options/dry-run)

- [--env](/cli/cmd-options/env)

- [--exclude-file](/cli/cmd-options/exclude-file)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--input-file](/cli/cmd-options/input-file)

- [--input-parallelism](/cli/cmd-options/input-parallelism)

- [--input-separator](/cli/cmd-options/input-separator)

- [--namespace](/cli/cmd-options/namespace)

- [--non-deterministic](/cli/cmd-options/non-deterministic)

- [--query](/cli/cmd-options/query)

- [--reason](/cli/cmd-options/reason)

- [--skip-base-is-not-current](/cli/cmd-options/skip-base-is-not-current)

- [--skip-current-open](/cli/cmd-options/skip-current-open)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--type](/cli/cmd-options/type)

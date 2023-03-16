---
id: cancel
title: temporal workflow cancel
sidebar_label: cancel
description: Cancel a Workflow Execution.
tags:
	- cli
---

The `temporal workflow cancel` command cancels a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Canceling a running Workflow Execution records a [`WorkflowExecutionCancelRequested` event](/references/events#workflow-execution-cancel-requested) in the [Event History](/concepts/what-is-an-event-history).
A new [Command](/concepts/what-is-a-command) Task will be scheduled, and the Workflow Execution performs cleanup work.

Use the options listed below to change the behavior of this command.
Make sure to write the command as follows:
`temporal workflow cancel [command options]`

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--query](/cli/cmd-options/query)

- [--reason](/cli/cmd-options/reason)

- [--run-id](/cli/cmd-options/run-id)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--workflow-id](/cli/cmd-options/workflow-id)

- [--yes](/cli/cmd-options/yes)

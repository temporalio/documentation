---
id: reset
title: temporal workflow reset
sidebar_label: reset
description: Resets a Workflow Execution by Event Id or reset type.
tags:
	- cli
---

The `temporal workflow reset` command resets a [Workflow Execution](/concepts/what-is-a-workflow-execution).
A reset allows the Workflow to be resumed from a certain point without losing your parameters or [Event History](/concepts/what-is-an-event-history).

Use the options listed below to change reset behavior.
Make sure to write the command as follows:
`temporal workflow reset [command options] [arguments]`

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--event-id](/cli/cmd-options/event-id)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--reapply-type](/cli/cmd-options/reapply-type)

- [--reason](/cli/cmd-options/reason)

- [--run-id](/cli/cmd-options/run-id)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--type](/cli/cmd-options/type)

- [--workflow-id](/cli/cmd-options/workflow-id)

---
id: stack
title: temporal workflow stack
sidebar_label: stack
description: Query a Workflow Execution with __stack_trace as the query type.
tags:
	- cli
---

The `temporal workflow stack` command queries a [Workflow Execution](/concepts/what-is-a-workflow-execution) with `--stack-trace` as the [Query](/concepts/what-is-a-query#stack-trace-query) type.
Returning the stack trace of all the threads owned by a Workflow Execution can be great for troubleshooting in production.

Use the options listed below to change the command's behavior.
Make sure to write the command as follows:
`temporal workflow stack [command options] [arguments]`

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--input](/cli/cmd-options/input)
For multiple parameters, concatenate them and separate by space.

- [--input-file](/cli/cmd-options/input-file)
If there are multiple JSON, concatenate them and separate by space or newline.
Input from the command line will overwrite file input.

- [--namespace](/cli/cmd-options/namespace)

- [--reject-condition](/cli/cmd-options/reject-condition)

- [--run-id](/cli/cmd-options/run-id)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--workflow-id](/cli/cmd-options/workflow-id)


---
id: describe
title: temporal workflow describe
sidebar_label: describe
description: Show information about a Workflow Execution.
tags:
  - cli reference
  - temporal cli
  - workflow
  - command-line-interface-cli
  - workflow describe
---

The `temporal workflow describe` command shows information about a given [Workflow Execution](/concepts/what-is-a-workflow-execution).
This information can be used to locate Workflow Executions that weren't able to run successfully.

`temporal workflow describe --workflow-id=meaningful-business-id`

The output of this command can be changed to show as printed ('raw') or to only show the Workflow Execution's auto-reset points.

`temporal workflow describe --workflow-id=meaningful-business-id --raw=true --reset-points=true`

Use the command options listed below to change the information returned by this command.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--raw](/cli/cmd-options/raw)

- [--reset-points](/cli/cmd-options/reset-points)

- [--run-id](/cli/cmd-options/run-id)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--workflow-id](/cli/cmd-options/workflow-id)

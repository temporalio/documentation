---
id: query
title: temporal workflow query
sidebar_label: query
description: Query a Workflow Execution.
tags:
  - cli reference
  - temporal cli
  - workflow
  - command-line-interface-cli
  - workflow query
  - query
---

The `temporal workflow query` command sends a [Query](/concepts/what-is-a-query) to a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Queries can retrieve all or part of the Workflow state within given parameters.
Queries can also be used on completed [Workflows](/concepts/what-is-a-workflow-execution).

`temporal workflow query --workflow-id=meaningful-business-id --type=MyQueryType`

Use the following command options to change the information returned by this command.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--input](/cli/cmd-options/input)

- [--input-file](/cli/cmd-options/input-file)

- [--namespace](/cli/cmd-options/namespace)

- [--reject-condition](/cli/cmd-options/reject-condition)

- [--run-id](/cli/cmd-options/run-id)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--type](/cli/cmd-options/type)

- [--workflow-id](/cli/cmd-options/workflow-id)

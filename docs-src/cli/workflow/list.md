---
id: list
title: temporal workflow list
sidebar_label: list
description: List Workflow Executions based on a Query.
tags:
  - cli reference
  - temporal cli
  - workflow
  - command-line-interface-cli
  - workflow list
---

The `temporal workflow list` command provides a list of [Workflow Executions](/concepts/what-is-a-workflow-execution) that meet the criteria of a given [Query](/concepts/what-is-a-query).
By default, this command returns a list of up to 10 closed Workflow Executions.

`temporal workflow list --query=MyQuery`

The command can also return a list of archived Workflow Executions.

`temporal workflow list --archived=true`

Use the following command options to change the information returned by this command.

- [--address](/cli/cmd-options/address)

- [--archived](/cli/cmd-options/archived)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--fields](/cli/cmd-options/fields)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--limit](/cli/cmd-options/limit)

- [--namespace](/cli/cmd-options/namespace)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--query](/cli/cmd-options/query)

- [--time-format](/cli/cmd-options/time-format)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

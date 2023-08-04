---
id: delete
title: temporal schedule delete
sidebar_label: delete
description: Deletes a Schedule.
tags:
  - cli reference
  - temporal cli
  - schedule
  - command-line-interface-cli
  - schedule delete
---

The `temporal schedule delete` command deletes a [Schedule](/concepts/what-is-a-schedule).
Deleting a Schedule does not affect any [Workflows](/concepts/what-is-a-workflow) started by the Schedule.

[Workflow Executions](/concepts/what-is-a-workflow-execution) started by Schedules can be cancelled or terminated like other Workflow Executions.
However, Workflow Executions started by a Schedule can be identified by their [Search Attributes](/concepts/what-is-a-search-attribute), making them targetable by batch command for termination.

`temporal schedule delete --schedule-id 'your-schedule-id' [command options]`

Use the options below to change the behavior of this command.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--schedule-id](/cli/cmd-options/schedule-id)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

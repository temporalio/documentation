---
id: trigger
title: temporal schedule trigger
sidebar_label: trigger
description: Triggers an immediate action.
tags:
  - cli reference
  - temporal cli
  - schedule
  - command-line-interface-cli
  - schedule trigger
---

The `temporal schedule trigger` command triggers an immediate action with a given [Schedule](/concepts/what-is-a-schedule).
By default, this action is subject to the Overlap Policy of the Schedule.

Schedule triggers are passed in this format:
`temporal schedule trigger` can be used to start a Workflow Run immediately.
`temporal schedule trigger --schedule-id 'your-schedule-id'`

The Overlap Policy of the Schedule can be overridden as well.
`temporal schedule trigger --schedule-id 'your-schedule-id' --overlap-policy 'AllowAll'`

Use the options provided below to change this command's behavior.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--overlap-policy](/cli/cmd-options/overlap-policy)

- [--schedule-id](/cli/cmd-options/schedule-id)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

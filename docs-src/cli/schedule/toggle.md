---
id: toggle
title: temporal schedule toggle
sidebar_label: toggle
description: Pauses or unpauses a Schedule.
tags:
  - cli reference
  - temporal cli
  - schedule
  - command-line-interface-cli
  - schedule toggle
---

The `temporal schedule toggle` command can pause and unpause a [Schedule](/concepts/what-is-a-schedule).

Toggling a Schedule requires a reason to be entered on the command line.
Use `--reason` to note the issue leading to the pause or unpause.

Schedule toggles are passed in this format:
`temporal schedule toggle --schedule-id 'your-schedule-id' --pause --reason "paused because the database is down"`
`temporal schedule toggle --schedule-id 'your-schedule-id' --unpause --reason "the database is back up"`

Use the following options to change this command's behavior.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--pause](/cli/cmd-options/pause)

- [--reason](/cli/cmd-options/reason)

- [--schedule-id](/cli/cmd-options/schedule-id)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--unpause](/cli/cmd-options/unpause)

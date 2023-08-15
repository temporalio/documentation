---
id: set
title: temporal env set
sidebar_label: set
description: Set environmental properties.
tags:
  - cli reference
  - temporal cli
  - environment
  - env set
  - command-line-interface-cli
---

The `temporal env set` command sets the value for an environmental property.
Property names match CLI option names.

`temporal env set prod.tls-cert-path /home/my-user/certs/cluster.cert`

Properties can be set for the entire system, such as the frontend address:
`temporal env set local.address 127.0.0.1:7233`

Use the following options to change the command's behavior.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

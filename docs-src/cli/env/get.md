---
id: get
title: temporal env get
sidebar_label: get
description: Prints environmental properties.
tags:
  - cli reference
  - temporal cli
  - environment
  - env get
  - command-line-interface-cli
---

The `temporal env get` command prints the environmental properties for the environment in use.

For example, passing the 'local' [Namespace](/concepts/what-is-a-namespace) returns the name, address, and certificate paths for the local environment.
`temporal env get local`
`Output: tls-cert-path  /home/my-user/certs/cluster.cert tls-key-path   /home/my-user/certs/cluster.key address        127.0.0.1:7233 namespace      accounting`

Output can be narrowed down to a specific option.
`temporal env get local.tls-key-path`
`tls-key-path  /home/my-user/certs/cluster.key`

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

---
id: upsert
title: temporal operator cluster upsert
sidebar_label: upsert
description: Add or update a remote Cluster.
tags:
  - cli reference
  - temporal cli
  - operator
  - command-line-interface-cli
  - cluster
  - cluster upsert
---

The `temporal operator cluster upsert` command allows the user to add or update a remote [Cluster](/concepts/what-is-a-temporal-cluster).
`temporal operator cluster upsert --frontend-address="127.0.2.1"`

Upserting can also be used to enable or disabled cross-cluster connection.
`temporal operator cluster upsert --enable-connection=true`

Use the following options to change the behavior of this command.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--enable-connection](/cli/cmd-options/enable-connection)

- [--env](/cli/cmd-options/env)

- [--frontend-address](/cli/cmd-options/frontend-address)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

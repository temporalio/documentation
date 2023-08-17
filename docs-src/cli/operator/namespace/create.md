---
id: create
title: temporal operator namespace create
sidebar_label: create
description: Registers a new Namespace.
tags:
  - cli reference
  - temporal cli
  - operator
  - command-line-interface-cli
  - namespace
  - namespace create
---

The `temporal operator namespace create` command creates a new [Namespace](/concepts/what-is-a-namespace).
The Namespace can be created on the active [Cluster](/concepts/what-is-a-temporal-cluster), or any named Cluster within the system.
`temporal operator namespace --cluster=MyCluster`

Global Namespaces can also be created.
`temporal operator namespace create --global`

Other settings, such as [retention](/concepts/what-is-a-retention-period) and [Visibility Archival State](/concepts/what-is-visibility), can be configured according to the application's needs.
The Visibility Archive can be set on a separate URI.
`temporal operator namespace create --retention=RetentionMyWorkflow --visibility-archival-state="enabled" --visibility-uri="some-uri"`

Use the options listed below to change the command's behavior.

- [--active-cluster](/cli/cmd-options/active-cluster)

- [--address](/cli/cmd-options/address)

- [--cluster](/cli/cmd-options/cluster)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--data](/cli/cmd-options/data)

- [--description](/cli/cmd-options/description)

- [--email](/cli/cmd-options/email)

- [--env](/cli/cmd-options/env)

- [--global](/cli/cmd-options/global)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--history-archival-state](/cli/cmd-options/history-archival-state)

- [--history-uri](/cli/cmd-options/history-uri)

- [--namespace](/cli/cmd-options/namespace)

- [--retention](/cli/cmd-options/retention)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--visibility-archival-state](/cli/cmd-options/visibility-archival-state)

- [--visibility-uri](/cli/cmd-options/visibility-uri)

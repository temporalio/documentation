---
id: update
title: temporal operator namespace update
sidebar_label: update
description: Updates a Namespace.
tags:
  - cli reference
  - temporal cli
  - operator
  - command-line-interface-cli
  - namespace
  - update
---

The `temporal operator namespace update` command updates a [Namespace](/concepts/what-is-a-namespace).

Namespaces can be assigned a different active [Cluster](/concepts/what-is-a-temporal-cluster).
`temporal operator namespace update --active-cluster=NewActiveCluster`

Namespaces can also be promoted to global Namespaces.
`temporal operator namespace --promote-global=true`

Any [Archives](/concepts/what-is-archival) that were previously enabled or disabled can be changed through this command.
However, URI values for archival states cannot be changed after the states are enabled.
`temporal operator namespace update --history-archival-state="enabled" --visibility-archival-state="disabled"`

Note that the name of the Namespace needs to be on the _end_ of the command.
In other words, you should use the command `temporal operator namespace update --retention 180 default` rather than `temporal operator namespace update default --retention 180`.
The latter command will not change anything, nor will it produce any visible errors.

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

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--history-archival-state](/cli/cmd-options/history-archival-state)

- [--history-uri](/cli/cmd-options/history-uri)

- [--namespace](/cli/cmd-options/namespace)

- [--promote-global](/cli/cmd-options/promote-global)

- [--retention](/cli/cmd-options/retention)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--verbose](/cli/cmd-options/verbose)

- [--visibility-archival-state](/cli/cmd-options/visibility-archival-state)

- [--visibility-uri](/cli/cmd-options/visibility-uri)

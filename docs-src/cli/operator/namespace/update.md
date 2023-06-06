---
id: update
title: temporal operator namespace update
sidebar_label: update
description: Updates a Namespace.
tags:
    - cli
---

The `temporal operator namespace update` command updates a given [Namespace](/concepts/what-is-a-namespace).

Namespaces can be assigned a different active [Cluster](/concepts/what-is-a-temporal-cluster).
`temporal operator namespace update --active-cluster=NewActiveCluster`

Namespaces can also be promoted to global Namespaces.
`temporal operator namespace --promote-global=true`

Any [Archives](/concepts/what-is-archival) that were previously enabled or disabled can be changed through this command.
However, URI values for archival states cannot be changed after the states are enabled.
`temporal operator namespace update --history-archival-state="enabled" --visibility-archival-state="disabled"`

Use the options listed below to change the command's behavior.

- [--active-cluster](/cli/cmd-options/active-cluster)

- [--cluster](/cli/cmd-options/cluster)

- [--data](/cli/cmd-options/data)

- [--description](/cli/cmd-options/description)

- [--email](/cli/cmd-options/email)

- [--fields](/cli/cmd-options/fields)

- [--history-archival-state](/cli/cmd-options/history-archival-state)

- [--history-uri](/cli/cmd-options/history-uri)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--promote-global](/cli/cmd-options/promote-global)

- [--reason](/cli/cmd-options/reason)

- [--retention](/cli/cmd-options/retention)

- [--time-format](/cli/cmd-options/time-format)

- [--visibility-archival-state](/cli/cmd-options/visibility-archival-state)

- [--visibility-uri](/cli/cmd-options/visibility-uri)

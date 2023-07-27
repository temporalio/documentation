---
id: create
title: temporal operator namespace create
sidebar_label: create
description: Registers a new Namespace.
tags:
  - cli-reference
  - temporal-cli
  - operator
  - namespace
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

- [--cluster](/cli/cmd-options/cluster)

- [--data](/cli/cmd-options/data)

- [--description](/cli/cmd-options/description)

- [--email](/cli/cmd-options/email)

- [--fields](/cli/cmd-options/fields)

- [--global](/cli/cmd-options/global)

- [--history-archival-state](/cli/cmd-options/history-archival-state)

- [--history-uri](/cli/cmd-options/history-uri)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--retention](/cli/cmd-options/retention)

- [--time-format](/cli/cmd-options/time-format)

- [--visibility-archival-state](/cli/cmd-options/visibility-archival-state)

- [--visibility-uri](/cli/cmd-options/visibility-uri)

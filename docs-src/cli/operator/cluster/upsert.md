---
id: upsert
title: temporal operator cluster upsert
sidebar_label: upsert
description: Add or update a remote Cluster.
tags:
  - cli reference
---

The `temporal operator cluster upsert` command allows the user to add or update a remote [Cluster](/concepts/what-is-a-temporal-cluster).
`temporal operator cluster upsert --frontend-address="127.0.2.1"`

Upserting can also be used to enable or disabled cross-cluster connection.
`temporal operator cluster upsert --enable-connection=true`

Use the options listed below to change the behavior of this command.

- [--enable-connection](/cli/cmd-options/enable-connection)

- [--fields](/cli/cmd-options/fields)

- [--frontend-address](/cli/cmd-options/frontend-address)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--time-format](/cli/cmd-options/time-format)

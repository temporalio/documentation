---
id: get
title: temporal env get
sidebar_label: get
description: Prints environmental properties.
tags:
    - cli
---

The `temporal env get` command prints the environmental properties for the environment in use.

For example, passing the 'local' [Namespace](/concepts/what-is-a-namespace) returns the name, address, and certificate paths for the local environment.
`temporal env get local`
`Output: tls-cert-path  /home/my-user/certs/cluster.cert tls-key-path   /home/my-user/certs/cluster.key address        127.0.0.1:7233 namespace      accounting`

Output can be narrowed down to a specific option.
`temporal env get local.tls-key-path`
`tls-key-path  /home/my-user/certs/cluster.key`

Use the options listed below to change the command's behavior.

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--time-format](/cli/cmd-options/time-format)

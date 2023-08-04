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

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--time-format](/cli/cmd-options/time-format)

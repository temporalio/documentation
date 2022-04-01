---
id: list
title: tcc namespace list
description: How to list all Namespaces in Temporal Cloud using tcc.
tags:
  - reference
  - tcc
---

The `tcc namespace list` command lists all [Namespaces](/docs/concepts/what-is-a-namespace) for the specified account in Temporal Cloud.

`tcc namespace list --account <account_id>`

The following modifier controls the behavior of the command.

### `--account`

_Required modifier_

Specify an account ID.

Alias: `--a`

**Example**

```bash
tcc namespace list --account <account_id>
```
---
id: get
title: tcc namespace get
description: How to get information about a Namespace in Temporal Cloud using tcc.
tags:
  - reference
  - tcc
---

The `tcc namespace get` command gets information about the specified [Namespace](/docs/concepts/what-is-a-namespace) for the specified account in Temporal Cloud.

`tcc namespace get --account <account_id> --namespace <namespace_id>`

The following modifiers control the behavior of the command.

### `--account`

_Required modifier_

Specify an account ID.

Alias: `--a`

**Example**

```bash
tcc namespace list --account <account_id> --namespace <namespace_id>
```

### `--namespace`

_Required modifier_

Specify a Namespace ID.

Alias: `--n`

**Example**

```bash
tcc namespace list --account <account_id>  --namespace <namespace_id>
```

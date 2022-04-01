---
id: get
title: tcc request get
description: How to get the status of a request in Temporal Cloud using tcc.
tags:
  - reference
  - tcc
---

The `tcc request get` command gets the status of the specified request in Temporal Cloud.

`tcc request get --account <account_id> --request <value>`

The following modifiers control the behavior of the command.

### `--account`

_Required modifier_

Specify an account ID.

Alias: `--a`

**Example**

```bash
tcc namespace list --account <account_id> --request <value>
```

### `--request`

_Required modifier_

Specify a request.

Alias: `--r`

**Example**

```bash
tcc namespace list --account <account_id> --request <value>
```

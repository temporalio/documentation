---
id: delete
title: tcld namespace delete
sidebar_label: delete
description: How to delete a Namespace in Temporal Cloud using tcld.
tags:
  - tcld
  - cli-reference
---

The `tcld namespace delete` command deletes the specified [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

Alias: `d`

`tcld namespace delete`

The following modifiers control the behavior of the command.

### `--namespace`

_Required modifier_

Specify the Namespace hosted on Temporal Cloud to be deleted.

Alias: `-n`

### `--request-id`

The request identifier to use for the asynchronous operation.
If not set, the server assigns an identifier.

Alias: `-r`

### `--resource-version`

A resource version (ETag) to update from.
If not set, the CLI uses the latest.

Alias: `-v`

**Example**

```bash
tcld namespace delete --namespace <namespace_id>
```

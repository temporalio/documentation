---
id: delete
title: tcld namespace delete
sidebar_label: delete
description: How to delete a Namespace in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld namespace delete` command deletes the specified [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

Alias: `d`

`tcld namespace delete`

The following modifiers control the behavior of the command.

### `--namespace`

Specify the Namespace hosted on Temporal Cloud to be deleted.

Alias: `-n`

### `--request-id`

The request ID to use for the asynchronous operation. If not set, the server will assign one.

Alias: `-r`

### `--resource-version`

The resource version (etag) to update from. If not set, the CLI will use the latest.

Alias: `-v`

**Example**

```bash
tcld namespace delete --namespace <namespace_id>
```

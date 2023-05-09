---
id: list
title: tcld user list
sidebar_label: list
description: How to list users in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld user list` command returns a paginated list of users in Temporal Cloud.

Alias: `l`

**Example**

```command
tcld user list
```

The following modifiers control the behavior of the command.

### `--namespace`

List users that have permissions to the Namespace.

Alias: `-n`

**Example**

```command
tcld user list --namespace <namespace_id>
```

### `--page-token`

Page token for paging list users request.

Alias: `-p`

### `--page-size`

Page size for paging list users request.

Defaults to 10.

Alias: `-s`

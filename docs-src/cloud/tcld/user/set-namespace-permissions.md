---
id: set-namespace-permissions
title: tcld user set-namespace-permissions
sidebar_label: set-namespace-permissions
description: How to set a Namespace permission for a user in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld user set-namespace-permissions` command sets Namespace permissions for a specified user in Temporal Cloud.
You must set either `--user-email` or `--user-id`.

Alias: `snp`

The following modifiers control the behavior of the command.

### `--user-email`

Specify the user's email to set Namespace permissions to.

**Example**

```command
tcld user set-namespace-permissions --user-email <test@example.com>
```

### `--user-id`

Specify the user's identifier to set Namespace permissions to.

**Example**

```command
tcld user set-namespace-permissions --user-id <test-user-id>
```

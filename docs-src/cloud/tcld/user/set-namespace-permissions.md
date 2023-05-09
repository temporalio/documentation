---
id: set-namespace-permissions
title: tcld user set-namespace-permissions
sidebar_label: set-namespace-permissions
description: How to set Namespace-level permissions for a user in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld user set-namespace-permissions` command sets [Namespace-level permissions](/cloud/#namespace-level-permissions) for a specified user in Temporal Cloud.
You must set either `--user-email` or `--user-id`.

Alias: `snp`

The following modifiers control the behavior of the command.

### `--user-email`

Specify the email address of the user to assign Namespace-level permissions to.

**Example**

```command
tcld user set-namespace-permissions --user-email <test@example.com>
```

### `--user-id`

Specify the user identifier of the user to assign Namespace-level permissions to.

**Example**

```command
tcld user set-namespace-permissions --user-id <test-user-id>
```

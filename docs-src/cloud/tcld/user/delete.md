---
id: delete
title: tcld user delete
sidebar_label: delete
description: How to delete users in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld namespace delete` command deletes the specified user in Temporal Cloud.
You must set either `--user-email` or `--user-id` to specify the user to be deleted.

Alias: `d`

The following modifiers control the behavior of the command.

### `--user-email`

Specify the user to be deleted by email.

**Example**

```bash
tcld user delete --user-email <test@example.com>
```

### `--user-id`

Specify the user to be deleted by user identifier.

**Example**

```bash
tcld user delete --user-id <test-user-id>
```

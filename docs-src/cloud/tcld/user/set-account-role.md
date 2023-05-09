---
id: set-account-role
title: tcld user set-account-role
sidebar_label: set-account-role
description: How to set an account-level Role for a user in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld user set-account-role` command sets an [account-level Role](/cloud/#account-level-roles) for the specified user in Temporal Cloud.
You must set either `--user-email` or `--user-id`.

Alias: `ri`

The following modifiers control the behavior of the command.

### `--user-email`

Specify the email address of the user to assign an account-level Role to.

Alias: `-e`

**Example**

```command
tcld user set-account-role --user-email <test@example.com> --account-role Developer
```

### `--user-id`

Specify the user identifier of the user to assign an account-level Role to.

Alias: `--id`

**Example**

```command
tcld user set-account-role --user-id <test-user-id> --account-role Developer
```

### `--request-id`

The request identifier to use for the asynchronous operation.

If not set, the server assigns an identifier.

Alias: `-r`

### `--resource-version`

Specify a resource version (ETag) to update from.
If not specified, the latest version is used.

Alias: `-v`

### `--account-role`

_Required modifier_

Specify the account-level Role to assign to the user.

Available account roles: `admin` | `developer` | `read`.

Alias: `-ar`

---
id: set-account-role
title: tcld user set-account-role
sidebar_label: set-account-role
description: How to set account roles for users in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld user set-account-role` command sets an account role for the specified user in Temporal Cloud.
You must set either `--user-email` or `--user-id`.

Alias: `ri`

The following modifiers control the behavior of the command.

### `--user-email`

Specify the user's email to set an account role to.

Alias: `-e`

**Example**

```command
tcld user set-account-role --user-email <test@example.com> --account-role Developer
```

### `--user-id`

Specify the user's identifier to set an account role to.

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

Specify a resource version (ETag) to update from. If not specified, the latest version is used.

Alias: `-v`

### `--account-role`

_Required modifier_

Specify the account role to set on the user.

Available account roles: `admin` | `developer` | `read`.

Alias: `-ar`

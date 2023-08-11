---
id: set-namespace-permissions
title: tcld user set-namespace-permissions
sidebar_label: set-namespace-permissions
description: How to set Namespace-level permissions for a user in Temporal Cloud using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld user set-namespace-permissions` command sets [Namespace-level permissions](/cloud/#namespace-level-permissions) for a specified user in Temporal Cloud.
You must set either `--user-email` or `--user-id`.

Alias: `snp`

The following modifiers control the behavior of the command.

#### --user-email

Specify the email address of the user to assign Namespace-level permissions to.

**Example**

```command
tcld user set-namespace-permissions --user-email <test@example.com>
```

#### --user-id

Specify the user identifier of the user to assign Namespace-level permissions to.

**Example**

```command
tcld user set-namespace-permissions --user-id <test-user-id>
```

#### --request-id

The request identifier to use to assign Namespace-level permissions to.

If not set, the server assigns an identifier.

Alias: `-r`

#### --resource-version

Specify a resource version (ETag) to assign Namespace-level permissions to.
If not specified, the latest version is used.

Alias: `-v`

#### --namespace-permission

Specify the [Namespace-level permissions](/cloud/#namespace-level-permissions) for the invited user.
You can supply this modifier multiple times to set multiple Namespace permissions in a single request.

Each value must be in the format of `namespace=permission-type`.

Available namespace permissions: `Admin` | `Write` | `Read`.

Alias: `-p`

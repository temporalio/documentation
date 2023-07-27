---
id: invite
title: tcld user invite
sidebar_label: invite
description: How to invite users to join Temporal Cloud using tcld.
tags:
  - tcld
  - cli-reference
---

The `tcld namespace invite` command invites the specified user to join Temporal Cloud.

Alias: `i`

The following modifiers control the behavior of the command.

### `--user-email`

_Required modifier_

Specify the email address of the user to be invited.
You can supply this modifier multiple times to invite multiple users in a single request.

Alias: `-e`

### `--account-role`

_Required modifier_

Specify the [account-level Role](/cloud/#account-level-roles) for the invited user.

Available account roles: `admin` | `developer` | `read`.

Alias: `--ar`

### `--namespace-permission`

Specify the [Namespace-level permissions](/cloud/#namespace-level-permissions) for the invited user.
You can supply this modifier multiple times to set multiple Namespace permissions in a single request.

Each value must be in the format of `namespace=permission-type`.

Available namespace permissions: `Admin` | `Write` | `Read`.

Alias: `-p`

### `--request-id`

The request identifier to use for the asynchronous operation.

If not set, the server assigns an identifier.

Alias: `-r`

```command
tcld user invite --user-email <test@example.com> --account-role developer --namespace-permission ns1=Admin --namespace-permission ns2=Write --request-id <123456>
```

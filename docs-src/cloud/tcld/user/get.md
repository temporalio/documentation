---
id: get
title: tcld user get
sidebar_label: get
description: How to get user information in Temporal Cloud using tcld.
tags:
  - tcld
  - cli-reference
---

The `tcld user get` command gets information about the specified user in Temporal Cloud.
You must set either `--user-email` or `--user-id`.

Alias: `g`

The following modifiers control the behavior of the command.

#### --user-email

Specify the email address of the user to get information about.

**Example**

```command
tcld user delete --user-email <test@example.com>
```

#### --user-id

Specify the user identifier of the user to get information about.

**Example**

```command
tcld user delete --user-id <test-user-id>
```

---
id: resend-invite
title: tcld user resend-invite
sidebar_label: resend-invite
description: How to resend invitation to users in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld namespace resend-invite` command deletes the specified user in Temporal Cloud.
You must set either `--user-email` or `--user-id` to specify the user to be deleted.

Alias: `ri`

The following modifiers control the behavior of the command.

### `--user-email`

Specify the user to be deleted by email.

**Example**

```bash
tcld user resend-invite --user-email <test@example.com>
```

### `--user-id`

Specify the user to be deleted by user identifier.

**Example**

```bash
tcld user resend-invite --user-id <test-user-id>
```

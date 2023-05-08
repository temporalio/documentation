---
id: resend-invite
title: tcld user resend-invite
sidebar_label: resend-invite
description: How to resend invitations to users in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld user resend-invite` command resends an invitation to the specified user in Temporal Cloud.
You must set either `--user-email` or `--user-id` to specify the user to receive another invitation.

Alias: `ri`

The following modifiers control the behavior of the command.

### `--user-email`

Specify the user's email to resend an invitation to.

**Example**

```bash
tcld user resend-invite --user-email <test@example.com>
```

### `--user-id`

Specify the user's identifier to resend an invitation to.

**Example**

```bash
tcld user resend-invite --user-id <test-user-id>
```

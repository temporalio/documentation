---
id: resend-invite
title: tcld user resend-invite
sidebar_label: resend-invite
description: How to resend an invitation to a user in Temporal Cloud using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld user resend-invite` command resends an invitation to the specified user in Temporal Cloud.
You must set either `--user-email` or `--user-id` to specify the user to receive another invitation.

Alias: `ri`

The following modifiers control the behavior of the command.

#### --user-email

Specify the email address of the user to resend an invitation to.

**Example**

```bash
tcld user resend-invite --user-email <test@example.com>
```

#### --user-id

Specify the user identifier of the user to resend an invitation to.

**Example**

```bash
tcld user resend-invite --user-id <test-user-id>
```

#### --request-id

The request identifier to use for the asynchronous operation.

If not set, the server assigns an identifier.

Alias: `-r`

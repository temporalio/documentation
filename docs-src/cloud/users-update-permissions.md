---
id: users-update-permissions
title: How to update Namespace-level permissions in Temporal Cloud
sidebar_label: Update permissions
description: Use Namespaces or Settings in Web UI or the `tcld user set-namespace-permissions` command.
tags:
  - temporal cloud
  - how-to
  - namespaces
  - users
---

You can update Namespace-level [permissions](/cloud/users-namespace-level-permissions) by using either Web UI or tcld.

<!-- How to update Namespace-level permissions for a Namespace in Temporal Cloud using Web UI -->

### How to update Namespace-level permissions for a Namespace using Web UI

1. In Temporal Web UI, select **Namespaces** in the left portion of the window.
1. On the **Namespaces** page, select the Namespace.
1. If necessary, scroll down to the list of permissions
1. On the user profile page in **Namespace permissions**, select the Namespace.
1. On the Namespace page in **Account Level Role**, select the Role.
1. Select **Save**.

<!-- How to update Namespace-level permissions for a user in Temporal Cloud using Web UI -->

### How to update Namespace-level permissions for a user using Web UI

:::note

A user who has the Global Admin account-level [Role](/cloud/users-account-level-roles) has Namespace Admin permissions for all Namespaces.

:::

1. In Temporal Web UI, select **Settings** in the left portion of the window.
1. On the **Settings** page in the **Users** tab, select the user.
1. On the user profile page, select **Edit User**.
1. On the **Edit User** page in **Namespace permissions**, change the permissions for one or more Namespaces.
1. Select **Save**.

<!-- How to update an account-level Role in Temporal Cloud using tcld -->

### How to update Namespace-level permissions using tcld

For details, see the [tcld user set-namespace-permissions](/cloud/tcld/user/set-namespace-permissions) command.

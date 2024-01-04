---
id: users-invite
title: How to invite users to your Temporal Cloud account
sidebar_label: Invite users
description: Assign Roles and Namespace permissions, and send invites
tags:
  - temporal cloud
  - how-to
  - users
  - temporal cloud account
---

:::caution
Access to Temporal Cloud can be authorized via Google OAuth single sign-on, Microsoft single sign-on, or SAML, depending on your setup.

If you are using Google OAuth for single sign-on and an email address is not associated with a Google Account, the user must follow the instructions in the [Use an existing email address](https://support.google.com/accounts/answer/27441?hl=en#existingemail) section of [Create a Google Account](https://support.google.com/accounts/answer/27441).

**Important:** Do _not_ create a Gmail account when creating a Google Account.

If your organization uses Google Workspace or Microsoft Azure AD, and your IT administrator has enabled controls over single sign-on permissions, then you will need to work with your IT administrator to allow logins to Temporal Cloud.

:::

When a user is created in Temporal Cloud, they receive an email invitation containing a link.
They must use this link to finalize their setup and access Temporal Cloud.
Accounts with SAML configurations can ignore this email.
However, those using Google or Microsoft for SSO authentication need to follow the email link for their initial login to Temporal Cloud.

:::info

To invite users, a user must have the Global Admin account-level [Role](/cloud/users-account-level-roles).

:::

### Roles and permissions

Each user in Temporal Cloud is assigned a Role.
Each user can be assigned permissions for individual Namespaces.

- [Account-level Roles](/cloud/users-account-level-roles)
- [Namespace-level permissions](/cloud/users-namespace-level-permissions)

<!--- How to invite users to your Temporal Cloud account using Web UI --->

### How to invite users using Web UI

1. In Temporal Web UI, select **Settings** in the left portion of the window.
1. On the **Settings** page, select **Create Users** in the upper-right portion of the window.
1. On the **Create Users** page in the **Email Addresses** box, type or paste one or more email addresses.
1. In **Account-Level Role**, select a [Role](/cloud/users-account-level-roles).
   The Role applies to all users whose email addresses appear in **Email Addresses**.
1. If the account has any Namespaces, they are listed under **Grant access to Namespaces**.
   To add a permission, select the checkbox next to a Namespace, and then select a [permission](/cloud/users-namespace-level-permissions).
   Repeat as needed.
1. When all permissions are assigned, select **Send Invite**.

Temporal sends an email message to each user.
To join Temporal Cloud, a user must select **Accept Invite** in the message.

<!--- How to invite a user to your Temporal Cloud account using tcld --->

### How to invite a user using tcld

For details, see the [tcld user invite](/cloud/tcld/user#invite) command.

Temporal sends an email message to the specified user.
To join Temporal Cloud, the user must select **Accept Invite** in the message.

### How to invite a user using the Cloud Ops API

You can invite users pragmatically using the Cloud Ops API.

1. Create a connection to your Temporal Cluster using the Cloud Operations API.
2. Use the [CreateUser service](https://github.com/temporalio/api-cloud/blob/main/temporal/api/cloud/cloudservice/v1/service.proto) to create a user.

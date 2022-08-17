---
id: how-to-get-started-with-temporal-cloud
title: How to get started with Temporal Cloud
sidebar_label: Get started
description: Create an account, get certificates, create a Namespace, and invite users.
tags:
  - how-to
---

<!--- Onboarding guide for Temporal Cloud --->

To get started with Temporal Cloud, following these onboarding steps:

1. [Create an account.](#create-an-account-in-temporal-cloud)
1. [Issue CA certificates.](#issue-ca-certificates)
1. [Create a Namespace.](#create-a-namespace)
1. [Invite users.](#invite-users)

## 1. Create an account in Temporal Cloud

:::info

The email address you use to create an account is assigned the Global Admin [Role](/cloud/what-are-the-account-level-roles-for-users-in-temporal-cloud) and can assign access to all Namespaces.

Role assignments to users can be changed later as needed.

:::

:::caution

Access to [Temporal Web UI](/web-ui) is authorized via single sign-on (SSO), currently limited to Google OAuth.
The email address that you use to create a Temporal account must be registered with Google.
(If you prefer to use SAML, contact Temporal Sales.)

If the email address is not associated with a Google Account, follow the instructions in the [Use an existing email address](https://support.google.com/accounts/answer/27441?hl=en#existingemail) section of [Create a Google Account](https://support.google.com/accounts/answer/27441).

**Important** Do _not_ create a Gmail account when creating a Google Account.

:::

1. Gather the following information:

   - Email address
   - Company name (the legal entity name for your company)
   - Address of your company headquarters
   - Name and email address of billing contact
   - Credit card information, including billing address if not the same as the company address
   - Optional
     - Preferred Temporal Cloud domain (subject to availability)
     - Industry category

1. Create a Zendesk ticket to request a new account.
   (We are working to make self-serve account creation available.)

## 2. Issue CA certificates

You must provide your own certificates to access Temporal Cloud.
For certificate requirements, see the following:

- [Requirements for CA certificates](/cloud/how-to-manage-certificates-in-temporal-cloud#requirements-for-ca-certificates)
- [Issue root CA and end-entity certificates](/cloud/how-to-manage-certificates-in-temporal-cloud#issue-root-ca-and-end-entity-certificates)

## 3. Create a Namespace

[How to create a Namespace in Temporal Cloud](/cloud/how-to-create-a-namespace-in-temporal-cloud)

<!--- How to invite users in Temporal Cloud --->

## 4. Invite users

:::caution

Access to Temporal Cloud is authorized via single sign-on (SSO), currently limited to Google OAuth.
The email addresses of all users who need access to Temporal Cloud must be registered with Google.

If an email address is not associated with a Google Account, the user must follow the instructions in the [Use an existing email address](https://support.google.com/accounts/answer/27441?hl=en#existingemail) section of [Create a Google Account](https://support.google.com/accounts/answer/27441).

**Important** Do _not_ create a Gmail account when creating a Google Account.

:::

When you create a user in Temporal Cloud, the prospective user receives an email invitation.
The user must be logged in to Google and must click **Accept Invite** in the message.
Attempting to log in to Temporal Cloud without first accepting the invite doesn't work.

### Roles and permissions

Each user in Temporal Cloud is assigned a Role.
Each user can be assigned permissions for individual Namespaces.

- [Account-level Roles](/cloud/what-are-the-account-level-roles-for-users-in-temporal-cloud)
- [Namespace-level permissions](/cloud/what-are-the-namespace-level-permissions-for-users-in-temporal-cloud)

<!--- How to invite users in Temporal Cloud using Web UI --->

### Invite users using Web UI

1. In Temporal Web UI, click **Settings** in the lower-left portion of the window.
1. On the **Settings** page, click **Create Users** in the upper-right portion of the window.
1. On the **Create Users** page in the **Email Addresses** box, type or paste one or more email addresses.
1. In **Account-Level Role**, select a [Role](/cloud/what-are-the-account-level-roles-for-users-in-temporal-cloud).
   The Role applies to all users whose email addresses appear in **Email Addresses**.
1. If the account has any Namespaces, they are listed under **Grant access to Namespaces**.
   To add a permission, select the checkbox next to a Namespace, and then select a [permission](/cloud/what-are-the-namespace-level-permissions-for-users-in-temporal-cloud).
   Repeat as needed.
1. When all permissions are assigned, click **Send Invite**.

Temporal sends an email message to each user.
To join Temporal Cloud, a user must click **Accept Invite** in the message.

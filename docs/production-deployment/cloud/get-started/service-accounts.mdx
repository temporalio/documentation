---
id: service-accounts
title: Manage service accounts
sidebar_label: Manage service accounts
description: Temporal Cloud introduces Service Accounts for machine authentication, enabling non-human identities to interact with Temporal Cloud. Manage Service Accounts via Cloud UI or CLI for secure, automated operations.
slug: /cloud/service-accounts
toc_max_heading_level: 4
keywords:
  - explanation
  - feature
  - get started
  - machine authentication
  - how to
tags:
  - Temporal Cloud
  - API Keys
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Temporal Cloud provides Account Owner and Global Admin [roles](/cloud/users#account-level-roles) with the option to create machine identities named Service Accounts.

Service Accounts are a type of identity in Temporal Cloud.
Temporal Cloud supports User identities as a representation of a human user who uses Temporal Cloud.
Service Accounts afford Temporal Cloud Account Owner and Global Admin [roles](/cloud/users#account-level-roles) the ability to create an identity for machine authentication, an identity not associated with a human user.

With the addition of Service Accounts, Temporal Cloud now supports 2 identity types:

- Users (tied to a human, identified by email address or ID)
- Service Accounts (not tied to a human, email address optional, identified by name or ID)

Service Accounts use API Keys as the authentication mechanism to connect to Temporal Cloud.
You should use Service Accounts to represent a non-human identity when authenticating to Temporal Cloud for operations automation or the Temporal SDKs and the Temporal CLI for Workflow Execution and management.

:::tip

Namespace Admins can now manage and create [Namespace-scoped Service Accounts](/cloud/service-accounts#scoped), regardless of their Account Role.

:::

## Manage Service Accounts

Account Owner and Global Admin [roles](/cloud/users#account-level-roles) can manage Service Accounts by creating, viewing, updating, deleting Service Accounts using the following tools:

- Temporal Cloud UI
- Temporal Cloud CLI (tcld)
  - Use `tcld service-account --help` for a list of all service-account commands

Account Owner and Global Admin [roles](/cloud/users#account-level-roles) also have the ability to manage API Keys for Service Accounts.

### Prerequisites

- A Cloud user account with Account Owner or Global Admin [role](/cloud/users#account-level-roles) permissions
- Access to the Temporal Cloud UI or Temporal Cloud CLI (tcld)
- Enable access to API Keys for your Account
- To manage Service Accounts using the Temporal Cloud CLI (tcld), upgrade to the latest version of tcld (v0.18.0 or higher) using `brew upgrade tcld`.
  - If using a version of tcld less than v0.31.0, enable Service Account commands with `tcld feature toggle-service-account`.

### Create a Service Account

Create a Service Account using the Temporal Cloud UI or tcld.
While User identities are invited to Temporal Cloud, Service Accounts are created in Temporal Cloud.

<Tabs groupId="service-account">
  <TabItem value="cloud-ui" label="Using the Cloud UI">

1. Go to [Settings → Identities](https://cloud.temporal.io/settings/identities)
2. Click the `Create Service Account` button located near the top of the `Identities` page
3. Provide the following information:
   - **Name** (required)
   - **Description** (optional)
   - **Account Level Role** (required)
   - **Namespace Permissions** (optional)
     - Use this section of the Create Service Account page to grant the Service Account access to individual Namespaces
4. Click `Create Service Account` at the bottom of the page
   - A status message is displayed at the bottom right corner of the screen and on the next screen
   - You will be prompted to create an API Key for the Service Account (optional)
5. (Optional) Create API Key
   - It is recommended to create an API Key for the Service Account right after you create the Service Account, though you can create/manage API Keys for Service Accounts at any time
   - See the API Key [documentation](/cloud/api-keys) for more information on creating and managing API Keys

  </TabItem>
  <TabItem value="tcld" label="Using tcld">

To create a Service Account using tcld, use the `tcld service-account create` command:

```
tcld service-account create -n "sa_test" -d "this is a test SA" --ar "Read"
```

This example creates a Service Account with the name `"sa_test"`, description `"this is a test SA"`, and a `Read` Account Role.

Creating a Service Account requires the following attributes: `name` and `account-role` (as above).
You can also provide the Namespace Permissions for the Service Account using the `—-np` flag.
Creating a Service Account returns the `ServiceAccountId` which is used to retrieve, update, or delete a Service Account.

  </TabItem>
</Tabs>

### View Service Accounts

View a single or all Service Account(s) using the Temporal Cloud UI or tcld.

<Tabs groupId="service-account">
  <TabItem value="cloud-ui" label="Using the Cloud UI">

Service Accounts are listed on the `Identities` section of the `Settings` page, along with Users.
To locate a Service Account:

1. Go to [Settings → Identities](https://cloud.temporal.io/settings/identities)
2. Select the `Service Accounts` filter

  </TabItem>
  <TabItem value="tcld" label="Using tcld">

To view all Service Accounts in your account using tcld, use the `tcld service-account list` command:

```
tcld service-account list
```

  </TabItem>
</Tabs>

### Delete a Service Account

Delete a Service Account using the Temporal Cloud UI or tcld. When you delete a Service Account, all associated API keys are automatically deleted as well.
Therefore, you don't need to manually remove API keys after deleting a Service Account.

<Tabs groupId="service-account">
  <TabItem value="cloud-ui" label="Using the Cloud UI">

1. Go to [Settings → Identities](https://cloud.temporal.io/settings/identities)
2. Find the relevant Service Account
3. Select the vertical ellipsis menu in the Service Account row
4. Select `Delete`
5. Confirm the delete action when prompted

  </TabItem>
  <TabItem value="tcld" label="Using tcld">

To delete a Service Account using tcld, use the `tcld service-account delete` command:

```
tcld service-account delete --service-account-id "e9d87418221548"
```

Use the tcld Service Account list command to validate the Service Account has been removed from the account.
The Service Account is deleted when it is no longer visible in the output of .

  </TabItem>
</Tabs>

### Update a Service Account {#update}

Update a Service Account's description using the Temporal Cloud UI or tcld.

<Tabs groupId="service-account">
  <TabItem value="cloud-ui" label="Using the Cloud UI">

1. Go to [Settings → Identities](https://cloud.temporal.io/settings/identities)
2. Find the relevant Service Account
3. Select the vertical ellipsis menu in the Service Account row
4. Select `Edit`
5. Make changes to the Service Account
   - You can change the Service Account's name, description, Account Level Role, and Namespace Permissions
6. Click the `Save` button located in the bottom left of the screen
   - A status message is displayed at the bottom right corner of the screen

  </TabItem>
  <TabItem value="tcld" label="Using tcld">

Three different commands exist to help users update a Service Account using tcld:

- `tcld service-account update`: to update a Service Account's name or description field
- `tcld service-account set-account-role`: to update a Service Account's Account Role
- `tcld service-account set-namespace-permissions`: to update a Service Account's Namespace Permissions

Example:

```
tcld service-account update --id "2f68507677904e09b9bcdbf93380bb95" -d "new description"
```

  </TabItem>
</Tabs>


## Namespace-scoped Service Accounts {#scoped}

There is a special type of Service Account, called a Namespace-scoped Service Account, which shares the
same functionality as the Service Accounts above, but is limited (or scoped) to a single namespace.

In particular, a Namespace-scoped Service Account must _always_ have:

- A `Read` Account Role
- A single Namespace Permission

Note that a Namespace-scoped Service Account cannot be reassigned to a different Namespace after creation, but its Namespace permission can be modified (e.g. from `Read` to `Write`).

Namespace-scoped Service Accounts are useful in situations when you need to restrict a client's access to a single Namespace.

You can retrieve, update, and delete a Namespace-scoped Service Account using the same process and commands as above, but creation is slightly different.

### Permissions
Unlike regular Service Accounts, which require a Global Admin or Account Owner role, Namespace-scoped Service Accounts can be created and managed by Namespace Admins.
For example, an Account Developer with Namespace Admin for `test_ns` can create a Service Account scoped to `test_ns`.

Global Admins and Account Owners can also create Namespace-scoped Service Accounts, as they implicitly have Namespace Admin rights for all Namespaces.

### Create a Namespace-scoped Service Account

As with regular Service Accounts, Namespace-scoped Service Accounts can be created using Temporal Cloud UI or tcld.

#### Using the Cloud UI {#scoped-ui}

Currently, creating a Namespace-scoped Service Account from the Temporal Cloud UI happens on an individual [Namespace](/cloud/namespaces#manage-namespaces) page.
If the current Namespace has API key authentication enabled, then there will be a `Generate API Key` button as a banner on the top of the Namespace page or in the `Authentication` section.

By clicking on the `Generate API Key` button, a Namespace-scoped Service Account will be automatically created for the given Namespace (if one does not already exist) and an associated API key will be displayed. This key will have the maximum expiration time, which is 2 years.

The resulting Namespace-scoped Service Account will be named `<namespace>-service-account` and will have an `Admin` Namespace permission by default.

#### Using tcld

To create a Namespace-scoped Service Account with tcld, use the `tcld service-accounted create-scoped` command:

```
tcld service-account created-scoped -n "test-scoped-sa" --np "test-ns=Admin"
```

This example creates a Namespace-scoped Service Account for the Namespace `test-ns`, named `test-scoped-sa`, with `Admin` Namespace Permission.
Note that the Account Role is omitted, since Namespace-scoped Service Accounts always have a `Read` Account Role.

### Lifecycle

When a Namespace is deleted, all associated Namespace-scoped Service Accounts and their associated API keys are automatically deleted as well.
Therefore, you do not need to manually remove Namespace-scoped Service Accounts and their API keys after deleting a Namespace.

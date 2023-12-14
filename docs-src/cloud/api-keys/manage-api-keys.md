---
id: manage-api-keys
title: Manage API Keys
sidebar_label: Manage API Keys
description: Manage API Keys by creating, deleting, or updating access to them using the Cloud UI or tcld.
tags:
  - how to
---

Manage your personal API Keys by creating, deleting, or updating access to them using the Cloud UI or tcld.

### Global Administrator API Key Management

:::note

API Keys are not enabled for by default.
You must enable API Key access to allow the creation of API Keys.

:::

Global Administrators can monitor, manage, update access, and delete API Keys for any user within their account.

To manage your accounts API Keys

1. [Login](https://cloud.temporal.io/) to the Cloud UI.
2. [Select **Settings** and choose **API Keys**](https://cloud.temporal.io/settings/api-keys).

From here, you can update access to the API Key for an account using the **Enable** and **Disable** toggle.
You can also disable or delete an individual User API Key using the vertical ellipsis at the right of the API Keys row.

### Generate an API Key

:::note

Once generated, copy and securely save the API Key.
It will be displayed only once for security purposes.

:::

Generate an API Key using one of the following methods.

#### Using the Cloud UI

To generate an API Key using the Cloud UI:

1. [Login](https://cloud.temporal.io/) to the Cloud UI.
2. Navigate to [Profile Page → API Keys](https://cloud.temporal.io/profile/api-keys).
3. Select **Create API Key** and provide the following:
   1. Name
   2. Description
   3. Expiration Date
4. Select **Generate API Key**.

:::note

Temporal supports up to a 90-day duration for API Keys.

:::

#### Using the tcld

To generate an API Key using tcld, use the `tcld apikey create` command.

1. Authenticate your Temporal Cloud account using the [login](/cloud/tcld/login) command.
2. Create an API Key using the [apikey create](/cloud/tcld/apikey/create) command.

For example:

```command
tcld login
tcld apikey create --name Your-Key-Name --description YourDescription --duration 24h
```

:::note

Use tcld to create API Keys with a day level expiration by day.

:::

### Delete an API Key

Delete an API Key using one of the following methods.

#### Using the Cloud UI

To delete an API Key using the Cloud UI

1. [Login](https://cloud.temporal.io/) to the Cloud UI.
2. Navigate to your [Profile Page → API Keys](https://cloud.temporal.io/profile/api-keys).
3. Select the three vertical dots to the right of the API Key’s row and choose **Delete**.
4. Choose **Delete**.

#### Using the tcld

To delete an API Key using tcld, pass the API Key ID to the [tcld apikey delete](/cloud/tcld/apikey/delete) command.

1. Authenticate your Temporal Cloud account using the [login](/cloud/tcld/login) command.
2. Delete the API Key using the [apikey delete](/cloud/tcld/apikey/delete) command.

```command
tcld apikey delete --id <your-api-key-id>
```

### Update access to an API Key

You can update access to an API Key by enabling or disabling it.

After disabling an API Key, that API Key will no longer be able to authenticate with Temporal Cloud.
Only enabled keys can authenticate with Temporal Cloud.

#### Using the Cloud UI

To update access to an API Key using the Cloud UI, follow these steps:

1. [Login](https://cloud.temporal.io/) to the Cloud UI.
2. Navigate to [Profile Page → API Keys](https://cloud.temporal.io/profile/api-keys).
3. Select the three vertical dots to the right of the API Key’s row and choose **Disable**.

#### Using the tcld

To update access to an API Key using the tcld, follow these steps:

1. Login to tcld using either SSO or an API Key.
2. Use the `apikey disable/enable` commands to disable/enable the key.

```command
tcld apikey disable --id <api-key-id>
tcld apikey enable --id <api-key-id>
```

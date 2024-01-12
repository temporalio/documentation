---
id: namespaces-create
title: How to create a Namespace in Temporal Cloud
sidebar_label: Create a Namespace
description: To create a Namespace in Temporal Cloud, use either Temporal Cloud UI or tcld.
tags:
  - how-to
  - temporal cloud
  - namespaces
---

:::info

The user who creates a [Namespace](/namespaces) is automatically granted [Namespace Admin](/cloud/users-namespace-level-permissions) permission for that Namespace.

To create a Namespace, a user must have the Developer or Global Admin account-level [Role](/cloud/users-account-level-roles).

:::

:::tip

By default, each account has a quota of 10 Namespaces.
If you want to increase this limit, open a [support ticket](/cloud/support-create-ticket).

:::

<!--- What information do I need to create a Namespace in Temporal Cloud? --->

### Information needed to create a Namespace

To create a Namespace in Temporal Cloud, gather the following information:

- [Namespace Name](/concepts/what-is-a-cloud-namespace-name) and region.
- [Retention Period](/concepts/what-is-a-retention-period) for the [Event History](/concepts/what-is-an-event-history) of closed [Workflow Executions](/concepts/what-is-a-workflow-execution).
- [CA certificate](/cloud/certificates-requirements) for the Namespace.
- [Codec Server endpoint](/self-hosted/how-to-set-up-codec-server#set-your-codec-server-endpoints-with-web-ui-and-cli) to show decoded payloads to users in the Event History for Workflow Executions in the Namespace. For details, see [Securing your data](/self-hosted/data-encryption).
- [Permissions](/cloud/users-namespace-level-permissions) for each user.

<!--- How to create a Namespace in Temporal Cloud using Temporal Cloud UI --->

### Create a Namespace using Temporal Cloud UI

1. Gather the information listed earlier in [Information needed to create a Namespace](#information-needed-to-create-a-namespace).
1. Go to the Temporal Cloud UI and log in.
1. On the left side of the window, click **Namespaces**.
1. On the **Namespaces** page, click **Create Namespace** in the upper-right portion of the window.
1. On the **Create Namespace** page in **Name**, enter the Namespace Name.
1. In **Region**, select the region in which to host this Namespace.
1. In **Retention Period**, specify a value from 1 to 90 days.
   When choosing this value, consider your needs for Event History versus the cost of maintaining that Event History.
   Typically, a development Namespace has a short retention period and a production Namespace has a longer retention period.
   (If you need to change this value later, contact [Temporal Support](/cloud/support-create-ticket).)
1. In **Certificate**, paste the CA certificate for this Namespace.
1. Optional: In **Codec Server**, enter the HTTPS URL (including the port number) of your Codec Server endpoint.
   You may also enable "Pass the user access token with your endpoint" and "Include cross-origin credentials."
   For details, see [Hosting your Codec Server](/self-hosted/how-to-set-up-codec-server#hosting-your-codec-server).
1. Click **Create Namespace**.

<!--- How to create a Namespace in Temporal Cloud using tcld --->

### Create a Namespace using tcld

See the [tcld namespace create](/cloud/tcld/namespace/create) command reference for details.

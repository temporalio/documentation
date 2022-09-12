---
id: namespaces-create
title: How to create a Namespace in Temporal Cloud
sidebar_label: Create a Namespace
description: To create a Namespace in Temporal Cloud, use either Temporal Cloud UI or tcld.
tags:
  - how-to
---

:::info

The user who creates a [Namespace](/namespaces) is automatically granted [Namespace Admin](/cloud/#namespace-level-permissions) permission for that Namespace.

:::

<!--- What information do I need to create a Namespace in Temporal Cloud? --->

### Information needed to create a Namespace

To create a Namespace in Temporal Cloud, gather the following information:

- [Namespace Name](/cloud/#cloud-namespace) and region
- [Retention period](/clusters/#retention-period) for [Event History](/workflows#event-history) of closed [Workflow Executions](/workflows#workflow-executions)
- [CA certificate](/cloud/how-to-manage-certificates-in-temporal-cloud#requirements-for-client-certificates) for the Namespace
- [Permissions](/cloud/#namespace-level-permissions) for each user

<!--- How to create a Namespace in Temporal Cloud using Temporal Cloud UI --->

### Create a Namespace using Temporal Cloud UI

1. Gather the information listed earlier in [Information needed to create a Namespace](#information-needed-to-create-a-namespace).
1. Go to the Temporal Cloud UI and log in.
1. On the left side of the window, click **Namespaces**.
1. On the **Namespaces** page, click **Create Namespace** in the upper-right portion of the window.
1. On the **Create Namespace** page in **Name**, enter the Namespace Name.
1. In **Region**, select the region in which to host this Namespace.
1. In **Retention Period**, select the appropriate timespan. (You can modify this value later.)
1. In **Certificate**, paste the CA certificate for this Namespace.
1. Click **Create Namespace**.

<!--- How to create a Namespace in Temporal Cloud using tcld --->

### Create a Namespace using tcld

This functionality is in development.

---
id: how-to-create-a-namespace-in-temporal-cloud
title: How to create a Namespace in Temporal Cloud
sidebar_label: Create a Namespace
description: To create a Namespace in Temporal Cloud, use either Temporal Web UI or tcld.
tags:
  - how-to
---

:::info

The user who creates a [Namespace](/namespaces) is automatically granted [Namespace Admin](/cloud/what-are-the-namespace-level-permissions-for-users-in-temporal-cloud) permission for that Namespace.

:::

<!--- What information do I need to create a Namespace in Temporal Cloud? --->

## Information needed to create a Namespace

To create a Namespace in Temporal Cloud, gather the following information:

- [Namespace Name](/cloud/#cloud-namespace), region, and environment
- [Retention period](/clusters/#retention-period) for [Event History](/workflows#event-history)
- [End-entity certificate](/cloud/how-to-manage-certificates-in-temporal-cloud#requirements-for-client-certificates) for connecting to the Namespace
- [Roles](/cloud/what-are-the-account-level-roles-for-users-in-temporal-cloud) for each user

<!--- How to create a Namespace in Temporal Cloud using Temporal Web UI --->

## Create a Namespace using Temporal Web UI

1. Gather the information listed earlier in [Information needed to create a Namespace](#information-needed-to-create-a-namespace).
1. In a browser, go to [https://cloud.temporal.io](https://cloud.temporal.io) and log in.
1. On the left side of the window, click **Namespaces**.
1. On the **Namespaces** page, click **Create Namespace** in the upper-right portion of the window.
1. On the **Create Namespace** page in **Name**, enter the Namespace Name.
1. In **Region**, select the region in which to host this Namespace.
1. In **Environment**, select the kind of work planned for this Namespace.
1. In **Retention Period**, select the appropriate timespan.
1. In **Certificate**, paste the end-entity certificate for this Namespace.
1. Click **Create Namespace**.

<!--- How to create a Namespace in Temporal Cloud using tcld --->

## Create a Namespace using tcld

This functionality is in development.

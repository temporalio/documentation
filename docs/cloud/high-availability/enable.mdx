---
id: enable
title: Enable High Availability
sidebar_label: Enable High Availability
slug: /cloud/high-availability/enable
description: Get started with HA features
---

import { ToolTipTerm } from '@site/src/components';

:::tip Support, stability, and dependency info

Same-region Replication and Multi-cloud Replication are in
[Public Preview](/evaluate/development-production-features/release-stages#public-preview).

Multi-region Replication is in
[General Availability](/evaluate/development-production-features/release-stages#general-availability)

:::

You can enable High Availability features
([Single-region Replication](/cloud/high-availability#same-region-replication),
[Multi-region Replication](/cloud/high-availability#multi-region-replication), or
[Multi-cloud Replication](/cloud/high-availability#multi-cloud-replication)) for a new or existing Namespace by adding a
replica. When you add a replica, Temporal Cloud begins asynchronously replicating ongoing and existing Workflow
Executions.

Not all replication options are available in all regions. See the [region documentation](/cloud/regions) for the
replication options available in each region.

Using private network connectivity with a HA namespace requires extra setup. See
[Connectivity for HA](/cloud/high-availability/ha-connectivity).

There are charges associated with Replication and enabling High Availability features. For pricing details, visit
Temporal Cloud's [Pricing](/cloud/pricing) page.

## Create a Namespace with High Availability features {#create}

To create a new Namespace with High Availability features, you can use the Temporal Cloud UI or the tcld command line
utility.

<Tabs>

<TabItem value="webui" label="Web UI">

    1. Visit Temporal Cloud in your Web browser.
    1. During Namespace creation, specify the primary [region](/cloud/regions) for the Namespace.
    1. Select "Add a replica".
    1. Choose the [region](/cloud/regions) for the replica.

    The web interface will present an estimated time for replication to complete.
    This time is based on your selection and the size and scale of the Workflows in your Namespace.

</TabItem>

<TabItem value="tcldcli" label="tcld">

At the command line, enter:

```
tcld namespace create \
   --namespace <namespace_id>.<account_id> \
   --region <primary_region> \
   --region <replica_region>
```

Specify the [region codes](/cloud/regions) as arguments to the two `--region` flags.

- Using the same region replicates to an isolation domain within that region.
- Using a different region replicates across regions.

If using API key authentication with the `--api-key` flag, you must add it directly after the tcld command and before
`namespace create`.

</TabItem>

</Tabs>

Temporal Cloud sends an email alert to all Namespace Admins once your Namespace replica is ready for use.

## Add High Availability to an existing Namespace {#upgrade}

A replica can be added after a namespace has already been created.

<Tabs>

<TabItem value="webui" label="Web UI">

1. Visit Temporal Cloud Namespaces in your Web browser.
1. Navigate to the Namespace details page.
1. Select the “Add a replica” button.
1. Choose the [region](/cloud/regions) for the replica.

The web interface will present an estimated time for replication to complete. This time is based on your selection and
the size and scale of the Workflows in your Namespace.

Temporal Cloud sends an email alert to all Namespace Admins once your Namespace replica is ready for use.

</TabItem>

<TabItem value="tcldcli" label="tcld">

At the command line, enter:

```
tcld namespace add-region \
   --namespace <namespace_id>.<account_id> \
   --region <replica_region>
```

Specify the [region code](/cloud/regions) of the region where you want to create the replica as an argument to the
`--region` flag.

If using API key authentication with the `--api-key` flag, you must add it directly after the tcld command and before
`namespace add-region`.

Temporal Cloud sends an email alert once your Namespace is ready for use.

</TabItem>

</Tabs>

## Change a replica location {#changing}

Temporal Cloud can't change replica locations directly. To change a replica's location, you need to remove the replica
and add a new one.

:::caution

We discourage changing the location of your replica for deployed applications, except under exceptional circumstances.
If you remove your replica, you lose the availability guarantees of the Namespace, and it can take time to add another
replica.

If you remove a replica from a region, you must wait seven days before you can re-enable High Availability (HA) in that
same location. During this period, you may add a replica to a different region, provided you have not had one active
there within the last seven days.

:::

Follow these steps to change the replica location:

1. [Remove your replica](#disable). This disables High Availability for your Namespace.
2. [Add a new replica](#upgrade) to your Namespace.

You will receive an email alert once your Namespace is ready for use.

## Disable High Availability (remove a replica) {#disable}

To disable High Availability features on a Namespace, remove the replica from that Namespace. Removing a replica
disables all High Availability features:

- Discontinues replication of the Workflows in the Namespace.
- Disables the Namespace's ability to trigger a failover to a different region or cloud.
- For Workers and Clients that use API keys, removing a replica requires connecting to the Namespace using the published
  [regional endpoint](/cloud/regions) for the Namespace's region.
  - Disables connecting to the Namespace with API keys and the Namespace's endpoint or the replica region's regional
    endpoint.
- Ends High Availability charges.

:::caution

After removing a Namespace's replica, you cannot re-enable replication on that same Temporal Cloud Namespace in the same
location for seven days.

:::

Follow these steps to remove a replica from a Namespace:

<Tabs>

<TabItem value="webui" label="Web UI">

1. If you are using API keys for authentication on this Namespace, configure your Workers and Clients that use API keys
   to [connect with the regional Temporal Cloud endpoint](/cloud/api-keys#namespace-authentication) for the Namespace's
   primary region.
1. Navigate to the Namespace details page in Temporal Cloud
1. Select the option to "Remove Replica" on the "Region" card.

</TabItem>

<TabItem value="tcldcli" label="tcld">

First, if you are using API keys for authentication on this Namespace, configure your Workers and Clients that use API
keys to [connect with the regional Temporal Cloud endpoint](/cloud/api-keys#namespace-authentication) for the
Namespace's primary region.

Then, run the following command to remove the replica:

```
tcld namespace delete-region \
    --api-key <api_key> \
    --namespace <namespace_id>.<account_id> \
    --region <replica_region>
```

</TabItem>

</Tabs>

:::important

To remove a replica from a Namespace with API keys enabled, you need assistance from Temporal Support. Please
[contact support](/cloud/support#support-ticket) with the Namespace ID of the Namespace where you want to remove the
replica. You must confirm that Workers and Clients with API keys have been configured to connect to the Namespace using
the published [regional endpoint](/cloud/regions).

This safeguard ensures that Workers and Clients continue running uninterrupted once Temporal Support removes the
replica. After the replica is removed, if Workers and Clients with API keys attempt to use the Namespace endpoint or the
former replica's regional endpoint, their requests will fail.

:::

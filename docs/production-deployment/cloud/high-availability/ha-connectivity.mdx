---
id: ha-connectivity
title: Connectivity for High Availability
sidebar_label: Connectivity for High Availability
slug: /cloud/high-availability/ha-connectivity
description: How to use private network connectivity with Temporal Cloud HA features
---

import { CaptionedImage, JsonTable } from '@site/src/components';

:::tip Namespaces with High Availability features and AWS PrivateLink

Proper networking configuration is required for failover to be transparent to clients and workers when using PrivateLink.
This page describes how to configure routing for Namespaces with High Availability features on AWS PrivateLink.

:::

To use AWS PrivateLink with High Availability features, you may need to:

- Override the regional DNS zone.
- Ensure network connectivity between the two regions.

These instructions assume you already have the PrivateLink connections in place. If not, follow our [guide for creating AWS PrivateLink connections and configuring private DNS](/cloud/connectivity/aws-connectivity).

## Customer side solutions

When using PrivateLink, you connect to Temporal Cloud through a VPC Endpoint, which uses addresses local to your network.
Temporal treats each `region.<tmprl_domain>` as a separate zone.
This setup allows you to override the default zone, ensuring that traffic is routed internally for the regions you’re using.

A Namespace's active region is reflected in the target of a CNAME record.
For example, if the active region of a Namespace is AWS us-west-2, the DNS configuration would look like this:

| ha-namespace.account-id.tmprl.cloud | CNAME | aws-us-west-2.region.tmprl.cloud |
| ----------------------------------- | ----- | -------------------------------- |

After a failover, the CNAME record will be updated to point to the failover region, for example:

| ha-namespace.account-id.tmprl.cloud | CNAME | aws-us-east-1.region.tmprl.cloud |
| ----------------------------------- | ----- | -------------------------------- |

The Temporal domain did not change, but the CNAME updated from us-west-2 to us-east-1.

<CaptionedImage
    src="/img/cloud/high-availability/private-link.png"
    title="Customer side solution example"
    zoom="true"
/>

## Setting up the DNS override

:::caution

Private connectivity is not yet offered for GCP Multi-region Namespaces.

:::

To set up the DNS override, configure specific regions to target the internal VPC Endpoint IP addresses.
For example, you might set aws-us-west-1.region.tmprl.cloud to target 192.168.1.2.
In AWS, this can be done using a Route 53 private hosted zone for `region.tmprl.cloud`.
Link that private zone to the VPCs you use for Workers.

When your Workers connect to the Namespace, they first resolve the `<ns>.<acct>.<tmprl_domain>` record.
This points to `<aws-active-region>.region.tmprl.cloud`, which then resolves to your internal IP addresses.

Consider how you’ll configure Workers for this setup.
You can either have Workers run in both regions continuously or establish connectivity between regions using Transit Gateway or VPC Peering.
This way, Workers can access the newly activated region once failover occurs.

## Available regions, PrivateLink endpoints, and DNS record overrides

:::caution

The `sa-east-1` region is not yet available for use with Multi-region Namespaces. Currently, it is the only region on the continent.

:::

The following table lists the available Temporal regions, PrivateLink endpoints, and DNS record overrides:

<JsonTable filename="/json/privatelink_aws.json" />


When using a Namespace with High Availability features, the Namespace's DNS record `<ns>.<acct>.<tmprl_domain>` points to a regional DNS record in the format `<region>.region.<tmprl_domain>`.
Here, `<region>` is the currently active region for your Namespace.

During failover, Temporal Cloud changes the target of the Namespace DNS record from one region to another.
Namespace DNS records are configured with a 15 second <a href="https://en.wikipedia.org/wiki/Time_to_live">TTL</a>.
Any DNS cache should re-resolve the record within this time.
As a rule of thumb, receiving an updated DNS record takes about twice (2x) the TTL.
Clients should converge to the newly targeted region within, at most, a 30-second delay.

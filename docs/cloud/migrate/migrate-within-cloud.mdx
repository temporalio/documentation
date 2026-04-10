---
id: migrate-within-cloud
title: Migrate between regions
sidebar_label: Migrate between regions
slug: /cloud/migrate/migrate-within-cloud
description: Use Temporal Cloud's High Availability features to migrate between regions.
tags:
  - Temporal Cloud
  - Production
  - High Availability
  - Migration
keywords:
  - availability
  - explanation
  - failover
  - high-availability
  - migration
  - multi-cloud replication
  - multi-region replication
  - namespaces
  - same-region replication
  - temporal-cloud
---

import { CaptionedImage } from '@site/src/components';

Temporal Cloud's [High Availability features](/cloud/high-availability) allow you to migrate a Temporal Cloud Namespace from one region or cloud provider to another with zero downtime.

## Preparing to migrate

Namespaces using Export will need to stop Export and migrate the region configuration to the new region for Export jobs to continue after migration. 
See [failover scenarios](/cloud/export#failover-scenarios) for details.

[Using High Availability features affects pricing](/cloud/pricing#high-availability-features).

## Steps to migrate

1. Add a Namespace replica in the region you want to migrate to. See [regions](/cloud/regions) for a list of available regions and supported multi-region and multi-cloud configurations.

<CaptionedImage
    src="/img/cloud/high-availability/migrate/1-add-replica.png"
    title="Add a namespace replica"
    zoom="true"
/>

<CaptionedImage
    src="/img/cloud/high-availability/migrate/2-choose-region.png"
    title="Choose the region for the replica"
    zoom="true"
/>

2. Wait for the replica to become active. The Cloud UI will display a time estimate, and namespace admins will receive an email when the replica is active.
3. If your workers are using API key authentication: ensure your workers (and all other client code) are updated to [use the regional endpoint of the new replica](/cloud/namespaces#access-namespaces).
4. Trigger a failover to the new region.

<CaptionedImage
    src="/img/cloud/high-availability/migrate/3-failover.png"
    title="Initiate failover to the new region"
    zoom="true"
/>

5. Remove the Namespace replica in the region you are migrating from.

:::note
If using [API keys](/cloud/api-keys) for worker authentication, you must open a [support ticket](/cloud/support#support-ticket) to remove the replica.

:::

<CaptionedImage
    src="/img/cloud/high-availability/migrate/4-remove-replica.png"
    title="Remove the replica for the original region"
    zoom="true"
/>

:::note
All replica changes are subject to a [cooldown period](/cloud/high-availability/enable#changing) before further replica changes can be made.

:::

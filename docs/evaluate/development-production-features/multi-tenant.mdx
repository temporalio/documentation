---
id: multi-tenancy
title: Multi-tenancy - Temporal feature
description: Learn about Temporal's namespace isolation for multi-tenancy and how to build multi-tenant applications.
sidebar_label: Multi-tenancy
tags:
- Temporal Cloud
- Multitenancy
keywords:
- multi-tenant
- Temporal Cloud
- namespace isolation
- multi-tenant applications
- tenant isolation
---

import { RelatedReadContainer, RelatedReadItem } from '@site/src/components';

Multi-tenancy in Temporal operates at two levels:

## Namespace isolation

[Namespaces](/namespaces) are Temporal's unit of isolation, providing logical separation for multi-tenant deployments in both open source Temporal and Temporal Cloud.

### Open source Temporal

Namespaces in self-hosted Temporal provide:

- **Workflow ID uniqueness**: Temporal guarantees unique Workflow IDs within a Namespace. Different Namespaces can have Workflows with the same ID without conflict.
- **Resource isolation**: Traffic from one Namespace does not impact other Namespaces on the same Temporal Service.
- **Configuration boundaries**: Settings like [Retention Period](/temporal-service/temporal-server#retention-period) and [Archival](/temporal-service/archival) destination are configured per Namespace.
- **Access control**: Use a custom [Authorizer](/self-hosted-guide/security#authorization) on your Frontend Service to restrict who can access each Namespace.
- **Inter-namespace communication**: Use [Nexus](/evaluate/nexus) for controlled communication between Namespaces.

### Temporal Cloud

Temporal Cloud builds on these capabilities with additional isolation guarantees:

- **Independent authentication** via [API keys](/cloud/api-keys) or [mTLS certificates](/cloud/certificates)
- **Built-in [role-based access controls](/cloud/users#namespace-level-permissions)** without custom Authorizer configuration
- **Separate [rate limits](/cloud/limits#namespace-level)** to prevent noisy neighbor problems
- **[High availability replication](/cloud/high-availability)** across regions

<RelatedReadContainer>
  <RelatedReadItem path="/cloud/security#namespace-isolation" text="Namespace Isolation Details" archetype="cloud-guide" />
  <RelatedReadItem path="/cloud/pricing" text="Temporal Cloud Pricing" archetype="cloud-guide" />
</RelatedReadContainer>

## Application multi-tenancy

Many organizations use Temporal to power their own multi-tenant SaaS applications, isolating their customers' workloads using Task Queues, Search Attributes, and Worker design patterns.

See the [multi-tenant application patterns guide](/production-deployment/multi-tenant-patterns) for detailed recommendations on architecting multi-tenant applications with Temporal.

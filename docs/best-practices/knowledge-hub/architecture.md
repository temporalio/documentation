---
id: architecture
title: Temporal Architecture
sidebar_label: Architecture
description: Enterprise Temporal architecture covering Namespace conventions, Worker deployment patterns, network connectivity, and disaster recovery procedures.
toc_max_heading_level: 3
keywords:
  - temporal architecture
  - temporal namespace
  - temporal connectivity
  - temporal worker deployment
tags:
  - Best Practices
  - Knowledge Hub
---

:::info
This page is part of the [Temporal Knowledge Hub](./index.md).
:::

:::note
Customize this section to describe the architectural decisions and guardrails that shape how your developers build with Temporal.
:::

This document defines our enterprise Temporal architecture, covering Namespace conventions, Worker deployment patterns, network connectivity, and disaster recovery procedures.

## Temporal Cloud

At ABC Financial, we use Temporal Cloud, which is a fully managed Temporal service. It offers a hassle-free way to run our Temporal Applications without the need to manage the underlying infrastructure.

Our Workers and Temporal Applications connect to the Temporal Cloud service, which takes care of the persistence layer, scalability, and availability for you.

## Namespace

A Temporal Cloud [Namespace](https://docs.temporal.io/namespaces) is a unit of isolation within the Temporal platform. It ensures that Workflow executions, Task Queues, and resources are logically separated.

:::note
Define a Namespace naming convention based on the Temporal [Namespace Best Practices](../managing-namespace.mdx).
:::

At ABC Financial, we adhere to the following standards for our Temporal Cloud Namespaces:

1. The naming convention is `<business-unit>-<domain>-<environment>`
   1. Use at most 10 characters for business units (e.g. `consumer`, `commercial`, `investment`).
   2. Use at most 10 characters for domain (e.g. `payment`, `mortgage`).
   3. Use one of the support environments: `dev`, `stg`, `prd`.

:::note
Link to your internal Namespace provisioning process so developers can self-serve.
:::

File an internal service ticket to request for a new Temporal Cloud Namespace.

:::note
List the default features and guardrails applied to new Namespaces by environment.
:::

Based on the environment (i.e. `dev`, `stg`, `prd`), the following features are configured by our automation:

| Feature | Development | Staging | Production  |
| :---- | ----- | ----- | ----- |
| [Deletion Protection](https://docs.temporal.io/cloud/namespaces#delete-protection) | ✅ | ✅ | ✅ |
| [Private Connectivity](https://docs.temporal.io/cloud/connectivity) | ✅ | ✅ | ✅ |
| [Custom Encryption](https://docs.temporal.io/default-custom-data-converters) | ✅ | ✅ | ✅ |
| [Codec Server](https://docs.temporal.io/codec-server) | ✅ | ✅ | ✅ |
| [API Key](https://docs.temporal.io/cloud/api-keys) | ✅ | ✅ | ✅ |
| [API Key Rotation](https://docs.temporal.io/cloud/api-keys#rotate-an-api-key) | ✅ | ✅ | ✅ |
| [Observability](https://docs.temporal.io/evaluate/development-production-features/observability) | ✅ | ✅ | ✅ |
| [Audit Logs](https://docs.temporal.io/cloud/audit-logs) | ✅ | ✅ | ✅ |
| [Workflow History Export](https://docs.temporal.io/cloud/export) | ❌ | ❌ | ✅ |
| [Multi-Region Replication](https://docs.temporal.io/cloud/high-availability#multi-region-replication)  | ❌ | ❌ | ✅ |

## Connectivity

:::note
Describe your network connectivity requirements so developers understand how Workers connect to Temporal Cloud.
:::

At ABC Financial, private connectivity is required for all Temporal Cloud Namespaces for compliance reasons. [Private connectivity](https://docs.temporal.io/cloud/connectivity) eliminates traffic over public internet to Temporal Cloud.

For reference, see below for official Temporal documentations on AWS and GCP private connectivity:

* [AWS PrivateLink Connectivity | Temporal Platform Documentation](https://docs.temporal.io/cloud/connectivity/aws-connectivity)
* [Google Private Service Connect Connectivity | Temporal Platform Documentation](https://docs.temporal.io/cloud/connectivity/gcp-connectivity)

## Worker

:::note
Document your Worker deployment standards so developers know where and how to deploy.
:::

At ABC Financial, Temporal Workers are deployed as containerized applications on Kubernetes clusters across AWS EKS and GCP GKE.

All worker deployments are managed through [Helm](https://helm.sh/) charts, ensuring:

* Standardized deployment configurations across clouds
* Version-controlled infrastructure as code
* Simplified rollbacks and updates
* Environment-specific value overrides

[KEDA](https://keda.sh/docs/2.18/scalers/) is configured to auto-scale Workers based on Temporal Task Queue backlog.

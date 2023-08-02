---
id: namespaces-access
title: How to access a Namespace in Temporal Cloud
sidebar_label: Access Namespaces
description: You can access a Namespace in Temporal Cloud via gRPC and HTTPS endpoints.
tags:
  - how-to
  - namespaces
  - temporal cloud
---

<!--- How to access a Namespace in Temporal Cloud --->

Each Namespace in Temporal Cloud has two unique endpoints, both of which include the [Namespace Id](/cloud/#cloud-namespace-id).

- For programmatic access, a gRPC endpoint in the form `<NamespaceId>.tmprl.cloud`; for example, `accounting-production.f45a2.tmprl.cloud:7233`.
- For accessing Temporal Web UI, an HTTPS endpoint in the form `https://cloud.temporal.io/namespaces/<namespaceId>`; for example, `https://cloud.temporal.io/namespaces/accounting-production.f45a2`.

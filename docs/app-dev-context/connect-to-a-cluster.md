---
id: connect-to-a-cluster
title: How to connect a Temporal Client to a Temporal Cluster
description: When connecting a Temporal Client to a Temporal Cluster, you must provide the address and port number of the Temporal Cluster.
sidebar_label: Connect to a Cluster
tags:
  - guide-context
---

When connecting a Temporal Client to a Temporal Cluster, you must provide the address and port number of the Temporal Cluster.

- To connect to our Docker image, use `127.0.0.1:7233`.
- To connect to a Temporal Cloud Namespace use `<Namespace_ID>.tmprl.cloud`.

:::note

The difference between the gRPC and Temporal Web endpoints:

- The gRPC endpoint has a DNS address of `<Namespace_ID>.tmprl.cloud`; for example, `accounting-production.f45a2.tmprl.cloud`.
- The Temporal Web endpoint is `web.<Namespace_ID>.tmprl.cloud`; for example, `https://web.accounting-production.f45a2.tmprl.cloud`.

:::

---
id: connect-to-a-cluster
title: How to connect a Temporal Client to a Temporal Cluster
description: When connecting a Temporal Client to a Temporal Cluster, you must provide the address and port number of the Temporal Cluster.
sidebar_label: Connect to a Cluster
tags:
  - guide-context
---

A [Temporal Client](/concepts/what-is-a-temporal-client) enables you to communicate with the [Temporal Cluster](/concepts/what-is-a-temporal-cluster).
Communication with a Temporal Cluster includes, but isn't limited to, the following:

- Starting Workflow Executions.
- Sending Signals to Workflow Executions.
- Sending Queries to Workflow Executions.
- Getting the results of a Workflow Execution.
- Providing an Activity Task Token.

:::caution

A Temporal Client cannot be initialized and used inside a Workflow.
However, it is acceptable and common to use a Temporal Client inside an Activity to communicate with a Temporal Cluster.

:::

When you are running a Cluster locally (such as [Temporalite](/clusters/quick-install#temporalite)), the number of connection options you must provide is minimal.
Many SDKs default to the local host or IP address and port that Temporalite and [Docker Compose](/clusters/quick-install#docker-compose) serve (`127.0.0.1:7233`).

When you are connecting to a production Cluster (such as [Temporal Cloud](/cloud)), you will likely need to provide additional connection and client options that might include, but aren't limited to, the following:

- An address and port number.
- A [Namespace](/concepts/what-is-a-namespace) Name (like a Temporal Cloud Namespace: `<Namespace_ID>.tmprl.cloud`).
- mTLS CA certificate.
- mTLS private key.

For more information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](/cloud/how-to-manage-certificates-in-temporal-cloud.md).

For more information about configuring TLS to secure inter and intra network communication for a Temporal Cluster, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).

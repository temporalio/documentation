---
id: connect-to-a-cluster
title: How to connect a Temporal Client to a Temporal Cluster
description: When connecting a Temporal Client to a Temporal Cluster, you must provide the address and port number of the Temporal Cluster.
sidebar_label: Connect to a Cluster
tags:
  - guide-context
---

A [Temporal Client](/concepts/what-is-a-temporal-client) enables you to communicate with a [Temporal Cluster](/concepts/what-is-a-temporal-cluster).
Communications with a Temporal Cluster include, but aren't limited to, the following:

- starting Workflow Executions
- sending Signals to Workflow Executions
- sending Queries to Workflow Executions
- getting the results of a Workflow Execution
- providing an Activity Task Token

:::caution

A Temporal Client cannot be initialized and used inside Workflow code.
However, it is acceptable and common to use a Temporal Client inside an Activity to communicate with the Temporal Cluster.

:::

When you are running a Cluster locally (such as [temporalite](/clusters/quick-install#temporalite)), the number of connection options you must provide is minimal.
Many SDKs default to the local host or IP address and port that temporalite and [Docker Compose](/clusters/quick-install#docker-compose) serve (`127.0.0.1:7233`).

When you are connecting to a production Cluster (such as [Temporal Cloud](/concepts/what-is-temporal-cloud)), you will likely need to provide additional connection and client options that might include, but aren't limited to, the following:

- address and port
- [Namespace](/concepts/what-is-a-namespace) (like a Temporal Cloud Namespace: `<Namespace_ID>.tmprl.cloud`)
- mTLS CA certificate
- mTLS private key

For more information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](/cloud/how-to-manage-certificates-in-temporal-cloud.md).

For more information about configuring TLS to secure inter and intra network communication for a Temporal Cluster, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).

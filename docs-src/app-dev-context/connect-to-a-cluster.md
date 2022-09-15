---
id: connect-to-a-cluster
title: How to connect a Temporal Client to a Temporal Cluster
description: When connecting a Temporal Client to a Temporal Cluster, you must provide the address and port number of the Temporal Cluster.
sidebar_label: Connect to a Cluster
tags:
  - guide-context
---

A [Temporal Client](/concepts/what-is-a-temporal-client) enables you to communicate with a Temporal [Cluster](/concepts/what-is-a-temporal-cluster).
Communications with a Temporal Cluster include the following, but are not limited to:

- starting Workflow Executions
- sending Signals to Workflow Executions
- sending Queries to Workflow Executions
- getting the results of a Workflow Execution
- providing an Activity Task Token

:::caution

A Temporal Client cannot be initialized and used inside of Workflow code.
However, it is acceptable and common to use a Temporal Client inside an Activity, to communicate with the Temporal Cluster.

:::

When you are running a Cluster locally, [temporalite](/clusters/quick-install#temporalite) for example, the number of connection options you must provide is minimal.
Many SDKs default to the local host / IP and port that temporalite and [Docker Compose](/clusters/quick-install#docker-compose) serve up (`127.0.0.1:7233`).

When you are connecting to a production Cluster, [Temporal Cloud](/concepts/what-is-temporal-cloud) for example, you will likely need provide additional connection and client options that might include, but are not limited to:

- address and port
- [Namespace](/concepts/what-is-a-namespace) (Example Temporal Cloud Namespace: `<Namespace_ID>.tmprl.cloud`)
- mTLS CA certificate
- mTLS private key

For more information about managing and generating Client certificates for Temporal Cloud see the [Generating certificates guide](/cloud/how-to-manage-certificates-in-temporal-cloud.md).

For more information about configuring TLS to secure inter and intra network communication for a Temporal Cluster, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).

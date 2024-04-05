---
id: run-a-temporal-cloud-worker
title: How to run a Temporal Cloud Worker
description: The Worker Process is where Workflow Functions and Activity Functions are executed.
sidebar_label: Run a Temporal Cloud Worker
tags:
  - guide-context
---

To run a Temporal Cloud Worker, you'll change some parameters in your Client connection code, such as updating the namespace and gRPC endpoint.
You'll use:

- The [Temporal Cloud Namespace Id](/concepts/what-is-a-cloud-namespace-id).
- The [Namespace's gRPC endpoint](/concepts/what-is-a-cloud-grpc-endpoint).
  The endpoint uses this format `(namespace.unique_id.tmprl.cloud:port)`.
- [Paths to the SSL certificate (.pem) and private key (.key)](/cloud/saml-intro) registered to your Namespace and stored on your Worker's file system.

Copy the Namespace Id and the gRPC endpoint from the Namespace detail Web page on [Temporal Cloud Namespaces](https://cloud.temporal.io/namespaces). Click on a Namespace name to open the Namespace details.

For information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](/cloud/certificates-intro).

For information about configuring TLS to secure inter- and intra-network communication for a Temporal Cluster, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).

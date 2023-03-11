---
id: run-a-temporal-cloud-worker
title: How to run a Temporal Cloud Worker
description: The Worker Process is where Workflow Functions and Activity Functions are executed.
sidebar_label: Run a Temporal Cloud Worker
tags:
  - guide-context
---

To run a Worker that uses [Temporal Cloud](/cloud), you will need to provide additional connection and client options that include the following:

- An address and port number which includes your [Cloud Namespace Name](/concepts/what-is-a-namespace): `<Namespace>.<ID>.tmprl.cloud:<port>`.
- mTLS CA certificate.
- mTLS private key.

For more information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](/cloud/how-to-manage-certificates-in-temporal-cloud.md).

For more information about configuring TLS to secure inter and intra network communication for a Temporal Cluster, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).

---
id: connect-to-temporal-cloud
title: How to connect to Temporal Cloud
description: Use a compatible mTLS CA certificate and mTLS private key and your Cloud Namespace to connect to Temporal Cloud.
sidebar_label: Connect to Temporal Cloud
tags:
  - guide-context
---

When you connect to [Temporal Cloud](/cloud), you need to provide additional connection and client options that include the following:

- An address that includes your [Cloud Namespace Name](/concepts/what-is-a-namespace) and a port number: `<Namespace>.<ID>.tmprl.cloud:<port>`.
- mTLS CA certificate.
- mTLS private key.

For more information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](/cloud/certificates-intro).

For more information about configuring TLS to secure inter- and intra-network communication for a Temporal Cluster, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).

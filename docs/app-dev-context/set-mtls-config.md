---
id: set-mtls-config
title: How to set mTLS for a Temporal Client
description: When connecting to the Temporal Cloud with mTLS, you must provide the a certificate and a private key.
sidebar_label: Set mTLS
tags:
  - guide-context
---

When connecting to the Temporal Cloud with mTLS, you must provide the following configuration details:

- Client certificate for mTLS
- Client private key for mTLS

For information about generating Client certification, see the [temporalio/client-certificate-generation](https://hub.docker.com/r/temporalio/client-certificate-generation) Docker image to generate Client-side certificates along with keys and configuration files.
​
This Docker image is to be used in conjunction with the Temporal SDK.
Keys and their configuration files are valid for 365 days from creation.

For information about configuring TLS to secure network communication with and within Temporal Cluster, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).

For more information about mTLS, see [How to manage certificates](cloud/how-to-manage-certificates-in-temporal-cloud.md) in the Temporal Cloud user guide.

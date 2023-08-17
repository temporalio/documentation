---
id: certificates-intro
title: How to manage certificates in Temporal Cloud
sidebar_label: Manage certificates
description: Certificates needed for Temporal Cloud and Worker Processes
tags:
  - introduction
  - temporal cloud
  - certificates
---

[Temporal Cloud](https://temporal.io/cloud) requires security certificates for secure access and communication.

Temporal Cloud access is secured by the mutual Transport Layer Security (mTLS) protocol, which requires a CA certificate from the user.

A [Worker Process](/concepts/what-is-a-worker-process) requires a CA certificate and private key to connect to Temporal Cloud.
Temporal Cloud does not require an exchange of secrets; only the certificates produced by private keys are used for verification.

:::caution Don't let your certificates expire

An expired root CA certificate invalidates all downstream certificates.

An expired end-entity certificate prevents a [Temporal Client](/concepts/what-is-a-temporal-client) from connecting to a Namespace or starting a Workflow Execution.
If the client is on a Worker, any current Workflow Executions that are processed by that Worker either run indefinitely without making progress until the Worker resumes or fail because of timeouts.

To update certificates, see [How to add, update, and remove certificates in a Temporal Cloud Namespace](/cloud/certificates-namespace).

:::

All certificates used by Temporal Cloud must meet the following requirements.

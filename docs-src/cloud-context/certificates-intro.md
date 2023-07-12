---
id: certificates-intro
title: How to manage certificates in Temporal Cloud
sidebar_label: Manage certificates
description: Certificates needed for Temporal Cloud and Worker Processes
tags:
  - guide-context
---

[Temporal Cloud](https://temporal.io/cloud) requires security certificates for secure access and communication.

Temporal Cloud access is secured by the mutual Transport Layer Security (mTLS) protocol, which requires a CA certificate from the user.

[Worker Processes](/workers/#worker-process) require CA certificates and private keys to connect to Temporal Cloud.
Temporal Cloud does not require an exchange of secrets; only the certificates produced by private keys are used for verification.

All certificates used by Temporal Cloud must meet the following requirements.

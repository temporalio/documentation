---
id: certificates-intro
title: How to manage certificates in Temporal Cloud
sidebar_label: Manage certificates
description: Access to Temporal Cloud requires a certificate from you.
tags:
  - guide-context
---

Access to [Temporal Cloud](https://temporal.io/cloud) is secured with the mutual Transport Layer Security (mTLS) protocol.
This protocol requires a CA certificate from you.

[Worker Processes](/workers/#worker-process) use both CA certificates and private keys to connect to Temporal Cloud. Private keys remain in your control; Temporal Cloud requires no exchange of secrets.

---
id: certificates-intro
title: How to manage certificates in Temporal Cloud
sidebar_label: Manage certificates
description: Access to Temporal Cloud requires a certificate from you.
tags:
  - how-to
---

:::note Join the Temporal Cloud waitlist

Access to Temporal Cloud is currently by invitation only.
You can [join the waitlist](https://pages.temporal.io/cloud-early-access).

:::

Access to Temporal Cloud is secured with the mutual Transport Layer Security (mTLS) protocol.
This protocol requires a CA certificate from you.

The benefits of using a CA certificate include the following:

- You can use your CA to issue client certificates to comply with your security policies for certificate expiration and rotation.
  Client certificates can be issued and rotated without having to configure or update CA certificates shared with Temporal.
- Temporal does not need to receive certificate private keys.
  When you configure access to Temporal Cloud, no exchange of secrets is required.

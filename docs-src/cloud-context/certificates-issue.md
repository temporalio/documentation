---
id: certificates-issue
title: How to issue root CA and end-entity certificates
sidebar_label: Issue certificates
description: You can issue root CA and end-entity certificates in two ways.
tags:
  - how-to
---

Temporal Cloud authenticates a client connection by validating the client certificate against one or more CA certificates that are configured for the specified Namespace.

### Option 1: You already have certificate management infrastructure

If your existing certificate management infrastructure supports issuing CA and end-entity certificates, it satisfies the requirements.
When you configure the client SDK, you must present a complete certificate chain up to the CA certificate given to Temporal.

### Option 2: You have no certificate management infrastructure

If you don't have existing certificate management infrastructure, you can issue the CA and client certificates by using tools such as OpenSSL.

We also provide a tool that issues one root CA and the required end-entity certificate to use on the client SDK.
The tool can issue multiple end-entity certificates.
We've kept this tool minimal because it is a demonstration tool; **it is _not_ meant to be used in production.**

You can use this tool in two ways:

- Follow the instructions for the [temporalio/client-certificate-generation](https://hub.docker.com/r/temporalio/client-certificate-generation) image in Docker Hub.
  This procedure is the easiest because it's independent of your operating system.
- Follow the README instructions in the [client-only](https://github.com/temporalio/samples-server/tree/main/tls/client-only) directory in our `temporalio/samples-server` repository in GitHub.

:::info

The maximum number of CA certificates in a certificate bundle is 16. The payload size of a certificate bundle (before base64-encoding) is 32 KB.

:::

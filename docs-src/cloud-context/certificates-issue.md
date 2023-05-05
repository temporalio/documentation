---
id: certificates-issue
title: How to issue root CA and end-entity certificates
sidebar_label: Issue certificates
description: You can issue root CA and end-entity certificates in two ways.
tags:
  - guide-context
---

Temporal Cloud authenticates a client connection by validating the client certificate against one or more CA certificates that are configured for the specified Namespace.

### Option 1: You already have certificate management infrastructure

If you have existing certificate management infrastructure that supports issuing CA and end-entity certificates, it satisfies the requirements.
When you configure the client SDK, you need to present a complete certificate chain up to the CA certificate given to Temporal.

### Option 2: You don't have certificate management infrastructure

If you don't have an existing certificate management infrastructure, you can issue the CA and client certificates by using tools such as OpenSSL or open source tools like certstrap.

#### Option 2a: Use certstrap

[Certstrap](https://github.com/square/certstrap) is a popular and easy to use tool for issuing certificates.

Follow these steps to issue a certificate for use with Temporal Cloud:

1. Install certstrap by following the instructions in the [certstrap README](https://github.com/square/certstrap#getting-started).
2. Set the Namespace Name as the common name for the certificate:

```command
export NAMESPACE_NAME=your-namespace
```

3. Initialize a new certificate authority:

```command
certstrap init --common-name "Your Cert Auth"
```

4. Request a certificate with a common name equal to the Namespace Name:

```command
certstrap request-cert --common-name ${NAMESPACE_NAME}
```

5. Sign the certificate request and generate the end-entity certificate:

```command
certstrap sign ${NAMESPACE_NAME} --CA "Your Cert Auth"
```

You can now use the generated client certificate with Temporal Cloud.

#### Option 2b: Use Temporal's client certificate generation tool

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

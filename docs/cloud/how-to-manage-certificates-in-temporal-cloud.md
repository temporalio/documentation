---
id: how-to-manage-certificates-in-temporal-cloud
title: How to manage certificates in Temporal Cloud
sidebar_label: Certificates
description: Access to Temporal Cloud requires a certificate from you.
tags: how-to
---

Access to Temporal Cloud is secured with the mutual Transport Layer Security (mTLS) protocol.
This protocol requires a CA certificate from you.

The benefits of using a CA certificate include the following:

- You can use your CA to issue client certificates to comply with your security policies for certificate expiration and rotation.
  Client certificates can be issued and rotated without having to configure or update CA certificates shared with Temporal.
- Temporal does not need to receive certificate private keys.
  When you configure access to Temporal Cloud, no exchange of secrets is required.

## Requirements for CA certificates

Certificates provided to Temporal for your [Namespaces](/namespaces) _must_ meet the following requirements.

### Root CA certificates

Root CA certificates _must_ meet the following criteria:

- The certificates must be X.509v3.
- Each certificate in the bundle must be either a root certificate or issued by another certificate in the bundle.
- Each certificate in the bundle must include `CA: true`.
- A certificate cannot be a well-known CA (such as DigiCert or Let's Encrypt) _unless_ the user also specifies certificate filters.
- The signing algorithm must include SHA-256 or stronger.
  SHA-1 and MD5 signing algorithms are rejected.

### End-entity certificates

An end-entity (leaf) certificate _must_ meet the following criteria:

- The certificate must be X.509v3.
- Basic constraints must include `CA: false`.
- The key usage must include Digital Signature.
- The signing algorithm must include SHA-256 or stronger.
  SHA-1 and MD5 signing algorithms are rejected.

When a client presents an end-entity certificate, and the whole certificate chain is constructed, each certificate in the chain (from end-entity to the root) must have a unique Distinguished Name (DN).

:::caution

Distinguished Names are _not_ case sensitive; that is, uppercase letters (such as ABC) and lowercase letters (such as abc) are equivalent.

:::

## Issue root CA and end-entity certificates

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

The maximum number of CA certificates in a certificate bundle is 25. The payload size of a certificate bundle (before base64-encoding) is 32 KB.

:::

## Control authorization for Cloud Namespaces

Because Temporal Cloud uses mTLS for authorization, we recommend that an end-entity certificate be limited to a specific Namespace.
Temporal Cloud requires full CA chains, so you can achieve authorization in two ways.

### Option 1: Issue a separate certificate for each Namespace

Each certificate must belong to a chain up to the root CA certificate.
Temporal uses the root CA certificate as the trusted authority for access to your Namespaces.

1. Ensure that your certificates meet the [Requirements for client certificates](#requirements-for-client-certificates).
1. [Add client CA certificates to a Cloud Namespace](/cloud/tcld/namespace/accepted-client-ca/add).

### Option 2: Create certificate filters for each Namespace

[How to manage certificate filters in Temporal Cloud](/cloud/how-to-manage-certificate-filters-in-temporal-cloud)

## Add, update, and remove certificates in a Cloud Namespace

To manage certificates for Cloud Namespaces, use the [tcld namespace accepted-client-ca](/cloud/tcld/namespace/accepted-client-ca/) commands.

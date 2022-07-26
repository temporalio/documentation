---
id: how-to-manage-certificates-in-temporal-cloud
title: How to manage certificates in Temporal Cloud
sidebar_label: Certificates
description: Access to Temporal Cloud requires a certificate from you.
---

Access to Temporal Cloud is secured with the mutual Transport Layer Security (mTLS) protocol.
This protocol requires a certificate from you.

Temporal strongly recommends that you provide an certificate from a certificate authority (CA) for authenticating SDK client connections.
The benefits of using a CA certificate include the following:

- You can use your CA to generate client certificates to comply with your security policies for certificate expiration and rotation.
  Intermediate and leaf certificates can be generated and rotated without having to configure or update public certificates shared with Temporal.
- Temporal does not need to receive certificate private keys.
  You share the public key, which is used to encrypt data in transit to the SDK clients.
  The clients decrypt data by using the private key that is secured in your environment.

## Requirements for client certificates

Certificates provided to Temporal for your [Namespaces](namespaces) _must_ meet one of the following two sets of requirements.

### Option 1: End-entity certificates

An end-entity certificate _must_ meet the following criteria:

- The certificate must be X.509v3.
- Basic constraints must include `CA: false`.
- The key usage must include Digital Signature.
- The signing algorithm must include SHA-256 or stronger.
  SHA-1 and MD5 signing algorithms are rejected.

When a client presents an end-entity certificate, and the whole certificate chain is constructed, each certificate in the chain (from end-entity to the root) must have a unique Distinguished Name (DN).

### Option 2: CA bundle certificates

CA bundle certificates _must_ meet the following criteria:

- The certificates must be X.509v3.
- Each certificate in the bundle must be either a root certificate or issued by another certificate in the bundle.
- Each certificate in the bundle must include `CA: true`.
- A certificate cannot be a well-known CA (such as DigiCert or Let's Encrypt) _unless_ the user also specifies certificate filters.
- The signing algorithm must include SHA-256 or stronger. SHA-1 and MD5 signing algorithms are rejected.

## Generate CA and client certificates

Temporal Cloud authenticates a client connection by validating the client certificate against the CA certificate that is configured for the specified Namespace.

### You already have certificate management infrastructure

If your existing certificate management infrastructure supports generating CA and leaf certificates, it satisfies the requirements.
We recommend that you generate an intermediate CA certificate for interacting with your Temporal Namespace.
When you configure the client SDK, you must present a complete certificate chain up to, but not including, the CA certificate given to Temporal.

### You have no certificate management infrastructure

If you don't have existing certificate management infrastructure (or want to use a separate certificate management solution), you can generate the CA and client certificates by using tools such as OpenSSL.

We also provide a tool that generates one root CA and the required leaf certificate to use on the client SDK. The tool can generate multiple leaf certificates.
We've kept this tool minimal because it is a demonstration tool; **it is _not_ meant to be used in production.**

You can use this tool in two ways:

- Follow the instructions for the [temporalio/client-certificate-generation](https://hub.docker.com/r/temporalio/client-certificate-generation) image in Docker Hub.
  This procedure is the easiest because it's independent of your operating system.
- Follow the README instructions in the [client-only](https://github.com/temporalio/samples-server/tree/main/tls/client-only) directory in our `temporalio/samples-server` repository in GitHub.

## Control authorization for Cloud Namespaces

Because Temporal Cloud uses mTLS for authorization, we recommend that you ensure that a client certificate grants access only to a specific Namespace.
Temporal Cloud requires full CA chains, so you can achieve authorization in two ways.

### Option 1: Generate a separate certificate for each Namespace

Each certificate must belong to a chain up to the CA certificate.
Temporal uses the CA certificate as the trusted authority for access to your Namespaces.

1. Ensure that your certificates meet the [Requirements for client certificates](#requirements-for-client-certificates).
1. [Add client CA certificates to a Cloud Namespace](/cloud/tcld/namespace/accepted-client-ca/add).

### Option 2: Create certificate filters for each Namespace

To limit access to specific client certificates, you can create certificate filters.
Each filter contains values for one or more of the following fields:

- commonName (CN)
- organization (O)
- organizationalUnit (OU)
- subjectAlternativeName (SAN)

Corresponding fields in the client certificate must match every specified value in the filter.
In the following example, only the CN field of the certificate's subject is checked, and it must be exactly `code.example.com`.
The other fields are not checked.

```go
AuthorizedClientCertificate {
  CN : "code.example.com"
}
```

In the following example, the CN field must be `role.example.com` and the O field must be `Example Code Inc.`

```go
AuthorizedClientCertificate {
  CN : "code.example.com"
  O : "Example Code Inc."
}
```

The values for the fields are case-insensitive.
If no wildcard is used, each specified value must match its field exactly.

To match a substring, place a single `*` wildcard at the beginning or end (but not both) of a value.
You cannot use a `*` wildcard by itself.

For example, the following values are valid:

- `*.example.com` matches `code.example.com` and `text.example.com`.
- `Example Code*` matches `Example Code` and `Example Code Inc.`

The following values are not valid:

- `*.example.*`
- `code.*.com`
- `*`

To set or clear certificate filters, use the following [tcld](cloud/tcld/) commands:

- [tcld namespace certificate-filters import](cloud/tcld/namespace/certificate-filters/import)
- [tcld namespace certificate-filters clear](cloud/tcld/namespace/certificate-filters/clear)

## Add, update, and remove certificates in a Cloud Namespace

To manage certificates for Cloud Namespaces, use the [tcld namespace accepted-client-ca](cloud/tcld/namespace/accepted-client-ca/) commands.

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

If you don't have an existing certificate management infrastructure, issue the CA and end-entity certificates using `tcld` or open source tools such as certstrap.

:::info

The maximum number of CA certificates in a certificate bundle is 16.
The maximum payload size of a certificate bundle (before base64 encoding) is 32 KB.

:::

#### Use tcld to generate certificates

CA and end-entity certificates can be generated with `tcld`.

The maximum duration for a CA certificate is 1 year (`-d 1y`).
An end-entity certificate must expire before its root CA certificate, so specify its duration appropriately.

To create a new CA certificate, use `tcld gen ca`.

```
tcld gen ca --org temporal -d 1y --ca-cert ca.pem --ca-key ca.key
```

To create a new end-entity certificate, use `tcld gen leaf`.

```
tcld gen leaf --org temporal -d 364d --ca-cert ca.pem --ca-key ca.key --cert client.pem --key client.key
```

#### Use certstrap

[Certstrap](https://github.com/square/certstrap) is a popular and easy to use tool for issuing certificates.

Follow these steps to issue a certificate for use with Temporal Cloud:

1. Install certstrap by following the instructions in the [certstrap README](https://github.com/square/certstrap#getting-started).
2. Set the Namespace Name as the common name for the certificate:

<Tabs>
  <TabItem value="macos" label="MacOS" default>

```command
export NAMESPACE_NAME=your-namespace
```

</TabItem>
  <TabItem value="windows" label="Windows">

```command
set NAMESPACE_NAME=your-namespace
```

</TabItem>
</Tabs>

3. Initialize a new certificate authority:

```command
./certstrap init --common-name "My Cert Auth"
```

4. Request a certificate with a common name equal to the Namespace Name:

```command
./certstrap request-cert --common-name ${NAMESPACE_NAME}
```

5. Sign the certificate request and generate the end-entity certificate:

```command
./certstrap sign ${NAMESPACE_NAME} --CA "My Cert Auth"
```

6. (optional) If you are using the Temporal Java SDK, you will need to convert the PKCS1 file format to PKCS8 file format.
   Export the certificate and private key to a PKCS8 file:

```command
openssl pkcs8 -topk8 -inform PEM -outform PEM -in <infile.key> -out <outfile.key> -nocrypt
```

You can now use the generated client certificate with Temporal Cloud.

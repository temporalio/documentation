---
id: certificates-issue
title: How to issue root CA and end-entity certificates
sidebar_label: Issue certificates
description: You can issue root CA and end-entity certificates in two ways.
tags:
  - how-to
  - temporal cloud
  - certificates
---

Temporal Cloud authenticates a client connection by validating the client certificate against one or more CA certificates that are configured for the specified Namespace.

Choose one of the following options to generate and manage the certificates:

### Option 1: You already have certificate management infrastructure

If you have existing certificate management infrastructure that supports issuing CA and end-entity certificates, it satisfies the requirements.
When you configure the client SDK, you need to present a complete certificate chain up to the CA certificate given to Temporal.

### Option 2: You don't have certificate management infrastructure

If you don't have an existing certificate management infrastructure, issue the CA and end-entity certificates using [tcld](/cloud/tcld) or open source tools such as certstrap.

:::info

A certificate bundle can contain up to 16 CA certificates.
A certificate bundle can have a maximum payload size of 32 KB before base64 encoding.

:::

#### Use tcld to generate certificates

You can generate CA and end-entity certificates by using [tcld](/cloud/tcld).

Although Temporal Cloud supports long-lived CA certificates, a CA certificate generated by [tcld](/cloud/tcld) has a maximum duration of 1 year (`-d 1y`).
You must set an end-entity certificate to expire before its root CA certificate, so specify its duration appropriately.

To create a new CA certificate, use `tcld gen ca`.

```sh
mkdir temporal-certs
cd temporal-certs
tcld gen ca --org temporal -d 1y --ca-cert ca.pem --ca-key ca.key
```

The contents of the generated `ca.pem` should be pasted into the "CA Certificates" section of your Namespace settings page.

To create a new end-entity certificate, use `tcld gen leaf`.

```sh
tcld gen leaf --org temporal -d 364d --ca-cert ca.pem --ca-key ca.key --cert client.pem --key client.key
```

#### Use certstrap

Temporal Cloud requires client certificates for authentication and secure communication.
[Certstrap](https://github.com/square/certstrap) is a popular and easy-to-use tool for issuing certificates.

Before you begin, ensure you have installed Certstrap by following the instructions in the [Certstrap README](https://github.com/square/certstrap#getting-started).

A Certificate Authority (CA) is a trusted entity that issues digital certificates.
These certificates certify the ownership of a public key by the named subject of the certificate.
End-entity certificates are issued and signed by a CA, and they are used by clients to authenticate themselves to Temporal Cloud.

Create a self-signed CA certificate and use it to issue an end-entity certificate for your Temporal Cloud namespace.

##### 1. Create a Certificate Authority (CA)

Create a new Certificate Authority (CA) using Certstrap:

```command
./certstrap init --common-name "Cert"
```

This command creates a self-signed CA certificate named `Cert.crt` in the `out` folder within the Certstrap directory.
This CA certificate will be used to sign and issue end-entity certificates.

##### 2. Set the Namespace Name

Set the Namespace Name as the common name for the end-entity certificate:

<Tabs>
  <TabItem value="macos" label="macOs" default>

For Linux or macOS:

```command
export NAMESPACE_NAME=your-namespace
```

</TabItem>
    <TabItem value="windows" label="Windows" default>

For Windows:

```command
set NAMESPACE_NAME=your-namespace
```

</TabItem>
</Tabs>

Replace `your-namespace` with the name of your Temporal Cloud namespace.

##### 3. Request an End-Entity Certificate

Next, request a certificate with a common name equal to the Namespace Name:

```command
./certstrap request-cert --common-name ${NAMESPACE_NAME}
```

This command creates a Certificate Signing Request (CSR) for an end-entity certificate, but not the actual certificate itself.

##### 4. Sign the Certificate Request

Sign the certificate request and generate the end-entity certificate:

```command
./certstrap sign ${NAMESPACE_NAME} --CA "Cert"
```

This command takes the CSR from the previous step and signs it with your CA (`Cert`).
The result is an end-entity certificate (`your-namespace.crt`) that is now a valid certificate signed by your CA.

##### 5. (optional) Convert to PKCS8 Format for Java SDK

If you are using the Temporal Java SDK, you will need to convert the PKCS1 file format to PKCS8 file format.
Export the end-entity's private key to a PKCS8 file:

```command
openssl pkcs8 -topk8 -inform PEM -outform PEM -in <out/your-namespace.key> -out <out/your-namespace.pkcs8.key> -nocrypt
```

##### 6. Use the Certificates with Temporal Cloud

You can now use the generated client certificate (`your-namespace.crt`) and the CA certificate (`Cert.crt`) with Temporal Cloud.
You will upload the contents of the `Cert.crt` file to the **CA Certificates** section of your **Namespace** settings.

Follow the instructions to [upload the CA certificate and configure your client](/cloud/certificates#update-certificates-using-temporal-cloud-ui) with the end-entity certificate.

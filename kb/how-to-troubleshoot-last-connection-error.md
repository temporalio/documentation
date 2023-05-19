---
slug: troubleshoot-last-connection-error
title: Troubleshoot the "failed reaching server" error
tags:
  - cloud
  - namespaces
date: 2023-05-19T00:00:00Z
---

An expired TLS certification can often cause `failed reaching server: last connection error`.

This troubleshooting guide shows you how to do the following:

- Check the certification expiration date
- Renew the certification
- Update the server configuration

### Verify TLS certification expiration date

The first step in troubleshooting this error is to check the expiration date of the TLS certification.

**Existing certificate management infrastructure**

If you are using an existing certificate management infrastructure, check the TLS expiration date.
For example if you are using OpenSSL, run the following command:

```command
openssl s_client -connect <address_id>.tmprl.cloud:7233 -showcerts -cert ~/certs/path.pem -key .~/certs/path.key -tls1_2
```

**Self-signed certificate**

If you are using a self-signed certificate, run the following `tctl` command:

```command
tctl --namespace <namespace_id> --address <address_id>.tmprl.cloud:7233 --tls-cert-path ~/certs/path.pem --tls-key-path ~/certs/path.key namespace describe
```

### Renew TLS certification

If the certificate has expired or is about to expire, the next step is to renew it.

You can do this by contacting the certificate authority (CA) that issued the certificate and requesting a renewal.

**Existing certificate management infrastructure**

If you are using an existing certificate management infrastructure, contact the administrator of the infrastructure to renew the certificate.

**Self-signed certificate**

Alternatively, if you are using a self-signed certificate or do not have an existing infrastructure, you can generate a new certificate using OpenSSL or [certstrap](https://github.com/square/certstrap).

<!-- For information on generating a self-signed certificate, see [Link to this or similar](https://github.com/temporalio/documentation/pull/2024)
-->

### Update the CA certification in the server configuration

Update the new CA certificate in the Temporal Cloud server configuration.

You can update certificates using any of the following methods:

- **[Update certificates using Temporal Cloud UI](https://docs.temporal.io/cloud/how-to-manage-certificates-in-temporal-cloud#update-certificates-using-temporal-cloud-ui)**
- **[Update certificates using tcld](https://docs.temporal.io/cloud/how-to-manage-certificates-in-temporal-cloud#update-certificates-using-tcld)**

Retry your connection once you've updated the TLS certification in the server configuration.

### Set reminders

Don't let your certificates expire! Add reminders to your calendar to issue new CA certificates well before the expiration dates of the existing ones.

## Additional resources

You'll troubleshoot the `failed reaching server: last connection error` error caused by an expired TLS certification by following these steps

If this issue persists, check to see if the Client you are using to connect to the server is using the correct TLS certification, or open a ticket at [https://support.temporal.io/](https://support.temporal.io/)

---
id: set
title: tcld namespace accepted-client-ca set
sidebar_label: set
description: How to set the client CA certificates for a Namespace in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace accepted-client-ca set` command sets the client CA certificates for a [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

`tcld namespace accepted-client-ca set --ca-certificate <value>`

Alias: `s`

<!--- How to rollover accepted client CA certificates in Temporal Cloud using tcld --->

When updating CA certificates, it's important to follow a rollover process.
Doing so enables your Namespace to serve both CA certificates for a period of time until traffic to your old CA certificate ceases.

1. Create a single file that contains both your old and new CA certificate PEM blocks.
   Just concatenate the PEM blocks on adjacent lines.

   ```
   -----BEGIN CERTIFICATE-----
   ... old CA cert ...
   -----END CERTIFICATE-----
   -----BEGIN CERTIFICATE-----
   ... new CA cert ...
   -----END CERTIFICATE-----
   ```

1. Run the `tcld namespace accepted-client-ca set` command with the CA certificate bundle file.

   ```bash
   tcld namespace accepted-client-ca set --ca-certificate-file <path>
   ```

1. Monitor traffic to your old certificate until it ceases.

1. Create another file that contains only the new CA certificate.

1. Run the `tcld namespace accepted-client-ca set` command again with the updated CA certificate bundle file.

The following modifiers control the behavior of the command.

### `--namespace`

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace accepted-client-ca set --namespace <namespace_id> --ca-certificate <encoded_certificate>
```

### `--request-id`

Specify a request identifier to use for the asynchronous operation. If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace accepted-client-ca set --request-id <request_id> --ca-certificate <encoded_certificate>
```

### `--resource-version`

Specify a resource version (ETag) to update from. If not specified, the latest version is used.

Alias: `-v`

**Example**

```bash
tcld namespace accepted-client-ca set --resource-version <etag> --ca-certificate <encoded_certificate>
```

### `--ca-certificate`

_Required modifier unless `--ca-certificate-file` is specified_

Specify a base64-encoded string of a CA certificate PEM file.

If both `--ca-certificate` and `--ca-certificate-file` are specified, only `--ca-certificate` is used.

Alias: `-c`

**Example**

```bash
tcld namespace accepted-client-ca set --ca-certificate <encoded_certificate>
```

### `--ca-certificate-file`

_Required modifier unless `--ca-certificate` is specified_

Specify a path to a CA certificate PEM file.

If both `--ca-certificate` and `--ca-certificate-file` are specified, only `--ca-certificate` is used.

Alias: `-f`

**Example**

```bash
tcld namespace accepted-client-ca set --ca-certificate-file <path>
```

---
id: set
title: tcld account metrics accepted-client-ca set
sidebar_label: set
description: How to set the end-entity certificates for the metrics endpoint of a Temporal Cloud account using tcld.
tags:
  - tcld
---

The `tcld account metrics accepted-client-ca set` command sets the end-entity certificates for the metrics endpoint of a Temporal Cloud account.

:::info

The end-entity certificates for the metrics endpoint must chain up to the CA certificate used for the account. For more information, see [Certificate requirements](/cloud/how-to-manage-certificates-in-temporal-cloud#certificate-requirements).

:::

`tcld account metrics accepted-client-ca set --ca-certificate <value>`

Alias: `s`

The following modifiers control the behavior of the command.

##### `--request-id`

Specify a request identifier to use for the asynchronous operation. If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld account metrics accepted-client-ca set --request-id <request_id> --ca-certificate <encoded_certificate>
```

##### `--resource-version`

Specify a resource version (ETag) to update from. If not specified, the latest version is used.

Alias: `-v`

**Example**

```bash
tcld account metrics accepted-client-ca set --resource-version <etag> --ca-certificate <encoded_certificate>
```

##### `--ca-certificate`

_Required modifier unless `--ca-certificate-file` is specified_

Specify a base64-encoded string of a CA certificate PEM file.

If both `--ca-certificate` and `--ca-certificate-file` are specified, only `--ca-certificate` is used.

Alias: `-c`

**Example**

```bash
tcld account metrics accepted-client-ca set --ca-certificate <encoded_certificate>
```

##### `--ca-certificate-file`

_Required modifier unless `--ca-certificate` is specified_

Specify a path to a CA certificate PEM file.

If both `--ca-certificate` and `--ca-certificate-file` are specified, only `--ca-certificate` is used.

Alias: `-f`

**Example**

```bash
tcld account metrics accepted-client-ca set --ca-certificate-file <path>
```

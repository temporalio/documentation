---
id: remove
title: tcld account metrics accepted-client-ca remove
sidebar_label: remove
description: How to remove end-entity certificates from the metrics endpoint of a Temporal Cloud account using tcld.
tags:
  - reference
  - tcld
---

The `tcld account metrics accepted-client-ca remove` command removes end-entity certificates from the metrics endpoint of a Temporal Cloud account.

`tcld account metrics accepted-client-ca remove --ca-certificate <value>`

Alias: `r`

The following modifiers control the behavior of the command.

### `--request-id`

Specify a request identifier to use for the asynchronous operation. If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld account metrics accepted-client-ca remove --request-id <request_id> --ca-certificate <encoded_certificate>
```

### `--resource-version`

Specify a resource version (ETag) to update from. If not specified, the latest version is used.

Alias: `-v`

**Example**

```bash
tcld account metrics accepted-client-ca remove --resource-version <etag> --ca-certificate <encoded_certificate>
```

### `--ca-certificate`

_Required modifier unless `--ca-certificate-fingerprint` or `--ca-certificate-file` is specified_

Specify a base64-encoded string of a CA certificate PEM file.

If `--ca-certificate-fingerprint` is also specified, both `--ca-certificate` and `--ca-certificate-file` are ignored.

If `--ca-certificate-file` is also specified but `--ca-certificate-fingerprint` is not, only `--ca-certificate` is used.

Alias: `-c`

**Example**

```bash
tcld account metrics accepted-client-ca remove --ca-certificate <encoded_certificate>
```

### `--ca-certificate-file`

_Required modifier unless `--ca-certificate-fingerprint` or `--ca-certificate` is specified_

Specify a path to a CA certificate PEM file.

If `--ca-certificate-fingerprint` is also specified, both `--ca-certificate-file` and `--ca-certificate` are ignored.

If `--ca-certificate` is also specified but `--ca-certificate-fingerprint` is not, only `--ca-certificate` is used.

Alias: `-f`

**Example**

```bash
tcld account metrics accepted-client-ca remove --ca-certificate-file <path>
```

### `--ca-certificate-fingerprint`

_Required modifier unless `--ca-certificate` or `--ca-certificate-file` is specified_

Specify the fingerprint of a CA certificate.

If `--ca-certificate`, `--ca-certificate-file`, or both are also specified, they are ignored.

Alias: `--fp`

**Example**

```bash
tcld account metrics accepted-client-ca remove --ca-certificate-fingerprint <fingerprint>
```

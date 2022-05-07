---
id: set
title: tcld namespace update accepted-client-ca set
description: How to set the accepted client CA certificate for a Namespace in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace update accepted-client-ca set` command sets the accepted client CA certificate for a [Namespace](/docs/concepts/what-is-a-namespace) in Temporal Cloud.

`tcld namespace update accepted-client-ca set --ca-certificate <value>`

The following modifiers control the behavior of the command.

### `--namespace`

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace update accepted-client-ca set --namespace <namespace_id> --ca-certificate <encoded_certificate>
```

### `--request-id`

Specify a request identifier to use for the asynchronous operation. If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace update accepted-client-ca set --request-id <request_id> --ca-certificate <encoded_certificate>
```

### `--resource-version`

Specify a resource version (ETag) to update from. If not specified, the latest version is used.

Alias: `-v`

**Example**

```bash
tcld namespace update accepted-client-ca set --resource-version <etag> --ca-certificate <encoded_certificate>
```

### `--ca-certificate`

_Required modifier unless `--ca-certificate-file` is specified_

Specify a base64-encoded CA certificate.

If both `--ca-certificate` and `--ca-certificate-file` are specified, only `--ca-certificate` is used.

Alias: `-c`

**Example**

```bash
tcld namespace update accepted-client-ca set --ca-certificate <encoded_certificate>
```

### `--ca-certificate-file`

_Required modifier unless `--ca-certificate` is specified_

Specify a path to a PEM file that contains a base64-encoded CA certificate.

If both `--ca-certificate` and `--ca-certificate-file` are specified, only `--ca-certificate` is used.

Alias: `-f`

**Example**

```bash
tcld namespace update accepted-client-ca set --ca-certificate-file <path>
```

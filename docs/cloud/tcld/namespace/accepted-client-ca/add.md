---
id: add
title: tcld namespace accepted-client-ca add
sidebar_label: add
description: How to add client CA certificates to a Namespace in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace update accepted-client-ca add` command adds client CA certificates to a [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

`tcld namespace accepted-client-ca add --ca-certificate <value>`

Alias: `a`

The following modifiers control the behavior of the command.

### `--namespace`

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace accepted-client-ca add --namespace <namespace_id> --ca-certificate <encoded_certificate>
```

### `--request-id`

Specify a request identifier to use for the asynchronous operation. If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace accepted-client-ca add --request-id <request_id> --ca-certificate <encoded_certificate>
```

### `--resource-version`

Specify a resource version (ETag) to update from. If not specified, the latest version is used.

Alias: `-v`

**Example**

```bash
tcld namespace accepted-client-ca add --resource-version <etag> --ca-certificate <encoded_certificate>
```

### `--ca-certificate`

_Required modifier unless `--ca-certificate-file` is specified_

Specify a base64-encoded string of a CA certificate PEM file.

If both `--ca-certificate` and `--ca-certificate-file` are specified, only `--ca-certificate` is used.

Alias: `-c`

**Example**

```bash
tcld namespace accepted-client-ca add --ca-certificate <encoded_certificate>
```

### `--ca-certificate-file`

_Required modifier unless `--ca-certificate` is specified_

Specify a path to a CA certificate PEM file.

If both `--ca-certificate` and `--ca-certificate-file` are specified, only `--ca-certificate` is used.

Alias: `-f`

**Example**

```bash
tcld namespace accepted-client-ca add --ca-certificate-file <path>
```

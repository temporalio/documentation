---
id: add
title: tcld namespace certificate-filters add
sidebar_label: add
description: How to add end-entity certificates to the Namespace of a Temporal Cloud account using tcld.
tags:
  - tcld
---

The `tcld namespace certificates-filter add` command adds additional certificate filters to the Namespace of a Temporal Cloud account.

The following modifiers control the behavior of the command.

#### `--namespace`

Specify a Namespace hosted on Temporal Cloud. 
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace certificate-filters add --namespace <namespace_id> --certificate-filter-file <file>
```

#### `--request-id`

Specify a request identifier to use for the asynchronous operation. 
If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace certificate-filters add --request-id <request_id> --certificate-filter-file <file>
```

#### `--resource-version`

Specify a resource version (ETag) to update from. 
If not specified, the latest version is used.

Alias: `-v`

**Example**

```bash
tcld namespace certificate-filters add --resource-version <etag> --certificate-filter-file <file>
```

#### `--certificate-filter-file`

_Required modifier unless `--certificate-filter-value` is specified._

Specify a path to a JSON file defining the certificate filters for the Namespace.

Aliases: `-f`, `--file`

**Example**

```bash
tcld namespace certificate-filters add --certificate-filter-file <file>
```

#### `--certificate-filter-input`

_Required modifier unless `--certificate-filter-file` is specified._

The certificate filters, in JSON, that will be added to the Namespace.

Aliases: `-i`, `--input`

**Example**

```bash
tcld namespace certificate-filters add --certificate-filter-input <JSON>
```
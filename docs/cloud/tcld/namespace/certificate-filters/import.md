---
id: import
title: tcld namespace certificate-filters import
description: How to set certificate filters for a Namespace in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace certificate-filters import` command sets certificate filters for a [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

`tcld namespace certificate-filters import --certificate-filter-file <path>`

The following modifiers control the behavior of the command.

### `--certificate-filter-file`

_Required modifier unless `--certificate-filter-input` is specified_

Specify a path to a JSON file that defines certificate filters to be applied to the Namespace, such as `{ "filters": [ { "commonName": "test1" } ] }`. The specified filters replace any existing filters.

If both `--certificate-filter-file` and `--certificate-filter-input` are specified, the command returns an error.

Aliases: `--file`, `-f`

**Example**

```bash
tcld namespace certificate-filters import --certificate-filter-file <path>
```
### `--certificate-filter-input`

_Required modifier unless `--certificate-filter-file` is specified_

Specify a JSON string that defines certificate filters to be applied to the Namespace, such as `{ "filters": [ { "commonName": "test1" } ] }`. The specified filters replace any existing filters.

If both `--certificate-filter-input` and `--certificate-filter-file` are specified, the command returns an error.

Aliases: `--input`, `-i`

**Example**

```bash
tcld namespace certificate-filters import --certificate-filter-input <json>
```

### `--namespace`

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace certificate-filters import --namespace <namespace_id> --certificate-filter-input <json>
```

### `--request-id`

Specify a request identifier to use for the asynchronous operation. If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace certificate-filters import --request-id <request_id> --certificate-filter-input <json>
```

### `--resource-version`

Specify a resource version (ETag) to update from. If not specified, the latest version is used.

Alias: `-v`

**Example**

```bash
tcld namespace certificate-filters import --resource-version <etag> --certificate-filter-input <json>
```

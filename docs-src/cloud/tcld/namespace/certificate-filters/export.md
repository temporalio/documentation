---
id: export
title: tcld namespace certificate-filters export
sidebar_label: export
description: How to export certificate filters from a Namespace in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld namespace certificate-filters export` command exports existing certificate filters from a [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

`tcld namespace certificate-filters export --certificate-filter-file <path>`

Alias: `exp`

The following modifiers control the behavior of the command.

### `--certificate-filter-file`

Specify a path to a JSON file where tcld can export the certificate filters.

Aliases: `--file`, `-f`

**Example**

```bash
tcld namespace certificate-filters export --certificate-filter-file <path>
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

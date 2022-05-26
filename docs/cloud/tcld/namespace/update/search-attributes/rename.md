---
id: rename
title: tcld namespace update search-attributes rename
sidebar_label: rename
description: How to update the name of an existing custom Search Attribute in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace update search-attributes rename` command updates the name of an custom [Search Attributes](/concepts/what-is-a-search-attribute) in Temporal Cloud.

`tcld namespace update search-attributes rename --existing-name <value> --new-name <value>`

The following modifiers control the behavior of the command.

### `--namespace`

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace update search-attributes rename --namespace <namespace_id> --existing-name <value> --new-name <value>
```

### `--request-id`

Specify a request identifier to use for the asynchronous operation. If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace update search-attributes rename --request-id <request_id> --existing-name <value> --new-name <value>
```

### `--resource-version`

Specify a resource version (ETag) to update from. If not specified, the latest version is used.

Alias: `-v`

**Example**

```bash
tcld namespace update search-attributes rename --resource-version <etag> --existing-name <value> --new-name <value>
```

### `--existing-name`

_Required modifier_

Specify the name of an existing Search Attribute.

Alias: `--en`

**Example**

```bash
tcld namespace update search-attributes rename --existing-name <value> --new-name <value>
```

### `--new-name`

_Required modifier_

Specify a new name for the Search Attribute.

Alias: `--nn`

**Example**

```bash
tcld namespace update search-attributes rename --existing-name <value> --new-name <value>
```

---
id: clear
title: tcld namespace certificate-filters clear
description: How to clear all certificate filters from a Namespace in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace certificate-filters clear` command clears all certificate filters from a [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

:::info Be aware

Using this command allows _any_ client certificate that chains up to a configured CA certificate to connect to the Namespace.

:::

`tcld namespace certificate-filters clear`

The following modifiers control the behavior of the command.

### `--namespace`

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace certificate-filters clear --namespace <namespace_id>
```

### `--request-id`

Specify a request identifier to use for the asynchronous operation. If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace certificate-filters clear --request-id <request_id>
```

### `--resource-version`

Specify a resource version (ETag) to update from. If not specified, the latest version is used.

Alias: `-v`

**Example**

```bash
tcld namespace certificate-filters clear --resource-version <etag>
```

---
id: delete
title: tcld namespace export delete
sidebar_label: delete
description: How to delete an export sink in the Namespace of a Temporal Cloud account using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld namespace export delete` command allows users to delete an existing export sink from the Namespace of a Temporal Cloud account.

The following modifiers control the behavior of the command.

#### --namespace

Specify a Namespace hosted on Temporal Cloud.
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace export delete --namespace <namespace_id> --sink-name <sink_name>
```

#### --sink-name

Provide the name of the export sink you wish to delete.

**Example**

```bash
tcld namespace export delete --sink-name <sink_name>
```

#### --resource-version

Specify a resource version (ETag) to delete from.
If not specified, the CLI will use the latest version.

Alias: `-v`

**Example**

```bash
tcld namespace export delete --resource-version <etag> --sink-name <sink_name>
```

#### --request-id

Specify a request identifier to use for the asynchronous operation.
If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace export delete --request-id <request_id> --sink-name <sink_name>
```

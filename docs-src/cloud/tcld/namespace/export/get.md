---
id: get
title: tcld namespace export get
sidebar_label: get
description: How to retrieve details of an export sink in the Namespace of a Temporal Cloud account using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld namespace export get` command allows users to retrieve details about an existing export sink from the Namespace of a Temporal Cloud account.

The following modifiers control the behavior of the command.

#### --namespace

Specify a Namespace hosted on Temporal Cloud.
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace export get --namespace <namespace_id> --sink-name <sink_name>
```

#### --sink-name

Provide the name of the export sink you wish to retrieve details for.

**Example**

```bash
tcld namespace export get --sink-name <sink_name>
```

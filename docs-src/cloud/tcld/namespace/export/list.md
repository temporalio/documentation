---
id: list
title: tcld namespace export list
sidebar_label: list
description: How to list all export sinks in the Namespace of a Temporal Cloud account using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld namespace export list` command allows users to list all existing export sinks within the Namespace of a Temporal Cloud account.

The following modifiers control the behavior of the command.

#### --namespace

Specify a Namespace hosted on Temporal Cloud.
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace export list --namespace <namespace_id>
```

#### --page-size

Determine the number of results to return per page for list operations. If not specified, the default value is 100.

**Example**

```bash
tcld namespace export list --page-size <number_of_results>
```

#### --page-token

Provide the page token to continue listing results from where the previous list operation left off.

**Example**

```bash
tcld namespace export list --page-token <token_value>
```

---
id: get
title: tcld namespace get
sidebar_label: get
description: How to get information about a Namespace in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace get` command gets information about the specified [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

Alias: `g`

`tcld namespace get`

The following modifier controls the behavior of the command.

### `--namespace`

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace get --namespace <namespace_id>
```

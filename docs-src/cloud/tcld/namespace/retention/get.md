---
id: get
title: tcld namespace retention get
sidebar_label: get
description: How to retrieve the length of time a closed Workflows will be preserved before deletion for a Namespace in Temporal Cloud using tcld.
tags:
  - tcld
  - cli-reference
---

Retrieve the length of time (in days) a closed Workflow will be preserved before deletion for the specified Namespace.

Alias: `g`

The following modifier controls the behavior of the command.

#### `--namespace`

_Required modifier_

Specify a Namespace hosted on Temporal Cloud.
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace retention get --namespace <namespace_id>
```
